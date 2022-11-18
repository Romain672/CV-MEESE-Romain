let enigme = 1;

//En tête: boutons :
enteteCV.addEventListener("click", ouvrepageCV);
function ouvrepageCV() {
  window.open("CV.html", "_self");
}
enteteIndex.addEventListener("click", ouvrepageIndex);
function ouvrepageIndex() {
  window.open("index.html", "_self");
}
enteteCreations.addEventListener("click", ouvrepageCreations);
function ouvrepageCreations() {
  window.open("Creations.html", "_self");
}

//En tête: bouton Contact :
enteteContact.addEventListener("click", ouvresectionContact);
function ouvresectionContact() {
  document.getElementById("ContactDisplay").innerHTML =
    "<div><img src='./Icones/mail.svg' class='icon reversecolor'></img><a href='mailto:romain.Meese@hotmail.fr' id='entetemailto'>romain.meese@hotmail.fr</a><br><img src='./Icones/phone.svg' class='icon reversecolor'></img>06.18.93.41.48</div>";
  var element = document.getElementById("enteteContact");
  element.style.backgroundColor = "#204040b0";
  element.classList.add("diventetefalse");
  if (enigme == 2){
    enigme++;
    document.getElementById("e").innerHTML = "oo<br>xx<br>xx";
  } else {
    enigme=1;
    document.getElementById("e").innerHTML = "xx<br>xx<br>xx";
  }
}

//Random rotate pour les sections du CV :
window.addEventListener("load", randomrotate);
function randomrotate() {
  let elements = document.getElementsByClassName("CVpartie");
  for (let indice = 0; indice < elements.length; indice++) {
    let alea = Math.random() * 20 - 10;
    let text = alea.toString().concat("deg");
    elements[indice].style.rotate = text;
  }
}

//Bouton Contact qui tourne :
let moveContact = 0;
let bouclesContact = 0;
enteteContact.addEventListener("mouseover", mouseoverenteteContact);
function mouseoverenteteContact() {
  if (
    document.getElementById("enteteContact").classList.value !=
      "diventete diventetefalse" ||
    document.getElementById("enteteContact").style.rotate != "0deg"
  ) {
    let elements = document.getElementById("enteteContact");
    if (bouclesContact < 4) {
      setTimeout(() => {
        bouclesContact++;
        moveContact = ((moveContact + 15) % 20) - 10;
        let text = moveContact.toString().concat("deg");
        elements.style.rotate = text;
        mouseoverenteteContact();
      }, "200");
    } else {
      bouclesContact = 0;
      //double set à '0deg' vu que ça bug parfois :
      if (
        document.getElementById("enteteContact").classList.value ==
          "diventete diventetefalse" &&
        document.getElementById("enteteContact").style.rotate == "5deg"
      ) {
        document.getElementById("enteteContact").style.rotate = "0deg";
      }
    }
  }
}

//Bouton CV qui tourne :
let moveCV = 0;
let bouclesCV = 0;
enteteCV.addEventListener("mouseover", mouseoverenteteCV);
function mouseoverenteteCV() {
  if (window.location.pathname != "/CV/CV.html") {
    let elements = document.getElementById("enteteCV");
    if (bouclesCV < 4) {
      setTimeout(() => {
        bouclesCV++;
        moveCV = ((moveCV + 15) % 20) - 10;
        let text = moveCV.toString().concat("deg");
        elements.style.rotate = text;
        mouseoverenteteCV();
      }, "200");
    } else {
      bouclesCV = 0;
    }
  }
}

//Bouton Index qui tourne :
let moveIndex = 0;
let bouclesIndex = 0;
enteteIndex.addEventListener("mouseover", mouseoverenteteindex);
function mouseoverenteteindex() {
  if (window.location.pathname != "/CV/index.html") {
    let elements = document.getElementById("enteteIndex");
    if (bouclesIndex < 4) {
      setTimeout(() => {
        bouclesIndex++;
        moveIndex = ((moveIndex + 15) % 20) - 10;
        let text = moveIndex.toString().concat("deg");
        elements.style.rotate = text;
        mouseoverenteteindex();
      }, "200");
    } else {
      bouclesIndex = 0;
    }
  }
}

//Bouton Creations qui tourne :
let moveCreations = 0;
let bouclesCreations = 0;
enteteCreations.addEventListener("mouseover", mouseoverentetecreations);
function mouseoverentetecreations() {
  if (window.location.pathname != "/CV/Creations.html") {
    let elements = document.getElementById("enteteCreations");
    if (bouclesCreations < 4) {
      setTimeout(() => {
        bouclesCreations++;
        moveCreations = ((moveCreations + 15) % 20) - 10;
        let text = moveCreations.toString().concat("deg");
        elements.style.rotate = text;
        mouseoverentetecreations();
      }, "200");
    } else {
      bouclesCreations = 0;
    }
  }
}

//Calcul âge :
window.addEventListener("load", displayage);
function displayage(){
  let diff = Date.now() - new Date('March 22, 1993').getTime();
  var age = new Date(diff);
  let element=document.getElementById("age");
  element.textContent = Math.abs(age.getUTCFullYear() - 1970);
}


//Enigme :
window.addEventListener("load", a);
function a() {
  document.getElementById("e").innerHTML = "xx<br>xx<br>xx";
}
e.addEventListener("click", tartiflette);
function tartiflette() {
  let element=document.getElementById("e");
  if (enigme == 1) {
    enigme++;
    element.innerHTML = "ox<br>xx<br>xx";
  } else {
    if (enigme == 3) {
      enigme++;
      element.innerHTML = "oo<br>ox<br>xx";
    } else {
      if (enigme == 4) {
        enigme++;
        element.innerHTML = "oo<br>oo<br>xx";
      } else {
        enigme=1;
        element.innerHTML = "xx<br>xx<br>xx";
      }
    }
  }
  element.style.backgroundcolor = "blue";
}

i.addEventListener("click", o);
function o(){
  if (enigme==5){
    enigme++;
    document.getElementById("e").innerHTML = "oo<br>oo<br>ox";  
  } else {
    enigme=1;
    document.getElementById("e").innerHTML = "xx<br>xx<br>xx";
  }
}
