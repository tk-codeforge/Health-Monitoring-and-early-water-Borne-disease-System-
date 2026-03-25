from flask import Flask, request, jsonify
from flask_cors import CORS 
import pickle
import numpy as np
import os
import pandas as pd

app = Flask(__name__)
CORS(app) # ✅ Allow React to talk to Flask

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_location = pickle.load(open(os.path.join(BASE_DIR, "model_location.pkl"), "rb"))

# =========================
# LOCATION PREDICTION
# =========================
@app.route("/predict_location", methods=["POST"])
def predict_location():
    try:
        data = request.json
        features = data.get("features")

        if not features:
            return jsonify({"error": "No features provided"}), 400

        features = np.array(features).reshape(1, -1)
        prediction = model_location.predict(features)
        proba = model_location.predict_proba(features)

        confidence = float(max(proba[0]) * 100)

        return jsonify({
            "disease": str(prediction[0]),
            "confidence": round(confidence, 2)
        })

    except Exception as e:
        print("Location Error:", str(e)) # Helps with debugging in the terminal
        return jsonify({"error": str(e)}), 500

# =========================
# SYMPTOMS PREDICTION
# =========================
def split_symptoms(text):
    return [s.strip().lower() for s in text.split(',')]
artifacts = pickle.load(open(os.path.join(BASE_DIR, "disease_model_artifacts.pkl"), 'rb'))
model = artifacts["model"]
le_gender = artifacts["le_gender"]
le_disease = artifacts["le_disease"]
vectorizer = artifacts["vectorizer"]
feature_columns = artifacts["feature_columns"]
@app.route("/predict_symptoms", methods=["POST"])
def predict_symptoms():
    try:
        data = request.json
        
        # Extract data directly from JSON (cleaner than the array method)
        age = data.get("age", 25)
        gender_str = data.get("gender", "Male")
        symptoms_str = data.get("symptoms", "")
        
        # 1. Encode Gender
        try:
            gender_encoded = le_gender.transform([gender_str])[0]
        except ValueError:
            gender_encoded = 0 

        # 2. Vectorize the input symptoms
        symptoms_vec = vectorizer.transform([symptoms_str]).toarray()
        symptoms_df = pd.DataFrame(symptoms_vec, columns=vectorizer.get_feature_names_out())
        
        # 3. Calculate count
        symptom_count = len([s for s in symptoms_str.split(',') if s.strip()])

        # 4. Build the final DataFrame matching the exact training columns
        input_data = pd.DataFrame({'age': [age], 'gender': [gender_encoded], 'symptom_count': [symptom_count]})
        input_features = pd.concat([input_data, symptoms_df], axis=1)
        
        # Ensure column order matches training exactly
        input_features = input_features[feature_columns]

        # 5. Predict Probabilities for multiple diseases
        probabilities = model.predict_proba(input_features)[0]
        
        # Get the indices of the top 3 highest probabilities
        top_indices = probabilities.argsort()[-3:][::-1]
        
        predictions = []
        for idx in top_indices:
            prob_score = probabilities[idx]
            if prob_score > 0: 
                disease_name = le_disease.inverse_transform([idx])[0]
                predictions.append({
                    "disease": disease_name,
                    "confidence": round(float(prob_score) * 100, 2)
                })

        return jsonify({"predictions": predictions})

    except Exception as e:
        print("Backend Error:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
