game.SpendGold = Object.extend({
    init: function(x, y, settings) {
        this.now = new Date().getTime();
        this.lastBuy = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
        this.updateWhenPaused = true;
        this.buying = false;
    },
    update: function() {
        this.now = new Date().getTime();

        if (me.input.isKeyPressed("buy") && this.now - this.lastBuy >= 1000) {
            this.lastBuy = this.now;
            if (!this.buying) {
                this.startBuying();
            } else {
                this.stopBuying();
            }
        }
        
        this.checkBuyKeys();

        return true;
    },
    startBuying: function() {
        this.buying = true;
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
        //builds gold screen
        game.data.buyscreen.updateWhenPaused = true;
        game.data.buyscreen.setOpacity(0.8);
        me.game.world.addChild(game.data.buyscreen, 34);
        //adds gold screen
        game.data.player.body.setVelocity(0, 0);
        me.state.pause(me.state.PLAY);
        me.input.bindKey(me.input.KEY.F1, "F1", true);
        me.input.bindKey(me.input.KEY.F2, "F2", true);
        me.input.bindKey(me.input.KEY.F3, "F2", true);
        me.input.bindKey(me.input.KEY.F4, "F2", true);
        me.input.bindKey(me.input.KEY.F5, "F2", true);
        me.input.bindKey(me.input.KEY.F6, "F2", true);
        this.setBuyText();
    },
    setBuyText: function() {
        new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [game.data.pos.x, game.data.pos.y, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");
                this.updateWhenPaused = true;
                this.alwaysUpdate = true;
                //listens for mouse to be clicked down
                //when player clicks mouse newGame function is called
                //true uses screen coordinates instead of world map coordinates
                //
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Press F1 - F6 to Buy, B to Exit. Current Gold: " + game.data.gold, this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "Skill1: Increase Damage. Current Level: " + game.data.skill1 + " Price: " +((game.data.skill1+1)*10), this.pos.x, this.pos.y + 40);
                this.font.draw(renderer.getContext(), "Skill2: Enhance Speed. Current Level: " + game.data.skill2 + " Price: " +((game.data.skill2+1)*10), this.pos.x, this.pos.y + 80);
                this.font.draw(renderer.getContext(), "Skill3: Amplify Health. Current Level: " + game.data.skill3 + " Price: " +((game.data.skill3+1)*10), this.pos.x, this.pos.y + 120);
                this.font.draw(renderer.getContext(), "I Ability: Ram Rage(Speed Burst): " + game.data.ability4 + " Price: " +((game.data.ability4+1)*10), this.pos.x, this.pos.y + 160);
                this.font.draw(renderer.getContext(), "O Ability: Leach(Life Steal): " + game.data.ability5 + " Price: " +((game.data.ability5+1)*10), this.pos.x, this.pos.y + 200);
                this.font.draw(renderer.getContext(), "P Ability: Javelin(Spear Throw): " + game.data.ability6 + " Price: " +((game.data.ability6+1)*10), this.pos.x, this.pos.y + 240);

            }
        }));
        me.game.world.addChild(game.data.buytext, 35);
    },
    stopBuying: function() {
        this.buying = false;
        me.state.resume(me.state.PLAY);
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        me.game.world.removeChild(game.data.buyScreen);

        me.input.unbindKey(me.input.KEY.F1, "F1", true);
        me.input.unbindKey(me.input.KEY.F2, "F2", true);
        me.input.unbindKey(me.input.KEY.F3, "F2", true);
        me.input.unbindKey(me.input.KEY.F4, "F2", true);
        me.input.unbindKey(me.input.KEY.F5, "F2", true);
        me.input.unbindKey(me.input.KEY.F6, "F2", true);
        me.game.world.removeChild(game.data.buytext);
    },
    checkBuyKeys: function(){
        if(me.input.isKeyPressed("F1")){
            if(this.checkCost(1)){
                this.makePurchase(1);
            }
        }else if(me.input.isKeyPressed("F2")){
            if(this.checkCost(2)){
                this.makePurchase(2);
            }
        }else if(me.input.isKeyPressed("F3")){
            if(this.checkCost(3)){
                this.makePurchase(3);
            }
        }else if(me.input.isKeyPressed("F4")){
            if(this.checkCost(4)){
                this.makePurchase(4);
            }
        }else if(me.input.isKeyPressed("F5")){
            if(this.checkCost(5)){
                this.makePurchase(5);
            }
        }else if(me.input.isKeyPressed("F6")){
            if(this.checkCost(6)){
                this.makePurchase(6);
            }
        }
    },
    checkCost: function(skill){
        if(skill===1 && (game.data.gold >= ((game.data.skill1+1)*10))){
            
        }else if(skill===2 && (game.data.gold >= ((game.data.skill2+1)*10))){
            
        }else if(skill===3 && (game.data.gold >= ((game.data.skill3+1)*10))){
            
        }else if(skill===4 && (game.data.gold >= ((game.data.ability1+1)*10))){
            
        }else if(skill===5 && (game.data.gold >= ((game.data.ability2+1)*10))){
            
        }else if(skill===6 && (game.data.gold >= ((game.data.ability3+1)*10))){
            
        }else{
            return false;
        }
    },
    makePurchase: function(skill){
        if(skill===1){
        game.data.gold -=((game.data.skill1+1)*10);
        game.data.skill1 += 1;
        game.data.playerAttack += 1;
    }else if(skill===2){
        game.data.gold -=((game.data.skill1+1)*10);
        game.data.skill2 += 1;
        game.data.playerMoveSpeed += 1;
    }else if(skill===3){
        game.data.gold -=((game.data.skill1+1)*10);
        game.data.skill3 += 1;
        game.data.playerHealth += 1;
    }else if(skill===4){
        game.data.gold -=((game.data.skill1+1)*10);
        game.data.ability1 += 1;
    }else if(skill===5){
        game.data.gold -=((game.data.skill1+1)*10);
        game.data.ability2 += 1;
    }else if(skill===6){
        game.data.gold -=((game.data.skill1+1)*10);
        game.data.ability3 += 1;
    }
    }
});
