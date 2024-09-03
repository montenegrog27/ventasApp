import React, { useState } from "react";
import { agregarCliente } from "../services/clientesService";

const AddClientForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    id: "",
    nombreApellido: "",
    email: "",
    deuda: "",
    nombreEmpresa: "",
    localidad: "",
    telefono1: "",
    telefono2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await agregarCliente(formData);
      alert("Cliente agregado con éxito");
      setFormData({
        id: "",
        nombreApellido: "",
        email: "",
        deuda: "",
        nombreEmpresa: "",
        localidad: "",
        telefono1: "",
        telefono2: "",
      });
    } catch (error) {
      console.error("Error al agregar cliente:", error);
      alert("Error al agregar cliente");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Agregar Nuevo Cliente
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            &#x2715;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="ID del Cliente"
            required
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="nombreApellido"
            value={formData.nombreApellido}
            onChange={handleChange}
            placeholder="Nombre y Apellido"
            required
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="deuda"
            value={formData.deuda}
            onChange={handleChange}
            placeholder="Deuda"
            required
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="nombreEmpresa"
            value={formData.nombreEmpresa}
            onChange={handleChange}
            placeholder="Nombre Empresa"
            required
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="localidad"
            value={formData.localidad}
            onChange={handleChange}
            placeholder="Localidad"
            required
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            name="telefono1"
            value={formData.telefono1}
            onChange={handleChange}
            placeholder="Teléfono 1"
            required
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            name="telefono2"
            value={formData.telefono2}
            onChange={handleChange}
            placeholder="Teléfono 2"
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Agregar Cliente
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClientForm;
