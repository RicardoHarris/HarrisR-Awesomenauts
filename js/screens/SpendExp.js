game.SpendScreen = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO
        //puts title screen in when gme starts

        me.input.bindKey(me.input.KEY.F1, "F1");
        me.input.bindKey(me.input.KEY.F2, "F2");
        me.input.bindKey(me.input.KEY.F3, "F3");
        me.input.bindKey(me.input.KEY.F4, "F4");
        me.input.bindKey(me.input.KEY.F5, "F5");
        var exp1cost = ((game.data.exp1 + 1) * 10);

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");
                //listens for mouse to be clicked down
                //when player clicks mouse newGame function is called
                //true uses screen coordinates instead of world map coordinates
                //
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "-Press F1 - F4 to Buy, F5 to Skip-", this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "Current Exp: " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
                this.font.draw(renderer.getContext(), "F1: Increase Gold Production Current Level " + game.data.exp1.toString() + " Price: " + exp1cost, this.pos.x, this.pos.y + 100);
                this.font.draw(renderer.getContext(), "F2: Add Starting Gold Current Level " + game.data.exp1.toString() + " Price: " + exp1cost, this.pos.x, this.pos.y + 150);
                this.font.draw(renderer.getContext(), "F3: Increase Attack Damage Current Level " + game.data.exp1.toString() + " Price: " + exp1cost, this.pos.x, this.pos.y + 200);
                this.font.draw(renderer.getContext(), "F4: Increase Startiing Health Current Level " + game.data.exp1.toString() + " Price: " + exp1cost, this.pos.x, this.pos.y + 250);
            }

        })));

        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
            if (action === "F1") {
                if (game.data.exp >= exp1cost) {
                    game.data.exp1 += 1;
                    game.data.exp -= exp1cost;
                    me.state.change(me.state.PLAY);
                }
                //if exp >= exp1 + 1 * 10, then gold production is increased by 1, exp is subtracted by 10, and game begins
                else {
                    console.log("insufficient expirience");
                }
            } else if (action === "F2") {
                if (game.data.exp >= exp1cost) {
                    game.data.exp1 += 1;
                    game.data.exp -= exp1cost;
                    me.state.change(me.state.PLAY);
                }
                else {
                    console.log("insufficient expirience");
                }
            } else if (action === "F3") {
                if (game.data.exp >= exp1cost) {
                    game.data.exp1 += 1;
                    game.data.exp -= exp1cost;
                    me.state.change(me.state.PLAY);
                }
                else {
                    console.log("insufficient expirience");
                }
            } else if (action === "F4") {
                if (game.data.exp >= exp1cost) {
                    game.data.exp1 += 1;
                    game.data.exp -= exp1cost;
                    me.state.change(me.state.PLAY);
                }
                else {
                    console.log("insufficient expirience");
                }
            } else if (action === "F5") {
                me.state.change(me.state.PLAY);
                //starts game if key F5 is pressed
            }
        });

    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.F1, "F1");
        me.input.unbindKey(me.input.KEY.F2, "F2");
        me.input.unbindKey(me.input.KEY.F3, "F3");
        me.input.unbindKey(me.input.KEY.F4, "F4");
        me.input.unbindKey(me.input.KEY.F5, "F5");
        //unbinds purchase keys
        me.event.unsubscribe(this.handler);
        //unsubscribes the handler
    }
});
