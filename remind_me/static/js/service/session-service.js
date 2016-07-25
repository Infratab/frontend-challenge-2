angular.module('reminder')
  .service('Session', function ($window) {
    this.create = function (session,email) {
      $window.localStorage.id = session.token;
      $window.localStorage.email=email;
    };
    this.destroy = function () {
      $window.sessionStorage.removeItem('id');
    };
    this.getId = function () {
      return $window.localStorage.id;
    };
    this.getEmail=function(){
      return $window.localStorage.email;
    };
    return this;
  });
