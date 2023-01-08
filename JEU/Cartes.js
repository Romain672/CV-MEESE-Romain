

let startnumbercards = 5;
const carte = document.createElement("div");

window.addEventListener("load", createcards);
function createcards(){
    for (let i=0;i<startnumbercards;i++){
        let listcards = [];
        listcards[i] = "<div id='carte" + [i+1] + "' class='carte' draggable='true'>aa</div>";
        document.getElementById("conteneurcarte").insertAdjacentHTML("beforeend", listcards[i]);
        document.getElementById("carte" + [i+1]).addEventListener("mouseenter", hoveredcard);
        document.getElementById("carte" + [i+1]).addEventListener("mouseleave", endhoveredcard);
        document.getElementById("carte" + [i+1]).addEventListener("drag", dragcard);
    }
}

function hoveredcard() {
    let element=event.target;
    element.classList.add("hoveredcard");
}

function endhoveredcard(){
    let element=event.target;
    element.classList.remove("hoveredcard");
}







//TRASH V


let x;
let y;
function dragcard(e){
    let nbr = detectMouse(e);
    
    let element=document.getElementById("greencircle");
    element.style.left = x ;
    element.style.top = y ;
}

document.getElementById("body").addEventListener("mousemove", detectMouse)
function detectMouse(e){
        document.getElementById('zone').innerHTML = e.pageX ;
        document.getElementById('zone1').innerHTML = e.pageY;
        x = e.pageX ;
        y = e.pageY;
    return;
}
/*
document.getElementById('conteneurcarte').onclick = function clickEvent(e) {
    // e = Mouse click event.
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top; 
    console.log(document.getElementById("greencircle"));
    //.rect.left = x;
    document.getElementById("greencircle").left = 500;

  }*/