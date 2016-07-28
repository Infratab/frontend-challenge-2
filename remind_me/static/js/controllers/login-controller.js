angular.module('reminder')
  .controller('loginController', function ($scope, $rootScope, authService, authEvents, Session, $state, $mdToast,authEvents) {
    $scope.user = {username: '', password: ''};
    // controller to handle login check
    $scope.loginClick = function (credentials) {
      authService.login(credentials).then(function (res) {
        Session.create(res.data.key, credentials.username);
        $rootScope.$broadcast(authEvents.loginSuccess);
        $state.go('dashboard');
      }, function (error) {
        $rootScope.$broadcast(authEvents.loginFailed);
        $mdToast.show({
          template: '<md-toast><span flex>Please Check the Email/Password and try again</span></md-toast>',
          position: 'top-left',
          hideDelay: 5000
        });
      })
    };
  });