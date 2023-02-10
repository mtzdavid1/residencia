import React from "react";
import { useNavigate } from "react-router-dom";

function CustomersTableItem(props) {
  const navigate = useNavigate();
  return (
    <tr
      className="hover:bg-slate-50 cursor-pointer"
      onClick={() => navigate(`/empleados/${props.id}`)}
    >
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap ">
        <div className="flex items-center">
          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
            <img
              className="rounded-full"
              src={props.image}
              width="40"
              height="40"
              alt={props.nombreCompleto}
            />
          </div>
          <div className="font-medium text-slate-800">
            {props.nombreCompleto}
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.FechaNacimiento}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{props.correoElectronico}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.telefono}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-sky-500">{props.estado}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center font-medium text-emerald-500">
          {props.fechaIngreso}
        </div>
      </td>
    </tr>
  );
}

export default CustomersTableItem;
