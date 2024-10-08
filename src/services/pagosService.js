import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

const pagosCollectionRef = collection(db, "pagos");

export const obtenerPagosPorCliente = async (clienteId) => {
  const q = query(pagosCollectionRef, where("clienteId", "==", clienteId));
  const pagosSnapshot = await getDocs(q);
  return pagosSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const obtenerTodosLosPagos = async () => {
  const pagosSnapshot = await getDocs(pagosCollectionRef);
  return pagosSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// export const registrarPago = async (clienteId, pagoData) => {
//   const { monto, metodo, numeroCheque, fechaCobroCheque } = pagoData;

//   return await addDoc(pagosCollectionRef, {
//     clienteId,
//     monto,
//     metodo, // efectivo o cheque
//     numeroCheque: metodo === "cheque" ? numeroCheque : null,
//     fechaCobroCheque: metodo === "cheque" ? fechaCobroCheque : null,
//     fecha: new Date(), // Fecha del pago
//   });
// };

export const registrarPago = async (clienteId, pagoData) => {
  const { monto, metodo, numeroCheque, fechaCobroCheque, imagen } = pagoData;

  return await addDoc(pagosCollectionRef, {
    clienteId,
    monto,
    metodo, // efectivo o cheque
    numeroCheque: metodo === "cheque" ? numeroCheque : null,
    fechaCobroCheque: metodo === "cheque" ? fechaCobroCheque : null,
    imagen: imagen || null, // Asegúrate de incluir la URL de la imagen
    fecha: new Date(), // Fecha del pago
  });
};
