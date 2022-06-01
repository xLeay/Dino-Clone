
const dino = document.getElementById('dino');
const playDiv = document.getElementById('play');
const playDiv_p = document.getElementById('play_p');
const playDiv_icon = document.getElementById('play_icon');
const score = document.getElementById('score');
const landScape = document.getElementById('landscape');
const grass = document.getElementById('landscape_grass');

const canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const ciel0 = new Image();
ciel0.src = '/src/img/ciel0.png';
const ciel1 = new Image();
ciel1.src = '/src/img/ciel1.png';
const ciel2 = new Image();
ciel2.src = '/src/img/ciel2.png';
const ciel3 = new Image();
ciel3.src = '/src/img/ciel3.png';
const cielmsm = new Image();
cielmsm.src = '/src/img/cielmsm.png';

const landscape_grass = new Image();
landscape_grass.src = '/src/img/landscape.png';

const fence = new Image();
fence.src = '/src/img/fence.png';


dino.style.background = `url(src/img/sheep.png)`;
dino.style.backgroundSize = `50px 40px`;
score.innerHTML = '0';
let getScore = false;
let block = true;
let isPlaying = false;
let runAnimations = false;

document.addEventListener('keydown', function (e) {
    if (playDiv.innerHTML == 'Rejouer ?' && !isPlaying) {
        if (e.key === ' ') { play(); }
    }
});

playDiv.addEventListener('click', play);

function play() {
    playDiv.style.display = 'none';

    block = false;
    isPlaying = true;
    if (ctx === null) ctx = canvas.getContext('2d');

    runAnimations = true;

    document.addEventListener('keydown', function (e) {
        if (e.key === ' ') { jump(); }
    });

    animSky();

    runAnim();
    getScore = true;
    score.innerHTML = '0';
}


function jump() {
    if (!block) {
        if (dino.classList != 'jump') {
            dino.classList.add('jump');
            dino.classList.remove('run');

            setTimeout(function () {
                dino.classList.remove('jump');
                dino.classList.add('run');
            }, 600);
        }
    }
}

function runAnim() {

    dino.animate([
        { background: 'url(src/img/sheep1.png)', backgroundSize: '50px 40px' },
        { background: 'url(src/img/sheep1.png)', backgroundSize: '50px 40px' },
        { background: 'url(src/img/sheep1.png)', backgroundSize: '50px 40px' },
        { background: 'url(src/img/sheep2.png)', backgroundSize: '50px 40px' },
        { background: 'url(src/img/sheep2.png)', backgroundSize: '50px 40px' },
        { background: 'url(src/img/sheep2.png)', backgroundSize: '50px 40px' },
    ], {
        duration: 200,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'linear',
    });
}

totalscore = 0;
let increaseScore = setInterval(function () {
    if (getScore) {
        score.innerHTML = parseInt(score.innerHTML) + 1;
        totalscore = parseInt(score.innerHTML);
    }
}, 100);

let gameSpeed = 1;
let cw = canvasWidth;
let cw2 = canvasWidth / 2;
let x = 0;
let x2 = cw2

class Sky {
    constructor(img, speedModifier, pos) {
        this.x = pos;
        this.y = 0;
        this.width = cw2;
        this.height = canvasHeight;
        this.x2 = pos + cw2;
        this.img = img;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x < -this.width) {
            this.x = cw + this.x2 - this.speed;
        }

        if (this.x2 < -this.width) {
            this.x2 = cw + this.x - this.speed;
        }

        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
        this.x3 = Math.floor(this.x3 - this.speed);
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    drawfence() {
        ctx.drawImage(fence, this.x, (canvasHeight - 90), 40, 40);
    }
}


const sky0_pos = 0;
const sky1_pos = cw2;
const sky01_pos = cw2 * 2;
const sky2_pos = cw2 * 3;
const sky02_pos = cw2 * 4;
const sky3_pos = cw2 * 5;
const landscape_gras1_pos = 0;
const landscape_gras2_pos = cw2;
const landscape_gras3_pos = cw2 * 2;
const landscape_gras4_pos = cw2 * 3;
const fence_pos = cw;


const  sky0 = new Sky(ciel0, 0.5 , sky0_pos);
const  sky1 = new Sky(ciel1, 0.5 , sky1_pos);
const sky01 = new Sky(ciel0, 0.5 , sky01_pos);
const  sky2 = new Sky(ciel2, 0.5 , sky2_pos);
const sky02 = new Sky(ciel0, 0.5 , sky02_pos);
const  sky3 = new Sky(ciel3, 0.5 , sky3_pos);
const landscape_gras1 = new Sky(landscape_grass, 2, landscape_gras1_pos);
const landscape_gras2 = new Sky(landscape_grass, 2, landscape_gras2_pos);
const landscape_gras3 = new Sky(landscape_grass, 2, landscape_gras3_pos);
const landscape_gras4 = new Sky(landscape_grass, 2, landscape_gras4_pos);
const fence_ = new Sky(fence, 2, fence_pos);

function anim(img) {
    img.update();
    img.draw();
}

function animSky() { if (!runAnimations) { ctx.clearRect(0, 0, canvasWidth, canvasHeight); ctx = null; return; }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    anim(sky0);
    anim(sky1);
    anim(sky01);
    anim(sky2);
    anim(sky02);
    anim(sky3);

    anim(landscape_gras1);
    anim(landscape_gras2);
    anim(landscape_gras3);
    anim(landscape_gras4);

    fence_.update();
    fence_.drawfence();
    
    requestAnimationFrame(animSky);
};


let isAlive = setInterval(function () {
    // Position Y du dino
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));

    // console.log(fence_);
    // console.log(ctx);
    if (fence_.x < 50 && fence_.x > 0 && dinoBottom <= 80) {
        // console.log('Game Over');

        // ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        init();


        stop();
        return;
    }
}, 10);


function stop() {
    init();init();init();init();init();init();init();init();init();init();init();init();init();init();init();init();init();init();
    playDiv_p.innerHTML = 'Rejouer ?';
    playDiv_icon.innerHTML = 'replay';
    playDiv.style.display = 'flex';

    stopAnim();

    getScore = false;
    isPlaying = false;
    block = true;
    runAnimations = false;

    init();
}

function stopAnim() {
    dino.getAnimations().forEach(animation => animation.cancel());
    init();
}

init();


function init() {
    sky0.draw();
    sky1.draw();
    sky01.draw();
    sky2.draw();
    sky02.draw();
    sky3.draw();

    landscape_gras1.draw();
    landscape_gras2.draw();
    landscape_gras3.draw();
    landscape_gras4.draw();
}