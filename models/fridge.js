/**
 * Abbreviations: meatSeaEgg, meats + seafood + eggs | fruits, vegetables, mushrooms fruVegMush
 */
// const fridgeSchema = new Schema({
//     inventory: [itemSchema]
// }, {
//     timestamps: true,
// });

// fridgeSchema.methods.addItem = async function(itemData) {
//     const fridge = this

//     fridge.inventory.push({
//         name: itemData.name,
//         expiryDate: itemData.date,
//         amountOfItem: itemData.amount,
//         category: itemData.category
//     })

//     return fridge.save()
// }

module.exports = mongoose.model('Fridge', FridgeSchema);
