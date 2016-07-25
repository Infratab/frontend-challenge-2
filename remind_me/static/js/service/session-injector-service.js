'use strict';

angular.module('reminder')
  .factory('sessionInjector', function (Session) {
    var sessionInjector = {
      request: function (config) {
        if (Session.getId() !== null) {
          config.headers['Authorization'] = 'Token '+Session.getId();
        }
        return config;
      }
    };
    return sessionInjector;
  });