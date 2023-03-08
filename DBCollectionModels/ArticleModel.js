const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  titleSlug: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  image: {
    type: String,
    required: true
  },
  interactions: {
    likes: {
      type: Number,
      default: 0
    },
    hearts: {
      type: Number,
      default: 0
    },
    laughs: {
      type: Number,
      default: 0
    },
    wow: {
      type: Number,
      default: 0
    }
  },
  contentMarkdown: {
    type: String,
    required: true
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'review'
  }]
  
}, { timestamps: true });

const ArticleModel = mongoose.model('article', articleSchema);

module.exports = ArticleModel
