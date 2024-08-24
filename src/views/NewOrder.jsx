import React from "react";
import AddOrderForm from "../components/AddOrderForm";

const NewOrder = () => {
  const handleClose = () => {
    // Lógica para redirigir de vuelta a SalesList
    window.history.back(); // Redirige a la página anterior
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Nueva Venta</h1>
      <AddOrderForm onClose={handleClose} />
    </div>
  );
};

export default NewOrder;
