//Requerimos path

const res = require("express/lib/response");
const path = require("path");
const fs = require("fs");

//Exportamos el modulo

module.exports = {
    admin: (req, res) => {

        //Obtención de datos del archivo JSON
        let cards = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "cards.json")));

        //Renderizamos la vista
        res.render(path.resolve(__dirname, "..", "views", "admin", "admin.ejs"), {cards});
    },
    edit: (req, res) => {

        //Obtenención del archivo JSON
        let cards = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "cards.json")));

        //Guardamos el producto a editar
        const cardEditId = req.params.id;
        
        //Buscamos en el arreglo original el producto a editar
        const editCard = cards.find(card => card.id == cardEditId);

        //Renderizamos la vista
        res.render(path.resolve(__dirname, "..", "views", "admin", "edit.ejs"), {editCard});
    },
    create: (req, res) => {

        //Renderizamos la vista 

        res.render(path.resolve(__dirname, "..", "views", "admin", "create.ejs"));
    },
    save: (req, res) => {
        //Obtención de datos del archivo JSON
        let cards = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "cards.json")));

        //Aqui se indica el formato de como se va a guardar la información
        let newCard = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            img: req.files[0].filename
        }

        //Agregamos al arreglo el nuevo producto
        cards.push(newCard);
        
        //Convertimos el arreglo en un String e indicamos que se guarde un producto bajo el otro con "null, 2"
        let newCardsJson = JSON.stringify(cards, null, 2);
        
        //Sobreescribimos el archivo json guardando el nuevo producto
        fs.writeFileSync(path.resolve(__dirname, "..", "data", "cards.json"), newCardsJson);

        //Redireccionamos a la vista del administrador
        res.redirect("/admin");
    },
    delete: (req, res) => {
        //Obtencion de datos del archivo JSON 
        let cards = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "cards.json")));

        //Guardamos el producto a borrar
        const cardDeleteId = req.params.id;

        //Buscamos el nombre de la imagen derl producto a eliminar
        const imgCardDelete = cards.find(card => card.id == cardDeleteId);

        //Eliminamos la imagen 
        try {
            fs.unlinkSync(path.resolve(__dirname, "..", "..", "public", "images", "cards", imgCardDelete.img));
            console.log("Imagen removida: " + imgCardDelete.img);
        } catch(err) {
            console.error("Sucedio algo malo al remover el archivo", err);
        };

        //Filtramos el arreglo original para eliminar el producto a borrar
        const filteredCards = cards.filter(card => card.id != cardDeleteId);

        //sE CONVIERTE EL ARREGLO EN UN STRING Y SE INDICA QUE UN PRODUCTO SE GUARDA BAJO EL OTRO CON NULL, 2.
        let cardsToSave = JSON.stringify(filteredCards, null, 2);
        
        //Se sobreescribe el archivo JSON
        fs.writeFileSync(path.resolve(__dirname, "..", "data", "cards.json"), cardsToSave);

        //Redireccionamos a la vista
        res.redirect("/admin");
    },

    update: (req, res) => {
        //Obtención de datos del archivo JSON
        let cards = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "cards.json")));

        //Utilizamos un if ternario para saber si se a enviado una nueva imagen si esta llegando una nueva imagen en el req.file =>(entonces"=>") guardar el nombre nuevo.En caso que no haya entrado nada se mantiene la misma imagen anterior.
        req.body.img = req.files[0] ? req.files[0].filename : req.body.img;

        //Actualizamos el producto en la lista
        let cardsUpdate = cards.map(card => {
            if(card.id == req.body.id){
                card = req.body;
            };
            return card;
        })
        
        //Convertimos el arreglo en un String e indicamos que se guarde un producto bajo el otro con "null, 2"
        let cardsToSave = JSON.stringify(cardsUpdate, null, 2);
        
        //Sobreescribimos el archivo json guardando el nuevo producto
        fs.writeFileSync(path.resolve(__dirname, "..", "data", "cards.json"), cardsToSave);

        //Redireccionamos a la vista del administrador
        res.redirect("/");
    }

}