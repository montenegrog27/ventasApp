import React, { useState } from "react";
import { agregarCliente } from "../services/clientesService";

const AddClientForm = ({ onClose }) => {
  // Estado para los campos del formulario
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

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await agregarCliente(formData);
      alert("Cliente agregado con éxito");
      // Limpiar el formulario
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
    // <div className="flex w-screen h-screen bg-gray-100 top-0 opacity-90">
    <div className="p-4 w-[90%] h-[90%] flex justify-center items-center">
      <h2 className="text-xl font-bold mb-4">Agregar Nuevo Cliente</h2>
      <button className="rounded-full p-2 " onClick={onClose}>
        X
      </button>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="ID del Cliente"
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="nombreApellido"
          value={formData.nombreApellido}
          onChange={handleChange}
          placeholder="Nombre y Apellido"
          required
          className="p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="deuda"
          value={formData.deuda}
          onChange={handleChange}
          placeholder="Deuda"
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="nombreEmpresa"
          value={formData.nombreEmpresa}
          onChange={handleChange}
          placeholder="Nombre Empresa"
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="localidad"
          value={formData.localidad}
          onChange={handleChange}
          placeholder="Localidad"
          required
          className="p-2 border rounded"
        />
        <input
          type="tel"
          name="telefono1"
          value={formData.telefono1}
          onChange={handleChange}
          placeholder="Teléfono 1"
          required
          className="p-2 border rounded"
        />
        <input
          type="tel"
          name="telefono2"
          value={formData.telefono2}
          onChange={handleChange}
          placeholder="Teléfono 2"
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Agregar Cliente
        </button>
      </form>
    </div>
    // </div>
  );
};

export default AddClientForm;
