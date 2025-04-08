const express = require("express");
const customerrouter = express.Router();
const { upload , uploadMultiple } = require("../utils/cloudinary");

const {
  SignUpCustomer,
  LoginCustomer,
  authenticateToken,
  uploadProfile,
  addProduct,
  getallProducts,getProductById,
  deleteProduct,
  updateProduct, loginAdmin, authenticateAdmToken
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

// DELETE a product
customerrouter.delete("/products/:id", deleteProduct);

// UPDATE a product
customerrouter.put("/products/:id", upload.array("images", 5), updateProduct);

customerrouter.post('/loginad', loginAdmin);


customerrouter.get("/verifyy", authenticateAdmToken);

module.exports = customerrouter;
