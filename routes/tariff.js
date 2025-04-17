const express = require('express');
const router = express.Router();
const { fetchTariffData } = require('../services/tariffService');
const { validateTariffRequest } = require('../validations/validation');
const Tariff = require('../models/Tariff');

const supportedCountries = [
  { country: "United States", code: "840" },
  { country: "India", code: "356" },
  { country: "China", code: "156" },
  { country: "Germany", code: "276" },
  { country: "France", code: "250" },
  { country: "Brazil", code: "076" },
  { country: "Japan", code: "392" },
  { country: "United Kingdom", code: "826" },
  { country: "Canada", code: "124" },
  { country: "Australia", code: "036" },
  { country: "South Africa", code: "710" },
  { country: "Mexico", code: "484" },
  { country: "Indonesia", code: "360" },
  { country: "Saudi Arabia", code: "682" },
  { country: "Russia", code: "643" },
  { country: "South Korea", code: "410" },
  { country: "Italy", code: "380" },
  { country: "Argentina", code: "032" },
  { country: "Vietnam", code: "704" },
  { country: "Egypt", code: "818" }
];

const data = [
  { product: "Articles and equipment for general physical exercise, gymnastics or athletics", code: "950691" },
  { product: "Other", code: "950699" },
  { product: "Fishing rods", code: "950710" },
  { product: "Fish-hooks, whether or not snelled", code: "950720" },
  { product: "Fishing reels", code: "950730" },
  { product: "Other", code: "950790" },
  { product: "Roundabouts, swings, shooting galleries and other fairground amusements; travelling circuses, travelling menageries and travelling theatres", code: "950800" },
  { product: "Travelling circuses and travelling menageries", code: "950810" },
  { product: "Amusement park rides and water park amusements; Roller coasters", code: "950821" },
  { product: "Amusement park rides and water park amusements; carousels, swings and roundabouts", code: "950822" },
  { product: "Amusement park rides and water park amusements; dodge'em cars", code: "950823" },
  { product: "Amusement park rides and water park amusements; motion simulators and moving theatres", code: "950824" },
  { product: "Amusement park rides and water park amusements; water rides", code: "950825" },
  { product: "Amusement park rides and water park amusements; water park amusements", code: "950826" },
  { product: "Amusement park rides and water park amusements; other than roller coasters, carousels, swings, roundabouts, dodge'em cars, motion simulators and moving theatres, water rides and water park amusements", code: "950829" },
  { product: "Fairground amusements; including shooting galleries", code: "950830" },
  { product: "Travelling theatres", code: "950840" },
  { product: "Other", code: "950890" },
  { product: "Worked ivory and articles of ivory", code: "960110" },
  { product: "Other", code: "960190" }
]

router.get('/:code/tariff', async (req, res) => {
  const { code } = req.params;
  const { country } = req.query;
  const { error } = validateTariffRequest({ hsCode: code, country });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const existingTariff = await Tariff.findOne({ hsCode: code, country: supportedCountries.filter(d => { if (d.code === country) return d.country })[0].country });
    if (existingTariff) {
      return res.json(existingTariff);
    }

    const data = await fetchTariffData(code, country);
console.log(data);

    const newTariff = new Tariff(data);
    await newTariff.save();

    return res.json(newTariff);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


router.get('/supported-countries', (req, res) => {
  res.json({ supportedCountries });
});

router.get('/all-hs-codes', async (req, res) => {
  res.json({ data });
});

module.exports = router;
