const canvas = document.getElementById('milky_way');
let context = canvas.getContext('2d');

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
    // sunCoords();
    draw();
}

function loadEarth() {
    earth.isLoad = true;
    // earthCoords();
    draw();
}

function draw() {
    // let sun = new Image();
    // sun.src = 'cool_sun.svg'
    // sun.onload = () => {
    //     context.drawImage(sun, canvas.width/2, canvas.height/2, 200, 200);
    // }
    // let earth = new Image();
    // earth.src = 'kawaii_earth.svg';
    // earth.onload = () => {
    //     context.drawImage(earth, 0, 0, 100, 100);    
    // }
    // context.clearRect(0, 0, canvas.width, canvas.height);
    if (earth.isLoad && sun.isLoad) {
        context.drawImage(sun.image, (canvas.width/2)-(sun.size/2), (canvas.height/2)-(sun.size/2), sun.size, sun.size);
        context.drawImage(earth.image, 0, 0, earth.size, earth.size);

        context.strokeStyle = '#3A98FE55';
        context.lineWidth = 3;
        context.arc(canvas.width/2, canvas.height/2, 300, 0, 2 * Math.PI);
        context.stroke();
        //context.clearRect(0, 0, canvas.width, canvas.height);
    }
}