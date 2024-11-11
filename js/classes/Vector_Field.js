
import Calculations from "./Calculations.js";
import Line from "./geometry/Line.js";
import Point from "./geometry/Point.js";
import Vector from "./geometry/Vector.js";
import Vector_Rotational from "./geometry/Vector_rotational.js";



export default class Vector_Field {

    constructor(pointStart, gap, countX, countY, influenceRadius, maxVectorLength) {


        this.pointStart = pointStart;
        this.gap = gap;
        this.countX = countX;
        this.countY = countY;
        this.influenceRadius = influenceRadius;
        this.maxVectorLength = maxVectorLength;

        this.oldPointEnd = null;

        this.vectorField = Array();

    }

    update(ctx, pointEnd) {

        console.log("vectors loaded: " + this.vectorField.length);

        for (let vector of this.vectorField) {
            vector.draw_me(ctx);
        }

        if (pointEnd == this.oldPointEnd) {

            return;
        }

        this.vectorField = [];

        this.oldPointEnd = pointEnd;

        for (let i = 1; i <= this.countX; i++) {
            for (let j = 1; j <= this.countY; j++) {

                let pointStartForVector = new Point("b", (this.pointStart.x + this.gap) * i, (this.pointStart.y + this.gap) * j);

                let lenghtToTarget = new Calculations()
                .lenght_between_two_points(pointStartForVector.x, pointStartForVector.y, pointEnd.x, pointEnd.y);

                if (lenghtToTarget < this.influenceRadius) {

                    let lenghtOfVector = this.maxVectorLength - (lenghtToTarget * (100 / this.influenceRadius));

                    if (lenghtOfVector >= 0) {
                        this.vectorField.push(new Vector_Rotational("a", pointStartForVector, pointEnd, lenghtOfVector));
                    }
                }

            }
        }
    }


}



