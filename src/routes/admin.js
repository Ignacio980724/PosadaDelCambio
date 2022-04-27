//Seteo del entrono del archivo para crear la ruta

const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

//Asignamos nombre del archivo y donde lo vamos a guardar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (req.body.category == "cards" ) {
            cb(null, path.resolve(__dirname, "..", "..", "public", "images", "cards"));  
        } else {
            cb(null, path.resolve(__dirname, "..", "..", "public", "images", "mangas"));   
        }
    },
    filename: (req, file, cb) => {
        cb(null, "card-" + Date.now() + path.extname(file.originalname));
        //Path.extname: obtiene la extension del archivo. file: es donde estan todos los datos del archivo que viaja desde el front hacia el back. originalname: es el nombre original del archivo.
    }

});
const upload = multer({storage: storage});

//Requerimos el controlador 

const controllersAdmin = require(path.resolve(__dirname, "..", "controllers", "controllersAdmin.js"));

//Creacion de Rutas

router.get("/admin", controllersAdmin.admin);
router.get("/edit/:id", controllersAdmin.edit);
router.get("/create", controllersAdmin.create);
router.post("/save", upload.any("img"), controllersAdmin.save);
router.get("/delete/:id", controllersAdmin.delete);
router.put("/edit/:id", upload.any("img"), controllersAdmin.update);

//Exportamos el modulo

module.exports = router;