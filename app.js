const Server = require("./models/server");
const socketFunctions = require("./socket");

const server = new Server();

const io = server.ioServer()

socketFunctions(io);

server.listen();