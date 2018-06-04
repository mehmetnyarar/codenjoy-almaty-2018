const utils = require("./snake-utils");

test("should return the coordinates of the given position for the default board size.", () => {
  const position = 62;
  const expected = { x: 2, y: 4 };
  expect(utils.getCell(position)).toEqual(expected);
});

test("should return the coordinates of the given position for the board size of 5x10.", () => {
  const grid = { width: 5, height: 10 };
  const position = 62;
  const expected = { x: 2, y: 6 };
  expect(utils.getCell(position, grid)).toEqual(expected);
});

test("should return the current state of the snake.", () => {
  const board = "◄";
  const expected = { position: 0, direction: utils.DIRECTION.LEFT };
  expect(utils.getSnake(board)).toEqual(expected);
});

test("should return the current state of the apple.", () => {
  const board = "☺";
  const expected = { position: 0 };
  expect(utils.getApple(board)).toEqual(expected);
});

test("should return the distance of the apple to the snake.", () => {
  const grid = { width: 5, height: 5 };
  const snake = { position: 16, direction: utils.DIRECTION.LEFT };
  const apple = { position: 8 };
  const expected = { x: 2, y: -2 };
  expect(utils.getDistance(snake.position, apple.position, grid)).toEqual(
    expected
  );
});

test("should return the next position of the snake for the UP direction.", () => {
  const position = 62;
  const direction = utils.DIRECTION.UP;
  const expected = 47;
  expect(utils.getNextPosition(position, direction)).toEqual(expected);
});

test("should return the next possible moves towards apple.", () => {
  const distance = { x: 2, y: -2 };
  const expected = [utils.DIRECTION.RIGHT, utils.DIRECTION.UP];
  expect(utils.getSuggestedMoves(distance)).toEqual(expected);
});

test("should return -4 as a risk score for a dangerous move.", () => {
  const grid = { width: 6, height: 3 };
  const board = "☼☼☼☼☼☼☼ ▲  ☼☼☼☼☼☼☼";
  const position = 7;
  const expected = -4;
  expect(utils.getRiskScore(board, position, grid)).toBe(expected);
});

test("should return -3 as a risk score for a non-dangerous move.", () => {
  const grid = { width: 6, height: 3 };
  const board = "☼☼☼☼☼☼☼ ▲  ☼☼☼☼☼☼☼";
  const position = 9;
  const expected = -3;
  expect(utils.getRiskScore(board, position, grid)).toBe(expected);
});

test("should return a negative score for hitting the body/tail.", () => {
  const grid = { width: 5, height: 5 };
  const board = "☼☼☼☼☼☼  ☺☼☼   ☼☼◄═ ☼☼☼☼☼☼";
  const position = 16;
  const direction = utils.DIRECTION.RIGHT;
  const expected = -1;
  expect(utils.getNextScore(board, position, direction, grid)).toEqual(
    expected
  );
});

test("should return a negative score for hitting the wall.", () => {
  const grid = { width: 5, height: 5 };
  const board = "☼☼☼☼☼☼  ☺☼☼   ☼☼◄═ ☼☼☼☼☼☼";
  const position = 16;
  const direction = utils.DIRECTION.LEFT;
  const expected = -1;
  expect(utils.getNextScore(board, position, direction, grid)).toEqual(
    expected
  );
});

test("should return a negative score for hitting the stone.", () => {
  const grid = { width: 5, height: 5 };
  const board = "☼☼☼☼☼☼  ☺☼☼☻  ☼☼◄═ ☼☼☼☼☼☼";
  const position = 16;
  const direction = utils.DIRECTION.UP;
  const expected = -1;
  expect(utils.getNextScore(board, position, direction, grid)).toEqual(
    expected
  );
});

test("should return 0 for an empty cell.", () => {
  const grid = { width: 5, height: 5 };
  const board = "☼☼☼☼☼☼  ☺☼☼   ☼☼  ▲☼☼☼☼☼☼";
  const position = 18;
  const direction = utils.DIRECTION.UP;
  const expected = 0;
  expect(utils.getNextScore(board, position, direction, grid)).toEqual(
    expected
  );
});

test("should return a positive score for hitting the apple.", () => {
  const grid = { width: 5, height: 5 };
  const board = "☼☼☼☼☼☼  ☺☼☼  ▲☼☼   ☼☼☼☼☼☼";
  const position = 13;
  const direction = utils.DIRECTION.UP;
  const expected = 1;
  expect(utils.getNextScore(board, position, direction, grid)).toEqual(
    expected
  );
});

test("should return a score matrix.", () => {
  const grid = { width: 5, height: 5 };
  const board = "☼☼☼☼☼☼  ☺☼☼   ☼☼  ▲☼☼☼☼☼☼";
  const snake = { position: 18, direction: utils.DIRECTION.UP };
  const suggested = [utils.DIRECTION.UP];
  const expected = [
    { direction: "UP", score: 2 },
    { direction: "LEFT", score: 0 }
  ];
  expect(utils.getScoreMatrix(board, snake.position, suggested, grid)).toEqual(
    expected
  );
});

test("should return a score matrix.", () => {
  const grid = { width: 5, height: 5 };
  const board = "☼☼☼☼☼☼  ☺☼☼  ☻☼☼  ▲☼☼☼☼☼☼";
  const snake = { position: 18, direction: utils.DIRECTION.UP };
  const suggested = [utils.DIRECTION.UP];
  const expected = [{ direction: "LEFT", score: 0 }];
  expect(utils.getScoreMatrix(board, snake.position, suggested, grid)).toEqual(
    expected
  );
});

test("should return a move.", () => {
  const matrix = [
    { direction: "UP", score: 1 },
    { direction: "LEFT", score: 0 }
  ];
  const expected = utils.DIRECTION.UP;
  expect(utils.getNextMove(matrix)).toEqual(expected);
});

test("should return UP for a game-over.", () => {
  const matrix = [];
  const expected = utils.DIRECTION.UP;
  expect(utils.getNextMove(matrix)).toEqual(expected);
});
