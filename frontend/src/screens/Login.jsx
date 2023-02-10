import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import Image from "../assets/images/login-image.jpg";
import axios from "axios";
import { useForm } from "../hooks/formHook";
import swal from "@sweetalert/with-react";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { values, handleInputChange, reset } = useForm({
    usuario: 0,
    contraseña: "",
  });

  useEffect(() => {
    if (localStorage.getItem("rol")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/empleados/login", values)
      .then((res, err) => {
        if (!res.data[0]) {
          swal("Error", "Usuario o contraseña incorrectos", "error");
        } else {
          localStorage.setItem("rol", res.data[0].rol);
          localStorage.setItem("usuario", res.data[0].usuario);
          swal(
            "Bienvenido",
            "Has iniciado sesión correctamente",
            "success"
          ).then(() => {
            navigate("/");
          });
        }
      });
  };

  return (
    <div class="w-full flex flex-wrap">
      <div class="w-full md:w-1/2 flex flex-col">
        <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
          <a
            href="https://www.waterberrydev.com"
            target={"_blank"}
            class="bg-black text-white font-bold text-xl p-4 rounded-full"
          >
            {/* <img
              src={require("../images/waterberry-icono-blanco.png")}
              alt="logo"
              className="w-10 h-10"
            /> */}
          </a>
        </div>

        <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p class="text-center text-3xl">Welcome.</p>
          <form
            class="flex flex-col pt-3 md:pt-8"
            onsubmit="event.preventDefault();"
          >
            <div class="flex flex-col pt-4">
              <label for="email" class="text-lg">
                Usuario
              </label>
              <CustomInput
                forLabel={"Usuario"}
                id="usuario"
                type={"text"}
                onChange={handleInputChange}
              />
            </div>

            <div class="flex flex-col pt-4 ">
              <label for="password" class="text-lg">
                Contraseña
              </label>
              <CustomInput
                id="contraseña"
                type={"password"}
                onChange={handleInputChange}
              />
            </div>

            <button
              className=" 
              bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8
            "
              onClick={handleSubmit}
            >
              <span className="">Login</span>
            </button>
          </form>
        </div>
      </div>

      <div class="w-1/2 shadow-2xl">
        <img class="object-cover w-full h-screen hidden md:block" src={Image} />
      </div>
    </div>
  );
};

export default Login;
