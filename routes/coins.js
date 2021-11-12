const express = require('express');
const {
  getCoins,
  getCoin,
  createCoin,
  updateCoin,
  deleteCoin
} = require('../controllers/coins');

const router = express.Router();

router.route('/').get(getCoins).post(createCoin);
router.route('/:id').get(getCoin).put(updateCoin).delete(deleteCoin);

module.exports = router;
