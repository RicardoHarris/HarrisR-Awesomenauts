game.TitleScreen = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
        //puts title screen in when gme starts
        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                this.font = new me.Font("Arial", 46, "white");
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(), true);
                //listens for mouse to be clicked down
                //when player clicks mouse newGame function is called
                //true uses screen coordinates instead of world map coordinates
                //
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "|Awesomenauts|", 365, 130);
                this.font.draw(renderer.getContext(), "[Start A New Game]", this.pos.x, this.pos.y);
            },
            update: function(dt) {

            },
            newGame: function() {
                me.input.releasePointerEvent('pointerdown', this);
                me.state.change(me.state.NEW);
            }
        })));

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [380, 340, 250, 50]);
                this.font = new me.Font("Arial", 46, "white");
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(), true);
                //listens for mouse to be clicked down
                //when player clicks mouse newGame function is called
                //true uses screen coordinates instead of world map coordinates
                //
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "|Awesomenauts|", 365, 130);
                this.font.draw(renderer.getContext(), "[Continue]", this.pos.x, this.pos.y);
            },
            update: function(dt) {

            },
            newGame: function() {
                me.input.releasePointerEvent('pointerdown', this);
                me.state.change(me.state.LOAD);
            }
        })));

    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {

    }
});
