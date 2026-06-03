import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

function Settings({
  setPage,
  user,
  setUser,
}) {

  const [nama, setNama] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [foto, setFoto] =
    useState("");

  /* =========================
     LOAD USER
  ========================= */
  useEffect(() => {

    setNama(
      user?.name || ""
    );

    setEmail(
      user?.email || ""
    );

    setPhone(
      user?.phone || ""
    );

    setFoto(
      user?.photo || ""
    );

  }, [user]);

  /* =========================
     SAVE PROFILE
  ========================= */
 async function handleSave() {

  try {

    const response =
      await api.put(
        `/auth/profile/${user.id}`,
        {
          name: nama,
          email: email,
          phone: phone,
        }
      );

    const updatedUser =
      response.data.user;

    localStorage.setItem(
      "user",
      JSON.stringify(
        updatedUser
      )
    );

    setUser(
      updatedUser
    );

    alert(
      "Perubahan berhasil disimpan"
    );

  } catch (error) {

    console.log(error);

    alert(
      "Gagal menyimpan perubahan"
    );

  }

}

  /* =========================
     LOGOUT
  ========================= */
  function handleLogout() {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setPage("home");

  }

  /* =========================
     UPLOAD FOTO
  ========================= */
  function handlePhoto(e) {

    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend =
      () => {

        setFoto(
          reader.result
        );

      };

    reader.readAsDataURL(
      file
    );
  }

  return (

    <div
      style={{
        padding: "24px",
      }}
    >

      <h1 style={title}>
        Pengaturan
      </h1>

      <p style={subtitle}>
        Kelola informasi akun Anda
      </p>

      <div style={card}>

        {/* FOTO */}
        <div style={profileTop}>

          {foto ? (

            <img
              src={foto}
              alt="profile"
              style={avatarImage}
            />

          ) : (

            <div style={avatar}>
              {nama
                ?.charAt(0)
                ?.toUpperCase()}
            </div>

          )}

          <div>

            <h2
              style={{
                margin: 0,
              }}
            >
              {nama}
            </h2>

            <p style={desc}>
              {email}
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={
                handlePhoto
              }
              style={{
                marginTop:
                  "10px",
              }}
            />

          </div>

        </div>

        {/* FORM */}
        <div
          style={{
            marginTop:
              "30px",
          }}
        >

          {/* NAMA */}
          <div style={inputGroup}>

            <label>
              Nama
            </label>

            <input
              type="text"
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

            <label>
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              style={input}
            />

          </div>

          {/* PHONE */}
          <div style={inputGroup}>

            <label>
              Nomor HP
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              style={input}
            />

          </div>

          {/* BUTTON */}
          <button
            style={saveBtn}
            onClick={
              handleSave
            }
          >
            Simpan Perubahan
          </button>

          <button
            style={logoutBtn}
            onClick={
              handleLogout
            }
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

/* STYLE */

const title = {
  fontSize: "34px",
  fontWeight: "700",
};

const subtitle = {
  color: "#64748b",
  marginBottom: "24px",
};

const card = {
  background: "white",
  padding: "28px",
  borderRadius: "20px",
  boxShadow:
    "0 4px 12px rgba(0,0,0,0.05)",
  maxWidth: "700px",
};

const profileTop = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
};

const avatar = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  background: "#2563eb",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "36px",
  fontWeight: "700",
};

const avatarImage = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  objectFit: "cover",
};

const desc = {
  color: "#64748b",
  marginTop: "6px",
};

const inputGroup = {
  marginBottom: "18px",
};

const input = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  marginTop: "8px",
  outline: "none",
};

const saveBtn = {
  width: "100%",
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: "12px",
  cursor: "pointer",
  marginTop: "10px",
};

const logoutBtn = {
  width: "100%",
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: "12px",
  cursor: "pointer",
  marginTop: "14px",
};

export default Settings;