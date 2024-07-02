const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Wallet = require('../models/wallet');

// @route    GET api/wallet
// @desc     Get all currencies in the wallet
// @access   Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const wallet = await Wallet.find({ user: req.user.id });
    res.json(wallet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST api/wallet
// @desc     Add currency to the wallet
// @access   Private
router.post('/', authMiddleware, async (req, res) => {
  const { currency, amount } = req.body;

  try {
    let walletItem = await Wallet.findOne({ user: req.user.id, currency });

    if (walletItem) {
      walletItem.amount += parseFloat(amount);
      await walletItem.save();
    } else {
      walletItem = new Wallet({
        user: req.user.id,
        currency,
        amount: parseFloat(amount)
      });
      await walletItem.save();
    }

    res.json(walletItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/wallet/pln
// @desc     Update PLN amount
// @access   Private
router.put('/pln', authMiddleware, async (req, res) => {
  const { amount } = req.body;

  try {
    let walletItem = await Wallet.findOne({ user: req.user.id, currency: 'PLN' });

    if (walletItem) {
      walletItem.amount -= parseFloat(amount);
      await walletItem.save();
      res.json(walletItem);
    } else {
      res.status(400).json({ msg: 'PLN account not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/wallet/:currency
// @desc     Remove currency from the wallet
// @access   Private
router.delete('/:currency', authMiddleware, async (req, res) => {
  try {
    await Wallet.findOneAndRemove({ user: req.user.id, currency: req.params.currency });
    res.json({ msg: 'Currency removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
