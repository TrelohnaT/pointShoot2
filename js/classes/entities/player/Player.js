import Line from "../../geometry/Line.js";
import Point from "../../geometry/Point.js";
import Triangle from "../../geometry/Triangle.js";
import Vector from "../../geometry/Vector.js";



export class Player {

    constructor(id, kind, size, offset_angle, max_angle, chunck_angle, centerPoint, baseRotation,
        rotation_direction, moveMe, moveSpeed, vector) {
        this.id = id;
        this.kind = kind;
        this.size = size;
        this.offset_angle = offset_angle;
        this.max_angle = max_angle;
        this.chunck_angle = chunck_angle;
        this.centerPoint = centerPoint;
        this.baseRotation = baseRotation;
        this.pointList = Array();

        this.rotation_direction = rotation_direction;
        this.baseRotation = baseRotation;

        this.vector = vector; //new Vector("default", centerPoint, centerPoint);
        this.moveVector = new Vector("moveVector", centerPoint, centerPoint);

        this.moveMe = moveMe;
        this.moveSpeed = moveSpeed;

        this.terminate = false;

        this.drawPoints = true;
        this.drawLines = true;
        this.doSpin = false;

        this.isSymetric = true;
        this.pointsToCenterDistance = Array();
        this.pointsToCenterGenerate = true;

        this.pointsToCenterDistance.push(this.size / 3);
        this.pointsToCenterDistance.push(this.size / 4);
        this.pointsToCenterDistance.push(this.size / 3);
        this.pointsToCenterDistance.push(this.size / 2);

    }

    setUp() {
        this.pointList = [];

        // formula to draw cyrcular shapes
        for (let j = 1; (this.chunck_angle * j) <= this.max_angle; j++) {

            let current_triangle_id = this.id + "_triangle_" + j;
            let triagle = new Triangle(current_triangle_id);
            triagle.point_B_angle_B_length_c_direction(this.centerPoint,
                ((this.offset_angle + this.baseRotation) + (this.chunck_angle * j)) * this.rotation_direction,
                this.pointsToCenterDistance[j - 1]);
            // this is the start point of vector vere the entity is facing
            this.pointList.push(triagle.get_point("A"));

            // if the points are switched, shots will come from behind
            this.vector = new Vector(this.id + "_vector", this.centerPoint, triagle.get_point("A"));

            //triagle.print_info();
        }
        this.pointsToCenterGenerate = false;
        return this;

    }

    move_me(max_x, max_y) {
        this.centerPoint.set_vector_x_and_y(this.moveVector.x * this.moveSpeed, this.moveVector.y * this.moveSpeed);
        this.centerPoint.move_me(max_x, max_y);

        let detectionDistance = 10;
        let sideOffset = 10;

        if(this.centerPoint.hitBorder) {
            //console.log("player hit border!!");

            if (this.centerPoint.x + detectionDistance > max_x) {
                this.centerPoint.x = sideOffset;
            }

            if (this.centerPoint.x - detectionDistance < 0) {
                this.centerPoint.x = max_x - sideOffset;
            }

            if (this.centerPoint.y + detectionDistance > max_y) {
                this.centerPoint.y = sideOffset;
            }           

            if (this.centerPoint.y - detectionDistance < 0) {
                this.centerPoint.y = max_y - sideOffset;
            }

        }

    }

    update(targetPoint, ctx) {
        let triagle = new Triangle("test");

        triagle.point_A_point_B(targetPoint, this.centerPoint);
        this.offset_angle = triagle.angles[triagle.index_C];

        //triagle.draw_me(ctx);

        this.setUp();
        ///return this;

        return triagle;

    }

    manualMove(incrementX, incrementY) {
        this.moveVector.x = this.moveVector.x + incrementX * this.moveSpeed;
        this.moveVector.y = this.moveVector.y + incrementY * this.moveSpeed;

    }

    getDrawData() {
        return this.pointList;
    }


}

