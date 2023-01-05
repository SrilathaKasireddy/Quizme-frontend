import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';
import History from './components/History';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz" element={

            <Quiz />

          }>
          </Route>
          <Route path="/result" element={<ProtectedRoute>
            <Result />
          </ProtectedRoute>}>
          </Route>
          <Route path="/history" element={<ProtectedRoute>
            <History />
          </ProtectedRoute>}>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
