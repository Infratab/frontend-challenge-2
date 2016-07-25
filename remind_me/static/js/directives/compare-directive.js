'use strict';
angular.module('reminder')
  .directive('compare', function () {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compare"
      },
      link: function (scope, element, attributes, ngModel) {
        ngModel.$validators.compare = function (modelValue) {
          return modelValue == scope.otherModelValue;
        };
        scope.$watch("otherModelValue", function () {
          ngModel.$validate();
        });
      }
    };
  });