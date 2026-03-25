const axios = require("axios");

exports.predictLocation = async (req, res) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/predict_location", {
      features: req.body.features,
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Prediction failed" });
  }
};

exports.predictSymptoms = async (req, res) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/predict_symptoms", {
      symptoms: req.body.symptoms,
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Prediction failed" });
  }
};
