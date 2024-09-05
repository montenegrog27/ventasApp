import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

const pagosCollectionRef = collection(db, "pagos");

// export const registrarPago = async (clienteId, monto) => {
//   return await addDoc(pagosCollectionRef, {
//     clienteId,
//     monto,
//     fecha: new Date(),
//   });
// };

export const obtenerPagosPorCliente = async (clienteId) => {
  const q = query(pagosCollectionRef, where("clienteId", "==", clienteId));
  const pagosSnapshot = await getDocs(q);
  return pagosSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const obtenerTodosLosPagos = async () => {
  const pagosSnapshot = await getDocs(pagosCollectionRef);
  return pagosSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const registrarPago = async (clienteId, pagoData) => {
  const { monto, metodo, numeroCheque, fechaCobroCheque } = pagoData;

  return await addDoc(pagosCollectionRef, {
    clienteId,
    monto,
    metodo, // efectivo o cheque
    numeroCheque: metodo === "cheque" ? numeroCheque : null,
    fechaCobroCheque: metodo === "cheque" ? fechaCobroCheque : null,
    fecha: new Date(), // Fecha del pago
  });
};
