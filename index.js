require('dotenv').config(); // Load environment variables at the TOPcmd
const express = require("express");
const connect = require("./Db.Config/db.connect")
const app = express();
const customerrouter = require("./routes/customerRoute")
<<<<<<< HEAD
const cors = require("cors");
const customerModel = require('./model/CustomerModel');
const authenticateToken = require('./middlewares/AuthMiddleware');

=======
const cors = require("cors")
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token.split(" ")[1], "YOUR_SECRET_KEY"); // Change to your actual secret key
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid Token" });
    }
};
>>>>>>> fbdbce9bf0c3805655627e270beb844ff76672fe



app.use(cors({origin:"*"}))
//you have to split your request to avoid udefined ad were usig .jso ecause its i json file
app.use(express.json())
//you route the router to a path with app.use
app.use("/customer", customerrouter)

//You call on the fuction from Db.connect.js
connect()
app.get("/", (req, res) => {
    res.send("API is running...");
});

<<<<<<< HEAD
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get("/customer/details", authenticateToken, async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const user = await customerModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user });
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Error fetching user details" });
    }
});

=======
app.get("/customer/details", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Assuming you're using MongoDB
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user details" });
    }
});
>>>>>>> fbdbce9bf0c3805655627e270beb844ff76672fe

// Server Listening
const port = process.env.PORT  || 5004;
app.listen(port, () => {
    console.log(`app started at port ${port}`)
})
