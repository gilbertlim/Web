//Element: "blabla"
//ID: "#blabla"
//Class: ".blabla"
const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos"; //LS: Local Storage
let toDos = [];

//addEventListener로 이벤트를 가져올 때 함수의 인자는 event로...
function deleteToDo(event){ //버튼을 눌렀을 때
    const btn = event.target; //이벤트 중 클릭한 요소 가져오기
    const li = btn.parentNode; //btn의 parentNode는 <li id="2">...</li>이고, 이를 li에 저장
    //console.log(li);
    toDoList.removeChild(li); //위의 li는 toDoList의 child이고, 이를 지우기

    //버튼을 눌러 지웠을 떄, Elements에서는 지워졌지만, LS에는 남아 있다.
    const cleanToDos = toDos.filter(function(toDo){ //toDos중에 지운 id와 다른애(남아있는애)를 filtering
         return toDo.id !== parseInt(li.id); //toDo.id: 현재 저장된 값의 id, li.id: 지운 값의 id
    });
    //console.log(cleanToDos);
    toDos = cleanToDos; //변경된 값 배열에 최종 저장
    saveToDos(); //LS에 저장하는 함수 실행
}

function saveToDos(){ //LS에 저장
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    //자바스크립트는 모든 것을 string으로 저장하려고 함. 따라서 object를 string으로 변경하여 저장
    //JSON: JavaScript Object Notation
}

function  paintToDo(text) {
    /* html에서 보이는 내용.
    <ul class="js-toDoList">
        <li id="1">
            <button> X </button>
            <span> 입력값 </span>
        </li>
        <li id="2>
            <button> X </button>
            <span> 입력값 </span>
        </li>
    </ul>    
    */
   /* Local Storage에 저장된 내용
   [{"text":"good.","id":1},{"text":"nina","id":2}]
    */
    const li = document.createElement("li"); //createElement: 문서에 html 요소 추가
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1; //배열이 늘어날 때마다 id 1 증가
    delBtn.innerHTML= "❌";   //Window key + "."
    delBtn.addEventListener("click",deleteToDo); //버튼 누르면 지우기 함수로 이동
    span.innerText = text; //입력값 보이기(span)
    li.appendChild(delBtn); //appendChild 는 하위그룹으로 들어가는 것.
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li); //입력된 값을 toDoList에 저장.
    const toDoObj = { //toDoObj는 text, newId class를 가짐.
        text: text,
        id: newId
    };
    toDos.push(toDoObj); //맨 뒤에 class를 가진 배열 추가
    saveToDos(); //저장 함수 실행.
}

function handleSubmit(event){ //폼에 값이 새로 입력된 경우 꾸미기 
    event.preventDefault(); //html 기본 설정 취소
    const currentValue = toDoInput.value; //폼에 적힌 값
    paintToDo(currentValue); //입력된 값을 가지고 꾸미기 함수로 이동.
    toDoInput.value=""; //폼 비우기(외적)
}

function loadToDos(){ //저장된 Todo를 불러와 꾸미기
    const loadedToDos = localStorage.getItem(TODOS_LS); //todo 값 가져오기 
    if(loadedToDos !== null){ // todo가 비어있지 않으면
        const parsedToDos = JSON.parse(loadedToDos); //object로 다시 변환
        parsedToDos.forEach(function(toDo){ //저장된 값들에 대해 각각 꾸미기 진행
            paintToDo(toDo.text);
        })
    }
}

function init(){
    loadToDos(); //todo 불러오기
    toDoForm.addEventListener("submit", handleSubmit); //todo 폼에서 값이 전송되면 handleSubmit함수 실행
}

init();
 