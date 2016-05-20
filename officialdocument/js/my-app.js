/**
 * Created by nn520 on 2016/5/9.
 */
// 全局变量
var UserName = 'joecoic.jsyt';

// 初始化framework7框架
var myApp = new Framework7({
    template7Pages: true
});
var $$ = Dom7;
/* Initialize views */
var view1 = myApp.addView('#daibanView', {
    dynamicNavbar: true
});
var view2 = myApp.addView('#daiyueView', {
    dynamicNavbar: true
});
var view3 = myApp.addView('#yibanView', {
    dynamicNavbar: true
});
var view3 = myApp.addView('#yiyueView', {
    dynamicNavbar: true
});
// 无限加载
function infiniteLoad() {

   $$('.infinite-scroll-preloader').attr('style','display:none');
  // 加载flag
    this.loading = false;

// 上次加载的序号
    this.lastIndex = 2;

// 封装无限加载加载逻辑函数
function infinitedLoadLogic(id,data,that) {
    // 加载完毕，则注销无限加载事件，以防不必要的加载
    if(data.Datas.length === 0) {
        myApp.detachInfiniteScroll($$(''+id+' .infinite-scroll'));
        // 删除加载提示符
        $$(''+id+' .infinite-scroll-preloader').remove();
    }

    // 拼接字符串
    var htmlStr = joinString(data);
    //console.log(htmlStr);
    // 添加到页面
    $$(''+id+' ul').append(htmlStr);
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
        $$(''+id+' .infinite-scroll-preloader').attr('style','display:block');
        // 如果正在加载，则退出
        if (that.loading) return;

        // 设置flag
        that.loading = true;

        //ajax拿数据
        gongwenAjax(id,UserName,that.lastIndex,infinitedLoadLogic,that);
    });
}
// 下拉刷新
function downRefresh() {
    // 下拉刷新页面
    var ptrContent = $$('.pull-to-refresh-content');
    var index = 0;
    // 添加'refresh'监听器
    ptrContent.on('refresh', function (e) {
            var id = $$(e.target).attr("data-id");
            gongwenAjax(id,UserName,'1',downRefreshLogic);

    });
}
// 处理下拉刷新的得到数据的逻辑
function downRefreshLogic(id,data) {
    var a = $$(''+id+' .pull-to-refresh-content');
    if(data.Datas.length == 0) {
        myApp.pullToRefreshDone(a);
        $$(''+id+' .empty-tips').attr('style','display:block');
    }
    // 拼接字符串
    var htmlStr = joinString(data);
    // 添加到页面
    $$(''+id+' ul').removeAttr('hidden').html(htmlStr);

    // 加载完毕需要重置
    myApp.pullToRefreshDone(a);
}
//自动下拉刷新
function autoDownRefresh(id) {
    var a = $$(''+id+' .pull-to-refresh-content');
    myApp.pullToRefreshTrigger(a);
}
// ajax拿数据  taht参数是为了给fn传没传的参数 如果没有可以不传
function gongwenAjax(id,UserName,PageIndex,fn,that) {
    var RequestType;
    switch(id){
        case '#daibanView':
            RequestType = 'Db';
            break;
        case '#daiyueView':
            RequestType = 'Dy';
            break;
        case '#yibanView':
            RequestType = 'Yb';
            break;
        case '#yiyueView':
            RequestType = 'Yy';
            break;
    };
    $$.ajax({
        url:'http://202.102.44.2:8081/api/OfficialDocument/GetDocumentList',
        type: 'GET',
        dataType: 'json',
        data: {
            RequestType: RequestType,
            UserName: UserName,
            PageIndex:PageIndex,
            PageSize: '15',
            format: 'json'
        },
        success: function(data) {
            data.RequestType = RequestType;
           if(data.IsSuccess) {
               fn(id,data,that);
           }else {
               alert('获取数据失败');
           }
        }
    });
}
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
    var a =  ''+year+'/'+month+'/'+day+' '+ hours+':'+ minutes+':'+seconds+'';
    return a;
};
// 将/Date(1462753070000-0000)/转化为1462753070000-0000
function onlyNum(a) {
    return parseInt(a.substr(6,17));
}
// 拼接字符串
function joinString(datas) {
    var datetime;
    var data = datas.Datas;
    if(!!datas.Datas[0].LastModified) {
        datetime = 'data[i].LastModified';
    }else {
        datetime = 'data[i].CreateDate';
    }
    var str = '';
    for(var i= 0,Len=data.length; i<Len; i++) {
        str += '<li class="item-content">';
        str += '<a href="http://202.102.44.2:8081/OfficialDocument/Detail?requestType='+datas.RequestType+'&uuid='+data[i].Url+'&oaName='+data[i].OperateUserName+'&userName='+UserName+'" class="item-link item-content">';
        str += '<div class="item-inner">';
        str += '<div class="item-text item-title-row">'+data[i].Subject+'</div>';
        str += '<span class="item-time item-title-row">'+conversionTime(onlyNum(eval(datetime)))+'</span>';
        str += '</div>';
        str += '</a>';
        str += '</li>';
    }
    return str;
}







