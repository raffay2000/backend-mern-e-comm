const express = require("express");
const User = require("./db/user");
require("./db/config");
const cors = require("cors");
const Product = require("./db/product");
const app = express();
const jwt = require("jsonwebtoken");
const jwtKey = "my_secret_key";

app.use(express.json());
// cors is used to allow cross origin resource sharing
app.use(cors());
// this is register API to register a new user
app.post("/register", async (req, res) => {
  const data = req.body;
  // make 
  const user = new User(data);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  if (result) {
    jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
      if(err){
          res.send({result:"error in signing token"})
      }else{
          res.send({result,auth:token})
      }
  })
  }else{
        res.send({result:"error in saving user"})
  }
});
// this is login API to login a user 
app.post("/login", async (req, res) => {
  let data = req.body;
  let user = await User.findOne(data).select("-password");
  if (req.body.email && req.body.password) {
    if (user) {
        jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
            if(err){
                res.send({result:"error in signing token"})
            }else{
                res.send({user,auth:token})
            }
        })
    //   res.send(user);
    } else {
      res.send({ result: "Wrong email or password" });
    }
  } else {
    res.send({ result: "Please enter email and password" });
  }
});
// this is to add products API to to add products
// create
app.post("/add-product", async (req, res) => {
  const data = req.body;
  const product = new Product(data);
  let result = await product.save();
  res.send(result);
});
// this is get all products API to get all products
// read
app.get("/products", async (req, res) => {
  let result = await Product.find();
  if (result.length > 0) {
    res.send(result);
  } else {
    res.send({ result: "No products found" });
  }
});
// this is to delete product api to delete product
// delete
app.delete("/product/:id", async (req, res) => {
  let result = await Product.findByIdAndDelete({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No product found" });
  }
});
// this is to get single product API
// Read
app.get("/product/:id", async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No product found" });
  }
});
// this is to update product API
app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No product found" });
  }
});
// this is to get search product API
app.get("/search/:key", async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key }},
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { description: { $regex: req.params.key } },
    ],
  });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No product found" });
  }
});
const middleware = (req, res, next) => {
    let token = req.headers.authorization;
    if(token){
        jwt.verify(token,jwtKey,(err,decoded)=>{
            if(err){
                res.send({result:"error in verifying token"})
            }else{
                // req.user = decoded;
                next();
            }
        })
    }else{
        res.send({result:"no token"})
    }
}
app.listen(8000, () => {
  console.log("Example app listening at http://localhost:8000");
});
