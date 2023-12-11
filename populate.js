const express = require("express")
const connectDB = require("./DB/connectDB");
const products = require("./Models/products");

require("dotenv").config();

const app = express();

const Product = require("./Models/products");

const jsonProduct = require("./products.json");

const port=process.env.PORT
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        await Product.deleteMany();
        await Product.create(jsonProduct);
    app.listen(port, () => {
        console.log(`sucess`)
    })
    } catch (error) {
       console.log(error)
    }
    
}

start();