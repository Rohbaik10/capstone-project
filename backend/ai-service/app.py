from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np

app = Flask(__name__)

model = tf.keras.models.load_model("model_final.keras")

labels = [
    "makanan",
    "transportasi",
    "tagihan",
    "minuman",
    "hiburan",
    "belanja",
    "topup",
    "lainnya"
]

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json
    text = data["text"]

    input_text = tf.constant([text])

    prediction = model.predict(input_text)

    result = labels[np.argmax(prediction)]

    return jsonify({
        "kategori": result
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)