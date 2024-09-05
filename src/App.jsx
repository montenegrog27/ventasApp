import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ClientList from "./views/ClientList";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./views/Home";
import LoadList from "./views/LoadList";
import SalesList from "./views/SalesList";
import Navbar from "./components/Navbar";
import NewLoad from "./views/NewLoad";
import NewOrder from "./views/NewOrder";
import Orders from "./views/Orders";
import CollectionList from "./views/CollectionList";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Navbar />
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <PrivateRoute>
              <Navbar />
              <ClientList />
            </PrivateRoute>
          }
        />
        <Route
          path="/loadlist"
          element={
            <PrivateRoute>
              <Navbar />
              <LoadList />
            </PrivateRoute>
          }
        />{" "}
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Navbar />
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/saleslist"
          element={
            <PrivateRoute>
              <Navbar />
              <SalesList />
            </PrivateRoute>
          }
        />{" "}
        <Route
          path="/cobranzas"
          element={
            <PrivateRoute>
              <Navbar />
              <CollectionList />
            </PrivateRoute>
          }
        />{" "}
        <Route
          path="/neworder"
          element={
            <PrivateRoute>
              <Navbar />
              <NewOrder />
            </PrivateRoute>
          }
        />
        <Route
          path="/newload"
          element={
            <PrivateRoute>
              <Navbar />
              <NewLoad />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
