'use strict';
angular.module('main')
  .controller('CategoryCtrl', function ($scope, Post, $ionicLoading, $timeout) {

    console.log('CategoryCtrl in module main:. This is your controller:', this);

    $scope.isLoaded = false;
    $scope.categories = Post.getCategories().then((tags) => {
      _.each(tags, (tag) => {
        steem.api.getDiscussionsByCreated({ 'tag': tag.name, limit: 1 }, (err, result) => {
          try {
            let jsonData = JSON.parse(result[0].json_metadata);
            tag.imageUrl = jsonData.image[0];
            if (tag.imageUrl) {
              steem.api.getDiscussionsByCreated({ 'tag': tag.name, limit: 2 }, (err, result1) => {
                try {
                  let jsonData = JSON.parse(result[1].json_metadata);
                  tag.imageUrl = jsonData.image[0];
                } catch (err) {
                }
              });
            }
          } catch (err) {
            steem.api.getDiscussionsByCreated({ 'tag': tag.name, limit: 2 }, (err, result1) => {
              try {
                let jsonData = JSON.parse(result[1].json_metadata);
                tag.imageUrl = jsonData.image[0];
              } catch (err) {
              }
            });
          }
        });
      });
      $scope.categories = tags;
      console.log($scope.categories);
    });

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
