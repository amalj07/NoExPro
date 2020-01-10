const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Article = require('./models/schema');

//Initialising database
mongoose.connect('mongodb://localhost:27017/NoExPro', {useNewUrlParser: true, useUnifiedTopology: true
}).then( () => {
  console.log("Connected to database NoExPro");
}).catch( (err) => {
  console.log(err);
})
let db = mongoose.connection;


//Initialising app
const app = express();


//Initialising view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Home route
app.get('/', (req, res) => {
  Article.find({}, (err, articles) => {
    if(err) {
      console.log(err);
    }else {
      res.render('index', {
        title: 'Artitcles',
        articles: articles
      });
      console.log(articles.name);
      // console.log(articles);
    }
  });
});

app.get('/articles/add', (req, res) => {
  res.render('add_article', {
    title: 'Add Artitcles'
  })
})


//Initialising server
app.listen(5000, () => {
  console.log("server listening to port: 3000");
});
