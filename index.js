const express = require("express")
const User = require("./db/user")
require("./db/config")
const cors = require("cors")
const Product = require("./db/product")
const app = express()

app.use(express.json())
app.use(cors())
app.post("/register",async(req,res)=>{
    const data = req.body
    const user = new User(data)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    res.send(result)
})
app.post("/login",async(req,res)=>{
    let data = req.body
    const user = await User.findOne(data).select("-password")
    if(req.body.email && req.body.password){
        if(user){
            res.send(user)
        }else{
            res.send({"result":"Wrong email or password"})
        }
    }else{
        res.send({"result":"Please enter email and password"})
    }
})
app.post("/add-product",async(req,res)=>{
    const data = req.body
    const product = new Product(data)
    let result= await product.save()
    res.send(result)
})
app.get("/products",async(req,res)=>{
    let result = await Product.find()
    if(result.length>0){
        res.send(result)
    }else{
        res.send({"result":"No products found"})
    }
})
app.listen(8000,()=>{
    console.log("Example app listening at http://localhost:8000")
})