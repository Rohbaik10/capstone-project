const express = require("express");

const router = express.Router();

const {
  createSavings,
  getSavings,
  updateSavings,
  getHistory,
} = require(
  "../controllers/savingsController"
);

/* =========================
   CREATE SAVING
========================= */
router.post(
  "/",
  createSavings
);

/* =========================
   GET SAVINGS
========================= */
router.get(
  "/:user_id",
  getSavings
);

/* =========================
   GET HISTORY
========================= */
router.get(
  "/history/:user_id",
  getHistory
);

/* =========================
   UPDATE SAVING
========================= */
router.put(
  "/:id",
  updateSavings
);

module.exports = router;