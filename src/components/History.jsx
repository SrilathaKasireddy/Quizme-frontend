import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import jwt from "jsonwebtoken";
import "./History.css";

function History() {
  const navigate= useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
        getHistory();
      }
    } else {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, []);

  async function getHistory() {
    const req = await fetch("https://quizme-bkend.onrender.com/api/history", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();
    if (data.status === "ok") {
      setError(false);
      setData(data.data);
    } else {
      setError(true);
      setErrorMsg(data.message);
      navigate("/login");
    }
  }

  return (
    <div>
      <h1 className="heading"> Quiz App</h1>
      <div className="data">
        <h2 className="heading2">Hers's Your Quiz History</h2>
        {data.map((item) => (
          <div className="data-item" key={item._id}>
            <h3 className="date">
            Taken on {new Date(item.date).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}
            </h3>
            <h3 className="info">
              <span className="title">Category</span>
              <span className="value">{item.category}</span>
            </h3>
            <h3 className="info">
              <span className="title">Difficulty</span>
              <span className="value">{item.difficulty}</span>
            </h3>
            <h3 className="info">
              <span className="title">Score</span>
              <span className="value">{item.score}</span>
            </h3>
          </div>
        ))}
        <button className="btn" onClick={() => navigate("/")}>
            Back
        </button>
        {error && <div className="error">{errorMsg}</div>}
      </div>
    </div>
  );
}

export default History;
