const express = require('express');
const path = require('path');
const pug = require('pug');

//Initialising app
const app = express();

//Initialising view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Home route
app.get('/', (req, res) => {
  let articles = [
    {
      id: 1,
      name: "Article One",
      author: "Amal",
      body: "This is article one"
    },
    {
      id: 2,
      name: "Article Two",
      author: "Jose",
      body: "This is article two"
    },
    {
      id: 3,
      name: "Article Three",
      author: "Amal",
      body: "This is article three"
    },
  ]
  res.render('index', {
    title: 'Artitcles',
    articles: articles
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
