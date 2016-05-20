/**
 * Created by nn520 on 2016/5/9.
 */
// 点击导航栏 请求不同的id
$$('.tab-link').on('click',function() {
    var id = $$(this).attr('href');
    var dataRefresh = $$(this).attr('data-autoRedresh');
    if(dataRefresh == 'on') {
        autoDownRefresh(id);
    }
    $$(this).attr('data-autoRedresh','off');
})
// 页面初始化
function init(){
    infiniteLoad();
    downRefresh();
    autoDownRefresh('#daibanView');
};
init();








