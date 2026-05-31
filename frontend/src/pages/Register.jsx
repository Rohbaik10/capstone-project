import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../services/api";

function Register({ setPage }) {

  const [nama, setNama] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirm, setConfirm] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [agree, setAgree] =
    useState(false);

  async function handleRegister(e) {

    e.preventDefault();

    if (
      !nama ||
      !email ||
      !password ||
      !confirm
    ) {

      alert(
        "Semua field wajib diisi!"
      );

      return;
    }

    if (
      password !== confirm
    ) {

      alert(
        "Password tidak sama!"
      );

      return;
    }

    if (!agree) {

      alert(
        "Harus setuju syarat & ketentuan!"
      );

      return;
    }

    try {

      const response =
        await api.post(
          "/auth/register",
          {
            name: nama,
            email,
            password,
            phone: "-",
          }
        );

      alert(
        response.data.message
      );

      /* HAPUS SESSION LAMA */
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      /* BALIK KE LOGIN */
      setPage("login");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data
          ?.error ||
          "Register gagal"
      );

    }
  }

  return (
    <div style={container}>

      <div style={card}>

        <h2>
          📊 Smart Financial Assistant
        </h2>

        <h1 style={title}>
          Buat Akun Baru
        </h1>

        <p style={subtitle}>
          Daftar untuk mulai
          mengelola keuangan Anda
        </p>

        <form
          onSubmit={
            handleRegister
          }
        >

          {/* NAMA */}
          <div style={inputGroup}>

            <label>
              Nama Lengkap
            </label>

            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              value={nama}
              onChange={(e) =>
                setNama(
                  e.target.value
                )
              }
              style={input}
            />

          </div>

          {/* EMAIL */}
          <div style={inputGroup}>

            <label>Email</label>

            <input
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              style={input}
            />

          </div>

          {/* PASSWORD */}
          <div style={inputGroup}>

            <label>
              Password
            </label>

            <div
              style={{
                position:
                  "relative",
              }}
            >

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Masukkan password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                style={input}
              />

              <span
                style={eye}
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >

                {showPassword ? (
                  <FaEye />
                ) : (
                  <FaEyeSlash />
                )}

              </span>

            </div>

          </div>

          {/* KONFIRMASI */}
          <div style={inputGroup}>

            <label>
              Konfirmasi Password
            </label>

            <div
              style={{
                position:
                  "relative",
              }}
            >

              <input
                type={
                  showConfirm
                    ? "text"
                    : "password"
                }
                placeholder="Ulangi password"
                value={confirm}
                onChange={(e) =>
                  setConfirm(
                    e.target.value
                  )
                }
                style={input}
              />

              <span
                style={eye}
                onClick={() =>
                  setShowConfirm(
                    !showConfirm
                  )
                }
              >

                {showConfirm ? (
                  <FaEye />
                ) : (
                  <FaEyeSlash />
                )}

              </span>

            </div>

          </div>

          {/* CHECKBOX */}
          <div
            style={checkboxRow}
          >

            <input
              type="checkbox"
              checked={agree}
              onChange={() =>
                setAgree(
                  !agree
                )
              }
            />

            <span
              style={{
                fontSize:
                  "14px",
              }}
            >
              Saya setuju dengan{" "}
              <span style={link}>
                Syarat &
                Ketentuan
              </span>{" "}
              dan{" "}
              <span style={link}>
                Kebijakan
                Privasi
              </span>
            </span>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            style={
              buttonPrimary
            }
          >
            Daftar
          </button>

        </form>

        {/* LOGIN LINK */}
        <p
          style={{
            marginTop: "20px",
          }}
        >

          Sudah punya akun?{" "}

          <span
            style={link}
            onClick={() =>
              setPage(
                "login"
              )
            }
          >
            Masuk di sini
          </span>

        </p>

      </div>

    </div>
  );
}

/* STYLE */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f1f5f9",
};

const card = {
  background: "white",
  padding: "40px",
  borderRadius: "16px",
  width: "400px",
  boxShadow:
    "0 10px 25px rgba(0,0,0,0.1)",
};

const title = {
  fontSize: "22px",
  marginTop: "10px",
};

const subtitle = {
  color: "#64748b",
  marginBottom: "20px",
};

const inputGroup = {
  marginBottom: "15px",
};

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const eye = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform:
    "translateY(-50%)",
  cursor: "pointer",
  fontSize: "18px",
  color: "#64748b",
};

const checkboxRow = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  marginBottom: "20px",
};

const buttonPrimary = {
  width: "100%",
  padding: "12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
};

const link = {
  color: "#2563eb",
  cursor: "pointer",
};

export default Register;