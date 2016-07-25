angular.module('reminder')
  .controller('registerController', function ($scope, authService, $state,Session) {
    $scope.user = {email: '', password: '', confirm_password:''};
    $scope.registerUser = function (user) {
      authService.registerUser(user).then(function (res) {
        Session.create(res.data);
        $state.go('dashboard');
      })
    }
  });