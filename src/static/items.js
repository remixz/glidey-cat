module.exports = {
    upsidedown: {
        title: 'taC yedilG',
        description: 'Now the fun is upside\ndown more times fun!',
        price: 3,
        affect: {
            thing: 'cat',
            how: 'attributes',
            change: {
                scale: {x: -1, y: -1},
                x: 70,
                y: 216
            }
        }
    },
    grow: {
        title: 'Glidey Grow',
        description: 'Those pipes stand no chance against\nyou when you\'re this big!',
        price: 4,
        affect: {
            thing: 'cat',
            how: 'attributes',
            change: {
                scale: {x: 2, y: 2}
            }
        }
    },
    padding: {
        title: 'Friendly Pipes',
        description: 'The pipes are closer than usual,\nsince they want to bond!',
        price: 6,
        affect: {
            thing: 'storage',
            how: 'function',
            once: true,
            change: function (storage, game) {
                storage.pipePadding = 100;
            }
        }
    },
    speed: {
        title: 'Sonic Boom',
        description: 'It\'s no use without this power up!\nGotta go fast!',
        price: 8,
        affect: {
            thing: ['pipes', 'ground'],
            how: 'function',
            once: true,
            change: function (things, game) {
                things.pipes.setAll('body.velocity.x', -500);
                things.ground.setAll('body.velocity.x', -500);
            }
        }
    },
    explode: {
        title: 'Kitty Kaboom',
        description: 'The world stands no chance\nagainst your mighty explosions!',
        price: 10,
        affect: {
            thing: 'cats',
            how: 'function',
            once: false,
            change: function (cats, game) {
                var cat = cats.getAt(0);
                var tween = game.add.tween(cat).to({x: 130}, 100, Phaser.Easing.Linear.None, true);

                tween.onComplete.add(function () {
                    var BOOM = game.add.audio('boom', 3);
                    BOOM.play('', 0.7);
                    var catOne = cats.create(cat.x, cat.y, 'kitty');
                    catOne.anchor = new Phaser.Point(0.5, 0.5);
                    var catTwo = cats.create(cat.x, cat.y, 'kitty');
                    catTwo.anchor = new Phaser.Point(0.5, 0.5);
                    var catThree = cats.create(cat.x, cat.y, 'kitty');
                    catThree.anchor = new Phaser.Point(0.5, 0.5);
                    var catFour = cats.create(cat.x, cat.y, 'kitty');
                    catFour.anchor = new Phaser.Point(0.5, 0.5);

                    catOne.body.velocity.setTo(600, 600);
                    catTwo.body.velocity.setTo(600, -600);
                    catThree.body.velocity.setTo(-600, 600);
                    catFour.body.velocity.setTo(-600, -600);
                });
            }
        }
    },
    invisipipes: {
        title: 'Invisipipes',
        description: 'What pipes?\nThis power up hides every pipe in sight!',
        price: 12,
        affect: {
            thing: 'pipes',
            how: 'function',
            once: true,
            change: function (pipes, games) {
                pipes.setAll('alpha', 0)
            }
        }
    }
}