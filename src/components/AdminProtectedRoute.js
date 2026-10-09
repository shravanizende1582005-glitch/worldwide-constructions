import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const location = useLocation();

  // Get logged-in user from localStorage
  const storedUser = localStorage.getItem("user");

  // No logged-in user
  if (!storedUser) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
          message: "Please login as an administrator to continue.",
        }}
      />
    );
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch (error) {
    console.error("Invalid user data in localStorage:", error);

    localStorage.removeItem("user");

    return (
      <Navigate
        to="/login"
        replace
        state={{
          message: "Your login session is invalid. Please login again.",
        }}
      />
    );
  }

  // Logged-in user but not an admin
  if (user.isAdmin !== true) {
    return (
      <Navigate
        to="/"
        replace
        state={{
          message: "You do not have permission to access the Admin Panel.",
        }}
      />
    );
  }

  // Admin user
  return children;
}

export default AdminProtectedRoute;