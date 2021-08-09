
'use strict';
angular.module('main')
  .directive('scrolly', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        console.log('scrolly');
        var raw = element[0];
        element.bind('scroll', function () {
          if ((raw.scrollTop + raw.offsetHeight + 250) >= raw.scrollHeight) { //at the bottom
            scope.$apply(attrs.scrolly);
          }
        })
      }
    }
  })
  .directive('fallbackSrc', function () {
    var fallbackSrc = {
      link: function postLink(scope, iElement, iAttrs) {
        console.log('fallbackSrc');
        iElement.bind('error', function() {
          angular.element(this).attr("src", iAttrs.fallbackSrc);
        });
      }
     }
     return fallbackSrc;
  });
