// src/services/cargasService.js

import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const cargasCollectionRef = collection(db, "cargas");
const pedidosCollectionRef = collection(db, "pedidos"); // Colección de pedidos

// Función para obtener pedidos por carga
export const obtenerPedidosPorCarga = async (cargaId) => {
  const pedidosQuery = query(
    pedidosCollectionRef,
    where("carga", "==", cargaId)
  );
  const pedidosSnapshot = await getDocs(pedidosQuery);
  return pedidosSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Resto del código de servicios
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



// Función para actualizar el estado de un pedido
export const actualizarEstadoPedido = async (pedidoId, estado) => {
  try {
    const response = await fetch(`/api/pedidos/${pedidoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: estado }),
    });

    // Verificar si la respuesta es correcta
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Detalles del error:', errorData);  // Para obtener más detalles del error
      throw new Error("Error al actualizar el estado del pedido");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al actualizar pedido:", error);
    throw error; // Lanzar de nuevo el error para manejarlo en el componente
  }
};


// Función para actualizar el estado de una carga
export const actualizarEstadoCarga = async (cargaId, estado) => {
  try {
    const response = await fetch(`/api/cargas/${cargaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: estado }),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el estado de la carga");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar carga:", error);
  }
};
