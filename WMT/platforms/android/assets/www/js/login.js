objlocalStorage.Store_ID = 0;
(function ($) {


    $(document).on('submit', '#frmLogin', function () {
        var UserName = $.trim($('#txtUserName').val());
        var Password = $.trim($('#txtPassword').val());       
        if ($('#rememberme').is(':checked')) {
            RememberMe = true;
        } 
        var ajaxcallobj = {
            url: "userlogin",
            data: { phoneNumber: UserName, password: Password, RememberMe: RememberMe }
        }

        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {

                /* Create Local Storage */
                objlocalStorage.User_ID = response.user_id;
                objlocalStorage.Store_ID = response.store_id;
                objlocalStorage.Publish_Pin = response.publish_password;

                localStorage.setItem("LocalStorageObj", JSON.stringify(objlocalStorage));
                if (RememberMe) {
                    window.localStorage.setItem("username", UserName);
                    window.localStorage.setItem("pwd", Password);
                }
                else {
                    window.localStorage.setItem("username", '');
                    window.localStorage.setItem("pwd", '');
                }
                GetIndustryInformation();
               // $.mobile.navigate("#dvQRCode");
                GetScanData();
                GetDiscount();
               // $.fn.getPublishedInfo();
                $.mobile.navigate('#dvQRCode');
                
            }
            else {
                $.dynamic_popup('<p>错误的用户名和密码.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
            }
        });
    });


    $('.clsok').on('click', function () {
        $('#txtUserName').focus();
    });


    $.fn.ShowPasswordiv = function () {
        $('#frmForgetPassword').hide();        
        $.mobile.navigate("#dvForgetPassword");
        $("input[type='radio']").attr("checked", false).checkboxradio("refresh");
    }


    $('.clsRecover').change(function () {
        $('.clsHide').hide();
        if ($(this).attr('id') == "rdoEmail") {            
            $('#dvShowEmail').removeClass('clsHide').show();
            $('#dvShowSMS').addClass('clsHide');
        }
        else if ($(this).attr('id') == "rdoSMS") {         
            $('#dvShowSMS').removeClass('clsHide').show();
            $('#dvShowEmail').addClass('clsHide');
        }
        $('#frmForgetPassword').removeClass('clsHide').show();

    });


    /* Forget Password Function */
    $(document).on('submit', '#frmForgetPassword', function () {
        var Email = $.trim($('#txtResetPwdByEmail').val());
        var Type = 1; // For Email
        var ajaxcallobj = {
            url: "forgetpassword",
            data: { EmailAddress: Email, Type: Type }
        }
        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
                $('#frmForgetPassword')[0].reset();
                $.dynamicSuccess_popup(' <p>我们已经向您发出的电子邮件的新密码.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
            }
        });
    });

    $('#btnRegister').on('click', function () {
        var ajaxcallobj = {
            url: "getindustry",
            data: { language: 'c' }
        }

        WMT.jqXHR(ajaxcallobj, function (response) {

            if (response.length > 0) {

                $('#selectIndustrylevel1').html(' <option value="' + response[0].industryNameChinese + '">' + response[0].industryNameChinese + '</option> <option value="' + response[1].industryNameChinese + '">' + response[1].industryNameChinese + '</option><option value="' + response[2].industryNameChinese + '">' + response[2].industryNameChinese + '</option><option value="' + response[3].industryNameChinese + '">' + response[3].industryNameChinese + '</option>');
                $('#selectIndustrylevel2').html(' <option value="' + response[0].industryNameChinese + '">' + response[0].industryNameChinese + '</option> <option value="' + response[1].industryNameChinese + '">' + response[1].industryNameChinese + '</option><option value="' + response[2].industryNameChinese + '">' + response[2].industryNameChinese + '</option><option value="' + response[3].industryNameChinese + '">' + response[3].industryNameChinese + '</option>');
                $('#selectIndustrylevel3').html(' <option value="' + response[0].industryNameChinese + '">' + response[0].industryNameChinese + '</option> <option value="' + response[1].industryNameChinese + '">' + response[1].industryNameChinese + '</option><option value="' + response[2].industryNameChinese + '">' + response[2].industryNameChinese + '</option><option value="' + response[3].industryNameChinese + '">' + response[3].industryNameChinese + '</option>');

            }
        });
        $.mobile.navigate("#wstep1");
    });


    /* logout event */
    $('.aLogout').on("click", function () {      
        $('#abl_pnt').html(' ');
        $('#str_pnt').html(' ');
        $('#wmt_pnt').html(' ');
        $('#total_cost').val(' ');
        $('#net_cost').val(' ');
        $('#storename').html(' ');
        $('#storeaddresss').html(' ');
        $('#storeaddresss2').html('');
        $('#emailaddress').html(' ');
        $('#storeownername').html(' ');
        $('#storephone').html(' ');
        $('#Discount_Item_2').html('');
        $('#Discount_Item_1').html('');
        $('#point_div').html('');
        if (RememberMe) {
            window.localStorage.setItem("username", window.localStorage.getItem("username"));
            window.localStorage.setItem("pwd", window.localStorage.getItem("pwd"));
        }
        else {
            window.localStorage.setItem("username", '');
            window.localStorage.setItem("pwd", '');
            $('#txtUserName, #txtPassword').val('');
           // $('#rememberme').prop('checked', false).checkboxradio('refresh');
        }
        localStorage.clear();
        $.mobile.navigate('#login');
    });

    $(document).ready(function () {
        var ajaxcallobj = {
            url: "helptext",
            data: { helptext: 'c' }
        }
        WMT.jqXHR(ajaxcallobj, function (response) {      
            if (response.length > 0) {             
                $('#helptext').html(response[0].helptext);
                
            }
        });
       
    });

})(jQuery)


function GetIndustryInformation() {
    var ajaxcallobj = {
        url: "getindustry",
        data: { language: 'c' }
    }

    WMT.jqXHR(ajaxcallobj, function (response) {

        if (response.length > 0) {

            $('#sltIndustryEdit1').html(' <option value="' + response[0].industryNameChinese + '">' + response[0].industryNameChinese + '</option> <option value="' + response[1].industryNameChinese + '">' + response[1].industryNameChinese + '</option><option value="' + response[2].industryNameChinese + '">' + response[2].industryNameChinese + '</option><option value="' + response[3].industryNameChinese + '">' + response[3].industryNameChinese + '</option>');
            $('#sltIndustryEdit2').html(' <option value="' + response[0].industryNameChinese + '">' + response[0].industryNameChinese + '</option> <option value="' + response[1].industryNameChinese + '">' + response[1].industryNameChinese + '</option><option value="' + response[2].industryNameChinese + '">' + response[2].industryNameChinese + '</option><option value="' + response[3].industryNameChinese + '">' + response[3].industryNameChinese + '</option>');
            $('#sltIndustryEdit3').html(' <option value="' + response[0].industryNameChinese + '">' + response[0].industryNameChinese + '</option> <option value="' + response[1].industryNameChinese + '">' + response[1].industryNameChinese + '</option><option value="' + response[2].industryNameChinese + '">' + response[2].industryNameChinese + '</option><option value="' + response[3].industryNameChinese + '">' + response[3].industryNameChinese + '</option>');

        }
    });
}