const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(
    'mongodb+srv://tee:tee123@baconsulting.wmymi.mongodb.net/investment-api?retryWrites=true&w=majority'
  );

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
