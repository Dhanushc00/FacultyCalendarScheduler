const { ReminderEvents,Events } = require("../models/index");
const moment = require("moment");
const { Op } = require("sequelize");
const createReminder = async (remOpts, username, roles) => {
  console.log(remOpts);
  console.log("Inn");
  let sd = "";
  await ReminderEvents.findOne({ where: { EventEventId: remOpts.id } }).then(
    async (rem) => {
      if (rem) {
        rem.time = remOpts.time;
        await rem.save();
        sd = "Already exist and changed reminder time";
      } else {
        await ReminderEvents.create({
          EventEventId: remOpts.id,
          time: remOpts.time,
          userUsername: username,
        });
        sd = "New Reminder created";
      }
    }
  );
  return sd;
};
const getReminder = async (username) => {
  let endDate = new Date();
  //let endDate=moment('Mon Mar 09 2021 10:40:01 GMT+0530 (India Standard Time)').toISOString();
  //console.log(endDate);
  let startDate = moment(endDate).subtract(5, "minutes").toISOString();
  console.log(endDate, startDate);
  const reminders = await ReminderEvents.findAll({
    where: {
      userUsername: username,
      time: {
        [Op.between]: [startDate, endDate],
      },
    }, include: [{ model: Events, attributes: ["EventName"] }]
  });

  return reminders;
};
const deleteReminder = async (eventId) => {
  const rem = await ReminderEvents.findOne({
    where: { EventEventId: eventId },
  });
  await rem.destroy();
  return "success";
};
module.exports = {
  createReminder,
  deleteReminder,
  getReminder,
};
