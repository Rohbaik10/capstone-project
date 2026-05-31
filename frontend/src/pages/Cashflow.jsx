import SummaryCard from "../components/SummaryCard";
import CashflowChart from "../components/CashflowChart";
import SummaryBox from "../components/SummaryBox";
import InsightBox from "../components/InsightBox";

function Cashflow({ transactions = [] }) {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  console.log(
    "USER CASHFLOW:",
    user
  );

  const userTransactions =
    transactions.filter(
      (t) =>
        Number(t.user_id) ===
        Number(user?.id)
    );

  /* FORMAT */
  const formatRupiah = (a) =>
    Number(a).toLocaleString(
      "id-ID"
    );

  /* =========================
     TOTAL
  ========================= */
  const totalPemasukan =
    userTransactions
      .filter(
        (t) =>
          t.tipe ===
          "Pemasukan"
      )
      .reduce(
        (a, b) =>
          a +
          Number(b.jumlah),
        0
      );

  const totalPengeluaran =
    userTransactions
      .filter(
        (t) =>
          t.tipe ===
          "Pengeluaran"
      )
      .reduce(
        (a, b) =>
          a +
          Number(b.jumlah),
        0
      );

  const saldo =
    totalPemasukan -
    totalPengeluaran;

  /* =========================
     GROUP CHART
  ========================= */
  const grouped = {};

  userTransactions.forEach(
    (t) => {

      const d =
        new Date(
          t.tanggal
        );

      const start =
        new Date(d);

      start.setDate(
        d.getDate() -
          d.getDay()
      );

      const end =
        new Date(start);

      end.setDate(
        start.getDate() +
          6
      );

      const label =
        `${start.getDate()}-${end.getDate()} ${start.toLocaleDateString(
          "id-ID",
          {
            month:
              "short",
          }
        )}`;

      if (
        !grouped[label]
      ) {

        grouped[label] = {
          periode:
            label,

          pemasukan: 0,

          pengeluaran: 0,
        };

      }

      if (
        t.tipe ===
        "Pemasukan"
      ) {

        grouped[
          label
        ].pemasukan +=
          Number(
            t.jumlah
          );

      } else {

        grouped[
          label
        ].pengeluaran +=
          Number(
            t.jumlah
          );

      }
    }
  );

  const chartData =
    Object.values(
      grouped
    );

  /* =========================
     ANALISIS
  ========================= */
  const persen =
    totalPemasukan === 0
      ? 0
      : Math.round(
          (
            totalPengeluaran /
            totalPemasukan
          ) * 100
        );

  let text = "";

  let color =
    "#16a34a";

  let bg =
    "#ecfdf5";

  if (
    totalPemasukan === 0 &&
    totalPengeluaran === 0
  ) {

    text =
      "Belum ada transaksi. Mulai catat keuanganmu 🚀";

    color =
      "#2563eb";

    bg =
      "#eff6ff";

  }

  else if (
    saldo < 0
  ) {

    text =
      `Pengeluaran ${persen}% dari pemasukan. Kondisi keuangan belum sehat.`;

    color =
      "#dc2626";

    bg =
      "#fef2f2";

  }

  else if (
    persen >= 70
  ) {

    text =
      `Pengeluaran ${persen}% dari pemasukan. Perlu kontrol pengeluaran.`;

    color =
      "#f59e0b";

    bg =
      "#fffbeb";

  }

  else {

    text =
      `Pengeluaran ${persen}% dari pemasukan. Keuangan aman 👍`;

  }

  return (
    <div
      style={{
        padding:
          "20px",
      }}
    >

      <h1>
        Cashflow
      </h1>

      {/* SUMMARY */}
      <div
        style={{
          display:
            "flex",

          gap: "20px",

          marginBottom:
            "20px",

          flexWrap:
            "wrap",
        }}
      >

        <SummaryCard
          title="Pemasukan"
          value={
            totalPemasukan
          }
          color="#16a34a"
        />

        <SummaryCard
          title="Pengeluaran"
          value={
            totalPengeluaran
          }
          color="#dc2626"
        />

        <SummaryCard
          title="Saldo"
          value={saldo}
          color={
            saldo >= 0
              ? "#16a34a"
              : "#dc2626"
          }
        />

      </div>

      {/* MAIN */}
      <div
        style={{
          display:
            "flex",

          gap: "20px",

          flexWrap:
            "wrap",
        }}
      >

        <div
          style={{
            ...card,
            flex: 2,
          }}
        >

          <h3>
            Cashflow
          </h3>

          <CashflowChart
            data={
              chartData
            }
          />

        </div>

        <div
          style={{
            ...card,
            flex: 1,
          }}
        >

          <h3>
            Ringkasan
          </h3>

          <SummaryBox
            title="Pemasukan"
            value={
              totalPemasukan
            }
            color="#16a34a"
            bg="#ecfdf5"
            icon="📈"
          />

          <SummaryBox
            title="Pengeluaran"
            value={
              totalPengeluaran
            }
            color="#dc2626"
            bg="#fef2f2"
            icon="📉"
          />

          <SummaryBox
            title="Saldo"
            value={saldo}
            color="#2563eb"
            bg="#eff6ff"
            icon="💰"
          />

        </div>

      </div>

      {/* INSIGHT */}
      <div
        style={{
          marginTop:
            "20px",
        }}
      >

        <InsightBox
          text={text}
          color={color}
          bg={bg}
        />

      </div>

    </div>
  );
}

const card = {

  background:
    "white",

  padding:
    "20px",

  borderRadius:
    "14px",

  boxShadow:
    "0 4px 12px rgba(0,0,0,0.06)",
};

export default Cashflow;