import React, { useState } from "react";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";

const NominaReport = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [deduccionesImpuestos, setDeduccionesImpuestos] = useState(0);
  const [salarioNeto, setSalarioNeto] = useState(0);
  const [id, setId] = useState(0);

  const handleId = (event) => {
    setId(event.target.value);
  };

  const handleDeduccionesImpuestosChange = (event) => {
    setDeduccionesImpuestos(event.target.value);
  };

  const handleGenerateReport = async () => {
    const response = await axios.get(
      `http://localhost:3001/api/empleados/${id}`
    );

    setSalarioNeto(response.data.salarioBruto - deduccionesImpuestos);
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Reporte de Nómina", 14, 22);
    doc.setFontSize(14);
    // datos empleado
    doc.text("Empleado:", 14, 32);
    doc.text(`Nombre:\t ${response.data.nombreCompleto} \n`, 14, 42);
    doc.text(`Correo:\t ${response.data.correo}\n`, 14, 52);
    doc.text(`Teléfono:\t ${response.data.telefono}\n`, 14, 62);
    doc.text(
      `Fecha de Nacimiento:\t ${response.data.fechaNacimiento}\n`,
      14,
      72
    );
    doc.text(`Fecha de Ingreso: ${response.data.fechaIngreso}`, 14, 82);
    doc.text(`Cargo: ${response.data.puesto}`, 14, 92);
    doc.text("Ingresos:", 14, 102);
    doc.text(`Salario Bruto: $${response.data.salarioBruto}`, 20, 112);
    doc.text("Deducciones:", 14, 122);
    doc.text(`Impuestos: $${deduccionesImpuestos}`, 20, 132);
    doc.text("Total:", 14, 142);
    doc.text(`Salario Neto: $${salarioNeto}`, 20, 152);
    doc.save("reporte-nomina.pdf");
  };

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
        <div className="p-10">
          <div className="flex justify-between items-center mb-5">
            <label className="w-1/3 text-right font-bold">ID Empleado</label>
            <input
              className="w-1/3 border border-gray-500 p-2"
              type="number"
              value={id}
              onChange={handleId}
              placeholder="ID Empleado"
            />
          </div>

          <div className="flex justify-between items-center mb-5">
            <label className="w-1/3 text-right font-bold">
              Deducciones Impuestos
            </label>
            <input
              className="w-1/3 border border-gray-500 p-2"
              type="number"
              value={deduccionesImpuestos}
              onChange={handleDeduccionesImpuestosChange}
              placeholder="Deducciones Impuestos"
            />
          </div>

          <button
            onClick={handleGenerateReport}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded align-center"
          >
            Generar Reporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default NominaReport;
