let imgFondo, imgRostro, imgPupilas, imgPecesito, imgCamara;
let imgSpotify, imgAppleMusic, imgYoutube;

function preload() {
    // Carga de todas las imágenes según los nombres exactos de tu carpeta
    imgFondo = loadImage('fondo.png');
    imgRostro = loadImage('resto de rostro.png'); // Contiene el personaje, textos, semitono y adornos
    imgPupilas = loadImage('pupilas.png');         // Capa exclusiva de las pupilas
    imgPecesito = loadImage('pecesito.png');
    imgCamara = loadImage('camara.png');
    
    imgSpotify = loadImage('spotify.png');
    imgAppleMusic = loadImage('apple music.png');
    imgYoutube = loadImage('youtube.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    imageMode(CORNER);

    // 1. Fondo general cubriendo toda la pantalla
    if (imgFondo) {
        background(imgFondo);
    } else {
        background(199, 210, 178);
    }

    // 2. Botones superiores (Spotify, Apple Music, YouTube)
    image(imgSpotify, 40, 25, 110, 40);
    image(imgAppleMusic, 165, 25, 125, 40);
    image(imgYoutube, 305, 25, 110, 40);

    // 3. Pecesitos distribuidos por la pantalla
    image(imgPecesito, width * 0.12, height * 0.44, 45, 30);
    image(imgPecesito, width * 0.85, height * 0.36, 45, 30);
    image(imgPecesito, width * 0.86, height * 0.62, 50, 35);
    image(imgPecesito, width * 0.09, height * 0.85, 45, 30);

    // 4. Composición central exacta (Rostro completo + seguimiento de pupilas)
    // Dibujamos la imagen principal que ya trae toda la composición al centro
    if (imgRostro) image(imgRostro, 0, 0, width, height);

    // Cálculo dinámico para que las pupilas sigan suavemente el cursor
    let centerX = width / 2;
    let centerY = height / 2;
    let maxOffset = 12; // Límite de movimiento de la mirada
    let dx = mouseX - centerX;
    let dy = mouseY - centerY;
    let angle = atan2(dy, dx);
    let distance = dist(centerX, centerY, mouseX, mouseY);
    let currentOffset = min(distance * 0.02, maxOffset);
    
    let pupilX = cos(angle) * currentOffset;
    let pupilY = sin(angle) * currentOffset;

    // Dibujar la capa de las pupilas con el desplazamiento de la mirada
    push();
    translate(pupilX, pupilY);
    if (imgPupilas) image(imgPupilas, 0, 0, width, height);
    pop();

    // 5. Cámara Sony en la esquina inferior derecha
    image(imgCamara, width - 160, height - 120, 140, 95);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    // Enlaces de los botones superiores
    if (mouseX > 40 && mouseX < 150 && mouseY > 25 && mouseY < 65) {
        window.open("https://open.spotify.com", "_blank");
    }
    if (mouseX > 165 && mouseX < 290 && mouseY > 25 && mouseY < 65) {
        window.open("https://music.apple.com", "_blank");
    }
    if (mouseX > 305 && mouseX < 415 && mouseY > 25 && mouseY < 65) {
        window.open("https://www.youtube.com", "_blank");
    }
}