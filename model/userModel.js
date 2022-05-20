const database = require('../database');
const {Sequelize} = require('sequelize');
var User = database.define("User", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
   
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userType: {
        type: Sequelize.ENUM("Buyer", "Seller"),
        allowNull: false
       
    },
   
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    }
}, {
    modelName: "User"
    //  timestamps: false   
});

// sync model
database.sync();

module.exports = User;




