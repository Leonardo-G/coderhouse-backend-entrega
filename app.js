const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const connectMongo = require("./db/config");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const port = process.env.PORT || 8000;

connectMongo();

app.use(session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL_DATABASE, ttl: 60 * 10}),
    secret: "SECRET",
    resave: true,
    saveUninitialized: false
}))

app.use(bodyParser.urlencoded());

app.use(express.static("public"));

app.set("views", path.join("./views"));
app.set("view engine", "pug");

app.use("/", require("./routes/view"));
app.use("/auth", require("./routes/auth"));

//API
app.use( "/api/products", require("./routes/api/products"));
app.use( "/api/category", require("./routes/api/category"));

app.listen(port, () => {
    console.log("Servidor iniciado en", port);
});