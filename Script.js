var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

// imagens
var bird = new Image();
bird.src = "images/bird.png";
var bg = new Image();
bg.src = "images/bg.png";
var solo = new Image();
solo.src = "images/chao.png";
var canoc = new Image();
canoc.src = "images/canocima.png";
var canob = new Image();
canob.src = "images/canobaixo.png";


//variaveis
var eec = 150;
var constante;
var bx = 33;
var by = 12;
var gravidade = 1.4;
var pontos = 0;
var cano = [];

cano[0] = {
    x: canvas.width,
    y: 0

}

//Sons
var fly = new Audio();
fly.src = "sounds/fly.mp3"
var pont = new Audio();
pont.src = "sounds/score.mp3";
//batendo as asas
document.addEventListener("keydown", voa)
//estou voando
function voa() {
    by = by - 25;
    fly.play();

}

function jogo() {
    ctx.drawImage(bg, 0, 0)


    //canos
    for (let i = 0; i < cano.length; i++) {
        //Posição do cano de baixo e de baixo
        constante = canoc.height + eec
        ctx.drawImage(canoc, cano[i].x, cano[i].y);
        ctx.drawImage(canob, cano[i].x, cano[i].y + constante);
        cano[i].x = cano[i].x - 1
        if (cano[i].x == 125) {
            cano.push({
                x: canvas.width,
                y: Math.floor(Math.random() * canoc.height) - canoc.height
            })
        }



        if (bx + bird.width >= cano[i].x && bx <= cano[i].x + canoc.width &&
            (by <= cano[i].y + canoc.height || by + bird.height >= cano[i].y + constante)
            || by + bird.height >= canvas.height + solo.height
        ) {
            location.reload();
        }
        if (cano[i].x == 5) {
            pontos = pontos + 1
            pont.play();

        }




    }
    //desenho do passaro
    ctx.drawImage(bird, bx, by);
    by += gravidade;
    //desenho do chão
    ctx.drawImage(solo, 0, canvas.height - solo.height);

    //Placar
    ctx.fillstyle = "#000";
    ctx.font = "20px verdana";
    ctx.fillText("Placar: " + pontos, 10, canvas.height - 20)


    requestAnimationFrame(jogo);
}


jogo();