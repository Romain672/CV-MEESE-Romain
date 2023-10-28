window.addEventListener("load", onload);

function onload() {
  heightavatar = document.querySelector("#avatar").offsetHeight;
  for (let i = 0; i < 5; i++) {
    document.querySelectorAll("div")[i].style.marginTop =
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
  if (window.scrollY + window.innerHeight * 0.7 > elements[0].offsetTop) {
    elements[0].style.animation = "slideinleftwithoutrotate ease-out 0.5s";
    elements[0].style.visibility = "visible";
  }
  if (window.scrollY + window.innerHeight * 0.7 > elements[1].offsetTop) {
    elements[1].style.animation = "slideinleftwithoutrotate ease-out 0.5s";
    elements[1].style.visibility = "visible";
  }
  if (window.scrollY + window.innerHeight * 0.7 > elements[2].offsetTop) {
    elements[2].style.animation = "slideinleftwithoutrotate ease-out 0.5s";
    elements[2].style.visibility = "visible";
  }
  if (window.scrollY > 150 && topbanneranimation == 0) {
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
}, 150);
