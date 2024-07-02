const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

const Wallet = mongoose.models.Wallet || mongoose.model('Wallet', WalletSchema);

module.exports = Wallet;
