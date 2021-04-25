const Sequelize = require("sequelize");
//('fcsdb','fcsadmin','123456789'),
const db = new Sequelize({
  database: "fcsdb",
  username: "fcsadmin",
  password: "123456789",
  host: "localhost",
  dialect: "postgres",
  operatorAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});


const Users = db.define("user", {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
    unique: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  roles: {
    type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
    allowNull: false,
  },
  bio: Sequelize.STRING,
  image: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
});

// const Faculty=Users.findAll({
//     where:{
//         roles: {[Sequelize.Op.contains]: ["Faculty"]}
//     }
// }).then((res)=>console.log(res))

const Calendar = db.define("calendar", {
  date: {
    type: Sequelize.DataTypes.DATEONLY,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  description:{
    type: Sequelize.DataTypes.STRING
  },
  type: {
    type: Sequelize.DataTypes.ENUM,
    values: ["W", "S", "H"], //W-working , S- Working only for faculty, H- holiday
  },
});

const Sem = db.define("semester", {
  SemId: {
    type: Sequelize.DataTypes.STRING,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  startDate: {
    type: Sequelize.DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: Sequelize.DataTypes.DATEONLY,
    allowNull: false,
  },
  semNo: {
    type: Sequelize.DataTypes.ENUM,
    values: ["1", "2", "3", "4", "5", "6", "7", "8"],
    allowNull: false,
  },
});

const ClassPeriods = db.define("ClassPeriods", {
  periodId: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  startTime: {
    type: Sequelize.DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: Sequelize.DataTypes.DATE,
    allowNull: false,
  },
  courseCode: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
});

const Events = db.define("Events", {
  EventId: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  creator:{
      type: Sequelize.DataTypes.STRING,
      allowNull: false
  },
  startTime: {
    type: Sequelize.DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: Sequelize.DataTypes.DATE,
    allowNull: false,
  },
  EventName: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.DataTypes.ENUM,
    values: ["Exam", "Misc", "Meeting"],
  },
  Location: {
    type: Sequelize.DataTypes.STRING,
  },
});

const Leaves = db.define('leavedetails',{
  leaveid:{
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  fromdate:{
      type: Sequelize.DataTypes.DATEONLY ,
      //primaryKey: true
  },
  todate:{
      type: Sequelize.DataTypes.DATEONLY,
      //primaryKey:true
  },
  leavetype:{
      type:Sequelize.DataTypes.ENUM('Normal','Medical','Duty')
  }
});

const ReminderEvents= db.define('ReminderEvents',{
    time:{
      type: Sequelize.DataTypes.DATE
    }
})

Users.hasMany(Leaves);
Leaves.belongsTo(Users);

Users.hasMany(ClassPeriods);
ClassPeriods.belongsTo(Users);

Sem.hasMany(ClassPeriods);
ClassPeriods.belongsTo(Sem);

Events.belongsToMany(Users,{through: 'EventParticipant'});
Users.belongsToMany(Events,{through: 'EventParticipant'});

Events.hasMany(ReminderEvents);
ReminderEvents.belongsTo(Events);

Users.hasMany(ReminderEvents);
ReminderEvents.belongsTo(Users);


module.exports = {
  db,
  Users,
  Events,
  Sem,
  ClassPeriods,
  Calendar,
  Leaves,
  ReminderEvents
};
// db.authenticate().then(()=> 'Database conected').catch((err)=>console.log(err))
