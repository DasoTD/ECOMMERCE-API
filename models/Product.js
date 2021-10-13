const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    title: {
        type: String, required: true, unique: true
    },
    desc: {
        type: String, required: true
    },
    img: {
        type: String, required: true
    },
    categories: {
        type: Array, required: true
    },
    size: {
        type: String, required: true
    },
    color: {
        type: String, required: true
    },
    price: {
        type: String, required: true
    },
},
{timestamps: true}
)

const Product = model('Products', ProductSchema);

module.exports =  Product;