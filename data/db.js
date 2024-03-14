const mysql = require('mysql2');
const config = require('./config');

const Sequelize = require('sequelize');

const sequelize = new Sequelize (config.db.database, config.db.user,config.db.password, {
    dialect:'mysql',
    host: config.db.host,
});

async function connect() {
    try {
        await sequelize.authenticate();
        console.log("Mysql bağlantısı başarılı")
    } catch (error) {
        console.log("Bağlanırken bir hatayla karşılaşıldı:",error)
    }
}
connect();

module.exports = sequelize;