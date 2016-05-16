//에러코드 타이머
function codeTimer() {
	// 제한시간 120초
	var timeLimit = 120;
	// 시작시간 0초
	var sec = 0;
	// timerId setInterval의 id값.
	var timerId

	timerId = setInterval(function() {
		if (timeLimit >= sec) {
			$('#codeTimer').text(timeLimit - sec);
			sec++;
		} else {
			clearInterval(timerId);
			$('#telIpt').val("010");
			$('.collapse').collapse('hide');
			$('#codeError').modal();
			$('#codeTimer').text(timeLimit);
			$('#checkCodeBtn').removeClass('btn-success');
		}
	}, 1000);
	return timerId;
}

// 4자리코드요청 Ajax
function getCode() {
	$.ajax({
		url : COMMONWEBSERVER + "/customer/getCode",
		method : "POST",
		data : JSON.stringify({
			customerTel : $("#telIpt").val().trim()
		}),
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		dataType : "json",
		success : function(JSONData, status) {
			console.log('요청성공 : ' + $("#telIpt").val().trim());
		},
		error : function(JSONData, status) {
			console.log('오청실패')
		}
	});
}

// 4자리코드 확인요청 Ajax
function checkCode(_timerId) {
	$.ajax({
		url : COMMONNODESERVER + "/joinController/checkCode?joinCode="
				+ $("#codeIpt").val().trim(),
		method : "GET",
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		dataType : "json",
		success : function(JSONData, status) {
			console.log('코드확인요청 성공');
			console.log(JSONData);
			if (JSONData == 'ok') {
				$('#passwordIpt').prop("disabled", false);
				$('#telIpt').prop("disabled", true);
				$('#codeIpt').prop("disabled", true);
				$('#checkCodeBtn').prop("disabled", true);
				
				//$('#passwordIpt').focus();
				$('#joinBtn').addClass('btn-success');
				clearInterval(_timerId);
			} else {
				$("#codeIpt").popover('toggle');
			}
		},
		error : function(JSONData, status) {
			console.log('코드확인요청 실패');
		}
	});
}

// 전화번호, 비밀번호 전송 Ajax
function joinCustomer() {
	$.ajax({
		url : COMMONWEBSERVER + "/customer/addCustomer",
		method : "POST",
		data : {
			customerTel : $("#telIpt").val().trim(),
			password : $("#passwordIpt").val().trim()
		},
		dataType : "json",
		success : function(JSONData, status) {
			if (JSONData != null) {
				bootbox.alert("회원가입완료");
				$(":mobile-pagecontainer").pagecontainer("change",
						$("#login-page"), {
							transition : 'slide',
							reverse : true
						});

			} else {
				bootbox.alert("회원가입이 완료되지 않았습니다.");
				$(":mobile-pagecontainer").pagecontainer("change",
						$("#login-page"), {
							transition : 'slide',
							reverse : true
						});
			}
		},
		error : function(JSONData, status) {
			console.log('회원가입 요청실패');
		}
	});
}
// 핸드폰번호 정규식
$(document).one('pageshow', '#join-page', function() {

	// 휴대폰번호확인 정규식
	var regPhone = /^(?:(010\d{8})|(01[1|6|7|8|9]\d{7,8}))/;
	//var nregPhone = /\d{11}/;
	// 코드타이머
	var timerId;
	// code 입력부분 팝오
	$("#codeIpt").popover({
		content : "핸드폰으로 전송된 4자리 코드 입력",
		delay : {
			"show" : 100,
			"hide" : 300
		},
		placement : 'top'
	});

	// 회원가입 요청부분 입력불가 설정
	$('#passwordIpt').prop("disabled", true);
	$('#passwordChkIpt').prop("disabled", true);
	$('#joinBtn').prop("disabled", true);

	// 핸드폰 번호 입력란
	$('#telIpt').on('input', function() {
		console.log($('#telIpt').val().length);
		//if ($('#telIpt').val().length > 5) {
		if(regPhone.test($('#telIpt').val()) ){
			$('#callCodeBtn').prop("disabled", false);
		} else {
			$('#callCodeBtn').prop("disabled", true);
		}
	});

	// 4자리코드 입력란
	$('#codeIpt').on('input', function() {
		console.log($('#codeIpt').val());
		if ($('#codeIpt').val().length === 4) {
			$('#checkCodeBtn').prop("disabled", false);
			$('#checkCodeBtn').addClass('btn-success');
		} else {
			$('#checkCodeBtn').prop("disabled", true);
		}
	});

	// 비밀번호 입력란
	$('#passwordIpt').on('input', function() {
		if ($('#passwordIpt').val().length >= 4) {
			$('#passwordChkIpt').prop("disabled", false);
		} else {
			$('#passwordChkIpt').prop("disabled", true);
		}
	});

	// 비밀번호확인 입력란
	$('#passwordChkIpt').on('input', function() {
		if ($('#passwordIpt').val() == $('#passwordChkIpt').val()) {
			$('#joinBtn').prop("disabled", false);
			$('#joinBtn').addClass('btn-success');
		} else {
			$('#joinBtn').prop("disabled", true);
		}
	});

	// 코드요청버튼
	$("#callCodeBtn").on("click", function() {
		$('.collapse').collapse('show');
		$('#checkCodeBtn').addClass('btn-success');
		$('#callCodeBtn').prop("disabled", true);
		timerId = codeTimer();

		getCode();
	});

	// 코드확인버튼
	$("#checkCodeBtn").on('click', function() {
		$("#codeIpt").popover('hide');
		checkCode(timerId);
	});

	// 회원가입버튼
	$("#joinBtn").on("click", function() {
		joinCustomer();
	});

});