const express = require("express");
const app = express();
const path = require("path");

const http = require("http");
const server = http.createServer(app);

const socketio = require("socket.io");
const { log } = require("console");
const { connected } = require("process");
const io = socketio(server); 


app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", (socket) => {
    socket.on("send-location", (data) => {
        io.emit("recieve-location", {id: socket.id, ...data });
    });

    socket.on("disconnect", (data) => {
        io.emit("user-disconnected", socket.id);
    });
    
});

app.get('/', (req, res) => {
    res.render("index");
})

server.listen(3000,()=>{
    console.log("Server running on http://localhost:3000");
})