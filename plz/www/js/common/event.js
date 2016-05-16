function callStoreHome() {
    $('#storelist-page').on('click', '.ui-block-a a', function () {

        // store 선택해서 클릭시 스토어이미지에 명암을 주어 클릭한 부분을 보여줌
        $(this).css("opacity", "0.15");
        var a = $(this);
        setTimeout(function () {
            a.css("opacity", "1");
        }, 500);

        ///////////////////////////////	
        var storeId = $(this).attr("id");
        $.mobile.changePage("storeHome.html", {
            dataUrl: "storeHome.html?parameter=" + storeId,
            data: {
                'parameter': storeId
            },
            transition: "fade"
        });
    });
    $('#map-page').on('click', '.desc a', function () {

        var storeId = $(this).attr("id");
        console.log(storeId);
        $.mobile.changePage("storeHome.html", {
            dataUrl: "storeHome.html?parameter=" + storeId,
            data: {
                'parameter': storeId
            },
            transition: "slideup"
        });
    });

}

$(document).on('click', '#customerinfo', function () {
    $.mobile.changePage("customerInfo.html");

});

$(document).on('click', '#storelist', function () {
    $.mobile.changePage($("#storelist-page"));

});

$(document).on('click', '#logout', function () {
	logout();
});

$(document).on('pagebeforeshow', "#storehome-page", function (event, data) {
    QUERYSTRING = $(this).data("url").split("?")[1];;
    QUERYSTRING = QUERYSTRING.replace("parameter=", "");
});

