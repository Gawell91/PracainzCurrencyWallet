const express = require('express');
const router = express.Router();
const Currency = require('../models/currency');

router.post('/', async (req, res) => {
    try {
        const { name, symbol } = req.body;
        const currency = new Currency({ name, symbol });
        await currency.save();
        res.status(201).json({ message: 'Currency added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const currencies = await Currency.find();
        res.status(200).json(currencies);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
