const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //getContext(): 픽셀에 접근할 수 있는 방법
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE; //canvas pixel modifier 사이즈를 주어야 함.
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); //초기에 세팅하지 않으면 투명 배경이 됨.

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.6;


let painting = false; //초기값
let filling = false;

function stopPainting(event) {
    painting = false;
}

function startPainting(event){
    painting = true;
}

function onMouseMove(event) {
    //console.log(event); //client x,y: 윈도우에서의 좌표
                        //offset: 캔버스에서의 좌표
                        //screen: 웹에서의 좌표
    const x = event.offsetX;
    const y = event.offsetY;
    //console.log(x, y);   
    if(!painting){ //마우스가 움직이는 동안 아래 두 이벤트 실행(클릭은 X) / 손에 펜들고 그리지는 않고 움직이기.
        ctx.beginPath(); //새로운 경로를 만듭니다. 경로가 생성됬다면, 이후 그리기 명령들은 경로를 구성하고 만드는데 사용하게 됩니다.
        ctx.moveTo(x, y); //펜을  x와 y 로 지정된 좌표로 옮깁니다.

    } else{ //클릭되었을 때..
        ctx.lineTo(x, y); //현재의 드로잉 위치에서 x와 y로 지정된 위치까지 선을 그립니다.
        ctx.stroke(); //윤곽선을 이용하여 도형을 그립니다.
        
    }
} 

function handleColorClick(event) {
    //console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    //console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value
    ctx.lineWidth = size;
}

function handleModeClick(event) {
    if(filling === true) { //또 누르면
        filling = false;
        mode.innerText = "Fill"
    }else { //눌리면
        filling = true;
        mode.innerText = "Paint"                
    }
}

function handleCanvasClick(event){
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event) {
    event.preventDefault(); //마우스 우클릭 방지
}

function handleSaveClick(event) {
    const image = canvas.toDataURL("image/png");
    //console.log(image);
    const link = document.createElement("a");
    link.href = image; //Hypertext ReFerence: 연결할 주소를 지정
    link.download = "PaintJS[💛]"; //다운로드 파일 이름.
    link.click();
    console.log(link);
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove); //움직임 감지
    canvas.addEventListener("mousedown", startPainting); //클릭
    canvas.addEventListener("mouseup", stopPainting); //떼기
    canvas.addEventListener("mouseleave", stopPainting); //캔버스 밖으로 마우스 아웃
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(element => element.addEventListener("click",handleColorClick));
//Array를 만들고, forEach로 color를 돌려서 addEventListner를 호출
//element를 color로 바꿔도 됨

//console.log(Array.from(colors));

if(range) { 
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}