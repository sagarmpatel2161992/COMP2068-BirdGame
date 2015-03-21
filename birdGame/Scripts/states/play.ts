/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />

/// <reference path="../objects/background.ts" />
/// <reference path="../objects/bird.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/enemy.ts" />
/// <reference path="../objects/money.ts" />

/// <reference path="../objects/button.ts" />

/// <reference path="../objects/scoreboard.ts" />



module states {
    // PLAY STATE
    export class Play {
        // INSTANCE VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++
        public game: createjs.Container;
        public background: objects.Background;
        public bird: objects.Bird;
        public money: objects.Money[] = [];
        public enemy: objects.Enemy[] = [];
        public scoreboard: objects.ScoreBoard;


        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();

            // Add ocean to game
            this.background = new objects.Background();
            this.game.addChild(this.background);


            // Add island to game
            for (var count = constants.MONEY_NUM; count > 0; count--) {
                money[count] = new objects.Money();
                this.game.addChild(money[count]);
            }

            // Add plane to game
            this.bird = new objects.Bird();
            this.game.addChild(this.bird);

            // Add clouds to game
            for (var enemyBird = constants.ENEMY_NUM; enemyBird > 0; enemyBird--) {
                enemy[enemyBird] = new objects.Enemy();
                this.game.addChild(enemy[enemyBird]);
            }
 

            //Add Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game);

            stage.addChild(this.game);
        } // constructor end


        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++

        // Calculate the distance between two points
        distance(p1: createjs.Point, p2: createjs.Point): number {

            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        } // distance end


        //CHECK COLLISION  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        public checkCollision(collider: objects.GameObject) {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            p1.x = this.bird.x;
            p1.y = this.bird.y;
            p2.x = collider.x;
            p2.y = collider.y;
            if (this.distance(p2, p1) < ((this.bird.height * 0.5) + (collider.height * 0.5))) {
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
            }
            else {
                collider.isColliding = false;
            }
        }


        // UPDATE METHOD
        public update() {

            this.background.update();
            this.bird.update();

            if (this.scoreboard.lives > 0) {
                for (var enemyBird = constants.ENEMY_NUM; enemyBird > 0; enemyBird--) {
                    enemy[enemyBird].update();
                    this.checkCollision(enemy[enemyBird]);
                }

                for (var count = constants.MONEY_NUM; count > 0; count--) {
                    money[count].update();
                    this.checkCollision(money[count]);
                }
            }

            this.scoreboard.update();

            if (this.scoreboard.lives < 1) {
                //createjs.Sound.stop();
                game.removeAllChildren();
                //stage.removeChild(game);
                stage.removeAllChildren();
            }

        } // update method end
    }
}