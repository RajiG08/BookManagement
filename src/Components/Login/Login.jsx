import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [userType, setUserType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (userType === "admin") {
      if (formData.username === "admin" && formData.password === "admin") {
        dispatch(login({ username: "admin", role: "admin" }));
        navigate("/admin-dashboard");
      } else {
        setError("Invalid admin credentials");
      }
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/users");
      if (!response.ok) throw new Error("Failed to fetch users");

      const users = await response.json();
      const user = users.find(
        (u) => u.username === formData.username && u.password === formData.password
      );

      if (user) {
        dispatch(login({ username: user.username, role: "user" }));
        navigate("/users");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Login failed. Try again later.");
    }
  };

  return (
    <div className="login-container" data-testid="login-container">
      {!showLogin ? (
        <div className="button-container" data-testid="button-container">
          <button 
            className="role-button" 
            data-testid="user-login-button"
            onClick={() => { setUserType("user"); setShowLogin(true); }}
          >
            Login as User
          </button>
          <button 
            className="role-button admin-button" 
            data-testid="admin-login-button"
            onClick={() => { setUserType("admin"); setShowLogin(true); }}
          >
            Login as Admin
          </button>
        </div>
      ) : (
        <div className="login-box" data-testid="login-box">
          <h1 className="login-title" data-testid="login-title">
            Login as {userType === "admin" ? "Admin" : "User"}
          </h1>
          <form onSubmit={handleSubmit} className="login-form" data-testid="login-form">
            <div className="input-group">
              <input 
                type="text" 
                name="username" 
                placeholder="Username" 
                className="login-input" 
                onChange={handleChange} 
                required 
                data-testid="username-input"
              />
            </div>
            <div className="input-group">
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                className="login-input" 
                onChange={handleChange} 
                required 
                data-testid="password-input"
              />
            </div>
            {error && <p className="error-message" data-testid="error-message">{error}</p>}
            <button type="submit" className="login-button" data-testid="login-button">
              Login
            </button>
          </form>
          <button className="back-button" onClick={() => setShowLogin(false)} data-testid="back-button">
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
