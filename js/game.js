
/* Game namespace */
var game = {
    // an object where to store game information
    data: {
        // score
        score: 0,
        enemyBaseHealth: 10,
        playerBaseHealth: 10,
        enemyCreepHealth: 10,
        playerHealth: 20,
        enemyCreepAttack: 1,
        playerAttack: 3,
        playerAttackTimer: 1000,
        enemyCreepAttackTimer: 1000,
        playerMoveSpeed: 5,
        creepMoveSpeed: 5,
        GameTimerManager: "",
        HeroDeathManager: "",
        player: "",
        exp: 0,
        gold: 0,
        ability1: 0,
        ability2: 0,
        ability3: 0,
        skill1: 0,
        skill2: 0,
        skill3: 0,
        exp1: 0,
        exp2: 0,
        exp3: 0,
        exp4: 0,
        exp5: 0,
        exp6: 0,
        win: "",
        pausePos: "",
        buyScreen: "",
        buytext: "",
   },
    // Run on page load.
    "onload": function() {
        // Initialize the video.
        if (!me.video.init("screen", me.video.CANVAS, 1067, 600, true, '1.0')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function() {
                me.plugin.register.defer(this, debugPanel, "debug");
            });
        }
        
        me.state.SPENDEXP = 112;
        me.state.NEW = 113;
        me.state.LOAD = 114;
        //giving variabes numbers


        console.log(game.data.exp);
        console.log(game.data.exp2);

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },
    // Run on game resources loaded.
    "loaded": function() {
        me.pool.register("player", game.PlayerEntity, true);
        //register player into game
        me.pool.register("PlayerBase", game.PlayerBaseEntity);
        //register player base into game
        me.pool.register("EnemyBase", game.EnemyBaseEntity);
        //register enemy base into game
        me.pool.register("EnemyCreep", game.EnemyCreep, true);
        //register enemy creep into game
        me.pool.register("GameTimerManager", game.GameTimerManager);
        //register game timer manager into game
        me.pool.register("HeroDeathManager", game.HeroDeathManager);
        //register hero daeth manager into game
        me.pool.register("ExpirienceManager", game.ExpirienceManager);
        //register expirience manager into game
        me.pool.register("SpendGold", game.SpendGold);
        //registers spend gold into game
        me.state.set(me.state.MENU, new game.TitleScreen());
        //sets state MENU to TitleScreen
        me.state.set(me.state.PLAY, new game.PlayScreen());
        //sets state PLAY to PlayScreen
        me.state.set(me.state.SPENDEXP, new game.SpendScreen());
        //sets state SPENDEXP to SpendScreen
        me.state.set(me.state.LOAD, new game.LoadProfile());
        //sets state LOAD to LoadProfile
        me.state.set(me.state.NEW, new game.NewProfile());
        //sets state NEW to NewProfile

        //established variables that represent numbers

        // Start the game.
        me.state.change(me.state.MENU);
        //Puts menu on screen when game starts
    }
};
