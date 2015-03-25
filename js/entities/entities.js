game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        //init = constructor
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
        this.body.setVelocity(5, 20);
        
        this.facing = "right";
        //keeps track of which direction player is going
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        //sets character velocity and allows screen to follow player
        this.renderable.addAnimation("idle", [78]);
        //adds an idle animation to orcSpear slide 78
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        //adds a walking animation
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
        this.renderable.setCurrentAnimation("idle");
        //sets the current animation to the "idle" animation
    },
    update: function(delta) {
        if (me.input.isKeyPressed("right")) {
            //adds to the position of my x by the velocity defined above in 
            //setVelocity() and multiplying it by me.timer.tick
            //me.timer.tick makes the movement look smooth
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
            this.flipX(true);
            //sets animation to "walk" when moving "right"/D key is pressed and
            //flips the x-axis to face the character in the opposite direction
        }else if(me.input.isKeyPressed("left")){
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
        
        if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
            //doesn't allow character to jump whilst jumping or falling
            this.body.jumping = true;
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        }
        //implementation of jump ability

        if (me.input.isKeyPressed("attack")) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                //Sets current animation to attack and once that is over goes
                //back into the idle animation
                this.renderable.setCurrentAnimation("attack");
                //Makes it so that the next time we start this sequence we begin
                //from the first animation, not wherever we left off when we
                //switched to another animation
                this.renderable.setAnimationFrame();
            }
        }

        else if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else {
            this.renderable.setCurrentAnimation("idle");
        }

        if (me.input.isKeyPressed("attack")) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                colsole.log(!this.renderable.isCurrentAnimation("attack"));
                //Sets current animation to attack and once that is over goes
                //back into the idle animation
                this.renderable.setCurrentAnimation("attack", "idle");
                //Makes it so that the next time we start this sequence we begin
                //from the first animation, not wherever we left off when we
                //switched to another animation
                this.renderable.setAnimationFrame();
            }
        }

me.collision.check(this, true, this.collideHandler.bind(this), true);
//passes parameter with information about collision into function collideHandler
        this.body.update(delta);


        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    collideHandler: function(response){
        //response holds all information about a collision
        if(response.b.type==='EnemyBaseEntity'){
            //sees if colliding with enemy base entity
            var ydif = this.pos.y - response.b.pos.y;
            //sets difference beteween player's y and
            var xdif = this.pos.x - response.b.pos.x;
            //sets difference beteween player's y and
            
            console.log("xdif" + xdif + "ydif" + ydif);
            
            if(xdif>-54 && this.facing==="right" && (xdif<0)){
                this.body.vel.x = 0;
                //stops player from moving
                this.pos.x = this.pos.x -1;
                //moves player backwards 1 pixel
            }else if(xdif<60 && this.facing==="left" && (xdif>0)){
                this.body.vel = 0;
                //stops player from moving
                this.pos.x = this.pos.x +1;
                //moves player forwards 1 pixel
            }
        }
    }
    
});
//sets up basic entity "player"

game.PlayerBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function() {
                    return (new me.Rect(0, 0, 50, 67)).toPolygon();
                }
            }]);
        //spawns tower
        this.broken = false;
        //makes sure tower is not broken
        this.health = 10;
        //sets up a tower health system
        this.alwaysUpdate = true;
        //allows tower to allways update weather visible on screen or not
        this.body.onCollision = this.onCollision.bind(this);
        //makes tower collidable

        this.type = "PlayerBaseEntity";
        //checks what player is running into when colliding with other things
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");


    },
    update: function(delta) {
        if (this.health <= 0) {
            this.broken = true;
        }
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    onCollision: function() {

    }
});
//sets up basic entity "PlayerBaseEntity"

game.EnemyBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function() {
                    return (new me.Rect(0, 0, 50, 67)).toPolygon();
                }
            }]);
        //spawns tower
        this.broken = false;
        //makes sure tower is not broken
        this.health = 10;
        //sets up a tower health system
        this.alwaysUpdate = true;
        //allows tower to allways update weather visible on screen or not
        this.body.onCollision = this.onCollision.bind(this);
        //makes tower collidable

        this.type = "EnemyBaseEntity";
        //checks what player is running into when colliding with other things
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");

    },
    update: function(delta) {
        if (this.health <= 0) {
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    onCollision: function() {

    }
});