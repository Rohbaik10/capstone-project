const pool = require("../config/db");
const jwt = require("jsonwebtoken");

/* REGISTER */
const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
    } = req.body;

    const result =
      await pool.query(
        `
        INSERT INTO users
        (name, email, password, phone)
        
        VALUES ($1, $2, $3, $4)
        
        RETURNING *
        `,
        [
          name,
          email,
          password,
          phone,
        ]
      );

    res.status(201).json({
      message:
        "Register berhasil",
      user:
        result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error:
        "Register gagal",
    });
  }
};

/* LOGIN */
const login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const result =
      await pool.query(
        `
        SELECT * FROM users
        WHERE email = $1
        `,
        [email]
      );

    if (
      result.rows.length === 0
    ) {
      return res.status(404).json({
        error:
          "Email tidak ditemukan",
      });
    }

    const user =
      result.rows[0];

    if (
      user.password !== password
    ) {
      return res.status(401).json({
        error:
          "Password salah",
      });
    }

    res.json({
      message:
        "Login berhasil",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error:
        "Login gagal",
    });
  }
};

module.exports = {
  register,
  login,
};