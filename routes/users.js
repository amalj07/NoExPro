const express = require('express');
const router = express.Router();
const passport = require('passport');

//Bring in user model
const User = require('../models/user');


//Route for user register
router.get('/register', (req, res) => {
  res.render('register');
});

//Regisrer new user
router.post('/register', (req, res) => {
  name= req.body.name;
  email= req.body.email;
  username= req.body.username;
  password= req.body.password;
  conpassword= req.body.password;

  req.checkBody('name', 'name is required').notEmpty();
  req.checkBody('email', 'eamil is required').notEmpty();
  req.checkBody('username', 'username is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('conpassword', 'passwords donot match').equals(req.body.password);


  //Validate errors
  let errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors: errors
    })
  } else {
    let newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password
    });

    newUser.save().then( () => {
      req.flash('success', 'User registration success, Please login!');
      res.redirect('/users/login');
    })
  }
});

//User login page
router.get('/login', (req, res) => {
  res.render('login');
})

//Login process
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

//Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logged out successfully!');
  res.redirect('/users/login');
});

module.exports = router;
