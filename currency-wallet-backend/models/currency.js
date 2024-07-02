const mongoose = require('mongoose');

const CurrencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    priceHistory: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            price: Number
        }
    ]
});

const Currency = mongoose.model('Currency', CurrencySchema);

module.exports = Currency;
