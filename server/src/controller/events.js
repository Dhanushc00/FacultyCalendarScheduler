const Sequelize = require("sequelize");
const { Events, Users } = require("../models/index");

const createEvents = async (eventOpts,CId,roles) => {
  eventOpts.creator=CId;
  const event = await Events.create({
    ...eventOpts,
  });
  await event.addUsers(eventOpts.Participants);
  // const events = await Events.findAll({
  //   include: [{ model: Users, attributes: ["username"] }],
  // });
  //const events=await Events.findAll({include: EventParticipant })
  //console.log(events);
  const events2 = await Events.findAll(
    {
      where: { creator: CId },
      include: [{ model: Users, attributes: ["username"] }],
    }
  );
  const participant2 = await Events.findAll({
    include: [
      {
        model: Users,
        attributes: ["username"],
        where: {
          username: CId,
        },
      },
    ],
  });
  return {events:events2,participant:participant2};
};

const getEvents = async (FId, roles) => {
  const events = await Events.findAll(
    {
      where: { creator: FId },
      include: [{ model: Users, attributes: ["username"] }],
    }
  );
  const participant = await Events.findAll({
    include: [
      {
        model: Users,
        attributes: ["username"],
        where: {
          username: FId,
        },
      },
    ],
  });
  //console.log(participant);
  return {events,participant};
};

const updateEvent=async(EventOpts,FId,roles)=>{
  EventOpts.creator=FId;
    const event=await Events.findOne({
      where: {EventId:EventOpts.EventId}
    })
    await event.update({...EventOpts});
    const events4 = await Events.findAll(
      {
        where: { creator: FId },
        include: [{ model: Users, attributes: ["username"] }],
      }
    );
    const participant4 = await Events.findAll({
      include: [
        {
          model: Users,
          attributes: ["username"],
          where: {
            username: FId,
          },
        },
      ],
    });
    return {events:events4,participant:participant4}
}



const deleteEvent=async(EventId,CId,roles)=>{
        const event=await Events.findOne({
            where:{
                EventId: EventId
            }
        })
        //console.log(event);
        await event.destroy();
        // const events1 = await Events.findAll(
        //     {
        //       where: { creator: CId },
        //     },
        //     {
        //       include: [{ model: Users, attributes: ["username"] }],
        //     }
        //   );

        const events1 = await Events.findAll(
          {
            where: { creator: CId },
            include: [{ model: Users, attributes: ["username"] }],
          }
        );
        const participant1 = await Events.findAll({
          include: [
            {
              model: Users,
              attributes: ["username"],
              where: {
                username: CId,
              },
            },
          ],
        });
        return {events:events1,participant:participant1};
}



module.exports = {
  createEvents,
  getEvents,
  deleteEvent,
  updateEvent
};
