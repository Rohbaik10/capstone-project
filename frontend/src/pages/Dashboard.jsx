import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";

import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [transactions, setTransactions] =
    useState([]);

  const [dashboard, setDashboard] =
    useState({
      totalPemasukan: 0,
      totalPengeluaran: 0,
      saldo: 0,
      totalTabungan: 0,
    });

  /* GET DATA */
  useEffect(() => {
    fetchDashboard();
    fetchTransactions();
  }, []);

  async function fetchDashboard() {

    try {

      const response =
        await api.get(
          `/dashboard/${user.id}`
        );

      setDashboard(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
  }

  async function fetchTransactions() {

    try {

      const response =
        await api.get(
          `/transactions/${user.id}`
        );

      setTransactions(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
  }

  const formatRupiah = (
    angka
  ) =>
    Number(
      angka || 0
    ).toLocaleString(
      "id-ID"
    );

  /* DASHBOARD */
  const totalPemasukan =
    dashboard.totalPemasukan;

  const totalPengeluaran =
    dashboard.totalPengeluaran;

  const saldo =
    dashboard.saldo;

  const totalTabungan =
    dashboard.totalTabungan;

  /* CASHFLOW */
  const grouped = {};

  transactions.forEach((t) => {

    const date =
      t.tanggal;

    if (!grouped[date]) {

      grouped[date] = {
        date,
        pemasukan: 0,
        pengeluaran: 0,
      };

    }

    if (
      t.tipe ===
      "Pemasukan"
    ) {

      grouped[
        date
      ].pemasukan +=
        Number(
          t.jumlah
        );

    } else {

      grouped[
        date
      ].pengeluaran +=
        Number(
          t.jumlah
        );

    }
  });

  const chartData =
    Object.values(
      grouped
    );

  /* PIE */
  const categoryMap = {};

  transactions.forEach((t) => {

    if (
      t.tipe ===
      "Pengeluaran"
    ) {

      categoryMap[
        t.kategori
      ] =
        (categoryMap[
          t.kategori
        ] || 0) +
        Number(
          t.jumlah
        );
    }
  });

  const pieData =
    Object.keys(
      categoryMap
    ).map((k) => ({
      name: k,
      value:
        categoryMap[k],
    }));

  const COLORS = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  /* LOGIC */
  const persen =
    totalPemasukan ===
    0
      ? 0
      : Math.min(
          Math.round(
            (totalPengeluaran /
              totalPemasukan) *
              100
          ),
          100
        );

  const showWarning =
    persen > 70;

  const showRecommendation =
    persen > 50;

  return (
    <div
      style={{
        padding: "25px",
      }}
    >
      <h1 style={title}>
        Dashboard
      </h1>

      <p style={subtitle}>
        Ringkasan
        keuangan Anda
        hari ini
      </p>

      {/* CARD */}
      <div style={cardGrid}>

        <Card
          title="Saldo Utama"
          value={saldo}
          color="#3b82f6"
        />

        <Card
          title="Total Pemasukan"
          value={totalPemasukan}
          color="#22c55e"
        />

        <Card
          title="Total Pengeluaran"
          value={
            totalPengeluaran
          }
          color="#ef4444"
          type="pengeluaran"
          persen={persen}
        />

        <Card
          title="Saldo Tabungan"
          value={totalTabungan}
          color="#6366f1"
        />

      </div>

      {/* CHART */}
      <div style={grid2}>

        {/* CASHFLOW */}
        <div style={box}>

          <div style={header}>

            <h3>
              Cashflow
            </h3>

            <select
              style={select}
            >
              <option>
                Mingguan
              </option>
            </select>

          </div>

          {chartData.length ===
          0 ? (

            <p style={empty}>
              Belum ada
              data transaksi
            </p>

          ) : (

            <ResponsiveContainer
              width="100%"
              height={260}
            >

              <AreaChart
                data={chartData}
              >

                <defs>

                  <linearGradient
                    id="in"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"
                      stopColor="#22c55e"
                      stopOpacity={0.3}
                    />

                    <stop
                      offset="95%"
                      stopColor="#22c55e"
                      stopOpacity={0}
                    />

                  </linearGradient>

                  <linearGradient
                    id="out"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"
                      stopColor="#ef4444"
                      stopOpacity={0.3}
                    />

                    <stop
                      offset="95%"
                      stopColor="#ef4444"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <CartesianGrid stroke="#f1f5f9" />

                <XAxis
                  dataKey="date"
                  tickFormatter={(d) =>
                    new Date(
                      d
                    ).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "short",
                      }
                    )
                  }
                />

                <YAxis
                  tickFormatter={(v) =>
                    v === 0
                      ? "Rp 0"
                      : `Rp ${Math.round(
                          v / 1000000
                        )}jt`
                  }
                />

                <Tooltip
                  formatter={(v) =>
                    `Rp ${v.toLocaleString(
                      "id-ID"
                    )}`
                  }
                />

                <Area
                  type="monotone"
                  dataKey="pemasukan"
                  stroke="#22c55e"
                  fill="url(#in)"
                  strokeWidth={3}
                />

                <Area
                  type="monotone"
                  dataKey="pengeluaran"
                  stroke="#ef4444"
                  fill="url(#out)"
                  strokeWidth={3}
                />

              </AreaChart>

            </ResponsiveContainer>

          )}

        </div>

        {/* PIE */}
        <div style={box}>

          <h3>
            Pengeluaran
            per Kategori
          </h3>

          {pieData.length ===
          0 ? (

            <p style={empty}>
              Belum ada
              data kategori
            </p>

          ) : (

            <div
              style={{
                display: "flex",
                gap: "20px",
              }}
            >

              <PieChart
                width={200}
                height={200}
              >

                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={90}
                >

                  {pieData.map(
                    (_, i) => (

                      <Cell
                        key={i}
                        fill={
                          COLORS[
                            i %
                              COLORS.length
                          ]
                        }
                      />

                    )
                  )}

                  <Label
                    value={`Rp ${formatRupiah(
                      totalPengeluaran
                    )}`}
                    position="center"
                  />

                </Pie>

              </PieChart>

              <div
                style={legendBox}
              >

                {pieData.map(
                  (i, idx) => (

                    <div
                      key={idx}
                      style={legendItem}
                    >

                      <div
                        style={{
                          ...dot,
                          background:
                            COLORS[
                              idx %
                                COLORS.length
                            ],
                        }}
                      />

                      <span>
                        {i.name}
                        {" - Rp "}
                        {formatRupiah(
                          i.value
                        )}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

          )}

        </div>

      </div>

      {/* INFO */}
      <div style={grid2}>

        {showWarning && (

          <div style={warning}>

            <div style={topFlex}>

              <div>

                <h3>
                  ⚠️
                  Peringatan
                  Pengeluaran
                </h3>

                <p style={desc}>
                  Pengeluaran
                  Anda sudah
                  mencapai
                  {" "}
                  {persen}%
                  {" "}
                  dari pemasukan.
                </p>

              </div>

            </div>

          </div>

        )}

        {showRecommendation && (

          <div style={info}>

            <div style={topFlex}>

              <div>

                <h3>
                  💡
                  Rekomendasi
                  Hari Ini
                </h3>

                <p style={desc}>
                  Kurangi
                  pengeluaran
                  kategori terbesar
                  agar saldo tetap
                  stabil.
                </p>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

function Card({
  title,
  value,
  color,
  type,
  persen,
}) {

  return (
    <div
      style={{
        ...card,
        borderTop:
          `4px solid ${color}`,
      }}
    >

      <p>{title}</p>

      <h2>
        Rp{" "}
        {Number(
          value || 0
        ).toLocaleString(
          "id-ID"
        )}
      </h2>

      {type ===
        "pengeluaran" && (

        <p
          style={{
            color:
              persen > 70
                ? "#ef4444"
                : "#22c55e",

            fontWeight:
              "600",
          }}
        >
          ▲ {persen}%
        </p>

      )}

    </div>
  );
}

/* STYLE */
const title = {
  fontSize: 28,
  fontWeight: "700",
};

const subtitle = {
  color: "#64748b",
  marginBottom: 20,
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(4, 1fr)",
  gap: "20px",
};

const grid2 = {
  display: "grid",
  gridTemplateColumns:
    "1fr 1fr",
  gap: "20px",
  marginTop: "25px",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "14px",
  boxShadow:
    "0 4px 10px rgba(0,0,0,0.05)",
};

const box = {
  background: "white",
  padding: "20px",
  borderRadius: "14px",
  boxShadow:
    "0 4px 10px rgba(0,0,0,0.05)",
};

const header = {
  display: "flex",
  justifyContent:
    "space-between",
  marginBottom: "10px",
};

const select = {
  padding: "5px",
  borderRadius: "6px",
};

const empty = {
  color: "#94a3b8",
  textAlign: "center",
  marginTop: "60px",
};

const warning = {
  background: "#fee2e2",
  padding: "18px",
  borderRadius: "14px",
  borderLeft:
    "5px solid #ef4444",
};

const info = {
  background: "#eff6ff",
  padding: "18px",
  borderRadius: "14px",
  borderLeft:
    "5px solid #2563eb",
};

const topFlex = {
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
  gap: "16px",
};

const desc = {
  marginTop: "6px",
  color: "#64748b",
};

const legendBox = {
  display: "flex",
  flexDirection:
    "column",
  gap: "8px",
};

const legendItem = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const dot = {
  width: "10px",
  height: "10px",
  borderRadius: "50%",
};

export default Dashboard;