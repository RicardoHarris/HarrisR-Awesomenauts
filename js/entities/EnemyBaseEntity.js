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
        this.health = game.data.enemyBaseHealth;
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

        this.now = new Date().getTime();
        if (this.health <= 0) {
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    onCollision: function() {

    },
    loseHealth: function() {
        this.health--;
    }
    //lowers health by one
});