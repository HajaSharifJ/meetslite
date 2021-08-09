'use strict';
angular.module('main')
  .controller('AuthCtrl', function ($state, $scope, $location) {

    console.log('AuthCtrl in module main:. This is your controller:', this);

    $scope.viewLogin = function () {
      console.log('AuthCtrl:viewLogin');
      $state.go('authLogin');      
    };

    $scope.viewReg = function () {
      console.log('AuthCtrl:viewReg');
      $state.go('authReg');      
    };

    $scope.verifyAuth = function () {
      console.log('AuthCtrl:verifyAuth');
      steem.api.getAccounts([$scope.username], function (err, result) {
        let isvalid = false;
        let pubWif = '';
        let pwdType = 'ACTIVE';
        try {
          pubWif = result[0].active.key_auths[0][0];
          isvalid = steem.auth.wifIsValid($scope.password, pubWif);
        } catch (e) { }

        if (!isvalid) {
          try {
            pwdType = "POSTING";
            pubWif = result[0].posting.key_auths[0][0];
            isvalid = steem.auth.wifIsValid($scope.password, pubWif);
          } catch (e) { }
        }

        if (!isvalid) {
          try {
            pwdType = "MASTER";
            let wif = steem.auth.toWif($scope.username, $scope.password, 'posting');
            pubWif = result[0].posting.key_auths[0][0];
            isvalid = steem.auth.wifIsValid(wif, pubWif);
          } catch (e) {  }
        }
        if (isvalid) {
          $state.go('main.home');
          localforage.setItem('pwdType', pwdType);
          localforage.setItem('username', $scope.username);
          localforage.setItem('password', $scope.password);
          $scope.$emit('LoginSuccess');
        } else {
          $scope.errorMessage = "Invalid Account";
        }

      });
      
    };
    $scope.viewHome = function () {
      console.log('AuthCtrl:viewHome');
      $state.go('main.home');
    }
  });
