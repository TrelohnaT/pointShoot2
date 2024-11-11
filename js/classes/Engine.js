

import Point from './geometry/Point.js';
import Calculations from './Calculations.js';
import PlayerBuilder from './entities/player/PlayerBuilder.js';
import ProjectileBuilder from './entities/projectile/ProjectlieBuilder.js';
import MeteorBuilder from './entities/meteor/MeteorBuilder.js';
import Line from './geometry/Line.js';

export default class Engine {

    constructor(id) {
        this.id = id;
        this.keepRunning = true;
        this.mousePosition;
        this.entityMap = new Map();

        this.max = 0;
        this.max_y = 0;

        this.entityListToTerminate = Array();

        this.projectileId = 0;
        this.meteorId = 0;

        this.projectileCount = 0;
        this.meteorCount = 0;

        this.meteorMaxCount = 10;
        this.meteorSpeed = 1;

        this.macroProjectile = "projectile";
        this.macroPlayer = "player";
        this.macroMeteor = "meteor";

        this.playerScore = 0;

        this.playerAlive = true;

    }

    /**
     * Is called once at the start.
     * @param {*} ctx 
     * @param {*} max_x 
     * @param {*} max_y 
     * @param {*} mousePosition 
     */
    setUp(ctx, max_x, max_y, mousePosition) {

        this.max_x = max_x;
        this.max_y = max_y;

        // creating player
        this.entityMap.set(this.macroPlayer,
            new PlayerBuilder(this.macroPlayer, new Point("player_center_point", max_x / 2, max_y / 2))
                .setKind(this.macroPlayer)
                .setMoveMe(true)
                .setMoveSpeed(0.1)
                .setSize(50)
                .setChunkAngle(90)
                .create());

    }

    /**
     * Iscalled every frame.
     * @param {*} ctx 
     * @param {*} max_x 
     * @param {*} max_y 
     * @param {*} mousePosition 
     * @param {*} events 
     */
    update(ctx, max_x, max_y, mousePosition, events) {

        this.meteorMaxCount = document.getElementById("maxMeteorCount").value;
        this.meteorSpeed = document.getElementById("maxMeteorsSpeed").value;

        if(!this.playerAlive) {


            return false;
        }

        this.logToDocument();

        // this remove when you will be happy
        mousePosition.draw_me(ctx);

        if (events.mouseClick) {
            let player = this.entityMap.get(this.macroPlayer);

            if (player != null) {

                // creating of projectile
                this.entityMap.set(this.macroProjectile + "_" + this.projectileId,
                    new ProjectileBuilder(this.macroProjectile + "_" + this.projectileId,
                        new Point(this.macroProjectile + "_" + this.projectileId + "_center",
                            player.centerPoint.x, player.centerPoint.y, "#ff0000"))
                        .setKind(this.macroProjectile)
                        .setSize(30)
                        .setChunkAngle(180)
                        .setOffestAngle(player.offset_angle)
                        .setMoveMe(true)
                        .setMoveSpeed(0.5)
                        .setVector(player.vector) // when projectile is fired, vector stays in player
                        .create().setUp());

                this.projectileId++;
                this.projectileCount++;
            }
        } else if (events.keyDownW || events.keyDownS || events.keyDownA || events.keyDownD) {
            this.handlePlayerMoveEvent(events);

        }

        // meteor generation
        this.meteorSpawner();

        this.forAllEntities(ctx, max_x, max_y, mousePosition);

        document.getElementById("playerScore").innerHTML = this.playerScore;


        return true;
    }

    colisionDetector(pointA, pointB, hitBoxRadius) {

        let distance = new Calculations().lenght_between_two_points(pointA.x, pointA.y, pointB.x, pointB.y);
        //console.log("distance: " + distance);
        return distance <= hitBoxRadius;

    }

    forAllEntities(ctx, max_x, max_y, mousePosition) {

        //console.log("entityMap.size: " + this.entityMap.size);

        for (let [key, entity] of this.entityMap) {

            if (entity.moveMe) {

                entity.move_me(max_x, max_y);
                if (entity.terminate) {
                    this.entityListToTerminate.push(key);
                }
            }


            // updating of rotation of player
            if (key == this.macroPlayer) {
                entity.update(mousePosition, ctx);
                entity.setUp();


                let meteorList = this.getSameKindOfEntity(this.macroMeteor);

                for (let meteor of meteorList) {

                    if (this.colisionDetector(entity.centerPoint, meteor.centerPoint, meteor.size)) {
                        this.playerAlive = false;
                        return;
                    }

                }

            }
            else if (key.includes(this.macroProjectile)) {

                let meteorList = this.getSameKindOfEntity(this.macroMeteor);

                //console.log("meteorList.length: " + meteorList.length);

                // check if some projectile hit something
                for (let meteor of meteorList) {

                    if (this.colisionDetector(entity.centerPoint, meteor.centerPoint, meteor.size)) {

                        this.playerScore = this.playerScore + 100;

                        // projectile and meteor will be destroyed
                        entity.terminate = true;
                        this.entityListToTerminate.push(meteor.id);
                    }

                }

            }
            // spinning meteors and more
            else if (key.includes(this.macroMeteor)) {
                entity.spin(2); // random speed of rotation every frame
                entity.isSymetric = false; // seting unSymetric shape of meteor
                entity.setUp();

                //entity.vector.print_info();
            }

            // removal of entites damned to be terminated
            for (let toTerminate of this.entityListToTerminate) {
                this.entityMap.delete(toTerminate);
                if (toTerminate.includes(this.macroProjectile)) {
                    this.projectileCount--;
                } else if (toTerminate.includes(this.macroMeteor)) {
                    this.meteorCount--;
                }
            }

            this.entityListToTerminate = [];

            this.draw_entity(entity, ctx);
        }

    }

    draw_entity(entity, ctx) {

        let pointList = entity.getDrawData();

        //for (let point of this.pointList) {
        for (let i = 0; i < pointList.length; i++) {
            if (entity.drawPoints) {
                //pointList[i].draw_me(ctx);
            }
            if (entity.drawLines) {
                if (i < (pointList.length - 1)) {
                    new Line("a", pointList[i].x, pointList[i].y, pointList[i + 1].x, pointList[i + 1].y).draw_me(ctx);
                }
                else {
                    new Line("a", pointList[i].x, pointList[i].y, pointList[0].x, pointList[0].y).draw_me(ctx);
                }

            }

        }


    }

    meteorSpawner() {

        let player = this.getSameKindOfEntity(this.macroPlayer)[0];

        //player.centerPoint.print_info();

        // if there is less meteors then is the treshold, new will spawn in
        for (; this.meteorCount < this.meteorMaxCount; this.meteorCount++) {

            // meteor generation
            this.entityMap.set(this.macroMeteor + "_" + this.meteorId,
                new MeteorBuilder(this.macroMeteor + "_" + this.meteorId, this.max_x, this.max_y)
                    .setKind(this.macroMeteor)
                    .setSize(40)
                    .setChunkAngle(45)
                    .setMoveMe(true)
                    .setMoveSpeed(this.meteorSpeed / 1000) // the vector is directly to the player, so the speed needs to be very slow
                    //.setRotationDirection((Math.floor(Math.random() * 2) == 1 ? 1 : -1))  //rotation to left is not working
                    .create().adjustVector(player.centerPoint));

            this.meteorId++;
        }
    }

    logToDocument() {

        document.getElementById("projectileCounter").innerHTML = this.projectileCount;
        document.getElementById("meteorCounter").innerHTML = this.meteorCount;
        document.getElementById("meteorSpeed").innerHTML = this.meteorSpeed;

    }

    getRandom(max) {
        return Math.floor(Math.random() * max);
    }

    /**
     * 
     * @param {String} kind - base of id
     * @returns list of entities
     */
    getSameKindOfEntity(kind) {
        let output = [];

        for (let [key, entity] of this.entityMap) {

            //console.log("id: " + entity.id);
            if (entity.kind == kind) {
                output.push(entity);
            }

        }
        return output;

    }

    /**
     * playe vector is used for pojectiles, to change this create new vector
     * @param {*} events 
     * @returns 
     */
    handlePlayerMoveEvent(events) {

        let player = this.getSameKindOfEntity(this.macroPlayer)[0];

        if (player == null) {
            console.log("player is NULL");
            return;
        }

        //console.log(JSON.stringify(events));

        let increment = 40;

        let incrementX = 0
        let incrementY = 0;

        if (events.keyDownW) {
            incrementY = increment * -1;
        }
        if (events.keyDownS) {
            incrementY = increment;
        }
        if (events.keyDownA) {
            incrementX = increment * -1;
        }
        if (events.keyDownD) {
            incrementX = increment;
        }

        player.manualMove(incrementX, incrementY);

    }

}


