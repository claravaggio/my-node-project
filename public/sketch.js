//global variable to activate the socket on client side
let clientSocket = io();

let myColor;

let colors = ["red", "green", "blue", "yellow", "orange"]

clientSocket.on("connect", newConnection);

function newConnection() {
  console.log(clientSocket.id);
}

clientSocket.on("mouseBroadcast", otherMouse);

function otherMouse(dataReceived) {
  fill(dataReceived.color);
  noStroke();
  circle(dataReceived.x, dataReceived.y, 10);
}

function mouseMoved() {
  let message = {
    x: mouseX,
    y: mouseY,
    id: clientSocket.id,
    color: myColor,
  };

  clientSocket.emit("mouse", message);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  myColor = random(colors);
  //background(220);
}

function draw() {
  noStroke();
  fill(myColor);
  circle(mouseX, mouseY, 20);
}
