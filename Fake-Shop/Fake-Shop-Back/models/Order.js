const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  paypalTransactionId: {
    type: String,
    required: true  
  },
  status: {
    type: String,
    default: 'Paid'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);