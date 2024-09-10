import React, { useState, useEffect } from "react";
import {
  agregarPedido,
  obtenerClientes,
  obtenerProductos,
  obtenerCargasPendientes,
} from "../services/pedidosService";

const AddOrderForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    cliente: "",
    productos: [],
    fecha: "",
    status: "pendiente",
    carga: "",
  });
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargas, setCargas] = useState([]);
  const [productoTemp, setProductoTemp] = useState({
    id: "",
    cantidad: "",
    precio: "",
  });
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [cargaSeleccionada, setCargaSeleccionada] = useState("");

  useEffect(() => {
    const fetchClientesYProductosYCargas = async () => {
      try {
        const [clientesData, productosData, cargasData] = await Promise.all([
          obtenerClientes(),
          obtenerProductos(),
          obtenerCargasPendientes(), // Usar la función para obtener cargas pendientes
        ]);
        setClientes(clientesData);
        setProductos(productosData);
        setCargas(cargasData);
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
      // Busca el producto en el estado `productos` por su id
      const productoSeleccionado = productos.find(
        (producto) => producto.id === productoTemp.id
      );

      // Incluye el nombre del producto en el objeto que se va a agregar a `formData`
      const productoConNombre = {
        ...productoTemp,
        nombre: productoSeleccionado ? productoSeleccionado.name : "", // Asegurarse de que el nombre esté presente
      };

      // Agregar el producto con nombre al estado `formData`
      setFormData({
        ...formData,
        productos: [...formData.productos, productoConNombre],
      });

      // Resetear el formulario temporal de productos
      setProductoTemp({ id: "", cantidad: "", precio: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fechaCreacion = new Date().toISOString();
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
      setCargaSeleccionada("");
      onClose();
    } catch (error) {
      console.error("Error al agregar venta:", error);
      alert("Error al agregar venta");
    }
  };

  console.log(productoTemp);
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Agregar Nueva Venta
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>
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
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Seleccionar Carga
              </option>
              {cargas.map((carga) => (
                <option key={carga.id} value={carga.id}>
                  {carga.name}
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
                  className="p-3 border border-gray-300 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="p-3 border border-gray-300 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="precio"
                  value={productoTemp.precio}
                  onChange={handleProductoChange}
                  placeholder="Precio"
                  className="p-3 border border-gray-300 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddProducto}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Agregar
                </button>
              </div>
              <ul className="space-y-2">
                {formData.productos.map((producto, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span>
                      Producto ID: {producto.id}, Cantidad: {producto.cantidad},
                      Precio: {producto.precio}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          productos: formData.productos.filter(
                            (_, i) => i !== index
                          ),
                        })
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha
            </label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pendiente">Pendiente</option>
              <option value="completado">Completado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrderForm;
