const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const tariffRoutes = require('./routes/tariff');

const app = express();
dotenv.config();
connectDB();


app.use(express.json());
app.get('/', (req, res) => {
    return res.send({ msg: "ok" });
  });
app.use('/hs-codes', tariffRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
