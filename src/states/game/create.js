var store = require('store');
var items = require('../../static/items');

module.exports = function () {
    var game = this.game;
    this.storage = Object.create(null);
    var storage = this.storage;
    var inv = store.get('inventory');
    var currentPowerup;
    storage.pipePadding = 500;

    storage.score = 0;
    storage.pipesPassed = 0;
    storage.goldChance = game.rnd.integerInRange(8, 16);

    var boop = game.add.audio('boop');
    boop.addMarker('0', 0, 0.7);
    boop.addMarker('1', 1.2, 0.7);
    boop.addMarker('2', 2.4, 0.7);
    boop.addMarker('3', 3.6, 0.7);
    boop.addMarker('4', 4.8, 0.7);
    boop.addMarker('5', 6, 0.7);
    boop.addMarker('6', 7.2, 0.7);

    var glide = game.add.audio('glide');
    glide.addMarker('glidetastic1', 0, 1.5, 8);
    glide.addMarker('glidetastic2', 1.7, 1.4, 8);
    glide.addMarker('golden_glide1', 3.4, 1.6, 8);
    glide.addMarker('golden_glide2', 5.5, 1.3, 8);
    glide.addMarker('glidetacular1', 7.7, 1.7, 8);
    glide.addMarker('glidetacular2', 9.9, 1.4, 8);

    if (store.get('current_level') > 4 && !store.get('first_gold')) {
        storage.goldChance = 1;
    }
    
    game.add.sprite(120, 250, 'trees');
    game.add.sprite(-50, 250, 'trees');

    var oobBottomBody = function (pipe) {
        if (pipe.x > 0) return;
        pipe.x = storage.pipePadding;
        pipe.height = game.rnd.integerInRange(50, 200);
        pipe.scored = false;
    }

    var oobBottomHead = function (pipe) {
        if (pipe.x > 0) return;
        var body = storage.pipes.getAt(pipe.bodyPipe);
        pipe.x = body.x - 13;
        pipe.y = body.y - body.height - 65;
        if (storage.pipesPassed % storage.goldChance === 0 && !pipe.gold) {
            storage.goGold = true;
            pipe.loadTexture('pipe_top_gold');
            body.loadTexture('pipe_body_gold');
            storage.goldChance = game.rnd.integerInRange(8, 16);
            pipe.gold = true;
            body.gold = true;
        } else if (pipe.gold) {
            pipe.loadTexture('pipe_top');
            body.loadTexture('pipe_body');
            pipe.gold = false;
            body.gold = false;
        }
    }

    var oobTopBody = function (pipe) {
        if (pipe.x > 0) return;
        var opp = storage.pipes.getAt(pipe.opposite);
        pipe.x = storage.pipePadding;
        pipe.height = 405 - opp.height - 210;
    }

    var oobTopHead = function (pipe) {
        if (pipe.x > 0) return;
        var body = storage.pipes.getAt(pipe.bodyPipe);
        pipe.x = body.x - 13;
        pipe.y = body.y + body.height; // fuck you +, fuck you

        if (storage.goGold && !pipe.gold) {
            pipe.loadTexture('pipe_top_gold');
            body.loadTexture('pipe_body_gold');
            pipe.gold = true;
            body.gold = true;
            storage.goGold = false;
        } else if (pipe.gold) {
            pipe.gold = false;
            body.gold = false;
            pipe.loadTexture('pipe_top');
            body.loadTexture('pipe_body');
        }
    }

    storage.createPipeSet = function (x) {
        var pipeBodyBottom = storage.pipes.create(x, 405, 'pipe_body');
        pipeBodyBottom.anchor.setTo(0, 1);
        pipeBodyBottom.height = game.rnd.integerInRange(50, 200);
        pipeBodyBottom.bodyBottom = true;
        var pipeHeadBottom = storage.pipes.create(pipeBodyBottom.x - 13, pipeBodyBottom.y - pipeBodyBottom.height - 65, 'pipe_top');
        pipeHeadBottom.head = true;
        pipeHeadBottom.body.setPolygon(13, 0  , 13, -21  , 6, -24  , 1, -30  , 0, -53  , 16, -61  , 39, -66  , 83, -65  , 105, -59  , 115, -54  , 115, -25  , 107, -21  , 107, 0);
        pipeHeadBottom.body.translate(0, 66);
        pipeHeadBottom.bodyPipe = storage.pipes.getIndex(pipeBodyBottom);

        pipeBodyBottom.events.onOutOfBounds.add(oobBottomBody);
        pipeHeadBottom.events.onOutOfBounds.add(oobBottomHead);

        var pipeBodyTop = storage.pipes.create(x, 0, 'pipe_body');
        pipeBodyTop.anchor.setTo(0, 0);
        pipeBodyTop.height = 405 - pipeBodyBottom.height - 210;
        pipeBodyTop.bodyTop = true;
        pipeBodyTop.opposite = storage.pipes.getIndex(pipeBodyBottom);
        var pipeHeadTop = storage.pipes.create(pipeBodyTop.x - 13, pipeBodyTop.y + pipeBodyTop.height, 'pipe_top');
        pipeHeadTop.head = true;
        pipeHeadTop.body.setPolygon(13, 0  , 13, -21  , 6, -24  , 1, -30  , 0, -53  , 16, -61  , 39, -66  , 83, -65  , 105, -59  , 115, -54  , 115, -25  , 107, -21  , 107, 0);
        pipeHeadTop.body.translate(0, 66);
        pipeHeadTop.anchor.setTo(0, 0.5);
        pipeHeadTop.scale.y = -1;
        pipeHeadTop.bodyPipe = storage.pipes.getIndex(pipeBodyTop);

        pipeBodyTop.events.onOutOfBounds.add(oobTopBody);
        pipeHeadTop.events.onOutOfBounds.add(oobTopHead);
    }

    storage.pipes = game.add.group();
    for (var i = 1; i < 3; i++) {
        var x = (i * 300) + 300;
        storage.createPipeSet(x, i);
    }
    storage.y = 0; // for new pipes

    /*storage.bird = game.add.sprite(game.world.centerX, 176, 'bird');
    var bird = storage.bird;
    bird.anchor = new Phaser.Point(0.5, 0.5);
    bird.scale.setTo(0.15, 0.15);
    bird.body.collideWorldBounds = true;
    bird.body.setPolygon(16,0 , 116,-16 , 68,-16 , 68,-32 , 32,-32 , 32,-52 , 16,-52 , 16,-84 , 0,-84 , 0,-120 , 16,-120 , 16,-136 , 52,-136 , 52,-156 , 68,-156 , 68,-172 , 100,-172 , 100,-188 , 188,-188 , 188,-172 , 204,-172 , 204,-156 , 224,-156 , 224,-136 , 240,-136 , 240,-68 , 256,-68 , 256,-52 , 240,-52 , 240,-16 , 224,-16 , 224,0);
    bird.body.translate(0, 188);*/

    storage.cats = game.add.group();

    storage.cat = storage.cats.create(30, 176, 'kitty');
    var cat = storage.cat;
    cat.anchor = new Phaser.Point(0.5, 0.5);
    cat.body.collideWorldBounds = true;
    cat.body.setPolygon(88, -64  , 85, -65  , 85, -69  , 91, -69  , 94, -67  , 94, -63  , 92, -61  , 84, -60  , 83, -55  , 96, -56  , 101, -54  , 104, -56  , 108, -56  , 108, -38  , 106, -32  , 104, -31  , 103, -24  , 100, -24  , 99, -27  , 90, -27  , 90, -24  , 87, -23  , 86, -27  , 77, -33  , 76, -56  , 80, -56  , 80, -60  , 70, -61  , 68, -63  , 68, -66  , 72, -69  , 84, -70  , 84, -68  , 82, -68  , 83, -66  , 79, -66  , 76, -64 )
    cat.body.translate(0, 115);
    cat.animations.add('glide');
    cat.animations.play('glide', 30, true);

    var flappyTween = game.add.tween(cat).to({y: 186}, 400, Phaser.Easing.Circular.InOut, true, 0, Number.MAX_VALUE, true)

    var title = game.add.sprite(35, 85, 'tap_to_fly');
    var levelText = game.add.text(0, 30, 'Level ' + store.get('current_level') , { font: '32px Boogaloo', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
    levelText.x = Math.floor(game.world.centerX - levelText.width / 2);

    var rotateTween;
    var gameTap = function () {
        // weird workaround for single tap issue
        if (rotateTween && rotateTween.isRunning) rotateTween.stop();
        if (rotateTween && rotateTween._chainedTweens[0].isRunning) rotateTween._chainedTweens[0].stop();

        var index = '' + game.rnd.integerInRange(0, 7);
        boop.play(index);

        cat.body.velocity.y = -300;
        rotateTween = game.add.tween(cat).to({angle: -15}, 200, Phaser.Easing.Linear.None, true)
        .to({angle: 0}, 200, Phaser.Easing.Linear.None, true);
        //rotateTween = game.add.tween(cat).to({angle: -30}, 100, Phaser.Easing.Linear.None, true)
          //                                .to({angle: 90}, 350, Phaser.Easing.Linear.None, true, 500);

        if (currentPowerup) {
            if (currentPowerup.affect.how === 'function' && !currentPowerup.affect.once) {
                if (typeof currentPowerup.affect.thing === 'string') {
                    if (currentPowerup.affect.thing === 'storage') {
                        currentPowerup.affect.change(storage, game);
                    } else {
                        currentPowerup.affect.change(storage[currentPowerup.affect.thing], game);
                    }
                } else if (typeof currentPowerup.affect.thing === 'object') {
                    var things = [];
                    for (var i = 0; i < currentPowerup.affect.thing.length; i++) {
                        things[currentPowerup.affect.thing[i]] = storage[currentPowerup.affect.thing[i]];
                    }
                    currentPowerup.affect.change(things, game);
                }
            }
        }
    }

    var preGameTap = function () {
        cat.body.acceleration.y = 800;
        storage.pipes.setAll('body.velocity.x', -200);
        game.input.onDown.add(gameTap);
        game.tweens.remove(flappyTween);
        title.destroy();
        startLevelButton.destroy();
        if (itemSelector) itemSelector.visible = false;
        if (countGroup) countGroup.visible = false;
        scoreText.visible = true;
        levelText.visible = false;

        if (store.get('current_level') === 1) {
            storage.createPopup('Hey! Welcome to Glidey\nCat. My name\'s Dew. I\nused to run this show,\nbefore that damn cat came\nin. Now I\'m your tour guide!');
            return;
        }

        var index = '' + game.rnd.integerInRange(0, 7);
        boop.play(index);
        cat.body.velocity.y = -300;
        rotateTween = game.add.tween(cat).to({angle: -15}, 200, Phaser.Easing.Linear.None, true)
        .to({angle: 0}, 200, Phaser.Easing.Linear.None, true);

        if (currentPowerup) {
            var powerup = inv[currentPowerup.name];
            if (powerup === 1) {
                delete inv[currentPowerup.name];
            } else {
                powerup -= 1;
                inv[currentPowerup.name] = powerup;
            }
            store.set('inventory', inv);

            if (currentPowerup.affect.how === 'attributes') {
                for (var attr in currentPowerup.affect.change) {
                    storage[currentPowerup.affect.thing][attr] = currentPowerup.affect.change[attr];
                }
            } else if (currentPowerup.affect.how === 'function' && currentPowerup.affect.once) {
                if (typeof currentPowerup.affect.thing === 'string') {
                    if (currentPowerup.affect.thing === 'storage') {
                        currentPowerup.affect.change(storage, game);
                    } else {
                        currentPowerup.affect.change(storage[currentPowerup.affect.thing], game);
                    }
                } else if (typeof currentPowerup.affect.thing === 'object') {
                    var things = [];
                    for (var i = 0; i < currentPowerup.affect.thing.length; i++) {
                        things[currentPowerup.affect.thing[i]] = storage[currentPowerup.affect.thing[i]];
                    }
                    currentPowerup.affect.change(things, game);
                }
            }
        }
    }
    
    var oobGround = function (gr) {
        if (gr.x > 0) return;
        if (storage.ground.getIndex(gr) === 0) {
            gr.x = storage.ground.getAt(1).x + 500;
        } else {
            gr.x = storage.ground.getAt(0).x + 500;
        }
    }

    storage.ground = game.add.group();
    for (var i = 0; i < 2; i++) {
        var piece = storage.ground.create(i * 500, 400, 'ground');
        piece.body.immovable = true;
        piece.events.onOutOfBounds.add(oobGround);
    }
    storage.ground.setAll('body.velocity.x', -200);

    var startLevelButton = game.add.button(Math.floor(game.world.centerX - 226 / 2), 380, 'start_level', preGameTap, this, 1, 0, 1);


    var oldAcc;
    var pause = function () {
        cat.animations.stop('glide');
        oldAcc = cat.body.velocity.clone();
        cat.body.velocity = 0;
        storage.pipes.setAll('body.velocity.x', 0);
        storage.ground.setAll('body.velocity.x', 0);
        game.input.onDown.remove(gameTap);
    }
    var resume = function () {
        cat.animations.play('glide', 30, true);
        cat.body.velocity = oldAcc;
        storage.pipes.setAll('body.velocity.x', -200);
        storage.ground.setAll('body.velocity.x', -200);
        game.input.onDown.add(gameTap);

        var index = '' + game.rnd.integerInRange(0, 7);
        boop.play(index);

        cat.body.velocity.y = -300;
        rotateTween = game.add.tween(cat).to({angle: -15}, 200, Phaser.Easing.Linear.None, true)
        .to({angle: 0}, 200, Phaser.Easing.Linear.None, true);
    }

    storage.createPopup = function (msg, callback) {
        var popup = game.add.button(game.world.centerX - 266 / 2, 600, 'notice');
        var prTween = game.add.tween(popup).to({y: game.world.centerY - 292 / 2}, 700, Phaser.Easing.Back.Out, true)
        var toContinue = game.add.text(0, 420, 'Tap the box to continue.', { font: '32px Boogaloo',fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
        toContinue.inputEnabled = true;
        toContinue.alpha = 0;
        toContinue.x = Math.floor(game.world.centerX - toContinue.width / 2);
        game.add.tween(toContinue).to({alpha: 1}, 300, Phaser.Easing.Linear.None, true, 750);
        var text = game.add.text(0, 180, msg, { font: '24px Boogaloo',fill: '#ffffff', stroke: '#000000', strokeThickness: 5, align: 'center' });
        text.x = Math.floor(game.world.centerX - text.width / 2);
        text.alpha = 0;
        game.add.tween(text).to({alpha: 1}, 300, Phaser.Easing.Linear.None, true, 750);

        prTween.onComplete.add(function () {
            popup.onInputUp.add(popupTap);
        });

        if (!storage.ended) pause();
        var popupTap = function () {
            popup.destroy();
            toContinue.destroy();
            text.destroy();
            game.input.onDown.remove(popupTap);
            if (!storage.ended) resume();
            if (callback) callback();
        }
    }

    var scoreText = storage.scoreText = game.add.text(0, 50, '0', { font: '48px Boogaloo', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
    scoreText.x = Math.floor(game.world.centerX - scoreText.width / 2);
    scoreText.visible = false;

    var powerupsAmount = Object.keys(inv).length;
    if (powerupsAmount !== 0) {
        var itemSelector = game.add.group();
        var countGroup = game.add.group();
        var itemOffset = -1;
        var x = 0;
        var y = 280;
        for (var name in inv) {
            itemOffset++;
            if (itemOffset !== 0) x += 68;
            if (itemOffset % 4 === 0 && itemOffset !== 0) {
                x = 0;
                y += 60;
            }
            var itemSprite = game.add.button(x, y, 'item_' + name, function () {
                currentPowerup = items[this.name];
                currentPowerup.name = this.name;
                itemSelector.setAll('scale', {x: 0.5, y: 0.5});
                this.scale = {x: 0.75, y: 0.75};
            });
            itemSprite.anchor.setTo(0.5, 0.5);
            itemSprite.name = name;
            itemSelector.add(itemSprite);
            itemSprite.scale.setTo(0.5, 0.5);

            var itemCount = game.add.text(x + 10, y + 10, '' + inv[name], { font: '14px Boogaloo', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
            countGroup.add(itemCount);
        }
        itemSelector.x = 60;
        countGroup.x = 60;
    }

    storage.hitCheck = function () {
        return !storage.ended;
    }

    storage.onHit = function (player, pipe) {
        var rnd = game.rnd.integerInRange(1, 3);
        if (pipe.gold) {
            glide.play('golden_glide' + rnd);
        } else {
            glide.play('glidetacular' + rnd);
        }
        var newHighScore = false;
        var world = game.world;
        var worldShake = game.add.tween(world).to({angle: 2}, 35, Phaser.Easing.Linear.None, true)
        .to({angle: 0}, 35,Phaser.Easing.Linear.None, true)
        .to({angle: -2}, 35,Phaser.Easing.Linear.None, true)
        .to({angle: 0}, 35,Phaser.Easing.Linear.None, true);

        if (rotateTween && rotateTween._chainedTweens[0].isRunning) rotateTween._chainedTweens[0].stop();
        if (rotateTween && rotateTween.isRunning) rotateTween.stop();
        game.add.tween(cat).to({angle: 90}, 200, Phaser.Easing.Linear.None, true);
        storage.pipes.setAll('body.velocity.x', 0);
        storage.ground.setAll('body.velocity.x', 0);
        game.input.onDown.remove(gameTap);
        storage.ended = true;

        if (storage.score > store.get('high_score')) {
            store.set('high_score', storage.score);
            newHighScore = true;
        } 
        var newLevel = store.get('current_level') + 1;
        store.set('current_level', newLevel);

        // evil bwahaha
        if (pipe.gold) {
            var goldLevel = store.get('gold') + 1;
            store.set('gold', goldLevel);
        } else {
            var goldLevel = store.get('gold') + storage.pipesPassed;
            store.set('gold', goldLevel);
        }

        var showScreen = function () {
            var bg = game.add.sprite(game.world.centerX - 266 / 2, 600, 'done_bg');
            var bgTween = game.add.tween(bg).to({y: game.world.centerY - 424 / 2}, 700, Phaser.Easing.Back.Out, true, 220);

            var scoreText = game.add.text(110, 100, 'Score: ' + storage.score , { font: '30px Boogaloo', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
            scoreText.alpha = 0;
            game.add.tween(scoreText).to({alpha: 1}, 300, Phaser.Easing.Linear.None, true, 960);
            var highScoreText = game.add.text(110, 140, 'High Score: ' + store.get('high_score') , { font: '30px Boogaloo', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
            highScoreText.alpha = 0;
            game.add.tween(highScoreText).to({alpha: 1}, 300, Phaser.Easing.Linear.None, true, 960);
            var flappyGoldText = game.add.text(140, 205, 'Gold: ' + store.get('gold') , { font: '30px Boogaloo', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
            flappyGoldText.alpha = 0;
            game.add.tween(flappyGoldText).to({alpha: 1}, 300, Phaser.Easing.Linear.None, true, 960);

            var shopAction = function () {
                game.sound.pauseAll();
                game.state.start('shop');
            }
            var shopButton = game.add.button(game.world.centerX - 226 / 2, 280, 'over_shop_button', null, this, 1, 0, 1);
            shopButton.alpha = 0;
            game.add.tween(shopButton).to({alpha: 1}, 300, Phaser.Easing.Linear.None, true, 960);

            var replayLevelAction = function () {
                var gold = store.get('gold');
                if (gold === 0) {
                    storage.createPopup('Not enough gold, bro!');
                } else {
                    gold--;
                    store.set('gold', gold);
                    var level = store.get('current_level');
                    level--;
                    store.set('current_level', level);
                    game.state.start('game');
                }
            }

            var replayLevelButton = game.add.button(game.world.centerX - 226 / 2, 335, 'replay_button', null, this, 1, 0, 1);
            replayLevelButton.alpha = 0;
            game.add.tween(replayLevelButton).to({alpha: 1}, 300, Phaser.Easing.Linear.None, true, 960);

            var nextLevelAction = function () {
                game.state.start('game');
            }

            var nextLevelButton = game.add.button(game.world.centerX - 226 / 2, 390, 'next_level_button', null, this, 1, 0, 1);
            nextLevelButton.alpha = 0;
            game.add.tween(nextLevelButton).to({alpha: 1}, 300, Phaser.Easing.Linear.None, true, 960);

            bgTween.onComplete.add(function () {
                nextLevelButton.onInputUp.add(nextLevelAction);
                replayLevelButton.onInputUp.add(replayLevelAction);
                shopButton.onInputUp.add(shopAction);
            });
        }

        if (storage.showGoldPopup) {
            storage.showGoldPopup = false;
            storage.createPopup('I forgot to mention.\nWhen I said one gold, I meant\nliterally just one gold.\nInstead of your usual one gold\nper pipe, you get just one.\nBut... it\'s free gold!', showScreen);
        } else {
            showScreen();
        }

    }

    storage.updateScore = function () {
        var rnd = game.rnd.integerInRange(1, 3);
        storage.score += 1;
        storage.pipesPassed += 1;
        scoreText.content = storage.score;
        scoreText.x = Math.floor(game.world.centerX - scoreText.width / 2);
        if (storage.pipesPassed % 3 === 0) glide.play('glidetastic' + rnd);
        game.sound.play('ding');
    }
}