const mongoose = require("mongoose");

const connect = async() =>{
    try {
      const connection = await  mongoose.connect(process.env.MONGO_URI)
    if (connection) {
        console.log("server is connected to MongoDB");
    }
    } catch (error) {
        console.error();
        (error);
        
    }
}

module.exports = connect;