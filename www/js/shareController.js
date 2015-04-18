/**
 * Created by andreaterzani on 03/04/15.
 */
app.controller("shareController", function($scope,$rootScope,$state, $ionicModal, $cordovaCamera, $cordovaSocialSharing) {
    console.log("Share controller");


    $scope.finalImg = $rootScope.finalImg;


    $scope.shareAnywhere = function() {

        var image = $rootScope.finalImg;
        $cordovaSocialSharing.share($rootScope.frase, $rootScope.subject, image, "http://digitalchampions.it");
    }

    $scope.shareViaMail = function() {
    console.log('shareViamail');

        var image = $rootScope.finalImg;

        $cordovaSocialSharing
            .shareViaEmail($rootScope.frase, $rootScope.subject,['raccontaci@digitalchampions.it'], [], [], image);


    }

});
