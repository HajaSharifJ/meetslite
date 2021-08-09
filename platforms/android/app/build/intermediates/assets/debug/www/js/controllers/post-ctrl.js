'use strict';
angular.module('main')
  .controller('PostCtrl', function ($scope, $rootScope, Post, $ionicLoading, $timeout, $stateParams, markdown, pwdMaster) {

    console.log('HomeCtrl in module main:. This is your controller:', this);
    let converter = new showdown.Converter();
    let author = $stateParams.author;
    let permlink = $stateParams.permlink;
    $scope.isLoaded = false;

    $rootScope.$on('LoginSuccess', () => {
      console.log('LoginSuccess');
      init();
    });
    init();
    function init() {
      try {
        console.log('PostCtrl:init');
        localforage.getItem('username', function (err, result) {
          if (result) {
            $scope.loggedin = true;
            $scope.username = result;
          } else {
            $scope.loggedin = false;
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
    $scope.loadPost = () => {
      console.log('HomeCtrl:loadPost', this);
      steem.api.getContent(author, permlink, function (err, result) {
        console.log(_.cloneDeep(result).body);
        $scope.post = result;
        $scope.post._jsonData = JSON.parse($scope.post.json_metadata);
        $scope.post.body = markdown.showDown(converter.makeHtml($scope.post.body));
        $scope.post.weight = 50;
        if ($scope.loggedin) {
          $scope.post.like = _.filter($scope.post.active_votes, { 'voter': $scope.username }).length > 0;
        };
        steem.api.getAccounts([author], (err, result) => {
          try {
            if (!_.isEmpty(result[0].json_metadata)) {

              let profileData = JSON.parse(result[0].json_metadata);
              $scope.post.profilePic = profileData.profile.profile_image;
            }
            $scope.$digest();
          } catch (err) {
            console.log(err);
          }
        });
        $timeout(function () {
          $scope.isLoaded = true;
          $ionicLoading.hide();
        });
      });
    };

    $scope.loadComments = () => {
      steem.api.getContentReplies(author, permlink, function (err, result) {
        console.log(result);
        $scope.comments = [];
        let authorIds = [];
        _.each(result, (comment) => {
          authorIds.push(comment.author);
          comment.body = markdown.showDown(converter.makeHtml(comment.body));
          comment.weight = 100;
          $scope.comments.push(comment);
        });
        findAuthorProfiles(authorIds);
      });
    }

    function findAuthorProfiles(ids) {
      console.log('FacebookCtrl:findAuthorProfiles');
      steem.api.getAccounts(ids, (err, result) => {
        let postByAuthor = _.indexBy($scope.comments, 'author');
        _.each(result, (profile) => {
          let userFeed = _.get(postByAuthor, profile.name);
          if (userFeed) {
            try {
              let profileData = JSON.parse(profile.json_metadata);
              userFeed.profilePic = profileData.profile.profile_image;
            } catch (err) { }
          }
        });
        $scope.$digest();
      });
    };
    $scope.loadPost();
    $scope.doRefresh = function () {
      console.log('HomeCtrl:doRefresh', this);
      $scope.loadPost();
      $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.likePost = (item) => {
      console.log('HomeCtrl:likePost', this);
      item.showlikebar = false;
      pwdMaster.getUserAcc().then((user) => {
        console.log(user);
        steem.broadcast.vote(user.posting, user.username, item.author, item.permlink, (item.weight * 100), function (err, result) {
          if (!err) {
            item.like = item.like ? !like: true;
          } else {
            item.like = false;
          }
        });
      });

    };

    $ionicLoading.show({
      templateUrl: 'templates/loading.html',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 400,
      scope: $scope,
      showDelay: 2
    });

  });
