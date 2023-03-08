

const ArticleModel = require('../DBCollectionModels/ArticleModel');
const ReviewModel = require('../DBCollectionModels/ReviewModel');



exports.GetArticles = (req , res) => {
    const activeQueries = {};
    const activeSorts = {};
    const queries = req.query;

    if(queries.category === 'All'){
        activeQueries.category = { $ne: null }
    }
    else{
        activeQueries.category = queries.category
    }

    if(queries.rating){
        activeQueries.rating= { $gte: queries.rating }
    }

    if(queries.searchKeyword){
        activeQueries.title = { $regex: queries.searchKeyword , $options: 'i' }
    }

    if(queries.orderBy){
        // for a date:  -1 = newest (descending) / 1 = oldest (asc)
        if(queries.orderBy === 'newest'){
            activeSorts.createdAt = -1
        }
        if(queries.orderBy === 'oldest'){
            activeSorts.createdAt = 1
        }
        if(queries.orderBy === 'popular'){
            activeSorts.interactionsNumber = -1
        }
        if(queries.orderBy === 'alphabetically'){
            activeSorts.title = 1
        }
    }

    ArticleModel.find(activeQueries , {contentMarkdown: 0}).sort(activeSorts).skip(queries.skip).limit(10)
    .exec((error, articlesData) => {
        if(error){
            res.status(404).send({Message:"error not found"});
            return;
        }
        else{
            res.status(200).send({articles: articlesData})
            return;
        }
    });

};






exports.GetArticleData = (req , res) => {
    const slug = req.params.slug
    ArticleModel.find({titleSlug: {$eq: slug} }).populate('reviews').exec((error, articleData) => {
        if(error){
            res.status(404).send({Message:"error not found"});
            return;
        }
        else{
            res.status(200).send({articleData: articleData})
            return;
        }
    });
}








exports.AddReview = async(req , res) => {
    const reviewData = req.body
    const review = {
        articleRef: reviewData.articleID ,
        author: reviewData.name ,
        rating: reviewData.rating ,
        content: reviewData.message
    };

    var newReview = await ReviewModel.create(review);

    var result = await ArticleModel.findById(reviewData.articleID).select('rating');
    var oldArticleRating = result.rating;

    function calculateNewRating() {
        if(oldArticleRating !== 0){
            return (oldArticleRating + reviewData.rating) / 2;
        }
        else{
            return reviewData.rating;
        }
    } 
    const newArticleRating = calculateNewRating()

    ArticleModel.findByIdAndUpdate(reviewData.articleID , { $push: {reviews: newReview._id} , rating: newArticleRating } )
    .exec((error,result)=>{
        if(error){
            res.status(404).send({Message:"error not found"});
            return;
        }
        else{
            res.status(200).send({Message: "success"})
            return;
        }
    })
}

