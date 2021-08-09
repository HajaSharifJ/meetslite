'use strict';
angular.module('main')
.controller('MessageCtrl', function ($scope, Message) {

  console.log('Hello from your Controller: MessageCtrl in module main:. This is your controller:', this);

  $scope.messages = Message.getAllChat();

  $scope.delete = function (index) {
    console.log('delete', index);
    $scope.messages.splice(index, 1);
  };

  $scope.edit = function (item) {
    console.log('edit', item);
  };


});
