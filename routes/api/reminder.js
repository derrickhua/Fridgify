'use strict';
const express = require('express');
const router = new express.Router();
const reminderCtrl = require('../../controllers/api/reminders')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

const getTimeZones = function() {
  return momentTimeZone.tz.names();
};

// GET ALL REMINDERS regardless of who is logged in
router.get('/', reminderCtrl.index)

// CREATE
router.post('/create', reminderCtrl.create)

// UPDATE
router.put('/:id/update', reminderCtrl.update) 

// DELETE
router.delete('/:id', ensureLoggedIn, reminderCtrl.deleteReminder)


module.exports = router;
