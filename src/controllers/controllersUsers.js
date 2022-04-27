const { validationResult } = require("express-validator");
const path = require("path");
const bcrypt = require("bcryptjs");
const fs = require("fs");

module.exports = {
    login: (req, res) => {
        res.render(path.resolve(__dirname, "..", "views", "users", "login.ejs"));
    },

    register: (req, res) => {
        res.render(path.resolve(__dirname, "..", "views", "users", "register.ejs"));
    },

    registerPost: (req, res) => {
        //Obtenemos datos del archivo JSON
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "users.json")));

        //Creamos una variable donde almacenamos los errores encontrados en los datos ingresados
        let errors = validationResult(req);

        //Ahora verificamos si hay errores
        if(errors.isEmpty()){ // isEmpty() devuelve true en caso de estar vacía la variable y false en caso contrario.
            let newId = 0, userFind;

            // Comprobación de que el email no ha sido utilizado anteriormente.
            userFind = users.find(user => req.body.email == user.email);
            if (userFind != undefined) {
                errors.msg = "Email en uso, utilice otro";
                return res.render(path.resolve(__dirname, "..", "users", "register.ejs"), {errors: errors.msg});
            };

            do {
                newId++;
                userFind = users.find(user => newId == user.id);
            } while (userFind != undefined);// Comprovación de que el id de nuevo usuario no exista.

            //Creación de Usuario
            let newUser = {
                id: newId,
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            };

            //Agregamos el nuevo usuario a los demas 
            users.push(newUser);

            //Convertir arreglo en un string e indicamos que se guarde un usario bajo el otro "null, 2".
            let newUsersJson = JSON.stringify(users, null, 2);

            //Sobreescribimos el archivo JSON guardando el nuevo usuario.
            fs.writeFileSync(path.resolve(__dirname, "..", "data", "users.json"));

            //Redireccionamos al login para iniciar sesión
            return res.redirect("/login");
        } else {
            //De haber errores en el ingreso de datos renderizamos la pagina y mostramos los mismos.
            return res.render(path.resolve(__dirname, "..", "users", "register.ejs"), {errors: errors.errors});
        }
       
    }   
    
}
