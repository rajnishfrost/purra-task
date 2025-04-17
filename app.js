const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const tariffRoutes = require('./routes/tariff');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use('/hs-codes', tariffRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
