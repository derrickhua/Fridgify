const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {type: String, required: true},
    expiryDate: {type: Date},
    inFridge: {type: Boolean, required: true},
    amountOfItem: {type: String, enum: ['High', 'Medium', 'Low'] },
    category: {type:String, required: true, 
        enum: ['Sauces', 'Drinks', 'Dairy Products', 'Frozen',
        'Meat, Seafood, Eggs', 'Fruits, Vegetables, Mushrooms', 'Miscellaneous']},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    reminder: {type: String, required: true}  
}, {
        timestamps: true,
})

module.exports = mongoose.model('Item', itemSchema);