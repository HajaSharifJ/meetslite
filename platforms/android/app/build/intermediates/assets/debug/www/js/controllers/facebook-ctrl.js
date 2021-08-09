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
  $rootScope.$on('LoginSuccess', () => {
    console.log('MenuCtrl:LoginSuccess');
    init();
  });
  init();
  function init() {
    console.log('MenuCtrl:init');
    localforage.getItem('username', function (err, result) {
      console.log(result);
      console.log(err);
      if (result) {
        $scope.loggedin = true;
        $scope.username = result;
        loadComments([$scope.username]);
      } else {
        $scope.loggedin = false;
        $scope.username = undefined;
      }
    });
  }
  function loadComments() {
    steem.api.getCommentsByAuthor()
  }
  
    
  $timeout(function () {
    $scope.users = User.getAll();
    $scope.users = $scope.users.concat($scope.users);
    $scope.messages = Message.getAll();
    $ionicLoading.hide();
  }, 1000);

});
