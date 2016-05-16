$("#fakeloader").fakeLoader({
    timeToHide: 4000, //Time in milliseconds for fakeLoader disappear
    zIndex: "9999", //Default zIndex
    spinner: "spinner1" //Options: 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7'
        //    bgColor: "transparent"
});

$(function () {
    //$(document).one("pageshow", function () {

    $.ajax({
        url: COMMONWEBSERVER + "/store/getStoreListShort/" + "서울 서초구", //
        method: "GET",
        dataType: "json",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        success: function (JSONData, status) {
            var storeList = JSONData.storeMap.list;
            var tempHtml;
            $.each(storeList, function (i, store) {

                var address = $(document.createElement('div')).addClass('address');
                address.text(store.storeAddr);
                $(".ui-grid-solo").append(address);
                var name = $(document.createElement('div')).addClass('name');
                name.text(store.storeName);
                var figcaption = $(document.createElement('div')).addClass('fig');
                figcaption.html(address.add(name));

                var img =
                    $(document.createElement('img')).attr({
                        src: COMMONWEBSERVER + "/image/storeImg/" + store.storeImg + ".jpg",
                        alt: "alt : " + store.storeName
                    });

                var figuere = $(document.createElement('div')).html(img.add(figcaption)).addClass('figre');

                var storeLink =
                    $(document.createElement('a')).attr({
                        //  href: "./storeHome.html?storeNo=2001"
                        //  href: "./storeHome.html?storeNo="+store.storeNo
                        //  href: "../html-src/storeHome.html?storeNo=" + store.storeNo,
                        //  rel: "external",
                        //  class: "ui-link"
                        id: store.storeNo
                    });
                var storeBlockA = $(document.createElement('div')).addClass('ui-block-a').html(storeLink.html(figuere));
                $('#list-store').append(storeBlockA);
            });
        },
        complete: function () {
            console.log('complete : storeList ajax');
            callStoreHome();

            $('#codeError').modal();

        },
        error: function (JSONData, status) {
            //                alert("잘못된 요청입니다.");
        }
    });
});

$('#myLocBtn').on('click',function(){
   MYLOCATION.set();
});