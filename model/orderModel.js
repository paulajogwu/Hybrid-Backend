const database = require('../database');
const {Sequelize} = require('sequelize');
var Order = database.define("Order", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    buyer_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    seller_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
   
    cart: {
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
    modelName: "Order"
    //  timestamps: false   
});

// sync model
database.sync();

module.exports = Order;




