game.ExpirienceManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
        this.gameover = false;
    },
    update: function() {
        if (game.data.win === true && !this.gameover) {
            this.gameOver(true);
            alert("VICTORY");
        } else if (game.data.win === false && !this.gameover) {
            this.gameOver(false);
            //if the game is lost and the game isn't over player exp is increased bt 1 and game is ended
            alert("DEFEAT");
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

        $("#register").bind("click", function() {
            $.ajax({
                type: "POST",
                url: "php/controller/save-user.php",
                //sends to create-user
                data: {
                    exp: game.data.exp,
                    exp1: game.data.exp1,
                    exp2: game.data.exp2,
                    exp3: game.data.exp3,
                    exp4: game.data.exp4
                },
                dataType: "text"
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
