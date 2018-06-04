require("./typedef");

/* ENUMERATIONS */

/**
 * Directions.
 */
const DIRECTION = {
  UP: "UP",
  RIGHT: "RIGHT",
  DOWN: "DOWN",
  LEFT: "LEFT"
};

/**
 * Values which can be found on the board.
 */
const ENTITY = {
  NULL: " ",
  WALL: "☼",
  STONE: "☻",
  APPLE: "☺",
  SNAKE: {
    HEAD: { UP: "▲", RIGHT: "►", DOWN: "▼", LEFT: "◄" },
    BODY: ["║", "═", "╗", "╝", "╔", "╚"],
    TAIL: ["╙", "╘", "╓", "╕"]
  }
};

/**
 * Board's default dimensions.
 */
const GRID = {
  width: 15,
  height: 15
};

/* METHODS */

/**
 * Returns the coordinates of a position.
 * @param {number} position Position of an entity.
 * @param {Grid} grid Board's grid.
 * @returns {Cell} Cell.
 */
const getCell = (position, grid = GRID) => {
  const x = position % grid.width;
  const y = (position - x) / grid.height;

  return { x, y };
};

/**
 * Returns the current state of the snake.
 * @param {string} board Board.
 * @returns {Snake} Snake.
 */
const getSnake = board => {
  let state = {};

  Object.keys(ENTITY.SNAKE.HEAD).forEach(direction => {
    const head = ENTITY.SNAKE.HEAD[direction];
    const position = board.indexOf(head);

    if (position !== -1) {
      state = { position, direction };
    }
  });

  return state;
};

/**
 * Returns the current state of the apple.
 * @param {string} board Board.
 * @returns {Apple} Apple.
 */
const getApple = board => ({
  position: board.indexOf(ENTITY.APPLE)
});

/**
 * Returns a distance matrix between two positions.
 * @param {number} sourcePosition Position of the source object.
 * @param {number} targetPosition Position of the target object.
 * @param {Grid} grid Board's grid.
 * @returns {Distance} Distance matrix.
 */
const getDistance = (sourcePosition, targetPosition, grid = GRID) => {
  const source = getCell(sourcePosition, grid);
  const target = getCell(targetPosition, grid);
  const x = target.x - source.x;
  const y = target.y - source.y;
  return { x, y };
};

/**
 * Returns suggested moves based on distance.
 * @param {Distance} distance Distance.
 * @returns {string[]} Array of directions.
 */
const getSuggestedMoves = distance => {
  const moves = [];

  if (distance.x > 0) moves.push(DIRECTION.RIGHT);
  if (distance.x < 0) moves.push(DIRECTION.LEFT);
  if (distance.y > 0) moves.push(DIRECTION.DOWN);
  if (distance.y < 0) moves.push(DIRECTION.UP);

  return moves;
};

/**
 * Returns the position of the next cell based on direction.
 * @param {Object} position Current position.
 * @param {string} direction Direction to go.
 * @param {Grid} grid Board's grid.
 * @returns {number} Position.
 */
const getNextPosition = (position, direction, grid = GRID) => {
  switch (direction) {
    case DIRECTION.UP:
      return position - grid.width;
    case DIRECTION.RIGHT:
      return position + 1;
    case DIRECTION.DOWN:
      return position + grid.width;
    case DIRECTION.LEFT:
      return position - 1;
    default:
      return position;
  }
};

/**
 * Returns the score of the cell based on the entity.
 * @param {string} board Board.
 * @param {number} position Position of the cell.
 */
const getCellScore = (board, position) => {
  const entity = board.charAt(position);

  switch (entity) {
    case ENTITY.NULL:
      return 0;
    case ENTITY.APPLE:
      return 1;
    default:
      return -1;
  }
};

/**
 * Returns a risk score.
 * @param {string} board Board.
 * @param {number} position Position of the cell on the board.
 * @param {Grid} grid Board's grid.
 */
const getRiskScore = (board, position, grid) => {
  let score = 0;

  Object.keys(DIRECTION).forEach(direction => {
    const nextPosition = getNextPosition(position, direction, grid);
    const nextScore = getCellScore(board, nextPosition, grid);
    score += nextScore;
  });

  return score;
};

/**
 * Returns a score of the move.
 * @param {string} board Board.
 * @param {number} position Position.
 * @param {string} direction Direction of the move.
 * @param {Grid} grid Board's grid.
 */
const getNextScore = (board, position, direction, grid = GRID) => {
  const nextPosition = getNextPosition(position, direction, grid);
  const riskScore = getRiskScore(board, nextPosition, grid);

  return riskScore === -4 ? -1 : getCellScore(board, nextPosition, grid);
};

/**
 * Returns an array of directions and their scores.
 * @param {string} board Board.
 * @param {number} position Position to calculate score matrix.
 * @param {string[]} suggestedMoves Suggested moves to reach the apple.
 * @param {GRID} grid Board's Grid.
 * @returns {Move[]}
 */
const getScoreMatrix = (board, position, suggestedMoves, grid = GRID) => {
  const matrix = [];

  Object.values(DIRECTION).forEach(direction => {
    let score = getNextScore(board, position, direction, grid);
    if (score !== -1) {
      if (suggestedMoves.includes(direction)) {
        switch (direction) {
          case DIRECTION.UP:
          case DIRECTION.DOWN:
            score += 2;
            break;
          case DIRECTION.RIGHT:
          case DIRECTION.LEFT:
            score += 1;
        }
      }
      matrix.push({ direction, score });
    }
  });
  return matrix;
};

/**
 * Calculates the next move of the snake based on score matrix.
 * @param {Object[]} matrix Score matrix.
 * @param {string} matrix.direction Direction of the move.
 * @param {number} matrix.score Score of the move.
 */
const getNextMove = matrix => {
  let direction;

  matrix.forEach(move => {
    if (move.score >= 1) {
      direction = move.direction;
      return;
    }
  });

  if (!direction) {
    matrix.forEach(move => {
      if (move.score >= 0) {
        direction = move.direction;
        return;
      }
    });
  }

  return direction || DIRECTION.UP;
};

module.exports = {
  DIRECTION,
  ENTITY,
  GRID,
  getCell,
  getSnake,
  getApple,
  getDistance,
  getSuggestedMoves,
  getNextPosition,
  getCellScore,
  getRiskScore,
  getNextScore,
  getScoreMatrix,
  getNextMove
};
