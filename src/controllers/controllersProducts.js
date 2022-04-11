const path = require("path");
const fs = require("fs");

module.exports = {
    show: (req,res) => {
        res.render(path.resolve(__dirname, "..", "views", "products", "product.ejs"));
    },
    cards: (req,res) => {
        //Obtención de datos del archivo JSON
        let cards = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "cards.json")));

        res.render(path.resolve(__dirname, "..", "views", "products", "cards.ejs"), {cards});
    }
}