import React, { useState, useEffect } from "react";
import {
  agregarPedido,
  obtenerClientes,
  obtenerProductos,
  obtenerCargas, // Asegúrate de importar esta función
} from "../services/pedidosService";

const AddOrderForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    cliente: "",
    productos: [],
    fecha: "",
    status: "pendiente",
    carga: "", // Agregar el campo de carga
  });
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargas, setCargas] = useState([]); // Estado para cargas
  const [productoTemp, setProductoTemp] = useState({
    id: "",
    cantidad: "",
    precio: "",
  });
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [cargaSeleccionada, setCargaSeleccionada] = useState(""); // Estado para carga seleccionada

  useEffect(() => {
    const fetchClientesYProductosYCargas = async () => {
      try {
        const [clientesData, productosData, cargasData] = await Promise.all([
          obtenerClientes(),
          obtenerProductos(),
          obtenerCargas(), // Obtener las cargas
        ]);
        setClientes(clientesData);
        setProductos(productosData);
        setCargas(cargasData); // Guardar cargas
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchClientesYProductosYCargas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cliente") {
      const cliente = clientes.find((c) => c.id === value);
      setClienteSeleccionado(value);
      setFormData({
        ...formData,
        cliente: cliente ? cliente.nombreApellido : "",
      });
    } else if (name === "status") {
      setFormData({ ...formData, [name]: value });
    } else if (name === "carga") {
      // Manejo del cambio en el campo de carga
      setCargaSeleccionada(value);
      setFormData({ ...formData, carga: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleProductoChange = (e) => {
    const { name, value } = e.target;
    setProductoTemp({ ...productoTemp, [name]: value });
  };

  const handleAddProducto = () => {
    if (productoTemp.id && productoTemp.cantidad && productoTemp.precio) {
      setFormData({
        ...formData,
        productos: [...formData.productos, productoTemp],
      });
      setProductoTemp({ id: "", cantidad: "", precio: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fechaCreacion = new Date().toISOString(); // Formato ISO para la fecha
      const ventaConFecha = {
        ...formData,
        fecha: fechaCreacion,
      };
      await agregarPedido(ventaConFecha);
      alert("Venta agregada con éxito");
      setFormData({
        cliente: "",
        productos: [],
        fecha: "",
        status: "pendiente",
        carga: "",
      });
      setClienteSeleccionado("");
      setCargaSeleccionada(""); // Resetear carga seleccionada
      onClose();
    } catch (error) {
      console.error("Error al agregar venta:", error);
      alert("Error al agregar venta");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Agregar Nueva Venta
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cliente
          </label>
          <select
            name="cliente"
            value={clienteSeleccionado}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg w-full"
          >
            <option value="" disabled>
              Seleccionar Cliente
            </option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombreApellido}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Carga
          </label>
          <select
            name="carga"
            value={cargaSeleccionada}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg w-full"
          >
            <option value="" disabled>
              Seleccionar Carga
            </option>
            {cargas.map((carga) => (
              <option key={carga.id} value={carga.id}>
                {carga.name} {/* Ajusta el nombre según el campo de tu carga */}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Agregar Productos
          </h3>
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <select
                name="id"
                value={productoTemp.id}
                onChange={handleProductoChange}
                className="p-3 border border-gray-300 rounded-lg flex-1"
              >
                <option value="" disabled>
                  Seleccionar Producto
                </option>
                {productos.map((producto) => (
                  <option key={producto.id} value={producto.id}>
                    {producto.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="cantidad"
                value={productoTemp.cantidad}
                onChange={handleProductoChange}
                placeholder="Cantidad"
                className="p-3 border border-gray-300 rounded-lg flex-1"
              />
              <input
                type="number"
                name="precio"
                value={productoTemp.precio}
                onChange={handleProductoChange}
                placeholder="Precio"
                className="p-3 border border-gray-300 rounded-lg flex-1"
              />
              <button
                type="button"
                onClick={handleAddProducto}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-300"
              >
                Agregar
              </button>
            </div>
            <ul className="space-y-2 mt-4">
              {formData.productos.map((prod, index) => (
                <li
                  key={index}
                  className="flex justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <span>
                    {productos.find((p) => p.id === prod.id)?.name ||
                      "Producto Desconocido"}
                  </span>
                  <span>
                    {prod.cantidad} x ${prod.precio}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Agregar Venta
        </button>
      </form>
    </div>
  );
};

export default AddOrderForm;
