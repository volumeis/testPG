/*
 *Swipe 구현 
 * 좌 -> 우 : 메뉴바 
 * 우 -> 좌 : searchtel
 *
 * 민호
 * 
 * 05.10.16
 */
var PANELSTATE = false;
$(document).on("pageshow", function () {
    var activePage = $.mobile.activePage[0].id;
    if (activePage === 'storelist-page' ||
        activePage === 'cart-page' ||
        activePage === 'storehome-page' ||
        activePage === 'customerinfo-page') {

        //좌 -> 우 스와이프
        $('#' + activePage).on("swiperight", function (e) {
            if ($.mobile.activePage.jqmData("panel") !== "open") {
                console.log('swiperight on ! ')
                $("#menuPanel").panel("open");
            }
        });

        //우 -> 좌 스와이프
        $('#' + activePage).on("swipeleft", function (e) {
            if ($.mobile.activePage[0].id != 'cart-page' && !PANELSTATE) {
                console.log('swipeleft on ! ')
                $.mobile.changePage("cart.html", {
                    direction: "reverse",
                    transition: "slide"
                });
            }
        });
    } else if (activePage === 'map-page') {
        $('.swipe-area').on("swiperight", function () {
            if ($.mobile.activePage.jqmData("panel") !== "open") {
                console.log('swiperight on ! ')
                $("#menuPanel").panel("open");
            }
        });
        $('.swipe-area').on("swipeleft", function () {
            console.log('swipeleft on ! ');
            $.mobile.changePage("cart.html", {
                direction: "reverse",
                transition: "slide"
            });
        });
    } else if (activePage === 'join-page') {
        $('#' + activePage).on("swiperight", function (e) {
            window.history.back();
        });
    }
});



$(document).on("panelbeforeopen", "#menuPanel", function () {
    console.log("panelbeforeopen");
    PANELSTATE = true;
});
$(document).on("panelclose", "#menuPanel", function () {
    console.log("panelclose");
    PANELSTATE = false;
});