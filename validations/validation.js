const Joi = require('joi');

const validateTariffRequest = (data) => {
  const schema = Joi.object({
    hsCode: Joi.string().length(6).pattern(/^\d+$/).required(), 
    country: Joi.string().length(3).pattern(/^\d{3}$/).required()
  });

  return schema.validate(data);
};

module.exports = { validateTariffRequest };
