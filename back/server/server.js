require('dotenv').config();
const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const socketHandler = require('../socketHandler');
const dbClient = require('./db');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

server.listen(app.get('port'), async () => {
  try {
    await dbClient();
    await createAllIndexes();
    await seed();

    socketHandler(io);

    await deliveryAssociateWatchers(io);
    await shipmentWatchers(io);
    

    console.log('node version', process.version);
    const GREEN_LINE = '\x1b[32m%s\x1b[0m';
    console.log(GREEN_LINE, 'Server started');
    console.log(`Port: ${app.get('port')}`);
    console.log(`Environment: ${app.get('env')}`);
  } catch (error) {
    console.error(error);
  }
});

module.exports = server;
