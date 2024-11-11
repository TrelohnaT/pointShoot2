import Vector from "../../geometry/Vector.js";
import { Player } from "./Player.js";


export default class PlayerBuilder {

    constructor(id, centerPoint) {
        this.id = id;
        this.kind = "";
        this.size = 10;
        this.offset_angle = 0;
        this.max_angle = 360;
        this.chunck_angle = 360;
        this.centerPoint = centerPoint;

        this.pointList = Array();

        this.vector = new Vector("default", centerPoint, centerPoint);

        this.rotation_direction = 1;

        this.baseRotation = 180;
        this.moveMe = false;
        this.moveSpeed = 1;
    }

    create() {
        return new Player(
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

