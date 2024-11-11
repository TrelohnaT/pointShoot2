
import Engine from './classes/Engine.js';
import Point from './classes/geometry/Point.js';

// point on cursor
let mousePoint = new Point("mouse_default", 0, 0);

let events = getEmptyEvents();

let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 150;
let ctx = canvas.getContext("2d");

let engine = new Engine("engine");
let stillRun = false;
let frames = 0;

export function mouseClick(event) {
    events.mouseClick = true;
}

export function getMousePosition(event) {

    let rect = canvas.getBoundingClientRect();

    mousePoint = new Point("mouse", event.clientX - rect.left, event.clientY - rect.top);

}

export function starter() {
    


    engine.setUp(ctx, canvas.width, canvas.height, mousePoint);
    startEngine();

}

export function startEngine() {
    stillRun = true;
    
    mainLoop();

}

export function stopEngine() {
    stillRun = false;
}


export function checkPressKeys(e) {

    console.log(e.key);


}

export function reload() {
    window.location.reload();
}

function getEmptyEvents() {
    return {
        mouseClick: false,
        keyDownW: false,
        keyDownS: false,
        keyDownA: false,
        keyDownD: false
    };
}

/**
 * Hlavni smycka ktera se bude opakovat do konce casu, nebo do znovunacteni
 */
function mainLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stillRun = engine.update(ctx, canvas.width, canvas.height, mousePoint, events);

    events = getEmptyEvents();

    if (stillRun) {
        requestAnimationFrame(mainLoop);
        frames++;
    } else {
        document.getElementById("playAgainBtn").style.display = "inline";
        return;
    }
}

setInterval(() => {

    document.getElementById("fps_counter").innerHTML = frames + " FPS";
    frames = 0;
}, 1000)


// Event listeneres

window.addEventListener("keyup", (event) => {

    //console.log(event.key);
    
    if (event.key == "w" || event.key == "W") {
        events.keyDownW = true;
    }
    if (event.key == "s" || event.key == "S") {
        events.keyDownS = true;
    }
    if (event.key == "a" || event.key == "A") {
        events.keyDownA = true;
    }
    if (event.key == "d" || event.key == "D") {
        events.keyDownD = true;
    }

});


