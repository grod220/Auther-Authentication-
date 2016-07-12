app.factory('AuthFactory', function ($http, $log, $state) {
  var currentUser;
  return {
    currentUser: function () {
      return currentUser;
    },
    signup: function (email, password) {
      $http.post('/api/users', {email: email, password: password})
      .then(function (res) {
        currentUser = res.data.id;
      $state.go('stories');
      })
      .catch($log.error);
    },

    login: function (email, password) {
      $http.post('/login', {email: email, password: password})
      .then(function (res) {
        currentUser = res.data.id;
      $state.go('stories');
      })
      .catch($log.error);
    }
  };
});
