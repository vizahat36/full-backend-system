
const { connect } = require('nats');
const storeCryptoStats = require('./storeCryptoStats');

let nc;

async function connectNATS() {
  nc = await connect({ servers: 'localhost:4222' });
  console.log('🔗 API Server connected to NATS');

  const sub = nc.subscribe('crypto.update');

  for await (const msg of sub) {
    console.log('📥 Received event:', msg.data.toString());
    if (msg.data.toString() === '{"trigger":"update"}') {
      await storeCryptoStats();
    }
  }
}

module.exports = connectNATS;
