const Review = require('../models/Review');

const getReviewsByProductId = async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.id });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addReview = async (req, res) => {
    try {
        const review = new Review({
            productId: req.params.id,
            ...req.body,
        });
        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getReviewsByProductId, addReview };
