'use strict';
angular.module('main')
.controller('BookmarkCtrl', function ($scope, Post, $ionicLoading, $timeout) {

  console.log('BookmarkCtrl in module main:. This is your controller:', this);

  $scope.isLoaded = false;
  $scope.posts = Post.getAll();

  $ionicLoading.show({
    templateUrl: 'templates/loading.html',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 400,
    scope: $scope,
    showDelay: 2
  });

  $timeout(function () {
    $scope.isLoaded = true;
    $ionicLoading.hide();
  }, 1200);
});
