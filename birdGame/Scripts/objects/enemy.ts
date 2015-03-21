/// <reference path="gameobject.ts" />

module objects {

    export class Enemy extends objects.GameObject {
     
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("enemy");

            this.x = 480;

            //createjs.Sound.play("engine", { loop: -1 });

        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++

        public update() {
            this.y = stage.mouseY;
        }
    }

}   