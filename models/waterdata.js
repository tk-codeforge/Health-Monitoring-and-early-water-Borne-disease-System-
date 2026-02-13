const mongoose = require('mongoose');

const waterDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pH: { type: Number, required: true },
  contaminants: { type: String }, // e.g., "E. coli, Lead"
  location: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WaterData', waterDataSchema);
