const express = require('express');
const router = express.Router();
const { fetchTariffData } = require('../services/tariffService');
const { validateTariffRequest } = require('../validations/validation');
const Tariff = require('../models/Tariff');

router.get('/:code/tariff', async (req, res) => {
  const { code } = req.params;
  const { country } = req.query;
  const { error } = validateTariffRequest({ hsCode: code, country });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const existingTariff = await Tariff.findOne({ hsCode: code, country });
    if (existingTariff) {
      return res.json(existingTariff);
    }

    const data = await fetchTariffData(code, country);

    const tariffData = {
      hsCode: code,
      country: country,
      importDuty: data.importDuty,
      additionalTaxes: data.additionalTaxes,
      totalDuties: data.totalDuties,
      notes: data.notes,
    };

    const newTariff = new Tariff(tariffData);
    await newTariff.save();

    return res.json(newTariff);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


router.get('/supported-countries', (req, res) => {
  const supportedCountries = ['US', 'DE', 'IN', 'UK', 'FR']; 
  res.json({ supportedCountries });
});

router.get('/sample-hs-codes', (req, res) => {
  const sampleHSCodes = ['090111', '010121', '040210'];
  res.json({ sampleHSCodes });
});

module.exports = router;
