const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,"product name must be provided"]
    },
    price: {
        type: Number,
        require:[true,"product price must be provided"]
    },
    featured: {
        type: Boolean,
        default:false,
    },
    rate: {
        type: Number,
        default: 3.5
    },
    createAt: {
        type: Date,
        default:Date.now(),
    },
    company: {
        type: String,
        enum: {
            values :["ikea","liddy","caressa","marcos" ]
        }
    }
    
})

module.exports=mongoose.model("product",productSchema)