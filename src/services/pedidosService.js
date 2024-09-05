// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   doc,
//   getDoc,
// } from "firebase/firestore";
// import { db } from "./firebaseConfig";

// // const pedidosCollectionRef = collection(db, "pedidos");
// // Referencias a las colecciones
// const pedidosCollectionRef = collection(db, "pedidos");
// const clientesCollectionRef = collection(db, "clientes");
// const productosCollectionRef = collection(db, "productos");
// const cargasCollectionRef = collection(db, "cargas"); // Añadido para cargas

// export const agregarPedido = async (venta) => {
//   try {
//     await addDoc(pedidosCollectionRef, venta);
//   } catch (error) {
//     console.error("Error al agregar pedido:", error);
//     throw error;
//   }
// };

// // Función para obtener todas las ventas
// export const obtenerPedidos = async () => {
//   const pedidosSnapshot = await getDocs(pedidosCollectionRef);
//   return pedidosSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
// };

// // Función para obtener una venta por ID
// export const obtenerPedidoPorId = async (id) => {
//   const pedidoRef = doc(db, "pedidos", id);
//   const ventaSnapshot = await getDoc(pedidoRef);
//   return ventaSnapshot.exists() ? ventaSnapshot.data() : null;
// };

// // Función para eliminar una venta
// export const eliminarPedido = async (id) => {
//   const pedidoRef = doc(db, "pedidos", id);
//   return await deleteDoc(pedidoRef);
// };

// // Nuevas funciones para obtener clientes, productos y cargas

// // Función para obtener todos los clientes
// export const obtenerClientes = async () => {
//   const clientesSnapshot = await getDocs(clientesCollectionRef);
//   return clientesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
// };

// // Función para obtener todos los productos
// export const obtenerProductos = async () => {
//   const productosSnapshot = await getDocs(productosCollectionRef);
//   return productosSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
// };

// // Función para obtener todas las cargas
// export const obtenerCargas = async () => {
//   const cargasSnapshot = await getDocs(cargasCollectionRef);
//   return cargasSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
// };

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  query,
  where, // Añadido para la consulta con filtros
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// Referencias a las colecciones
const pedidosCollectionRef = collection(db, "pedidos");
const clientesCollectionRef = collection(db, "clientes");
const productosCollectionRef = collection(db, "productos");
const cargasCollectionRef = collection(db, "cargas"); // Añadido para cargas

// Función para agregar un pedido
export const agregarPedido = async (venta) => {
  try {
    await addDoc(pedidosCollectionRef, venta);
  } catch (error) {
    console.error("Error al agregar pedido:", error);
    throw error;
  }
};

// Función para obtener todas las ventas
export const obtenerPedidos = async () => {
  const pedidosSnapshot = await getDocs(pedidosCollectionRef);
  return pedidosSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Función para obtener una venta por ID
export const obtenerPedidoPorId = async (id) => {
  const pedidoRef = doc(db, "pedidos", id);
  const ventaSnapshot = await getDoc(pedidoRef);
  return ventaSnapshot.exists() ? ventaSnapshot.data() : null;
};

// Función para eliminar una venta
export const eliminarPedido = async (id) => {
  const pedidoRef = doc(db, "pedidos", id);
  return await deleteDoc(pedidoRef);
};

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

// Nueva función para obtener cargas con estado "Pendiente"
export const obtenerCargasPendientes = async () => {
  const cargasQuery = query(
    cargasCollectionRef,
    where("status", "==", "Pendiente") // Filtra las cargas con estado "Pendiente"
  );
  const cargasSnapshot = await getDocs(cargasQuery);
  return cargasSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
