

export default class EntityConfig{
    constructor(id, kind, centerPoint, size, offset_angle, max_angle, chunck_angle, baseRotation,
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


    
}
