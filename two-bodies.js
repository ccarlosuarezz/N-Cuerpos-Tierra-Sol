const inputEarthMass = document.getElementById('earth_mass');
const inputSunMass = document.getElementById('sun_mass');
const inputEarthDiameter = document.getElementById('earth_diameter');
const inputSunDiameter = document.getElementById('sun_diameter');
const inputOrbitWidth = document.getElementById('orbit_width');
const inputOrbitHeight = document.getElementById('orbit_height');
const inputYears = document.getElementById('years');

const pMassEarth = document.getElementById('pMassEarth');
const pMassSun = document.getElementById('pMassSun');
const pDiameterEarth = document.getElementById('pDiameterEarth');
const pDiameterSun = document.getElementById('pDiameterSun');
const pOrbitWidth = document.getElementById('pOrbitWidth');
const pOrbitHeight = document.getElementById('pOrbitHeight');
const pYears = document.getElementById('pYears');
const pEarthSpeed = document.getElementById('pEarthSpeed')
const pGravity = document.getElementById('pGravity')

const startButton = document.getElementById('start_button');
const pauseButton = document.getElementById('pause_button');
const playButton = document.getElementById('play_button');
const canvas = document.getElementById('solar_system');
let context = canvas.getContext('2d');

const SECOND_IN_MILLI = 1000;
const SUN_SCALE = 10000;
const EARTH_SCALE = 1000;
const ORBIT_SCALE = 1000000;
const GRAVITY_CONSTANT = 6.67428 * Math.pow(10, -11);
const METERS_IN_KM = 1000;

playButton.addEventListener('click', play);
pauseButton.addEventListener('click', pause);
startButton.addEventListener('click', reset);

let isSimulation = false;
let isPause = false;
let speed = 10;
let drawInerval;
let orbitWidth = 300000000;
let orbitHeight = 250000000;
let orbitWidthDraw = orbitWidth/ORBIT_SCALE;
let orbitHeightDraw = orbitHeight/ORBIT_SCALE;
// let sunDesphase = orbitWidthDraw*0.0084; //Escala real
let sunDesphase = orbitWidthDraw*0.3; //Escala ajustada
let years = 1;
let simulationTime = 10;

let sun = {
    url: 'cool_sun.svg',
    isLoad: false,
    mass: 1.99,
    diameter: 1391016,
    size: 1391016/SUN_SCALE
}
sun.image = new Image();
sun.image.src = sun.url;
sun.image.addEventListener("load", loadSun);

let earth = {
    url: 'kawaii_earth.svg',
    isLoad: false,
    mass: 5.97,
    diameter: 12742,
    size: 12742/EARTH_SCALE
}
earth.image = new Image();
earth.image.src = earth.url;
earth.image.addEventListener("load", loadEarth);

let explosion = {
    url: 'boom.svg',
    isLoad: false
}
explosion.image = new Image();
explosion.image.src = explosion.url;
explosion.image.addEventListener("load", loadExplosion);

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

function loadExplosion() {
    explosion.isLoad = true;
}

function draw() {
    if (earth.isLoad && sun.isLoad && explosion.isLoad) {
        let i = 0;
        let isDelay = false;
        let diference = 0;
        
        drawInerval = setInterval(() => {
            if (!isPause && !isDelay) {
                let distanceBetwenSunAndEarth = drawSolarSystem(i);
                isDelay = true;
                diference = Math.round((distanceBetwenSunAndEarth * speed / orbitHeightDraw) - speed);
                resetInfoInSimulation(distanceBetwenSunAndEarth);
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
    context.ellipse(canvas.width/2, canvas.height/2, orbitWidthDraw, orbitHeightDraw, 0, 0, 2 * Math.PI);
    // context.moveTo(canvas.width/2, 0);
    // context.lineTo(canvas.width/2, canvas.height);
    context.closePath();
    context.stroke();
    
    //Dibujar tierra
    let centerX = canvas.width/2;
    let centerY = canvas.height/2;
    let angle = index+90;
    let angleInRadians = angle * (Math.PI / 180);
    let x = centerX + (orbitWidthDraw * Math.sin(angleInRadians));
    let y = centerY + (orbitHeightDraw * Math.cos(angleInRadians));
    context.drawImage(earth.image, x-(earth.size/2), y-(earth.size/2), earth.size, earth.size);

    let distanceBetwenSunEarth = Math.sqrt((Math.pow(x - (centerX + sunDesphase), 2)) + Math.pow(y - centerY, 2));

    if (distanceBetwenSunEarth - ((sun.size/4) + (earth.size/2)) <= 0) {
        console.log('boom');
        context.drawImage(explosion.image, x-(earth.size/2), y-(earth.size/2), earth.size, earth.size);
        clearInterval(drawInerval);
    }

    //Retornar distancia entre el sol y la tierra
    return distanceBetwenSunEarth;
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
        if (inputEarthMass.value) {earth.mass = inputEarthMass.value}
        if (inputEarthDiameter.value) {
            earth.diameter = inputEarthDiameter.value;
            earth.size = inputEarthDiameter.value/EARTH_SCALE;
        }

        if (inputSunMass.value) {sun.mass = inputSunMass.value}
        if (inputSunDiameter.value) {
            sun.diameter = inputSunDiameter.value;
            sun.size = inputSunDiameter.value/SUN_SCALE;
        }

        if (inputOrbitWidth.value) {
            orbitWidth = inputOrbitWidth.value;
            orbitWidthDraw = orbitWidth/ORBIT_SCALE;
        }
        if (inputOrbitHeight.value) {
            orbitHeight = inputOrbitHeight.value;
            orbitHeightDraw = orbitHeight/ORBIT_SCALE;
        }
        if (inputYears.value) {years = inputYears.value}

        drawSolarSystem(0);

        resetInfo();
    }
}

function resetInfo() {
    pMassEarth.innerHTML = `Masa Tierra: ${earth.mass} x10<sup>24</sup> kg`;
    pMassSun.innerHTML = `Masa Sol: ${sun.mass} x10<sup>30</sup> kg`;
    pDiameterEarth.innerHTML = `Diametro Tierra: ${earth.diameter} km`;
    pDiameterSun.innerHTML = `Diametro Sol: ${sun.diameter} km`;
    pOrbitWidth.innerHTML = `Ancho de orbita: ${orbitWidth} km`;
    pOrbitHeight.innerHTML = `Alto de orbita: ${orbitHeight} km`;
    pYears.innerHTML = `Años a simular: ${years}`;
    pGravity.innerHTML = `Fuerza de atracción: 0 N`;
}

function resetInfoInSimulation(distanceBetwenSunEarth) {
    pEarthSpeed.innerHTML = `Velocidad Tierra: ${speed} km/s`;

    pGravity.innerHTML = `Fuerza de atracción: ${calculateGravityForce(distanceBetwenSunEarth)} N`;
}

function calculateGravityForce(distanceBetwenSunEarth) {
    let r = ((distanceBetwenSunEarth*ORBIT_SCALE) / 2) * METERS_IN_KM;
    return GRAVITY_CONSTANT * ((sun.mass * earth.mass) / (r * r));
}