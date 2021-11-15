const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  console.log(process.env.MONGO_URL);
  const conn = await mongoose.connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log(
    `MongoDB Connected:: ${conn.connection.host}`.cyan.underline.bold
  );
};

module.exports = connectDB;
