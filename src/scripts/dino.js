
window.addEventListener('DOMContentLoaded', function () {
    const playDiv = document.getElementById('play');
    const playDiv_p = document.getElementById('play_p');
    const playDiv_icon = document.getElementById('play_icon');
    const score = document.getElementById('score');
    const shareDiv = document.getElementById('share');
    const copyInp = document.getElementById('copyInp');

    const canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;


    const canvasSheep = document.getElementById('canvasSheep');
    let ctxSheep = canvasSheep.getContext('2d');
    ctxSheep.imageSmoothingEnabled = false;

    const canvasSheepWidth = canvasSheep.width;
    const canvasSheepHeight = canvasSheep.height;


    const canvasFence = document.getElementById('canvasFence');
    let ctxFence = canvasFence.getContext('2d');
    ctxFence.imageSmoothingEnabled = false;

    const canvasFenceWidth = canvasFence.width;
    const canvasFenceHeight = canvasFence.height;


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

    const sheep = new Image();
    sheep.src = '/src/img/sheep.png';
    const sheep1 = new Image();
    sheep1.src = '/src/img/sheep1.png';
    const sheep2 = new Image();
    sheep2.src = '/src/img/sheep2.png';

    score.innerHTML = '0';
    let getScore = false;
    let block = true;
    let isPlaying = false;
    let sheep_1 = true;
    let sheep_2 = false;
    let requestAnimation = true;
    let letDraw = false;

    document.addEventListener('keydown', function (e) {
        if (playDiv.innerHTML == 'Rejouer ?' && !isPlaying) {
            if (e.key === ' ') { play(); }
        }
    });

    playDiv.addEventListener('click', play);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// PLAY
    async function play() {
        playDiv.style.display = 'none';
        shareDiv.style.display = 'none';

        await new Promise(resolve => setTimeout(resolve, 100)); // léger délai avant de lancer le jeu afin de rendre le lancement plus naturel.

        block = false;
        isPlaying = true;
        letDraw = true;

        document.addEventListener('keydown', function (e) {
            if (e.key === ' ') { jump(); }
        });

        animSheep();
        animSky();

        getScore = true;
        score.innerHTML = '0';
    }

    totalscore = 0;
    let increaseScore = setInterval(function () {
        if (getScore) {
            score.innerHTML = parseInt(score.innerHTML) + 1;
            totalscore = parseInt(score.innerHTML);
        }
    }, 200);

    let gameSpeed = 1;
    let increaseSpeed = setInterval(function () {
        if (totalscore % 150 == 0 && totalscore != 0) { gameSpeed = (gameSpeed * 10 + 0.1 * 10) / 10; }
        else if (totalscore % 300 == 0 && totalscore != 0) { gameSpeed = (gameSpeed * 10 + 0.1 * 10) / 10; clearInterval(increaseSpeed); }
    }, 100);

    let cw = canvasWidth;
    let cw2 = canvasWidth / 2;
    let x = 0;
    let x2 = cw2
    let yPos = 0;
    let jumpHeight = 1;
    let jumpMax = 80;
    let jumping = false;
    let gravity = 0.9;
    let rdmFence = Math.floor(Math.random() * (0 - cw2) + cw2);

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
            this.yPos = yPos;
            this.rdmFence = rdmFence;
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
        }

        updateSheep() {
            ctxSheep.clearRect(0, 0, canvasSheepWidth, canvasSheepHeight);
        }

        updateFence() {
            this.speed = gameSpeed * this.speedModifier;
            if (this.x < -this.width - rdmFence) {
                this.x = cw + this.x2 - this.speed;
            }

            if (this.x2 < -cw) {
                this.x2 = cw + this.x - this.speed;
            }

            this.x = Math.floor(this.x - this.speed);
            this.x2 = Math.floor(this.x2 - this.speed);
        }

        renderJumpUp() {
            if (this.yPos <= jumpMax && jumping) {

                this.yPos += jumpHeight * gravity;
                this.updateSheep();
            }
        }

        renderJumpDown() {
            if (this.yPos >= 0 && !jumping) {

                this.yPos -= jumpHeight;
                this.updateSheep();
            }

            if (this.yPos <= 0) {
                block = false;
            }
        }

        draw() {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }

        drawfence(random) {
            ctxFence.drawImage(this.img, this.x + rdmFence, (canvasFenceHeight - 90), 40, 40);
        }

        drawsheep() {
            ctxSheep.drawImage(this.img, 10, ((canvasHeight - 90) - this.yPos), 50, 40);
        }
    }


    let sky0_pos = 0;
    let sky1_pos = cw2;
    let sky01_pos = cw2 * 2;
    let sky2_pos = cw2 * 3;
    let sky02_pos = cw2 * 4;
    let sky3_pos = cw2 * 5;
    let landscape_gras1_pos = 0;
    let landscape_gras2_pos = cw2;
    let landscape_gras3_pos = cw2 * 2;
    let landscape_gras4_pos = cw2 * 3;
    let fence_pos = cw;


    let sky0 = new Sky(ciel0, 0.5, sky0_pos);
    let sky1 = new Sky(ciel1, 0.5, sky1_pos);
    let sky01 = new Sky(ciel0, 0.5, sky01_pos);
    let sky2 = new Sky(ciel2, 0.5, sky2_pos);
    let sky02 = new Sky(ciel0, 0.5, sky02_pos);
    let sky3 = new Sky(ciel3, 0.5, sky3_pos);
    let landscape_gras1 = new Sky(landscape_grass, 2, landscape_gras1_pos);
    let landscape_gras2 = new Sky(landscape_grass, 2, landscape_gras2_pos);
    let landscape_gras3 = new Sky(landscape_grass, 2, landscape_gras3_pos);
    let landscape_gras4 = new Sky(landscape_grass, 2, landscape_gras4_pos);
    let fence_ = new Sky(fence, 2, fence_pos);
    let sheep_ = new Sky(sheep, 1, 50);
    let sheep1_ = new Sky(sheep1, 1, 0);
    let sheep2_ = new Sky(sheep2, 1, 0);

    function anim(img) {
        img.update();
        img.draw();
    }

    function animSky() {

        if (letDraw) {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctxSheep.clearRect(0, 0, canvasSheepWidth, canvasSheepHeight);
            ctxFence.clearRect(0, 0, canvasFenceWidth, canvasFenceHeight);

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


            fence_.updateFence();
            fence_.drawfence(rdmFence);

            requestAnimationFrame(animSky);

            if (requestAnimation) {
                requestAnimationFrame(animSheep);
            } else {
                requestAnimationFrame(animJump);
            }
        }
    };

    function animSheep() {
        if (sheep_1) {
            sheep1_.drawsheep();
            setTimeout(function () { sheep_1 = false; sheep_2 = true; sheep1_.updateSheep(); }, 200);
        }

        if (sheep_2) {
            sheep2_.drawsheep();
            setTimeout(function () { sheep_2 = false; sheep_1 = true; sheep2_.updateSheep(); }, 200);
        }
    }

    function animJump() {
        sheep_.update();
        sheep_.drawsheep();
    }

    function jump() {
        if (!block) {

            block = true;
            jumping = true;
            requestAnimation = false;

            let jumpIn = setInterval(function () {

                if (sheep_.yPos >= jumpMax) {
                    clearInterval(jumpIn);
                    jumping = false;
                    let jumpOut = setInterval(function () {

                        if (sheep_.yPos <= 0) {
                            clearInterval(jumpOut);
                        }
                        sheep_.renderJumpDown();
                    }, 3);
                }

                sheep_.renderJumpUp();
            }, 2);

            setTimeout(function () { sheep_.updateSheep(); requestAnimation = true; }, 700);
        }
    }

    let copyFinalScore;

    let isAlive = setInterval(function () {

        // if (fence_.x < 60 && fence_.x > 10 && sheep_.yPos <= 40) {
        //     // console.log(totalscore);
        //     copyFinalScore = "J'ai réalisé un score de " + totalscore + " avec Aubert ! \n\nVenez me concurrencer sur https://montsaintmichel.christopherbeaurain.com/aubert";
        //     copyInp.value = copyFinalScore;
        //     // stop();
        //     return;
        // }
        let sheepX = 10;
        let sheepX2 = 10 + 50;
        let sheepY = ((canvasHeight - 90) - yPos);
        let sheepY2 = ((canvasHeight - 90) - yPos) + 40;

        let fenceX = fence_pos + rdmFence;
        let fenceX2 = fenceX + 40;
        let fenceY = canvasFenceHeight - 90;
        let fenceY2 = canvasFenceHeight - 50;

        let overlapX = (sheepX <= fenceX2 && sheepX >= fenceX) || (sheepX2 <= fenceX2 && sheepX2 >= fenceX);
        let overlapY = (sheepY <= fenceY2 && sheepY >= fenceY) || (sheepY2 <= fenceY2 && sheepY2 >= fenceY);

        let isColliding = overlapX && overlapY;
        if (isColliding) {
            console.log("collision");
        } // TODO : COLLISION


    }, 50);

    shareDiv.onclick = function () { copyInp.select(); document.execCommand('copy'); console.log('vous avez copié ' + copyInp.value); }

    function stop() {
        playDiv_p.innerHTML = 'Rejouer ?';
        playDiv_icon.innerHTML = 'replay';
        playDiv.style.display = 'flex';
        playDiv.style.top = '55%';
        shareDiv.style.display = 'flex';
        shareDiv.style.top = '35%';

        getScore = false;
        isPlaying = false;
        block = true;
        letDraw = false;

        resetPos();
        return;
    }

    function resetPos() {
        sky0.x = 0;
        sky1.x = cw2;
        sky01.x = cw2 * 2;
        sky2.x = cw2 * 3;
        sky02.x = cw2 * 4;
        sky3.x = cw2 * 5;
        landscape_gras1.x = 0;
        landscape_gras2.x = cw2;
        landscape_gras3.x = cw2 * 2;
        landscape_gras4.x = cw2 * 3;
        fence_.x = cw;
        sheep_.x = 50;
        sheep1_.x = 0;
        sheep2_.x = 0;
    }

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

        sheep_.drawsheep();
    }
    init();
});