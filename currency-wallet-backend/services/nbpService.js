const axios = require('axios');
const Rate = require('../models/rate');

const fetchExchangeRates = async () => {
    try {
        const response = await axios.get('http://api.nbp.pl/api/exchangerates/tables/C/');
        const data = response.data[0];

        // Zapisz dane w bazie danych
        const rate = new Rate({
            table: data.table,
            no: data.no,
            tradingDate: data.tradingDate,
            effectiveDate: data.effectiveDate,
            rates: data.rates
        });

        await rate.save();
        console.log('Exchange rates saved to the database');
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
};

module.exports = {
    fetchExchangeRates
};
