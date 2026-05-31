const pool = require("../config/db");
const predictCategory = require("../services/aiService");

/* TAMBAH TRANSAKSI */
const createTransaction = async (req, res) => {

  try {

    console.log("REQ BODY:", req.body);

    const {
      user_id,
      deskripsi,
      jumlah,
      tipe,
      tanggal,
    } = req.body;

    console.log("SEBELUM AI");

    // AI PREDICT
    const kategori =
      await predictCategory(deskripsi);

    console.log("HASIL AI:", kategori);

    // SIMPAN KE DATABASE
    const result =
      await pool.query(
        `
        INSERT INTO transactions
        (
          user_id,
          deskripsi,
          jumlah,
          kategori,
          tipe,
          tanggal
        )

        VALUES ($1, $2, $3, $4, $5, $6)

        RETURNING *
        `,
        [
          user_id,
          deskripsi,
          jumlah,
          kategori,
          tipe,
          tanggal,
        ]
      );

    console.log("MASUK DB");

    res.status(201).json({
      message:
        "Transaksi berhasil ditambahkan",

      transaction:
        result.rows[0],
    });

  } catch (error) {

    console.log("ERROR BESAR:");
    console.log(error);

    res.status(500).json({
      error:
        "Gagal tambah transaksi",
    });

  }
};

/* GET TRANSAKSI */
const getTransactions =
async (req, res) => {

  try {

    const { user_id } =
      req.params;

    const result =
    await pool.query(
    `
    SELECT *
    FROM transactions

    WHERE user_id = $1

    ORDER BY id DESC
    `,
    [user_id]
  );

    res.json(
      result.rows
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error:
        "Gagal mengambil transaksi",
    });

  }
};

module.exports = {
  createTransaction,
  getTransactions,
};