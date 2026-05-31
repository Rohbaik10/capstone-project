import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
} from "recharts";

function Analysis({ transactions }) {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  console.log(
    "USER ANALYSIS:",
    user
  );

  const userTransactions =
    transactions.filter(
      (item) =>
        Number(item.user_id) ===
        Number(user?.id)
    );

  console.log(
    "TRANSAKSI USER:",
    userTransactions
  );

  const formatRupiah = (angka) =>
    Number(
      angka || 0
    ).toLocaleString("id-ID");

  // ======================
  // FILTER PENGELUARAN
  // ======================
  const pengeluaran =
    userTransactions.filter(
      (item) =>
        item.tipe ===
        "Pengeluaran"
    );

  // ======================
  // TOTAL PENGELUARAN
  // ======================
  const totalPengeluaran =
    pengeluaran.reduce(
      (t, i) =>
        t + Number(i.jumlah),
      0
    );

  // ======================
  // EXPORT CSV
  // ======================
  const handleExportCSV =
    () => {

      if (
        pengeluaran.length ===
        0
      )
        return;

      const header = [
        "Tanggal",
        "Kategori",
        "Jumlah",
      ];

      const rows =
        pengeluaran.map(
          (item) => [
            item.tanggal,
            item.kategori,
            item.jumlah,
          ]
        );

      const csvContent = [
        header,
        ...rows,
      ]
        .map((row) =>
          row.join(",")
        )
        .join("\n");

      const blob =
        new Blob(
          [csvContent],
          {
            type:
              "text/csv;charset=utf-8;",
          }
        );

      const url =
        URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.setAttribute(
        "download",
        "laporan_pengeluaran.csv"
      );

      document.body.appendChild(
        link
      );

      link.click();

      document.body.removeChild(
        link
      );
    };

  // ======================
  // PIE DATA
  // ======================
  const categoryMap = {};

  pengeluaran.forEach(
    (item) => {

      categoryMap[
        item.kategori
      ] =
        (categoryMap[
          item.kategori
        ] || 0) +
        Number(item.jumlah);

    }
  );

  const pieData =
    Object.keys(
      categoryMap
    ).map((key) => ({
      name: key,
      value:
        categoryMap[key],
    }));

  const COLORS = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  // ======================
  // KATEGORI TERBESAR
  // ======================
  let kategoriTerbesar =
    "-";

  let jumlahTerbesar =
    0;

  pieData.forEach(
    (item) => {

      if (
        item.value >
        jumlahTerbesar
      ) {

        kategoriTerbesar =
          item.name;

        jumlahTerbesar =
          item.value;

      }
    }
  );

  // ======================
  // TREND
  // ======================
  const grouped = {};

  pengeluaran.forEach(
    (item) => {

      if (
        !grouped[
          item.tanggal
        ]
      ) {

        grouped[
          item.tanggal
        ] = {
          tanggal:
            item.tanggal,

          total: 0,
        };
      }

      grouped[
        item.tanggal
      ].total +=
        Number(item.jumlah);

    }
  );

  const chartData =
    Object.values(
      grouped
    ).sort(
      (a, b) =>
        new Date(
          a.tanggal
        ) -
        new Date(
          b.tanggal
        )
    );

  // ======================
  // RATA HARIAN
  // ======================
  const uniqueDates = [
    ...new Set(
      pengeluaran.map(
        (t) =>
          new Date(
            t.tanggal
          ).toDateString()
      )
    ),
  ];

  const totalHari =
    uniqueDates.length ||
    1;

  const rataHarian =
    totalPengeluaran ===
    0
      ? 0
      : Math.round(
          totalPengeluaran /
            totalHari
        );

  // ======================
  // INSIGHT
  // ======================
  const persenTerbesar =
    totalPengeluaran ===
    0
      ? 0
      : Math.round(
          (jumlahTerbesar /
            totalPengeluaran) *
            100
        );

  const insight =
    totalPengeluaran ===
    0
      ? "Belum ada data pengeluaran"
      : `Pengeluaran terbesar ada di ${kategoriTerbesar} (${persenTerbesar}%). Perlu dikontrol.`;

  return (
    <div
      style={{
        padding: "24px",
      }}
    >

      {/* HEADER */}
      <div style={header}>

        <div>

          <h1
            style={{
              fontSize:
                "26px",

              fontWeight:
                "700",
            }}
          >
            Analisis
          </h1>

          <p
            style={{
              color:
                "#64748b",
            }}
          >
            Analisa
            pengeluaran
            berdasarkan
            kategori
          </p>

        </div>

        <button
          style={
            exportBtn
          }
          onClick={
            handleExportCSV
          }
        >
          Export
        </button>

      </div>

      {/* TOP GRID */}
      <div style={grid2}>

        {/* PIE */}
        <div style={card}>

          <h3 style={title}>
            Pengeluaran
            per
            Kategori
          </h3>

          {pieData.length ===
          0 ? (

            <p style={empty}>
              Belum ada
              data
            </p>

          ) : (

            <div
              style={{
                display:
                  "flex",

                gap: "20px",
              }}
            >

              <ResponsiveContainer
                width={180}
                height={180}
              >

                <PieChart>

                  <Pie
                    data={
                      pieData
                    }
                    dataKey="value"
                    innerRadius={
                      55
                    }
                    outerRadius={
                      80
                    }
                  >

                    {pieData.map(
                      (
                        _,
                        i
                      ) => (

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

              </ResponsiveContainer>

              <div
                style={{
                  fontSize:
                    "13px",
                }}
              >

                {pieData.map(
                  (
                    item,
                    idx
                  ) => {

                    const persen =
                      Math.round(
                        (item.value /
                          totalPengeluaran) *
                          100
                      );

                    return (

                      <div
                        key={
                          idx
                        }
                        style={
                          legendItem
                        }
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
                          {
                            item.name
                          }{" "}
                          (
                          {
                            persen
                          }
                          %)
                        </span>

                      </div>

                    );
                  }
                )}

              </div>

            </div>

          )}

        </div>

        {/* TREND */}
        <div style={card}>

          <h3 style={title}>
            Tren
            Pengeluaran
          </h3>

          {chartData.length ===
          0 ? (

            <p style={empty}>
              Belum ada
              data
            </p>

          ) : (

            <ResponsiveContainer
              width="100%"
              height={200}
            >

              <AreaChart
                data={
                  chartData
                }
                margin={{
                  left: 20,
                  right: 20,
                }}
              >

                <defs>

                  <linearGradient
                    id="trend"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"
                      stopColor="#3b82f6"
                      stopOpacity={
                        0.3
                      }
                    />

                    <stop
                      offset="95%"
                      stopColor="#3b82f6"
                      stopOpacity={
                        0
                      }
                    />

                  </linearGradient>

                </defs>

                <CartesianGrid stroke="#eee" />

                <XAxis
                  dataKey="tanggal"
                  tickFormatter={(
                    d
                  ) =>
                    new Date(
                      d
                    ).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month:
                          "short",
                      }
                    )
                  }
                />

                <YAxis />

                <Tooltip
                  formatter={(
                    v
                  ) =>
                    `Rp ${Number(
                      v
                    ).toLocaleString(
                      "id-ID"
                    )}`
                  }
                />

                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#3b82f6"
                  fill="url(#trend)"
                  strokeWidth={
                    2.5
                  }
                />

              </AreaChart>

            </ResponsiveContainer>

          )}

        </div>

      </div>

      {/* BOTTOM */}
      <div style={grid3}>

        <div
          style={insightBox(
            "#3b82f6"
          )}
        >

          <h3 style={title}>
            Kategori
            Terbesar
          </h3>

          <p style={desc}>
            {
              kategoriTerbesar
            }
          </p>

          <h3>
            Rp{" "}
            {formatRupiah(
              jumlahTerbesar
            )}
          </h3>

        </div>

        <div
          style={insightBox(
            "#ef4444"
          )}
        >

          <h3 style={title}>
            Rata-rata
            Pengeluaran
            Harian
          </h3>

          <h3
            style={{
              color:
                "#ef4444",
            }}
          >
            Rp{" "}
            {formatRupiah(
              rataHarian
            )}
          </h3>

          <p style={desc}>
            Berdasarkan{" "}
            {
              totalHari
            }{" "}
            hari
          </p>

        </div>

        <div
          style={insightBox(
            "#3b82f6"
          )}
        >

          <h3 style={title}>
            Insight
          </h3>

          <p
            style={{
              fontSize:
                "13px",
            }}
          >
            {insight}
          </p>

        </div>

      </div>

    </div>
  );
}

/* STYLE */

const header = {
  display: "flex",
  justifyContent:
    "space-between",
  alignItems:
    "center",
  marginBottom:
    "16px",
};

const exportBtn = {
  padding: "8px 16px",
  borderRadius:
    "8px",
  border: "none",
  background:
    "#3b82f6",
  color: "white",
  cursor: "pointer",
};

const grid2 = {
  display: "grid",
  gridTemplateColumns:
    "1fr 1fr",
  gap: "20px",
};

const grid3 = {
  display: "grid",
  gridTemplateColumns:
    "1fr 1fr 1fr",
  gap: "20px",
  marginTop:
    "20px",
};

const card = {
  background:
    "white",
  padding: "18px",
  borderRadius:
    "14px",
  boxShadow:
    "0 4px 10px rgba(0,0,0,0.05)",
};

const insightBox = (
  color
) => ({
  background:
    "#f8fafc",
  padding: "18px",
  borderRadius:
    "14px",
  borderLeft:
    `5px solid ${color}`,
});

const title = {
  marginBottom:
    "10px",
  fontSize:
    "15px",
};

const desc = {
  fontSize:
    "13px",
  color:
    "#64748b",
};

const legendItem = {
  display: "flex",
  alignItems:
    "center",
  gap: "8px",
  marginBottom:
    "6px",
};

const dot = {
  width: "10px",
  height: "10px",
  borderRadius:
    "50%",
};

const empty = {
  textAlign:
    "center",
  color:
    "#94a3b8",
  marginTop:
    "40px",
};

export default Analysis;