
const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const playDiv = document.getElementById('play');
const score = document.getElementById('score');
const landScape = document.getElementById('landscape');

dino.style.background = `url(src/img/sheep.png)`;
dino.style.backgroundSize = `50px 40px`;
score.innerHTML = '0';
let getScore = false;
let block = true;

playDiv.addEventListener('click', play);

function play() {
    playDiv.style.display = 'none';

    block = false;
    document.addEventListener('keydown', function (e) {
        if (e.key === ' ') { jump(); console.log(block); }
    });


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
            }, 520);
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


    cactus.animate([
        { left: '105%' },
        { left: '-5%' },
    ], {
        duration: 1500,
        iterations: Infinity,
        easing: 'linear'
    });

    landScape.animate([
        { left: '0%' },
        { left: '-300%' },
    ], {
        duration: 10000,
        iterations: Infinity,
        easing: 'linear'
    });

}

function stopAnim() {
    dino.getAnimations().forEach(animation => animation.cancel());
    cactus.getAnimations().forEach(animation => animation.cancel());
    landScape.getAnimations().forEach(animation => animation.cancel());
}

function stop() {
    playDiv.innerHTML = 'Rejouer ?';
    playDiv.style.display = 'flex';

    // dino.getAnimations().forEach(animation => animation.cancel());
    // cactus.getAnimations().forEach(animation => animation.cancel());
    stopAnim();
    getScore = false;
    console.log(totalscore);

    block = true;


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

