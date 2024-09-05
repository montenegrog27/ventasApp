import React, { useState, useEffect } from "react";
import {
  agregarCarga,
  obtenerPedidosPorCarga,
} from "../services/cargasService";

const AddLoadForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    destination: "", // Cambiado de cantidad a destination
    pedidoId: "", // Campo para el pedido seleccionado
    status: "",
  });

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        // Suponiendo que la carga ya existe y se puede obtener su ID. Deberías modificar esto según tu lógica
        const cargaId = "some-carga-id"; // Reemplazar con la lógica para obtener el ID actual
        const pedidosData = await obtenerPedidosPorCarga(cargaId);
        setPedidos(pedidosData);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      }
    };

    fetchPedidos();
  }, []);

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await agregarCarga(formData);
      alert("Carga agregada con éxito");
      // Limpiar el formulario
      setFormData({
        name: "",
        descripcion: "",
        fecha: "",
        destination: "",
        pedidoId: "",
        status: "Pendiente",
      });
    } catch (error) {
      console.error("Error al agregar carga:", error);
      alert("Error al agregar carga");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Agregar Nueva Carga
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              required
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción"
              required
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha
            </label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destino
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Destino"
              required
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Pedido
            </label>
            <select
              name="pedidoId"
              value={formData.pedidoId}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione un pedido</option>
              {pedidos.map((pedido) => (
                <option key={pedido.id} value={pedido.id}>
                  {pedido.nombre} {/* O el campo que desees mostrar */}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >
            Agregar Carga
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLoadForm;
