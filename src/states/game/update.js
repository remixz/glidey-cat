var store = require('store');

module.exports = function () {
    var game = this.game;
    var storage = this.storage;
    var cat = storage.cats;

    game.physics.overlap(cat, storage.ground, storage.onHit, storage.hitCheck);

    if (!storage.isBoss) {
        game.physics.overlap(cat, storage.pipes, storage.onHit, storage.hitCheck);
        storage.pipes.forEach(function (pipe) {
            if (pipe.bodyBottom && pipe.x < 25 && !pipe.scored) {
                var pipes = store.get('total_pipes');
                pipes++;
                store.set('total_pipes', pipes);
                if (pipes === 1) {
                    storage.createPopup('Wow!\nYou scored your first point!\nGood job!\nEvery point you score gives\nyou one gold.');
                }
                storage.updateScore();
                pipe.scored = true;

                var firstGold = store.get('first_gold');
                if (pipe.gold && !firstGold) {
                    storage.createPopup('Whoa! A gold pipe!\n These pipes give you one gold\nwhen you hit them.\nLet\'s try it now!');
                    store.set('first_gold', true);
                    storage.showGoldPopup = true;
                }

                if (pipe.gold) storage.goldChance = game.rnd.integerInRange(8, 12);
            }
        });
    } else {
        game.physics.overlap(cat, storage.rooks, storage.onHit, storage.hitCheck);
    }
}