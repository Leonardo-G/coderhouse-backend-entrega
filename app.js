const express = require("express");
const path = require("path");
const connectMongo = require("./db/config");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const port = process.env.PORT || 8000;

connectMongo();

app.use(bodyParser.urlencoded());

app.use(express.static("public"));

app.set("views", path.join("./views"));
app.set("view engine", "pug");

app.use("/", require("./routes/view"));
app.use("/auth", require("./routes/auth"));

app.listen(port, () => {
    console.log("Servidor iniciado en", port);
});