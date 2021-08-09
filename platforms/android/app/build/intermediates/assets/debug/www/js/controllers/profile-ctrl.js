'use strict';
angular.module('main')
.controller('ProfileCtrl', function ($scope, User) {

  console.log('ProfileCtrl in module main:. This is your controller:', this);
  $scope.user = User.currentUser();

});
