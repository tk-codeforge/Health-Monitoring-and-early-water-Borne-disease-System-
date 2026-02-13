const express = require('express');
const auth = require('../middleware/auth');
const Symptom = require('../models/Symptom');

const router = express.Router();

// Add symptoms
router.post('/', auth, async (req, res) => {
  const { symptoms } = req.body;
  try {
    const newSymptom = new Symptom({ userId: req.user.id, symptoms });
    await newSymptom.save();
    res.json(newSymptom);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get user's symptoms
router.get('/', auth, async (req, res) => {
  try {
    const symptoms = await Symptom.find({ userId: req.user.id });
    res.json(symptoms);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
