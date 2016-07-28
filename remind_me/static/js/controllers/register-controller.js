angular.module('reminder')
  .controller('registerController', function ($scope, authService, $state, Session, $mdToast) {
    $scope.user = {email: '', password: '', confirm_password: ''};
    $scope.registerUser = function (user) {
      authService.registerUser(user).then(function (res) {
        Session.create(res.data.token, user.email);
        $state.go('dashboard');
      }, function () {
        $mdToast.show({
          template: '<md-toast><span flex>Email already exists.</span></md-toast>',
          position: 'top-left',
          hideDelay: 5000
        });
      })
    }
  });