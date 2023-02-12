import React from "react";
import { useNavigate } from "react-router-dom";

function UserTableItem(props) {
  const navigate = useNavigate();
  return (
    <tr className="hover:bg-slate-50 ">
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap ">
        <div className="flex items-center">
          <div className="font-medium text-slate-800">
            {props.nombreCompleto}
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">*********************</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{props.correoElectronico}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => props.handleDelete(props.id)}
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}

export default UserTableItem;
