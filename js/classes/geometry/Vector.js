
import Point from "./Point.js";

export default class Vector
{

    /**
     * 
     * @param {string} id 
     * @param {int} point_start 
     * @param {int} point_end 
     * @param {boolean} whole - pokud true, vector je cela delka
     */
    
    constructor(id, point_start = null, point_end = null)
    {
        this.id = id;

        this.point_start = point_start;
        this.point_end = point_end;

        this.length = -1;

        this.x = 0;
        this.y = 0;

        this.x_smalest = 0;
        this.y_smalest = 0;

        if(point_start != null && point_end != null)
        {
            this.do_calculations();

        }


    }

 
    do_calculations()
    {
        this.calculate_vector();

        this.calculate_length();

        //this.calculate_smalest();
        return this;
    }

    changeTarget(targetPoint) {
        this.point_end = targetPoint;

        this.do_calculations();
    }
    
    move_me(max_x, max_y) {
        this.point_start.move_me(max_x, max_y);
        this.point_end.move_me(max_x, max_y);
    }

    draw_me(ctx) {
        // vykresleni bodu teto usecky
        this.point_start.draw_me(ctx);
        this.point_end.draw_me(ctx);

        // vykresleni teto usecky jako takove
        ctx.moveTo(this.point_start.x, this.point_start.y);
        ctx.lineTo(this.point_end.x, this.point_end.y);
        ctx.strokeStyle = this.color;
        ctx.stroke();

    }
    
    /**
     * Funkce pro pridani vectoru
     * @param {int} x 
     * @param {int} y 
     */
    set_x_y(x, y)
    {
        this.x = x;
        this.y = y;

    }

    calculate_smalest()
    {
        this.x_smalest = this.x;
        
        while(5 <= this.x_smalest)
        {
            this.x_smalest = this.x_smalest / 5;

        }
        
        this.y_smalest = this.y;

        while(5 <= this.y_smalest)
        {
            this.y_smalest = this.y_smalest / 5;

        }

    }

    /**
     * Funkce pro pridani instance Point do tohoto Vectoru
     * @param {string} kind - start / end
     * @param {Point} point_new - instance tridy Point
     */
    set_point(kind, point_new)
    {
        if(kind == "start")
        {
            this.point_start = point_new;

        }
        else if(kind == "end")
        {
            this.point_end = point_new;

        }
        else
        {
            console.log("Vector: " + this.id + " uknows kind of point: " + kind);
        }
        return this;
    }

    calculate_length()
    {
        this.length = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    /**
     * funcke pro vypocet vecktoru
     */
    calculate_vector()
    {   
        this.x = this.point_end.x - this.point_start.x;
        this.y = this.point_end.y - this.point_start.y;

    }

    /**
     * 
     * @param {string} kind - start / end
     */
    get_point(kind)
    {
        if(kind == "start")
        {
            return this.point_start;
        }
        else if(kind == "end")
        {
            return this.point_end;
        }
        else 
        {
            console.log("vector_cl.get_point: Unknow kind " + kind);
            return null;
        }

    }

    get_length()
    {
        return this.length;
    }

    get_id()
    {
        return this.id;
    }

    get_x()
    {
        return this.x;
    }

    get_y()
    {
        return this.y;
    }

    get_x_smalest()
    {
        return this.x_smalest;
    }

    get_y_smalest()
    {
        return this.y_smalest;
    }

    set_x(x)
    {
        this.x = x;
    }

    set_y(y)
    {
        this.y = y;
    }

    print_info()
    {
        console.log("vector ID: " + this.id + " X: " + this.x  +  " Y: "  + this.y + " X_s: " + this.x_smalest + " Y_s: " + this.y_smalest + " Lenght: " + this.length);
        console.log("start_point: " + this.point_start.print_info());
        console.log("start_end: " + this.point_end.print_info());
    }


    
}






