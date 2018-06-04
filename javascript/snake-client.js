const utils = require("./snake-utils");

// Get your username and code at:
// http://codenjoy.astanajug.net:8080/codenjoy-contest/register
const host = "codenjoy.astanajug.net:8080/codenjoy-contest";
const userName = "";
const code = "";

const server = "ws://" + host + "/ws";
const WebSocket = require("ws");
const ws = new WebSocket(server + "?user=" + userName + "&code=" + code);

function commandForSnake(board) {
  const snake = utils.getSnake(board);
  const apple = utils.getApple(board);
  const distance = utils.getDistance(snake.position, apple.position);
  const suggestedMoves = utils.getSuggestedMoves(distance);
  const scoreMatrix = utils.getScoreMatrix(
    board,
    snake.position,
    suggestedMoves
  );
  const nextMove = utils.getNextMove(scoreMatrix);

  console.log("snake", snake);
  console.log("apple", apple);
  console.log("distance", distance);
  console.log("suggestedMoves", suggestedMoves);
  console.log("scoreMatrix", scoreMatrix);
  console.log("nextMove", nextMove);

  return nextMove;
}

ws.on("open", function() {
  console.log("Opened");
});

ws.on("close", function() {
  console.log("Closed");
});

ws.on("message", function(message) {
  const board = message.substring("board=".length, message.length);
  printBoard(board);
  let command = commandForSnake(board);
  ws.send(command);
});

console.log("Web socket client running at " + server);

function printBoard(message) {
  const fieldLength = Math.sqrt(message.length) | 0;

  for (let i = 0; i < fieldLength; i++) {
    console.log(message.substring(i * fieldLength, fieldLength * (i + 1)));
  }
}

const stone = "☻";
const apple = "☺";
const head = ["▲", "◄", "►", "▼"];
const body = ["║", "═", "╗", "╝", "╔", "╚"];
const tail = ["╙", "╘", "╓", "╕"];
const wall = "☼";

/* Functions */

const isUp = board => {};

module.exports = isUp;
