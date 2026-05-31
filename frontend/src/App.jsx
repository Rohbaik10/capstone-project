import {
  useEffect,
  useState,
} from "react";

import api from "./services/api";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Cashflow from "./pages/Cashflow";
import Analysis from "./pages/Analysis";
import Savings from "./pages/Savings";
import Notification from "./pages/Notification";
import Recommendation from "./pages/Recommendation";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import logo from "./assets/logo.png";

function App() {

  /* =========================
     USER STATE
  ========================= */
  const savedUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [user, setUser] =
    useState(savedUser || {});

  /* =========================
     TRANSACTION STATE
  ========================= */
  const [transactions, setTransactions] =
    useState([]);

  /* =========================
     SAVINGS STATE
  ========================= */
  const [savings, setSavings] =
    useState(0);

  /* =========================
     PAGE STATE
  ========================= */
  const [page, setPage] =
    useState("home");

  /* =========================
     LOAD TRANSACTIONS
  ========================= */
  useEffect(() => {

    async function fetchTransactions() {

      try {

        if (!user?.id) return;

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

    fetchTransactions();

  }, [user]);

  /* =========================
     SIDEBAR STYLE
  ========================= */
  const menuStyle = (menuName) => ({
    cursor: "pointer",
    marginBottom: "12px",
    padding: "12px 16px",
    borderRadius: "12px",
    background:
      page === menuName
        ? "rgba(255,255,255,0.18)"
        : "transparent",
    transition: "0.2s",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "500",
  });

  /* =========================
     PUBLIC PAGE
  ========================= */
  if (page === "home") {

    return (
      <Home setPage={setPage} />
    );

  }

  if (page === "login") {

    return (

      <Login
        setPage={setPage}
        setUser={setUser}
      />

    );

  }

  if (page === "register") {

    return (

      <Register
        setPage={setPage}
        setUser={setUser}
      />

    );

  }

  return (

    <div
      style={{
        display: "flex",
      }}
    >

      {/* SIDEBAR */}
      <div
        style={{
          width: "270px",
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, #2563eb, #1e3a8a)",
          color: "white",
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >

        {/* TOP */}
        <div>

          {/* LOGO */}
          <div style={logoBox}>
  <img
    src={logo}
    alt="Smart Financial Assistant"
    style={{
      width: "64px",
      height: "64px",
      objectFit: "contain",
      borderRadius: "16px",
    }}
  />

  <div>
    <h1 style={logoTitle}>
      Smart Finance
    </h1>

    <p style={logoSub}>
      Assistant
    </p>
  </div>
</div>

          {/* MENU */}
          <div
            style={{
              marginTop: "40px",
            }}
          >

            <div
              style={menuStyle(
                "dashboard"
              )}
              onClick={() =>
                setPage(
                  "dashboard"
                )
              }
            >
              🏠 Dashboard
            </div>

            <div
              style={menuStyle(
                "transaction"
              )}
              onClick={() =>
                setPage(
                  "transaction"
                )
              }
            >
              💸 Transaksi
            </div>

            <div
              style={menuStyle(
                "cashflow"
              )}
              onClick={() =>
                setPage(
                  "cashflow"
                )
              }
            >
              📈 Cashflow
            </div>

            <div
              style={menuStyle(
                "analysis"
              )}
              onClick={() =>
                setPage(
                  "analysis"
                )
              }
            >
              📊 Analisis
            </div>

            <div
              style={menuStyle(
                "savings"
              )}
              onClick={() =>
                setPage(
                  "savings"
                )
              }
            >
              🏦 Tabungan
            </div>

            <div
              style={menuStyle(
                "notification"
              )}
              onClick={() =>
                setPage(
                  "notification"
                )
              }
            >
              🔔 Notifikasi
            </div>

            <div
              style={menuStyle(
                "recommendation"
              )}
              onClick={() =>
                setPage(
                  "recommendation"
                )
              }
            >
              💡 Rekomendasi
            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div>

          {/* PROFILE */}
          <div style={profileBox}>

            <div style={avatar}>

              {user?.photo ? (

                <img
                  src={user.photo}
                  alt="profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius:
                      "50%",
                    objectFit:
                      "cover",
                  }}
                />

              ) : (

                user?.name
                  ?.charAt(0)
                  ?.toUpperCase()

              )}

            </div>

            <div>

              <h4 style={profileName}>
                {user?.name}
              </h4>

              <p style={profileRole}>
                {user?.email}
              </p>

            </div>

          </div>

          {/* SETTINGS */}
          <button
            style={settingBtn}
            onClick={() =>
              setPage(
                "settings"
              )
            }
          >
            ⚙ Pengaturan
          </button>

          {/* LOGOUT */}
          <button
            style={logoutBtn}
            onClick={() => {

              localStorage.removeItem(
                "token"
              );

              localStorage.removeItem(
                "user"
              );

              setUser({});

              setTransactions([]);

              setPage("home");

            }}
          >
            🚪 Logout
          </button>

        </div>

      </div>

      {/* CONTENT */}
      <div
        style={{
          flex: 1,
          padding: "20px",
        }}
      >

        {page ===
          "dashboard" && (
          <Dashboard
            transactions={
              transactions
            }
            savings={savings}
          />
        )}

        {page ===
          "transaction" && (
          <Transaction
            transactions={
              transactions
            }
            setTransactions={
              setTransactions
            }
          />
        )}

        {page ===
          "cashflow" && (
          <Cashflow
            transactions={
              transactions
            }
          />
        )}

        {page ===
          "analysis" && (
          <Analysis
            transactions={
              transactions
            }
          />
        )}

        {page ===
          "savings" && (
          <Savings
            savings={savings}
            setSavings={
              setSavings
            }
          />
        )}

        {page ===
          "notification" && (
          <Notification
            transactions={
              transactions
            }
          />
        )}

        {page ===
          "recommendation" && (
          <Recommendation
            transactions={
              transactions
            }
          />
        )}

        {page ===
          "settings" && (
          <Settings
            setPage={setPage}
            user={user}
            setUser={setUser}
          />
        )}

      </div>

    </div>

  );
}

/* STYLE */

const logoBox = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  marginBottom: "10px",
};


const logoTitle = {
  margin: 0,
  fontSize: "24px",
  fontWeight: "800",
  lineHeight: "1.1",
};

const logoSub = {
  margin: 0,
  opacity: 0.9,
  fontSize: "15px",
  marginTop: "2px",
};

const profileBox = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "18px",
};

const avatar = {
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  background: "white",
  color: "#2563eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "700",
  fontSize: "18px",
  overflow: "hidden",
};

const profileName = {
  margin: 0,
};

const profileRole = {
  margin: 0,
  opacity: 0.7,
  fontSize: "13px",
};

const settingBtn = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background:
    "rgba(255,255,255,0.15)",
  color: "white",
  cursor: "pointer",
  marginBottom: "10px",
};

const logoutBtn = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "#ef4444",
  color: "white",
  cursor: "pointer",
};

export default App;