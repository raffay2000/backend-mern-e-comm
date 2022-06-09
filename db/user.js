const mongoose = require("mongoose") // mongoose is a library that helps us to connect to mongodb
const userSchema = new mongoose.Schema({
    name: String,
    price: Number,
    company: String,
    category: String,
    description: String,
    
})

module.exports = mongoose.model("users",userSchema)