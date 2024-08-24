import React, { useState, useEffect } from "react";
import { obtenerClientes } from "../services/clientesService";
import AddClientForm from "../components/AddClientForm";

const PAGE_SIZE = 10;

const ClientList = () => {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await obtenerClientes();
        setClientes(data);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    };
    fetchClientes();
  }, []);

  const onClose = () => {
    setShowModal(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedClientes = clientes.slice(startIndex, endIndex);
  const totalPages = Math.ceil(clientes.length / PAGE_SIZE);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Clientes</h1>
      <div className="mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Agregar Cliente
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 border-b border-gray-200">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Nombre y Apellido
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Deuda
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Nombre Empresa
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Localidad
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Teléfono 1
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Teléfono 2
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedClientes.map((cliente) => (
              <tr key={cliente.id} className="border-b border-gray-200">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {cliente.nombreApellido}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {cliente.email}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {cliente.deuda}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {cliente.nombreEmpresa}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {cliente.localidad}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {cliente.telefono1}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {cliente.telefono2}
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
          <AddClientForm onClose={onClose} />
        </div>
      )}
    </div>
  );
};

export default ClientList;
