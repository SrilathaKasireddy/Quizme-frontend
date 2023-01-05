import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "react-loader-spinner";
import jwt from "jsonwebtoken";
import "./Home.css";

function Home() {
  const [category, setCategory] = useState("Random");
  const [difficulty, setDifficulty] = useState("Easy");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSelect(event) {
    const { name, value } = event.target;
    if (name === "category") {
      setCategory(value);
    } else {
      setDifficulty(value);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const req = await fetch("http://localhost:5000/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        category: category,
        difficulty: difficulty,
      }),
    });

    const data = await req.json();
    setLoading(false);
    if (data.status === "ok") {
      navigate("/quiz", {state:{quizId: data.quizId,quizData: data.quizData}})

   
    } else {
      setError(true);
      setErrorMsg(data.message);
      setTimeout(() => {
        navigate(
          "/login",
        );
      }, 1000);
      return;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const email = jwt.decode(token);
      if (!email) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      if (Date.now() > jwt.decode(token).exp * 1000) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, []);

  function viewHistory(){
  navigate(
     "/history",
    );
  }

  return (
    <div className="home">
      {loading ? (
        <Loader
          className="loader"
          type="Grid"
          color="#fff"
          height={100}
          width={100}
        />
      ) : (
        <div>
          <h1 className="heading"> Quiz App </h1>
          <p className="heading2">Let's Start a new Quiz</p>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="category">Select Category</label>
            <br />
            <select
              className="category"
              name="category"
              value={category}
              onChange={handleSelect}
            >
              <option value="Random">Random</option>
              <option value="linux">Linux</option>
              <option value="devops">DevOps</option>
              <option value="docker">Docker</option>
              <option value="bash">Bash</option>
              <option value="sql">SQL</option>
              <option value="cms">CMS</option>
              <option value="code">Code</option>
            </select>
            <br />
            <label htmlFor="difficulty">Select Difficulty</label>
            <br />
            <select
              className="difficulty"
              name="difficulty"
              value={difficulty}
              onChange={handleSelect}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <br />
            <button className="start" type="submit">
              Start Quiz
            </button>
            {error && <div className="error">{errorMsg}</div>}
          </form>
          <div className="btns">
            <button
              className="logout"
              onClick={() => {localStorage.removeItem("token");
              navigate("/login")}}
            >
              Logout
            </button>
            <button className="history" onClick={viewHistory}>View History</button>
            </div>
        </div>
      )}
    </div>
  );
}

export default Home;
