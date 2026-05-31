const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const transactionRoutes = require(
  "./routes/transactionRoutes"
);

const authRoutes = require(
  "./routes/authRoutes"
);

const savingsRoutes = require(
  "./routes/savingsRoutes"
);

const dashboardRoutes = require(
  "./routes/dashboardRoutes"
);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(
  "/api/transactions",
  transactionRoutes
);

app.use(
  "/api/savings",
  savingsRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.get("/", async (req, res) => {
  try {
    const result =
      await pool.query(
        "SELECT NOW()"
      );

    res.json({
      message:
        "Database connected ",
      time:
        result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error:
        "Database error",
    });
  }
});

module.exports = app;