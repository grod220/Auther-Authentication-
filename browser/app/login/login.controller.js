app.controller('LoginCtrl', function (AuthFactory, $rootScope, $scope) {

  $scope.submitLogin = AuthFactory.login;

  $scope.currentUser = function() {
    console.log($rootScope);
  };
});
