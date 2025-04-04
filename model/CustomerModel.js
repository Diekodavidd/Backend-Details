const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    Password: { type: String, required: true },
    profilePic:{type: String,},
})

const customerModel = mongoose.model("customer_info", customerSchema)

module.exports = customerModel;