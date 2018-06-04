const DIRECTION = {
  UP: "UP",
  RIGHT: "RIGHT",
  DOWN: "DOWN",
  LEFT: "LEFT"
};

const CELL = {
  EMPTY: " ",
  APPLE: "☺",
  WALL: "☼",
  STONE: "☻"
};

const isUp = board => board.indexOf("▲") !== -1;
const isRight = board => board.indexOf("►") !== -1;
const isDown = board => board.indexOf("▼") !== -1;
const isLeft = board => board.indexOf("◄") !== -1;

const getCurrentState = board => {
  let state = {};
  if (isUp(board)) {
    state = { direction: "UP", position: board.indexOf("▲") };
  } else if (isRight(board)) {
    state = { direction: "RIGHT", position: board.indexOf("►") };
  } else if (isDown(board)) {
    state = { direction: "DOWN", position: board.indexOf("▼") };
  } else {
    state = { direction: "LEFT", position: board.indexOf("◄") };
  }
  return state;
};

const getNextPosition = (state, direction = state.direction) => {
  const col = state.position % 15;
  const row = (state.position - col) / 15;

  let nextCol;
  let nextRow;

  switch (direction) {
    case "UP":
      nextRow = row - 1;
      nextCol = col;
      break;
    case "RIGHT":
      nextRow = row;
      nextCol = col + 1;
      break;
    case "DOWN":
      nextRow = row + 1;
      nextCol = col;
      break;
    case "LEFT":
      nextRow = row;
      nextCol = col - 1;
      break;
    default:
      break;
  }

  return nextRow * 15 + nextCol;
};

const getCellScore = (board, state, direction = state.direction) => {
  const cellPosition = getNextPosition(state, direction);
  const cell = board.charAt(cellPosition);

  switch (cell) {
    case CELL.EMPTY:
      return 0;
    case CELL.APPLE:
      return 1;
    default:
      return -1;
  }
};

const getScoreMatrix = (board, state) => {
  const matrix = [];
  Object.values(DIRECTION).forEach(direction => {
    matrix.push({
      direction,
      score: getCellScore(board, state, direction)
    });
  });
  return matrix;
};

module.exports = {
  isUp,
  isRight,
  isDown,
  isLeft,
  getCurrentState,
  getNextPosition,
  getCellScore,
  getScoreMatrix
};

// const applePosition = board.indexOf("☺");
// const appleRow = applePosition % 15;
// const appleCol = (applePosition - col) / 15;
