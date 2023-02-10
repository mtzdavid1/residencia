import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/formHook";
import CustomSelect from "../components/CustomSelect";
import Image from "../assets/images/login-image.jpg";
import CustomInput from "../components/CustomInput";
import axios from "axios";
import swal from "@sweetalert/with-react";

const AddPunch = () => {
  const { values, handleInputChange, reset } = useForm({
    id: 0,
    jornada: "",
  });

  const data = [
    { value: "1", nombre: "Entrada jornada" },
    { value: "2", nombre: "Salida lunch" },
    { value: "3", nombre: "Entrada lunch" },
    { value: "4", nombre: "Salida jornada" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:3001/api/empleados/checadas", values)
      .then((res) => {
        swal(
          "Checada registrada",
          "La checada se ha registrado correctamente",
          "success"
        );
        window.location.reload();
      })
      .catch((err) => {
        swal("Error", "Ha ocurrido un error al registrar la checada", "error");
      });
  };

  return (
    <div className="w-full flex flex-wrap">
      <div className="w-1/2 shadow-2xl">
        <img
          className="object-cover w-full h-screen hidden md:block"
          src={Image}
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col bg-main-dark-bg">
        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <img
            src="https://voxcentrix.com/wp-content/uploads/2021/11/logo2022voxcentrix-04-e1637590832492.png"
            alt="logo"
            className=""
          />
          <form
            className="flex flex-col pt-3 md:pt-8 gap-2"
            onsubmit="event.preventDefault();"
          >
            <CustomInput
              title="ID Empleado"
              type="number"
              id="id"
              onChange={handleInputChange}
            />
            <CustomSelect
              data={data}
              title="Seleccionar Jornada a registrar"
              onChange={handleInputChange}
              name="jornada"
            />
            <button
              className="btn-primary mt-20 border-2 border-white p-2 rounded-md hover:bg-white hover:text-black text-white font-bold"
              onClick={handleSubmit}
            >
              <span className="">Registrar </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPunch;
