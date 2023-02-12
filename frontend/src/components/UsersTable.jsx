import React, { useState, useEffect } from "react";
import UserTableItem from "./UserTableItem";
import Image01 from "../images/user-40-01.jpg";
import axios from "axios";
import swal from "@sweetalert/with-react";

function UsersTable({ selectedItems }) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/usuarios").then((res) => {
      setCustomers(res.data);
      setList(res.data);
    });
  }, []);

  const [list, setList] = useState([]);

  const handleDelete = (id) => {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:3001/api/usuarios/${id}`);
        swal("Registro eliminado", {
          icon: "success",
        }).then(() => {
          setCustomers(
            customers.filter((customer) => customer.idUsuario !== id)
          );
        });
      } else {
        swal("Registro no eliminado");
      }
    });
  };

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
                  customer.usuario
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
                  <div className="font-semibold text-left">Usuario</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">contraseña</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Rol</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Acciones</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {customers.map((customer) => {
                return (
                  <UserTableItem
                    key={customer.idUsuario}
                    id={customer.idUsuario}
                    nombreCompleto={customer.usuario}
                    FechaNacimiento={customer.contraseña}
                    correoElectronico={customer.rol}
                    handleDelete={handleDelete}
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

export default UsersTable;
