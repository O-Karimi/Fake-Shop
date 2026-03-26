import Order from '../models/Order.js';
import express from 'express';
const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order (Triggers after successful PayPal payment)
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order({
      email: req.body.email,
      products: req.body.products,
      totalAmount: req.body.totalAmount,
      paypalTransactionId: req.body.paypalTransactionId
    });
    
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error saving order', error: error.message });
  }
});

// @route   GET /api/orders/:email
// @desc    Get order history for a specific user via email
router.get('/:email', async (req, res) => {
  try {
    const orders = await Order.find({ email: req.params.email })
                              .populate('products.product'); 
    
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this email' });
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching orders', error: error.message });
  }
});

export default router;