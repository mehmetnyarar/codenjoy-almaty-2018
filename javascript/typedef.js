/* TYPE DEFINITIONS for snake-utils */

/**
 * Board's grid.
 * @typedef {Object} Grid
 * @property {number} width Width of the board.
 * @property {number} height Height of board.
 */

/**
 * Position of a cell on the grid.
 * @typedef {Object} Cell
 * @property {number} x Position of a grid cell on the x-axis.
 * @property {number} y Position of a grid cell on the y-axis.
 */

/**
 * State of the snake.
 * @typedef {Object} Snake
 * @property {number} position Snake's position on the board.
 * @property {string} direction Direction of the snake's head.
 */

/**
 * State of the apple.
 * @typedef {Object} Apple
 * @property {number} position Apple's position on the board.
 */

/**
 * Distance.
 * @typedef {Object} Distance
 * @property {number} x Distance on the x-axis.
 * @property {number} y Distance on the y-axis.
 */

/**
 * Move.
 * @typedef {Object} Move
 * @property {string} direction Direction of the move.
 * @property {number} score Score of the move.
 */
