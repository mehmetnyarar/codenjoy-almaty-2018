const utils = require("./snake-utils");

test("the current direction of the snake is UP.", () => {
  const board = "▲";
  expect(utils.isUp(board)).toBe(true);
});

test("the current direction of the snake is RIGHT.", () => {
  const board = "►";
  expect(utils.isRight(board)).toBe(true);
});

test("the current direction of the snake is DOWN.", () => {
  const board = "▼";
  expect(utils.isDown(board)).toBe(true);
});

test("the current direction of the snake is LEFT.", () => {
  const board = "◄";
  expect(utils.isLeft(board)).toBe(true);
});

test("should return the current state of the snake", () => {
  const board = "◄";
  const expectedState = {
    direction: "LEFT",
    position: 0
  };
  expect(utils.getCurrentState(board)).toEqual(expectedState);
});

test("should return the next position of then snake with current direction", () => {
  const currentState = { direction: "UP", position: 62 };
  const expectedPosition = 47;
  expect(utils.getNextPosition(currentState)).toEqual(expectedPosition);
});

test("should return the next position of then snake with specified direction", () => {
  const currentState = { direction: "UP", position: 62 };
  const direction = "RIGHT";
  const expectedPosition = 63;
  expect(utils.getNextPosition(currentState, direction)).toEqual(
    expectedPosition
  );
});

test("should return -1 for hitting the wall for the current direction", () => {
  const board =
    "☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼             ☼☼    ☺       ►☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼        ☻    ☼☼             ☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼";
  const currentState = { direction: "RIGHT", position: 43 };
  const expectedScore = -1;
  expect(utils.getCellScore(board, currentState)).toEqual(expectedScore);
});

test("should return 1 for hitting the apple with specified direction", () => {
  const board =
    "☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼             ☼☼    ☺▲       ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼        ☻    ☼☼             ☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼";
  const currentState = { direction: "UP", position: 36 };
  const direction = "LEFT";
  const expectedScore = 1;
  expect(utils.getCellScore(board, currentState, direction)).toEqual(
    expectedScore
  );
});

test("should return the score matrix", () => {
  const board =
    "☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼            ☺☼☼           ═►☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼        ☻    ☼☼             ☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼";
  const currentState = { direction: "RIGHT", position: 43 };
  const expectedMatrix = [
    { direction: "UP", score: 1 },
    { direction: "RIGHT", score: -1 },
    { direction: "DOWN", score: 0 },
    { direction: "LEFT", score: -1 }
  ];
  expect(utils.getScoreMatrix(board, currentState)).toEqual(expectedMatrix);
});

test("should return the best direction to reach the apple", () => {
  const board =
    "☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼            ☺☼☼           ═►☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼        ☻    ☼☼             ☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼";
  const appleState = {};
});
