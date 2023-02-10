import React from "react";
import { Route, Routes } from "react-router-dom";
import AddPunch from "../screens/AddPunch";
import AgregarEmpleado from "../screens/AgregarEmpleado";
import Dashboard from "../screens/Dashboard";
import DetallesEmpleado from "../screens/DetallesEmpleado";
import NominaReport from "../screens/GenerarReporte";
import Login from "../screens/Login";
import Nominas from "../screens/Nominas";
import EditarEmpleado from "../screens/EditarEmpleado"
const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/nominas" element={<Nominas />} />
      <Route path="/empleados/agregar" element={<AgregarEmpleado />} />
      <Route path="/empleados/:id" element={<DetallesEmpleado />} />
      <Route path="/addpunch" element={<AddPunch />} />
      <Route path="/nominas/generar-reporte" element={<NominaReport />} />
      <Route path="/empleados/editar/:id" element={<EditarEmpleado />} />

    </Routes>
  );
};

export default Router;
