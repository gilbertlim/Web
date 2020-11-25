const clockContainer = document.querySelector(".js-clock"),
clockTitle = clockContainer.querySelector("h1"); //class의 childeren 찾기

function getTime(){
    const date = new Date(); //Date는 class
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
			minutes < 10 ? `0${minutes}` : minutes}:${
				seconds < 10 ? `0${seconds}` : seconds
			}`; //tenary operator(삼항연산자) = mini if
}

function init(){
    getTime();
    setInterval(getTime, 100); // x초마다 함수실행
}

init();