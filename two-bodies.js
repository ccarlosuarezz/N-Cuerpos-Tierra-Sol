const startButton = document.getElementById('start_button');
const pauseButton = document.getElementById('pause_button');
const canvas = document.getElementById('milky_way');
let context = canvas.getContext('2d');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);

let isSimulation = false;

let sun = {
    url: 'cool_sun.svg',
    isLoad: false,
    mass: 0,
    size: 200
}
sun.image = new Image();
sun.image.src = sun.url;
sun.image.addEventListener("load", loadSun);

let earth = {
    url: 'kawaii_earth.svg',
    isLoad: false,
    mass: 0,
    size: 100
}
earth.image = new Image();
earth.image.src = earth.url;
earth.image.addEventListener("load", loadEarth);

function loadSun() {
    sun.isLoad = true;
    // draw();
}

function loadEarth() {
    earth.isLoad = true;
    // draw();
}

function draw() {
    if (earth.isLoad && sun.isLoad) {
        let i = 0;
        while (i < 360) {
            (function(ind) {
                setTimeout(function(){
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(sun.image, (canvas.width/2)-(sun.size/2), (canvas.height/2)-(sun.size/2), sun.size, sun.size);
                    
                    context.strokeStyle = '#3A98FE55';
                    context.lineWidth = 3;
                    context.arc(canvas.width/2, canvas.height/2, 300, 0, 2 * Math.PI);
                    context.stroke();
                    isSimulation = true;
                    
                    let center_x = canvas.width/2;
                    let center_y = canvas.height/2;
                    let distance = 300;
                    let angle = ind;
                    let x = center_x + Math.cos(-angle*Math.PI/180) * distance;
                    let y = center_y + Math.sin(-angle*Math.PI/180) * distance;

                    context.drawImage(earth.image, x-(earth.size/2), y-(earth.size/2), earth.size, earth.size);
                    console.log(ind);
                }, 1000 + (10 * ind));
            })(i);
            i++;
            // if (i == 360) {
            //     i = 0;
            // }
        }
    }
}

function start() {
    // isSimulation = true;
    draw();
}

function pause() {
    isSimulation = false;
}