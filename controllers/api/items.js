const Items = require('../../models/item')

module.exports = {
    index,
    create,
    update,
    deleteItem
}

async function index(req, res) {
    let items = []
    try {
        // find all items that user owns
        items = await Items.find({user: req.user._id}).sort('category').exec()
    } catch {
        console.log('User has no items currently')
    } finally {
        res.json(items)
    }
}

async function create(req, res) {
    try {
        req.body.user = req.user._id
        const newItem = await Items.create(req.body);
        
        res.json(newItem);
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function update(req, res) {
    try {
        let options = {returnDocument:'after'}
        let changedItem = await Items.findByIdAndUpdate(req.params.id, req.body, options)
        console.log(changedItem)
        changedItem.save();
        res.json(changedItem);
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function deleteItem(req, res) {
    try {
        let deletedItem = await Items.findByIdAndDelete(req.params.id)
        res.json(deletedItem)
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
  }

