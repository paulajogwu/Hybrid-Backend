const database = require('../database');
const {Sequelize} = require('sequelize');
var Product = database.define("Product", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
   
    Price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    seller_id: {
        type: Sequelize.STRING,
        allowNull: false
       
    },
    userType: {
        type: Sequelize.STRING,
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
    modelName: "Product"
    //  timestamps: false   
});

// sync model
database.sync();

module.exports = Product;




