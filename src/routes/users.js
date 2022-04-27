//Seteo del entorno del archivo para crear la ruta
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");

//Requerimiento de paquete express-validator. Al ser varios paramentros lo almacenamos en un objeto literal.
const {
    check, //Parametro indicador si nuestros parametros tienen o no algun tipo de detalle.
    validationResult, //Almacena los errores que pueden existir.
    body //guarda el dato que estaria viajando desde nuestro formulario.
} = require("express-validator");

//Requerimiento del controlador
const controllersUsers = require(path.resolve(__dirname, "..", "controllers", "controllersUsers.js"));

//Requerimiento de nuestros usuarios registrados.
let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "users.json")));

//Creación de las rutas
router.get("/login", controllersUsers.login);
router.get("/register", controllersUsers.register);
router.post("/registerP", [
    check("name").isLength({min: 3}).withMessage("El nombre debe tener 3 o más caracteres."),
    check("last-name").isLength({min: 3}).withMessage("El apellido debe tener 3 o más caracteres."),
    check("email").isEmail().withMessage("Ingresar email valido"),
    check("password").isLength({min: 8}).withMessage("La contraseña debe ser de 8 o más caracteres"),
    body("password2").custom((value, {req}) => {
        if (value == req.body.password) {
            return true;
        };
        return false;
    }).withMessage("Las contraseñas no coinciden.")
], controllersUsers.registerPost);
//"name", "email", etc. son los identificadores de los input de donde sacamos esa informacion que va en los formularios.
//check se encarga de tomar el valor que se almacena en el input con el nombre que aparece entre parentesis y luego se ejecutan los comandos adicionales. isLength() determina el minimo o maximo de caracteres que tiene que tener. isEmail() verifica que sea un formato de correo eectronico. Y por ultimo withMessege() se encarga de enviar el mensaje que se mostrara en caso de error en los datos ingresados.

//Exportamos el modulo
module.exports = router;
