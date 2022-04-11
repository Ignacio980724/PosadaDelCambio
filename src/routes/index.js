//Seteo del entrono del archivo para crear la ruta

const express = require("express");
const router = express.Router();
const path = require("path");

// Requerimiento del Controlador
const controllersIndex = require(path.resolve(__dirname, "..", "controllers", "controllersIndex.js" ));

//Creacion de las rutas
router.get("/", controllersIndex.index);
router.get("/contactUs", controllersIndex.contactUs);
router.get("/market", controllersIndex.showMarket);

//Exportamos el modulo
module.exports = router;