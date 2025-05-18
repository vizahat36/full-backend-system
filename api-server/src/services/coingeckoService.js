
const axios = require('axios');
const { COINGECKO_API } = process.env;

const coins = ['bitcoin', 'ethereum', 'matic-network'];

async function fetchCryptoStats() {
  const ids = coins.join('%2C');
  const url = `${COINGECKO_API}/simple/price?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

  const { data } = await axios.get(url);
  return data;
}

module.exports = { fetchCryptoStats };
