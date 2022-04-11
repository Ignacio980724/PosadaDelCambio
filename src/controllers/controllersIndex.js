const path = require('path');

module.exports = {
    index: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'index.ejs'));
    },
    contactUs: (req, res) => {

        //Renderizamos la vista
        res.render(path.resolve(__dirname, "..", "views", "web", "contactUs.ejs"));
    },
    showMarket: (req, res) => {

        //Renderizamos la vista
        res.render(path.resolve(__dirname, "..", "views", "web", "market.ejs"));
    }

}