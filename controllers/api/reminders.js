const momentTimeZone = require('moment-timezone');
const moment = require('moment');
const Reminder = require('../../models/reminder')

module.exports = {
    index,
    create,
    update,
    deleteReminder
}

const getTimeZones = function() {
  return momentTimeZone.tz.names();
};

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
        res.json(newReminder)
    } catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

// GET: /reminders/:id/edit // get specific Reminder
router.get('/:id/edit', function(req, res, next) {
  const id = req.params.id;
  Reminder.findOne({_id: id})
    .then(function(reminder) {
      res.render('reminders/edit', {timeZones: getTimeZones(),
                                       reminder: reminder});
    });
});

// POST: /reminders/:id/edit
router.post('/:id/edit', function(req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
  const notification = req.body.notification;
  const timeZone = req.body.timeZone;
  const time = moment(req.body.time, 'MM-DD-YYYY hh:mma');

  Reminder.findOne({_id: id})
    .then(function(reminder) {
      reminder.name = name;
      reminder.phoneNumber = phoneNumber;
      reminder.notification = notification;
      reminder.timeZone = timeZone;
      reminder.time = time;

      reminder.save()
        .then(function() {
          res.redirect('/');
        });
    });
});

// POST: /reminders/:id/delete
router.post('/:id/delete', function(req, res, next) {
  const id = req.params.id;

  Reminder.remove({_id: id})
    .then(function() {
      res.redirect('/');
    });
});

module.exports = router;
