const pool = require("../config/db");

const getDashboard =
  async (req, res) => {

    try {

      const { user_id } =
        req.params;

      /* PEMASUKAN */
      const pemasukan =
        await pool.query(
          `
        SELECT COALESCE(
          SUM(jumlah), 0
        ) AS total

        FROM transactions

        WHERE tipe = 'Pemasukan'

        AND user_id = $1
        `,
        [user_id]
        );

      /* PENGELUARAN */
      const pengeluaran =
        await pool.query(
          `
        SELECT COALESCE(
          SUM(jumlah), 0
        ) AS total

        FROM transactions

        WHERE tipe = 'Pengeluaran'

        AND user_id = $1
        `,
        [user_id]
        );

      /* TABUNGAN */
      const tabungan =
        await pool.query(
          `
        SELECT COALESCE(
          SUM(saldo), 0
        ) AS total

        FROM savings

        WHERE user_id = $1
        `,
        [user_id]
        );

      const totalPemasukan =
        Number(
          pemasukan.rows[0]
            .total
        );

      const totalPengeluaran =
        Number(
          pengeluaran.rows[0]
            .total
        );

      const totalTabungan =
        Number(
          tabungan.rows[0]
            .total
        );

      const saldo =
        totalPemasukan -
        totalPengeluaran;

      res.json({
        totalPemasukan,
        totalPengeluaran,
        saldo,
        totalTabungan,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error:
          "Gagal mengambil dashboard",
      });

    }
  };

module.exports = {
  getDashboard,
};