const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    name: String,
    rating: Number,
    comment: String,
});

module.exports = mongoose.model('Review', reviewSchema);
