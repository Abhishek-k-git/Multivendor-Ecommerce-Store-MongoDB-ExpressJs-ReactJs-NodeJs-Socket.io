const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_CONNECTION_STRING).then((data) => {
    console.log(`connected to server: ${data.connection.host}`);
  });
};

module.exports = connectDatabase;
