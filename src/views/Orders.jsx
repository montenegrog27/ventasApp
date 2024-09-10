import React, { useState, useEffect } from "react";
import { obtenerPedidos, obtenerPedidoPorId } from "../services/pedidosService"; // Servicio de pedidos
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const PAGE_SIZE = 10;

const Orders = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null); // Para el pedido seleccionado
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

  // Manejar cuando se hace clic en un pedido para ver detalles
  const handleOrderClick = async (orderId) => {
    try {
      const pedido = await obtenerPedidoPorId(orderId); // Obtener los detalles del pedido
      setSelectedPedido(pedido);
      setShowModal(true); // Abrir el modal con los detalles del pedido
    } catch (error) {
      console.error("Error al obtener el pedido:", error);
    }
  };

  const handleAddOrder = () => {
    navigate("/neworder");
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPedido(null);
  };

  // Calcular el total del pedido a partir de los productos
  const calcularTotalPedido = (productos = []) => {
    // Asegurarse de que 'productos' sea un array
    if (!Array.isArray(productos)) {
      return 0;
    }

    return productos.reduce((total, producto) => {
      const subtotal =
        parseFloat(producto.precio) * parseInt(producto.cantidad, 10);
      return total + subtotal;
    }, 0);
  };

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      selectedPedido.productos.map((producto) => ({
        Producto: producto.nombre,
        Cantidad: producto.cantidad,
        "Precio Unitario": producto.precio,
        Subtotal: parseFloat(producto.precio) * parseInt(producto.cantidad, 10),
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Productos");

    // Añadir los datos del pedido en la primera hoja
    const wsPedido = XLSX.utils.json_to_sheet([
      {
        Cliente: selectedPedido.cliente,
        Fecha: new Date(selectedPedido.fecha).toLocaleDateString(),
        Estado: selectedPedido.status,
        Total: calcularTotalPedido(selectedPedido.productos),
      },
    ]);
    XLSX.utils.book_append_sheet(wb, wsPedido, "Pedido");

    XLSX.writeFile(wb, `Pedido_${selectedPedido.numeroOrden}.xlsx`);
  };

  console.log(selectedPedido);

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
              <tr
                key={orden.id}
                className="border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOrderClick(orden.id)} // Al hacer clic en la fila, mostrar detalles
              >
                <td className="px-4 py-2 text-sm text-gray-700">
                  {orden.numeroOrden}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {new Date(orden.fecha).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {orden.cliente}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {calcularTotalPedido(orden.productos).toLocaleString(
                    "es-AR",
                    {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 2,
                    }
                  )}
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

      {/* Modal para mostrar el detalle del pedido */}
      {showModal && selectedPedido && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded shadow-md max-w-lg w-full">
            {/* Cabecera de la Factura */}
            <div className="text-center">
              <h2 className="text-xl font-bold">Factura</h2>
              <p className="text-sm text-gray-700">
                Nº de Pedido: {selectedPedido.numeroOrden}
              </p>
            </div>
            <hr className="my-4" />

            {/* Información del Cliente y Pedido */}
            <div className="mb-4">
              <p>
                <strong>Cliente: </strong>
                {selectedPedido.cliente}
              </p>
              <p>
                <strong>Fecha: </strong>
                {new Date(selectedPedido.fecha).toLocaleDateString()}
              </p>
              <p>
                <strong>Status: </strong>
                {selectedPedido.status}
              </p>
              <p>
                <strong>Carga: </strong>
                {selectedPedido.carga
                  ? selectedPedido.carga
                  : "Pedido no asignado a una carga"}
              </p>
            </div>

            {/* Tabla de Productos */}
            <table className="min-w-full bg-white">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left text-sm font-medium text-gray-700">
                    Producto
                  </th>
                  <th className="py-2 text-left text-sm font-medium text-gray-700">
                    Cantidad
                  </th>
                  <th className="py-2 text-left text-sm font-medium text-gray-700">
                    Precio Unitario
                  </th>
                  <th className="py-2 text-left text-sm font-medium text-gray-700">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedPedido.productos.map((producto, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{producto.nombre}</td>
                    <td className="py-2">{producto.cantidad}</td>
                    <td className="py-2">
                      {parseFloat(producto.precio).toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-2">
                      {(
                        parseFloat(producto.precio) *
                        parseInt(producto.cantidad, 10)
                      ).toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total del Pedido */}
            <p className="mt-4 text-right font-bold">
              Total del Pedido:{" "}
              {calcularTotalPedido(selectedPedido.productos).toLocaleString(
                "es-AR",
                {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                }
              )}
            </p>

            {/* Botones de Exportar e Imprimir */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={handleExportToExcel}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
              >
                Exportar a Excel
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              >
                Imprimir
              </button>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
