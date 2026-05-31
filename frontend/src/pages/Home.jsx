import logo from "../assets/logo.png";

function Home({ setPage }) {
  const features = [
    {
      title: "💸 Catat Transaksi",
      desc: "Kelola pemasukan dan pengeluaran dengan lebih mudah.",
    },
    {
      title: "📊 Analisis Keuangan",
      desc: "Lihat grafik dan laporan kondisi keuangan Anda.",
    },
    {
      title: "🏦 Tabungan Terencana",
      desc: "Pisahkan target tabungan dan capai tujuan finansial.",
    },
    {
      title: "💡 Rekomendasi Pintar",
      desc: "Dapatkan saran berdasarkan kondisi keuangan Anda.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      {/* NAVBAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <img
            src={logo}
            alt="Smart Financial Assistant Logo"
            style={{
              width: "60px",
              height: "60px",
              objectFit: "contain",
            }}
          />

          <div>
            <h2
              style={{
                color: "#1e293b",
                fontSize: "24px",
                margin: 0,
                fontWeight: "700",
              }}
            >
              Smart Financial Assistant
            </h2>


          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
          }}
        >
          <button
            onClick={() => setPage("login")}
            style={buttonOutline}
          >
            Masuk
          </button>

          <button
            onClick={() => setPage("register")}
            style={buttonPrimary}
          >
            Daftar
          </button>
        </div>
      </div>

      {/* HERO */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        <div
          style={{
            maxWidth: "520px",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              marginBottom: "20px",
              color: "#0f172a",
              lineHeight: "1.2",
              fontWeight: "700",
            }}
          >
            Kelola Keuangan Anda
            <br />
            <span
              style={{
                color: "#2563eb",
              }}
            >
              Lebih Cerdas & Terencana
            </span>
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#475569",
              marginBottom: "32px",
              lineHeight: "1.7",
            }}
          >
            Smart Financial Assistant membantu Anda mencatat
            transaksi, menganalisis pengeluaran, mengelola
            tabungan, dan memberikan rekomendasi keuangan
            pintar.
          </p>

          <button
            onClick={() => setPage("login")}
            style={buttonPrimary}
          >
            Mulai Sekarang
          </button>
        </div>

        <div>
          <img
            src="/calender.png"
            alt="Finance Illustration"
            style={{
              borderRadius: "20px",
              width: "500px",
              maxWidth: "100%",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.08)",
            }}
          />
        </div>
      </div>

      {/* FEATURES */}
      <div
        style={{
          marginTop: "90px",
          display: "flex",
          justifyContent: "space-between",
          gap: "22px",
          flexWrap: "wrap",
        }}
      >
        {features.map((item, index) => (
          <div
            key={index}
            onClick={() => setPage("login")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 14px 28px rgba(0,0,0,0.10)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0px)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(0,0,0,0.05)";
            }}
            style={{
              flex: "1",
              minWidth: "220px",
              background: "white",
              padding: "28px",
              borderRadius: "18px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.05)",
              textAlign: "center",
              transition: "0.25s ease",
              cursor: "pointer",
            }}
          >
            <h3
              style={{
                marginBottom: "14px",
                color: "#0f172a",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.6",
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const buttonPrimary = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "14px 26px",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "600",
  transition: "0.2s",
};

const buttonOutline = {
  background: "white",
  color: "#2563eb",
  border: "1px solid #2563eb",
  padding: "14px 26px",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "600",
};

export default Home;