angular.module('reminder')
  .controller('loginController', function ($scope,$rootScope, authService,authEvents,Session, $state,$mdToast) {
    $scope.user = {username: '', password: ''};
    // controller to handle login check
    $scope.loginClick = function (credentials) {
      authService.login(credentials).then(function (res) {
        Session.create(res.data);
        $rootScope.$broadcast(authEvents.loginSuccess);
        $state.go('dashboard');
      }, function (error) {
        $rootScope.$broadcast(AuthEvents.loginFailed);
        $mdToast.show({
          template: '<md-toast><span flex>Please Check the Email/Password and try again</span></md-toast>',
          position: 'top-left',
          hideDelay: 5000
        });
      })
    };
  });