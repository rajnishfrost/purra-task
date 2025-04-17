const mongoose = require('mongoose');

const tariffSchema = new mongoose.Schema({
  hsCode: { type: String, required: true },
  country: { type: String, required: true },
  importDuty: { type: Number, required: true },
  additionalTaxes: {
    VAT: { type: Number, required: true },
    Excise: { type: Number, required: true },
  },
  totalDuties: { type: Number, required: true },
  notes: { type: String },
}, { timestamps: true });

const Tariff = mongoose.model('Tariff', tariffSchema);

module.exports = Tariff;
