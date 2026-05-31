const user = JSON.parse(
  localStorage.getItem("user")
);

function Notification({ transactions }) {

  const userTransactions =
    transactions.filter(
      (item) =>
        Number(item.user_id) ===
        Number(user.id)
    );

  const totalPemasukan =
    userTransactions
      .filter(
        (item) =>
          item.tipe ===
          "Pemasukan"
      )
      .reduce(
        (total, item) =>
          total + item.jumlah,
        0
      );

  const totalPengeluaran =
    userTransactions
      .filter(
        (item) =>
          item.tipe ===
          "Pengeluaran"
      )
      .reduce(
        (total, item) =>
          total + item.jumlah,
        0
      );

  const isWarning =
    totalPengeluaran >
    totalPemasukan * 0.7;

  return (
    <div
      style={{
        padding: "24px",
      }}
    >
      <h1 style={title}>
        Notifikasi
      </h1>

      <p style={subtitle}>
        Semua
        notifikasi
        penting
        keuangan Anda
      </p>

      <div
        style={
          notifContainer
        }
      >
        {/* STATUS */}
        <div
          style={{
            ...notifCard,

            background:
              isWarning
                ? "#fef2f2"
                : "#ecfdf5",

            borderLeft:
              `5px solid ${
                isWarning
                  ? "#ef4444"
                  : "#22c55e"
              }`,
          }}
        >
          <div
            style={
              rowBetween
            }
          >
            <div>
              <h3>
                {isWarning
                  ? "⚠️ Peringatan Pengeluaran"
                  : "✅ Status Keuangan"}
              </h3>

              <p style={desc}>
                {isWarning
                  ? "Pengeluaran Anda sudah cukup tinggi. Sebaiknya mulai mengontrol pengeluaran."
                  : "Kondisi keuangan Anda masih aman. Tetap pertahankan pengelolaan yang baik."}
              </p>
            </div>

            <small
              style={time}
            >
              Sekarang
            </small>
          </div>
        </div>

        {/* PENGINGAT */}
        <div
          style={{
            ...notifCard,

            background:
              "#fffbeb",

            borderLeft:
              "5px solid #f59e0b",
          }}
        >
          <div
            style={
              rowBetween
            }
          >
            <div>
              <h3>
                💰
                Pengingat
              </h3>

              <p style={desc}>
                Jangan
                lupa
                sisihkan
                sebagian
                pemasukan
                untuk
                tabungan
                bulanan
                Anda.
              </p>
            </div>

            <small
              style={time}
            >
              Hari ini
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

/* STYLE */
const title = {
  fontSize: "34px",

  fontWeight:
    "700",
};

const subtitle = {
  color: "#64748b",

  marginBottom:
    "24px",
};

const notifContainer = {
  display: "flex",

  flexDirection:
    "column",

  gap: "18px",
};

const notifCard = {
  padding: "20px",

  borderRadius:
    "16px",

  boxShadow:
    "0 4px 10px rgba(0,0,0,0.05)",
};

const rowBetween = {
  display: "flex",

  justifyContent:
    "space-between",

  gap: "20px",
};

const desc = {
  marginTop: "6px",

  color: "#64748b",

  lineHeight:
    "1.5",
};

const time = {
  color: "#94a3b8",

  whiteSpace:
    "nowrap",
};

export default Notification;