'use strict';

angular.module('reminder')
  .factory('sessionInjector', function (Session) {
    var sessionInjector = {
      request: function (config) {
        if (Session.getId() !== null && Session.getId() !== undefined) {
          config.headers['Authorization'] = 'Token ' + Session.getId();
        }
        return config;
      }
    };
    return sessionInjector;
  });