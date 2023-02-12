import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Image01 from "../images/user-40-01.jpg";
import swal from "@sweetalert/with-react";

const AgregarEmpleado = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    id: "0",
    image: Image01,
    nombreCompleto: "Patricia Semklo",
    FechaNacimiento: "12/11/1999",
    correoElectronico: "patricia.semklo@app.com",
    telefono: "664-480-3438",
    estado: "Activo",
    puesto: "",
    salarioBruto: "10000",
    salarioNeto: "9000",
    salarioDiario: "500",
    horasLaborales: "8",
    fechaIngreso: new Date(),
    horarioEntrada: "",
    horarioSalida: "",
    horarioSalidaLunch: "",
    horarioEntradaLunch: "",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOnChanged = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (
      data.nombreCompleto === "" ||
      data.FechaNacimiento === "" ||
      data.correoElectronico === "" ||
      data.telefono === "" ||
      data.estado === "" ||
      data.puesto === "" ||
      data.salarioBruto === "" ||
      data.salarioNeto === "" ||
      data.salarioDiario === "" ||
      data.horasLaborales === "" ||
      data.fechaIngreso === "" ||
      data.horarioEntrada === "" ||
      data.horarioSalida === "" ||
      data.horarioSalidaLunch === "" ||
      data.horarioEntradaLunch === ""
    ) {
      swal("Error", "Todos los campos son obligatorios", "error");
      return;
    }
    await axios
      .post("http://localhost:3001/api/empleados", data)
      .then((res) => {
        swal(
          "Empleado agregado",
          "El empleado ha sido agregado",
          "success"
        ).then(() => {
          navigate(-1);
        });
      })
      .catch((err) => {
        swal("Error", "Ha ocurrido un error", "error");
      });

    setData({
      id: "",
      image: "",
      nombreCompleto: "",
      FechaNacimiento: "",
      correoElectronico: "",
      telefono: "",
      estado: "",
      puesto: "",
      salarioBruto: "",
      salarioNeto: "",
      salarioDiario: "",
      horasLaborales: "",
      fechaIngreso: "",
      horarioEntrada: "",
      horarioSalida: "",
      horarioSalidaLunch: "",
      horarioEntradaLunch: "",
    });
  };

  useEffect(() => {
    let rol = localStorage.getItem("rol");
    if (rol !== "Admin" && rol !== "RH" && rol !== "IT") {
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
                                for="nombreCompleto"
                              >
                                Nombre Completo
                              </label>
                              <input
                                name="nombreCompleto"
                                onChange={handleOnChanged}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombreCompleto"
                                type="text"
                                placeholder="Nombre Completo"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                for="FechaNacimiento"
                              >
                                Fecha de Nacimiento
                              </label>
                              <input
                                name="FechaNacimiento"
                                onChange={handleOnChanged}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="FechaNacimiento"
                                type="date"
                                placeholder="Fecha de Nacimiento"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                for="correoElectronico"
                              >
                                Correo Electrónico
                              </label>
                              <input
                                name="correoElectronico"
                                onChange={handleOnChanged}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="correoElectronico"
                                type="email"
                                placeholder="Correo Electrónico"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                for="telefono"
                              >
                                Teléfono
                              </label>
                              <input
                                name="telefono"
                                onChange={handleOnChanged}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="telefono"
                                type="tel"
                                placeholder="Teléfono"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                for="estado"
                              >
                                Estado
                              </label>
                              <div className="relative">
                                <select
                                  name="estado"
                                  onChange={handleOnChanged}
                                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                  id="estado"
                                >
                                  <option>Activo</option>
                                  <option>Inactivo</option>
                                </select>
                                <div className="mb-4">
                                  <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="salarioBruto"
                                  >
                                    Salario Bruto
                                  </label>
                                  <input
                                    name="salarioBruto"
                                    onChange={handleOnChanged}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="salarioBruto"
                                    type="number"
                                    placeholder="$10000"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="salarioNeto"
                                  >
                                    Salario Neto
                                  </label>
                                  <input
                                    name="salarioNeto"
                                    onChange={handleOnChanged}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="salarioNeto"
                                    type="number"
                                    placeholder="Salario Neto"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="salarioDiario"
                                  >
                                    Salario Diario
                                  </label>
                                  <input
                                    name="salarioDiario"
                                    onChange={handleOnChanged}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="salarioDiario"
                                    type="number"
                                    placeholder="Salario Diario"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="puesto"
                                  >
                                    Puesto
                                  </label>
                                  <input
                                    name="puesto"
                                    onChange={handleOnChanged}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="puesto"
                                    type="text"
                                    placeholder="Puesto"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="horasLaborales"
                                  >
                                    Horas Laborales
                                  </label>
                                  <input
                                    name="horasLaborales"
                                    onChange={handleOnChanged}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="horasLaborales"
                                    type="number"
                                    placeholder="Horas Laborales"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="horasLaborales"
                                  >
                                    Hora de Entrada
                                  </label>
                                  <input
                                    name="horarioEntrada"
                                    onChange={handleOnChanged}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="horarioEntrada"
                                    type="time"
                                    placeholder="Hora de Entrada"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="horasLaborales"
                                  >
                                    Hora de Salida
                                  </label>
                                  <input
                                    name="horarioSalida"
                                    onChange={handleOnChanged}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="horarioSalida"
                                    type="time"
                                    placeholder="Hora de Salida"
                                  />
                                </div>{" "}
                                <div className="mb-4">
                                  <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="horasLaborales"
                                  >
                                    Hora salida a Lunch
                                  </label>
                                  <input
                                    name="horarioSalidaLunch"
                                    onChange={handleOnChanged}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="horarioSalidaLunch"
                                    type="time"
                                    placeholder="Hora salida a Lunch"
                                  />
                                </div>{" "}
                                <div className="mb-4">
                                  <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="horasLaborales"
                                  >
                                    Hora de entrada de lunch
                                  </label>
                                  <input
                                    name="horarioEntradaLunch"
                                    onChange={handleOnChanged}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="horarioEntradaLunch"
                                    type="time"
                                    placeholder="Hora de entrada de lunch"
                                  />
                                </div>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                  <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                                  </svg>
                                </div>
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

export default AgregarEmpleado;
