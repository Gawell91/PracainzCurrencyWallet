
const { sequelize, connectDB } = require('../config/db');
const User = require('./user');
const Currency = require('./currency');
const Wallet = require('./wallet');

User.hasMany(Currency, { foreignKey: 'userId' });
Currency.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Wallet, { foreignKey: 'userId' });
Wallet.belongsTo(User, { foreignKey: 'userId' });

Currency.hasMany(Wallet, { foreignKey: 'currencyId' });
Wallet.belongsTo(Currency, { foreignKey: 'currencyId' });

const initDB = async () => {
    await sequelize.sync({ force: true });
    console.log('Database synchronized');
};

module.exports = { User, Currency, Wallet, connectDB, initDB };
