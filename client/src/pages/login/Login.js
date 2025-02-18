// Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const navigate = useNavigate();

   const handleLogin = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post("http://localhost:5000/api/login", {
            email,
            password,
         });
         localStorage.setItem("token", response.data.token);
         alert(response.data.message);
         navigate("/dashboard");
      } catch (err) {
         setError(err.response?.data?.message || "An error occurred");
      }
   };

   return (
      <div className="login-container">
         <h1>Login</h1>
         {error && <p style={{ color: "red" }}>{error}</p>}
         <form onSubmit={handleLogin}>
            <div>
               <label>Email:</label>
               <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
            </div>
            <div>
               <label>Password:</label>
               <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />
            </div>
            <button type="submit">Login</button>
         </form>
      </div>
   );
};

export default Login;
