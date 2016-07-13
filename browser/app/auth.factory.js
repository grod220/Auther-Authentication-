app.factory('AuthFactory', function ($http, $log, $state, $rootScope) {
  return {

    signup: function (email, password) {
      $http.post('/api/users', {email: email, password: password})
      .then(function (res) {
        $rootScope.currentUser = res.data;
        $state.go('stories');
      })
      .catch($log.error);
    },

    login: function (email, password) {
      $http.post('/login', {email: email, password: password})
      .then(function (res) {

        $rootScope.currentUser = res.data;
        $state.go('stories');
      })
      .catch($log.error);
    }
  };
});
