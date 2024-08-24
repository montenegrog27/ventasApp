import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const ordenesCollectionRef = collection(db, "ordenes");

export const agregarOrden = async (orden) => {
  return await setDoc(doc(ordenesCollectionRef, orden.id), orden);
};

export const obtenerOrdenes = async () => {
  const ordenesSnapshot = await getDocs(ordenesCollectionRef);
  return ordenesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const obtenerOrdenPorId = async (id) => {
  const ordenRef = doc(db, "ordenes", id);
  const ordenSnapshot = await getDoc(ordenRef);
  return ordenSnapshot.exists() ? ordenSnapshot.data() : null;
};

export const eliminarOrden = async (id) => {
  const ordenRef = doc(db, "ordenes", id);
  return await deleteDoc(ordenRef);
};

// Otros métodos para actualizar órdenes...
