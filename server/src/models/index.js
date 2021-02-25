const Sequilize = require('sequelize')
//('fcsdb','fcsadmin','123456789'),
const db=new Sequilize({
    database: 'fcsdb',
    username: 'fcsadmin',
    password: '123456789',
    host: 'localhost',
    dialect: 'postgres',
    operatorAliases: false,
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
})

const Users = db.define('user',{
    email:{
        type:Sequilize.STRING,
        validate:{
            isEmail:true
        },
        unique: true,
        allowNull: false,
    },
    username:{
        type:Sequilize.STRING,
        primaryKey: true
    },
    password:{
        type:Sequilize.STRING,
        allowNull: false,
    },
    roles:{
        type:Sequilize.DataTypes.ARRAY(Sequilize.DataTypes.STRING),
        allowNull: false
    },
    bio: Sequilize.STRING,
    image: {
        type: Sequilize.STRING,
        allowNull: true,
        validate:{
            isUrl: true
        }
    }    
});



module.exports={
    db,
    Users
}
// db.authenticate().then(()=> 'Database conected').catch((err)=>console.log(err))