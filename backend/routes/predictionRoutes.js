const express = require("express");
const router = express.Router();
const {
  predictLocation,
  predictSymptoms,
} = require("../controllers/predictionController");

router.post("/location", predictLocation);
router.post("/symptoms", predictSymptoms);

module.exports = router;
