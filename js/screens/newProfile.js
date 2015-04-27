game.NewProfile = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10); // TODO
        //puts new screen in when gme starts
        
        document.getElementById("input").style.visibility = "visible";
        document.getElementById("load").style.visibility = "visible";
        //makes input and load visible

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
        //sets exp costs

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");
                //listens for mouse to be clicked down
                //when player clicks mouse newGame function is called
                //true uses screen coordinates instead of world map coordinates
                //I HAVE NO IDEA WHAT THESE COMMENTS MEAN AND THEY HAVE CONFUSED
                //ME ABOUT THE CODE HERE. I DO NOT KNOW WHAT THIS CODE DOES BESIDES
                //SET FONT AND TEXT COLOR
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "-SIGN IN-", this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "-Make Username and Password-", this.pos.x, this.pos.y + 250);
            }
            //Puts text on screen

        })));

    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        document.getElementById("input").style.visibility = "hidden";
        document.getElementById("load").style.visibility = "hidden";
        //hides input and load
    }
});
