const net = require("net");
const fs = require("fs");

// Create a socket (client) that connects to the server
var socket = new net.Socket();
socket.connect(8080, "localhost", function () {
});

// Let's handle the data we get from the server
socket.on("data", function (data) {
    // data = JSON.parse(data);
    // console.log("Response from server: %s", data.response);
    // // Respond back
    // socket.write(JSON.stringify({ response: "Hey there server!" }));
    // // Close the connection
    // socket.end();
    console.log(data.toString());
});

let input = fs.readFileSync('/mnt/c/Users/kobim/Desktop/cppDetectionServer/input.txt');
socket.write(input.toString());
