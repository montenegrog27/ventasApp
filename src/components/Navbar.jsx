import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

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
      ? "text-blue-600 border-blue-500"
      : "text-gray-700 hover:text-gray-900";

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-gray-900 text-xl font-semibold">
                Mi Empresa
              </span>
            </div>
            <div className="hidden sm:flex sm:space-x-8 ml-10">
              <a
                href="/home"
                className={`px-3 py-2 text-sm font-medium border-b-2 ${isActive(
                  "/home"
                )}`}
              >
                Home
              </a>
              <a
                href="/clientes"
                className={`px-3 py-2 text-sm font-medium border-b-2 ${isActive(
                  "/clientes"
                )}`}
              >
                Clientes
              </a>
              <a
                href="/orders"
                className={`px-3 py-2 text-sm font-medium border-b-2 ${isActive(
                  "/orders"
                )}`}
              >
                Pedidos
              </a>
              <a
                href="/loadlist"
                className={`px-3 py-2 text-sm font-medium border-b-2 ${isActive(
                  "/loadlist"
                )}`}
              >
                Cargas
              </a>
              <a
                href="/saleslist"
                className={`px-3 py-2 text-sm font-medium border-b-2 ${isActive(
                  "/saleslist"
                )}`}
              >
                Ventas
              </a>
              <a
                href="/cobranzas"
                className={`px-3 py-2 text-sm font-medium border-b-2 ${isActive(
                  "/cobranzas"
                )}`}
              >
                Cobranzas
              </a>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center">
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
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
