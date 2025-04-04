const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDKEY,
    api_secret: process.env.APISECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "products",  // Cloudinary folder to store images
        allowed_formats: ["jpg", "jpeg", "png", "webp", "gif", "bmp", "heic"],
    },
});

// Single image: upload.single("image")
// Multiple images: upload.array("images", 5)
const upload = multer({ storage });

// For handling multiple image uploads (max 5)
const uploadMultiple = multer({ 
    storage,
    limits: { files: 5 },  // Allow up to 5 files
}).array("images", 5);  // 'images' is the field name in the form


module.exports = { cloudinary, upload, uploadMultiple };
