const form = document.querySelector(".js-form"),
		input = form.querySelector("input"),
		greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser", //LS: LocalStorage
		SHOWING_CN = "showing"; //CN: ClassName

function loadName(){ //로컬 스토리지에서 이름 가져오기
	const currentUser = localStorage.getItem(USER_LS);
	if(currentUser === null){
		//현재 유저의 이름을 모르면 요청
		askForName();
	} else {
		//현재 유저의 이름을 알고 있으면 인사
		paintGreeting(currentUser);
	}
}

function askForName(){
	form.classList.add(SHOWING_CN); //블록 띄우기
	form.addEventListener("submit", handleSubmit) //지정한 이벤트가 대상에 전달될 때마다 호출할 함수를 설정
}

function saveName(text){
	localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
	event.preventDefault(); //기본동작(submit 후 자동 새로고침) 중지
	const currentValue = input.value;
	paintGreeting(currentValue); //인사 함수에 이름넣고 실행
	saveName(currentValue); //이름 저장
}

function paintGreeting(text){
	form.classList.remove(SHOWING_CN);
	greeting.classList.add(SHOWING_CN);
	greeting.innerText = `Hello ${text}!`;
}

function init(){
    loadName();
}

init();