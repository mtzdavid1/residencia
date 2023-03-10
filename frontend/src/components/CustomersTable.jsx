import React, { useState, useEffect } from "react";
import Customer from "./CustomersTableItem";
import Image01 from "../images/user-40-01.jpg";
import axios from "axios";

function CustomersTable({ selectedItems }) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/empleados").then((res) => {
      setCustomers(res.data);
      setList(res.data);
    });
  }, []);

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">
          Empleados{" "}
          <span className="text-slate-400 font-medium">{customers.length}</span>
        </h2>
        {/* input de buscar */}
        <div className="relative mt-4">
          <input
            type="text"
            className="w-full border border-slate-200 rounded-sm px-4 py-2 focus:outline-none focus:border-slate-300"
            placeholder="Buscar"
            onChange={(e) => {
              setCustomers(
                customers.filter((customer) =>
                  customer.nombreCompleto
                    .toLowerCase()
                    .includes(e.target.value?.toLowerCase())
                )
              );

              if (e.target.value === "") {
                setCustomers(list);
              }
            }}
          />

          <svg
            className="absolute top-0 right-0 w-4 h-4 text-slate-400 mt-3 mr-3"
            viewBox="0 0 16 16"
          >
            <path d="M15.7 14.3l-3.8-3.8A5.9 5.9 0 0 0 13 6.5 6 6 0 1 0 6.5 13a5.9 5.9 0 0 0 4.2-1.7l3.8 3.8a.5.5 0 0 0 .7-.7zM1 6.5A5.5 5.5 0 1 1 6.5 12 5.5 5.5 0 0 1 1 6.5z" />
          </svg>
        </div>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Nombre completo</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    Fecha nacimiento
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Correo Electronico</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Telefono</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Estado</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Fecha ingreso</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {customers.map((customer) => {
                return (
                  <Customer
                    key={customer.idEmpleado}
                    id={customer.idEmpleado}
                    image={Image01}
                    nombreCompleto={customer.nombreCompleto}
                    FechaNacimiento={customer.fechaNacimiento}
                    correoElectronico={customer.correo}
                    telefono={customer.telefono}
                    estado={customer.estado}
                    fechaIngreso={customer.fechaIngreso}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(customer.id)}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomersTable;
