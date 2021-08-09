'use strict';
angular.module('main')
  .factory('steem', ['$window', function ($window) {
    return $window.steem;
  }])
  .factory('_', ['$window', function ($window) {
    return $window._;
  }])
  .factory('markdown', function () {

    function _changeBrTag(html) {
      return html.replace(/(\r\n\|\r|\n)/gi, "\<br\/\>");
    }
    function _changeYouTubeTag(html) {
      return html.replace(/https:\/\/youtu.be\/([\w]*)/gi, '\<p\>\<iframe width="100%" src="https:\/\/www.youtube.com\/embed\/$1"\>\<\/iframe\>\<\/p\>');
    }
    function _imageSetting(html) {
      var html_change = html;
      var regex = /(<([^>]+)>)/ig
      var result = html_change.replace(regex, "");

      regex = /(https?:\/\/.*\.(?:png|jpe?g|gif|svg))/ig;
      var arrMatch = result.match(regex);
      if (arrMatch != null) {
        for (var i = 0; i < arrMatch.length; i++) {
          let re = new RegExp(arrMatch[i], "g");
          html_change = html_change.replace(re, "<img src='https://steemitimages.com/640x480/" + arrMatch[i] + "'/>");
          if (i != arrMatch.lenght - 1) {
            for (var j = i + 1; j < arrMatch.length; j++) {
              if (arrMatch[j] == arrMatch[i]) {
                arrMatch.splice(j, 1);
              }
            }
          }
        }
      }
      return html_change;
    }
    function _stripHtml(html) {
      var temporalDivElement = document.createElement("div");
      temporalDivElement.innerHTML = html;
      return temporalDivElement.textContent || temporalDivElement.innerText || "";
    }
    function _showDown(html) {
      return _changeYouTubeTag(_changeBrTag(_imageSetting(html)));
    }
    return {
      changeBrTag: _changeBrTag,
      changeYouTubeTag: _changeYouTubeTag,
      imageSetting: _imageSetting,
      stripHtml: _stripHtml,
      showDown: _showDown
    };
  })
  .factory('$localstorage', ['$window', function ($window) {
    return {
      set: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function (key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    }
  }])
  .factory('pwdMaster', function ($q) {
    return {
      getUserAcc: function () {
        let obj = {};
        let deferred = $q.defer();
        localforage.getItem('pwdType', (err, pwdType) => {
          console.log(err);
          obj.pwdType = pwdType;
          localforage.getItem('username', (err1, username) => {
            console.log(err1);
            obj.username = username;
            localforage.getItem('password', (err2, password) => {
              console.log(err2);
              obj.password = password;
              if(obj.pwdType === 'ACTIVE') {
                obj.active = password;
              } else if(obj.pwdType === 'POSTING') {
                obj.posting = password;
              } else if(obj.pwdType === 'MASTER') {
                console.log(obj.password);
                obj.active = steem.auth.toWif(obj.username, obj.password, 'active');
                obj.posting = steem.auth.toWif(obj.username, obj.password, 'posting');
              }              
              deferred.resolve(obj);
            });
          });
        });
        return deferred.promise;
      },
      getLoggedinUser: function () {
        let deferred = $q.defer();
        localforage.getItem('username', (err, username) => {
          deferred.resolve(username);
        });
        return deferred.promise;
      }
    }
  });