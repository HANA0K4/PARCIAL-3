
const Order = require('../models/Orden');

const createOrder = async (req, res) => {
  try {
    const { orderId, orderDate } = req.body;
    const order = new Order({ orderId, orderDate });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'rror' });
  }
};
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ error: 'orden no encontrada' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'error' });
  }
};

module.exports = { createOrder, getOrderById };
