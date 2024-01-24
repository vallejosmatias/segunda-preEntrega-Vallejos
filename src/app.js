import express from "express";
import dotenv from "dotenv";
import { __dirname } from "./utils.js";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import cartsRouter from "./routes/carts.route.js";
import productsRouter from "./routes/products.route.js";
import viewsRouter from "./routes/views.route.js";
dotenv.config();

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Base de datos conectada", DB_URL);
  })
  .catch((error) => {
    console.log("La conexion a fallado", error);
  });
