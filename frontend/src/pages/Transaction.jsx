import { useState } from "react";
import api from "../services/api";

function Transaction({
  transactions,
  setTransactions,
}) {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  console.log(
    "USER LOGIN:",
    user
  );

  const [jumlah, setJumlah] =
    useState("");

  const [kategori, setKategori] =
    useState("");

  const [tipe, setTipe] =
    useState("Pemasukan");

  const [tanggal, setTanggal] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [filterTipe, setFilterTipe] =
    useState("Semua");

  const [filterKategori, setFilterKategori] =
    useState("Semua");

  const [periode, setPeriode] =
    useState("Bulan ini");

  const [showModal, setShowModal] =
    useState(false);

  /* =========================
     TAMBAH TRANSAKSI
  ========================= */
  async function handleSubmit(e) {

    e.preventDefault();

    if (
      !jumlah ||
      !kategori ||
      !tanggal
    ) {

      alert(
        "Semua field harus diisi!"
      );

      return;

    }

    try {

      const response =
        await api.post(
          "/transactions",
          {
            user_id:
              Number(user.id),

            deskripsi:
              kategori,

            jumlah:
              Number(jumlah),

            kategori,

            tipe,

            tanggal,
          }
        );

      setTransactions([
        response.data.transaction,
        ...transactions,
      ]);

      alert(
        "Transaksi berhasil ditambahkan"
      );

      setJumlah("");

      setKategori("");

      setTipe(
        "Pemasukan"
      );

      setTanggal("");

      setShowModal(false);

    } catch (error) {

      console.log(error);

      alert(
        "Gagal tambah transaksi"
      );

    }
  }

  /* =========================
     FORMAT RUPIAH
  ========================= */
  const formatRupiah = (
    angka
  ) => {

    return Number(
      angka
    ).toLocaleString(
      "id-ID"
    );

  };

  /* =========================
     FORMAT TANGGAL
  ========================= */
  const formatTanggal = (
    tgl
  ) => {

    const date =
      new Date(tgl);

    return date.toLocaleDateString(
      "id-ID",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  };

  /* =========================
     FILTER USER
  ========================= */
  const userTransactions =
    transactions.filter(
      (item) =>
        Number(item.user_id) ===
        Number(user.id)
    );

  /* =========================
     KATEGORI
  ========================= */
  const kategoriList = [
    "Semua",
    "Makan",
    "Transportasi",
    "Belanja",
    "Liburan",
    "Hiburan",
    "Kuliah",
  ];

  /* =========================
     FILTER DATA
  ========================= */
  const filteredData =
    userTransactions.filter(
      (item) => {

        const matchSearch =
          item.kategori
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchTipe =
          filterTipe ===
            "Semua" ||
          item.tipe ===
            filterTipe;

        const matchKategori =
          filterKategori ===
            "Semua" ||
          item.kategori ===
            filterKategori;

        return (
          matchSearch &&
          matchTipe &&
          matchKategori
        );

      }
    );

  return (
    <div
      style={{
        padding: "20px",
      }}
    >

      {/* HEADER */}
      <div style={header}>

        <div>

          <h1>
            Transaksi
          </h1>

          <p>
            Catat semua
            pemasukan dan
            pengeluaran
          </p>

        </div>

        <button
          style={addButton}
          onClick={() =>
            setShowModal(true)
          }
        >
          + Tambah
          Transaksi
        </button>

      </div>

      {/* FILTER */}
      <div style={topFilter}>

        <select
          value={periode}
          onChange={(e) =>
            setPeriode(
              e.target.value
            )
          }
          style={input}
        >

          <option>
            Minggu ini
          </option>

          <option>
            Bulan ini
          </option>

          <option>
            Tahun ini
          </option>

        </select>

        <select
          value={filterKategori}
          onChange={(e) =>
            setFilterKategori(
              e.target.value
            )
          }
          style={input}
        >

          {kategoriList.map(
            (k) => (

              <option key={k}>
                {k}
              </option>

            )
          )}

        </select>

        <input
          placeholder="Cari transaksi..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={input}
        />

      </div>

      {/* FILTER TIPE */}
      <div style={filterBar}>

        {[
          "Semua",
          "Pemasukan",
          "Pengeluaran",
        ].map((item) => (

          <button
            key={item}
            onClick={() =>
              setFilterTipe(item)
            }
            style={{
              ...filterButton,

              background:
                filterTipe === item
                  ? "#2563eb"
                  : "#eee",

              color:
                filterTipe === item
                  ? "white"
                  : "black",
            }}
          >
            {item}
          </button>

        ))}

      </div>

      {/* LIST */}
      <div
        style={{
          marginTop: "20px",
        }}
      >

        {filteredData.length === 0 ? (

          <div style={empty}>

            <p>
              Belum ada
              transaksi
            </p>

          </div>

        ) : (

          <ul style={list}>

            {filteredData.map(
              (item) => (

                <li
                  key={item.id}
                  style={listItem}
                >

                  <div>

                    <strong>
                      {item.kategori}
                    </strong>

                    <br />

                    <small>
                      {formatTanggal(
                        item.tanggal
                      )}
                    </small>

                  </div>

                  <div
                    style={{
                      color:
                        item.tipe ===
                        "Pemasukan"
                          ? "green"
                          : "red",

                      fontWeight:
                        "bold",
                    }}
                  >

                    {item.tipe ===
                    "Pengeluaran"
                      ? "-"
                      : "+"}

                    {" "}Rp{" "}

                    {formatRupiah(
                      item.jumlah
                    )}

                  </div>

                </li>

              )
            )}

          </ul>

        )}

      </div>

      {/* MODAL */}
      {showModal && (

        <div style={overlay}>

          <div style={modal}>

            <h2>
              Tambah
              Transaksi
            </h2>

            <form
              onSubmit={
                handleSubmit
              }
            >

              <input
                type="number"
                placeholder="Nominal"
                value={jumlah}
                onChange={(e) =>
                  setJumlah(
                    e.target.value
                  )
                }
                style={input}
              />

              <input
                type="text"
                placeholder="Kategori"
                value={kategori}
                onChange={(e) =>
                  setKategori(
                    e.target.value
                  )
                }
                style={input}
              />

              <select
                value={tipe}
                onChange={(e) =>
                  setTipe(
                    e.target.value
                  )
                }
                style={input}
              >

                <option>
                  Pemasukan
                </option>

                <option>
                  Pengeluaran
                </option>

              </select>

              <input
                type="date"
                value={tanggal}
                onChange={(e) =>
                  setTanggal(
                    e.target.value
                  )
                }
                style={input}
              />

              <button
                type="submit"
                style={save}
              >
                Simpan
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
                style={cancel}
              >
                Batal
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

/* =========================
   STYLE
========================= */

const header = {
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
};

const addButton = {
  padding: "10px 16px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const topFilter = {
  display: "flex",
  gap: "10px",
  marginTop: "20px",
};

const filterBar = {
  display: "flex",
  gap: "10px",
  marginTop: "15px",
};

const filterButton = {
  padding: "8px 14px",
  borderRadius: "20px",
  border: "none",
  cursor: "pointer",
};

const list = {
  listStyle: "none",
  padding: 0,
};

const listItem = {
  display: "flex",
  justifyContent:
    "space-between",
  background: "#fff",
  padding: "16px",
  borderRadius: "10px",
  marginBottom: "10px",
  boxShadow:
    "0 2px 6px rgba(0,0,0,0.05)",
};

const empty = {
  textAlign: "center",
  padding: "40px",
  background: "white",
  borderRadius: "12px",
};

const input = {
  padding: "10px",
  borderRadius: "8px",
  border:
    "1px solid #ddd",
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent:
    "center",
  alignItems: "center",
};

const modal = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  width: "300px",
};

const save = {
  width: "100%",
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  marginTop: "10px",
};

const cancel = {
  width: "100%",
  padding: "10px",
  background: "#ccc",
  border: "none",
  borderRadius: "8px",
  marginTop: "10px",
};

export default Transaction;