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
        this.health = game.data.enemyBaseHealth;
        //sets up a tower health system
        this.alwaysUpdate = true;
        //allows tower to allways update weather visible on screen or not
        this.body.onCollision = this.onCollision.bind(this);
        //makes tower collidable

        this.type = "PlayerBase";
        //checks what player is running into when colliding with other things
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
        //adds and sets player base animations


    },
    update: function(delta) {
        this.now = new Date().getTime();
        if (this.health <= 0) {
            this.broken = true;
            //tower broken
            game.data.win = false;
            //game is lost
            this.renderable.setCurrentAnimation("broken");
            //tower's "broken" animation is performed
        }
        //occurs if tower health is less than or equal to zero

        this.body.update(delta);
        //updates player base

        this._super(me.Entity, "update", [delta]);
        return true;

    },
    loseHealth: function(damage) {
        this.health = this.health - damage;
        //makes base lose health as many times as passed in
    },
    onCollision: function() {

    }
});
//sets up basic entity "PlayerBaseEntity"
