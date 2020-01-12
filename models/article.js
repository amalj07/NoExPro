const mongoose = require('mongoose');

//Schema for Article
const articleSchema = mongoose.Schema({
  title: {
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

const Article = mongoose.model('Article', articleSchema);

module.exports= Article;
