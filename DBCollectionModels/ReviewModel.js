const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  articleRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'article'
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
}, { timestamps: true });

const ReviewModel = mongoose.model('review', ReviewSchema);

module.exports = ReviewModel;