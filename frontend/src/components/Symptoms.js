import { useState } from "react";
import axios from "axios";

function Symptoms() {
  const [symptoms, setSymptoms] = useState("");
  const [predictions, setPredictions] = useState([]);
  //const [disease, setDisease] = useState("");

  const predictSymptoms = async () => {
    try {
      // Send a clean object instead of an array
      const payload = {
        age: 25, 
        gender: "Male", 
        symptoms: symptoms
      };

      const res = await axios.post("http://localhost:5000/predict_symptoms", payload);
      
      // Update state with the array of predictions
      setPredictions(res.data.predictions);

    } catch (err) {
      console.log(err);
      alert("Prediction failed. Check backend console.");
    }
  };

  return (
    <div style={styles.card}>
      <h2>Symptoms Based Prediction</h2>

      <input
        placeholder="Enter symptoms (e.g., fever, vomiting)"
        onChange={(e) => setSymptoms(e.target.value)}
        style={styles.input}
      />

      <button onClick={predictSymptoms} style={styles.button}>
        Predict
      </button>

      {/* Map through the top predictions */}
      <div style={{ marginTop: "20px" }}>
        {predictions.length > 0 ? (
          predictions.map((pred, index) => (
            <h4 key={index}>
              {index + 1}. {pred.disease} ({pred.confidence}%)
            </h4>
          ))
        ) : (
          <p>Awaiting prediction...</p>
        )}
      </div>
    </div>
  );
}


const styles = {
  card: {
    padding: "25px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "350px"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "green",
    color: "white",
    border: "none"
  }
};

export default Symptoms;
