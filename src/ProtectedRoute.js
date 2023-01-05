import React from "react";
import {  useState } from 'react';
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children}) => {
const [token, setToken] = useState(localStorage.getItem("token"));

if (!token) {
     return <Navigate to="/" replace />;
   }
 
   return children;
};

export default ProtectedRoute;