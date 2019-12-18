
const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    authors : String,
    image : String,
    createDate : {
      type : Date,
      default : new Date()
    }
  });

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article

