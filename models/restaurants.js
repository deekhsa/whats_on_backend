const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  res_id: { type: Number, required: true },
  locality: { type: String, required: true },
  cuisines: { type: String, required: true },
  aggregate_rating: { type: Number, required: true },
  average_cost_for_two: { type: Number, required: true },
}, { strict: false }); // Allow additional fields

module.exports = mongoose.model('restaurant', restaurantSchema);
