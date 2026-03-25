import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setIsAuth }) {
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", data);
      localStorage.setItem("username", data.username);
      alert(res.data.message);
      setIsAuth(true);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>HMEWS</h2>
        <h3 style={styles.loginTitle}>Login</h3>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setData({ ...data, username: e.target.value })}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
          style={styles.input}
        />

        <button onClick={login} style={styles.button}>Login</button>

        <p style={styles.text}>Don't have an account?</p>
        <button onClick={() => navigate("/signup")} style={styles.signupButton}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f4f9" 
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
    gap: "5px"
  },
  heading: {
    margin: "0",
    color: "#333",
    fontSize: "24px",
    fontWeight: "bold"
  },
  loginTitle: {
    marginTop: "5px",
    marginBottom: "20px",
    fontSize: "22px"
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    boxSizing: "border-box", 
    border: "1px solid #a0b0d0",
    borderRadius: "4px",
    backgroundColor: "#eef2ff", 
    fontSize: "16px",
    outline: "none"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "blue",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px"
  },
  text: {
    margin: "20px 0 5px 0",
    fontSize: "14px",
    color: "#555"
  },
  signupButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    color: "black",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "15px",
    cursor: "pointer"
  }
};

export default Login;
