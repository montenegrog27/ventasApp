import React from "react";

function Home() {
  return (
    <div className="min-h-screen ">
      <div className="flex items-center justify-center flex-col h-full min-h-screen -mt-[100px]  text-gray-800">
        <h1 className="text-3xl font-semibold">Bienvenido!</h1>
        <div className="max-w-3xl mx-auto py-8 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-5 rounded transition duration-300">
              Nueva Venta
            </button>
            <button className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-5 rounded transition duration-300">
              Nueva Carga
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
