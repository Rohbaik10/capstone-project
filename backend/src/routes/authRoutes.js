const express = require("express");

const router = express.Router();

const {
  register,
  login,
  updateProfile,
} = require(
  "../controllers/authController"
);

/* REGISTER */
router.post(
  "/register",
  register
);

/* LOGIN */
router.post(
  "/login",
  login
);

/* UPDATE PROFILE */
router.put(
  "/profile/:id",
  updateProfile
);

module.exports = router;