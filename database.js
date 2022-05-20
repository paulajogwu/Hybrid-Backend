const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('Hybrid','postgres','123',{
    host:'localhost',
    dialect:'postgres',
});

sequelize.authenticate().then(function (success) {
    console.log("Successfully we are connected with the database");
}).catch(function (error) {

    console.log(error);
})

module.exports = sequelize

