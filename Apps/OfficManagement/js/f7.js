/**
 * Created by nn520 on 2016/7/1.
 *
 * 此框架是基于framework7封装的,里边包含framework7的组件功能方法和逻辑
 */



//--------params 各个参数说明-----------//
// me({
//    tempId:"",   ----// 找到模板id  ------
//    ConId:'',    ----// 模板编译出的html放入的id ------
// })

function Me(params) {
  this.params = params;
}


Me.prototype = {
  init: function(myApp) {
      myApp;
      this.pullToRefresh();
      this.Infinite();
  },
    //下拉刷新
  pullToRefresh: function() {
      // 下拉刷新页面
      var ptrContent = $$('.pull-to-refresh-content');
      var that = this;
     // 添加'refresh'监听器
      ptrContent.on('refresh', function (e) {
             console.log(that);
             // 无线加载逻辑
          that.pullToRefreshLogic(data,that);

      });
  },
    // 下拉刷新处理逻辑
  pullToRefreshLogic: function (data,that) {
      $$(that.params.ConId).html(that.HtmlStr(data,that));
      // 加载完毕需要重置
      myApp.pullToRefreshDone();
  },
   // 无线加载
   Infinite: function() {
       console.log(123);
       $$('.infinite-scroll-preloader').attr('style','display:none');
       // 加载flag
       this.loading = false;
        // 每次加载的页数
       this.itemindex = 1;
        var that = this;
        // 注册'infinite'事件处理函数
       $$('.infinite-scroll').on('infinite', function () {
           console.log(this);
           $$('.infinite-scroll-preloader').attr('style','display:block');
           that.InfiniteLogic(data,that);
       });
   },
    // 无线加载逻辑
    InfiniteLogic: function(data,that) {
        //console.log(that);
        // 如果正在加载，则退出
        if (that.loading) return;
        // 设置flag
        that.loading = true;

        //myApp.detachInfiniteScroll($$('.infinite-scroll'));

        // 删除加载提示符
        //$$('.infinite-scroll-preloader');
        // 添加新条目
        console.log($$(that.params.ConId));
        $$(that.params.ConId).append(that.HtmlStr(data,that));

        // 重置加载flag
        that.loading = false;
        that.itemindex++;
        console.log(that);
    },
   //绑定数据html
   HtmlStr:function(data,that) {
       var template = $$(that.params.tempId).html();
       var compiledTemplate = Template7.compile(template);
       var html = compiledTemplate(data);
       return html;
   },
   //Ajax
   MyAjax: function(url,parameter,fn) {
       $$.ajax({
           url:url,
           dataType:'json',
           type:'GET',
           data:parameter,
           success: function(data) {
               var that = this;
               this.pullToRefreshLogic(data);
           },
           error: function(err) {
               console.log(err);
           }
       })
   },
    // 获取url的参数
    urlGet: function() {
        var aQuery = url ? url.split("?") : window.location.href.split("?"); //取得Get参数
        var aGET = new Array();
        if (aQuery.length > 1) {
            var aBuf = aQuery[1].split("&");
            for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
                var aTmp = aBuf[i].split("="); //分离key与Value
                aGET[aTmp[0]] = aTmp[1];
            }
        }
        return aGET;
    },
   ceshi: function(data) {
       var that = this;
       this.pullToRefreshLogic(data);
   }


}

var me = new Me({
    tempId: "#my-apply-list",
    ConId: '#daiban-view .list-block ul'
});
me.init();


var data ={datas:[
    {num:'我是测试,~._.~,我是测试'},
    {num:'我是测试,~._.~,我是测试'},
    {num:'我是测试,~._.~,我是测试'},
    {num:'我是测试,~._.~,我是测试'},
    {num:'我是测试,~._.~,我是测试'},
    {num:'我是测试,~._.~,我是测试'},
    {num:'我是测试,~._.~,我是测试'},
    {num:'我是测试,~._.~,我是测试'},
    {num:'我是测试,~._.~,我是测试'},
    {num:'我是测试,~._.~,我是测试'},
    {num:'我是测试,~._.~,我是测试'},
    {num:'我是测试,~._.~,我是测试'},
    {num:'我是测试,~._.~,我是测试'},
    {num:'我是测试,~._.~,我是测试'},
    {num:'我是测试,~._.~,我是测试'},
]}



