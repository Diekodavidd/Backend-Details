const express = require("express");
const customerrouter = express.Router()


const {SignUpCustomer, LoginCustomer, authenticateToken} = require("../controllers/CustomerController")



customerrouter.post('/login', LoginCustomer);

customerrouter.post("/signup", SignUpCustomer)

customerrouter.get("/verify", authenticateToken)



module.exports = customerrouter