const search_wrapper = document.querySelector(".search_wrapper");
const input = search_wrapper.querySelector("input");
const h1 = search_wrapper.querySelector("h1");


const CLICKED_CN = "clicked";
const MEMO_CLICKED_CN = "memo_clicked";

const window_size = {
    width: window.innerWidth,
    height: window.innerHeight
};

document.querySelector(".memo_wrapper").style.cssText 
= `grid-template-columns: ${window_size.width/4}px ${window_size.width/4}px ${window_size.width/4}px ${window_size.width/4}px ${window_size.width/4}px;
   grid-template-rows: ${(window_size.height-100)/2}px ${(window_size.height-100)/2}px;`;

function change_color() {
    h1.classList.toggle(CLICKED_CN);
}

function search(event) {
    if (event.keyCode === 13) {
        const current_value = input.value;
        input.value = "";
        console.log(current_value);
    }
}

function refresh(event) {
    location.reload();

}

function load_memo() {
    for(i= 0 ; i < 8 ; i++) {
        const loaded_memo = localStorage.getItem(`text_area_content_${i}`);
        document.querySelector(`.memo_${i}`).value = loaded_memo;
    }
}

function init() {
    h1.addEventListener("mouseover", change_color);
    h1.addEventListener("mouseout", change_color);
    input.addEventListener("keyup", search);   
    window.addEventListener("resize",refresh);
    
    document.querySelectorAll(".memo").forEach((element, index) => {
        document.querySelector(".memo_" + index).addEventListener("keyup",function(){
            window.localStorage.setItem(`text_area_content_${index}`, this.value);
        });        
    });

    load_memo();    
}

init();
