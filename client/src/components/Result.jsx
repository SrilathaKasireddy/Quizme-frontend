import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import jwt from "jsonwebtoken";
import "./Result.css";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const quizId = location.state.quizId;
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const data = jwt.decode(token);
      if (!data.email) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      if (Date.now() > jwt.decode(token).exp * 1000) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        callResultData();
      }
    } else {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, []);

  async function callResultData() {
    const req = await fetch("http://localhost:5000/api/result/" + quizId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();
    if (data.status === "ok") {
      setError(false);
      setScore(data.score);
    } else {
      setError(true);
      setErrorMsg(data.message);
      navigate("/login");
    }
  }

  function goBack() {
    navigate("/");
  }

  return (
    <div className="result">
      <h1 className="heading">Here is your Score</h1>
      <div className="score">
        <p>Your Score is {score} out of 10</p>
        <button onClick={goBack}>Go To Home Page</button>
      </div>
      {error && <div className="error">{errorMsg}</div>}
    </div>
  );
}

export default Result;
