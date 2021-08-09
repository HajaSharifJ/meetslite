'use strict';
angular.module('main')
  .controller('MenuCtrl', function ($scope, $rootScope, $state) {
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
          findUserProfiles([$scope.username]);
        } else {
          $scope.loggedin = false;
          $scope.username = undefined;
        }
      });
    }

    $scope.onSearch = (event) => {
      if (event.charCode == 13) {
        $state.go('main.search', { 'query': $scope.searchQuery});
      }
    };

    function findUserProfiles(ids) {
      console.log('MenuCtrl:findUserProfiles');
      steem.api.getAccounts(ids, (err, result) => {
        $scope.profile = result[0];
        $scope.profile.formattedReputation = steem.formatter.reputation($scope.profile.reputation);
        console.log($scope.profile);
        $scope.profileInfo = JSON.parse($scope.profile.json_metadata);
        $scope.$digest();
      });
    };

    $scope.logout = () => {
      console.log('MenuCtrl:logout');
      localforage.clear();
      $scope.loggedin = false;
    }
  });
