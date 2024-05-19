const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  state: { type: String, required: true },
  city: { type: String, required: true },
  area: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  furnished: { type: Boolean, required: true },
  description: { type: String, required: true },
  cost: { type: Number, required: true },
  petsAllowed: { type: Boolean, required: true },
  likes: { type: Number, default: 0 },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Property', propertySchema);
