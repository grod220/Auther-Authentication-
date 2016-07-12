app.controller('SignupCtrl', function (AuthFactory, $scope) {

  $scope.submitSignup = AuthFactory.signup;

});
