const pool = require("../config/db");

/* =========================
   TAMBAH TABUNGAN
========================= */
const createSavings = async (req, res) => {
  try {
    const { user_id, target } = req.body;

    const result = await pool.query(
      `
      INSERT INTO savings
      (
        user_id,
        target,
        saldo
      )
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [
        user_id,
        target,
        0,
      ]
    );

    res.status(201).json({
      message: "Tabungan berhasil dibuat",
      saving: result.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Gagal membuat tabungan",
    });

  }
};

/* =========================
   GET SAVINGS
========================= */
const getSavings = async (req, res) => {
  try {

    const { user_id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM savings
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 1
      `,
      [user_id]
    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Gagal mengambil tabungan",
    });

  }
};

/* =========================
   GET HISTORY
========================= */
const getHistory = async (req, res) => {
  try {

    const { user_id } = req.params;

    const result = await pool.query(
      `
      SELECT sh.*
      FROM savings_history sh
      JOIN savings s
      ON sh.saving_id = s.id
      WHERE s.user_id = $1
      ORDER BY sh.id DESC
      `,
      [user_id]
    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Gagal mengambil history",
    });

  }
};

/* =========================
   UPDATE SAVINGS
========================= */
const updateSavings = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      tipe,
      jumlah,
      target,
    } = req.body;

    /* =========================
       UPDATE TARGET
    ========================= */
    if (target !== undefined) {

      const updatedTarget = await pool.query(
        `
        UPDATE savings
        SET target = $1
        WHERE id = $2
        RETURNING *
        `,
        [
          target,
          id,
        ]
      );

      return res.json({
        message: "Target berhasil diupdate",
        saving: updatedTarget.rows[0],
      });

    }

    /* =========================
       GET SAVING
    ========================= */
    const savingResult = await pool.query(
      `
      SELECT *
      FROM savings
      WHERE id = $1
      `,
      [id]
    );

    if (savingResult.rows.length === 0) {
      return res.status(404).json({
        error: "Tabungan tidak ditemukan",
      });
    }

    const saving = savingResult.rows[0];

    let saldoBaru = Number(saving.saldo);
    const nominal = Number(jumlah);

    /* =========================
       SETOR
    ========================= */
    if (tipe === "setor") {
      saldoBaru += nominal;
    }

    /* =========================
       TARIK
    ========================= */
    else if (tipe === "tarik") {

      if (nominal > saldoBaru) {
        return res.status(400).json({
          error: "Saldo tidak cukup",
        });
      }

      saldoBaru -= nominal;
    }

    else {
      return res.status(400).json({
        error: "Tipe transaksi tidak valid",
      });
    }

    /* =========================
       UPDATE SALDO
    ========================= */
    const updated = await pool.query(
      `
      UPDATE savings
      SET saldo = $1
      WHERE id = $2
      RETURNING *
      `,
      [
        saldoBaru,
        id,
      ]
    );

    /* =========================
       SAVE HISTORY
    ========================= */
    await pool.query(
      `
      INSERT INTO savings_history
      (
        saving_id,
        type,
        jumlah,
        tanggal
      )
      VALUES ($1, $2, $3, CURRENT_DATE)
      `,
      [
        Number(id),
        tipe,
        nominal,
      ]
    );

    res.json({
      message: "Saldo berhasil diupdate",
      saving: updated.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Gagal update saldo",
      detail: error.message,
    });

  }
};

module.exports = {
  createSavings,
  getSavings,
  getHistory,
  updateSavings,
};