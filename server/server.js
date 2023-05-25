const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const Order = require('../models/Orden');
const Message = require('../models/Mensajeria');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const mongoURI = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((error) => {
    console.error('Error de conexion MongoDB:', error);
  });

io.on('connection', (socket) => {
  console.log('Conectado');

  socket.on('disconnect', () => {
    console.log('Desconectado');
  });

  socket.on('placeOrder', async (data) => {
    try {
      const { orderId, orderDate } = data;

      const order = new Order({
        orderId,
        orderDate,
      });

      await order.save();

      const message = new Message({
        orderId,
        coordinates: { y: 0, x: 0 },
        status: 'Pendiente',
      });

      await message.save();

      io.emit('orderPlaced', order);
    } catch (error) {
      console.error('Error de orden:', error);
    }
  });
});

const port = 4000;

server.listen(port, () => {
  console.log(`Servidor en el puerto ${port}`);
});

