const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {type: String, required: true},
    expiryDate: {type: Date},
    amountOfItem: {type: String, enum: ['High', 'Medium', 'Low'] },
    category: {type:String, required: true, 
        enum: ['Sauces', 'Drinks', 'Dariy Products', 
        'Meat, Seafood, Eggs', 'Fruits, Vegetables, Mushrooms', 'Miscellaneous']}
}, {
        timestamps: true,
})

module.exports = mongoose.model('Item', itemSchema);