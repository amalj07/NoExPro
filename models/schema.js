let mongoose = require('mongoose');

//Schema for Article
var articleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
});

let Article = mongoose.model('Article', articleSchema);

module.exports= Article;
