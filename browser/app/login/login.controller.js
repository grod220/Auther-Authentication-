app.controller('LoginCtrl', function (AuthFactory, $scope) {

  $scope.submitLogin = AuthFactory.login;

  $scope.currentUser = function() {
    console.log(AuthFactory.currentUser());
  };
});
