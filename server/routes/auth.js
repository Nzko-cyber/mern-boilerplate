const express  = require('express');
const passport = require('passport');

const { User } = require('../database/schemas');

const router = express.Router();

module.exports = router;

router.post('/register', (req, res) => {
  if (!req || !req.body || !req.body.username || !req.body.password) {
    return res.status(400).send({ message: 'Username and Password required' });
  }

  req.body.usernameCase = req.body.username;
  req.body.username = req.body.username.toLowerCase();

  const { username } = req.body;
  const newUser = User(req.body);

  User.find({ username })
    .then(users => {
      if (users[0]) {
        return res.status(400).send({ message: 'Username exists' });
      }

      newUser.hashPassword()
        .then(() => {
          newUser.save()
            .then(user => {
              return res.send({ message: 'User created successfully', user });
            })
            .catch(err => {
              return res.status(400).send({ message: 'Create user failed', err });
            });
        });
    })
    .catch(err => {
      return res.status(400).send({ message: 'Create user failed', err });
    });
});

router.post('/login', (req, res, next) => {
  if (!req || !req.body || !req.body.username || !req.body.password) {
    return res.status(400).send({ message: 'Username and Password required' });
  }

  req.body.username = req.body.username.toLowerCase();

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send(info);
    }

    req.login(user, err => {
      if (err) {
        return res.status(401).send({ message: 'Login failed', err });
      }
      return res.send({ message: 'Logged in successfully', user });
    });

  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      return res.status(400).send({ message: 'Logout failed', err });
    }

    req.session.destroy(err => {
      if (err) {
        return res.status(400).send({ message: 'Logout failed', err });
      }

      res.clearCookie('connect.sid');
      req.sessionID = null;
      return res.send({ message: 'Logged out successfully' });
    });
  });
});
