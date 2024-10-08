import React, { useState, useEffect } from "react";
import {
  obtenerCargas,
  obtenerPedidosPorCarga,
  actualizarEstadoPedido,
  actualizarEstadoCarga, // Función para actualizar la carga
} from "../services/cargasService";
import AddLoadForm from "../components/AddLoadForm";

const PAGE_SIZE = 10;

const LoadList = () => {
  const [cargas, setCargas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCarga, setSelectedCarga] = useState(null);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchCargas = async () => {
      try {
        const data = await obtenerCargas();
        setCargas(data);
      } catch (error) {
        console.error("Error al obtener cargas:", error);
      }
    };
    fetchCargas();
  }, []);

  const onClose = () => {
    setShowModal(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCargaClick = async (carga) => {
    setSelectedCarga(carga);
    try {
      const data = await obtenerPedidosPorCarga(carga.id);
      setPedidos(data);
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    }
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedCargas = cargas.slice(startIndex, endIndex);
  const totalPages = Math.ceil(cargas.length / PAGE_SIZE);

  const handleControlarCarga = async () => {
    try {
      console.log('Pedidos antes de actualizar:', pedidos);
      // Cambiar el estado de los pedidos seleccionados a "entregado"
      const pedidosActualizados = await Promise.all(
        pedidos.map(async (pedido) => {
          console.log('Actualizando pedido:', pedido);
          const pedidoActualizado = await actualizarEstadoPedido(pedido.id, "entregado");
          console.log('Pedido actualizado:', pedidoActualizado);         
           return pedidoActualizado;
        })
      );
      console.log('Pedidos actualizados:', pedidosActualizados);
      // Verificar si todos los pedidos están entregados
      const todosEntregados = pedidosActualizados.every(
        (pedido) => pedido && pedido.status === "entregado"
      );
  
      if (todosEntregados) {
        await actualizarEstadoCarga(selectedCarga.id, "entregado");
        alert("Todos los pedidos han sido entregados y la carga ha sido marcada como entregada.");
      } else {
        alert("Algunos pedidos siguen pendientes.");
      }
  
      // Actualizar el estado de los pedidos
      setPedidos(pedidosActualizados);
      setSelectedCarga({ ...selectedCarga, status: todosEntregados ? "entregado" : selectedCarga.status });
  
    } catch (error) {
      console.error("Error al controlar la carga:", error);
      alert("Hubo un error al controlar la carga.");
    }
  };
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Cargas</h1>
      <div className="mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-custom-blue text-white rounded"
        >
          Agregar Carga
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 border-b border-gray-200">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Fecha
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Nombre
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Descripción
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Destino
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedCargas.map((carga) => (
              <tr
                key={carga.id}
                className="border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                onClick={() => handleCargaClick(carga)}
              >
                <td className="px-4 py-2 text-sm text-gray-700">
                  {carga.fecha}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {carga.name}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {carga.description}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {carga.destination}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {carga.status}
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

      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <AddLoadForm onClose={onClose} />
        </div>
      )}

      {selectedCarga && (
        <div className="mt-8 p-4 border border-gray-200 bg-white rounded">
          <h2 className="text-xl font-bold mb-4">
            Pedidos para Carga: {selectedCarga.name}
          </h2>
          <table className="w-full bg-white border border-gray-200">
            <thead>
              <tr className="w-full bg-gray-100 border-b border-gray-200">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Pedido ID
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Cliente
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id} className="border-b border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-700">{pedido.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{pedido.cliente}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{pedido.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Botón para controlar la carga */}
          <button
            onClick={handleControlarCarga}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Controlar Carga
          </button>
        </div>
      )}
    </div>
  );
};

export default LoadList;
