// Source: https://codepen.io/davepvm/pen/Hhstl

let canvas = $("canvas#cursor-plume")[0];
let stage = canvas.getContext("2d");
let width = 650;
let height = 400;
let particles = [];
let mouseX = null;
let mouseY = null;

const max_lifespan = 30;
const particle_base_speed = 6;
const particle_size = 3;

//The class we will use to store particles. It includes x and y
//coordinates, horizontal and vertical particle_base_speed, and how long it's
//been "alive" for.
function Particle(x, y, x_speed, y_speed) {
    this.x = x;
    this.y = y;
    this.x_speed = x_speed;
    this.y_speed = y_speed;
    this.lifespan = 0;
}

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
}

function init() {

    stage.globalCompositeOperation = "xor";
    resizeCanvas();

    //See if the browser supports canvas
    if (canvas.getContext) {

        //Update the mouse position
        $(document).mousemove(getMousePos);
        $(document).mouseleave(function () {
            mouseX = null;
            mouseY = null;
            $(document).unbind('mousemove', getMousePos)
        });
        $(document).mouseenter(function () {
            $(document).mousemove(getMousePos)
        });

        window.addEventListener("resize", resizeCanvas);

        //Update the particles every frame
        var timer = setInterval(update, 40);

    } else {
        alert("Canvas not supported.");
    }
}

function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    // return mouse position relative to the canvas
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
}

function update() {

    //Adds ten new particles every frame
    if (mouseX !== null && mouseY !== null){
        for (let i = 0; i < 100; i++) {
            //Adds a particle at the mouse position, with random horizontal and vertical speeds
            var p = new Particle(mouseX + 24 + i%20, mouseY + 24 + i%20,
                Math.random() * 2 + particle_base_speed,
                Math.random() + 2 + particle_base_speed);
            particles.push(p);
        }
    }

    //Clear the stage so we can draw the new frame
    stage.clearRect(0, 0, width, height);

    //Cycle through all the particles to draw them
    for (let i = 0; i < particles.length; i++) {
        let lifespan_fraction = (max_lifespan - particles[i].lifespan) / max_lifespan;

        let hue = lifespan_fraction * 60;
        let saturation = 100;
        let lightness = lifespan_fraction * 100;
        let alpha = lifespan_fraction * 0.4;
        stage.fillStyle = "hsl(" + hue + "," + saturation + "%," + lightness + "%," + alpha + ")";

        stage.beginPath();
        //Draw the particle as a circle, which gets slightly smaller the longer it's been alive for
        stage.arc(particles[i].x, particles[i].y,
            (1 - lifespan_fraction + 1) * (particle_size),
            0, 2 * Math.PI);
        stage.fill();

        //Move the particle based on its horizontal and vertical speeds
        particles[i].x += particles[i].x_speed * lifespan_fraction;
        particles[i].y += particles[i].y_speed * lifespan_fraction;

        particles[i].lifespan++;
        //If the particle has lived longer than we are allowing, remove it from the array.
        if (particles[i].lifespan >= max_lifespan) {
            particles.splice(i, 1);
            i--;
        }
    }
}

init();