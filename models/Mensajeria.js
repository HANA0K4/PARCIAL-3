const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  coordinates: {
    y: {
      type: Number,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
  },
  status: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;


