// Adapted from https://codepen.io/davepvm/pen/Hhstl

let canvas = $("canvas#cursor-plume")[0];
let stage = canvas.getContext("2d");
let width = null;
let height = null;
let particles = [];
let lastX = null;
let lastY = null;
let mouseX = null;
let mouseY = null;

let mouseDown = false;
let speed_modifier = 1;

const CURSOR_OFFSET = 27;
const MAX_LIFESPAN = 30;
const PARTICLE_BASE_SPEED = 2;
const MAX_SPEED_MODIFIER = 14;
const PARTICLE_SIZE = 3;
const PARTICLE_PER_UPDATE = 15;

//The class we will use to store particles. It includes x and y
//coordinates, horizontal and vertical PARTICLE_BASE_SPEED, and how long it's
//been "alive" for.
function Particle(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.lifespan = Math.random() * 5;
}

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

function init() {

    stage.globalCompositeOperation = "xor";
    resizeCanvas();

    //See if the browser supports canvas
    if (canvas.getContext) {

        //Update the mouse position
        $(document).mousemove(updateMousePosition);
        $(document).mouseleave(function () {
            mouseX = null;
            mouseY = null;
            $(document).unbind('mousemove', updateMousePosition)
        });
        $(document).mouseenter(function () {
            $(document).mousemove(updateMousePosition)
        });

        $(document).mousedown(function () {
            mouseDown = true;
        });
        $(document).mouseup(function () {
            mouseDown = false;
        });

        window.addEventListener("resize", resizeCanvas);

        //Update the particles every frame
        setInterval(update, 1/60);
    } else {
        alert("Canvas not supported.");
    }
}

function updateMousePosition(evt) {
    lastX = mouseX;
    lastY = mouseY;

    mouseX = evt.clientX;
    mouseY = evt.clientY;

    if (lastX === null){
        lastX = mouseX
    }
    if (lastY === null){
        lastY = mouseY
    }
}

function update() {

    //Adds ten new particles every frame
    if (mouseX !== null && mouseY !== null){
        let startX = lastX + CURSOR_OFFSET;
        let startY = lastY + CURSOR_OFFSET;
        let endX = mouseX + CURSOR_OFFSET;
        let endY = mouseY + CURSOR_OFFSET;
        for (let i = 0; i < PARTICLE_PER_UPDATE; i++) {
            let position_fraction = (PARTICLE_PER_UPDATE - i) / PARTICLE_PER_UPDATE;
            let inverse_position_fraction = 1 - position_fraction;
            //Adds a particle at the mouse position, with random horizontal and vertical speeds
            if (mouseDown && speed_modifier < MAX_SPEED_MODIFIER){
                speed_modifier = speed_modifier + (0.005 * (MAX_SPEED_MODIFIER - speed_modifier) / MAX_SPEED_MODIFIER)
            }
            else if ((! mouseDown) && speed_modifier > 1) {
                speed_modifier = speed_modifier - (0.005 * (1 - (MAX_SPEED_MODIFIER - speed_modifier) / MAX_SPEED_MODIFIER) + 0.0001)
            }
            let p = new Particle(
                startX * position_fraction + endX * inverse_position_fraction + i % 4,
                startY * position_fraction + endY * inverse_position_fraction + i % 4,
                Math.random() * 2 + PARTICLE_BASE_SPEED * speed_modifier);
            particles.push(p);
        }
    }

    //Clear the stage so we can draw the new frame
    stage.clearRect(0, 0, width, height);

    //Cycle through all the particles to draw them
    for (let i = 0; i < particles.length; i++) {
        let lifespan_fraction = Math.max((MAX_LIFESPAN - particles[i].lifespan) / MAX_LIFESPAN, 0);

        let hue = lifespan_fraction * 60;
        let saturation = 100;
        let lightness = lifespan_fraction * 100;
        let alpha = (lifespan_fraction + 0.5) * 0.7;

        stage.beginPath();
        stage.arc(particles[i].x, particles[i].y,
            (1 - lifespan_fraction + 1) * (PARTICLE_SIZE),
            0, 2 * Math.PI);

        let gradient = stage.createRadialGradient(particles[i].x, particles[i].y, 2, particles[i].x, particles[i].y, (1 - lifespan_fraction + 1) * (PARTICLE_SIZE));
        gradient.addColorStop(0, "hsl(" + hue + "," + saturation + "%," + lightness + "%," + alpha + ")");
        gradient.addColorStop(1, "hsl(" + hue + "," + saturation + "%," + lightness + "%," + alpha / 3 + ")");

        stage.fillStyle = gradient;
        stage.fill();

        //Move the particle based on its horizontal and vertical speeds
        let trail_speed = particles[i].speed * (0.4 + lifespan_fraction);
        let random_orthogonal_modifier = ((1 - lifespan_fraction) * 1.5 ** 1.5) * (Math.random() * (2) - 1) * 3;
        particles[i].x += trail_speed + random_orthogonal_modifier;
        particles[i].y += trail_speed - random_orthogonal_modifier;

        particles[i].lifespan++;
        //If the particle has lived longer than we are allowing, remove it from the array.
        if (particles[i].lifespan >= MAX_LIFESPAN / 1.5) {
            if (particles[i].lifespan >= MAX_LIFESPAN * 1.5) {
                particles.splice(i, 1);
                i--;
            }
            else if (Math.random() > 0.9){
                particles.splice(i, 1);
                i--;
            }
        }
    }
}

init();