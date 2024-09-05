import React from "react";
import logo from "../assets/logo2.png";

function Home() {
  return (
    <>
      <div
        className=" flex flex-col items-center justify-center h-screen bg-black bg-opacity-50"
        style={{ backgroundColor: "#242c64" }}
      >
        <h1 className="text-gray-200 font-semibold text-4xl">VentApp</h1>
        <img
          src={logo}
          alt="Logo"
          className="top-0 flex items-center relative justify-center h-[40%]"
        />
        <h2 className="text-3xl font-semibold text-white">¡Bienvenido!</h2>
        <div className="max-w-3xl mx-auto py-8 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <a href="/newOrder">
              <button className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-5 rounded transition duration-300">
                Nuevo Pedido
              </button>
            </a>
            <a href="/newLoad">
              <button className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-5 rounded transition duration-300">
                Nueva Carga
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
