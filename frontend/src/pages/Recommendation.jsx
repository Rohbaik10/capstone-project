function Recommendation({ transactions }) {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  /* FILTER USER */
  const userTransactions =
    transactions.filter(
      (item) =>
        Number(item.user_id) ===
        Number(user.id)
    );

  /* PEMASUKAN */
  const totalPemasukan =
    userTransactions
      .filter(
        (item) =>
          item.tipe ===
          "Pemasukan"
      )
      .reduce(
        (total, item) =>
          total +
          Number(item.jumlah),
        0
      );

  /* PENGELUARAN */
  const totalPengeluaran =
    userTransactions
      .filter(
        (item) =>
          item.tipe ===
          "Pengeluaran"
      )
      .reduce(
        (total, item) =>
          total +
          Number(item.jumlah),
        0
      );

  /* PERSENTASE */
  const persen =
    totalPemasukan === 0
      ? 0
      : Math.min(
          Math.round(
            (
              totalPengeluaran /
              totalPemasukan
            ) * 100
          ),
          100
        );

  /* DEFAULT */
  let title =
    "Kondisi Keuangan Stabil";

  let description =
    "Keuangan Anda masih dalam kondisi baik. Pertahankan pola pengeluaran saat ini.";

  let bg =
    "#ecfdf5";

  let border =
    "#22c55e";

  let icon =
    "💰";

  /* BELUM ADA DATA */
  if (
    userTransactions.length === 0
  ) {

    title =
      "Belum Ada Data";

    description =
      "Tambahkan transaksi terlebih dahulu untuk mendapatkan rekomendasi keuangan.";

    bg =
      "#eff6ff";

    border =
      "#2563eb";

    icon =
      "📊";

  }

  /* BOROS */
  else if (persen > 70) {

    title =
      "Kurangi Pengeluaran";

    description =
      "Pengeluaran Anda sudah cukup tinggi. Fokus mengurangi pengeluaran harian agar saldo tetap aman.";

    bg =
      "#fff7ed";

    border =
      "#f59e0b";

    icon =
      "⚠️";

  }

  return (

    <div
      style={{
        padding: "24px",
      }}
    >

      <h1
        style={
          titleStyle
        }
      >
        Rekomendasi
      </h1>

      <p style={subtitle}>
        Saran terbaik
        untuk kondisi
        keuangan Anda
      </p>

      <div
        style={{
          ...mainCard,
          background: bg,
          borderLeft:
            `6px solid ${border}`,
        }}
      >

        <div
          style={topFlex}
        >

          {/* ICON */}
          <div
            style={
              iconCircle
            }
          >
            <span
              style={{
                fontSize:
                  "28px",
              }}
            >
              {icon}
            </span>
          </div>

          {/* CONTENT */}
          <div
            style={{
              flex: 1,
            }}
          >

            <h2
              style={{
                color:
                  border,

                marginBottom:
                  "10px",
              }}
            >
              {title}
            </h2>

            <p style={desc}>
              {description}
            </p>

          </div>

        </div>

        {/* SUMMARY */}
        <div
          style={
            summaryGrid
          }
        >

          <div
            style={
              summaryCard
            }
          >

            <p
              style={
                summaryLabel
              }
            >
              Pemasukan
            </p>

            <h3
              style={{
                color:
                  "#16a34a",
              }}
            >
              Rp{" "}
              {totalPemasukan.toLocaleString(
                "id-ID"
              )}
            </h3>

          </div>

          <div
            style={
              summaryCard
            }
          >

            <p
              style={
                summaryLabel
              }
            >
              Pengeluaran
            </p>

            <h3
              style={{
                color:
                  "#dc2626",
              }}
            >
              Rp{" "}
              {totalPengeluaran.toLocaleString(
                "id-ID"
              )}
            </h3>

          </div>

          <div
            style={
              summaryCard
            }
          >

            <p
              style={
                summaryLabel
              }
            >
              Persentase
            </p>

            <h3>
              {persen}%
            </h3>

          </div>

        </div>

      </div>

    </div>

  );
}

/* STYLE */

const titleStyle = {
  fontSize: "34px",
  fontWeight:
    "700",
};

const subtitle = {
  color: "#64748b",
  marginBottom:
    "24px",
};

const mainCard = {
  padding: "18px",
  borderRadius:
    "18px",
  boxShadow:
    "0 4px 12px rgba(0,0,0,0.05)",
};

const topFlex = {
  display: "flex",
  gap: "18px",
  alignItems:
    "center",
};

const iconCircle = {
  width: "70px",
  height: "70px",
  borderRadius:
    "50%",
  background:
    "white",
  display: "flex",
  alignItems:
    "center",
  justifyContent:
    "center",
};

const desc = {
  color: "#64748b",
  lineHeight:
    "1.6",
};

const summaryGrid = {
  display: "grid",
  gridTemplateColumns:
    "1fr 1fr 1fr",
  gap: "14px",
  marginTop:
    "22px",
};

const summaryCard = {
  background:
    "white",
  padding: "16px",
  borderRadius:
    "14px",
};

const summaryLabel = {
  color: "#64748b",
  marginBottom:
    "8px",
  fontSize:
    "13px",
};

export default Recommendation;