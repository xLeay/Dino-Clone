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
</head>

<body>
    <div class="dinogame">

        <h1 class="aubert">Vas-y Aubert !</h1>
        <div class="game-container">
            <div class="game">
                <div id="landscape">
                    <?php foreach ($landscape as $key => $value) : ?>
                        <img src="src/img/ciel0.png" alt="sky">
                        <img src="src/img/<?= $value ?>.png" alt="sky">
                    <?php endforeach; ?>
                    <img src="src/img/ciel0.png" alt="sky">
                    <img src="src/img/ciel1.png" alt="sky">
                    <div id="landscape_grass">
                        <?php for ($i = 0; $i < 8 ; $i++) : ?>
                            <img src="src/img/landscape.png" alt="landscape">
                        <?php endfor; ?>
                    </div>
                </div>
                <div id="score"></div>
                <div id="dino"></div>
                <div id="cactus"></div>
                <div id="play">
                    <p>Lancer ?</p>
                </div>
            </div>
        </div>


        <script src="./src/scripts/dino.js"></script>
</body>

</html>