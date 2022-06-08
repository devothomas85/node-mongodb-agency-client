const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/agencyclient", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(mongo => {
    console.log(mongo.connection.host + '/' + mongo.connection.name);
  })
  .catch(error => {
    console.log({ error }, 'ERROR');
  });

mongoose.connection
  .on('connected', function () {
    console.log('Mongoose default connection is open for APP');
  })
  .on('error', function (err) {
    console.log({ err }, 'Mongoose default connection error has occurred for APP ');
  })
  .on('disconnected', function () {
    console.log('Mongoose default connection is disconnected for APP');
  });

module.exports = mongoose;