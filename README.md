## FRONTIER

Inspired by the classic D&D module B2: The Keep on the Borderlands, Frontier is a simple roguelike being developed as part of
the [r/RoguelikeDev Does The Complete Roguelike Tutorial 2019](https://www.reddit.com/r/roguelikedev/comments/br1sv3/roguelikedev_does_the_complete_roguelike_tutorial).
Development is following the progression of the [Roguelike Tutorial Revised](http://rogueliketutorials.com/tutorials/tcod/),
adapted for JavaScript instead of Python. Dev blog to follow.

[Demo](https://alexshopov.github.io/frontier-rl/)

Week 1: Part 0-1 - Project setup. Create a basic scene, draw the '@' symbol, move it around.

Week 2: Parts 2-3 - Generic entity, map, dungeon generation

### Building Frontier from source
Frontier is being developed with ES6 and [Phaser 3](https://phaser.io/). Support tools include [node/npm](https://nodejs.org),
[webpack](https://webpack.js.org/), and [babel](https://babeljs.io/). The webpack-dev-server provides live reloading
during development.

- Install [npm](https://nodejs.org/en/download/)
- Open a shell and navigate to your dev directory
- `git clone https://github.com/alexshopov/frontier-rl.git`
- `cd frontier-rl`
- `npm install`
- `npm start`

### Gameplay
Move the player using W, A, S, D
