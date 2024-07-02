const Currency = require('../models/Currency');

exports.getCurrencies = async (req, res) => {
    try {
        const currencies = await Currency.find({ userId: req.user.id });
        res.json(currencies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.addCurrency = async (req, res) => {
    const { name, symbol } = req.body;
    try {
        const newCurrency = new Currency({ name, symbol, userId: req.user.id });
        await newCurrency.save();
        res.json(newCurrency);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
