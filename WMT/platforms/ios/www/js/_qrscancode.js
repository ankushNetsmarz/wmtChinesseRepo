﻿(function ($) {

    /* Scan Membership Card function */
    QRScan.ScanMemberShipCard = function () {
       cordova.plugins.barcodeScanner.scan(
		function (result) {
		   // $.mobile.navigate('#dvScanMemberShip');

		
		    if (result.text.length > 0) {
		        GetPoints(result.text);
		    }
		    else {
		        alert("Scanning failed:");

		    }
		
		 
		}, 
		function (error) {
			alert("Scanning failed: " + error);
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
                        GetPoints(result.text);
                    }
                    else {
                        alert("Scanning failed:");

                    }
                },
                function (error) {
                    alert("Scanning failed: " + error);
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
        $('#net_cost').html('&nbsp  ' + Math.round(netcost));
    }
    else {
        $('#net_cost').html('&nbsp  ' + Math.round(cost));
    }


});

$('#chkMbr_dis').change(function () {
    var cost = $('#total_cost').val();
    if ($('#chkMbr_dis').prop('checked')) {
        var discount = $('#dis_rte').html();
        var netcost = cost - (cost * (discount / 100));
        $('#net_cost').html('&nbsp  ' + Math.round(netcost));
    }
    else {
        $('#net_cost').html('&nbsp  ' + Math.round(cost));
    }
});

function GetScanData() {
    var ajaxcallobj1 = {
        url: 'getmembershipdsicount',
        data: { store_id: objlocalStorage.Store_ID }
    }
    WMT.jqXHR(ajaxcallobj1, function (response) {
        if (response != undefined && response != null) {

            $('#dis_rte').html(response[0].Membership_discount);

        }
    });

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
                    pointhtml += ' <div class="div_pnt"><div class="pnt_lft"><div class="mgn_lft">' + response[i].giftPoint + ' Points for a ' + response[i].introduction + '</div>'
                    pointhtml += '</div><div class="ptn_rgt"><div class="btn_exge Gift_Exchange"  giftpoint=' + response[i].giftPoint + ' > 兑换 </div> </div> <div  class="cus_clr"></div> </div>'
                }

            }
            $('#point_div').html(pointhtml);
        }

    });

    /* fetch the Sale Discount. */
    var ajaxcallSaleobj = {
        url: 'lastminutesale',
        data: { store_id: objlocalStorage.Store_ID }
    }
    WMT.jqXHR(ajaxcallSaleobj, function (response) {

        var salehtml = "";
        if (response.length != 0) {
            if (response != undefined && response != null) {
                for (var i = 0 ; i < response.length; i++) {
                    salehtml += '<div class="div_itmdis"><input  type="checkbox"> </div><div class="Cus_dnt">Discount Item - ' + response[i].introduction + ' </div>'
                    salehtml += ' <div class="cus_clr"></div>'
                }
            }
            $('#Discount_Item_1').html(salehtml);
        }
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
                    producthtml += ' <div class="div_itmdis"><input  type="checkbox"> </div><div class="Cus_dnt">Discount Item - ' + response[i].Introduction + ' </div>'
                    producthtml += ' <div class="cus_clr"></div>'
                }

            }
            $('#Discount_Item_2').html(producthtml);
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
    var point = $(this).attr('giftpoint');
    $('#gift_point').html(point);

    var multiplier = $('#gift-multiplier').html();
    var gifttotal = point * multiplier;
    $('#gift_Total').html(gifttotal);
    $.mobile.navigate('#dvExchange');
})




/*******************************************************************************************************/

/*********************************Click on Minus **************************************/
$('#minus').click(function () {

    var multiplier = $('#gift-multiplier').html();
    if (multiplier != 1) {
        $('#gift-multiplier').html(parseInt(multiplier) - 1)
        var point = $('#gift_point').html();
        var multiplier = $('#gift-multiplier').html();
        var gifttotal = point * multiplier;

        $('#gift_Total').html(gifttotal);
    }

})


/*******************************************************************************************************/

/*********************************Click on plus **************************************/

$('#plus').click(function () {

    var multiplier = $('#gift-multiplier').html();

    $('#gift-multiplier').html(parseInt(multiplier) + 1)
    var point = $('#gift_point').html();
    var multiplier = $('#gift-multiplier').html();
    var gifttotal = point * multiplier;

    $('#gift_Total').html(gifttotal);


})

/*******************************************************************************************************/

$('#submitmemberid').click(function () {


    if ($('#member_id').val() == '') {
    }
    else {
        var memberid = $('#member_id').val();
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
                  $('#member_id').val('');
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
            alert('member not regestered...');
        }
    });
}