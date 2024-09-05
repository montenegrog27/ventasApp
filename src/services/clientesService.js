import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const clientesCollectionRef = collection(db, "clientes");

export const agregarCliente = async (cliente) => {
  return await addDoc(clientesCollectionRef, cliente);
};

export const obtenerClientes = async () => {
  const clientesSnapshot = await getDocs(clientesCollectionRef);
  return clientesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const obtenerClientePorId = async (id) => {
  const clienteRef = doc(db, "clientes", id);
  const clienteSnapshot = await getDoc(clienteRef);
  return clienteSnapshot.exists() ? clienteSnapshot.data() : null;
};
export const actualizarDeudaCliente = async (id, nuevaDeuda) => {
  const clienteRef = doc(db, "clientes", id);
  return await updateDoc(clienteRef, {
    deuda: nuevaDeuda,
  });
};
