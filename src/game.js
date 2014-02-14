var preloader = require('./states/preloader');
var menu = require('./states/main_menu');
var game = require('./states/game');
var shop = require('./states/shop');

window.init = function () {
    var Game = new Phaser.Game(320, 480, Phaser.AUTO, '');
    Game.state.add('preloader', preloader, true);
    Game.state.add('main_menu', menu);
    Game.state.add('game', game);
    Game.state.add('shop', shop);
}
