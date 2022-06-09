// const mongoose = require('mongoose')
// const productSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     message: String
// })
// module.exports = mongoose.model('products', productSchema)
const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

module.exports = mongoose.model("products",productSchema)