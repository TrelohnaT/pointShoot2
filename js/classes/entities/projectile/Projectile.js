import Line from "../../geometry/Line.js";
import Triangle from "../../geometry/Triangle.js";
import Vector from "../../geometry/Vector.js";



export class Projectile {

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

        this.moveMe = moveMe;
        this.moveSpeed = moveSpeed;

        this.terminate = false;

        this.drawPoints = true;
        this.drawLines = true;
        this.doSpin = false;

        this.isSymetric = true;
        this.pointsToCenterDistance = Array();
        this.pointsToCenterGenerate = true;

    }




    setUp() {
        //console.log("setUp");

        this.pointList = [];

        // formula to draw cyrcular shapes
        for (let j = 1; (this.chunck_angle * j) <= this.max_angle; j++) {

            if (this.pointsToCenterGenerate) {
                if (this.isSymetric) {
                    this.pointsToCenterDistance.push(this.size / 2);
                } else {
                    // get random change to the distance
                    let change = Math.floor(Math.random() * 10);

                    // increment or decrement by chance
                    if (Math.floor(Math.random() * 2) == 1) {
                        this.pointsToCenterDistance.push(this.size / 2 - change);
                    } else {
                        this.pointsToCenterDistance.push(this.size / 2 + change);
                    }
                }

            }

            let current_triangle_id = this.id + "_triangle_" + j;
            let triagle = new Triangle(current_triangle_id);
            triagle.point_B_angle_B_length_c_direction(this.centerPoint,
                ((this.offset_angle + this.baseRotation) + (this.chunck_angle * j)) * this.rotation_direction,
                this.pointsToCenterDistance[j - 1]);
            // this is the start point of vector vere the entity is facing
            this.pointList.push(triagle.get_point("A"));

            //triagle.print_info();
        }
        this.pointsToCenterGenerate = false;
        return this;

    }

    update() {


    }

    move_me(max_x, max_y) {
        this.centerPoint.set_vector_x_and_y(this.vector.x * this.moveSpeed, this.vector.y * this.moveSpeed);
        this.centerPoint.move_me(max_x, max_y);

        for (let point of this.pointList) {
            point.set_vector_x_and_y(this.vector.x * this.moveSpeed, this.vector.y * this.moveSpeed);
            point.move_me(max_x, max_y);

            if (point.hitBorder) {
                this.terminate = true;
            }

        }
    }

    getDrawData() {
        return this.pointList;
    }


}

