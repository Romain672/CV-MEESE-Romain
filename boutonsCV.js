// Bouton pour voir un CV plus clean:
boutonCVNormale.addEventListener("click", ouvrepageCVChanger);
boutonCVBasique.addEventListener("click", ouvrepageCVChanger);
let pageCV = "page normale";
function ouvrepageCVChanger() {
  if (pageCV == "page normale") {
    pageCV = "page basique";
    //variables
    var indice = 0;
    let divsacacher;
    //enlever le background
    document.getElementById("bodyCV").style.backgroundImage = "none";
    //cacher toutes les entetes:
    divsacacher = document.getElementsByTagName("div");
    for (indice = 0; indice < divsacacher.length; indice++) {
      //divsacacher[indice].style.display = "none";
      divsacacher[indice].style.fontSize = "15px";
      divsacacher[indice].style.rotate = "0deg";
      divsacacher[indice].style.backgroundColor = "black";
    }
    //h2:
    divsacacher = document.getElementsByTagName("h2");
    for (indice = 0; indice < divsacacher.length; indice++) {
      divsacacher[indice].style.color = "red";
      divsacacher[indice].style.fontSize = "20px";
      divsacacher[indice].style.textDecoration = "underline";
      divsacacher[indice].style.backgroundColor = "black";
      divsacacher[indice].style.borderBottom = "0";
    }
    //h3:
    divsacacher = document.getElementsByTagName("h3");
    for (indice = 0; indice < divsacacher.length; indice++) {
      divsacacher[indice].style.color = "white";
      divsacacher[indice].style.backgroundColor = "black";
      divsacacher[indice].style.fontSize = "18px";
    }
    //ul:
    divsacacher = document.getElementsByTagName("ul");
    for (indice = 0; indice < divsacacher.length; indice++) {
      divsacacher[indice].style.color = "white";
      divsacacher[indice].style.backgroundColor = "black";
      divsacacher[indice].style.fontSize = "15px";
    }
    //li:
    divsacacher = document.getElementsByTagName("li");
    for (indice = 0; indice < divsacacher.length; indice++) {
      divsacacher[indice].style.color = "white";
      divsacacher[indice].style.backgroundColor = "black";
      divsacacher[indice].style.fontSize = "15px";
    }
    //p:
    divsacacher = document.getElementsByTagName("p");
    for (indice = 0; indice < divsacacher.length; indice++) {
      divsacacher[indice].style.color = "white";
      divsacacher[indice].style.backgroundColor = "black";
      divsacacher[indice].style.fontSize = "15px";
    }
    //logo:
    divsacacher = document.getElementsByClassName("logo");
    for (indice = 0; indice < divsacacher.length; indice++) {
      //divsacacher[indice].style.length="10px";
      divsacacher[indice].style.width="50px";
    }
    //main:
    divsacacher = document.getElementsByTagName("main");
    for (indice = 0; indice < divsacacher.length; indice++) {
      divsacacher[indice].style.color = "white";
      divsacacher[indice].style.backgroundColor = "black";
      divsacacher[indice].style.fontSize = "15px";
    }
    //CVpartie:
    divsacacher = document.getElementsByClassName("CVpartie");
    for (indice = 0; indice < divsacacher.length; indice++) {
      divsacacher[indice].style.border = "solid blue 0.1px";
      divsacacher[indice].style.margin = "10px"; 
      /*divsacacher[indice].style.border = "10px";*/
    }
    //cacher le contact:
    try {
      document.getElementById("contactdisplayaffiché").style.display= "none";}
    catch{//ras
    }

    //cacher le header:
    document.getElementById("header").style.display = "none";
    //mise en forme et affichage bouton retour:
    document.getElementById("boutonCVNormale").style.display = "none";
    document.getElementById("boutonCVBasique").style.display = "unset";
  } else {
    window.location.reload();
  }
  if (enigme==6){
    window.open("Bravo.html", "_self");
  }
}
