import React, { useEffect, useState } from "react";
import { obtenerTodosLosPagos } from "../services/pagosService"; // Asegúrate de tener el servicio correcto

function CollectionList() {
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const data = await obtenerTodosLosPagos();
        setPagos(data);
      } catch (error) {
        console.error("Error al obtener pagos:", error);
      }
    };
    fetchPagos();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Pagos</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 border-b border-gray-200">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Cliente ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Monto
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr key={pago.id} className="border-b border-gray-200">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {pago.clienteId}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {pago.monto}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {new Date(pago.fecha.seconds * 1000).toLocaleDateString()}{" "}
                  {/* Convierte la fecha de Firebase */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CollectionList;
