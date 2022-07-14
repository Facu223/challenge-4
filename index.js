require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Conexion a base de datos realizada con exito");
  })
  .catch((err) => console.log(err));

const companiesRouter = require("./routes/companiesRoutes")
const usersRouter = require("./routes/usersRoutes")
app.use(express.json())
app.use(companiesRouter)
app.use(usersRouter)

app.listen(PORT, HOST, () => {
  console.log(`Corriendo servidor en http://${HOST}:${PORT}`);
});
