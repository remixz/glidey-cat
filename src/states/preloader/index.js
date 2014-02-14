var State = function (game) {
    this.game = game;
    this.preload = require('./preload');
    this.create = require('./create');
}

module.exports = State;