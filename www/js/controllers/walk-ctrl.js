'use strict';
angular.module('main')
.controller('WalkCtrl', function ($scope, $state, $ionicPlatform, $cordovaSplashscreen) {

  console.log('WalkCtrl in module main:. This is your controller:', this);
  $scope.slide = {one: true};

  $scope.onSkip = function () {
    $state.go('authLogin');
  };

  $scope.slideHasChanged = function (index) {
    if (index === 0) {
      $scope.slide = {one: true};
    } else if (index === 1) {
      $scope.slide = {two: true};
    } else if (index === 2) {
      $scope.slide = {three: true};
    }
  };

  $scope.$on('$ionicView.loaded', function () {
    $ionicPlatform.ready(function () {
      if (navigator && navigator.splashscreen) {
        $cordovaSplashscreen.hide();
      }
    });
  });
});
