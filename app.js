const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

// Create the HTTP server and initialize Socket.IO
const server = http.createServer(app);
const io = socketio(server);

// Set up the view engine to use EJS templates
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up a Socket.IO connection handler
io.on('connection', function (socket) {
     socket.on("send-location", function (data){
          io.emit("receive-location",{id: socket.id, ...data})
     });
    socket.on("disconnect", function(){
     io.emit("user-disconnect", socket.id)
    })
});

// Define the root route to render the 'index' view
app.get('/', function(req, res) {
    res.render('index');
});

// Start the server and listen on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
