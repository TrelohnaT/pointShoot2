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
    
}


