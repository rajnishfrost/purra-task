const axios = require('axios');

const fetchTariffData = async (hsCode, countryCode) => {
  try {
    const response = await axios.get(
      `https://wits.worldbank.org/API/V1/SDMX/V21/datasource/TRN/reporter/${countryCode}/partner/000/product/${hsCode}/year/all/datatype/aveestimated?format=JSON`
    );

    // Safe extraction paths
    const dataSet = response.data?.dataSets?.[0]?.series?.["0:0:0:0:0"]?.observations;
    const importDuty = Number(dataSet?.["0"]?.[0]) ?? null;

    const reporterInfo = response.data?.structure?.dimensions?.series?.find(d => d.id === "REPORTER");

    const country = reporterInfo?.values?.[0]?.name || countryCode;

    const VAT = null;
    const Excise = null;

    let totalDuties = Number([importDuty, VAT, Excise].filter(n => typeof n === "number").reduce((a, b) => a + b, 0));

    const custom = {
      hsCode,
      country,
      importDuty,
      additional_taxes: {
        VAT,
        Excise
      },
      totalDuties,
      notes: response?.data?.dataSets[0]?.series["0:0:0:0:0"]?.annotations[0]
    };

    return custom;

  } catch (error) {
    console.error('❌ Error:', error.message);
    throw new Error('Error fetching tariff data');
  }
};

module.exports = { fetchTariffData };