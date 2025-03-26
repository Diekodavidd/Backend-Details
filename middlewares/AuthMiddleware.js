// const jwt = require("jsonwebtoken");

// const authenticateToken = (req, res, next) => {
//     const authHeader = req.header("Authorization"); // Check headers
//     console.log("Received Auth Header:", authHeader); // Debugging log

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "Access Denied" });
//     }

//     const token = authHeader.split(" ")[1]; // Extract token
//     console.log("Extracted Token:", token);

//     try {
//         const verified = jwt.verify(token, "YOUR_SECRET_KEY"); // Use correct secret
//         req.user = verified;
//         next();
//     } catch (err) {
//         return res.status(403).json({ message: "Invalid Token" });
//     }
// };

// module.exports = authenticateToken;

const jwt = require("jsonwebtoken");
require('dotenv').config(); 

const authenticateToken = (req, res, next) => {
    // Extract token from Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        // Attach user to request
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;

