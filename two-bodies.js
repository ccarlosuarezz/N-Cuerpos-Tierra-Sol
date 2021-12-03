const startButton = document.getElementById('start_button');
const pauseButton = document.getElementById('pause_button');
const playButton = document.getElementById('play_button');
const canvas = document.getElementById('solar_system');
let context = canvas.getContext('2d');

playButton.addEventListener('click', play);
pauseButton.addEventListener('click', pause);
startButton.addEventListener('click', reset);

let isSimulation = false;
let isPause = false;
let drawInerval;

let sun = {
    url: 'cool_sun.svg',
    isLoad: false,
    mass: 0,
    size: 150
}
sun.image = new Image();
sun.image.src = sun.url;
sun.image.addEventListener("load", loadSun);

let earth = {
    url: 'kawaii_earth.svg',
    isLoad: false,
    mass: 0,
    size: 50
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
            if (!isPause) {
                drawSolarSystem(i);
                if(i == 360*years) {
                    isSimulation=false;
                    clearInterval(drawInerval);
                }
                i++;
            }
        }, 20);
    }
}

function drawSolarSystem(index) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(sun.image, (canvas.width/2)-(sun.size/2), (canvas.height/2)-(sun.size/2), sun.size, sun.size);
    
    context.strokeStyle = '#3A98FE55';
    context.lineWidth = 3;

    // context.beginPath();
    // context.arc(canvas.width/2, canvas.height/2, 300, 0, 2 * Math.PI);
    // context.closePath();
    // context.stroke();
    
    context.beginPath();
    context.ellipse(canvas.width/2, canvas.height/2, 300, 200, 0, 0, 2 * Math.PI);
    context.closePath();
    context.stroke();
    
    
    let centerX = canvas.width/2;
    let centerY = canvas.height/2;
    let distance = 300;
    let angle = index;
    let x = centerX + Math.cos(-angle*Math.PI/180) * distance;
    let y = centerY + Math.sin(-angle*Math.PI/180) * distance;
    // context.drawImage(earth.image, x-(earth.size/2), y-(earth.size/2), earth.size, earth.size);
    let distanceX = 300;
    let distanceY = 200;
    let angleInRadians = angle * (Math.PI / 180);
    // let xx = distanceX * Math.cos(angle);
    x = centerX + (distanceX * Math.cos(angleInRadians));
    y = centerY + (distanceY * Math.sin(angleInRadians));
    context.drawImage(earth.image, x-(earth.size/2), y-(earth.size/2), earth.size, earth.size);

}

function play() {
    if (isSimulation && isPause) {
        isPause = false;
    }  else if (!isSimulation) {
        isSimulation = true;
        draw();
    }
}

function pause() {
    if (isSimulation) {
        isPause = true;
    }
}

function reset() {
    if (earth.isLoad && sun.isLoad) {
        isSimulation = false;
        isPause = false;
        clearInterval(drawInerval);
        drawSolarSystem(0);
    }
}


//setInterval
//https://stackoverflow.com/questions/37356597/updating-the-millisecond-parameter-of-setinterval-function-in-javascript/37356893