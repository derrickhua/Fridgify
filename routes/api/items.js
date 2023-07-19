const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/api/items')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// GET /api/classes
router.get('/', ensureLoggedIn, itemsCtrl.index);
// GET /api/items/create
router.post('/create', ensureLoggedIn, itemsCtrl.create)
// GET /api/items/update
router.put('/:id/update', ensureLoggedIn, itemsCtrl.update)
// GET /api/items/delete
router.delete('/:id', ensureLoggedIn, itemsCtrl.deleteItem)

module.exports = router;