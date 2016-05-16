/**
 * 초기 페이지 주입
 *
 * 민호
 * 04.28.16 
 *
 * last update : 05.02.16
 * -> 페이지 로드 순서 개선 및 이름 수정
 *
 * 
 */
$(document).one("pagecreate", function () {
    $.get("./menuPanel.html", function (data) {
        $.mobile.pageContainer.append(data);
        $("[data-role=panel]").panel().enhanceWithin();
    }, "html");
    $.getScript("../js/pages/menuPanel.js")


    $("#storelist-page").load("storeList.html [data-role=main]", function () {
        console.log('storelist.js init');
        $.getScript("../js/pages/storeList.js");
    });
    /* $("#cart-page").load("cart.html [data-role=main]", function () {
         console.log('cart.js init');
         $.getScript("../js/pages/cart.js");
     });*/
    $("#map-page").load("map.html [data-role=main]", function () {
        console.log('map.js init');
        $.getScript("../js/pages/mapFunc.js");
        $.getScript("../js/pages/map.js");
    });

    /*$("#customerinfo-page").load("customerInfo.html [data-role=main]", function () {
        console.log('customerInfo.js init');
        $.getScript("../js/pages/customerInfo.js");
    });*/

});

$(document).one("pageshow", function () {
    $.mobile.changePage('#storelist-page');
    
});

//$(document).one("pageshow", function () {
//    $.mobile.changePage('#customerInfo.html');
//});