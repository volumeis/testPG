$(document).one('pagecreate', '#cart-page', function () {
        console.log("cart.js 호출")
        $.ajax({
            // 회원 번호를 통해 호출

            url: COMMONWEBSERVER + "/cart/getJsonCart/" + LOGIN_NO,
            method: "GET",
            dataType: "json",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            success: function (JSONData, status) {

                $.each(JSONData.cartmap.cartlist, function (i, item) {
                	
                    var cindex = i;
                    var cdiv = $(document.createElement('div')).addClass('ui-grid-b').attr({
                    	id: 'cdiv' + cindex,
                    	style: 'margin: 5px 0px; border: 1px solid lightgray; text-align:center'
                    		
                    });
                    var cimgdiv = $(document.createElement('div')).addClass('ui-block-a').attr({
                    	id: 'cimgdiv' + cindex,
                    	style: 'width:25%'
                    });
                    var ctexttop = $(document.createElement('div')).addClass('ui-block-b')
                        .attr({
                            id: 'ctop' + cindex,
                            style: 'width:45%;height:30px; text-align: right; padding :5px;font-size:115%'
                        });
                    var ctextmid = $(document.createElement('div')).addClass('ui-block-c tprice')
                        .attr({
                            id: 'cmid' + cindex,
                            style: 'width:30%;height:30px; text-align: right;padding :5px 15px 0px 0px'
                           
                        });
                    var ctextbot = $(document.createElement('div')).addClass('ui-block-c')
                        .attr({
                            id: 'cbot' + cindex,
                            style: 'width:30%;height:30px'
                        });

                    var cempty = $(document.createElement('div')).addClass('ui-block-b')
                    .attr({
                        id: 'empty' + cindex,
                        style: 'width:45%;height:30px'
                    });
                    
                    var cimg =
                        $(document.createElement('img')).attr({
                            src: "../image/breadImg/" + JSONData.cartmap.cartlist[i].breadDesc.storeNo + "/" + JSONData.cartmap.cartlist[i].breadDesc.img,
                            class: "img-rounded",
                            style: "height:60px; width:60px"
                        });

                    var cdel = $(document.createElement('div'))
                        .addClass('ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all').attr({
                            id: "cdel" + cindex,
                            style: "float:right; margin:0px 10px 5px 10px"
                        });

                    var cselect =
                        $(document.createElement('select')).data('mini', true).attr({
                            name: "cselect" + cindex,
                            id: "cselect" + cindex,
                            style: "float:right"
                        });

                    // Cart 스토어 정보 var 선언부
                    // 04.29 경철

                    /*var storeDiv = $(document.createElement('div')).addClass('ui-grid-a').attr('id', 'sdiv' + cindex);*/
                    var storeDivImg = $(document.createElement('div')).addClass('ui-block-a').attr('id', 'sdiv' + cindex);
                    var storeDivName = $(document.createElement('div')).addClass('ui-block-a storecap').attr({
                    	id: 'sname' + cindex
                    	
                    });
                    
                    var storeDivSolo = $(document.createElement('div')).addClass('ui-grid-solo').attr({
                    	id: 'sdivsolo' + cindex,
                    	style: 'position:relative;'
                    });
                    var simg =
                        $(document.createElement('img')).attr({
                            src: "../image/storeImg/store_" + JSONData.cartmap.cartlist[i].breadDesc.storeNo + ".jpg",
                            style: "height:100%; width:100%; border: 1px solid lightgray"
                        });

                    console.log(JSONData.cartmap.cartlist[i]);

                    for (var j = 0; j < 5; j++) {
                        var option = document.createElement('option');
                        option.text = j + 1;
                        option.value = j + 1;

                        if (option.text == 1) {
                            option.selected = true;
                        }

                        cselect.append(option);
                    }

                    // 스토어 정보 빵보다 우선시 되게 넣기 위해서
                    if (i == 0) {
                        $('#maincdiv').append(storeDivSolo.html(storeDivImg.html(simg)).append(storeDivName));
                        $('#sname' + cindex).append(JSONData.cartmap.cartlist[i].storeName);
                    }

                    $('#maincdiv').append(cdiv.html(cimgdiv.html(cimg)).append(ctexttop).append(ctextmid).append(cempty).append(ctextbot));
                    $('#ctop' + cindex).append(JSONData.cartmap.cartlist[i].breadDesc.name);
                    $('#cbot' + cindex).append(cdel).append(cselect);

                    if (i != (Object.keys(JSONData.cartmap.cartlist).length) - 1) {
                        if (JSONData.cartmap.cartlist[i].breadDesc.storeNo != JSONData.cartmap.cartlist[i + 1].breadDesc.storeNo) {

                            var simg1 =
                                $(document.createElement('img')).attr({
                                    src: COMMONWEBSERVER + "/image/storeImg/store_" + JSONData.cartmap.cartlist[i + 1].breadDesc.storeNo + ".jpg",
                                    style: "height:100%; width:100%"
                                });
                            $('#maincdiv').append(storeDivSolo.html(storeDivImg.html(simg1)).append(storeDivName));
                            $('#sname' + cindex).append(JSONData.cartmap.cartlist[i + 1].storeName);
                        }
                    }

                    $("#cselect" + cindex).change(function () {
                            var str = 0;
                            $("#cselect" + cindex).each(function () {
                                str += +($(this).val() * JSONData.cartmap.cartlist[i].breadDesc.price);
                            });
                            $('#cmid' + cindex).text(str);
                            $.ajax({
                                url: COMMONWEBSERVER + "/cart/updateJsonCart/buyQty=" + $(this).val() + "&cartNo=" + JSONData.cartmap.cartlist[i].cartNo,
                                method: "GET",
                                dataType: "json",
                                headers: {
                                    "Accept": "application/json",
                                    "Content-Type": "application/json"
                                },
                                complete: function(){
                                	// common.js 안에 있음
                                    countCart();
                                }
                            });

                            
                        })
                        .change();


                    $("#cselect" + cindex).change(function () {
                            var sum = 0;
                            $(".tprice").each(function () {
                                sum += +($(this).text());
                                $("#totalprice").text(sum);
                                $("#totalprice").append("원");
                                
                            });
                        })
                        .change();

                    $('#cdel' + cindex).click(function () {
                        $.ajax({
                            url: COMMONWEBSERVER + "/cart/delJsonCart/" + JSONData.cartmap.cartlist[i].cartNo,
                            method: "GET",
                            dataType: "json",
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            },
                        	
	                        complete: function(){
	                        	$('#cdiv' + cindex).remove();
	                            
	                            // common.js 안에 있음
	                            countCart();
	                            
	                            var sum = 0;
	                            $(".tprice").each(function () {
	                                sum += +($(this).text());
	                                $("#totalprice").text(sum+"원");
	                                
	                            });
	                            if($(".tprice").text() == ""){
	                            	$("#totalprice").text("0원");
	                            }
	                            
	                            if($(".ui-grid-b").text() ==""){
	                            	$(".ui-grid-solo").remove();
	                            }
	                            
	                            
	                        }
                        });
                        
                    });

                })
            }
        })

  
   
        	    //결제하기
        	   $('#submit').on('click',function() {
        	    	console.log(' 나클릭됨');
        	    	console.log(' 확인 def' + $('#maincdiv div').length);
        	    	
        	    	if($('#maincdiv div').length != 0) {
        	    		console.log(' 확인 yes' + $('#maincdiv div').length);
                
                		$("a[href='#']").attr("href","#popupDialog");
                		
                		$("#breadPayment").on("click", function () {
                			$.ajax({
                          // 회원 번호를 통해 호출
                				url: COMMONWEBSERVER + "/border/addBorder/" + LOGIN_NO,
                				method: "GET",
                				dataType: "json",
                				headers: {
                					"Accept": "application/json",
                					"Content-Type": "application/json"
                					},
                					success: function (JSONData, status) {
                						$.mobile.changePage("confirm.html");
                				    }
                				});
                	 		});
                	
        	    	} else {
                	   //담긴 상품이 없을 때
                	   console.log(' 확인 no' + $('#maincdiv div').length)
                       $("a[href='#']").attr("href","#noPopup");
                	}
          }) 	    
      });
  