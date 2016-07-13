'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var User = require('../api/users/user.model');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(
  new GoogleStrategy({
    clientID: '661776623897-ba1v9qdeh6rvppc5up8l5q1pu0l6h2df.apps.googleusercontent.com',
    clientSecret: '1ONWyOTBY87y2UOELTbzNdx_',
    callbackURL: "/auth/google/callback"
  },

  function (token, refreshToken, profile, done) {

    var info = {
      name: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos ? profile.photos[0].value : undefined
    };

    User.findOrCreate({
      where: {googleId: profile.id},
      defaults: info
    })
    .spread(function (user) {
      done(null, user);
    })
    .catch(function (err) {
      console.log(err);
      done(err);
    });

    console.log('---', 'in verification callback', profile, '---');
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
  .then(function (user) {
    done(null, user);
  })
  .catch(done);
});


app.use(require('./logging.middleware'));

app.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'tongiscool' // or whatever you like
}));



app.use(passport.initialize());

app.use(passport.session());

app.use(function (req, res, next) {
  console.log(req.user);
  next();
});

app.get('/auth/google', passport.authenticate('google', { scope : 'email' }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);

app.use(require('./request-state.middleware'));

app.use(require('./statics.middleware'));

app.use('/login', require('../api/login.router'));

app.use('/logout', require('../api/logout.router'));

app.use('/api', require('../api/api.router'));


var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
