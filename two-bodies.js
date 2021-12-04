const inputEarthGravity = document.getElementById('earth_gravity');
const inputSunGravity = document.getElementById('sun_gravity');
const inputEarthMass = document.getElementById('earth_mass');
const inputSunMass = document.getElementById('sun_mass');
const inputEarthDiameter = document.getElementById('earth_diameter');
const inputSunDiameter = document.getElementById('sun_diameter');
const inputYears = document.getElementById('years');
const inputSimulationTime = document.getElementById('simulation_time');

const pGravityEarth = document.getElementById('pGravityEarth');
const pGravitySun = document.getElementById('pGravitySun');
const pMassEarth = document.getElementById('pMassEarth');
const pMassSun = document.getElementById('pMassSun');
const pDiameterEarth = document.getElementById('pDiameterEarth');
const pDiameterSun = document.getElementById('pDiameterSun');
const pYears = document.getElementById('pYears');
const pSimulationTime = document.getElementById('pSimulationTime');

const startButton = document.getElementById('start_button');
const pauseButton = document.getElementById('pause_button');
const playButton = document.getElementById('play_button');
const canvas = document.getElementById('solar_system');
let context = canvas.getContext('2d');

const SECOND_IN_MILLI = 1000;

playButton.addEventListener('click', play);
pauseButton.addEventListener('click', pause);
startButton.addEventListener('click', reset);

let isSimulation = false;
let isPause = false;
let speed = 10;
let drawInerval;
let orbitWidth = 300;
let orbitHeight = 250;
// let sunDesphase = orbitWidth*0.0084;
let sunDesphase = orbitWidth*0.3;
let years = 1;
let simulationTime = 10;

let sun = {
    url: 'cool_sun.svg',
    isLoad: false,
    gravity: 274,
    mass: 1.99,
    diameter: 1391016,
    size: 1391016/10000
}
sun.image = new Image();
sun.image.src = sun.url;
sun.image.addEventListener("load", loadSun);

let earth = {
    url: 'kawaii_earth.svg',
    isLoad: false,
    gravity: 9.81,
    mass: 5.97,
    diameter: 12742,
    size: 12742/1000
}
earth.image = new Image();
earth.image.src = earth.url;
earth.image.addEventListener("load", loadEarth);

function loadSun() {
    sun.isLoad = true;
    if (earth.isLoad && sun.isLoad) {
        drawSolarSystem(0);
        resetInfo();
    }
}

function loadEarth() {
    earth.isLoad = true;
    if (earth.isLoad && sun.isLoad) {
        drawSolarSystem(0);
        resetInfo();
    }
}

function draw() {
    if (earth.isLoad && sun.isLoad) {
        let i = 0;
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
    let angle = index+90;
    let angleInRadians = angle * (Math.PI / 180);
    let x = centerX + (orbitWidth * Math.sin(angleInRadians));
    let y = centerY + (orbitHeight * Math.cos(angleInRadians));
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
        //parameters
        if (inputEarthGravity.value) {earth.gravity = inputEarthGravity.value}
        if (inputEarthMass.value) {earth.mass = inputEarthMass.value}
        if (inputEarthDiameter.value) {
            earth.diameter = inputEarthDiameter.value;
            earth.size = inputEarthDiameter.value/1000;
        }

        if (inputSunGravity.value) {sun.gravity = inputSunGravity.value}
        if (inputSunMass.value) {sun.mass = inputSunMass.value}
        if (inputSunDiameter.value) {
            sun.diameter = inputSunDiameter.value;
            sun.size = inputSunDiameter.value/10000;
        }

        if (inputYears.value) {years = inputYears.value}
        if (inputSimulationTime.value) {simulationTime = inputSimulationTime.value}

        drawSolarSystem(0);

        resetInfo();
    }
}

function resetInfo() {
    pGravityEarth.innerHTML = `Gravedad Tierra: ${earth.gravity} m/s<sup>2</sup>`;
    pGravitySun.innerHTML = `Gravedad Sol: ${sun.gravity} m/s<sup>2</sup>`;
    pMassEarth.innerHTML = `Masa Tierra: ${earth.mass} x10<sup>24</sup> kg`;
    pMassSun.innerHTML = `Masa Sol: ${sun.mass} x10<sup>30</sup> kg`;
    pDiameterEarth.innerHTML = `Diametro Tierra: ${earth.diameter} km`;
    pDiameterSun.innerHTML = `Diametro Sol: ${sun.diameter} km`;
    pYears.innerHTML = `Años a simular: ${years}`;
    pSimulationTime.innerHTML = `Tiempo simulación: ${simulationTime} s`;
}