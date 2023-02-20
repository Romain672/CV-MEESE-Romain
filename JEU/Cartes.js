/* Object Carte: */
function Carte(id, di, co, rn, al, ab) {
    this.id=id;
    this.display=di;
    this.couleur=co;
    this.randomnumber=rn;
    this.randomdisplay=al;
    this.randomability=ab;
}
let newidnbr = 0;
function newid(){
    newidnbr++;
    return newidnbr;
}

let startnumbercards = 5;
let listcards = [];
const card = document.createElement("div");
var effect = [];
let nbrcards = 0;

window.addEventListener("load", startcreatecards);
function startcreatecards() {
  for (let i = 0; i < startnumbercards; i++) {
    createcard();
  }
}

function createcard(){
  //4 random different numbers
  let listnbrs = [0,1,2,3,4,5,6,7,8,9,10,11];
  let nbr1=Math.floor(Math.random()*listnbrs.length);
  listnbrs.splice(listnbrs.indexOf(nbr1), 1);
  let nbr2=listnbrs[Math.floor(Math.random()*listnbrs.length)];
  listnbrs.splice(listnbrs.indexOf(nbr2), 1);
  let nbr3=listnbrs[Math.floor(Math.random()*listnbrs.length)];
  listnbrs.splice(listnbrs.indexOf(nbr3), 1);
  let nbr4=listnbrs[Math.floor(Math.random()*listnbrs.length)];

  listcards[nbrcards] = new Carte(newid(),aleaability(10),"red", [nbr1,nbr2,nbr3,nbr4], [aleaability(nbr1),aleaability(nbr2),aleaability(nbr3),aleaability(nbr4)]);
  listcards[nbrcards].effect = createrandomeffect(listcards[nbrcards]);
  creerdisplaycarte(listcards[nbrcards]);
  nbrcards++;
}

function aleaability(nbr){
  let icon = [
    "min⚔️",
    "max⚔️",
    "🎯",
    "💖",
    "🦺",
    "👣",
    "📕",
    "🔃",
    "👈",
    "📈",
    "💗",
    "💤",
    "❤️‍🩹", //12
  ];
  return icon[nbr];
}

function creerdisplaycarte(card){
    let newdiv = document.createElement("div");
    newdiv.setAttribute("draggable", "true");
    newdiv.textContent = card.effect;
    newdiv.setAttribute("class", "carte");
    newdiv.setAttribute("id", "carte" + card.id);
    document.getElementById("conteneurcarte").appendChild(newdiv);
}

/*  */

let dragged = null;
let currentpersonhovered = "buginit";
document.addEventListener("dragstart", dragcartestart);
function dragcartestart(event){
  dragged = event.target;
  event.target.style.opacity = .5;

  //add gray screen
  var elemDiv = document.createElement('div');
  elemDiv.style.cssText = 'position:absolute;bottom:0;left:0;width:100%;height:100%;opacity:0.6;z-index:100;background:gray;';
  elemDiv.setAttribute("id","grayscreen");
  document.body.appendChild(elemDiv);
  //document.getElementById("body").style.background = "#505050ff";
}
document.addEventListener("dragend", dragcarteend);
function dragcarteend(event){
  //remove gray screen
  document.getElementById("grayscreen").remove();

  //correction de bug: enlever toutes les highlights des personnes qui auraient été activés incorrectement via le glisser/déposer
  for (let i=1;i<listpersons.length;i++){
    document.getElementById("personne" + i).style.transform = "scale(1)";
    document.getElementById("statssecondaires" + document.getElementById("personne" + i).id.replace("personne","").replace("text","")).style.display = "none";
  }

  event.target.style.opacity = "";
  let currentcard = listcards[event.target.id.replace("carte","")-1];
  try{
    let currentpersonhoverednbr = currentpersonhovered.id.replace("textpersonne","").replace("personne","").replace("statsprincipales","").replace("statssecondaires","");
    let person=listpersons[currentpersonhoverednbr];
  if (currentcard.id==0 || currentcard.id==1 || currentcard.id==6){
    gainX(currentcard.randomnumber[0],person,3);
  }
  if (currentcard.id==3 || currentcard.id==8){
    gainX(currentcard.randomnumber[0],person,2);
    gainX(currentcard.randomnumber[1],person,2);
    gainX(currentcard.randomnumber[2],person,2);
    gainX(currentcard.randomnumber[3],person,2);
    //until the ennemy die
  }
  if (currentcard.id==2){
    let value1 = getvalue(currentcard.randomnumber[0], person);
    let value2 = getvalue(currentcard.randomnumber[1], person);
    gainX(currentcard.randomnumber[0],person,value2-value1+1);
    gainX(currentcard.randomnumber[1],person,value1-value2+1);
  }
  if (currentcard.id==4){
    gainX(currentcard.randomnumber[0],person,5);
    gainX(currentcard.randomnumber[1],person,-3);
    if (currentcard.randomnumber[1]<0){
      currentcard.randomnumber[1]=0;
    }
  }
  if (currentcard.id==5){
    console.log(person.currenthp + "-" + person.hp)
    person.currenthp = (1 - person.currenthp / person.hp) * person.hp;
    console.log(person.currenthp + "+" + person.hp);
    //bug
  }
  if (currentcard.id==7){
    //swap stats of two friendly minions
  }
  if (currentcard.id==9){
    //reroll random of another card
  }
  variable = currentpersonhoverednbr;
  afficherpersonnage(listpersons[currentpersonhoverednbr],document.getElementById("personne"+currentpersonhoverednbr));
  supprimercarte(currentcard);
  currentpersonhovered = "bugdropcard2";
  }
  catch {
    return;
  }
}

document.addEventListener("dragover", dragovercard);
function dragovercard(event){
  event.preventDefault();
}

document.addEventListener("dragleave", dragleavecard);
function dragleavecard(event){
  if (event.target.className=="personne" || event.target.className=="textpersonne"){
    event.target.style.transform = "scale(1)";
    document.getElementById("statssecondaires" + event.target.id.replace("personne","").replace("text","")).style.display = "none";
  }
}

document.addEventListener("dragenter", dragentercard);
function dragentercard(event){
  //BUG HERE
  //make sure dragleave is done before dragenter which work 95% of the time
  setTimeout(() => {
  if (event.target.className=="personne" || event.target.className=="textpersonne"){
    event.target.style.transform = "scale(1.1)";
    document.getElementById("statssecondaires" + event.target.id.replace("personne","").replace("text","")).style.display = "unset";
  }
  }, 1);
}


function dropacard(event){
  if (event.target.className == "personne" ||  event.target.className == "textpersonne" || event.target.className == "statsprincipales" || event.target.className == "statssecondaires") {
    currentpersonhovered = event.target;
  } else {
    currentpersonhovered = "bugdropcard";
  }
}

function supprimercarte(card) {
  document.getElementById("carte" + card.id).remove();
}





/* Effect[] part: */

var effect = [];
function createrandomeffect(card) {
  /*
  016 +3r
  38 +2rrrr
  2 +1rrs
  4 +5r -3r
  5 100%-hp
  7 rs+1+1
  9 c
  */
  let unit;
  unit = card.id - Math.floor(card.id / 10) * 10;
  if (unit == 0 || unit == 1 || unit == 6) {
    effect[card.id] = "Gain permanently three of " + card.randomdisplay[0] + ".";
  }
  if (unit == 3 || unit == 8) {
    effect[card.id] =
      "Increase by two " +
      card.randomdisplay[0] +
      " & " +
      card.randomdisplay[1] +
      " & " +
      card.randomdisplay[2] +
      " & " +
      card.randomdisplay[3] +
      " until the ennemy die.";
  }
  if (unit == 2) {
    effect[card.id] =
      "Swap " + card.randomdisplay[0] + " with " + card.randomdisplay[1] + " and increase them by one.";
  }
  if (unit == 4) {
    effect[card.id] =
      "Gain permanently five " + card.randomdisplay[0] + " and lose three " + card.randomdisplay[1] + ".";
  }
  if (unit == 5) {
    effect[card.id] = "Reverse the % of ❤️‍🩹.";
  }
  if (unit == 7) {
    effect[card.id] =
      "Swap " +
      card.randomdisplay[0] +
      " of two friendly minion and increase them by one.";
  }
  if (unit == 9) {
    effect[card.id] = "Reroll the random(s) attribute(s) of another card.";
  }
  return effect[card.id];
}

function gainX(a,b,c){
  if (a==0){
    b.mindmg+=c;
  }
  if (a==1){
    b.maxdmg+=c;
  }
  if (a==2){
    b.precision+=c;
  }
  if (a==3){
    b.hp+=c;
  }
  if (a==4){
    b.armor+=c;
  }
  if (a==5){
    b.dodge+=c;
  }
  if (a==6){
    b.initiative+=c;
  }
  if (a==7){
    b.extratour+=c;
  }
  if (a==8){
    b.riposte+=c;
  }
  if (a==9){
    b.combo+=c;
  }
  if (a==10){
    b.regen+=c;
  }
  if (a==11){
    b.fuite+=c;
  }
}

function getvalue(a,b){
  if (a==0){
    return b.mindmg;
  }
  if (a==1){
    return b.maxdmg;
  }
  if (a==2){
    return b.precision;
  }
  if (a==3){
    return b.hp;
  }
  if (a==4){
    return b.armor;
  }
  if (a==5){
    return b.dodge;
  }
  if (a==6){
    return b.initiative;
  }
  if (a==7){
    return b.extratour;
  }
  if (a==8){
    return b.riposte;
  }
  if (a==9){
    return b.combo;
  }
  if (a==10){
    return b.regen;
  }
  if (a==11){
    return b.fuite;
  }
  return "buggetvalue";
}
