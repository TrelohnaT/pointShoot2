

export default class Point {

    /**
     * 
     * @param {string} id 
     * @param {int} x 
     * @param {int} y 
     */
    constructor(id, x, y, color = "#000000") {
        this.id = id;
        this.x = x;
        this.y = y;
        this.radius = 1;
        this.color = color;

        this.vector_x = 0;
        this.vector_y = 0;

        this.hitBorder = false;
    }

    move_me(max_x, max_y) {

        if (this.x <= 0 || max_x <= this.x) {
            this.vector_x = this.vector_x * -1;
            this.hitBorder = true;
        } else

        if (this.y <= 0 || max_y <= this.y) {
            this.vector_y = this.vector_y * -1;
            this.hitBorder = true;
        } else {
            this.hitBorder = false;
        }

        this.x = this.x + this.vector_x;
        this.y = this.y + this.vector_y;

        //this.print_info();
    }

    set_vector_x_and_y(vector_x, vector_y) {
        this.vector_x = vector_x;
        this.vector_y = vector_y;
    }

    /**
     * 
     * @param {int} x 
     * @param {int} y 
     */
    set_x_and_y(x, y) {
        this.x = x;
        this.y = y;
    }

    draw_me(ctx) {
        //console.log("Point: " + this.id + " drawed at: X_" + this.x + ", Y_" + this.y);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.stroke();


    }


    print_info() {
        console.log("Point:");
        console.log("id: " + this.id);
        console.log("x: " + this.x);
        console.log("y: " + this.y);
        console.log("radius: " + this.radius);
        console.log("color: " + this.color);

        console.log("vector_x: " + this.vector_x);
        console.log("vector_y: " + this.vector_y);

        console.log("hitBorder: " + this.hitBorder);
    }


}


