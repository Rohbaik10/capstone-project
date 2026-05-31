const axios = require("axios");

const predictCategory = async (text) => {

  try {

    const lowerText =
      text.toLowerCase();

    /* =========================
       MAKANAN
    ========================= */
    if (
      lowerText.includes("nasi") ||
      lowerText.includes("ayam") ||
      lowerText.includes("bebek") ||
      lowerText.includes("mie") ||
      lowerText.includes("bakso") ||
      lowerText.includes("sate") ||
      lowerText.includes("martabak") ||
      lowerText.includes("pizza") ||
      lowerText.includes("burger") ||
      lowerText.includes("pecel") ||
      lowerText.includes("gorengan") ||
      lowerText.includes("rendang") ||
      lowerText.includes("kebab") ||
      lowerText.includes("roti")
    ) {
      return "makanan";
    }

    /* =========================
       MINUMAN
    ========================= */
    if (
      lowerText.includes("kopi") ||
      lowerText.includes("teh") ||
      lowerText.includes("jus") ||
      lowerText.includes("boba") ||
      lowerText.includes("susu") ||
      lowerText.includes("es ") ||
      lowerText.includes("cappuccino") ||
      lowerText.includes("latte")
    ) {
      return "minuman";
    }

    /* =========================
       TAGIHAN
    ========================= */
    if (
      lowerText.includes("listrik") ||
      lowerText.includes("wifi") ||
      lowerText.includes("internet") ||
      lowerText.includes("bpjs") ||
      lowerText.includes("kuliah") ||
      lowerText.includes("ukt") ||
      lowerText.includes("air") ||
      lowerText.includes("token")
    ) {
      return "tagihan";
    }

    /* =========================
       TRANSPORT
    ========================= */
    if (
      lowerText.includes("bensin") ||
      lowerText.includes("pertalite") ||
      lowerText.includes("pertamax") ||
      lowerText.includes("gojek") ||
      lowerText.includes("grab") ||
      lowerText.includes("tol") ||
      lowerText.includes("parkir") ||
      lowerText.includes("kereta")
    ) {
      return "transport";
    }

    /* =========================
       TOPUP
    ========================= */
    if (
      lowerText.includes("topup") ||
      lowerText.includes("gajian") ||
      lowerText.includes("dana") ||
      lowerText.includes("gopay") ||
      lowerText.includes("ovo") ||
      lowerText.includes("shopeepay")
    ) {
      return "topup";
    }

    // AI MODEL
    const response = await axios.post(
      "http://127.0.0.1:5000/predict",
      {
        text: text,
      }
    );

    console.log("RESPONSE AI:");
    console.log(response.data);

    return response.data.kategori;

  } catch (error) {

    console.log("AI ERROR:");
    console.log(error.message);

    return "lainnya";
  }
};

module.exports = predictCategory;