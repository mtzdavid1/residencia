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
    if (err) {
      console.log(err);
      res.send({
        error: err,
      });
    } else {
      res.send(result);
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
    horarioEntrada,
    horarioSalida,
    horarioSalidaLunch,
    horarioEntradaLunch,
  } = req.body;

  const agregarEmpleado =
    "INSERT INTO empleados (nombreCompleto, fechaNacimiento, correo, telefono, estado, puesto, salarioBruto, salarioNeto, salarioDiario, horasLaborales, fechaIngreso, horarioEntrada, horarioSalida, horarioSalidaLunch, horarioEntradaLunch) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
      horarioEntrada,
      horarioSalida,
      horarioSalidaLunch,
      horarioEntradaLunch,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.send("valores Insertados");
      }
    }
  );
});

//fetch empleado by id
// GET EMPLOYEE BY ID
app.get("/api/empleados/:id", (req, res) => {
  const id = req.params.id; // Get id from parameters
  const obtenerEmpleado = "SELECT * FROM empleados WHERE idEmpleado = ?"; // SQL query
  db.query(obtenerEmpleado, id, (err, result) => {
    // Execute query
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    } else {
      if (result.length === 0) {
        res.status(404).send("Not found");
      } else {
        res.send(result[0]);
      }
    }
  });
});

// GET EMPLOYEE BY ID
app.get("/api/empleados/:id", (req, res) => {
  const id = req.params.id;
  const obtenerEmpleado = "SELECT * FROM empleados WHERE idEmpleado = ?";
  db.query(obtenerEmpleado, id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    } else {
      if (result.length === 0) {
        res.status(404).send("Not found");
      } else {
        res.send(result[0]);
      }
    }
  });
});

//insertar en tabla checadas y llamar el sp registrar_checada(?,?)
app.post("/api/empleados/checadas", (req, res) => {
  const idString = req.body.id;
  const id = parseInt(idString);
  const jornada = req.body.jornada;

  if (id && jornada) {
    const insertarChecada = "CALL registrar_checada(?,?)";
    db.query(insertarChecada, [id, jornada], (err, result) => {
      if (err) {
        res.status(500).send("Internal Server Error");
      } else {
        res.send(result);
      }
    });
  } else {
    res.status(400).send("Bad Request");
  }
});

//login

app.post("/api/empleados/login", (req, res) => {
  const { usuario, contraseña } = req.body;

  if (!usuario || !contraseña) {
    res.status(400).send("Missing username or password");
    return;
  }

  const login = "SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?";
  db.query(login, [usuario, MD5(contraseña)], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error logging in");
      return;
    }

    if (result.length > 1) {
      console.log("Multiple users found with the same username and password");
      res.status(500).send("Error logging in");
      return;
    }

    if (result.length === 0) {
      res.status(401).send("Invalid username or password");
      return;
    }

    res.send(result);
  });
});

app.get("/api/empleados/checadas/:id", (req, res) => {
  const id = req.params.id;
  const obtenerChecadas = "SELECT * FROM checadas WHERE idEmpleado = ?";

  db.query(obtenerChecadas, id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al obtener las checadas");
    } else {
      res.send(result);
    }
  });
});
//Update

app.put("/api/editar/empleados/:id", (req, res) => {
  const { id } = req.params;
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
    horarioEntrada,
    horarioSalida,
    horarioSalidaLunch,
    horarioEntradaLunch,
  } = req.body;

  console.log(req.body);
  console.log(id);

  const editarEmpleado =
    "UPDATE empleados SET nombreCompleto = ?, fechaNacimiento = ?, correo = ?, telefono = ?, estado = ?, puesto = ?, salarioBruto = ?, salarioNeto = ?, salarioDiario = ?, horasLaborales = ?, fechaIngreso = ?, horarioEntrada = ?, horarioSalida = ?, horarioSalidaLunch = ?, horarioEntradaLunch = ? WHERE idEmpleado = ?";
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

      horarioEntrada,
      horarioSalida,
      horarioSalidaLunch,
      horarioEntradaLunch,
      id,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send("Error al editar el empleado");
      } else {
        res.send(result);
      }
    }
  );
});

//delete

app.delete("/api/empleados/:id", (req, res) => {
  const id = req.params.id;
  const eliminarEmpleado = "DELETE FROM empleados WHERE idEmpleado = ?";

  db.query(eliminarEmpleado, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.affectedRows > 0) {
        res.send("El empleado se elimino correctamente");
      } else {
        res.send("No existe un empleado con ese ID");
      }
    }
  });
});

//get all usuarios

app.get("/api/usuarios", (req, res) => {
  const obtenerUsuarios = "SELECT * FROM usuarios";

  db.query(obtenerUsuarios, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al obtener los usuarios");
    } else {
      res.send(result);
    }
  });
});

// add usuarios

app.post("/api/usuarios", (req, res) => {
  const { usuario, contraseña, rol } = req.body;

  if (!usuario || !contraseña) {
    res.status(400).send("Missing username or password");
    return;
  }

  const insertarUsuario =
    "INSERT INTO usuarios (usuario, contraseña, rol) VALUES (?, ?, ?)";
  db.query(insertarUsuario, [usuario, MD5(contraseña), rol], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al insertar el usuario");
    } else {
      res.send(result);
    }
  });
});

//delete usuarios

app.delete("/api/usuarios/:id", (req, res) => {
  const id = req.params.id;
  const eliminarUsuario = "DELETE FROM usuarios WHERE idUsuario = ?";

  db.query(eliminarUsuario, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.affectedRows > 0) {
        res.send("El usuario se elimino correctamente");
      } else {
        res.send("No existe un usuario con ese ID");
      }
    }
  });
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
