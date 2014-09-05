var Publishpinfor = "";
var paramType = "";
var IndustriesIds = "";
(function ($) {

    /* Get My Store Data*/
    $('#dvStore').on('pageshow', function () {
        objlocalStorage = JSON.parse(localStorage.getItem("LocalStorageObj"));
        if (objlocalStorage != null) {
            myStore.getStoredata();
        }
    });

    myStore.getStoredata = function () {
        var ajaxcallobj = { HttpVerb: "GET", url: "editstoreinfo", data: { store_id: objlocalStorage.Store_ID } }

        WMT.jqXHR(ajaxcallobj, function (response) { binddata(response); });

        var binddata = function (obj) {
            resetControl();
            var logosrc = "http://182.92.83.16/ZendApp/public/logo/" + obj[0].logo;
            $("#StoreLogo").attr("src", logosrc);
            var industries = obj[0].industries.split(',');

            console.log(industries);
            $('#storename').html(obj[0].StoreName);
            $('#storeaddresss').html(obj[0].Address);

                $('#storeaddresss2').html(obj[0].Address2);
 
            $('#storephone').html(obj[0].PhoneNumber);
            $('#storeownername').html(obj[0].OwnerName);
            $('#emailaddress').html(obj[0].EmailAddress);
            var indus = industries[0] == "" ? "Industry level1" : industries[0];
            $('#sltIndustryEdit1').val(indus).selectmenu('refresh', true);
            var indus = industries[1] == "" ? "Industry level1" : industries[1];
            $('#sltIndustryEdit2').val(indus).selectmenu('refresh', true);
            var indus = industries[2] == "" ? "Industry level1" : industries[2];
            $('#sltIndustryEdit3').val(indus).selectmenu('refresh', true);
            IndustriesIds = obj[0].industryIDs;
        }
    }

  

    /* Update Store Changes */
    $(document).on('submit', '#frmSaveStoreChanges', function () {
        Publishpinfor = "Store";
        $('#publishinfotext').html('<h1>保存更改</h1>');
        $.mobile.navigate('#dvPublishPin');
    });

    /* Update Store industries */
    $(document).on('submit', '#frmUpdateIndustryChanges', function () {
        Publishpinfor = "Industries";
        $('#publishinfotext').html('<h1>保存更改</h1>');
        $.mobile.navigate('#dvPublishPin');
    });


    /* Modify button event */

    $(document).on('click','.modify-btn', function () {
        $('#dvMystoreInfo').find('div.dynamicInputs').remove();

        var $this = $(this).parents('.modyfy-button').prev('div');
        //$('.modify-btn').attr('value', '编辑').button("refresh");
        $('.editimage').css('display', 'block');
        $('#change_password').html('******');
        $('#Publish_Password').html('******');
        if ($(this).closest('.Storecancel').attr('customattr') == "Cancel") {
            $('.btnStoreChanges').removeClass('clsStoreShow').addClass('clsStorHide');
            //$(this).attr('value', '编辑').button("refresh");
            //$(this).removeAttr('customattr');
            $('.Storecancel').css('display', 'none');
            $this.find('div.dynamicInputs').remove();
            $('.editimage').css('display', 'block');

        } else {          
            //$('.modify-btn').removeAttr('customattr');
            if ($this.attr('id') == "storephone") {
                $('<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset dynamicInputs firstClass" ><input type="text" name="txtEditStore" class="secondClass" currentControl="' + $this.attr('id') + '" value="' + $this.html() + '" maxlength="15" /><div style="clear:both"></div><div class="button"><div class="help-btn-pick btnStoreChanges clsStoreShow" style="display: none;"><div class="ui-btn ui-input-btn ui-btn-a ui-corner-all ui-shadow">取消<input type="button"  name="Help" customattr="Cancel" value="取消" class="modify-btn Storecancel" data-theme="a"/></div></div><div class="clr"></div></div></div>').insertAfter($this);
                $('.btnStoreChanges').removeClass('clsStorHide').addClass('clsStoreShow');
            }
            else if ($this.attr('id') == "change_password") {
                $('<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset dynamicInputs firstClass" ><input type="password" name="txtEditStore" style="margin-bottom:4px"  placeholder="以前的密碼" class="secondClass requfield" id="prev_pwd" currentControl="' + $this.attr('id') + '" value="' + $this.html() + '" /><input type="password"  style="margin-bottom:4px"  placeholder="输入密码" name="txtEditStore" id="new_pwd" class="secondClass requfield" currentControl="' + $this.attr('id') + '" /><input type="password" name="txtEditStore"  style="margin-bottom:4px"  placeholder="输入密码" class="secondClass requfield" id="Repeat_password" currentControl="' + $this.attr('id') + '" value="' + $this.html() + '" /><div style="clear:both"></div><div class="button"><div class="help-btn-pick btnStoreChanges clsStoreShow"><div class="ui-btn ui-input-btn ui-btn-a ui-corner-all ui-shadow">節省<input type="button"  name="Help" customattr="Cancel" value="節省" class="udte_pwd" data-theme="a"/></div></div><div class="clr"></div></div><div style="clear:both"></div><div class="button"><div class="help-btn-pick btnStoreChanges clsStoreShow" ><div class="ui-btn ui-input-btn ui-btn-a ui-corner-all ui-shadow">取消<input type="button"  name="Help" customattr="Cancel" value="取消" class="modify-btn Storecancel" data-theme="a"/></div></div><div class="clr"></div></div></div>').insertAfter($this);
                $('#prev_pwd').val('');
                $('#new_pwd').val('');
                $('#change_password').html('')
                $('#change_password').html('');

                $('.btnStoreChanges').removeClass('clsStoreShow').addClass('clsStorHide');
            }
            else if ($this.attr('id') == "Publish_Password") {
                $('<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset dynamicInputs firstClass" ><input type="password" placeholder="输入密码" style="margin-bottom:4px" name="txtEditStore" id="Publish_new_pwd" class="secondClass requfield" currentControl="' + $this.attr('id') + '" /><input style="margin-bottom:4px" type="password" name="txtEditStore" placeholder="输入密码" class="secondClass requfield" id="Publish_Repeat_password" currentControl="' + $this.attr('id') + '" value="' + $this.html() + '" /><div style="clear:both"></div><div class="button"><div class="help-btn-pick btnStoreChanges clsStoreShow"><div class="ui-btn ui-input-btn ui-btn-a ui-corner-all ui-shadow">節省<input type="button"  name="Help" customattr="Cancel" value="節省" class="Publish_udte_pwd" data-theme="a"/></div></div><div class="clr"></div></div><div style="clear:both"></div><div class="button"><div class="help-btn-pick btnStoreChanges clsStoreShow" ><div class="ui-btn ui-input-btn ui-btn-a ui-corner-all ui-shadow">取消<input type="button"  name="Help" customattr="Cancel" value="取消" class="modify-btn Storecancel" data-theme="a"/></div></div><div class="clr"></div></div></div>').insertAfter($this);
                $('#prev_pwd').val('');
                $('#Publish_prev_pwd').val('');
                $('#Publish_Password').html('');

                $('.btnStoreChanges').removeClass('clsStoreShow').addClass('clsStorHide');
            }
            else {
                $('<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset dynamicInputs firstClass" ><input type="text" name="txtEditStore" class="secondClass" currentControl="' + $this.attr('id') + '" value="' + $this.html() + '" /><div style="clear:both"></div><div class="button"><div class="help-btn-pick btnStoreChanges clsStoreShow" style="display: none;"><div class="ui-btn ui-input-btn ui-btn-a ui-corner-all ui-shadow">取消<input type="button"  name="Help" customattr="Cancel" value="取消" class="modify-btn Storecancel" data-theme="a"/></div></div><div class="clr"></div></div></div>').insertAfter($this);
                $('.btnStoreChanges').removeClass('clsStorHide').addClass('clsStoreShow');
            }
            $(this).closest('.editimage').css('display', 'none');

           // $(this).attr('value', '取消').button("refresh");
           // $(this).attr('customattr', '取消');
        }
        paramType = $this.attr('id');
    });

    $(document).on("click", ".udte_pwd", function () {
        if ($('#prev_pwd').val() == '' || $('#new_pwd').val() == '' || $('#Repeat_password').val() == '') {
            $.dynamicSuccess_popup('<p>所有的场都需要.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
            return;
        }
        if (checkmatch()) {
            $.dynamicSuccess_popup('<p>新密码不匹配.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
            return;
        }

        if (objlocalStorage.Publish_Pin != null && objlocalStorage.Publish_Pin != undefined && objlocalStorage.Publish_Pin != "") {
            Publishpinfor = "Password";
            $('#publishinfotext').html('<h1>更改密码</h1>');
            $.mobile.navigate('#dvPublishPin');
        }
        else {
            ChangePassword();
        }


    })
    $(document).on("blur", "#Repeat_password", function () {
        if (checkmatch()) {
            $.dynamicSuccess_popup('<p>新密码不匹配.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
        }
        else {
        }

    });

    /* check Pwd */
    function checkmatch() {
        if ($('#Repeat_password').val() != $('#new_pwd').val()) {

            return 1;
        }
        else {
            return 0;
        }
    }
})(jQuery);
function ChangePassword() {
    var previouspassword = $('#prev_pwd').val();
    var newpassword = $('#new_pwd').val();

    var ajaxcallobj = {
        url: "changestorepassword",
        data: { store_id: objlocalStorage.Store_ID, old: previouspassword, newpassword: newpassword }
    }


    WMT.jqXHR(ajaxcallobj, function (response) {

        if (response.success > 0) {
            resetControl();
            myStore.getStoredata();
            $.dynamicSuccess_popup('<p>密码成功地更新。</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
        }
        else {

            myStore.getStoredata();
            $.dynamicSuccess_popup('<p>密码未更新。</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
        }
    });
}



var resetControl = function () {
    $('#dvMystoreInfo').find('div.dynamicInputs').remove();
    $('.btnStoreChanges').css({ 'display': 'none' });
    $('.btnStoreChanges').removeClass('clsStoreShow').addClass('clsStorHide');
    $('.editimage').css('display', 'block');
    //$('.modify-btn').attr('value', '编辑').button("refresh").removeAttr('customattr');
}

function savestoreinformation() {

    var currentControl = $('form#frmSaveStoreChanges').find('input[type=text]').val();
    var type = $('#sltType').val();
    var ajaxcallobj = {
        url: "updatefield",
        data: { store_id: objlocalStorage.Store_ID, ParamType: paramType, value: currentControl, type: type }
    }


    WMT.jqXHR(ajaxcallobj, function (response) {
        if (response.success > 0) {
            resetControl();
            myStore.getStoredata();
            $.dynamicSuccess_popup('<p>信息已成功更新</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
        }
    });
}

function saveindustriesinformation() {
    var Industrylevel1 = $('#sltIndustryEdit1').val();
    var Industrylevel2 = $('#sltIndustryEdit2').val();
    var Industrylevel3 = $('#sltIndustryEdit3').val();
    var type = $('#sltType').val();
    var ajaxcallobj = {
        url: "updateindustries",
        data: { store_id: objlocalStorage.Store_ID, ParamType: paramType, Industrylevel1: Industrylevel1, Industrylevel2: Industrylevel2, Industrylevel3: Industrylevel3, IndustriesIds: IndustriesIds, type: type }
    }


    WMT.jqXHR(ajaxcallobj, function (response) {
        if (response.success > 0) {
            resetControl();
            myStore.getStoredata();
            $.dynamicSuccess_popup('<p>信息更新成功地</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
        }
    });
}
/****************************************************** publish Password *************************************************************************/
$(document).on("click", ".Publish_udte_pwd", function () {


    if ($('#Publish_new_pwd').val() == '' || $('#Publish_Repeat_password').val() == '') {
        $.dynamicSuccess_popup('<p>所有的场都需要.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
        return;
    }
    if (Publishcheckmatch()) {
        $.dynamicSuccess_popup('<p>新密码不匹配.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
        return;
    }
    if (objlocalStorage.Publish_Pin != null && objlocalStorage.Publish_Pin != undefined && objlocalStorage.Publish_Pin != "") {
        Publishpinfor = "PublishPassword";
        $('#publishinfotext').html('<h1>更改密码</h1>');
        $.mobile.navigate('#dvPublishPin');
    }
    else {
        ChangePublishPassword();
    }




})
function Publishcheckmatch() {
    if ($('#Publish_new_pwd').val() != $('#Publish_Repeat_password').val()) {

        return 1;
    }
    else {
        return 0;
    }
}


function ChangePublishPassword() {
    var previouspassword = $('#prev_pwd').val();
    var newpassword = $('#Publish_new_pwd').val();

    var ajaxcallobj = {
        url: "changePinPassword",
        data: { store_id: objlocalStorage.Store_ID, newpassword: newpassword }
    }


    WMT.jqXHR(ajaxcallobj, function (response) {

        if (response.success > 0) {
            resetControl();
            myStore.getStoredata();
            $('#Publish_Password').html('******');
            $.dynamicSuccess_popup('<p>密码成功地更新.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');

        }
        else {

            myStore.getStoredata();
            $('#Publish_Password').html('******');
            $.dynamicSuccess_popup('<p>密码未更新.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
        }
    });
}
/****************************************************************************************************************************************************************/

/*********************************************************Save Store Logo ********************************************************/
$('#savelogo').click(function () {
    var ajaxcallobj = {
        url: "addlogo",
        data: { store_id: objlocalStorage.Store_ID, logo: imageDataObject }
    }
    WMT.jqXHR(ajaxcallobj, function (response) {

        if (response.success > 0) {          
            $.dynamicSuccess_popup('<p>标志上传</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
        }
        else {

           
            $.dynamicSuccess_popup('<p>在上传的标志问题</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">确定</a>');
        }
    });
});
/*********************************************************************************************************************************/