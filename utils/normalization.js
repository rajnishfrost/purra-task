
const normalizeCountry = (country) => {
    const countryMap = {
      'USA': 'US',
      'India': 'IN',
      'Germany': 'DE'
    };
    return countryMap[country] || country;
  };
  
  const normalizeHSCode = (code) => {
    return code.trim().padStart(6, '0');
  };
  
  module.exports = { normalizeCountry, normalizeHSCode };
  