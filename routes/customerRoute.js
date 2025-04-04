const express = require("express");
const customerrouter = express.Router();
const { uploadMultiple } = require("../utils/cloudinary");

const {
  SignUpCustomer,
  LoginCustomer,
  authenticateToken,
  uploadProfile,
  addProduct,
  getallProducts,getProductById
} = require("../controllers/CustomerController");

customerrouter.post('/login', LoginCustomer);

customerrouter.post("/signup", SignUpCustomer);

customerrouter.get("/verify", authenticateToken);

customerrouter.post("/upload", uploadProfile);

// Route to add a product with multiple images (up to 5)
customerrouter.post("/add", uploadMultiple, addProduct);

// Route to get all products
customerrouter.get("/products", getallProducts);

// Route to get product by ID
customerrouter.get("/product/:id", getProductById);

module.exports = customerrouter;
