

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
let speed = 10;
let drawInerval;
let orbitWidth = 300;
let orbitHeight = 200;
let sunDesphase = orbitWidth*0.07;

let sun = {
    url: 'cool_sun.svg',
    isLoad: false,
    mass: 0,
    size: 100
}
sun.image = new Image();
sun.image.src = sun.url;
sun.image.addEventListener("load", loadSun);

let earth = {
    url: 'kawaii_earth.svg',
    isLoad: false,
    mass: 0,
    size: 40
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
        let years = 10;
        let isDelay = false;
        let diference = 0;
        
        drawInerval = setInterval(() => {
            if (!isPause && !isDelay) {
                let distanceBetwenSunAndEarth = drawSolarSystem(i);
                isDelay = true;
                diference = Math.round((distanceBetwenSunAndEarth * speed / orbitHeight) - speed);
                if(i == 360*years) {
                    isSimulation=false;
                    clearInterval(drawInerval);
                }
                i++;
            } else if (isDelay) {
                if (diference <= 0) {
                    isDelay = false;
                }
                diference--;
            }
        }, speed);
    }
}

function drawSolarSystem(index) {
    //Limpiar canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    //Dibujar sol
    context.drawImage(sun.image, (canvas.width/2)-(sun.size/2)+sunDesphase, (canvas.height/2)-(sun.size/2), sun.size, sun.size);
    
    //Dibujar orbita
    context.strokeStyle = '#3A98FE55';
    context.lineWidth = 3;
    context.beginPath();
    context.ellipse(canvas.width/2, canvas.height/2, orbitWidth, orbitHeight, 0, 0, 2 * Math.PI);
    // context.moveTo(canvas.width/2, 0);
    // context.lineTo(canvas.width/2, canvas.height);
    context.closePath();
    context.stroke();
    
    //Dibujar tierra
    let centerX = canvas.width/2;
    let centerY = canvas.height/2;
    let angle = index;
    let angleInRadians = angle * (Math.PI / 180);
    let x = centerX + (orbitWidth * Math.cos(angleInRadians));
    let y = centerY + (orbitHeight * Math.sin(angleInRadians));
    context.drawImage(earth.image, x-(earth.size/2), y-(earth.size/2), earth.size, earth.size);

    //Retornar distancia entre el sol y la tierra
    return Math.sqrt((Math.pow(x - (centerX + sunDesphase), 2)) + Math.pow(y - centerY, 2));
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