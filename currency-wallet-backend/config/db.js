const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/currency_wallet', {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
