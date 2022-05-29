const express = require("express");
const path = require("path");
const connectMongo = require("../db/config");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

class Server {
    constructor(){
        this.dotenvConfig = dotenv.config();
        this.app = express();
        this.server = require('http').createServer(this.app);
        this.port = process.env.PORT || 8000;
        this.routes = {
            admin: "/admin",
            auth : "/api/auth",
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

        this.app.use(express.json());
        this.app.use(cookieParser());
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
        this.app.use(this.routes.admin, require("../routes/admin/admin"));
        
        //api
        this.app.use(this.routes.auth, require("../routes/api/auth"));
        this.app.use(this.routes.categories, require("../routes/api/category"));
        this.app.use(this.routes.products, require("../routes/api/products"));
        this.app.use(this.routes.cart, require("../routes/api/cart"));
    }

    ioServer(){
        return require('socket.io')(this.server)
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log("Servidor iniciado en", this.port);
        });
    }
}

module.exports = Server;