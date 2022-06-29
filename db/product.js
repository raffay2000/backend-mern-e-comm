const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    company: String,
    category: String,
    description: String,
    userID: String,
})

module.exports = mongoose.model("products",productSchema)
// const mongoose = require("mongoose")
// const productSchema = new mongoose.Schema({
//     name:String,
//     price:Number,
//     company:String,
//     category:String,
//     description:String,
//     userID:String,
// })
// module.export =mongoose.model("products",productSchema)