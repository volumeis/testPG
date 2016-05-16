$(function () {
//    $.mobile.loading('hide');
    //==> DOM Object GET 3가지 방법 ==> 1. $(tagName) : 2.(#id) : 3.$(.className)
    //$("#customerTel").focus();
    //==>"Login"  Event 연결
    $("#login").on("click", function () {
    	console.log("로그인 과정");
        var id = $("#customerTel").val().trim();
        var pw = $("input:password").val().trim();
        
        if (id == null || id.length < 1) {
           // bootbox.alert("ID 를 입력하지 않으셨습니다.");
        	//$("input:tel").focus();
        	console.log($("#customerTel").val().trim());
        	$("a[href='#']").attr("href","#popupDialog");
            return;
        }

        if (pw == null || pw.length < 1) {
        	//bootbox.alert('패스워드를 입력하지 않으셨습니다.');
        	//$("input:password").focus();
        	console.log($("input:password").val().trim());
        	$("a[href='#']").attr("href","#noPopup");
            return;
        }


        $.ajax({
            url: COMMONWEBSERVER + "/customer/jsonLogin",
//            url: "/customer/jsonLogin",
            method: "POST",
            dataType: "json",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                customerTel: id,
                password: pw
            }),
            success: function (JSONData, status) {

                if (JSONData.customer != null) {

                    location.href = "html/main.html";
                    return;

                } else {
                    //bootbox.alert("아이디 , 패스워드를 확인하시고 다시 로그인...");
                	$("a[href='#']").attr("href","#retry");
                }
            }
        });
    });
});