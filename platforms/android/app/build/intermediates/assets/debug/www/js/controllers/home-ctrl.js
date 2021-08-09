'use strict';
angular.module('main')
  .controller('HomeCtrl', function ($scope, $rootScope, Post, $stateParams, $ionicLoading, $state, $timeout, $window, markdown, $sce, pwdMaster) {
    console.log('FacebookCtrl in module main:. This is your controller:', this);
    $rootScope.$on('LoginSuccess', () => {
      console.log('LoginSuccess');
      init();
    });
    init();
    function init() {
      try {
        console.log('FacebookCtrl:init');
        localforage.getItem('username', function (err, result) {
          if (result) {
            $scope.loggedin = true;
            $scope.username = result;
            findUserProfiles([$scope.username]);
            $scope.loadPosts($scope.tag);
          } else {
            $scope.loggedin = false;
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
    function findUserProfiles(ids) {
      try {
        console.log('FacebookCtrl:findUserProfiles');
        steem.api.getAccounts(ids, (err, result) => {
          $scope.profile = result[0];
          console.log($scope.profile);
          $scope.profileInfo = JSON.parse($scope.profile.json_metadata);
          $scope.$digest();
        });
      } catch (err) {
        console.log(err);
      }
    };
    console.log('Hello from your Controller: HomeCtrl in module main:. This is your controller:', this);
    $scope.isLoaded = false;
    $scope.tag = 'NEW';
    let converter = new showdown.Converter();

    $ionicLoading.show({
      templateUrl: 'templates/loading.html',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 400,
      scope: $scope,
      showDelay: 2
    });

    $scope.doRefresh = function () {
      try {
        console.log('FacebookCtrl:doRefresh');
        $scope.loadPosts($scope.tag);
        $scope.$broadcast('scroll.refreshComplete');
      } catch (err) {
        console.log(err);
      }
    };

    $scope.loadPosts = (opt) => {
      try {
        console.log('FacebookCtrl:loadPosts');
        $scope.page++;
        let query = {
          'limit': 5
        };
        if ($stateParams.category) {
          query.tag = $stateParams.category
        }
        console.log(query);
        $scope.tag = opt ? opt : $scope.tag;
        if (!opt) {
          query.start_author = $scope.author;
          query.start_permlink = $scope.permlink;
        }
        if (opt || !$scope.loading) {
          $scope.loading = true;

          switch ($scope.tag) {
            case 'TRENDING':
              steem.api.getDiscussionsByTrending(query, function (err, result) {
                console.log(result);
                refreshPost(opt, result);
              });
              break;
            case 'HOT':
              steem.api.getDiscussionsByHot(query, function (err, result) {
                refreshPost(opt, result);
              });
              break;
            case 'NEW':
              steem.api.getDiscussionsByCreated(query, function (err, result) {
                refreshPost(opt, result);
              });
              break;
            case 'FEED':
              localforage.getItem('username', (err, result) => {
                query.tag = result;
                steem.api.getDiscussionsByFeed(query, function (err, result) {
                  refreshPost(opt, result);
                });
              });

              break;
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    $scope.tag = $stateParams.tag ? $stateParams.tag : 'TRENDING';
    $scope.loadPosts($scope.tag);

    $timeout(function () {
      $scope.isLoaded = true;
      $ionicLoading.hide();
    }, 1500);

    $scope.viewPost = function (value) {
      console.log('FacebookCtrl:viewPost');
      $state.go('main.post', { 'author': value.author, 'permlink': value.permlink });
    };

    $scope.likePost = (post) => {
      console.log('FacebookCtrl:likePost');
      post.like = !post.like;
      post.showlikebar = false;
      pwdMaster.getUserAcc().then((user) => {
        console.log(user);
        steem.broadcast.vote(user.posting, user.username, post.author, post.permlink, (post.weight * 100), function (err, result) {
          console.log(err, result);
        });
      });
    };

    function refreshPost(opt, result) {
      console.log('FacebookCtrl:refreshPost', result);
      $window.scrollTo(0, 0);
      if (!opt) {
        result.splice(0, 1);
      }
      $scope.author = result[result.length - 1].author;
      $scope.permlink = result[result.length - 1].permlink;
      let authorIds = [];
      _.each(result, (feed) => {
        try {
          authorIds.push(feed.author);
          feed._jsonData = JSON.parse(feed.json_metadata);
          feed.body = converter.makeHtml(feed.body);
          if ($scope.loggedin) {
            feed.like = _.filter(feed.active_votes, { 'voter': $scope.username }).length > 0;
            feed.weight = 100;
          }

          if (feed._jsonData.image && feed._jsonData.image.length > 0) {
            var firstImg = "<img class='full-image post-main' src='https://steemitimages.com/640x480/" + feed._jsonData.image[0] + "'>";
            feed.shortBody = firstImg + markdown.stripHtml(feed.body).substr(0, 70) + '...';
          } else {
            feed.shortBody = markdown.stripHtml(feed.body).substr(0, 180) + '...';
          }
          feed.body = $sce.trustAsHtml(markdown.showDown(feed.body));
        } catch (err) {
          console.log(err);
        }
      });
      findAuthorProfiles(authorIds);
      if (opt) {
        $scope.posts = result;
      } else {
        _.each(result, (feed) => {
          $scope.posts.push(feed);
        });
      }
      $scope.$digest();
      $scope.loading = false;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    function findAuthorProfiles(ids) {
      console.log('FacebookCtrl:findAuthorProfiles');
      steem.api.getAccounts(ids, (err, result) => {
        let postByAuthor = _.indexBy($scope.posts, 'author');
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
  });
