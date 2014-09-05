var memberselected = false;
var memberid = 0;
var multiplervalue = 1;
(function ($) {
 
 /* Scan Membership Card function */
 QRScan.ScanMemberShipCard = function () {
 cordova.plugins.barcodeScanner.scan(
                                     function (result) {
                                     // $.mobile.navigate('#dvScanMemberShip');
                                     
                                     
                                     if (result.text.length > 0) {
                                     memberid = result.text;
                                     memberselected = true;
                                     GetPoints(result.text);
                                     }
                                     else {
                                         $.dynamicSuccess_popup(' <p>扫描失败：' + error + '</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
                                     
                                     }
                                     
                                     
                                     },
                                     function (error) {
                                         $.dynamicSuccess_popup(' <p>扫描失败：' + error + '</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
                                     }
                                     );
 }
 
 
 
 /* Load Local Picture function */
 QRScan.LoadPicture = function () {
 capturePhotoLibrary2();
 
 }
 
 /* Offline Scan function */
 QRScan.ScanOffline = function () {
 cordova.plugins.barcodeScanner.scan(
                                     function (result) {
                                     
                                     //  $.mobile.navigate('#dvScanMemberShip');
                                     if (result.text.length > 0) {
                                     memberid = result.text;
                                     memberselected = true;
                                     GetPoints(result.text);
                                     
                                     }
                                     else {
                                         $.dynamicSuccess_popup(' <p>扫描失败：' + error + '</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
                                     
                                     }
                                     },
                                     function (error) {
                                         $.dynamicSuccess_popup(' <p>扫描失败：' + error + '</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
                                     }
                                     );
 }
 
 })(jQuery);


/* Restricte to number */
$('#total_cost').bind('keyup', function () {
                      $(this).val($(this).val().replace(/[^0-9]/g, ''));
                      });

$('#total_cost').blur(function () {
                      var cost = $('#total_cost').val();
                      if ($('#chkMbr_dis').prop('checked')) {
                      
                      var discount = $('#dis_rte').html();
                      var netcost = cost - (cost * (discount / 100));
                      $('#net_cost').val(' ' + Math.round(netcost));
                      }
                      else {
                      $('#net_cost').val(' ' + Math.round(cost));
                      }
                      
                      
                      });
$(document).on('change','#chkMbr_dis',function () {
               var cost = $('#total_cost').val();
               if ($('#chkMbr_dis').prop('checked')) {
               var discount = $('#dis_rte').html();
               var netcost = cost - (cost * (discount / 100));
               $('#net_cost').val(' ' + Math.round(netcost));
               }
               else {
               $('#net_cost').val(' ' + Math.round(cost));
               }
               });

function GetScanData() {

    /* Fetch the Good Exchange point. */
    var ajaxcallgoodobj = {
    url: 'inshopgift',
    data: { store_id: objlocalStorage.Store_ID }
    }
    WMT.jqXHR(ajaxcallgoodobj, function (response) {
              
              var pointhtml = '';
              if (response.length != 0) {
                  if (response != undefined && response != null) {
                      pointhtml += '<div class="div_mpnt"><div class="mpnt_lft"><div class="mgn_lft" id="txtGoodsExchange">积分兑换礼品</div></div>'
                      pointhtml += '<div  class="cus_clr"></div></div>'
                      for (var i = 0 ; i < response.length; i++) {
                          var item = response[i].introduction.substring(0, 8) + '...'
                          pointhtml += ' <div class="div_pnt"><div class="pnt_lft"><div class="mgn_lft">' + response[i].giftPoint + ' 积分兑换： ' + item + '</div>'
                          pointhtml += '</div><div class="ptn_rgt"><div class="btn_exge Gift_Exchange" giftpoint=' + response[i].giftPoint + ' storeid=' + response[i].StoreID + ' ProductID=' + response[i].pID + ' > 兑换 </div> </div> <div  class="cus_clr"></div> </div>'
                      }

                  }
                  $('#point_div').html(pointhtml);
              }
              else {
                  $('#point_div').html(' ');
              }
              
              });
    
    /* fetch the Sale Discount. */
    var ajaxcallSaleobj = {
    url: 'lastminutesale',
    data: { store_id: objlocalStorage.Store_ID }
    }
    WMT.jqXHR(ajaxcallSaleobj, function (response) {
        $('#MemberDiscount').html('<div class="div_mbrdis"><input id="chkMbr_dis"  type="checkbox" style="margin-left:10px;"></div><div class="mbr_disp">成员折扣<span id="dis_rte"> 0 </span>%</div> <div class="cus_clr"></div>');

        var salehtml = "";
        if (response.length != 0) {
            if (response != undefined && response != null) {
                for (var i = 0 ; i < response.length; i++) {

                    var item = response[i].introduction.substring(0, 8) + '...'
                    salehtml += '<div class="div_itmdis"><input  type="checkbox" style="margin-left:10px;"> </div><div class="Cus_dnt">折扣商品： ' + item + ' </div>'
                    salehtml += ' <div class="cus_clr"></div>'
                }
            }
            $('#Discount_Item_1').html(salehtml);
        }
        else {
            $('#Discount_Item_1').html(' ');
        }
        /* fetch Discount */
        var ajaxcallobj1 = {
            url: 'getmembershipdsicount',
            data: { store_id: objlocalStorage.Store_ID }
        }
        WMT.jqXHR(ajaxcallobj1, function (response) {
            if (response.length != 0) {
                if (response != undefined && response != null) {

                    $('#dis_rte').html(' ' +response[0].Membership_discount);

                }
            }
            else {
                $('#dis_rte').html(' 0');
            }
        });

    });
    
    /* fetch the Product Discount.*/
    var ajaxcallproductobj = {
    url: 'productdiscountstore',
    data: { store_id: objlocalStorage.Store_ID }
    }
    WMT.jqXHR(ajaxcallproductobj, function (response) {
              var producthtml = "";
              if (response.length != 0) {
                  if (response != undefined && response != null) {
                      for (var i = 0 ; i < response.length; i++) {
                          var item = response[i].Introduction.substring(0, 8) + '...'
                          producthtml += ' <div class="div_itmdis"><input  type="checkbox" style="margin-left:10px;"> </div><div class="Cus_dnt">折扣商品： ' + item + ' </div>'
                          producthtml += ' <div class="cus_clr"></div>'
                      }

                  }
                  $('#Discount_Item_2').html(producthtml);
              }
              else {
                  $('#Discount_Item_2').html(' ');
              }
              });
}

function GetDiscount() {
    var ajaxcallobj1 = {
    url: 'getmembershipdsicount',
    data: { store_id: objlocalStorage.Store_ID }
    }
    WMT.jqXHR(ajaxcallobj1, function (response) {
              if (response != undefined && response != null) {
              
              $('#dis_rte').html(' ' + response[0].Membership_discount);
              
              }
              });
}

$('.click_scan').click(function () {
    GetScanData();
    GetDiscount();
    $.mobile.navigate('#dvQRCode')
});

/*********************************Navigate to Gift Exchange Screen **************************************/
$(document).on('click', '.Gift_Exchange', function () {
    if (memberselected) {
        $('#gift-multiplier').val('1');
        var point = $(this).attr('giftpoint');
        var StoreId = $(this).attr('storeid');
        var ProductID = $(this).attr('ProductID');
        var memberpoint = $('#abl_pnt').html();
        if (parseInt(point) <= parseInt(memberpoint)) {
            $('#gift_point').html(point);

            var multiplier =  $('#gift-multiplier').val();
            var gifttotal = point * multiplier;
            $('#gift_Total').html(gifttotal);
            $('.Exchange_point').attr({ 'storeid': StoreId, 'ProductID': ProductID, 'memberid': memberid, 'giftpoint': point });
            $('#Phonebtn').attr({ 'memberid': memberid });
            $.mobile.navigate('#dvExchange');
        }
        else {
            $.dynamic_popup('<p>您没有足够的点。</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
        }
    }
    else {
        $.dynamic_popup('<p>  本地照片.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');

    }


});




/*******************************************************************************************************/

/*********************************Click on Minus **************************************/
$('#minus').click(function () {

    var multiplier =  $('#gift-multiplier').val();
    if (multiplier != 1) {
        $('#gift-multiplier').val(parseInt(multiplier) - 1)
        var point = $('#gift_point').html();
        var multiplier =  $('#gift-multiplier').val();
        var gifttotal = point * multiplier;
        multiplervalue = multiplier;
        $('#gift_Total').html(gifttotal);
    }

});


/*******************************************************************************************************/

/*********************************Click on plus **************************************/

$('#plus').click(function () {

    var multiplier =  $('#gift-multiplier').val();

    $('#gift-multiplier').val(parseInt(multiplier) + 1)
    var point = $('#gift_point').html();
    var multiplier =  $('#gift-multiplier').val();
    var gifttotal = point * multiplier;

    var memberpoint = $('#abl_pnt').html();
    if (memberpoint >= parseInt(gifttotal)) {
        multiplervalue = multiplier;
        $('#gift_Total').html(gifttotal);

    }
    else {
        $('#gift-multiplier').val(parseInt(multiplier) - 1)
        $.dynamic_popup('<p>你没有足够的点来购买更多.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
    }


});

/*******************************************************************************************************/

$('#submitmemberid').click(function () {
                           
                           
                           if ($('#member_id').val() == '') {
                           }
                           else {
                           
                           memberselected = true;
                           memberid = $('#member_id').val();
                           var ajaxcallobj = {
                           url: "getmembershippoints",
                           data: {
                           store_id: objlocalStorage.Store_ID,
                           qr_code: memberid
                           }
                           }
                           WMT.jqXHR(ajaxcallobj, function (response) {
                                     if (response != undefined && response != null) {
                                     $('#abl_pnt').html(response[0].wmtAvailablePoints);
                                     $('#str_pnt').html(response[0].storePoints);
                                     $('#wmt_pnt').html(response[0].wmtTotalPoint);
                                     $('#Membernumber').html(response[0].memberPhone1);
                                     $('#member_id').val('')
                                     
                                     $.mobile.navigate("#dvQRCode");
                                     
                                     }
                                     
                                     });
                           
                           }
                           
                           });

function GetPoints(x) {
    var code = x
    var ajaxcallobj = {
    url: 'getmembershippoints',
    data: {
    qr_code: code,
    store_id: objlocalStorage.Store_ID
    }
    }
    
    WMT.jqXHR(ajaxcallobj, function (response) {
              if (response != undefined && response != null) {
              $('#abl_pnt').html(response[0].wmtAvailablePoints);
              $('#str_pnt').html(response[0].storePoints);
              $('#wmt_pnt').html(response[0].wmtTotalPoint);
              
              }
              else {
                  $.dynamicSuccess_popup(' <p>会员未注册....</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
              
              }
              });
}
/********************************* Save Exchange Information ********************************************************/

$('.Exchange_point').click(function () {    
    var point = $(this).attr('giftpoint');
    var StoreId = $(this).attr('storeid');
    var multiplier =  $('#gift-multiplier').val();
    var totalpoint = parseInt(point) * parseInt(multiplier);
    var ProductID = $(this).attr('ProductID');
    var ajaxcallobj = {
        url: "exchangepoint",
        data: {
            store_id: objlocalStorage.Store_ID,
            member_id: memberid,
            p_id: ProductID,
            type: 2,
            amount: totalpoint
        }
    }
    WMT.jqXHR(ajaxcallobj, function (response) {
        if (response != undefined && response != null) {
            $('#abl_pnt').html(response.wmtpoint);
            //$.mobile.navigate("#dvQRCode");
            $('#total_cost').val('');
            $('#net_cost').val('');
            $.mobile.navigate("#dvQRCode");
            setTimeout(function () {
                $.dynamicSuccess_popup(' <p>兑换成功.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back" id="OK_Exchange1">确定</a>');
                console.log(scancode);
            }, 2000);

        }

    });

});



/*******************************************************************************************************/

/************************************** Show the QRScan Page *****************************************************************/

$(document).on('click', '#OK_Exchange', function () {
               // $.mobile.navigate("#dvQRCode");
               });

/*****************************************************************************************************************************/

/************************************** Save the Points on Ok click *****************************************************************/

$(document).on('click', '#txtOK', function () {
               var Point = $.trim($('#net_cost').val());
               if ($('#wmt_pnt').html() == "") {
                   $.dynamicSuccess_popup(' <p>通过单击底部的三个任何一个按钮进入会员资料.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back" id="OK_Exchange">确定</a>');
               return;
               }
               if (Point == '' || Point == '0') {
                   $.dynamicSuccess_popup(' <p>量不能为空.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back" id="OK_Exchange">确定</a>');
               return;
               }
               
               var ajaxcallobj = {
               url: "wmtmemberpoints",
               data: {
               store_id: objlocalStorage.Store_ID,
               member_id: memberid,
               points: Point
               }
               }
               WMT.jqXHR(ajaxcallobj, function (response) {
                         
                         if (response != undefined && response != null) {
                         $('#total_cost').val('');
                         $('#net_cost').val('');
                         $('#wmt_pnt').html(response[0].wmtTotalPoint);
                         $('#abl_pnt').html(response[0].wmtAvailablePoints);
                         
                         $.dynamicSuccess_popup(' <p>购买是成功的</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back" id="OK_Exchange">确定</a>');
                         
                         
                         }
                         
                         });
               
               });

/*****************************************************************************************************************************/

/********************************************** Change the Multiplier value ****************************************************/

$('#gift-multiplier').keyup(function () {
    var multiplier = $('#gift-multiplier').val();
    if (multiplier == 0 || multiplier < 0) {
        $('#gift-multiplier').val('1');
    }
    memberpoint = $('#abl_pnt').html();
    var point = $('#gift_point').html();
    var multiplier = $('#gift-multiplier').val();
    var gifttotal = point * multiplier;
    if (memberpoint >= parseInt(gifttotal)) {
        multiplervalue = multiplier;
        $('#gift_Total').html(gifttotal);

    }
    else {
        $('#gift-multiplier').val(multiplervalue);
        $.dynamic_popup('<p>你没有足够的点来购买更多.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
    }
});

/********************************************************************************************************************************/