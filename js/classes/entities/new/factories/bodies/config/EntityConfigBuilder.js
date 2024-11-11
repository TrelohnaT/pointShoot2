import EntityConfig from "./EntityConfig";



export default class EntityConfigBuilder {
    constructor(id, kind, centerPoint) {
        this.id = id;
        this.kind = kind;
        this.centerPoint = centerPoint;
        this.size = 10;
        this.offsetAngle = 0;
        this.maxAngle = 360;
        this.chunckAngle = 45;
        this.baseRotation = 1;
        this.pointList = Array();
        this.rotation_direction = 1;
        this.vector = vector; //new Vector("default", centerPoint, centerPoint);
        this.moveMe = true;
        this.moveSpeed = 10;
        this.terminate = false;
        this.drawPoints = true;
        this.drawLines = true;
        this.doSpin = false;
    }
    /**
     * 
     * @param {Number} value 
     * @returns 
     */
    setSize(value) {
        this.size = value;
        return this;
    }

    /**
     * 
     * @param {Number} value 
     * @returns 
     */
    setOffestAngle(value) {
        this.offsetAngle = value;
        return this;
    }

    /**
     * 
     * @param {Number} value 
     * @returns 
     */
    setMaxAngle(value) {
        this.maxAngle = value;
        return this;
    }

    /**
     * 
     * @param {Number} value 
     * @returns 
     */
    setChunkAngle(value) {
        this.chunckAngle = value;
        return this;
    }

    /**
     * 
     * @param {Number} value 
     * @returns 
     */
    setBaseRotation(value) {
        this.baseRotation = value;
        return this;
    }

    /**
     * 
     * @param {List<String>} value 
     * @returns 
     */
    setPointList(value) {
        this.pointList = value;
        return this;
    }

    /**
     * 
     * @param {Boolean} value 
     * @returns 
     */
    setDoSpin(value) {
        this.doSpin = value
        return this;
    }

    build() {
        return new EntityConfig(
            this.id,
            this.kind,
            this.centerPoint,
            this.size,
            this.offsetAngle,
            this.maxAngle,
            this.chunckAngle,
            this.baseRotation,
            this.pointList,
            this.rotation_direction,
            this.vector,
            this.moveMe,
            this.moveSpeed,
            this.terminate,
            this.drawPoints,
            this.drawLines,
            this.doSpin
        )
    }
}
