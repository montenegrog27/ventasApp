import React, { useState } from "react";

const PaymentModal = ({
  selectedCliente,
  paymentModal, // Esta prop parece no ser necesaria si estás usando setPaymentModal
  setPaymentModal,
  handlePaymentSubmit,
}) => {
  const [cashAmount, setCashAmount] = useState(""); // Monto en efectivo
  const [chequeAmount, setChequeAmount] = useState(""); // Monto en cheque
  const [chequeNumber, setChequeNumber] = useState(""); // Número de cheque
  const [chequeDate, setChequeDate] = useState(""); // Fecha de cobro de cheque

  const handleSubmit = () => {
    const totalAmount =
      parseFloat(cashAmount || 0) + parseFloat(chequeAmount || 0);
    handlePaymentSubmit({
      cashAmount: parseFloat(cashAmount || 0),
      chequeAmount: parseFloat(chequeAmount || 0),
      chequeNumber,
      chequeDate,
      totalAmount,
    });
  };

  if (!paymentModal) return null; // Oculta el modal si paymentModal es falso

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">Registrar Pago</h2>
        <p className="mb-2">Cliente: {selectedCliente?.nombreApellido}</p>

        {/* Monto en efectivo */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Monto en Efectivo:
        </label>
        <input
          type="number"
          value={cashAmount}
          onChange={(e) => setCashAmount(e.target.value)}
          placeholder="Monto en efectivo"
          className="border px-2 py-1 w-full mb-4"
        />

        {/* Monto en cheque */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Monto en Cheque:
        </label>
        <input
          type="number"
          value={chequeAmount}
          onChange={(e) => setChequeAmount(e.target.value)}
          placeholder="Monto en cheque"
          className="border px-2 py-1 w-full mb-4"
        />

        {/* Mostrar campos adicionales si hay monto en cheque */}
        {chequeAmount > 0 && (
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Número de Cheque:
            </label>
            <input
              type="text"
              value={chequeNumber}
              onChange={(e) => setChequeNumber(e.target.value)}
              placeholder="Número de Cheque"
              className="border px-2 py-1 w-full mb-4"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Fecha de Cobro:
            </label>
            <input
              type="date"
              value={chequeDate}
              onChange={(e) => setChequeDate(e.target.value)}
              className="border px-2 py-1 w-full"
            />
          </div>
        )}

        {/* Validación: sumatoria de ambos montos */}
        <p className="mb-4">
          Total: {parseFloat(cashAmount || 0) + parseFloat(chequeAmount || 0)}€
        </p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setPaymentModal(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Registrar Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
