import React, { useState } from "react";
import { agregarCarga } from "../services/cargasService";

const AddLoadForm = ({ onClose }) => {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    cantidad: "",
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
      await agregarCarga(formData);
      alert("Carga agregada con éxito");
      // Limpiar el formulario
      setFormData({
        nombre: "",
        descripcion: "",
        fecha: "",
        cantidad: "",
      });
    } catch (error) {
      console.error("Error al agregar carga:", error);
      alert("Error al agregar carga");
    }
  };

  return (
    <div className="p-4 w-[90%] h-[90%] flex flex-col bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Agregar Nueva Carga</h2>
      <button
        className="absolute top-4 right-4 text-gray-600"
        onClick={onClose}
      >
        X
      </button>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="p-2 border rounded"
        />
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          required
          className="p-2 border rounded"
          rows="4"
        />
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          placeholder="Cantidad"
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Agregar Carga
        </button>
      </form>
    </div>
  );
};

export default AddLoadForm;
