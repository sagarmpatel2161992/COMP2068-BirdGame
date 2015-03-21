/// <reference path="gameobject.ts" />

module objects {

    export class Enemy extends objects.GameObject {

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("enemy");
            this.name = "enemy";
            //this.soundString = "thunder";

            this.reset();

        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++
        private reset() {
            // set the island to start at a random x value
            this.y = Math.floor(Math.random() * constants.SCREEN_HEIGHT);
            this.x = 0;
            // add drift to the cloud 
            this._dx = Math.floor(Math.random() * 5) + 5;
            this._dy = Math.floor(Math.random() * 4) - 2;
        }

        private checkBounds() {
            if (this.x > (constants.SCREEN_WIDTH + this.width)) {
                this.reset();
            }
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            this.y -= this._dy;
            this.x += this._dx;
            this.checkBounds();
        }

    }
} 