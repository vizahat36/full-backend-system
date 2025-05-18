
const CryptoStat = require('./models/CryptoStat');
const { fetchCryptoStats } = require('./services/coingeckoService');

async function storeCryptoStats() {
  const receivedAt = new Date().toISOString();
  console.log(`📥 Received update event at: ${receivedAt}`);

  const stats = await fetchCryptoStats();

  const entries = Object.entries(stats).map(([coin, values]) => ({
    coin,
    price: values.usd,
    marketCap: values.usd_market_cap,
    change24h: values.usd_24h_change,
  }));

  await CryptoStat.insertMany(entries);

  const savedAt = new Date().toISOString();
  console.log(`📊 Stats saved to DB at: ${savedAt}`);
}

module.exports = storeCryptoStats;
