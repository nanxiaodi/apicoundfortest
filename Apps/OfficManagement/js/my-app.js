/**
 * Created by nn520 on 2016/6/29.
 */
var myApp = new Framework7({
    pushState: true,
    preloadPreviousPage: true,
});

var view = myApp.addView('.view-main', {
    dynamicNavbar: true,
    preloadPreviousPage: true,
    template7Pages: true,
    precompileTemplates: true,
});

var $$ = Dom7;