const express = require('express');
const router = express.Router();
const Order = require('..Orden/models/Orden');
const Message = require('..Mensajeria/models/Mensajeria');

router.post('/orders', async (req, res) => {
  try {
    const { orderId, orderDate } = req.body;
    const order = new Order({ orderId, orderDate });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});

router.get('/orders/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ error: 'Order no encontrada' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});

router.post('/messages', async (req, res) => {
  try {
    const { orderId, coordinates, status } = req.body;
    const message = new Message({ orderId, coordinates, status });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});
router.get('/messages/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const messages = await Message.find({ orderId });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});

module.exports = router;
