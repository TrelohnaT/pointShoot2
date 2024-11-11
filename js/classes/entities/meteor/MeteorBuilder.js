
import Point from "../../geometry/Point.js";
import Vector from "../../geometry/Vector.js";
import { Meteor } from "./Meteor.js";


export default class MeteorBuilder {


    constructor(id, max_x, max_y) {
        this.id = id;
        this.max_x = max_x;
        this.max_y = max_y;
        this.kind = "";
        this.size = 10;
        this.offset_angle = 0;
        this.max_angle = 360;
        this.chunck_angle = 360;
        this.centerPoint = this.getMeteorSpawnPosition(id);


        this.pointList = Array();

        this.vector = new Vector("default", this.centerPoint, this.centerPoint);

        this.rotation_direction = 1;

        this.baseRotation = 180;
        this.moveMe = false;
        this.moveSpeed = 1;
    }

    create() {
        return new Meteor(
            this.id,
            this.kind,
            this.size,
            this.offset_angle,
            this.max_angle,
            this.chunck_angle,
            this.centerPoint,
            this.baseRotation,
            this.rotation_direction,
            this.moveMe,
            this.moveSpeed,
            this.vector);
    }

    getMeteorSpawnPosition(id) {

        let meteorSpawnOffset = 30;
        let side = Math.floor(Math.random() * 4);

        //left
        if (side == 0) {
            //console.log("spawn left");
            return new Point(id, meteorSpawnOffset, Math.floor(Math.random() * this.max_y));
        }
        // right
        else if (side == 1) {
            //console.log("spawn right");
            return new Point(id, this.max_x - meteorSpawnOffset, Math.floor(Math.random() * this.max_y));
        }
        // top
        else if (side == 2) {
            //console.log("spawn top");
            return new Point(id, Math.floor(Math.random() * this.max_x), meteorSpawnOffset)
        }
        // bottom
        else if (side == 3) {
            //console.log("spawn bottom");
            return new Point(id, Math.floor(Math.random() * this.max_x), this.max_y - meteorSpawnOffset);
        }

    }

    setKind(kind) {
        this.kind = kind;
        return this;
    }

    setSize(size) {
        this.size = size;
        return this;
    }

    setOffestAngle(offset_angle) {
        this.offset_angle = offset_angle;
        return this;
    }

    setMaxAngle(max_angle) {
        this.max_angle = max_angle;
        return this;
    }

    setChunkAngle(chunck_angle) {
        this.chunck_angle = chunck_angle;
        return this;
    }

    setRotationDirection(rotation_direction) {
        this.rotation_direction = rotation_direction;
        return this;
    }

    setMoveMe(moveMe) {
        this.moveMe = moveMe;
        return this;
    }

    setMoveSpeed(moveSpeed) {
        this.moveSpeed = moveSpeed;
        return this;
    }

    setVector(vector) {
        this.vector = vector;
        return this;
    }

}

