console.log("script loaded");

let express = require("express");

let app = express();

let port = 3000;

let server = app.listen(port);

app.use(express.static("public"));

console.log('running server on http://localhost:'+port);

let serverSocket = require("socket.io");

let io = serverSocket(server);

//something that is running when there's a new client on our server
io.on("connection", newConnection);

 //the variable newSocket will contain the information that is coming from the client, usually his id
function newConnection(newSocket) {
    console.log(newSocket.id);

    newSocket.on("mouse", mouseReceived);

    function mouseReceived(dataReceived) {
        console.log(dataReceived);
        //this instruction returns the data to the clients
        newSocket.broadcast.emit("mouseBroadcast", dataReceived);
    }
}