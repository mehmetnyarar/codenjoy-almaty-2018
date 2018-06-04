# About This Repo

I recently joined a hackaton named [CodeNJoy](https://www.facebook.com/events/208438566603939/) which was organized by [EPAM Kazakhstan](https://www.facebook.com/epam.kazakhstan/) in Almaty city.

The hackaton's main subjective was to encourage developers to use TDD and pair programming practices and the goal was to write a bot (AI) for the famous snake game. It was a great pleasure to meet and work with other developers while applying some great coding practices.

As per the bot we developed with my mate, we developed the following algorithm:

1.  Get the current state of the snake (position and direction)
2.  Calculate a score matrix of possible moves\*
3.  Go to cell which has the highest score

* Score for each direction:

  * apple: 1
  * empty cell: 0
  * other (wall, stone, body or tail): -1

This is what we had done until the competition's end. Even though this algorithm blessed the snake with a long healthy life :), yet it was insufficient to feed him for a long time and made him suffer hungriness :(.

Unfortunately the event was over and I had to sit and think alone about how to improve it without taking advantage of pair programming, but I continued to use TDD. I improved the algorithm buy adding two more steps (#2 and #3) :
developed the below algorithm:

1.  Get the current state of the snake (position and direction)
2.  Get the position of the apple
3.  Determine the directions which leads the snake to reach the apple
4.  Calculate a score matrix of possible moves
5.  Go to the cell which has the highest score

* Score for each direction:
  * apple: 1
  * empty cell: 0
  * other (wall, stone, body or tail): -1
  * dangerous move: -1

No doubt the snake is not hungry anymore :) but as a trade-off, he has a shorter life :(. Next step would be most probably to consider the snake's body in the calculation of the score matrix.

I'll come back to this topic whenever I can and you're also welcome to contribute to it.

You can contact me if you would like to talk about it:

mehmetnyarar [at] gmail [dot] com

* Original repo: https://github.com/AstanaJUG/codenjoy-clients
* The game: http://codenjoy.astanajug.net:8080/codenjoy-contest/
