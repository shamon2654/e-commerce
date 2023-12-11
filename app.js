const express = require("express");
require('express-async-errors');
require("dotenv").config();
const product = require("./Routes/products");
const notfound = require("./Middlware/notFound");
const errorHandlerMiddleware = require("./Middlware/errorHandler");
const connectDB = require("./DB/connectDB");





const app = express();//insigness of express

app.use(express.json())//conver express contents into json

app.get('/', (req, res) => {
    res.send("<h1>store Api</h1><a  href='/api/v1/product'>product Routs</a>")
})

app.use("/api/v1/product",product)
app.use(notfound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 6000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
        console.log(`server run in port ${port}`)
    })
    } catch (error) {
       console.log(error)
    }
    
}

start();
