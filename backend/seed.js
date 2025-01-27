const mongoose = require('mongoose');
const Product = require('./models/Product'); // You'll need to create this file

require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((error) => console.error('Error connecting to MongoDB:', error.message));

const seedProducts = [
    {
        name: "Floral Bliss",
        description: "A delightful blend of jasmine, rose, and lily of the valley.",
        price: 89.99,
        image: "https://example.com/floral-bliss.jpg",
        gallery: [
            "https://example.com/floral-bliss-1.jpg",
            "https://example.com/floral-bliss-2.jpg",
            "https://example.com/floral-bliss-3.jpg"
        ],
        sizes: ["30ml", "50ml", "100ml"]
    },
    {
        name: "Ocean Breeze",
        description: "Fresh and invigorating scent with notes of sea salt, bergamot, and driftwood.",
        price: 79.99,
        image: "https://example.com/ocean-breeze.jpg",
        gallery: [
            "https://example.com/ocean-breeze-1.jpg",
            "https://example.com/ocean-breeze-2.jpg",
            "https://example.com/ocean-breeze-3.jpg"
        ],
        sizes: ["50ml", "100ml"]
    },
    // Add more products as needed
];

const seedDB = async () => {
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
};

seedDB().then(() => {
    mongoose.connection.close();
});