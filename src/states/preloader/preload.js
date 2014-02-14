module.exports = function () {
    var game = this.game;

    game.stage.backgroundColor = '#15d8ea';
    game.add.text(20, 70, 'Loading...', { font: '48px Boogaloo', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
    var pr = game.add.text(20, 130, '0%', { font: '48px Boogaloo', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });

    game.load.onFileComplete.add(function (progress) {
        pr.content = progress + '%';
    }, this);

    game.load.image('ground', 'assets/ground.png');
    game.load.image('trees', 'assets/trees.png');
    game.load.image('pipe_body', 'assets/pipe_body.png');
    game.load.image('pipe_body_gold', 'assets/gold_pipe_body.png');
    game.load.image('pipe_top', 'assets/pipe_head.png');
    game.load.image('pipe_top_gold', 'assets/gold_pipe_head.png');
    game.load.image('title', 'assets/title.png');
    game.load.image('tap_to_fly', 'assets/tap_to_glide.png');
    game.load.image('done_bg', 'assets/done_bg.png');
    game.load.image('notice', 'assets/notice.png');
    game.load.image('reset', 'assets/reset.png');
    game.load.image('shop_bg', 'assets/shop_bg.png');
    game.load.image('item_grow', 'assets/item_grow.png');
    game.load.image('item_explode', 'assets/item_explode.png');
    game.load.image('item_invisipipes', 'assets/item_invisipipes.png');
    game.load.image('item_upsidedown', 'assets/item_upsidedown.png');
    game.load.image('item_speed', 'assets/item_speed.png');
    game.load.image('item_padding', 'assets/item_padding.png');
    game.load.image('not_enough', 'assets/not_enough.png');

    game.load.spritesheet('play_button', 'assets/play_button.png', 266, 105);
    game.load.spritesheet('shop_button', 'assets/shop_button.png', 266, 105);
    game.load.spritesheet('next_level_button', 'assets/nextlevel_button.png', 226, 43);
    game.load.spritesheet('replay_button', 'assets/replay_button.png', 226, 43);
    game.load.spritesheet('over_shop_button', 'assets/over_shop_button.png', 226, 43);
    game.load.spritesheet('kitty', 'assets/kitty.png', 136, 115, 20);
    game.load.spritesheet('shop_arrow', 'assets/shop_arrow.png', 36, 61);
    game.load.spritesheet('buy_button', 'assets/buy_button.png', 139, 43);
    game.load.spritesheet('shop_play_button', 'assets/shop_play_button.png', 89, 43);
    game.load.spritesheet('shop_menu_button', 'assets/shop_menu_button.png', 89, 43);
    game.load.spritesheet('start_level', 'assets/start_level.png', 226, 80);
    game.load.spritesheet('mute', 'assets/mute.png', 30, 34);

    game.load.audio('ding', ['assets/ding.mp3', 'assets/ding.ogg']);
    game.load.audio('glide', ['assets/GLIDE.mp3', 'assets/GLIDE.ogg']);
    game.load.audio('menu_music', ['assets/menu.mp3', 'assets/menu.ogg']);
    game.load.audio('game_music', ['assets/game_music.mp3', 'assets/game_music.ogg']);
    game.load.audio('shop_music', ['assets/shop_music.mp3', 'assets/shop_music.ogg']);
    game.load.audio('boop', ['assets/boop.mp3', 'assets/boop.ogg']);
    game.load.audio('boom', ['assets/boom.mp3', 'assets/boom.ogg']);
}