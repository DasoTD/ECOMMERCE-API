const { Schema, model } = require('mongoose');

const CartSchema = new Schema({
    userId: {
        type: String, required: true
    },
    products: [
        {
        productId: {
            type: String
        },
        quantity: {
            type: Number,
            default: 1
        }
    }
    ]
},
{timestamps: true}
)

const Cart = model('Carts', CartSchema);

module.exports =  Cart;