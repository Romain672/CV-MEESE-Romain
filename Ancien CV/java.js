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
enteteFAQ.addEventListener("click", ouvrepageFAQ);
function ouvrepageFAQ() {
  window.open("FAQ.html", "_self");
}

//En tête: bouton Contact :
enteteContact.addEventListener("click", ouvresectionContact);
function ouvresectionContact() {
  document.getElementById("ContactDisplay").innerHTML =
    "<div><img src='./Icones/mail.svg' class='icon reversecolor'></img><a href='mailto:romain.Meese@hotmail.fr' id='entetemailto'>romain.meese@hotmail.fr</a><br><img src='./Icones/phone.svg' class='icon reversecolor'></img>06.18.93.41.48</div>";
  var element = document.getElementById("enteteContact");
  element.style.backgroundColor = "#204040b0";
  element.classList.add("diventetefalse");
}

//Bouton Contact qui tourne :
enteteContact.addEventListener("mouseover", mouseoverenteteContact);
function mouseoverenteteContact() {
    let elements = document.getElementById("enteteContact");
    elements.classList.add("startanimation");
  setTimeout(() => {  elements.classList.remove("startanimation") }, 2000);
}


//Bouton CV qui tourne :
enteteCV.addEventListener("mouseover", mouseoverenteteCV);
function mouseoverenteteCV() {
  let elements = document.getElementById("enteteCV");
  if (elements.classList.length == 1) {
    elements.classList.add("startanimation");
    setTimeout(() => {
      elements.classList.remove("startanimation");
    }, 2000);
  }
}

//Bouton Index qui tourne :
enteteIndex.addEventListener("mouseover", mouseoverenteteindex);
function mouseoverenteteindex() {
  let elements = document.getElementById("enteteIndex");
  if (elements.classList.length == 1) {
    elements.classList.add("startanimation");
    setTimeout(() => {
      elements.classList.remove("startanimation");
    }, 2000);
  }
}

//Bouton Creations qui tourne :
enteteCreations.addEventListener("mouseover", mouseoverentetecreations);
function mouseoverentetecreations() {
  let elements = document.getElementById("enteteCreations");
  if (elements.classList.length == 1) {
    elements.classList.add("startanimation");
    setTimeout(() => {
      elements.classList.remove("startanimation");
    }, 2000);
  }
}

//Bouton FAQ qui tourne :
enteteFAQ.addEventListener("mouseover", mouseoverenteteFAQ);
function mouseoverenteteFAQ() {
  let elements = document.getElementById("enteteFAQ");
  if (elements.classList.length == 1) {
    elements.classList.add("startanimation");
    setTimeout(() => {
      elements.classList.remove("startanimation");
    }, 2000);
  }
}

//Calcul âge :
/*window.addEventListener("load", displayage);
function displayage(){
  let diff = Date.now() - new Date('March 22, 1993').getTime();
  var age = new Date(diff);
  let element=document.getElementById("age");
  element.textContent = Math.abs(age.getUTCFullYear() - 1970);
}*/