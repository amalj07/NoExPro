const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Article = require('./models/schema');

//Initialising database
mongoose.connect('mongodb://localhost:27017/NoExPro', {useNewUrlParser: true, useUnifiedTopology: true
}).then( () => {
  console.log("Connected to database NoExPro");
}).catch( (error) => {
  console.log(error);
});
let db = mongoose.connection;


//Initialising app
const app = express();


//Initialising view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body Parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Set public folder
//serving static assests
app.use(express.static(path.join(__dirname, 'public')));

//Home route
app.get('/', (req, res) => {
  Article.find({}).then( (articles) =>{
    res.render('index', {
      title: 'Artitcles',
      articles: articles
    });
  }).catch( (err) => {
    console.log(err);
  })
});

//Adding an article
app.get('/articles/add', (req, res) => {
  res.render('add_article', {
    title: 'Add Artitcles'
  })
});

//fetching single article from db
app.get('/articles/:id', (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    res.render('article', {
      article: article
    });
  });
});


//Saving the article to db
app.post('/articles/add', (req, res) => {
  let article = new Article();
  article.name = req.body.name;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save().then( () => {
    res.redirect('/');
  }).catch( (err) => {
    console.log(err)
  })
})



//Initialising server
app.listen(5000, () => {
  console.log("server listening to port: 5000");
});
