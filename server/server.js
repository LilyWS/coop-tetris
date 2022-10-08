const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

app.use(cors());

const httpServer = http.createServer(app);

// const io = new Server(httpServer, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"],
//     },
// });

// io.on("connection", (socket) => {
//     console.log(`User Connected: ${socket.id}`);
//     socket.emit("test");
//     socket.emit("test");
// });

require("./socket")(httpServer);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

httpServer.listen(PORT, () => {
    console.log("Server Time")
})