/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="typings/stats/stats.d.ts" />


/// <reference path="constants.ts" />
/// <reference path="objects/gameobject.ts" />

/// <reference path="objects/background.ts" />
/// <reference path="objects/bird.ts" />
/// <reference path="objects/money.ts" />
/// <reference path="objects/enemy.ts" />



// Game Variables +++++++++++++++++++++++++++++++++++++++++++++
var stats: Stats = new Stats();
var canvas;
var stage: createjs.Stage;
var assetLoader: createjs.LoadQueue;
var game: createjs.Container;


// Score Variables
var finalScore: number = 0;
var highScore: number = 0;

// State Variables
var currentState: number;
var currentStateFunction: any;
var stateChanged: boolean = false;


// Game Objects
var background: objects.Background;
var bird: objects.Bird;
var money: objects.Money[] = [];
var enemy: objects.Enemy[] = [];
var scoreboard: objects.ScoreBoard;

// Game Objects
var gameOver;
var play;
var menu;


// asset manifest - array of asset objects
var manifest = [
    { id: "bird", src: "assets/images/bird.png" },
    { id: "background", src: "assets/images/background.jpg" },
    { id: "enemy", src: "assets/images/enemy.png" },
    { id: "money", src: "assets/images/money.jpg" },   
];

function preload() {
    assetLoader = new createjs.LoadQueue(); // instantiated assetLoader
    assetLoader.installPlugin(createjs.Sound);
    assetLoader.on("complete", init, this); // event handler-triggers when loading done
    assetLoader.loadManifest(manifest); // loading my asset manifest
}

function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);
    setupStats();

    main();
}
// UTILITY METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function setupStats() {
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '650px';
    stats.domElement.style.top = '440px';
    document.body.appendChild(stats.domElement);
}


// Calculate the distance between two points ++++++++++++++++++++++++++++++++++++++
function distance(p1: createjs.Point, p2: createjs.Point): number {

    return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
}

//CHECK COLLISION  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function checkCollision(collider: objects.GameObject) {
    var p1: createjs.Point = new createjs.Point();
    var p2: createjs.Point = new createjs.Point();
    p1.x = bird.x;
    p1.y = bird.y;
    p2.x = collider.x;
    p2.y = collider.y;
    if (distance(p2, p1) < ((bird.height * 0.5) + (collider.height * 0.5))) {
        if (!collider.isColliding) {
            //createjs.Sound.play(collider.soundString);
            collider.isColliding = true;
            switch (collider.name) {
                case "money":
                    scoreboard.score += 100;
                    break;
                case "enemy":
                    scoreboard.lives--;
                    break;
            } 
        }
        else {
            collider.isColliding = false;
        }
    }
}

//GAME LOOP +++++++++++++++++++++++++++++
function gameLoop() {
    stats.begin(); // Begin metering
    
    background.update();
    bird.update();
    if (scoreboard.lives > 0) {
        for (var enemyBird = constants.ENEMY_NUM; enemyBird > 0; enemyBird--) {
            enemy[enemyBird].update();
            checkCollision(enemy[enemyBird]);
        }

        for (var count = constants.MONEY_NUM; count > 0; count--) {
            money[count].update();
            checkCollision(money[count]);
        }
    }

    stage.update(); // Refreshes our stage

    if (scoreboard.lives < 1) {
        createjs.Sound.stop();
        game.removeAllChildren();
        //stage.removeChild(game);
        stage.removeAllChildren();
    }
    stats.end(); // End metering
}

// Our Game Kicks off in here
function main() {
    // Instantiate Game Container
    game = new createjs.Container();

    // Add space to game
    background = new objects.Background();
    game.addChild(background);

    bird = new objects.Bird();
    game.addChild(bird);

    for (var enemyBird = constants.ENEMY_NUM; enemyBird > 0; enemyBird--) {
        enemy[enemyBird] = new objects.Enemy();
        game.addChild(enemy[enemyBird]);
    }

    for (var count = constants.MONEY_NUM; count > 0; count--) {
        money[count] = new objects.Money();
        game.addChild(money[count]);
    }

    //Add Scoreboard
    scoreboard = new objects.ScoreBoard();


    stage.addChild(game);

}