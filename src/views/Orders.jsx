import React, { useState, useEffect } from "react";
import { obtenerPedidos } from "../services/pedidosService"; // Asegúrate de crear este servicio
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

const Orders = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const data = await obtenerPedidos();
        setOrdenes(data);
      } catch (error) {
        console.error("Error al obtener órdenes:", error);
      }
    };
    fetchOrdenes();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedOrdenes = ordenes.slice(startIndex, endIndex);
  const totalPages = Math.ceil(ordenes.length / PAGE_SIZE);

  const handleAddOrder = () => {
    navigate("/neworder");
  };

  console.log("pedidos", ordenes);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Órdenes</h1>
      <div className="mb-4">
        <button
          onClick={handleAddOrder}
          className="px-4 py-2 bg-custom-blue text-white rounded"
        >
          Nuevo Pedido
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 border-b border-gray-200">
              {/* Ajusta los encabezados según los datos de órdenes */}
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Número de Orden
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Fecha
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Cliente
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrdenes.map((orden) => (
              <tr key={orden.id} className="border-b border-gray-200">
                {/* Ajusta los datos según los datos de órdenes */}
                <td className="px-4 py-2 text-sm text-gray-700">
                  {orden.numeroOrden}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {orden.fecha}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {orden.cliente}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {orden.total}
                </td>
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
      {/* {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <AddOrderForm onClose={onClose} />
        </div>
      )} */}
    </div>
  );
};

export default Orders;
