import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebaseConfig";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  console.log("user", user);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
