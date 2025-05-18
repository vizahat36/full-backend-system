
require('dotenv').config();
const express = require('express');
const connectDB = require('./utils/db');
const storeCryptoStats = require('./storeCryptoStats');
const statsRoutes = require('./routes/statsRoutes');
const connectNATS = require('./nats');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use('/', statsRoutes); 


app.get('/store', async (req, res) => {
  await storeCryptoStats();
  res.send('Stats stored!');
});

app.listen(PORT, async () => {
  console.log(`🚀 API Server running on port ${PORT}`);
  await connectNATS(); 
});
