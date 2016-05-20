/**
 * 本库基于framework7.js
 */

// 将时间戳转换为2016/2/11 22:22:22格式
function conversionTime(timeNum) {
    // 简单的一句代码
    var date = new Date(timeNum);
    var year = date.getFullYear();  // 获取完整的年份(4位,1970)
    var month = date.getMonth()+1;  // 获取月份(0-11,0代表1月,用的时候记得加上1)
    var day = date.getDate();  // 获取日(1-31)
    var hours = date.getHours();  // 获取小时数(0-23)
    var minutes = date.getMinutes();  // 获取分钟数(0-59)
    var seconds = date.getSeconds();  // 获取秒数(0-59)
    var a =  ''+year+'/'+month+'/'+day+' '+hours+':'+minutes+':'+seconds+'';
    return a;
}

// 将/Date(1462753070000-0000)/转化为1462753070000-0000
function onlyNum(a) {
    return parseInt(a.substr(6,17));
}

// 无限加载  (需要给无限加载的元素标签加上上data-id="#...")
function infiniteLoad(fnAjax) {
    // 加载flag
    this.loading = false;
    // 上次加载的序号
    this.lastIndex = 2;
    // 封装无限加载加载逻辑函数
    function infinitedLoadLogic(id,data,that){
        // 加载完毕，则注销无限加载事件，以防不必要的加载
        if(data.Datas.length === 0) {
            myApp.detachInfiniteScroll($$(''+id+' .infinite-scroll'));
            // 删除加载提示符
            $$(''+id+' .infinite-scroll-preloader').remove();
            return;
        }

        // 拼接字符串
        var htmlStr = joinString(data);

        // 添加到页面
        $$(''+id+' ul').removeAttr('hidden').append(htmlStr);

        // 重置加载flag
        that.loading = false;

        //更新加载的序列号
        that.lastIndex += 1;

    }

    // 将this保存在that里
    var that = this;

    // 注册'infinite'事件处理函数
    $$('.infinite-scroll').on('infinite', function (e) {
        var id = $$(e.target).attr('data-id');
        $$(''+id+' .infinite-scroll-preloader').removeAttr('hidden');
        // 如果正在加载，则退出
        if (that.loading) return;
        // 设置flag
        that.loading = true;
        //ajax拿数据
        fnAjax(id,UserName,that.lastIndex,infinitedLoadLogic,that);

    });
};

// 下拉刷新
function downRefresh(fnAjax) {
    // 下拉刷新页面
    var ptrContent = $$('.pull-to-refresh-content');
    var index = 0;
    // 添加'refresh'监听器
    ptrContent.on('refresh', function (e) {
        var id = $$(e.target).attr("data-id");
        // 添加上次就时间
        if(id == '#daibanView' && sessionStorage.dblastRefreshTime ) {
            $$(''+id+' .refresh-time').attr('style','display:block').find('span').html(sessionStorage.dblastRefreshTime)
        }else if(id == '#yibanView' && sessionStorage.yblastRefreshTime){
            $$(''+id+' .refresh-time').attr('style','display:block').find('span').html(sessionStorage.yblastRefreshTime)
        }
        fnAjax(id,UserName,'1',downRefreshLogic);
    });
}

// 自动下拉刷新
function autoDownRefresh(id) {
    var a = $$(''+id+' .pull-to-refresh-content');
    myApp.pullToRefreshTrigger(a);
};

// 得到当前时分秒
function getTime() {
    var date = new Date();
    var house = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();
    var time = house +':'+ minutes +':'+ seconds
    return time;
}
