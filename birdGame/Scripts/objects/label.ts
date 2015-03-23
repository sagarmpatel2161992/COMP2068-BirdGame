module objects {

    //LABEL CLASS
    export class Label extends createjs.Text {

        //INSTANCE VARIABLES
        public width: number;
        public height: number;

        //CONSTRUCTOR
        constructor(labelString: string, x: number, y: number) {
            super(labelString, constants.FONT_SIZE + " " + constants.FONT_FAMILY,
                constants.FONT_COLOUR);
            //set size of  object
            this.width = this.getMeasuredWidth();
            this.height = this.getMeasuredHeight();

            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            // set position of object
            this.x = x;
            this.y = y;
        }
    }
}   