const Server = require("./server/server");
const socketFunctions = require("./socket");

const server = new Server();

const io = server.ioServer()

socketFunctions(io);

server.listen();