import React from "react";
import { Navigate } from "react-router-dom";

const StudentPageRoute = ({ children }) => {
  return localStorage.getItem("student") ? children : <Navigate to="/" />;
};

export default StudentPageRoute;
