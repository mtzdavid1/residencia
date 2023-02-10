const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const MD5 = require("md5");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3001;

/********************************************************* */
// aqui van los datos de la bd
/********************************************************* */

const db = mysql.createPool({
  //
  host: "localhost", //Aqui va la direccion de la bd ------> asi dejenlo como esta
  user: "root", //Aqui va el usuario de la bd asi ------> dejenlo como esta
  password: "", //Aqui va la contraseña de la bd ------> asi dejenlo como esta
  database: "vox", //Aqui va el nombre de la bd
});

/********************************************************* */
// Aqui se dan de alta las rutas del api con las querys
/********************************************************* */

/********************************************************* */
/************************ empleados *********************** */
/********************************************************* */

// obtener todos los usuarios
app.get("/api/empleados", (req, res) => {
  console.log(req.body);
  const obtenerUsuarios = "SELECT * FROM empleados";
  db.query(obtenerUsuarios, (err, result) => {
    res.send(result);
    if (err) {
      console.log(err);
    }
  });
});

//agrregar un empleado

app.post("/api/empleados", (req, res) => {
  const {
    nombreCompleto,
    FechaNacimiento,
    correoElectronico,
    telefono,
    estado,
    puesto,
    salarioBruto,
    salarioNeto,
    salarioDiario,
    horasLaborales,
    fechaIngreso,
  } = req.body;

  const agregarEmpleado =
    "INSERT INTO empleados (nombreCompleto, fechaNacimiento, correo, telefono, estado, puesto, salarioBruto, salarioNeto, salarioDiario, horasLaborales, fechaIngreso) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    agregarEmpleado,
    [
      nombreCompleto,
      FechaNacimiento,
      correoElectronico,
      telefono,
      estado,
      puesto,
      salarioBruto,
      salarioNeto,
      salarioDiario,
      horasLaborales,
      fechaIngreso,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("valores Insertados");
      }
    }
  );
});

//fetch empleado by id
app.get("/api/empleados/:id", (req, res) => {
  const id = req.params.id;
  const obtenerEmpleado = "SELECT * FROM empleados WHERE idEmpleado = ?";
  db.query(obtenerEmpleado, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0]);
    }
  });
});

//insertar en tabla checadas y llamar el sp registrar_checada(?,?)
app.post("/api/empleados/checadas", (req, res) => {
  const idString = req.body.id;
  const id = parseInt(idString);
  const jornada = req.body.jornada;

  console.log(id);

  const insertarChecada = "CALL registrar_checada(?,?)";
  db.query(insertarChecada, [id, jornada], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//login

app.post("/api/empleados/login", (req, res) => {
  const usuario = req.body.usuario;
  const contraseña = req.body.contraseña;

  const login = "SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?";
  db.query(login, [usuario, MD5(contraseña)], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/empleados/checadas/:id", (req, res) => {
  const id = req.params.id;
  const obtenerChecadas = "SELECT * FROM checadas WHERE idEmpleado = ?";

  db.query(obtenerChecadas, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//Update

app.put("/api/editar/empleados/:id", (req, res) => {
  const {
    nombreCompleto,
    FechaNacimiento,
    correoElectronico,
    telefono,
    estado,
    puesto,
    salarioBruto,
    salarioNeto,
    salarioDiario,
    horasLaborales,
    fechaIngreso,
  } = req.body;

  const editarEmpleado =
    "UPDATE empleados (nombreCompleto, fechaNacimiento, correo, telefono, estado, puesto, salarioBruto, salarioNeto, salarioDiario, horasLaborales, fechaIngreso) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    editarEmpleado,
    [
      nombreCompleto,
      FechaNacimiento,
      correoElectronico,
      telefono,
      estado,
      puesto,
      salarioBruto,
      salarioNeto,
      salarioDiario,
      horasLaborales,
      fechaIngreso,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Valores Actualizados");
      }
    }
  );
});


/********************************************************* */
//                         TEST
/********************************************************* */
app.get("/", (req, res) => {
  res.send("hola");
});

app.listen(PORT, (err) => {
  console.log("Server is running on port 3001");
  if (err) {
    console.log(err);
  }
});
