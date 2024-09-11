import React, { useState, useEffect } from "react";
import {
  obtenerClientes,
  actualizarDeudaCliente,
} from "../services/clientesService";
import {
  registrarPago,
  obtenerPagosPorCliente,
} from "../services/pagosService";
import AddClientForm from "../components/AddClientForm";
import PaymentModal from "../components/PaymentModal";
import { storage } from "../services/firebaseConfig"; // Importar Firebase Storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const PAGE_SIZE = 10;

const ClientList = () => {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [paymentModal, setPaymentModal] = useState(false);
  const [clientModal, setClientModal] = useState(false); // Modal para ver info del cliente
  const [pagos, setPagos] = useState([]); // Estado para almacenar los pagos del cliente
  const [paymentAmount, setPaymentAmount] = useState("");
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

  const handleOpenPaymentModal = (cliente) => {
    setSelectedCliente(cliente);
    setPaymentModal(true);
  };

  const handleOpenClientModal = async (cliente) => {
    setSelectedCliente(cliente);
    try {
      // Obtener los pagos del cliente
      const pagosCliente = await obtenerPagosPorCliente(cliente.id);
      setPagos(pagosCliente);
    } catch (error) {
      console.error("Error al obtener pagos:", error);
    }
    setClientModal(true);
  };

  // const handlePaymentSubmit = async (paymentData) => {
  //   const { cashAmount, chequeAmount, chequeNumber, chequeDate, totalAmount } =
  //     paymentData;

  //   try {
  //     // Registrar el pago en efectivo
  //     if (cashAmount > 0) {
  //       await registrarPago(selectedCliente.id, {
  //         monto: cashAmount,
  //         metodo: "efectivo",
  //         numeroCheque: null,
  //         fechaCobroCheque: null,
  //       });
  //     }

  //     // Registrar el pago con cheque (si se ingresó)
  //     if (chequeAmount > 0) {
  //       await registrarPago(selectedCliente.id, {
  //         monto: chequeAmount,
  //         metodo: "cheque",
  //         numeroCheque: chequeNumber,
  //         fechaCobroCheque: chequeDate,
  //       });
  //     }

  //     // Actualizar la deuda localmente
  //     const nuevaDeuda = selectedCliente.deuda - totalAmount;
  //     await actualizarDeudaCliente(selectedCliente.id, nuevaDeuda);

  //     setClientes((prevClientes) =>
  //       prevClientes.map((cliente) =>
  //         cliente.id === selectedCliente.id
  //           ? { ...cliente, deuda: nuevaDeuda }
  //           : cliente
  //       )
  //     );

  //     setPaymentModal(false);
  //     setPaymentAmount("");
  //   } catch (error) {
  //     console.error("Error al registrar el pago:", error);
  //   }
  // };
  const handlePaymentSubmit = async (paymentData) => {
    const {
      cashAmount,
      chequeAmount,
      chequeNumber,
      chequeDate,
      totalAmount,
      paymentImage,
    } = paymentData;

    try {
      let imageUrl = null;

      // Si hay una imagen, la subimos a Firebase Storage
      if (paymentImage) {
        const imageRef = ref(
          storage,
          `pagos/${selectedCliente.id}_${Date.now()}`
        );
        await uploadBytes(imageRef, paymentImage);
        imageUrl = await getDownloadURL(imageRef); // Obtenemos la URL de descarga
      }

      // Registrar el pago en efectivo o cheque, y guardar la URL de la imagen
      if (cashAmount > 0) {
        await registrarPago(selectedCliente.id, {
          monto: cashAmount,
          metodo: "efectivo",
          numeroCheque: null,
          fechaCobroCheque: null,
          imagen: imageUrl, // Guardar la URL de la imagen
        });
      }

      if (chequeAmount > 0) {
        await registrarPago(selectedCliente.id, {
          monto: chequeAmount,
          metodo: "cheque",
          numeroCheque: chequeNumber,
          fechaCobroCheque: chequeDate,
          imagen: imageUrl, // Guardar la URL de la imagen
        });
      }

      const nuevaDeuda = selectedCliente.deuda - totalAmount;
      await actualizarDeudaCliente(selectedCliente.id, nuevaDeuda);

      setClientes((prevClientes) =>
        prevClientes.map((cliente) =>
          cliente.id === selectedCliente.id
            ? { ...cliente, deuda: nuevaDeuda }
            : cliente
        )
      );

      setPaymentModal(false);
      setPaymentAmount("");
    } catch (error) {
      console.error("Error al registrar el pago:", error);
    }
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedClientes = clientes.slice(startIndex, endIndex);
  const totalPages = Math.ceil(clientes.length / PAGE_SIZE);

  // Función para formatear montos en pesos argentinos
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  console.log(paymentModal);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Clientes</h1>
      <div className="mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-custom-blue text-white rounded"
        >
          Agregar Cliente
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 border-b border-gray-200">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                id
              </th>
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
                Ver Detalles
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Cobrar
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedClientes.map((cliente) => (
              <tr key={cliente.id} className="border-b border-gray-200">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {cliente.id}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {cliente.nombreApellido}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {cliente.email}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {formatCurrency(cliente.deuda)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <button
                    onClick={() => handleOpenClientModal(cliente)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded"
                  >
                    Ver Detalles
                  </button>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <button
                    onClick={() => handleOpenPaymentModal(cliente)}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Cobrar
                  </button>
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

      {/* Modal de Información del Cliente */}
      {clientModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded shadow-md max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">
              Información del Cliente
            </h2>
            <p className="mb-2">
              <strong>Nombre: </strong>
              {selectedCliente?.nombreApellido}
            </p>
            <p className="mb-2">
              <strong>Email: </strong>
              {selectedCliente?.email}
            </p>
            <p className="mb-2">
              <strong>Deuda: </strong>
              {formatCurrency(selectedCliente?.deuda)}
            </p>
            {/* Mostrar los pagos del cliente */}
            <h3 className="text-md font-semibold mt-4">Pagos Realizados</h3>
            {pagos.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {pagos.map((pago) => (
                  <li key={pago.id} className="border-b border-gray-300 py-1">
                    <p>
                      {pago.metodo === "cheque" ? (
                        <span className="font-semibold text-lg">Cheque </span>
                      ) : (
                        <span className="font-semibold text-lg">Efectivo </span>
                      )}
                    </p>
                    <p>
                      Fecha:{" "}
                      {new Date(pago.fecha.seconds * 1000).toLocaleDateString()}
                    </p>
                    <p>Monto: {formatCurrency(pago.monto)}</p>

                    {/* Ver la foto si existe */}
                    {pago.imagen && (
                      <a
                        href={pago.imagen}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Ver Foto
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2">No se han registrado pagos.</p>
            )}

            <button
              onClick={() => setClientModal(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Registro de Pago */}
      {paymentModal && (
        <PaymentModal
          selectedCliente={selectedCliente}
          paymentModal={paymentModal}
          setPaymentModal={setPaymentModal}
          handlePaymentSubmit={handlePaymentSubmit}
          setPaymentAmount={setPaymentAmount}
        />
      )}

      {/* Modal para agregar cliente */}
      {showModal && <AddClientForm onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ClientList;
