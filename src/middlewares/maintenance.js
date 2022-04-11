const path = require("path");

module.exports = (req, res, next) => {

    //renderizamos la vista de la pagina que esta en mantenimiento
    return res.render(path.resolve(__dirname, "..", "views", "web", "maintenance.ejs"));
}