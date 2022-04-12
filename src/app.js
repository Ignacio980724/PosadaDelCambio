var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Requerimos Rutas
const indexRouter = require('./routes/index');
const adminRouter = require ("./routes/admin");
const usersRouter = require('./routes/users');
const productsRouter = require ("./routes/products");

//Requerimos los middlewors
var maintenance = require ("./middlewares/maintenance");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "..", "public")));

// Implementación de las rutas
app.use(indexRouter);
app.use(adminRouter);
app.use(usersRouter);
app.use(productsRouter);


//Implimentando los middlewors
app.use(maintenance);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Definimos puerto del Servidor
app.listen(3000, "localhost", ()=> console.log("Puerto del Servior: localhost:3000"));

module.exports = app;
