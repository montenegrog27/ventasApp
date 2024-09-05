import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import logo from "../assets/logo2.png"; // Asegúrate de que la ruta al logo sea correcta

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirige al usuario a la página de Login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-gray-700 text-white"
      : "text-gray-200 hover:bg-gray-700 hover:text-white";

  return (
    <nav className="bg-black bg-opacity-70 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-12 mr-4" />
            <span className="text-white text-xl font-semibold">M&Cia</span>
          </div>
          <div className="hidden sm:flex sm:space-x-8">
            <a
              href="/home"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-300 ${isActive(
                "/home"
              )}`}
            >
              Home
            </a>
            <a
              href="/clientes"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-300 ${isActive(
                "/clientes"
              )}`}
            >
              Clientes
            </a>
            <a
              href="/orders"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-300 ${isActive(
                "/orders"
              )}`}
            >
              Pedidos
            </a>
            <a
              href="/loadlist"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-300 ${isActive(
                "/loadlist"
              )}`}
            >
              Cargas
            </a>
            <a
              href="/saleslist"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-300 ${isActive(
                "/saleslist"
              )}`}
            >
              Ventas
            </a>
            <a
              href="/cobranzas"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-300 ${isActive(
                "/cobranzas"
              )}`}
            >
              Cobranzas
            </a>
          </div>
          <div className="hidden sm:flex items-center">
            <button
              onClick={handleLogout}
              className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
