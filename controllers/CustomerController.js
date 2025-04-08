const customerModel = require("../model/CustomerModel");
const Product = require("../model/CommerceProduct");
const Admin = require("../model/Admi");
const bcrypt = require("bcryptjs")
const saltRound = 10;
const jwt = require("jsonwebtoken"); // For token generation
const { cloudinary } = require("../utils/cloudinary");
// const { upload } = require("../utils/cloudinary");



const SignUpCustomer = async (req, res) => {
   try {
      console.log(req.body);
      const { firstname, lastname, email, Password } = req.body;

      if (!firstname || !lastname || !email || !Password) {
         return res.status(400).json({ message: "All fields are mandatory", status: false });
      }
      const existingUser = await customerModel.findOne({ email });
      if (existingUser) {
         return res.status(407).json({ message: "User Already exists", status: false });
      }
      const hashedPassword = await bcrypt.hash(Password, saltRound)
      const createdCustomer = await customerModel.create(
         {
            firstname, lastname, email, Password: hashedPassword
         }
      );

      if (!createdCustomer) {
         return res.status(402).json({ message: "An error occurred when creating customer", status: false });
      }

      return res.status(200).json({ message: "Customer Created Successfully", status: true });
   } catch (error) {
      return res.status(500).json({ message: error.message, status: false });
   }
};

const LoginCustomer = async (req, res) => {
   try {
      console.log(req.body);
      const { email, Password } = req.body;

      if (!email || !Password) {
         return res.status(400).json({ message: "Email and Password are required", status: false });
      }
      const existingCustomer = await customerModel.findOne({ email });
      console.log(existingCustomer);

      if (!existingCustomer) {
         return res.status(404).json({ message: "User not found", status: false });
      }

      const ValidPassword = await bcrypt.compare(Password, existingCustomer.Password);
      if (!ValidPassword) {
         return res.status(401).json({ message: "Invalid credentials", status: false });
      }

      // Generate JWT Token
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

      return res.status(200).json({ message: "Login successful", status: true, existingCustomer, token });


   } catch (error) {
      return res.status(500).json({ message: error.message, status: false });
   }
};

const authenticateToken = async (req, res) => {

   try {
      // console.log(req.headers.authorization.split(" ")[1]);
      // Extract token from Authorization header
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
      console.log(token);

      if (!token) {
         return res.status(401).json({ message: "Access Denied: No token provided", status: false });
      }
      //  // Verify the token
      const dawe = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(dawe);
     const User = await customerModel.findOne({ email: dawe.email });

      if (!dawe) {
         return res.status(403).json({ message: "Invalid or expired token" });
      } return res.status(200).json({ message: "User Verified Successfully", status: true, User });
   } catch (error) {
         return res.status(500).json({ message: error.message, status: false });
   }
};

const uploadProfile = async(req,res) =>{
   try {
      console.log(req.body);
      const {Imagefile, email} = req.body;
      if (!Imagefile) {
         return res.status(400).json({ message: "Please provide an image", status: false})
      }
    const Image =  await cloudinary.uploader.upload(Imagefile)
    console.log(Image.secure_url);
    const UpdatePicture = await customerModel.findOneAndUpdate(
      {email},
      { $set: { profilePic: Image.secure_url } }, { new: true });
    if (!UpdatePicture) {
      return  res.status(403).json({ message: "error updating profile picture", status: false });
    }
    return res.status(200).json({ message: "Profile picture updated successfully", status: true})
   } catch (error) {
      console.log(error);
      return res.status(500).json({message:Error.message, status:false})
   }
}


const uploadImageToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "products"
    });
    return result.secure_url;
  } catch (error) {
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};


const addProduct = async (req, res) => {
   try {
      console.log("Received Data:", req.body); // Log incoming data
      console.log("Uploaded Files:", req.files); // Log uploaded files for better clarity

      const { name, description, price, category } = req.body;

      // Check if all required fields are present
      if (!name || !description || !price || !category) {
         console.log("Missing Fields:", { name, description, price, category }); // Log missing fields
         return res.status(400).json({ error: "All fields are required" });
      }

      // Check if files are uploaded
      if (!req.files || req.files.length === 0) {
         return res.status(400).json({ error: "At least one image is required" });
      }

      // Upload images to Cloudinary
      const imageUploadPromises = req.files.map(file => uploadImageToCloudinary(file.path));
      const imageUrls = await Promise.all(imageUploadPromises); // Wait for all uploads to complete

      // Create a new product with uploaded image URLs
      const product = new Product({ name, description, price,category, imageUrl: imageUrls });
      console.log("Product Data:", product); // Log the product data before saving

      // Save the product to the database
      await product.save();

      console.log("Saved product:", product);
      return res.status(201).json({ message: "Product added successfully", product });

   } catch (error) {
       // Handle any errors that occur during the process
       console.error("Error adding product:", error);
       res.status(500).json({ error: "Failed to add product", details: error.message });
   }
};


// GET all products
const getallProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// GET product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

const deleteProduct = async (req, res) => {
   try {
     const deletedProduct = await Product.findByIdAndDelete(req.params.id);
     if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
     res.status(200).json({ message: "Product deleted successfully" });
   } catch (err) {
     console.error("Error deleting product:", err);
     res.status(500).json({ message: "Server error" });
   }
 };

 const updateProduct = async (req, res) => {
   try {
     const { name, description, price, category } = req.body;
     const images = req.files?.map((file) => file.path); // multer saves file path
 
     const updatedData = {
       name,
       description,
       price,
       category
     };
 
     if (images?.length > 0) {
       updatedData.imageUrl = images;
     }
 
     const updatedProduct = await Product.findByIdAndUpdate(
       req.params.id,
       updatedData,
       { new: true }
     );
 
     if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
     res.status(200).json(updatedProduct);
   } catch (err) {
     console.error("Error updating product:", err);
     res.status(500).json({ message: "Server error" });
   }
 };

 const loginAdmin = async (req, res) => {
   const { firstname, password } = req.body;
 
   try {
     const admin = await Admin.findOne({ firstname });
     if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
 
     const isMatch = await bcrypt.compare(password, admin.password);
     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
 
     const token = jwt.sign({ firstname: admin.firstname }, process.env.JWT_SECRET, { expiresIn: '1h' });
 
     res.json({ token });
   } catch (error) {
     console.error('Login error:', error);
     res.status(500).json({ message: 'Server error' });
   }
 };

 const authenticateAdmToken = async (req, res) => {

   try {
      // console.log(req.headers.authorization.split(" ")[1]);
      // Extract token from Authorization header
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
      console.log(token);

      if (!token) {
         return res.status(401).json({ message: "Access Denied: No token provided", status: false });
      }
      //  // Verify the token
      const dawe = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(dawe);
     const User = await Admin.findOne({ username: dawe.username });

      if (!dawe) {
         return res.status(403).json({ message: "Invalid or expired token" });
      } return res.status(200).json({ message: "User Verified Successfully", status: true, User });
   } catch (error) {
         return res.status(500).json({ message: error.message, status: false });
   }
};


module.exports = { SignUpCustomer, LoginCustomer, authenticateToken, uploadProfile, addProduct, getallProducts, getProductById, deleteProduct, updateProduct, loginAdmin, authenticateAdmToken };
