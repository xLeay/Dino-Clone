<?php
$landscape = ['ciel1', 'ciel2', 'ciel3'];
// $landscape = ['ciel1', 'ciel2', 'ciel3', 'cielmsm'];
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./src/styles/dino.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>

<body>
    <div class="dinogame">
        <h1 class="aubert">Vas-y Aubert !</h1>
        <div class="game-container">
            <div class="game">
                <canvas id="canvas" width="800" height="300"></canvas>
                <div id="score"></div>
                <div id="dino"></div>
                <div id="play">
                    <span class="material-symbols-outlined" id="play_icon">play_circle</span>
                    <p id="play_p">Lancer ?</p>
                </div>
            </div>
        </div>
    </div>

    <script src="./src/scripts/dino.js"></script>
</body>

</html>