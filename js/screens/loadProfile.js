game.LoadProfile = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('load-screen')), -10);
        //puts load screen in when game starts
        
        document.getElementById("input").style.visibility = "visible";
        document.getElementById("load").style.visibility = "visible";

        me.input.unbindKey(me.input.KEY.B);
        me.input.unbindKey(me.input.KEY.I);
        me.input.unbindKey(me.input.KEY.O);
        me.input.unbindKey(me.input.KEY.P);
        me.input.unbindKey(me.input.KEY.SPACE);
        //unbinds keys
        
        var exp1cost = ((game.data.exp1 + 1) * 10);
        var exp2cost = ((game.data.exp2 + 1) * 10);
        var exp3cost = ((game.data.exp3 + 1) * 10);
        var exp4cost = ((game.data.exp4 + 1) * 10);

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                this.font = new me.Font("Arial", 26, "white"); 
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Enter Username & Password", this.pos.x, this.pos.y);
            }

        })));

    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        document.getElementById("input").style.visibility = "hidden";
        document.getElementById("load").style.visibility = "hidden";
    }
});