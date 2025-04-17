const mongoose = require('mongoose');

const tariffSchema = new mongoose.Schema({
  hsCode: { type: String, default: null },
  country: { type: String, default: null },
  importDuty: { type: Number, default: null },
  additionalTaxes: {
    VAT: { type: Number, default: null },
    Excise: { type: Number, default: null }
  },
  totalDuties: { type: Number, default: null },
  notes: { type: String, default: null }
}, { timestamps: true });

const Tariff = mongoose.model('Tariff', tariffSchema);

module.exports = Tariff;