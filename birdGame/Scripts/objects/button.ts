module objects {
    export class Button extends createjs.Bitmap {

        // PRIVATE INSTANCE VARIABLES +++++++++++++++++++++++++++++++++++++++++++++++++

        constructor(stringPath: string, x: number, y: number) {
            super(assetLoader.getResult(stringPath));

            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            // set buttton position 
            this.x = x;
            this.y = y; 4
            // add event listener 
            this.addEventListener("mouseover", this._buttonOver);
            this.addEventListener("mouseout", this._buttonOut);
        }

        // EVENT HANDLERS

        // mouseout event 
        private _buttonOut(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 1.0;
        }
        // mouseover event 
        private _buttonOver(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 0.5;
        }

    }

} 