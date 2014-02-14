var store = require('store');

module.exports = function () {
    var game = this.game;

    if (typeof store.get('inventory') === 'undefined') store.set('inventory', {});
    if (typeof store.get('mute') === 'undefined') store.set('mute', false);
    if (typeof store.get('high_score') === 'undefined') store.set('high_score', 0);
    if (typeof store.get('gold') === 'undefined') store.set('gold', 0);
    if (typeof store.get('current_level') === 'undefined') store.set('current_level', 1);
    if (typeof store.get('total_pipes') === 'undefined') store.set('total_pipes', 0);
    if (typeof store.get('first_gold') === 'undefined') store.set('first_gold', false);

    game.state.start('main_menu');
    
}