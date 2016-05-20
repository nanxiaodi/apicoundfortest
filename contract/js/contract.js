/**
 * Created by nn520 on 2016/5/16.
 */

// 全局变量
var UserName = 'huangrq.jsyt';

// 初始化framework7框架
var myApp = new Framework7({
    template7Pages: true,
    precompileTemplates: true
});

/* Initialize views */
var view1 = myApp.addView('#daibanView', {
    dynamicNavbar: true
});
var view2 = myApp.addView('#yibanView', {
    dynamicNavbar: true
});
var $$ = Dom7;

// ajax与后台拿数据
function contractAjax(id,UserName,PageIndex,fn,that) {
    var Type;
    switch (id) {
        case '#daibanView':
            Type = 'Db';
            break;
        case '#yibanView':
            Type = 'Yb';
            break;
    }

    $$.ajax({
        url:'http://202.102.44.2:8081/api/GetContracts',
        type: 'GET',
        dataType: 'json',
        data: {
            Type:Type,
            UserName: UserName,
            PageIndex: PageIndex,
            PageSize: 15,
            format: 'json'
        },
        success: function(data) {
            data.Type = Type;
            if (data.IsSuccess) {
                fn(id,data,that);
            } else {
                alert('获取数据失败');
            }
        }
    });
}


// 拼接字符串
function joinString(datas) {
    var datetime;
    var data = datas.Datas;
    datetime = 'data[i].ReceiveDate';
    var str = '';
    for(var i= 0,Len=data.length; i<Len; i++) {
        str += '<li class="item-content">';
        str += '<a target="_self" href="http://202.102.44.2:8081/Contract/Content?messageId='+data[i].MessageID+'&ContractId='+data[i].BusinessID+'&OuLabel='+data[i].OuLabel+'&type='+datas.Type+'&userName='+UserName+'" class="item-link item-content">';
        str += '<div class="item-inner">';
        str += '<div class="item-text item-title-row">'+data[i].BusinessName+'</div>';
        str += '<span class="item-time item-title-row">'+conversionTime(onlyNum(eval(datetime)))+'</span>';
        str += '</div>';
        str += '</a>';
        str += '</li>';
    }
    return str;
}

// 初始化页面
function init() {
    infiniteLoad(contractAjax);
    downRefresh(contractAjax);
    autoDownRefresh('#daibanView');
}
init();

$$('.tab-link').on('click',function() {
    var id = $$(this).attr('href');
    var dataRefresh = $$(this).attr('data-autoRefresh');
    if(dataRefresh == 'on') {
        autoDownRefresh(id);
    }
    $$(this).attr('data-autoRefresh','off');
})

// 处理合同管理下拉刷新的得到数据的逻辑
function downRefreshLogic(id,data) {
    var a = $$(''+id+' .pull-to-refresh-content');
    // 记录上次刷新时间
    if(id == '#daibanView') {
        sessionStorage.dblastRefreshTime = getTime();
    }else if(id == '#yibanView'){
        sessionStorage.yblastRefreshTime = getTime();
    }
    if(data.Datas.length == 0) {
        myApp.pullToRefreshDone(a);
        return;
    }
    // 拼接字符串
    var htmlStr = joinString(data);
    // 添加到页面
    $$(''+id+' ul').removeAttr('hidden').html(htmlStr);
    // 加载完毕需要重置
    myApp.pullToRefreshDone(a);
}



