const express = require('express');
const { getReviewsByProductId, addReview } = require('../controllers/reviewController');
const router = express.Router();

router.get('/:id/reviews', getReviewsByProductId);
router.post('/:id/reviews', addReview);

module.exports = router;
