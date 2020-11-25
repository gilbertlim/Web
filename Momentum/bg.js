const body = document.querySelector("body");

const IMG_NUMBER = 3;

function handleImgLoad() {
    console.log("finished loading");
}

function paintImage(IMG_NUMBER){
    const image = new Image();
    image.src = `images/${IMG_NUMBER + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    //floor 내림. ceil 올림
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();