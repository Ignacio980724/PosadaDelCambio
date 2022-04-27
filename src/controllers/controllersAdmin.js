//Requerimos path

const res = require("express/lib/response");
const path = require("path");
const fs = require("fs");

//Exportamos el modulo

module.exports = {
    admin: (req, res) => {

        //Obtención de datos del archivo JSON
        let cards = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "cards.json")));

        let mangas = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "mangas.json")));

        //Renderizamos la vista
        res.render(path.resolve(__dirname, "..", "views", "admin", "admin.ejs"), {cards, mangas}); //se renderiza solo una vez la pagina que quiero mostrar y envio dentro de las llaves todas las variables necesarias de la informacion que quiero mostrar separadas con comas (,)
    },
    edit: (req, res) => {

        //Obtenención del archivo JSON
        let cards = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "cards.json")));

        //let mangas = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "mangas.json")));


        //Guardamos el producto a editar
        const cardEditId = req.params.id;
        //const mangaEditId = req.params.id;

        //Buscamos en el arreglo original el producto a editar
        const editCard = cards.find(card => card.id == cardEditId);
        //const editManga = manga.find(manga => manga.id == mangaEditId);

        //Renderizamos la vista
        res.render(path.resolve(__dirname, "..", "views", "admin", "edit.ejs"), {editCard});
        //res.render(path.resolve(__dirname, "..", "views", "admin", "edit.ejs"), {editManga});

    },
    create: (req, res) => {

        //Renderizamos la vista 

        res.render(path.resolve(__dirname, "..", "views", "admin", "create.ejs")); 

    },
    save: (req, res) => {
        //Obtención de datos del archivo JSON
        let cards = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "cards.json")));

        let mangas = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "mangas.json")));

        //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA " + req.body.category); comprobación de como viaja la información

        switch (req.body.category) {
            case "cards":
                //Aqui se indica el formato de como se va a guardar la información    
            
                let newCard  = {
                    id: req.body.id,
                    category: req.body.category,
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

                break;
            case "mangas":
                //Aqui se indica el formato de como se va a guardar la información    
            
                let newManga  = {
                    id: req.body.id,
                    category: req.body.category,
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    img: req.files[0].filename
                }

                //Agregamos al arreglo el nuevo producto
                mangas.push(newManga);
                
                //Convertimos el arreglo en un String e indicamos que se guarde un producto bajo el otro con "null, 2"
                let newMangasJson = JSON.stringify(mangas, null, 2);

                //Sobreescribimos el archivo json guardando el nuevo producto
                fs.writeFileSync(path.resolve(__dirname, "..", "data", "mangas.json"), newMangasJson);

                break;

            default:
                break;
        }

        //Aqui se indica el formato de como se va a guardar la información
    
       /* let newCard  = {
            id: req.body.id,
            category: req.body.category,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            img: req.files[0].filename
        }*/
        
        //Agregamos al arreglo el nuevo producto
        //cards.push(newCard);
        
        //Convertimos el arreglo en un String e indicamos que se guarde un producto bajo el otro con "null, 2"
        //let newCardsJson = JSON.stringify(cards, null, 2);
        
        //Sobreescribimos el archivo json guardando el nuevo producto
        //fs.writeFileSync(path.resolve(__dirname, "..", "data", "cards.json"), newCardsJson);

        //Redireccionamos a la vista del administrador
        res.redirect("/admin");
    },
    delete: (req, res) => {
        //Obtencion de datos del archivo JSON 
        let cards = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "cards.json")));

        //let mangas = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "mangas.json")));


        //Guardamos el producto a borrar
        const cardDeleteId = req.params.id;
        //const mangaDeleteId = req.params.id;

        //Buscamos el nombre de la imagen derl producto a eliminar
        const imgCardDelete = cards.find(card => card.id == cardDeleteId);
        //const imgMangaDelete = mangas.find(manga => manga.id == mangaDeleteId);

        //Eliminamos la imagen 
        try {
            fs.unlinkSync(path.resolve(__dirname, "..", "..", "public", "images", "cards", imgCardDelete.img));
            console.log("Imagen removida: " + imgCardDelete.img);

           // fs.unlinkSync(path.resolve(__dirname, "..", "..", "public", "images", "mangas", imgMangaDelete.img));
            //console.log("Imagen removida: " + imgMangaDelete.img);

        } catch(err) {
            console.error("Sucedio algo malo al remover el archivo", err);
        };

        //Filtramos el arreglo original para eliminar el producto a borrar
        const filteredCards = cards.filter(card => card.id != cardDeleteId);
        //const filteredMangas = mangas.filter(manga => manga.id != mangaDeleteId);

        //sE CONVIERTE EL ARREGLO EN UN STRING Y SE INDICA QUE UN PRODUCTO SE GUARDA BAJO EL OTRO CON NULL, 2.
        let cardsToSave = JSON.stringify(filteredCards, null, 2);
        //let mangasToSave = JSON.stringify(filteredMangas, null, 2); 
        
        //Se sobreescribe el archivo JSON
        fs.writeFileSync(path.resolve(__dirname, "..", "data", "cards.json"), cardsToSave);
        //fs.writeFileSync(path.resolve(__dirname, "data", "mangas.json"), mangasToSave);

        //Redireccionamos a la vista
        res.redirect("/admin");
    },

    update: (req, res) => {
        //Obtención de datos del archivo JSON
        let cards = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "cards.json")));

        //let mangas = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data", "mangas.json")));

        //Utilizamos un if ternario para saber si se a enviado una nueva imagen si esta llegando una nueva imagen en el req.file =>(entonces"=>") guardar el nombre nuevo.En caso que no haya entrado nada se mantiene la misma imagen anterior.
        req.body.img = req.files[0] ? req.files[0].filename : req.body.img;

        //Actualizamos el producto en la lista
        let cardsUpdate = cards.map(card => {
            if(card.id == req.body.id){
                card = req.body;
            };
            return card;
        });

        //let mangasUpdate = mangas.map(manga =>{
          //  if(manga.id == req.body.id){
            //    manga = req.body;
           // };
           // return manga;
       // })
        
        //Convertimos el arreglo en un String e indicamos que se guarde un producto bajo el otro con "null, 2"
        let cardsToSave = JSON.stringify(cardsUpdate, null, 2);
        //let mangasToSave = JSON.stringify(mangasUpdate, null, 2);
        
        //Sobreescribimos el archivo json guardando el nuevo producto
        fs.writeFileSync(path.resolve(__dirname, "..", "data", "cards.json"), cardsToSave);
        //fs.writeFileSync(path.resolve(__dirname, "..", "data", "mangas.json"), mangasToSave);

        //Redireccionamos a la vista del administrador
        res.redirect("/admin");
    }

}