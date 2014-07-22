
var imageByte;
var imageDataObject='';
function capturePhotoCamera() {
    // navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 ,
    // destinationType: navigator.camera.DestinationType.DATA_URL});
    
    navigator.camera.getPicture(onSuccess, onFail, {
                                quality: 50,
                                destinationType: Camera.DestinationType.DATA_URL
                                });
    
}

function onPhotoDataSuccess(imageData) {
    //$.mobile.navigate('#dvScanMemberShip');
}

function onFail() {
    alert('Failed because: ' + message);
}

function capturePhotoLibrary() {
    
    
    navigator.camera.getPicture(onSuccess, onFail, {
                                quality: 50,
                                destinationType: Camera.DestinationType.DATA_URL,
                                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                                });
}


function capturePhotoLibrary1() {
    
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                                quality: 50,
                                destinationType: Camera.DestinationType.DATA_URL,
                                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                                });
}

function capturePhotoLibrary2() {
    
    navigator.camera.getPicture(getPhoto, onFail, {
                                quality: 50,
                                destinationType: Camera.DestinationType.DATA_URL,
                                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                                });
}

function onSuccess(imageData) {
   // $('img.clsImage').attr('src', "data:image/jpeg;base64," + imageData);
    //    var image = document.getElementByClass('clsImage');
    //    image.src = "data:image/jpeg;base64," + imageData;
    try
    {
        imageDataObject=imageData;
        // window.localStorage.setItem("imageData", imageData);
    }
    catch(e)
    {
        alert(e);
    }
    
    //    alert( window.localStorage.getItem("imageData"));
    
    //    $("#imageHolder1").attr('src',"http://www.hdnewpictures.com/wp-content/uploads/2014/06/Funny-1.jpg");
    //},5000);
    //
    //
}


function getPhoto(imageData) {
    qrcode.callback=function(){
        if(this.result=="error")
        {
            alert('Decoded:'+this.result)
            
        }
        else
        {
            var code = 'sad'
            var ajaxcallobj = {
            url: 'getmembershippoints',
            data: { qr_code: code }
            }
            
            WMT.jqXHR(ajaxcallobj, function (response) {
                      if (response != undefined && response != null) {
                      $('#abl_pnt').html(response[0].availPoints);
                      $('#str_pnt').html(response[0].storePoints);
                      $('#wmt_pnt').html(response[0].wmtPoints);
                      
                      }
                      });
            
        }
    };
    qrcode.decode("data:image/jpeg;base64," + imageData);
}

function onFail(message) {
    alert('Failed because: ' + message);
}

