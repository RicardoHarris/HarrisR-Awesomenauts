game.GameTimerManager = Object.extend({
    init: function(x, y, settings) {
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
    },
    update: function() {
        this.now = new Date().getTime();

        this.goldTimerCheck();
        this.creepTimerCheck();


        return true;
    },
    goldTimerCheck: function() {
        if (Math.round(this.now / 1000) % 20 === 0 && (this.now - this.lastCreep >= 1000)) {
            console.log("Furst: LOCKED ON");
            //% is called "mod" and it finds the remainder
            console.log("Secund: LOCKED ON");
            game.data.gold += 1;
            console.log("Current Gold: " + game.data.gold);
        }
    },
    //checks to make sure that we have a multiple of 10
    creepTimerCheck: function() {
        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
            //% is called "mod" and it finds the remainder
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 2000, 0, {});
            me.game.world.addChild(creepe, 5);
        }
        //checks to make sure that we have a multiple of 10
    }
});

game.HeroDeathManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
    },
    update: function() {
        if (game.data.player.dead) {
            me.game.world.removeChild(game.data.player);
            me.state.current().resetPlayer(10, 0);
        }
        //removes child and resets player when dead

        return true;
    }
});

game.ExpirienceManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
    },
    update: function() {
        if (game.data.win === true) {
            game.data.exp += 10;
        } else if (game.data.win === false) {
            game.data.exp += 1;
        }
        return true;
    }
});