﻿var objlocalStorage = {}; /* Global Local storage array object */
var RememberMe = false;
//$.mobile.defaultPageTransition = 'slide'; /* Set default transition for all pages */
$.mobile.defaultPageTransition = 'none';
//$.mobile.page.prototype.options.domCache = true;
var imageDataObject = '';
$('.clsback').on('click', function () {
    $('label.error').hide();
    window.history.back();
    $('img.clsImage').attr('src', 'css/images/camra.jpg'); localStorage.removeItem("imageData");
    $('img.clrImages').attr('src', 'css/images/camra.jpg'); localStorage.removeItem("imageData");
    if ($(this).parent().parent().hasClass('$back')) {   
        $.fn.getPublishedInfo();
        if ($(this).parent().parent().hasClass('$back')) {
            $.fn.getPublishedInfo();
            $(this).parent().parent().removeClass('$back');
        }
    }
});

$("#dvImageUpload").enhanceWithin().popup();
$('#dvAgreement').enhanceWithin().popup();
$('#helpPopup-outside-page').enhanceWithin().popup();
$("#EnterMemberId").enhanceWithin().popup();
$("#SortParameter").enhanceWithin().popup();
$("#SavePhoneNumber").enhanceWithin().popup();
$(document).on('click', '#callContactManager', function () {
    window.open($(this).prev('a').attr('href'));
});