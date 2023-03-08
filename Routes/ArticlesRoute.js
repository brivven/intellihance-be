

const express = require('express');
const router = express.Router();
const ArticlesFunctions = require('../RoutesFunctions/ArticlesFunctions')


router.get('/' , ArticlesFunctions.GetArticles);
router.get('/:slug' , ArticlesFunctions.GetArticleData);
router.post('/AddReview' , ArticlesFunctions.AddReview);


module.exports = router;