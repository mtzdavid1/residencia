import React, { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import UsersTable from "../components/UsersTable";
import PaginationClassic from "../components/PaginationClassic";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import swal from "@sweetalert/with-react";

function Usuarios() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  useEffect(() => {
    let rol = localStorage.getItem("rol");
    if (rol !== "Admin" && rol !== "IT") {
      swal("Error", "No tienes permisos para acceder a esta página", "error");
      navigate(-1);
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
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                  Usuarios ✨
                </h1>
              </div>

              <button
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white flex p-3 justify-center items-center "
                onClick={() => navigate("/it/usuarios/agregar")}
              >
                <svg
                  className="w-4 h-4 fill-current opacity-50 shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span className=" xs:block ml-2">Agregar usuario</span>
              </button>
            </div>

            {/* Table */}
            <UsersTable selectedItems={handleSelectedItems} />

            {/* Pagination */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Usuarios;
