var store = require('store');

module.exports = function () {
    var game = this.game;

    var music = game.add.audio('menu_music', 1, true);
    music.play('', 0, 1, true);

    game.add.sprite(120, 250, 'trees');
    game.add.sprite(-50, 250, 'trees');
    game.add.sprite(0, 400, 'ground');
    
    var isMuted = store.get('mute');
    game.sound.mute = isMuted;
    
    var muteAction = function () {
        if (isMuted) {
            isMuted = false;
            store.set('mute', false);
            mute.frame = 0;
            game.sound.mute = false;
        } else {
            isMuted = true;
            store.set('mute', true);
            mute.frame = 1;
            game.sound.mute = true;
        }
    }
    var mute = game.add.button(10, 20, 'mute', muteAction);
    if (isMuted) {
        mute.frame = 1;
    } else {
        mute.frame = 0;
    }

    var title = game.add.sprite(game.world.centerX - 306 / 2, -100, 'title');
    var sellout = game.add.text(500, 120, 'IT\'S TOTALLY ORIGINAL!', { font: '20px Boogaloo',fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
    game.add.tween(title).to({y: 50}, 1200, Phaser.Easing.Bounce.Out, true, 300);
    game.add.tween(sellout).to({x: 120}, 500, Phaser.Easing.Linear.None, true, 1500);

    var bird = game.add.sprite(70, 150, 'kitty');
    bird.animations.add('glide');
    bird.animations.play('glide', 30, true);
    game.add.tween(bird).to({y: 160}, 400, Phaser.Easing.Circular.InOut, true, 0, Number.MAX_VALUE, true);
    
    var onPlayAction = function () {
        game.state.start('game');
        music.stop();

        var gameMusic = game.add.audio('game_music', 0.5, true);
        gameMusic.play('', 0, 0.4, true);
    }
    var play = game.add.button(game.world.centerX - 200 / 2, 275, 'play_button', onPlayAction, this, 1, 0, 2);
    play.scale.setTo(0.75, 0.75);

    var onShopAction = function () {
        game.state.start('shop');
        music.stop();
    }

    var shop = game.add.button(game.world.centerX - 200 / 2, 375, 'shop_button', onShopAction, this, 1, 0, 2);
    shop.scale.setTo(0.75, 0.75);
}