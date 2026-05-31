const express = require("express");

const router = express.Router();

const {
  createTransaction,
  getTransactions,
} = require(
  "../controllers/transactionController"
);

router.post(
  "/",
  createTransaction
);

router.get(
  "/:user_id",
  getTransactions
);

module.exports = router;