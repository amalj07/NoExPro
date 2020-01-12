const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const expressValidator = require('express-validator');

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

//Express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

//Express message middleware
app.use(require('connect-flash')());
app.use( (req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Express validator middleware
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

//Bring in article model
const Article = require('./models/schema');

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

//Route files
let articles = require('./routes/articles');
app.use('/articles', articles)


//Initialising server
app.listen(5000, () => {
  console.log("server listening to port: 5000");
});
