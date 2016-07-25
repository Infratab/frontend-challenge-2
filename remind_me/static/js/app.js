'use strict';
angular.module('reminder', ['ngMessages', 'ngAria', 'ngResource', 'ngAnimate', 'ui.router', 'ngMaterial', 'angular.filter', 'ngMaterialDatePicker'])
  .config(function ($stateProvider, $urlRouterProvider, $mdIconProvider, $httpProvider, $resourceProvider) {
    $mdIconProvider.defaultIconSet('/css/mdi.svg');
    $httpProvider.interceptors.push('sessionInjector');
    $resourceProvider.defaults.stripTrailingSlashes = false;
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'static/partials/login.html',
        controller: 'loginController',
        publicAccess: true
      })
      .state('register', {
        url: '/register',
        templateUrl: 'static/partials/register.html',
        controller: 'registerController',
        publicAccess: true
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'static/partials/dashboard.html',
        controller: 'dashboardController',
        publicAccess: false
      });
    $urlRouterProvider.when('', '/dashboard');
    $urlRouterProvider.when('/', '/dashboard');
  })
  .constant('authEvents', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .run(function ($rootScope, $anchorScroll, authEvents, authService, $state) {
    $anchorScroll.yOffset = 70;
    $rootScope.$on('$stateChangeStart', function (event, next) {
      if (!next.publicAccess) {
        if (!authService.isAuthenticated()) {
          event.preventDefault();
          $rootScope.$broadcast(authEvents.notAuthenticated);
          $state.go('login');
        }
      }
    });
  });