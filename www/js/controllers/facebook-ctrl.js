'use strict';
angular.module('main')
.controller('FacebookCtrl', function (User, $scope, Message, $timeout, $ionicLoading) {

  console.log('FacebookCtrl in module main:. This is your controller:', this);

  $ionicLoading.show({
    templateUrl: 'templates/loading.html',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 400,
    scope: $scope,
    showDelay: 2
  });

  $timeout(function () {
    $scope.users = User.getAll();
    $scope.users = $scope.users.concat($scope.users);
    $scope.messages = Message.getAll();
    $ionicLoading.hide();
  }, 1000);

});
