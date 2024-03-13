const mongoose = require("mongoose");
require("dotenv").config();
const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGOURL)
    .then((data) => {
      console.log(`Mongo DB is Connected at :${data.connection.host}`);
    });
};

module.exports = connectDatabase;
