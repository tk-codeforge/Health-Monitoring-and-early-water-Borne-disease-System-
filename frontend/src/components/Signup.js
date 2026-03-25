import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", data);
      alert(res.data.message);
      // Just use navigate, no need for window.location.href
      navigate("/login"); 
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h2 style={styles.brandTitle}>HMEWS</h2>
        <h3 style={styles.pageTitle}>Sign Up</h3>

        <input
          placeholder="Username"
          style={styles.input}
          onChange={(e) => setData({...data, username: e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={(e) => setData({...data, password: e.target.value})}
        />

        <button onClick={register} style={styles.primaryButton}>
          Register
        </button>

        <p style={styles.text}>Already have an account?</p>
        
        <button onClick={() => navigate("/login")} style={styles.secondaryButton}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f9" 
  },
  card: {
    padding: "40px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)", 
    textAlign: "center",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "15px" 
  },
  brandTitle: {
    margin: "0 0 5px 0",
    color: "#333",
    fontSize: "24px"
  },
  pageTitle: {
    margin: "0 0 20px 0",
    color: "#000",
    fontSize: "22px"
  },
  input: {
    padding: "12px",
    border: "1px solid #a0b0d0",
    borderRadius: "4px",
    backgroundColor: "#eef2ff", 
    fontSize: "16px",
    outline: "none"
  },
  primaryButton: {
    padding: "12px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px"
  },
  text: {
    margin: "15px 0 5px 0",
    fontSize: "14px",
    color: "#555"
  },
  secondaryButton: {
    padding: "10px",
    backgroundColor: "#f0f0f0",
    color: "black",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "15px",
    cursor: "pointer"
  }
};

export default Signup;
