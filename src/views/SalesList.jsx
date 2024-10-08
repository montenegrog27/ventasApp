import React, { useState, useEffect } from "react";
import { obtenerPedidos } from "../services/pedidosService"; // Reemplaza "obtenerVentas" por "obtenerPedidos"

const PAGE_SIZE = 10;

const SalesList = () => {
  const [ventas, setVentas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const data = await obtenerPedidos(); // Usa la función para obtener pedidos
        // Filtrar solo los pedidos con estado "entregado"
        const pedidosEntregados = data.filter((pedido) => pedido.status === "entregado");
        setVentas(pedidosEntregados);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      }
    };
    fetchVentas();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedVentas = ventas.slice(startIndex, endIndex);
  const totalPages = Math.ceil(ventas.length / PAGE_SIZE);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Ventas</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 border-b border-gray-200">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Producto</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Cantidad</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Precio</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {paginatedVentas.map((venta) => (
              <tr key={venta.id} className="border-b border-gray-200">
                <td className="px-4 py-2 text-sm text-gray-700">{venta.producto}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{venta.cantidad}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{venta.precio}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{venta.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-white rounded"
        >
          Anterior
        </button>
        <span className="text-sm text-gray-700">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-white rounded"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default SalesList;
