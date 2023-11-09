var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 3,
});

/* Generation random colors */
  displayNewColors();
let ccam = document.getElementById("changecoloraddmore");
ccam.addEventListener("click", generateNewColors);
function generateNewColors() {
  let nbrColors = (window.getComputedStyle(document.getElementById("changecoloraddmore")).getPropertyValue('top').replace("px","")-25) / 30;
  for (let i = nbrColors; i < nbrColors+5; i++) {
    let newdiv = document.createElement("div");
    let col1 = Math.floor(Math.random() * 16777215).toString(16);
    if (col1.length == 5) {
      col1 = "0" + col1;
    }
    let col2 = Math.floor(Math.random() * 16777215).toString(16);
    if (col2.length == 5) {
      col2 = "0" + col2;
    }
    let col3 = Math.floor(Math.random() * 16777215).toString(16);
    if (col3.length == 5) {
      col3 = "0" + col3;
    }
    newdiv.id = "changecolor|#" + col1 + "|#" + col2 + "|#" + col3;
    document.getElementById("changecolor").append(newdiv);
  }
  displayNewColors();
  document.getElementById("changecoloraddmore").style.top = parseInt(window.getComputedStyle(document.getElementById("changecoloraddmore")).getPropertyValue('top').replace("px","")) + 148 + "px";
}
function displayNewColors () {
  let elements = document.querySelectorAll("#changecolor div");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.setProperty(
      "border-right",
      "15px solid " + elements[i].id.split("|")[3]
    );
    elements[i].style.setProperty(
      "border-top",
      "15px solid " + elements[i].id.split("|")[1]
    );
    elements[i].style.setProperty(
      "border-left",
      "15px solid " + elements[i].id.split("|")[2]
    );
    elements[i].style.setProperty(
      "border-bottom",
      "15px solid " + elements[i].id.split("|")[2]
    );
    elements[i].style.setProperty("transform", "rotate(45deg)");
    elements[i].style.setProperty("border-radius", "100px");
  
    /*elements[i].style.setProperty(
      "background-color",
      elements[i].id.split("|")[1]
    );*/
    elements[i].addEventListener("click", changecolor);
  }
}






const nbrElementsHeader = document.querySelectorAll("header span p").length - 1;

window.addEventListener("load", onload);

function onload() {
  heightavatar = document.querySelector("#avatar").offsetHeight;
  for (let i = 0; i < nbrElementsHeader; i++) {
    document.querySelectorAll("header div")[i].style.marginTop =
      (heightavatar - 35) / 2 + "px";
  }
}

for (let i = 0; i < nbrElementsHeader; i++) {
  document
    .querySelectorAll("header div")
    [i].addEventListener("click", scrollUntilInnerHTML);
  document
    .querySelectorAll("#topbanner p")
    [i].addEventListener("click", scrollUntilInnerHTML);
}
function scrollUntilInnerHTML(event) {
  window.scroll(
    0,
    document.getElementById(event.target.innerHTML.trim()).offsetTop - 50
  );
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
    //bienveillant
    elements[0].style.animation = "slideinleftwithoutrotate ease-out 0.5s";
    elements[0].style.visibility = "visible";
  }
  if (window.scrollY + window.innerHeight * 0.7 > elements[1].offsetTop) {
    //CV
    elements[1].style.animation = "changecolor ease-out 5s";
    elements[1].style.backgroundColor = "var(--backgroundColor2)";
  }
  if (window.scrollY + window.innerHeight * 0.7 > elements[2].offsetTop) {
    //Creations
    elements[2].style.animation = "changecolor ease-out 5s";
    elements[2].style.backgroundColor = "var(--backgroundColor2)";
  }
  if (window.scrollY > 150 && topbanneranimation == 0) {
    //topbanner
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
  console.log(window.innerWidth);
  if (window.innerWidth < 900) {
    if (window.innerWidth < 600) {
      document.querySelector(".mySwiper").swiper.params.slidesPerView = 1;
    } else {
      document.querySelector(".mySwiper").swiper.params.slidesPerView = 2;
    }
  } else {
    document.querySelector(".mySwiper").swiper.params.slidesPerView = 3;
  }
}, 500);

function changecolor(event) {
  /*for (let i = 0; i < elements.length; i++) {
    elements[i].innerHTML = "";
  }
  event.target.innerHTML = "!";*/
  let rootstyle = document.querySelector(":root").style;
  let col1 = event.target.id.split("|")[1];
  let col2 = event.target.id.split("|")[2];
  let col3 = event.target.id.split("|")[3];

  rootstyle.setProperty("--backgroundColor1", col1);
  rootstyle.setProperty("--backgroundColor2", col2);
  rootstyle.setProperty("--backgroundColor3", col3);

  /* Text color black or white depending of the background color chosen: */
  if (
    parseInt(col1.substring(1, 3), 16) +
      parseInt(col1.substring(3, 5), 16) +
      parseInt(col1.substring(5, 7), 16) >
    400
  ) {
      document.querySelector(':root').style.setProperty('--color1', "black");
  } else {
      document.querySelector(':root').style.setProperty('--color1', "white");
  }
  if (
    parseInt(col2.substring(1, 3), 16) +
      parseInt(col2.substring(3, 5), 16) +
      parseInt(col2.substring(5, 7), 16) >
    400
  ) {
      document.querySelector(':root').style.setProperty('--color2', "black");
  } else {
      document.querySelector(':root').style.setProperty('--color2', "white");
  }
  if (
    parseInt(col3.substring(1, 3), 16) +
      parseInt(col3.substring(3, 5), 16) +
      parseInt(col3.substring(5, 7), 16) >
    400
  ) {
      document.querySelector(':root').style.setProperty('--color3', "black");
  } else {
      document.querySelector(':root').style.setProperty('--color3', "white");
  }
}

/* Links */
listlinks = document.querySelectorAll("div a");
for (let i = 0; i < listlinks.length; i++) {
  listlinks[i].addEventListener("click", ouvrirNouvellepage);
}
function ouvrirNouvellepage(event) {
  event.preventDefault();
  window.open(this.href);
}

/* Formulaire */
//document.querySelector("form button").addEventListener("click", validerFormulaire);

function validerFormulaire(event) {
  event.preventDefault();
}
