const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
// const Transaction = require('./models/Transaction');
const Coin = require('./models/Coin');

// Connect to DB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Read JSON files
// const transactions = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/transactions.json`, 'utf-8')
// );

const coins = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/coins.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    // await Transaction.create(transactions);
    await Coin.create(coins);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    // await Transaction.deleteMany();
    await Coin.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
