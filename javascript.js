
var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 3,});

console.log(document.getElementById("iframeCV").offsetWidth);


window.addEventListener("load", onload);

function onload() {
  heightavatar = document.querySelector("#avatar").offsetHeight;
  for (let i = 0; i < 5; i++) {
    document.querySelectorAll("header div")[i].style.marginTop =
      (heightavatar - 35) / 2 + "px";
  }
}

for (let i = 0; i < 5; i++) {
  document
    .querySelectorAll("header div")
    [i].addEventListener("click", scrollUntilInnerHTML);
    document.querySelectorAll("#topbanner p")[i].addEventListener("click", scrollUntilInnerHTML);

}
function scrollUntilInnerHTML(event) {
    window.scroll(0, document.getElementById(event.target.innerHTML.trim()).offsetTop - 50);
}

let topbanneranimation = 0;
setInterval(function () {
  let elements = [
    document.getElementById("bienveillant"),
    document.getElementById("CV"),
    document.getElementById("Créations"),
    document.getElementById("topbanner"),
  ];
  if (window.scrollY + window.innerHeight * 0.7 > elements[0].offsetTop) { //bienveillant
    elements[0].style.animation = "slideinleftwithoutrotate ease-out 0.5s";
    elements[0].style.visibility = "visible";
  }
  if (window.scrollY + window.innerHeight * 0.7 > elements[1].offsetTop) { //CV
    elements[1].style.animation = "changecolor ease-out 5s";
    elements[1].style.backgroundColor = "var(--color2)";
  }
  if (window.scrollY + window.innerHeight * 0.7 > elements[2].offsetTop) { //Creations
    elements[2].style.animation = "changecolor ease-out 5s";
    elements[2].style.backgroundColor = "var(--color2)";
  }
  if (window.scrollY > 150 && topbanneranimation == 0) { //topbanner
    topbanneranimation = 2;
    elements[3].style.animation = "opacityon 2s";
    setTimeout(() => {
      elements[3].style.opacity = "1";
      topbanneranimation = 1;
    }, 2000);
  }
  if (window.scrollY < 150 && topbanneranimation == 1) {
    topbanneranimation = 2;
    elements[3].style.animation = "opacityoff 2s";
    setTimeout(() => {
      elements[3].style.opacity = "0";
      topbanneranimation = 0;
    }, 2000);
  }
}, 500);


let elements = document.querySelectorAll("#changecolor div");
for (let i=0;i<elements.length;i++){
  elements[i].style.setProperty("background-color", elements[i].id.split("|")[1]); 
  elements[i].addEventListener("click", changecolor);
}
function changecolor (event){
  for (let i=0;i<elements.length;i++){
    elements[i].innerHTML = "";
  }
  event.target.innerHTML = "!";
  let rootstyle = document.querySelector(':root').style;
  rootstyle.setProperty('--color1', event.target.id.split("|")[1]);
  rootstyle.setProperty('--color2', event.target.id.split("|")[2]);
}