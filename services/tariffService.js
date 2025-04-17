const axios = require('axios');

const fetchTariffData = async (hsCode, country) => {
  try {
    const response = await axios.get(`https://hts.usitc.gov/hs-codes/${hsCode}/tariff`, {
      params: {
        country: country,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching tariff data');
  }
};

module.exports = { fetchTariffData };
