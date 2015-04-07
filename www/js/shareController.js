/**
 * Created by andreaterzani on 03/04/15.
 */
app.controller("shareController", function($scope,$rootScope,$state, $ionicModal, $cordovaCamera, $cordovaSocialSharing) {
    console.log("Share controller");


    $scope.finalImg = $rootScope.finalImg;


    $scope.shareAnywhere = function() {

        var image = $scope.finalImg;
        $cordovaSocialSharing.share($rootScope.frase, $rootScope.subject, image, "http://digitalchampions.it");
    }


});
