const mongoose = require('mongoose');

const RateSchema = new mongoose.Schema({
    table: String,
    no: String,
    tradingDate: Date,
    effectiveDate: Date,
    rates: [
        {
            currency: String,
            code: String,
            bid: Number,
            ask: Number
        }
    ]
});

const Rate = mongoose.model('Rate', RateSchema);

module.exports = Rate;
