// src/services/cargasService.js

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const cargasCollectionRef = collection(db, "cargas");
const pedidosCollectionRef = collection(db, "pedidos");

export const obtenerPedidosPorCarga = async (cargaId) => {
  const pedidosQuery = query(
    pedidosCollectionRef,
    where("carga", "==", cargaId)
  );
  const pedidosSnapshot = await getDocs(pedidosQuery);
  return pedidosSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const agregarCarga = async (carga) => {
  return await addDoc(cargasCollectionRef, carga);
};

export const obtenerCargas = async () => {
  const cargasSnapshot = await getDocs(cargasCollectionRef);
  return cargasSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const obtenerCargaPorId = async (id) => {
  const cargaRef = doc(db, "cargas", id);
  const cargaSnapshot = await getDoc(cargaRef);
  return cargaSnapshot.exists() ? cargaSnapshot.data() : null;
};

export const actualizarCarga = async (id, carga) => {
  const cargaRef = doc(db, "cargas", id);
  return await updateDoc(cargaRef, carga);
};

export const eliminarCarga = async (id) => {
  const cargaRef = doc(db, "cargas", id);
  return await deleteDoc(cargaRef);
};

// Nueva función para obtener cargas con estado "Pendiente"
export const obtenerCargasPendientes = async () => {
  const cargasQuery = query(
    cargasCollectionRef,
    where("status", "==", "Pendiente")
  );
  const cargasSnapshot = await getDocs(cargasQuery);
  return cargasSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Otros métodos para actualizar órdenes...
