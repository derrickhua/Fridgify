
const moment = require('moment');
const Reminder = require('../../models/reminder')

module.exports = {
    index,
    create,
    update,
    deleteReminder
}



// GET: /reminders
async function index(req, res, next) {
    let reminders = []
    try {
        reminders = Reminder.find()
    } catch {
        console.log('YEAH BUDDY NO REMINDERS')
    } finally {
        res.json(reminders)
    }
}

// GET: /reminders/create // this function is used to generate a create page
// thats unnecessary
async function createPage(req, res, next) {
    return null
};

// POST: /reminders
async function create(req, res, next) {
    try {
        const newReminder = await Reminder.create(req.body)
        newReminder.phoneNumber = `${req.user.phoneNumber}`
        newReminder.save()
        res.json(newReminder)
    } catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

// GET: /reminders/:id/edit // get specific Reminder
async function update(req, res, next) {
  try {
    let updateItem = await Reminder.findByIdAndUpdate(req.params.id, req.body, {returnDocument:'after'})
    console.log(updateItem)
    updateItem.save()
    res.json(updateItem)
  } catch(err) {
    console.log(err)
    res.status(400).json(err)
  }
}

// POST: /reminders/:id/delete
async function deleteReminder(req, res, next) {
  try {
    let deletedRem = await Reminder.findByIdAndDelete(req.params.id)
    res.json(deletedRem)
  } catch(err){
    console.log(err)
    res.status(400).json(err)
  }
}
