const CryptoStat = require('../models/CryptoStat');

// Handler for latest stat: /stats?coin=bitcoin
const getLatestStats = async (req, res) => {
  const { coin } = req.query;

  if (!coin || !['bitcoin', 'ethereum', 'matic-network'].includes(coin)) {
    return res.status(400).json({ error: 'Invalid or missing coin' });
  }

  const stat = await CryptoStat.findOne({ coin }).sort({ timestamp: -1 });

  if (!stat) {
    return res.status(404).json({ error: 'No stats found for this coin' });
  }

  res.json({
    price: stat.price,
    marketCap: stat.marketCap,
    '24hChange': stat.change24h,
  });
};

// Handler for deviation: /deviation?coin=bitcoin

const getPriceDeviation = async (req, res) => {
  const { coin } = req.query;

  if (!coin || !['bitcoin', 'ethereum', 'matic-network'].includes(coin)) {
    return res.status(400).json({ error: 'Invalid or missing coin' });
  }

  const stats = await CryptoStat.find({ coin })
    .sort({ timestamp: -1 })
    .limit(100);

  if (!stats.length) {
    return res.status(404).json({ error: 'No records found' });
  }

  const prices = stats.map(stat => stat.price);
  const mean = prices.reduce((acc, val) => acc + val, 0) / prices.length;
  const variance = prices.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / prices.length;
  const deviation = Math.sqrt(variance);

  res.json({ deviation: +deviation.toFixed(2) });
};

module.exports = {
  getLatestStats,
  getPriceDeviation,
};