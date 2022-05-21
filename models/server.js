const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const connectMongo = require("../db/config");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

class Server {
    constructor(){
        this.dotenvConfig = dotenv.config();
        this.app = express();
        this.port = process.env.PORT || 8000;
        this.routes = {
            auth : "/auth",
            admin: "/admin",
            categories: "/api/category",
            products: "/api/products",
            cart: "/api/cart"
        };

        this.connect();
        this.middlewares();
        this.views();
        this.router();
    }

    async connect(){
        await connectMongo();
    }

    middlewares(){
        this.app.use(session({
            store: MongoStore.create({ mongoUrl: process.env.MONGO_URL_DATABASE, ttl: 60 * 10}),
            secret: "SECRET",
            resave: true,
            saveUninitialized: false
        }));

        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static("public"));
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    views(){
        this.app.set("views", path.join("./views"));
        this.app.set("view engine", "pug");
    }

    router(){
        this.app.use("/", require("../routes/view"));
        this.app.use(this.routes.auth, require("../routes/auth"));
        this.app.use(this.routes.admin, require("../routes/admin/admin"));

        //api
        this.app.use(this.routes.categories, require("../routes/api/category"));
        this.app.use(this.routes.products, require("../routes/api/products"));
        this.app.use(this.routes.cart, require("../routes/api/cart"));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Servidor iniciado en", this.port);
        });
    }
}

module.exports = Server;