const express = require('express');
const router = express.Router();
const axios = require('axios');
const xml2js = require('xml2js');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://api.nbp.pl/api/exchangerates/tables/C/?format=json');
    const rates = response.data[0].rates;

    rates.unshift({
      currency: 'Polski złoty',
      code: 'PLN',
      bid: 1.00,
      ask: 1.00
    });

    res.json(rates);
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    res.status(500).send('Error fetching currency rates');
  }
});

router.get('/latest', async (req, res) => {
  try {
    const response = await axios.get('http://api.nbp.pl/api/exchangerates/tables/C/?format=json');
    const rates = response.data[0].rates;
    const filteredRates = rates.filter(rate =>
      ['USD', 'EUR', 'GBP', 'AUD', 'CHF', 'JPY', 'CZK', 'NOK', 'SEK', 'DKK'].includes(rate.code)
    ).map(rate => ({
      currency: rate.currency.charAt(0).toUpperCase() + rate.currency.slice(1),
      code: rate.code,
      bid: rate.bid,
      ask: rate.ask
    }));

    filteredRates.unshift({
      currency: 'Polski złoty',
      code: 'PLN',
      bid: 1.00,
      ask: 1.00
    });

    res.json(filteredRates);
  } catch (error) {
    console.error('Error fetching latest currency rates:', error);
    res.status(500).send('Error fetching latest currency rates');
  }
});

module.exports = router;
