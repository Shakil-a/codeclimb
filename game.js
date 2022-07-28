const gravity = -0.6;

let player;
let points;

let platforms = [];

function setup() {
    
    createCanvas(400, 600);

    player = new Doodler(width / 2, height /2, false, 30, color("#FFF070"))

    platforms = generatedPlatforms();

    points = 0;

    frameRate(60);
}