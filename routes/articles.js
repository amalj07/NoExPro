const express = require('express');
const router = express.Router();

//Article Model
const Article = require('../models/article');
//User Model
const User = require('../models/user');

//Adding an article
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('add_article', {
    title: 'Add Artitcles'
  })
});


//Saving the article to db POST
router.post('/add', (req, res) => {
  req.checkBody('title', 'Title is required').notEmpty();
  //req.checkBody('author', 'Author is required').notEmpty();
  req.checkBody('body', 'Body is required').notEmpty();

  //Get errors
  let errors = req.validationErrors();
  if (errors) {
    res.render('add_article', {
      title: 'Add Artitcles',
      errors: errors
    });
  } else {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.user._id;
    article.body = req.body.body;

    article.save().then( () => {
      req.flash('success', 'Article added');
      res.redirect('/');
    }).catch( (err) => {
      console.log(err)
    });
  }
});


//Load edit form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    if(article.author != req.user._id){
      req.flash('danger', 'Not Authorized');
      res.redirect('/');
    }else{
      res.render('edit_article', {
        title: 'Edit Article',
        article: article
      });
    }
  });
});


//Updating the article
router.post('/edit/:id', (req, res) => {
  let article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  let query = {_id: req.params.id};

  Article.update(query, article).then( () => {
    req.flash('success', 'Article updated');
    res.redirect('/');
  }).catch( (err) => {
    console.log(err)
  })
})

//Deleting an article
router.delete('/:id', (req, res) => {
  if(!req.user._id){
    res.status(500).send();
  }

  let query = {_id: req.params.id}

  Article.findById(req.params.id, (err, article) =>{
    if (article.author != req.user._id) {
      res.status(500).send();
    } else {
      Article.remove(query).then( () => {
        req.flash('danger', 'Article deleted');
        res.send('Success');
      }).catch( (error) => {
        console.log(error)
      });
    }
  });
});

//fetching single article from db
router.get('/:id', (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    User.findById(article.author, (err, user) => {
        res.render('article', {
          article: article,
          author: user.name
        });
    })
  });
});

//Access control
function ensureAuthenticated(req, res,next){
  if(req.isAuthenticated()){
    return next();
  } else{
    req.flash('danger','Please Login');
    res.redirect('/users/login');
  }
}

module.exports = router;
