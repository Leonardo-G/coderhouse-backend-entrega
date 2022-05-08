const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 8000;


app.set("views", path.join("./views"));
app.set("view engine", "pug");

app.use("/auth", require("./routes/auth"));

app.listen(port, () => {
    console.log("Servidor iniciado en", port);
})