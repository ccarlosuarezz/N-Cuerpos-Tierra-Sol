const startButton = document.getElementById('start_button');
const pauseButton = document.getElementById('pause_button');
const canvas = document.getElementById('solar_system');
let context = canvas.getContext('2d');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);

let isSimulation = false;
let drawInerval;

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
    if (earth.isLoad && sun.isLoad) {
        drawSolarSystem(0);
    }
}

function loadEarth() {
    earth.isLoad = true;
    if (earth.isLoad && sun.isLoad) {
        drawSolarSystem(0);
    }
}

function draw() {
    if (earth.isLoad && sun.isLoad) {
        let i = 1;
        let years = 5;
        
        drawInerval = setInterval(() => {
            drawSolarSystem(i);
            if(i == 360*years) {
                isSimulation=false;
                clearInterval(drawInerval);
            }
            i++;
        }, 20);

        // while (i <= 360*years) {
        //     if (i == 0) {
        //         drawSolarSystem(i);
        //     } else {
        //         (function(ind) {
        //             drawTimeOut = setTimeout(function(){
        //                 drawSolarSystem(ind);
        //                 if(ind == 360*years) {
        //                     isSimulation= false;
        //                 }
        //             }, 10*ind);
        //         })(i);
        //     }
        //     i++
        // }
    }
}

function drawSolarSystem(index) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(sun.image, (canvas.width/2)-(sun.size/2), (canvas.height/2)-(sun.size/2), sun.size, sun.size);
    
    context.strokeStyle = '#3A98FE55';
    context.lineWidth = 3;
    context.beginPath();
    context.arc(canvas.width/2, canvas.height/2, 300, 0, 2 * Math.PI);
    context.closePath();
    context.stroke();
    
    let center_x = canvas.width/2;
    let center_y = canvas.height/2;
    let distance = 300;
    let angle = index;
    let x = center_x + Math.cos(-angle*Math.PI/180) * distance;
    let y = center_y + Math.sin(-angle*Math.PI/180) * distance;
    context.drawImage(earth.image, x-(earth.size/2), y-(earth.size/2), earth.size, earth.size);
}

function start() {
    if (!isSimulation) {
        isSimulation = true;
        draw();
    }
}

function pause() {
    if (isSimulation) {
        isSimulation = false;
        clearInterval(drawInerval);
    }
}