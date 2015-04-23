game.ExpirienceManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
        this.gameover = false;
    },
    update: function() {
        if (game.data.win === true && !this.gameover) {
            this.gameOver(true);
        } else if (game.data.win === false && !this.gameover) {
            this.gameOver(false);
            //if the game is lost and the game isn't over player exp is increased bt 1 and game is ended
        }

        return true;
    },
    gameOver: function(win) {
        if (win) {
            game.data.exp += 10;
        } else {
            game.data.exp += 1;
        }
        console.log(game.data.exp);

        this.gameover = true;
        //if the game is won and the game isn't over player exp is increased by 10 and the game is ended
        me.save.exp = game.data.exp;

        me.save.exp2 = 4;
        //for testing purposes only
    }
});
