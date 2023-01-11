import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("https://quizme-bkend.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        localStorage.setItem("token", data.token);
        navigate("/");
      }
  }

  return (
    <div className="login">
      <div className="heading">Quiz App</div>

      <form className="loginForm" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type="submit">Login</button>
        <div className="link2">
           <Link to="/register">Register</Link></div>
        
         {/* <Link to="/register">register</Link> */}
        {/* <br /><br /> */}
        {error && <div className="error">{errorMsg}</div>}
      </form>
      <h4 style={{ textAlign: 'center',marginTop:"10%"}} >Made With ❤️ By Srilatha Kasireddy</h4>
    </div>
  );
}

export default Login;
