
const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const playDiv = document.getElementById('play');
const score = document.getElementById('score');

dino.style.background = `url(src/img/sheep.png)`;
dino.style.backgroundSize = `50px 40px`;
score.innerHTML = '0';
let getScore = false;

playDiv.addEventListener('click', play);

function play() {
    playDiv.style.display = 'none';
    document.addEventListener('keydown', function (e) {
        if (e.key === ' ') { jump(); }
    });

    runAnim();
    getScore = true;
    score.innerHTML = '0';
}

function jump() {
    if (dino.classList != 'jump') {
        dino.classList.add('jump');
        dino.classList.remove('run');

        setTimeout(function () {
            dino.classList.remove('jump');
            dino.classList.add('run');
        }, 520);
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


    cactus.animate([
        { left: '580px' },
        { left: '-20px' },
    ], {
        duration: 1500,
        iterations: Infinity,
        easing: 'linear'
    });
    
}

function stop() {
    playDiv.innerHTML = 'Rejouer ?';
    playDiv.style.display = 'block';

    dino.getAnimations().forEach(animation => animation.cancel());
    cactus.getAnimations().forEach(animation => animation.cancel());
    getScore = false;
    console.log(totalscore);
    
}

let isAlive = setInterval(function () {
    // Position Y du dino
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));

    // Position X du cactus
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue('left'));

    // Detecte la collision entre le dino et le cactus
    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
        console.log('Game Over');
        stop();
    }

}, 10);

totalscore = 0;
let increaseScore = setInterval(function () {
    if (getScore) {
        score.innerHTML = parseInt(score.innerHTML) + 1;
        totalscore = parseInt(score.innerHTML);
    }
}, 100);

