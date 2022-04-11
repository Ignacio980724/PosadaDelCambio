const path = require("path");

module.exports = {
    login: (req, res) => {
        res.render(path.resolve(__dirname, "..", "views", "users", "login.ejs"));
    },
    register: (req, res) => {
        res.render(path.resolve(__dirname, "..", "views", "users", "register.ejs"));
    }
}
