game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        //init = constructor
        this.setSuper();
        this.setPlayerTimers();
        this.setAttributes();
        this.type = 'PlayerEntity';
        //sets a type for the player
        this.setFlags();

        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        //sets character velocity and allows screen to follow player

        this.addAnimation();
    },
    setSuper: function() {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                //spritewidth and spriteheight passes us the main information
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                    //rectangle of what player entity can walk into/polygon
                }
            }]);
        //_super = reaching to the constructor of entity
    },
    
    setPlayerTimers: function() {
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastAttack = new Date().getTime(); //haven't used this
    },
    
    setAttributes: function() {
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        //speed player moves
        this.attack = game.data.playerAttack;
    },
    
    setFlags: function() {
        this.facing = "right";
        //keeps track of which direction player is going
        this.dead = false;
    },
    
    addAnimation: function() {
        this.renderable.addAnimation("idle", [78]);
        //adds an idle animation to orcSpear slide 78
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        //adds a walking animation
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
        this.renderable.setCurrentAnimation("idle");
        //sets the current animation to the "idle" animation
    },
    
    update: function(delta) {
        this.now = new Date().getTime();
        
        this.dead = checkIfDead();
        
        if (this.health <= 0) {
            this.dead = true;
        }

        if (me.input.isKeyPressed("right")) {
            //adds to the position of my x by the velocity defined above in 
            //setVelocity() and multiplying it by me.timer.tick
            //me.timer.tick makes the movement look smooth
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
            this.flipX(true);
            //sets animation to "walk" when moving "right"/D key is pressed and
            //flips the x-axis to face the character in the opposite direction
        } else if (me.input.isKeyPressed("left")) {
            //adds to the position of my x by the velocity defined above in 
            //setVelocity() and multiplying it by me.timer.tick
            //me.timer.tick makes the movement look smooth
            this.facing = "left";
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.flipX(false);
            //sets animation to "walk" when moving "left"/A key is pressed and
            //doesn't flip the x-axis to face the character in the opposite direction
        } else {
            this.body.vel.x = 0;
            //keeps player from moving right when key is not pressed
        }

        if (me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
            //doesn't allow character to jump whilst jumping or falling
            this.body.jumping = true;
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        }
        //implementation of jump ability

        if (me.input.isKeyPressed("attack")) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                //Sets current animation to attack and once that is over goes
                //back into the idle animation
                this.renderable.setCurrentAnimation("attack", "idle");
                //Makes it so that the next time we start this sequence we begin
                //from the first animation, not wherever we left off when we
                //switched to another animation
                this.renderable.setAnimationFrame();
            }
        }
        else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else {
            this.renderable.setCurrentAnimation("idle");
        }

        me.collision.check(this, true, this.collideHandler.bind(this), true);
//passes parameter with information about collision into function collideHandler
        this.body.update(delta);


        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    checkIfDead: function(){
        
    },
    
    loseHealth: function(damage) {
        this.health = this.health - damage;
    },
    //damages player

    collideHandler: function(response) {
        //response holds all information about a collision
        if (response.b.type === 'EnemyBaseEntity') {
            //sees if colliding with enemy base entity
            var ydif = this.pos.y - response.b.pos.y;
            //sets difference beteween player's y and
            var xdif = this.pos.x - response.b.pos.x;
            //sets difference beteween player's y and

            if (ydif < -40 && xdif < 70 && xdif > -45) {
                this.body.falling = false;
                //stops the player from falling
                this.body.vel.y = -1;
                //moves player
            } else if (xdif > -45 && this.facing === "right" && (xdif < 0)) {
                this.body.vel.x = 0;
                //stops player from moving
            } else if (xdif < 70 && this.facing === "left" && (xdif > 0)) {
                this.body.vel.x = 0;
                //stops player from moving
            }

            if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer
                    && (Math.abs(ydif) <= 40) &&
                    (((xdif > 0) && this.facing === "left") || ((xdif < 0) && this.facing === "right"))
                    //if player is to right of creep and facing left player can attack
                    //if player is to left of creep and facing right player can attack
                    ) {
                //checks to see if it has been 1 second since the base was last hit
                this.lastHit = this.now;

                if (response.b.health <= game.data.playerAttack) {
                    game.data.gold += 1;
                    //adds 1 gold for a creep kill
                    console.log("Current Gold: " + game.data.gold);
                }
                //if the creep's health is less than our attack then execute code in if statement

                response.b.loseHealth(game.data.playerAttack);
            }
            //lowers health of base by 1 if attacked
        } else if (response.b.type === 'EnemyCreep') {
            var xdif = this.pos.x - response.b.pos.x;
            var ydif = this.pos.y - response.b.pos.y;
            //keeps track of differences in x and y

            if (xdif > 0) {
                this.pos.x = this.pos.x + 1;
                //pushes player a bit to the right if coming in from right
                if (this.facing === "left") {
                    this.body.vel.x = 0;
                }
                //stops player from moving when facing let towards creep while attacking
            } else {
                this.pos.x = this.pos.x - 1;
                //pushes player a bit to the left if coming in from left
                if (this.facing === "right") {
                    this.body.vel.x = 0;
                }
                //stops player from moving when facing right toward creep while attacking
            }
            if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer) {
                this.lastHit = this.now;
                response.b.loseHealth(game.data.playerAttack);
            }
        }
    }

});
//sets up basic entity "player"
