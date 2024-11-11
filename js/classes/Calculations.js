import Point from "./geometry/Point.js";
import Vector from "./geometry/Vector.js";


export default class Calculations
{
    constructor()
    {

    }

    /**
     * Funkce pro vypocet vzdalenosti mezi temito body
     * @param {int} x_a - pozice na X ose bodu a
     * @param {int} y_a - pozice na Y ose bodu a
     * @param {int} x_b - pozice na X ose bodu b
     * @param {int} y_b - pozice na Y ose bodu b
     */
    lenght_between_two_points(x_a, y_a, x_b, y_b)
    {
        var x_diff = x_a - x_b;
        var y_diff = y_a - y_b;

        return Math.sqrt(Math.pow(x_diff, 2) + Math.pow(y_diff, 2));
        //return Math.floor(Math.sqrt(Math.pow(x_diff, 2) + Math.pow(y_diff, 2)));

    }

    /**
     * Pythagorova veta
     * @param {int} num_1 
     * @param {int} num_2 
     * @returns 
     */
    pythagor(num_1, num_2)
    {
        return Math.sqrt(Math.pow(num_1, 2) + Math.pow(num_2, 2));
        //return Math.floor(Math.sqrt(Math.pow(num_1, 2) + Math.pow(num_2, 2)));


    }

    /**
     * Funkce vypocita uhel mezi temito body
     * @param {int} x_a - pozice na X ose bodu a
     * @param {int} y_a - pozice na Y ose bodu a
     * @param {int} x_b - pozice na X ose bodu b
     * @param {int} y_b - pozice na Y ose bodu b
     */
    angle_between_two_points(x_a, y_a, x_b, y_b)
    {
        var x_diff = x_a - x_b;
        var y_diff = y_a - y_b;


        return Math.atan2(y_diff, x_diff) * 180/Math.PI;

    }

    /**
     * 
     * @param {int} number - cislo ktere porovnavame
     * @param {int} range - rozmezi okolo base cisla
     * @param {int} base - zakladni cislo okolo ktereho cheme range
     */
    close_enought(number, range, base)
    {
        var base_range_plus = base + range;
        var base_range_minus = base - range;

        return this.is_in_range(base_range_minus, number, base_range_plus);

    }

    /**
     * Funkce pro zjistneni, jestli je number v rozmezi mezi border_bottom a border_top
     * @param {int} border_bottom - spodni hranice
     * @param {int} number - porovnavane cislo
     * @param {int} border_top - vrchni hranice
     */
    is_in_range(border_bottom, number, border_top)
    {
        if(border_bottom <= number && number <= border_top)
        {
            return true;
        }
        else
        {
            return false;
        }

    }

/**
 * 
 * @param {string} id - id of vector
 * @param {Point} targetPoint 
 * @param {Point} startPoint
 * @param {boolean} [minimal = true] - should be vector minimal
 * @param {boolean} [floor=true] 
 */
    vectoTo(id, targetPoint, startPoint, minimal = true, floor = true) {

        let diffX = floor ? Math.floor(startPoint.x - targetPoint.x) : startPoint.x - targetPoint.x;
        let diffY = floor ? Math.floor(startPoint.y - targetPoint.y) : startPoint.y - targetPoint.y;

        if(minimal) {

            for(let i = 2; i < 7; i++) {

                while(diffX / i == 0 && diffY / i == 0) {

                    diffX = diffX / i;
                    diffY = diffY / i;
                }
            }
        }

        console.log("diffX: " + diffX);
        console.log("diffY: " + diffY);

        return new Vector(id, 
        new Point(id + "_start", startPoint.x, startPoint.y),
        new Point(id + "_end", diffX, diffY));


    }
    

    /**
     * Funkce spocitani 
     * @param {Line} line_1 
     * @param {Line} line_2 
     */
    intersection_of_lines(line_1 = null, line_2 = null)
    {
        
        console.log("line_1 - ID: " + line_1.get_id());
        console.log("line_2 - ID: " + line_2.get_id());
        
        var U_x_1 = line_1.get_vector().get_x();
        var U_y_1 = line_1.get_vector().get_y();
        var A_x_1 = line_1.get_point("start").get_x();
        var A_y_1 = line_1.get_point("start").get_y();

        var U_x_2 = line_2.get_vector().get_x();
        var U_y_2 = line_2.get_vector().get_y();
        var A_x_2 = line_2.get_point("start").get_x();
        var A_y_2 = line_2.get_point("start").get_y();
        

        // znamenka pro X a Y souradnice
        var X_1 = 1;
        var Y_1 = 1;
        var X_2 = 1;
        var Y_2 = 1;

        /**
         * znamenko pri pocitani obecne rovnice primky
         */
        var sign_a = 1;

        /**
         * znamenko pri scitani obecnych ronvic primky a pocitani pruseciku
         */
        var sign_b = 1;

/*
        // vektor a bod na primce A
        var U_x_1 = -2;
        var U_y_1 = 1;
        var A_x_1 = 0;
        var A_y_1 = 0;

        // vector a bod na primce B
        var U_x_2 = -1;
        var U_y_2 = 1;
        var A_x_2 = 2;
        var A_y_2 = 0;
        */
        
        console.log("Before");
        console.log("X * " + U_y_1 + " = " + A_x_1 + " * " + U_y_1 + " + t * " + U_x_1 + " * " + U_y_1 + " // *" + sign_a);
        console.log("Y * " + U_x_1 + " = " + A_y_1 + " * " + U_x_1 + " + t * " + U_y_1 + " * " + U_x_1); 


        var intersection_x = 1;
        var intersection_y = 1;

        /**
         * Pokud jsou obe U plusove nebo obe dve zaporne
         * U jednoho se zmeni zmanenko
         */
        /*
        if((0 < U_x_1 * U_y_1) || (0 > U_x_1 * U_y_1))
        {
            console.log("X_1 changed");
            U_y_1 = U_y_1 * (-1);
            //A_x_1 = A_x_1 * (-1);
            intersection_x = intersection_x * (-1);
        }

        if((0 < U_x_2 * U_y_2) || (0 > U_x_2 * U_y_2))
        {
            console.log("X_2 changed");
            U_y_2 = U_y_2 * (-1);
            //A_x_2 = A_x_2 * (-1);
            intersection_y = intersection_y * (-1);
        }
        */

        if((U_x_1 * U_y_1 + U_y_1 * U_x_1) != 0)
        {
            sign_a = sign_a * (-1);
        }
        
        console.log("After");
        console.log("Obecna ronvice primky 1")
        console.log("X * " + U_y_1 + " = " + A_x_1 + " * " + U_y_1 + " + t * " + U_x_1 + " * " + U_y_1 + " // *" + sign_a);
        console.log("Y * " + U_x_1 + " = " + A_y_1 + " * " + U_x_1 + " + t * " + U_y_1 + " * " + U_x_1);
        //console.log("A_x_1: " + A_x_1 + " A_y_1: " + A_y_1 + " U_x_1: " + U_x_1 + " U_y_1: " + U_y_1);
        //console.log("A_x_2: " + A_x_2 + " A_y_2: " + A_y_2 + " U_x_2: " + U_x_2 + " U_y_2: " + U_y_2);


        if((0 < U_y_1 && 0 < U_y_2) || (U_y_1 < 0 && U_y_2 < 0))
        {
            console.log("change needed");
            console.log("U_y_1: " + U_y_1 + " U_y_2: " + U_y_2);
            console.log("before - U_y_1: " + U_y_1 + " U_x_1: " + U_x_1);
            U_y_1 = U_y_1 * (-1);
            U_x_1 = U_x_1 * (-1);

            
            console.log("After - U_y_1: " + U_y_1 + " U_x_1: " + U_x_1);

        }


        //intersection_x = ((U_x_2*A_y_2*U_x_1 - U_y_2*A_x_2*U_x_1) - (U_x_1*A_y_1*U_x_2 - U_y_1*A_x_1*U_x_2));
        
        //ntersection_y = ((U_y_1 * intersection_x) + (U_x_1 * A_y_1 - U_y_1 + A_x_1)) / U_x_1;


        intersection_y = intersection_y * (((A_x_1*U_y_1 + A_y_1*U_x_1)*U_y_2) + ((A_x_2*U_y_2 + A_y_2*U_x_2)*U_y_1)) / (U_x_1*U_y_2 + U_x_2*U_y_1);

        // obecna rovnice primky
        //X_1 = ((A_x_1*U_y_1 + A_y_1*U_x_1) - Y_1*U_x_1) / U_y_1;

        intersection_x = intersection_x * ((A_x_1*U_y_1 + A_y_1*U_x_1) - intersection_y*U_x_1) / U_y_1;


        //console.log("X_1: " + X_1 + " Y_1: " + Y_1);






        console.log("X pozice pruseciku je: " + intersection_x);
        console.log("Y pozice pruseciku je: " + intersection_y);

        var intersection_point = new Point("intersection", intersection_x, intersection_y);
        intersection_point.set_color("#0000FF");
        intersection_point.set_radius(5);
        
        return intersection_point;


    }





}


