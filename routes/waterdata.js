const express = require('express');
const auth = require('../middleware/auth');
const WaterData = require('../models/WaterData');

const router = express.Router();

// Add water data
router.post('/', auth, async (req, res) => {
  const { pH, contaminants, location } = req.body;
  try {
    const newData = new WaterData({ userId: req.user.id, pH, contaminants, location });
    await newData.save();
    res.json(newData);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get user's water data
router.get('/', auth, async (req, res) => {
  try {
    const data = await WaterData.find({ userId: req.user.id });
    res.json(data);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
