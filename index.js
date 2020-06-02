"use strict";

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");
//Inicializaciones
const app = express();

//Configuraciones
dotenv.config();
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./config/handlebars"),
  })
);
app.set("view engine", ".hbs");

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas
app.use(require("./routes/index"));

//Carpeta Pública donde estarán los .css .js .png .jpg
app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"), () => {
  console.log(`Servidor ejecutándose por el puerto ${app.get("port")}`);
});
