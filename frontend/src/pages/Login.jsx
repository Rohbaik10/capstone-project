import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import api from "../services/api";

function Login({
  setPage,
  setUser,
}) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  async function handleLogin(e) {

    e.preventDefault();

    if (!email || !password) {

      alert(
        "Isi email dan password!"
      );

      return;

    }

    try {

      const response =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

        console.log("FULL RESPONSE:");
console.log(response.data);

console.log("TOKEN:");
console.log(response.data.token);

      console.log(
        "USER LOGIN:",
        response.data.user
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

/* SIMPAN TOKEN JWT */
localStorage.setItem(
  "token",
  response.data.token
);

/* SIMPAN USER */
localStorage.setItem(
  "user",
  JSON.stringify(
    response.data.user
  )
);

/* UPDATE STATE REACT */
setUser(
  response.data.user
);

/* PINDAH HALAMAN */
setPage(
  "dashboard"
);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data
          ?.error ||
          "Login gagal"
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
          Selamat Datang Kembali!
        </h1>

        <p style={subtitle}>
          Masuk ke akun Anda untuk
          melanjutkan
        </p>

        <form onSubmit={handleLogin}>

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

            <label>Password</label>

            <div
              style={{
                position: "relative",
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
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                style={eyeIcon}
              >

                {showPassword ? (
                  <FaEye />
                ) : (
                  <FaEyeSlash />
                )}

              </span>

            </div>

          </div>

          {/* LOGIN */}
          <button
            type="submit"
            style={buttonPrimary}
          >
            Masuk
          </button>

        </form>

        {/* REGISTER */}
        <p
          style={{
            marginTop: "20px",
          }}
        >

          Belum punya akun?{" "}

          <span
            style={link}
            onClick={() =>
              setPage(
                "register"
              )
            }
          >
            Daftar sekarang
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
  width: "380px",
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

const eyeIcon = {
  position: "absolute",
  right: "10px",
  top: "10px",
  cursor: "pointer",
};

const buttonPrimary = {
  width: "100%",
  padding: "12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const link = {
  color: "#2563eb",
  cursor: "pointer",
};

export default Login;