

import Calculations from '../../Calculations.js';
import Line from '../../geometry/Line.js';
import Triangle from '../../geometry/Triangle.js';
import Vector from '../../geometry/Vector.js';

export class Entity {

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

            // recalculatoin of vector apply only for player
            if(this.id.includes("player")) {
                // if the points are switched, shots will come from behind
                this.vector = new Vector(this.id + "_vector", this.centerPoint, triagle.get_point("A"));
            }
            //triagle.print_info();
        }
        
        this.pointsToCenterGenerate = false;
        return this;
    }

    generate() {
        if (this.isSymetric) {
            return this.size / 2;
        }
    }

    getDistanceFromCenter() {
        if (this.isSymetric) {
            return this.size / 2;
        } else {
            // get random change to the distance
            let change = Math.floor(Math.random() * 10);

            // increment or decrement by chance
            if (Math.floor(Math.random() * 2) == 1) {
                return this.size / 2 - change;
            } else {
                return this.size / 2 + change;
            }

        }
    }


    set_vector_x_and_y(vector_x, vector_y) {
        for (let point of this.pointList) {
            point.set_vector_x_and_y(vector_x, vector_y);
        }
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

    //TODO rotation to the left is not working
    spin(angleIncrement) {
        this.offset_angle = this.offset_angle + (angleIncrement * this.rotation_direction);

        if (this.offset_angle > 360) {
            this.offset_angle = this.offset_angle - 360;
        } else if (this.offset_angle < 0) {
            this.offset_angle = 360;
        }

    }

    adjustVector(targetPoint) {
        this.vector.changeTarget(targetPoint);
        return this;
    }

    draw_me(ctx) {

        this.centerPoint.draw_me(ctx);

        // shots have still vector to the center
        //this.vector.draw_me(ctx);

        //for (let point of this.pointList) {
        for (let i = 0; i < this.pointList.length; i++) {
            if (this.drawPoints) {
                this.pointList[i].draw_me(ctx);
            }

            if (this.drawLines) {
                if (i < (this.pointList.length - 1)) {
                    new Line("a", this.pointList[i].x, this.pointList[i].y, this.pointList[i + 1].x, this.pointList[i + 1].y).draw_me(ctx);
                }
                else {
                    new Line("a", this.pointList[i].x, this.pointList[i].y, this.pointList[0].x, this.pointList[0].y).draw_me(ctx);
                }

            }

        }

    }
    /*
    generateMeteorVector(targetPoint){

        let vectorToTarget = new Calculations().vectoTo(this.id + "_move_vector",
        targetPoint, this.centerPoint, true);

        console.log("vectorToTarget: " + vectorToTarget.print_info());

        return this;

    }
    */

    manualMove(incrementX, incrementY) {
        this.centerPoint.x = this.centerPoint.x + incrementX;
        this.centerPoint.y = this.centerPoint.y + incrementY;
    }


    print_info() {
        console.log("id: " + this.id);
        console.log("kind: " + this.kind);
        console.log("size: " + this.size);
        console.log("offset_angle: " + this.offset_angle);
        console.log("max_angle: " + this.max_angle);
        console.log("chunck_angle: " + this.chunck_angle);
        console.log("centerPoint: " + this.centerPoint);
        console.log("baseRotation: " + this.baseRotation);
        console.log("pointList.length: " + this.pointList.length);

        console.log("rotation_direction: " + this.rotation_direction);
        console.log("baseRotation" + this.baseRotation);

        this.vector.print_info();

        console.log("moveMe: " + this.moveMe);
        console.log("moveSpeed: " + this.moveSpeed);

        console.log("terminate: " + this.terminate);

        console.log("drawPoints: " + this.drawPoints);
        console.log("drawLines: " + this.drawLines);


    }
}

