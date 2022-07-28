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

function draw() {
    background(51);

    handlePlayer();

    handlePlatforms();

    drawScore();

    handleKeys();

}

/**
 * updates, draw, and applies gravity to player
 * checks if the player falls
 */
function handlePlayer() {

        player.update();
    player.draw();

    if (player.maxAltitude + player.location.y < -height / 2){
        /* end game */
        endGame();
    }

}

/**
 * checks collision , draws , and manages all platforms
 */
function handlePlatforms() {


    for(let i = platforms.length - 1; i >= 0; i--) {
        //loop through platforms backwards

       if (platforms[i].onScreen) {


          platforms[i].draw(player.location.y);

                     if (platforms[i] instanceof Doodler)
                          platforms[i].update();//update doodlers

        if (platforms[i].collidesWith(player)) {

            player.jump();
            if (platforms[i] instanceof Doodler) {
                                         // its not a platform, but a doodler
                points += 100;
                platforms.splice(i, 1);//remove from array

                                        }
            }

        }   else {
            /* no longer on screen, delete previous platforms*/
            platforms.splice(i, 1);

                            /* push new platform*/
            var x = noise(player.maxAltitude, frameCount) * width;
            var y = player.maxAltitude + height;

            if (random() < 0.9) {
                                // 90% of chance being a regular platform
                
                platforms.push(new platform(x, y, 55, color("#FF80F0")));
 }
 else {

    if (random() > 0.5) {
                               //5% chance of being a doodler

                              platforms.push(new Doodler(x, y, true, 50, color("#00FFFF")));

    }

    // 5% chance of not regenerating 
 
        }         
       } 
    }
}