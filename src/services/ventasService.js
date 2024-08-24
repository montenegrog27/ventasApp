import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// Referencias a las colecciones
const ventasCollectionRef = collection(db, "ventas");
const clientesCollectionRef = collection(db, "clientes");
const productosCollectionRef = collection(db, "productos");
const cargasCollectionRef = collection(db, "cargas"); // Añadido para cargas

export const agregarVenta = async (venta) => {
  try {
    await addDoc(ventasCollectionRef, venta);
  } catch (error) {
    console.error("Error al agregar venta:", error);
    throw error;
  }
};

// Función para obtener todas las ventas
export const obtenerVentas = async () => {
  const ventasSnapshot = await getDocs(ventasCollectionRef);
  return ventasSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Función para obtener una venta por ID
export const obtenerVentaPorId = async (id) => {
  const ventaRef = doc(db, "ventas", id);
  const ventaSnapshot = await getDoc(ventaRef);
  return ventaSnapshot.exists() ? ventaSnapshot.data() : null;
};

// Función para eliminar una venta
export const eliminarVenta = async (id) => {
  const ventaRef = doc(db, "ventas", id);
  return await deleteDoc(ventaRef);
};

// Nuevas funciones para obtener clientes, productos y cargas

// Función para obtener todos los clientes
export const obtenerClientes = async () => {
  const clientesSnapshot = await getDocs(clientesCollectionRef);
  return clientesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Función para obtener todos los productos
export const obtenerProductos = async () => {
  const productosSnapshot = await getDocs(productosCollectionRef);
  return productosSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Función para obtener todas las cargas
export const obtenerCargas = async () => {
  const cargasSnapshot = await getDocs(cargasCollectionRef);
  return cargasSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
