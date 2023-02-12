import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Image01 from "../images/user-40-01.jpg";
import swal from "@sweetalert/with-react";

const AgregarUsuario = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    usuario: "",
    contraseña: "",
    rol: "",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOnChanged = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (data.usuario === "" || data.contraseña === "" || data.rol === "") {
      swal("Error", "Todos los campos son obligatorios", "error");
      return;
    }
    await axios
      .post("http://localhost:3001/api/usuarios", data)
      .then((res) => {
        swal("Usuario agregado", "El usuario ha sido agregado", "success").then(
          () => {
            navigate(-1);
          }
        );
      })
      .catch((err) => {
        swal("Error", "Ha ocurrido un error", "error");
      });

    setData({
      usuario: "",
      contraseña: "",
      rol: "",
    });
  };

  useEffect(() => {
    let rol = localStorage.getItem("rol");
    if (rol !== "Admin" && rol !== "IT") {
      swal("Error", "No tienes permisos para acceder a esta página", "error");
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="w-full sm:px-6 md:px-8">
            <div className="mb-4 sm:mb-0">
              <h1 className=" m-5 text-2xl md:text-3xl text-slate-800 font-bold">
                Agregar Empleado
              </h1>
            </div>
            <div className="py-4">
              <div className=" mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                  <div className="bg-gray-200 bg-opacity-25 grid grid-cols-1">
                    <div className="p-6">
                      <div className="ml-12">
                        <div className="mt-2 text-sm text-gray-500">
                          <form>
                            <div className="mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                for="Usuario"
                              >
                                Usuario
                              </label>
                              <input
                                name="usuario"
                                onChange={handleOnChanged}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="Usuario"
                                type="text"
                                placeholder="Usuario"
                              />
                            </div>

                            <div className="mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                for="Contraseña"
                              >
                                Contraseña
                              </label>
                              <input
                                name="contraseña"
                                onChange={handleOnChanged}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="Contraseña"
                                type="password"
                                placeholder="Contraseña"
                              />
                            </div>

                            <div className="mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                for="Rol"
                              >
                                Rol
                              </label>
                              <div className="relative">
                                <select
                                  name="rol"
                                  onChange={handleOnChanged}
                                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                  id="Rol"
                                >
                                  <option>Admin</option>
                                  <option>IT</option>
                                  <option>RH</option>
                                </select>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <button
                                onClick={handleOnSubmit}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                              >
                                Agregar
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgregarUsuario;
