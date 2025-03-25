const express = require("express");
const customerrouter = express.Router()


const {SignUpCustomer, LoginCustomer} = require("../controllers/CustomerController")



customerrouter.post('/login', LoginCustomer);

customerrouter.post("/signup", SignUpCustomer)


module.exports = customerrouter