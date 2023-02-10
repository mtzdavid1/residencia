import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DetallesEmpleado = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [checadas, setChecadas] = useState([]);
  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const { id } = useParams();

  const getCurrentWeek = () => {
    const now = new Date();
    const onejan = new Date(now.getFullYear(), 0, 1);
    return Math.ceil(((now - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  };

  const getWeekFromDate = (dateString) => {
    const date = new Date(dateString);
    const onejan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  };

  const getDayOfWeek = (date) => {
    return daysOfWeek[date.getDay()];
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/api/empleados/${id}`).then((res) => {
      setCustomers(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/empleados/checadas/${id}`)
      .then((res) => {
        const data = res.data;
        const currentWeek = getCurrentWeek();
        const filteredData = data.filter((obj) => {
          const objWeek = getWeekFromDate(obj.hora);
          return objWeek === currentWeek;
        });
        const newData = filteredData.map((item) => {
          const date = new Date(item.hora);
          const dayOfWeek = getDayOfWeek(date);
          return { ...item, dayOfWeek };
        });
        setChecadas(newData);
        console.log(newData);
      });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("rol")) {
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
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                  Detalles del empleado
                </h1>
              </div>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Información del empleado
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Detalles y información del empleado.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Nombre completo
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {customers.nombreCompleto}
                    </dd>
                  </div>
                  {/* <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Dirección
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {customers.direccion}
                                </dd>
                            </div> */}
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Teléfono
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {customers.telefono}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Correo electrónico
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {customers.correo}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Fecha de nacimiento
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {customers.fechaNacimiento}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Fecha de ingreso
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {customers.fechaIngreso}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Salario
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {customers.salarioBruto}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Cargo</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {customers.puesto}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Estado
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {customers.estado}
                    </dd>
                  </div>
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-12"  onClick={() => navigate(`/empleados/editar/${customers.idEmpleado}`)}>Editar</button>
                </dl>
              </div>
            </div>
            {/* horario de lunes a sabado */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Horario Registrado del empleado
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Horario del empleado.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
                  <div class="col-span-1">Dia</div>
                  <div class="col-span-1">Entrada</div>
                  <div class="col-span-1">Salida a Lunch</div>
                  <div class="col-span-1">Entrada de Lunch</div>
                  <div class="col-span-1">Salida</div>
                  {daysOfWeek.map((day) => (
                    <>
                      {checadas.map((horario) => (
                        <>
                          {horario.dayOfWeek === day ? (
                            <>
                              <dd className=" mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 ">
                                {day}
                              </dd>
                              <dd className=" mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 ">
                                {horario.tipoRegistro === "Entrada jornada"
                                  ? horario.hora
                                  : null}
                              </dd>
                              <dd className=" mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 ">
                                {horario.tipoRegistro === "Salida lunch"
                                  ? horario.hora
                                  : null}
                              </dd>
                              <dd className=" mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 ">
                                {horario.tipoRegistro === "Entrada lunch"
                                  ? horario.hora
                                  : null}
                              </dd>
                              <dd className=" mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 ">
                                {horario.tipoRegistro === "Salida jornada"
                                  ? horario.hora
                                  : null}
                              </dd>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ))}
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetallesEmpleado;
