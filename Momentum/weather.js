/* JS는 보이지 않는 곳에서 데이터를 계속 가져오고 있기 때문에,
   새로고침 하지 않아도 된다.
   (예: 새로고침하지 않아도 이메일이 오면 확인 가능) */ 

const API_KEY = "";
const COORDS = "coords";

const weather = document.querySelector(".js-weather");

function getWeather(lat,lon){
    fetch( // api 불러오기
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        ).then(function(response){ // then: 데이터가 넘어왔을 때 함수 호출
            return response.json(); // console.log(response.json(); 했더니 pending으로 표시됨.
        })
        .then(function(json){ // 데이터가 준비되었을 때 출력
            //console.log(json);
            //JavaScript Object Notation
            //데이터를 저장하거나 전송할 때 많이 사용되는 경량의 DATA 교환 형식
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerHTML = `${temperature}º @ ${place}`;
        });
        
        
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess (position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("Can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else {
        //get Weather
        const parseCoords = JSON.parse(loadedCoords);
        //console.log(parseCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();