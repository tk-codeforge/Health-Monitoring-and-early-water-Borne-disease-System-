import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";


function App() {
  const [isAuth, setIsAuth] = useState(false);
return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private/Protected Routes */}
        <Route 
          path="/dashboard" 
          element={isAuth ? (
            <div style={styles.page}>
              <Dashboard />
            </div>
          ) : (
            <Navigate to="/login" />
          )} 
        />

        {/* Default Route */}
        <Route path="*" element={<Navigate to={isAuth ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    marginTop: "30px"
  }
};

export default App;
