module objects {

    export class Background extends createjs.Bitmap {
        // PUBLIC VARIABLES
        public width;
        public height;
        public name;
        // PRIVATE VARIABLE
        private dx = 5;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super(assetLoader.getResult("background"));
            this.name = "background";

            // setting width and height
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.reset();

        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++
        private reset() {
            // set the background to start at a random x value
            this.x = 0;
            this.y = 0
        }

        // Check obund function 
        private checkBounds() {
            if (this.x <= -constants.BACKGROUND_RESET_WIDTH) {
                this.reset();
            }
        }


        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            this.x -= this.dx;
            this.checkBounds();
        }
    }
}     