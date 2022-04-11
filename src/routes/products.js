//Seteo del entrono del archivo para crear la ruta
const express = require("express");
const router = express.Router();
const path = require("path");

//Requerimos el controlador
const controllersProducts = require(path.resolve(__dirname, "..", "controllers", "controllersProducts.js"));

//Creamos Rutas
router.get("/product", controllersProducts.show);
router.get("/cards", controllersProducts.cards);


//Exportamos el modulo
module.exports = router;