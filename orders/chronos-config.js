const chronos = require('chronos-tracker');
process.env.MONGO_URI = "mongodb+srv://chronos:chronos@cluster0.tpeie.mongodb.net/chronos?retryWrites=true&w=majority"

chronos.use({
  microservice: 'orders',
  interval: 2000,
  // dockerized: true,
  database: {
    type: 'MongoDB',
    // URI: process.env.MONGO_URI,
    URI: "mongodb+srv://chronos:chronos@cluster0.tpeie.mongodb.net/chronos?retryWrites=true&w=majority"  },
  notifications: [],
});