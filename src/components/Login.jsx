import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import logo from "../assets/logo2.png"; // Asegúrate de que la ruta al logo sea correcta

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirige a la ruta protegida después del login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-black bg-opacity-50"
      style={{ backgroundColor: "#242c64" }}
    >
      <img src={logo} alt="Logo" className="h-24 mb-6" />
      <h1 className="text-gray-200 text-3xl mb-6">Iniciar Sesión</h1>
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-700 rounded-lg bg-gray-900 text-gray-200"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-700 rounded-lg bg-gray-900 text-gray-200"
        />
        <button
          type="submit"
          className="w-full py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition duration-300"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
