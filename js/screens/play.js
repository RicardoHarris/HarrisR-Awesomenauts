game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
                
                //load level01
                me.levelDirector.loadLevel("level01");
                game.data.player = me.pool.pull("player", 30, 30, {});
                //pulls player into game
                me.game.world.addChild(game.data.player, 15);
                //adds player entity to game
                
                me.input.bindKey(me.input.KEY.D, "right");
                me.input.bindKey(me.input.KEY.SPACE, "attack");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
