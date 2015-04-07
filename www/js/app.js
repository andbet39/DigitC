// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('app', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$compileProvider) {

  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);
  $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html'
      })

      .state('message', {
          url: '/message',
          templateUrl: 'message' +
          '.html'
      })

      .state('about', {
        url: '/about',
        templateUrl: 'about.html'
      })

      .state('photo', {
          url: '/photo',
          templateUrl: 'photo.html'
      })

      .state('share', {
          url: '/share',
          templateUrl: 'share.html'
      })

  $urlRouterProvider.otherwise("/");
});

