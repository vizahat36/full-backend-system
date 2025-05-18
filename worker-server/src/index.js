const cron = require('node-cron');
const { connectNATS, publishUpdate } = require('./nats');

(async () => {
  const nc = await connectNATS();

  // Run job every 15 mins
  cron.schedule('*/15 * * * *', async () => {
    console.log('🕒 Running scheduled job');
    await publishUpdate(nc);
  });

  // Run once immediately too (optional)
  await publishUpdate(nc);
})();
