
const { connect } = require('nats');

let nc;

async function connectNATS() {
  nc = await connect({ servers: 'localhost:4222' });
  console.log('🔗 Worker connected to NATS');
  return nc;
}

async function publishUpdate(nc) {
  await nc.publish('crypto.update', Buffer.from(JSON.stringify({ trigger: 'update' })));
  console.log('📤 Published update event');
}

module.exports = { connectNATS, publishUpdate };
