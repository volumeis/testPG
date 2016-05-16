/**
 * 프론트엔드_공통기능
 */

//민호 pc tomcat 서버
var COMMONWEBSERVER = "http://java78bit404.iptime.org:8025";
//var COMMONWEBSERVER = "";

//민호 pc database 서버
var COMMONDBSERVER = "http://java78bit404.iptime.org:3025";
//var COMM1000pxSERVER = "";
//depreciate
//var COMMONDBSERVER = "http://java78bit404.iptime.org:5025";

//민호 pc node.js 서버
var COMMONNODESERVER = "http://java78bit404.iptime.org:30025";
//var COMMONNODESERVER = "http://localhost:3000";

var LOGIN_NO;
var LOGIN_ID;
var LOGIN_PW;
var QUERYSTRING;
var MYLOCATION = myLocation();

//$(document).off('.data-api');
/**
 *       쿼리스트링 추출
 *
 *       작성일 : 04.20.16
 *       작성자 : 유민호
 */
function getParameter(qs) {
    var value = '';
    var address = unescape(location.href);
    var param = (address.slice(address.indexOf('?') + 1, address.length)).split('&');
    for (var i = 0; i < param.length; i++) {
        var name = param[i].split('=')[0];
        if (name.toUpperCase() == qs.toUpperCase()) {
            value = param[i].split('=')[1];
            break;
        }
    }
    return value;
}

/**
 * 세션체크 이벤
 * 
 * 민호
 * 04.26.16
 */
$(document).on('loadCustomerInfo', function () {
    $.ajax({
        url: COMMONWEBSERVER + "/customer/loginCheck",
        method: "POST",
        dataType: "json",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        success: function (JSONData, status) {
            LOGIN_NO = JSONData.customer.customerNo;
            LOGIN_ID = JSONData.customer.customerTel;
            LOGIN_PW = JSONData.customer.password;
        },
        error: function (JSONData, status) {
            console.log(LOGIN_ID);
            console.log(LOGIN_PW);
        }
    });

    $("#customerID").text(LOGIN_ID)
});

$(document).on('pageshow', function (e, data) {
    if (($.mobile.activePage[0].id != 'join-page') &&
        ($.mobile.activePage[0].id != 'login-page')) {
        console.log('로그인된 계정 : ' + LOGIN_ID);
        $(document).trigger('loadCustomerInfo');
        //        countCart();
    }
});


/**
 *   json 날짜 변환하이
 *   작성자: 송은영, 서형섭 
 */
function GetDateString(jsonDate) {
    var year, month, day, hour, minute, second, returnValue, date, replaceStr

    replaceStr = jsonDate.replace(/\D/g, "");
    date = new Date(parseInt(replaceStr));

    year = date.getFullYear();
    month = Pad(date.getMonth() + 1);
    day = Pad(date.getDate());
    hour = Pad(date.getHours());
    minute = Pad(date.getMinutes());


    //     returnValue = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    returnValue = year + "-" + month + "-" + day;
    return returnValue;
}

function Pad(num) {
    num = "0" + num;
    return num.slice(-2);
}

/* 
 * 카트 배치 카운트
 * 
 * 경철
 * 05.11.16
 * */
function countCart() {
    $.ajax({
        url: COMMONWEBSERVER + "/cart/getJsonCartCount/" + LOGIN_NO,
        method: "GET",
        dataType: "json",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        success: function (JSONData, status) {

            if (JSONData.cartcount != null) {
                $(".badge").text(JSONData.cartcount.cartCount);
            } else {
                $(".badge").text("");
            }
        }

    });
}


/**
 * 페이지 높이 조정
 *
 * 민호
 * 05.09.16
 */
function getRealContentHeight() {
    var header_height = $("div[data-role='header']:visible").outerHeight();
    var footer_height = $("div[data-role='footer']:visible").outerHeight();
    var content = $("div[data-role='main']:visible");
    var content_height = $(window).height() - header_height - footer_height;

    content_height -= (content.outerHeight() - content.height());
    $("div[data-role='main']").css("height", content_height);
}

/**
 * 내 위치 클로저
 *
 * 민호
 * 05.11.16
 */
//내 위치 람다
function myLocation() {
    //내 위치
    var locPosition;
    return {
        //내 위치 저장
        set: function () {
            if (navigator.geolocation) {
                // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                console.log("대기중  : " + locPosition);
                $.mobile.loading('show');
                navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
            } else {
                // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
                console.log('geolocation 사용안함');

                locPosition = new daum.maps.LatLng(37.497916606749946, 127.02753373032039);
            }
        },
        //내 위치 출력
        get: function () {
            return locPosition;
        },
        //내 위치 마킹
        marking: function (map, callback) {

            console.log('marking-my-position');

            var marker = new daum.maps.Marker({
                map: map,
                position: locPosition
            });

            var iwContent = '<div style="padding:5px;">현재 나의 위치</div>', // 인포윈도우에 표시할 내용
                iwRemoveable = true;

            // 인포윈도우를 생성합니다
            var infowindow = new daum.maps.InfoWindow({
                content: iwContent,
                removable: iwRemoveable
            });

            // 인포윈도우를 마커위에 표시합니다 
            infowindow.open(map, marker);

            // 지도 중심좌표를 접속위치로 변경합니다
            map.setCenter(locPosition);
        }
    }

    function successCallback(position) {
        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

        locPosition = new daum.maps.LatLng(lat, lon);
        console.log("가져온location : " + locPosition);
        $.mobile.loading('hide');
        if ($.mobile.activePage[0].id == 'map-page') {
            MYLOCATION.marking(map);
        }
    }

    function errorCallback(error) {
        alert(error.message);
    }
}


function logout() {
    $.ajax({
        url: COMMONWEBSERVER + "/customer/logout",
        method: "GET",
        dataType: "json",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        success: function (JSONData, status) {
            
            if ( $("#login-page").size() > 0) {

            } else {
                alert("로그아웃 되었다");
                location.href = "index.html";
            }
            console.log("logout customer");
        }
    });
}