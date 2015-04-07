app.controller("messageController", function($scope,$state, $ionicModal,$rootScope, $cordovaCamera, $cordovaSocialSharing,$timeout,$ionicActionSheet) {
    console.log("Message controller");


    $scope.text = "Scrivi il tuo messaggio";
    $scope.frase = "";
    $scope.stampURL = "";
    $scope.sourceType = null;
    $scope.finalImg =null;


    $scope.apriCamera = function() {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: 'Camera' },
                { text: 'Telefono' }
            ],
            titleText: 'Seleziona sorgente',
            cancelText: 'Cancel',
            cancel: function() {
                hideSheet();
            },
            buttonClicked: function(index) {
                if (index==0){
                    $scope.sourceType=1;
                    hideSheet();

                    $scope.takePicture();

                }
                if (index==1){
                    $scope.sourceType=0;
                    hideSheet();

                    $scope.takePicture();

                }
            }
        });



    };






    $ionicModal.fromTemplateUrl('photo.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });



    $scope.openModal = function() {

        $scope.modal.show();
        $scope.resizeCanvas();


    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });


    $scope.resizeCanvas = function() {
        var canvasPad = document.getElementById('photoCanvas');
        var ratio = 1; //window.devicePixelRatio || 1;
        canvasPad.width = imgW; // canvasPad.offsetWidth * ratio;
        canvasPad.height = imgH; //canvasPad.offsetHeight * ratio;



        canvasPad.getContext("2d").scale(ratio, ratio);
    };



    $scope.takePicture = function() {
        console.log("Take picture");
        if(false){
            $scope.openModal();
        }else{

            $scope.openModal();
            $scope.finalImg=null;


            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: $scope.sourceType, //Camera.PictureSourceType.CAMERA,//Camera.PictureSourceType.LIBRARY,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: imgW,
                targetHeight: imgH,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true
            };



            $cordovaCamera.getPicture(options).then(function(imageData) {
                var imageURI= "data:image/jpeg;base64," + imageData;

                var canvas = document.getElementById('photoCanvas');
                var context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);

                var imageObj = new Image();
                imageObj.src = imageURI;


                imageObj.onload = function() {


                    context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height,
                        0, 0, canvas.width, canvas.height);


                    context.font = "100px Impact";
                    textWidth = context.measureText($scope.frase).width;

                    if (textWidth > canvas.offsetWidth) {
                        context.font = "60px Impact";
                    }

                    context.textAlign = 'center';
                    context.fillStyle = 'white';

                    wrapText(context, $scope.frase, canvas.offsetWidth / 2, canvas.offsetHeight * txtpH, canvas.offsetWidth - 20, 65);


                    var imgURI = canvas.toDataURL("image/jpeg");

                    $timeout(function () {

                        $scope.finalImg = imgURI;

                    }, 200);
                }
            });
        }
    }

    $scope.applyLogo = function(logo) {

        var lgurl = '';
        if(logo=='fail'){
            lgurl='img/btn_fail.png';
            $scope.subject = '#EPIC FAIL';

        }else
        {
            lgurl='img/btn_win.png';
            $scope.subject = '#EPIC WIN';

        }
        var canvas = document.getElementById('photoCanvas');
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        var imageObj = new Image();
        imageObj.src = $scope.finalImg;

        var stampImg = new Image();
        stampImg.src =lgurl;

        imageObj.onload = function() {
            stampImg.onload=function()
            {

                context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height,
                    0, 0, canvas.width, canvas.height);

                var ratio = canvas.width / imageObj.width;

                console.log("ratio :" + ratio);

                console.log("stampWidth :" + stampImg.width);
                console.log("stampHeight:" + stampImg.height);

                stampsizew = stampImg.width * ratio * 2;
                stampsizeh = stampImg.height * ratio * 2;

                context.drawImage(stampImg, (canvas.offsetWidth * 0.75 - stampsizew / 2), (canvas.offsetHeight * logopH - stampsizeh / 2), stampsizew, stampsizeh);


                var imgURI = canvas.toDataURL("image/jpeg");

                $timeout(function () {

                    $scope.finalImg = imgURI;
                    $rootScope.finalImg = imgURI;
                    $rootScope.subject = $scope.subject;
                    $rootScope.frase =$scope.frase;

                    $scope.closeModal();

                    $state.go('share');

                }, 200);
            }
        }


    }

    $scope.drawPic = function() {

        var canvas = document.getElementById('photoCanvas');
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        var imageObj = new Image();
        imageObj.src = 'img/960.jpg';

        var stampImg = new Image();
        stampImg.src = $scope.stampURL;

        imageObj.onload = function() {


            context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height,
                0, 0, canvas.width, canvas.height);

            var ratio = canvas.width / imageObj.width;

            console.log("ratio :" + ratio);

            console.log("stampWidth :" + stampImg.width);
            console.log("stampHeight:" + stampImg.height);

            stampsizew = stampImg.width * ratio * 2;
            stampsizeh = stampImg.height * ratio * 2;

            context.drawImage(stampImg, (canvas.offsetWidth * 0.75 - stampsizew / 2), (canvas.offsetHeight * logopH - stampsizeh / 2), stampsizew, stampsizeh);

            context.font = "100px impact";
            textWidth = context.measureText($scope.frase).width;

            if (textWidth > canvas.offsetWidth) {
                context.font = "60px impact";
            }

            context.textAlign = 'center';
            context.fillStyle = 'white';

            wrapText(context, $scope.frase, canvas.offsetWidth / 2, canvas.offsetHeight * txtpH, canvas.offsetWidth - 20, 65);


            var imgURI= canvas.toDataURL("image/jpeg");

            $timeout( function(){

                $scope.finalImg = imgURI;

            }, 200);

        }


    }

});
