var store = require('store');
var items = require('../../static/items');

module.exports = function () {
    var game = this.game;
    var index = 0;
    var currentSprite;
    var currentItem;

    var music = game.add.audio('shop_music', 1, true);
    music.play('', 0, 1, true);

    var bg = game.add.sprite(0, 0, 'shop_bg');

    var playAction = function () {
        game.state.start('game');
        music.stop();

        var gameMusic = game.add.audio('game_music', 0.5, true);
        gameMusic.play('', 0, 0.4, true);
    }
    var playButton = game.add.button(225, 10, 'shop_play_button', playAction, this, 1, 0, 1);

    var menuAction = function () {
        game.state.start('main_menu');
        music.stop();
    }
    var menuButton = game.add.button(5, 10, 'shop_menu_button', menuAction, this, 1, 0, 1);

    var itemGroup = game.add.group();
    var amount = Object.keys(items).length;

    for (var name in items) {
        var item = items[name];
        item.name = name;
        
        var sprite = itemGroup.create(500, 85, 'item_' + name);
        sprite.name = name;
    }

    var buyAction = function () {
        var gold = store.get('gold');
        var inv = store.get('inventory');
        gold -= currentItem.price;

        if (typeof inv[currentItem.name] === 'undefined') inv[currentItem.name] = 1;
        else inv[currentItem.name] += 1;

        store.set('inventory', inv);
        store.set('gold', gold);

        updateShop(true);
    }

    var title, description, price, yours, buy;
    var updateShop = function (bought) {
        var gold = store.get('gold');

        if (title) title.destroy();
        title = game.add.text(0, 230, currentItem.title, { font: '30px Boogaloo',fill: '#ffffff', stroke: '#000000', strokeThickness: 5, align: 'center' });
        title.x = Math.floor(game.world.centerX - title.width / 2);

        if (description) description.destroy();
        description = game.add.text(0, 300, currentItem.description, { font: '22px Boogaloo',fill: '#ffffff', stroke: '#000000', strokeThickness: 5, align: 'center' });
        description.x = Math.floor(game.world.centerX - description.width / 2);

        if (price) price.destroy();
        price = game.add.text(10, 400, 'Price: ' + currentItem.price + ' gold', { font: '22px Boogaloo',fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });

        if (yours) yours.destroy();
        yours = game.add.text(10, 430, 'You have: ' + store.get('gold') + ' gold', { font: '22px Boogaloo',fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });

        if (buy) buy.destroy();
        if (gold < currentItem.price) {
            buy = game.add.sprite(170, 420, 'not_enough');
        } else {
            buy = game.add.button(170, 420, 'buy_button', buyAction, this, 1, 0, 1);
        }

        if (bought) {
            var bought = game.add.text(0, 120, 'BOUGHT!', { font: '36px Boogaloo',fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
            bought.x = Math.floor(game.world.centerX - bought.width / 2);
            bought.alpha = 0;

            var boughtTween = game.add.tween(bought).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true)
            .to({alpha: 0}, 200, Phaser.Easing.Linear.None, true, 1000);
        }
    }

    var firstSprite = itemGroup.getAt(0);
    firstSprite.x = game.world.centerX - 116 / 2;
    currentSprite = firstSprite;
    currentItem = items[currentSprite.name];
    updateShop();

    var leftButtonAction = function () {
        var newIndex = index + 1;
        if (newIndex + 1 > amount) index = 0;
        else index = newIndex;

        var item = itemGroup.getAt(index);
        item.x = 500;
        game.add.tween(currentSprite).to({x: -500}, 500, Phaser.Easing.Linear.None, true);
        game.add.tween(item).to({x: game.world.centerX - 116 / 2}, 500, Phaser.Easing.Linear.None, true);
        currentSprite = item;
        currentItem = items[currentSprite.name];
        updateShop();
    }

    var rightButtonAction = function () {
        var newIndex = index - 1;
        if (newIndex + 1 === 0) index = amount - 1;
        else index = newIndex;

        var item = itemGroup.getAt(index);
        item.x = -500;
        game.add.tween(currentSprite).to({x: 500}, 500, Phaser.Easing.Linear.None, true);
        game.add.tween(item).to({x: game.world.centerX - 116 / 2}, 500, Phaser.Easing.Linear.None, true);
        currentSprite = item;
        currentItem = items[currentSprite.name];
        updateShop();
    }

    var leftButton = game.add.button(270, 110, 'shop_arrow', leftButtonAction, this, 1, 0, 1);
    var rightButton = game.add.button(50, 110, 'shop_arrow', rightButtonAction, this, 1, 0, 1);
    rightButton.scale.x = -1;
}
