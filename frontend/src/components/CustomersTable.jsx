import React, { useState, useEffect } from "react";
import Customer from "./CustomersTableItem";
import Image01 from "../images/user-40-01.jpg";
import axios from "axios";

function CustomersTable({ selectedItems }) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/empleados").then((res) => {
      setCustomers(res.data);
    });
  }, []);

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map((li) => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

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
