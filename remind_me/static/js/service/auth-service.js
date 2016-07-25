angular.module('reminder')
  .factory('authService', function ($http, Session) {
    var authService = {};
    authService.login = function (credentials) {
      return $http.post('/rest-auth/login/', credentials)
    };
    authService.logout = function () {
      return $http
        .post('/api/logout')
    };
    authService.isAuthenticated = function () {
      return (Session.getId() !== null && Session.getId() !== undefined);
    };
    authService.registerUser = function (user) {
      return $http.post('/register/', user);
    };
    return authService;
  });