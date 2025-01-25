const mongoose = require('mongoose');

const tenderMatchSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  matchedProducts: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  }],
  status: {
    type: String,
    enum: ['pending', 'negotiation', 'finalized'],
    default: 'pending',
  },
  finalPrice: {
    type: Number,
    required: false,
  },
});

const TenderMatch = mongoose.model('TenderMatch', tenderMatchSchema);

module.exports = TenderMatch;
