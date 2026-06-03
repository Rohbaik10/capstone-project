// testing github
import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

function Savings() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  console.log(
    "USER SAVINGS:",
    user
  );

  const [savingData, setSavingData] =
    useState(null);

  const [history, setHistory] =
    useState([]);

  const [showAllHistory, setShowAllHistory] =
    useState(false);

  const [nominal, setNominal] =
    useState("");

  const [targetInput, setTargetInput] =
    useState("");

  /* =========================
     FORMAT RUPIAH
  ========================= */
  const formatRupiah = (angka) => {

    return Number(
      angka || 0
    ).toLocaleString("id-ID");

  };

  /* =========================
     FETCH SAVING
  ========================= */
  async function fetchSaving() {

    try {

      const response =
      await api.get(
  `/savings/${user.id}`
);
  
      if (
        response.data.length > 0
      ) {

        setSavingData(
          response.data[0]
        );

      } else {

        setSavingData(null);

      }

    } catch (error) {

      console.log(error);

    }
  }

  /* =========================
     FETCH HISTORY
  ========================= */
  async function fetchHistory() {

    try {

      const response =
       await api.get(
  `/savings/history/${user.id}`
);
      setHistory(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
  }

  useEffect(() => {

    if (user?.id) {

      fetchSaving();
      fetchHistory();

    }

  }, []);

  /* =========================
     PROGRESS
  ========================= */
  const progress =
    savingData
      ? Math.min(
          (
            savingData.saldo /
            savingData.target
          ) * 100,
          100
        )
      : 0;

  /* =========================
     SET TARGET
  ========================= */
  async function handleTarget() {

    try {

      if (!targetInput)
        return;

      /* BELUM ADA TARGET */
      if (!savingData) {

       await api.post(
  "/savings",
  {
    user_id: Number(user.id),
    target: Number(targetInput),
  }
);
      }

      /* UPDATE TARGET */
      else {

       await api.put(
  `/savings/${savingData.id}`,
  {
    target: Number(targetInput),
  }
);

      }

      setTargetInput("");

      fetchSaving();

    } catch (error) {

      console.log(error);

    }
  }

  /* =========================
     SETOR
  ========================= */
  async function handleSetor() {

    try {

      if (!savingData?.id) {

        alert(
          "Buat target tabungan dulu"
        );

        return;

      }

      if (!nominal)
        return;

     await api.put(
  `/savings/${savingData.id}`,
  {
    tipe: "setor",
    jumlah: Number(nominal),
  }
);

      setNominal("");

      fetchSaving();
      fetchHistory();

    } catch (error) {

      console.log(error);

    }
  }

  /* =========================
     TARIK
  ========================= */
  async function handleTarik() {

    try {

      if (!savingData?.id) {

        alert(
          "Buat target tabungan dulu"
        );

        return;

      }

      if (!nominal)
        return;

     await api.put(
  `/savings/${savingData.id}`,
  {
    tipe: "tarik",
    jumlah: Number(nominal),
  }
);
      setNominal("");

      fetchSaving();
      fetchHistory();

    } catch (error) {

      console.log(error);

      alert(
        "Saldo tidak cukup"
      );

    }
  }

  return (

    <div
      style={{
        padding: "30px",
      }}
    >

      <h1
        style={{
          fontSize: "48px",
          fontWeight: "bold",
        }}
      >
        Tabungan
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "30px",
        }}
      >
        Kelola tabungan dan capai tujuan Anda
      </p>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr 1fr",
          gap: "20px",
        }}
      >

        {/* CARD SALDO */}
        <div style={cardStyle}>

          <h2>
            Saldo Tabungan
          </h2>

          <h1
            style={{
              fontSize: "42px",
            }}
          >
            Rp{" "}
            {formatRupiah(
              savingData?.saldo
            )}
          </h1>

          <p
            style={{
              color: "#64748b",
            }}
          >
            Target:
            Rp{" "}
            {formatRupiah(
              savingData?.target
            )}
          </p>

          <p>
            {progress.toFixed(0)}
            %
          </p>

          {/* PROGRESS */}
          <div
            style={{
              width: "100%",
              height: "10px",
              background:
                "#e2e8f0",
              borderRadius:
                "10px",
              marginBottom:
                "20px",
            }}
          >

            <div
              style={{
                width:
                  `${progress}%`,
                height: "100%",
                background:
                  "#22c55e",
                borderRadius:
                  "10px",
              }}
            />

          </div>

          {/* INPUT */}
          <input
            type="number"
            placeholder="Masukkan nominal"
            value={nominal}
            onChange={(e) =>
              setNominal(
                e.target.value
              )
            }
            style={inputStyle}
          />

          {/* BUTTON */}
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >

            <button
              onClick={
                handleSetor
              }
              style={
                buttonBlue
              }
            >
              Setor
            </button>

            <button
              onClick={
                handleTarik
              }
              style={
                buttonRed
              }
            >
              Tarik
            </button>

          </div>
        </div>

        {/* TARGET */}
        <div style={cardStyle}>

          <h2>
            Target Tabungan
          </h2>

          <p
            style={{
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            Rp{" "}
            {formatRupiah(
              savingData?.target
            )}
          </p>

          <input
            type="number"
            placeholder="Masukkan target"
            value={targetInput}
            onChange={(e) =>
              setTargetInput(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <button
            onClick={
              handleTarget
            }
            style={
              buttonBlue
            }
          >
            {savingData
              ? "Update Target"
              : "Simpan Target"}
          </button>

        </div>

        {/* HISTORY */}
        <div style={cardStyle}>

          <h2>
            Riwayat
          </h2>

          {history.length ===
          0 ? (

            <p
              style={{
                color:
                  "#64748b",
              }}
            >
              Belum ada aktivitas
            </p>

          ) : (

            (showAllHistory
              ? history
              : history.slice(0, 3)
            ).map(
              (
                item,
                index
              ) => (

                <div
                  key={
                    index
                  }
                  style={{
                    marginTop:
                      "15px",
                    borderBottom:
                      "1px solid #eee",
                    paddingBottom:
                      "10px",
                  }}
                >

<strong
  style={{
    color:
      item.type === "setor"
        ? "#16a34a"
        : "#dc2626",
    fontSize: "14px",
  }}
>
  {item.type === "setor"
    ? "📈 SETOR"
    : "📉 TARIK"}
</strong>

<p
  style={{
    marginTop: "5px",
  }}
>
  Rp {formatRupiah(item.jumlah)}
</p>

                </div>

              )
            )

          )}

          {history.length > 3 && (

            <button
              onClick={() =>
                setShowAllHistory(
                  !showAllHistory
                )
              }
              style={{
                marginTop: "15px",
                background: "none",
                border: "none",
                color: "#2563eb",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {showAllHistory
                ? "Tampilkan Sedikit"
                : "Lihat Lainnya"}
            </button>

          )}

        </div>

      </div>

      {/* INSIGHT */}
      <div
        style={{
          marginTop: "30px",
          background:
            "#f8fafc",
          padding: "20px",
          borderLeft:
            "5px solid #3b82f6",
          borderRadius:
            "10px",
        }}
      >

        <h2>
          Insight
        </h2>

        <p>
          Menabung rutin
          membantu mencapai
          target lebih cepat.
        </p>

      </div>

    </div>
  );
}

/* =========================
   STYLE
========================= */
const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "20px",
  boxShadow:
    "0 2px 10px rgba(0,0,0,0.05)",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  marginBottom: "15px",
  borderRadius: "10px",
  border:
    "1px solid #d1d5db",
};

const buttonBlue = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding:
    "12px 20px",
  borderRadius:
    "10px",
  cursor: "pointer",
};

const buttonRed = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding:
    "12px 20px",
  borderRadius:
    "10px",
  cursor: "pointer",
};

export default Savings;