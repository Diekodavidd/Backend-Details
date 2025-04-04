const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imageUrl: [String],         })// Changed to an array of strings to store multiple image URLs});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
