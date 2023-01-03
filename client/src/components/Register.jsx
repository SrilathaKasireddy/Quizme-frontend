import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(true);
      setErrorMsg("Passwords do not match");
      setTimeout(() => {
        setErrorMsg("");
        setError(false);
      }, 5000);
      return;
    } else {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();
      if (data.status === "error"){
        setError(true);
        setErrorMsg(data.message);
        setTimeout(() => {
          setErrorMsg("");
          setError(false);
        }, 5000);
        return;
      }else{
        navigate ("/login");
      }
    }
  }

  return (
    <div className="register">
      <div className="heading">Welcome to QuizMe</div>

      <form className="registerForm" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="username">
         Enter Name
        </label>
        <br />
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="email">
          Enter Email
        </label>
        <br />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password">
        Enter Password
        </label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="confirmPassword">
          Confirm Password
        </label>
        <br />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
        <br />
        <button 
        type="submit">Register</button>
       
        
       <br/>
       <div className="link">
          <Link to="/login">Login</Link>
          </div>
        
        {error && <div className="error">{errorMsg}</div>}
      </form>
    </div>
  );
}

export default Register;
