game.ExpirienceManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
        //continuously updates
        this.gameover = false;
        //doesn't allow game to be over
    },
    update: function() {
        if (game.data.win === true && !this.gameover) {
            this.gameOver(true);
            //game is over if game is won but not over
            alert("VICTORY");
            //plauer is alerted of their victory
        } else if (game.data.win === false && !this.gameover) {
            this.gameOver(false);
            //game is not over if player has not won and game is not over
            alert("DEFEAT");
            //player is alerted of their defeat
        }

        return true;
    },
    gameOver: function(win) {
        if (win) {
            game.data.exp += 10;
            //if game is won player is given 10 experience points
        } else {
            game.data.exp += 1;
            //if game is lost player is given 1 experience point
        }        

        this.gameover = true;
        //if the game is won and the game isn't over player exp is increased by 10 and the game is ended
        me.save.exp = game.data.exp;
        //sets save exp to game exp

        me.save.exp2 = 4;
        //for testing purposes only

        $("#register").bind("click", function() {
            $.ajax({
                type: "POST",
                //sets type to post
                url: "php/controller/save-user.php",
                //sends to create-user
                data: {
                    exp: game.data.exp,
                    exp1: game.data.exp1,
                    exp2: game.data.exp2,
                    exp3: game.data.exp3,
                    exp4: game.data.exp4
                },
                //sets game data
                dataType: "text"
                //sets dataType to text \
            })
                    .success(function(response) {
                        if (response === "Invalid username/password") {
                            alert(response);
                            me.state.change(me.state.MENU);
                        } else {
                            var data = jQuery.parseJSON(response);
                            game.data.exp = data["exp"];
                            game.data.exp1 = data["exp1"];
                            game.data.exp2 = data["exp2"];
                            game.data.exp3 = data["exp3"];
                            game.data.exp4 = data["exp4"];


                            me.state.change(me.state.SPENDEXP);
                        }
                    })
                    //begins game if code above succeeds
                    .fail(function(response) {
                        alert("FAIL");
                    });
            //runs if code above fails
        });
    }
});
