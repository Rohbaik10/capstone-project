import SummaryCard from "../components/SummaryCard";
import CashflowChart from "../components/CashflowChart";
import SummaryBox from "../components/SummaryBox";
import InsightBox from "../components/InsightBox";

function Dashboard({ transactions }) {
  const formatRupiah = (a) => a.toLocaleString("id-ID");

  const totalPemasukan = transactions
    .filter((t) => t.tipe === "Pemasukan")
    .reduce((a, b) => a + b.jumlah, 0);

  const totalPengeluaran = transactions
    .filter((t) => t.tipe === "Pengeluaran")
    .reduce((a, b) => a + b.jumlah, 0);

  const saldo = totalPemasukan - totalPengeluaran;

  
  const chartData = [
    {
      periode: "Total",
      pemasukan: totalPemasukan,
      pengeluaran: totalPengeluaran,
    },
  ];

  const persen =
    totalPemasukan === 0
      ? 0
      : Math.round((totalPengeluaran / totalPemasukan) * 100);

  let text = "",
    color = "#16a34a",
    bg = "#ecfdf5";

  if (saldo < 0) {
    text = `Pengeluaran ${persen}%. Tidak sehat`;
    color = "#dc2626";
    bg = "#fef2f2";
  } else if (persen > 70) {
    text = `Pengeluaran ${persen}%. Perlu kontrol`;
    color = "#f59e0b";
    bg = "#fffbeb";
  } else {
    text = `Keuangan aman 👍`;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      {/* SUMMARY */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <SummaryCard
          title="Pemasukan"
          value={totalPemasukan}
          color="#16a34a"
        />
        <SummaryCard
          title="Pengeluaran"
          value={totalPengeluaran}
          color="#dc2626"
        />
        <SummaryCard
          title="Saldo"
          value={saldo}
          color={saldo >= 0 ? "#16a34a" : "#dc2626"}
        />
      </div>

      {/* CHART + SIDE */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ ...card, flex: 2 }}>
          <h3>Ringkasan Keuangan</h3>
          <CashflowChart data={chartData} />
        </div>

        <div style={{ ...card, flex: 1 }}>
          <h3>Detail</h3>

          <SummaryBox
            title="Pemasukan"
            value={totalPemasukan}
            color="#16a34a"
            bg="#ecfdf5"
            icon="📈"
          />

          <SummaryBox
            title="Pengeluaran"
            value={totalPengeluaran}
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
      <div style={{ marginTop: "20px" }}>
        <InsightBox text={text} color={color} bg={bg} />
      </div>
    </div>
  );
}

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "14px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
};

export default Dashboard;