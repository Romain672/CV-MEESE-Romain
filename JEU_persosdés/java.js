/*Known bugs:
 - Attack too low: action cancelled when having the atk
 - attack too low make the dice became 🔀
  - rare bug on choice of cards

  
function changecarddeck(nbr)
*/

let listpersos = []; // persos[01234] represent ally (top left), persos[5+] is the enemy (top right)
let ennemy = 5; //persos[ennemy] is the current enemy of the listpersos
let listabilities = [12]; //listabilities[012345] is the deck (bottom), listabilities[7] is trash/empty, listabilities[89101112] are for choices after you killed an enemy
let listcards = []; //listcards[0] is trash/empty, listcards[123456] is the starting cards (4 by default, can goes up to 6), listcards[7+] are the cards created manually
let ordrepersos = [0, 1, 2, 3, 4, 5]; //this represent where each perso is present. 5 is always last. If ordrepersos = [0,2,1,4,3,5], then Bernard & Catherine are swapped. Same for Derick and Elise.
let diceavailable = ["y", "y", "y", "y", "y"]; //for each dice in order, this is equal to "n" if it's in a 🔁 position. It's equal to "x" with a specific effect.
let turndelay = [0, 0, 0, 0, 0, 0]; //this tell the number of ⌛ of each card of the deck
let cantrip = 0; //sum the number of 🔁 (-1) and ⌛ (+1) to know if: (0+) you pass to next turn | (-1) you play again and display 🔁 | (-2) you play again, reroll that dice and display 🔁 | (-3 or less) you play again, reroll all dices, and display 🔁
let nbrbombs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //this tell the number of 💥 of each card of the deck (those above 5 are useless)
//those are some permanent bonus on cards, they are trigered right before the end of a turn, since sometimes the effect of the card will fail (those above 5 are useless)
let nbrbonusheal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let nbrbonusmelee = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let nbrbonusrange = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let skipnextmessage = 0; //this is a variable which let you skip the next normal message displayed in the middle
let ordercolor = [
  "darkgreen",
  "purple",
  "darkred",
  "darkslategray",
  "indigo",
  "",
  "",
  "",
  "",
  "",
  "",
  /*Extras*/
  "darkslateblue",
  "black",
]; //colors of the differents sets of cards. At the end, colors of the basic cards and of a trash/empty card (who should be never used)
let skips = 0; //number of times you can reroll a card reward

window.addEventListener("load", onload);
function onload() {
  generatepersos();
  generatecards();
  cookieonstart();
  createbasicdeck();
  afficherallcarte();
  document.getElementById("grayscreen").style.height =
    document.body.scrollHeight + 20 + "px";
  document.getElementById("grayscreen").style.visibility = "visible";
  document.getElementById("grayscreen").style.zIndex = "35";
  document.getElementById("messagecentral").style.zIndex = "40";
  document.getElementById("messagecentral").textContent =
    "Select a dice to play above, the corresponding card below will take effect";
  debutdutour();
}

/* Persos */
let personnage = {
  avatar: "none",
  nom: "none",
  id: 0,
  de: 0,
  currenthp: 10,
  maxhp: 10,
  atkmel: 3,
  atkran: 3,
};
function Personnage(a, b, c, d, e, f) {
  this.avatar = a;
  this.nom = b;
  this.id = listpersos.length;
  this.de = c;
  this.currenthp = d;
  this.maxhp = d;
  this.atkmel = e;
  this.atkran = f;
}
function afficherperso(element, id) {
  let children = element.children;
  if (id == 0) {
    element.style.backgroundColor = "navy";
  }
  if (id == 1) {
    element.style.backgroundColor = "green";
  }
  if (id == 2) {
    element.style.backgroundColor = "darkolivegreen";
  }
  if (id == 3) {
    element.style.backgroundColor = "darkgreen";
  }
  if (id == 4) {
    element.style.backgroundColor = "darkslategray";
  }
  children[0].textContent = listpersos[id].avatar + " " + listpersos[id].nom;
  children[2].textContent = "💖".concat(
    listpersos[id].currenthp
      .toString()
      .concat("/")
      .concat(listpersos[id].maxhp.toString()));

  if (id < 5) {
    if (turndelay[id] != 0) {
      let nbr = turndelay[id];
      if (nbr == 1) {
        children[1].textContent = "⌛";
      }
      if (nbr == 2) {
        children[1].textContent = "⌛²";
      }
      if (nbr == 3) {
        children[1].textContent = "⌛³";
      }
      if (nbr == 4) {
        children[1].textContent = "⌛⁴";
      }
      if (nbr == 5) {
        children[1].textContent = "⌛⁵";
      }
      if (nbr == 6) {
        children[1].textContent = "⌛⁶";
      }
      if (nbr == 7) {
        children[1].textContent = "⌛⁷";
      }
      if (nbr == 8) {
        children[1].textContent = "⌛⁸";
      }
      if (nbr > 8) {
        children[1].textContent = "⌛⁹";
      }
      listpersos[ordrepersos[ordrepersos.indexOf(id)]].de = "7";
    } else {
      if (diceavailable[id] == "n") {
          children[1].textContent = "🔁";
          listpersos[ordrepersos[ordrepersos.indexOf(id)]].de = "7";
      } else {
        if (diceavailable[id] == "x") {
          children[1].textContent = "🔀";
        } else {
          if (diceavailable[id] == "y"){
            var des = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "🔁"]; //1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣🔀🔢🔁
            children[1].textContent = des[listpersos[id].de - 1];
          } else {
            console.log("bug: diceavailable[id] non equal to n, x, or y");
          }
        }
      }
    }

    children[3].textContent = "⚔️"
      .concat(listpersos[id].atkmel)
      .concat(" - ")
      .concat("🏹".concat(listpersos[id].atkran));
  } else {
    //ennemi
    children[1].textContent = listpersos[id].avatar;
    children[3].textContent = "⚔️".concat(listpersos[id].atkmel)
    if(listpersos[id].atkran>1)
      children[3].textContent += " | 🤲" + listpersos[id].atkran;
  }
}
function afficherallperso(array) {
  afficherperso(document.getElementById("persoetde0"), array[0]);
  afficherperso(document.getElementById("persoetde1"), array[1]);
  afficherperso(document.getElementById("persoetde2"), array[2]);
  afficherperso(document.getElementById("persoetde3"), array[3]);
  afficherperso(document.getElementById("persoetde4"), array[4]);
  afficherperso(document.getElementById("persoetde5"), ennemy);
}
function generatepersos() {
  //ally
  listpersos[0] = new Personnage("👻", "Albert", 0, 14, 2, 1);
  listpersos[1] = new Personnage("🤡", "Bernard", 0, 10, 4, 1);
  listpersos[2] = new Personnage("🤖", "Catherine", 0, 10, 3, 2);
  listpersos[3] = new Personnage("👽", "Derick", 0, 6, 4, 4);
  listpersos[4] = new Personnage("🎅", "Elise", 0, 6, 1, 6);
  generatepersoseasy();
}
function generatepersoseasy(){
  listpersos[5] = new Personnage("🐀", "Ratatouille", 0, 8, 3, 1);
  listpersos[6] = new Personnage("🐤", "Piou", 0, 12, 2, 2);
  listpersos[7] = new Personnage("🐧", "Siffli", 0, 16, 5, 1);
  listpersos[8] = new Personnage("🐈", "Garfield", 0, 20, 2, 3);
  listpersos[9] = new Personnage("🐒", "Abu", 0, 24, 7, 1);
  listpersos[10] = new Personnage("🐺", "Fenrir", 0, 28, 4, 2);
  listpersos[11] = new Personnage("🐄", "Abigaëlle", 0, 32, 3, 3);
  listpersos[12] = new Personnage("🐎", "Pégase", 0, 36, 9, 1);
  listpersos[13] = new Personnage("🐻", "Teddy", 0, 40, 2, 5);
  listpersos[14] = new Personnage("🐘", "Dumbo", 0, 44, 10, 1);
  listpersos[15] = new Personnage("👨", "Developper", 0, 48, 11, 1);
  /*Developper difficulty:
  for (let i=5;i<16;i++){
    listpersos[i].atkmel += -3;
    listpersos[i].currenthp += -20;
    listpersos[i].maxhp += -20;
  }*/
}
function generatepersosadvanced() {
  listpersos[5] = new Personnage("🐀", "Ratatouille", 0, 8, 3, 3);
  listpersos[6] = new Personnage("🐤", "Piou", 0, 12, 2, 5);
  listpersos[7] = new Personnage("🐧", "Siffli", 0, 16, 11, 1);
  listpersos[8] = new Personnage("🐈", "Garfield", 0, 20, 4, 3);
  listpersos[9] = new Personnage("🐒", "Abu", 0, 24, 13, 1);
  listpersos[10] = new Personnage("🐺", "Fenrir", 0, 28, 7, 2);
  listpersos[11] = new Personnage("🐄", "Abigaëlle", 0, 32, 5, 3);
  listpersos[12] = new Personnage("🐎", "Pégase", 0, 36, 4, 4);
  listpersos[13] = new Personnage("🐻", "Teddy", 0, 40, 16, 1);
  listpersos[14] = new Personnage("🐘", "Dumbo", 0, 44, 17, 1);
  listpersos[15] = new Personnage("👨", "Developper", 0, 48, 18, 1);
}

/* Cartes */
let carte = {
  avatar: "none",
  color: "darkslateblue",
  nom: "none",
  id: 0,
  effectatk: "",
  effecthp: "",
  effectselfdamage: "",
  effectcantrip: "",
  effectdelay: "",
  effectmove: "",
  effectbomb: "",
  effect1: "",
  effect2: "",
  effect3: "",
  effect4: "",
  effect5: "",
  effectadvanced: "",
};
function Carte(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
  this.avatar = a;
  this.color = b;
  this.nom = c;
  this.id = listcards.length;
  this.effectatk = d;
  this.effecthp = e;
  this.effectselfdamage = f;
  this.effectcantrip = g;
  this.effectdelay = h;
  this.effectmove = i;
  this.effectbomb = j;
  this.effect1 = k;
  this.effect2 = l;
  this.effect3 = m;
  this.effect4 = n;
  this.effect5 = o;
  this.effectadvanced = p;
}
function affichercarte(id) {
  //$h=💖 |$ha=💕 | $c=🔁|$cc=🔁🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸 | $t=⌛ | $z.=display but ignore
  //+1    |  +4    |  +6  |   +9     |   +3  |   +3  |$p>=0 $p5=1| -1   |  -2   =  +9
  let children;
  let explosion = 0;
  try {
    children = document.getElementById("carte" + id).children;
  } catch {
    children = document.getElementById("carteextra" + id).children;
  }
  //children[0]: intro

  if (disablecolors == 0) {
    try {
      document.getElementById("carte" + id).style.backgroundColor =
        ordercolor[listabilities[id].color];
    } catch {
      document.getElementById("carteextra" + id).style.backgroundColor =
        ordercolor[listabilities[id].color];
    }
  } else {
    try {
      document.getElementById("carte" + id).style.backgroundColor =
        "darkslateblue";
    } catch {
      document.getElementById("carteextra" + id).style.backgroundColor =
        "darkslateblue";
    }
  }

  //children[0].textContent = (id+1 + ":" + listabilities[id].nom);
  if (id==0){children[0].textContent = "1️⃣" + listabilities[id].nom;}
  if (id==1){children[0].textContent = "2️⃣" + listabilities[id].nom;}
  if (id==2){children[0].textContent = "3️⃣" + listabilities[id].nom;}
  if (id==3){children[0].textContent = "4️⃣" + listabilities[id].nom;}
  if (id==4){children[0].textContent = "5️⃣" + listabilities[id].nom;}
  if (id==5){children[0].textContent = "6️⃣" + listabilities[id].nom;}
  if (id>5){children[0].textContent = listabilities[id].nom;}

  //children[1].textContent = listabilities[id].nom;
  children[1].innerHTML = "";
  children[2].innerHTML = "<img id='' src='Images/" + listabilities[id].avatar + ".jpg' alt=''>";
  children[3].textContent = listabilities[id].effectatk
    .replaceAll("$m", "⚔️")
    .replaceAll("$r", "🏹");

    try {
      children[4].textContent = listabilities[id].effecthp
        .replaceAll("$ha", "💕")
        .replaceAll("$h", "💖");
    } catch {
      children[4].textContent = "";
    }
    try {
      children[5].textContent = listabilities[id].effectselfdamage
        .replaceAll("$s", "🩸");
    } catch {
      children[5].textContent = "";
    }
  try {
    children[6].textContent = listabilities[id].effectcantrip
      .replaceAll("$cc", "🔁🔁")
      .replaceAll("$c", "🔁");
  } catch {
    children[6].textContent = "";
  }
  try {
    children[7].textContent = listabilities[id].effectdelay
      .replaceAll("$t", "⌛");
  } catch {
    children[7].textContent = "";
  }
  try {
    children[8].textContent = listabilities[id].effectmove
      .replaceAll("$p", "🚶‍♂️");
  } catch {
    children[8].textContent = "";
  }
  children[8].append(displayheal(nbrbonusheal[id+1]));
  children[8].append(displaymelee(nbrbonusmelee[id+1]));
  children[8].append(displayrange(nbrbonusrange[id+1]));
  try {
    children[9].textContent = listabilities[id].effectbomb
      .replaceAll("$bbbbb", "💥💥💥💥💥")
      .replaceAll("$bbbb", "💥💥💥💥")
      .replaceAll("$bbb", "💥💥💥")
      .replaceAll("$bb", "💥💥")
      .replaceAll("$b", "💥");
  } catch {
    children[9].textContent = "";
  }
  try {
    children[10].textContent = listabilities[id].effect1
      .replaceAll("£+", "$")
      .replaceAll("£-", "$")
      .replaceAll("£°", "$")
      .replaceAll("£z", "$")
      .replaceAll("£w", "$")
      .replaceAll("$m", "⚔️")
      .replaceAll("$r", "🏹")
      .replaceAll("$h", "💖");
  } catch {
    children[10].textContent = "";
  }
  try {
    children[11].textContent = listabilities[id].effect2
    .replaceAll("£+", "$")
    .replaceAll("£-", "$")
    .replaceAll("£°", "$")
    .replaceAll("£z", "$")
    .replaceAll("£w", "$")
    .replaceAll("$m", "⚔️")
    .replaceAll("$r", "🏹")
    .replaceAll("$h", "💖");
  } catch {
    children[11].textContent = "";
  }
  try {
    children[12].textContent = listabilities[id].effect3
    .replaceAll("£+", "$")
    .replaceAll("£-", "$")
    .replaceAll("£°", "$")
    .replaceAll("£z", "$")
    .replaceAll("£w", "$")
    .replaceAll("$m", "⚔️")
    .replaceAll("$r", "🏹")
    .replaceAll("$h", "💖");
  } catch {
    children[12].textContent = "";
  }
  try {
    children[13].textContent = listabilities[id].effect4
    .replaceAll("£+", "$")
    .replaceAll("£-", "$")
    .replaceAll("£°", "$")
    .replaceAll("£z", "$")
    .replaceAll("£w", "$")
    .replaceAll("$m", "⚔️")
    .replaceAll("$r", "🏹")
    .replaceAll("$h", "💖");
  } catch {
    children[13].textContent = "";
  }
  try {
    children[14].textContent = listabilities[id].effect5
    .replaceAll("£+", "$")
    .replaceAll("£-", "$")
    .replaceAll("£°", "$")
    .replaceAll("£z", "$")
    .replaceAll("£w", "$")
    .replaceAll("$m", "⚔️")
    .replaceAll("$r", "🏹")
    .replaceAll("$h", "💖");
  } catch {
    children[14].textContent = "";
  }
  /*try {
    children[X].textContent = listabilities[id].effectadvanced
      .replaceAll("£+", "$")
      .replaceAll("£-", "$")
      .replaceAll("$z", "$")
      .replaceAll("£w", "$")
      .replaceAll("£°", "$")
      .replaceAll("$ha", "💕")
      .replaceAll("$h", "💖")
      .replaceAll("$cc", "🔁🔁")
      .replaceAll("$c", "🔁")
      .replaceAll("$m", "⚔️")
      .replaceAll("$r", "🏹")
      .replaceAll("$p", "🚶‍♂️")
      .replaceAll("$s", "🩸")
      .replaceAll("$t", "⌛");
  } catch {
    children[X].textContent = "";
  }*/
  
  /* Advanced mode */
  if (advancedmode ==1) {
    if(id==0){document.getElementById("carte" + id).children[15].textContent = "a:🚶‍♂️1"}; //+4
    if(id==1){document.getElementById("carte" + id).children[15].textContent = "a:💖💖"}; //+2
    if(id==2){document.getElementById("carte" + id).children[15].textContent = "a:💕⌛"}; //+2
    if(id==3){document.getElementById("carte" + id).children[15].textContent = "a:⚔️"}; //+3
    if(id==4){document.getElementById("carte" + id).children[15].textContent = "a:🏹"}; //+3
    if(id==5){document.getElementById("carte" + id).children[15].textContent = "a:🔁"}; //+6
  }

  try {
    if (listabilities[id].effectbomb[1] == "b") {
      //if there is some bombs
      if (nbrbombs[id] == 0) {
        children[9].textContent = displaybombs(
          listabilities[id].effectbomb.length - 1
        );
      } else {
        if (nbrbombs[id] == -1) {
          explosion = 1;
        } else {
          children[9].textContent = displaybombs(nbrbombs[id]);
        }
      }
    }
  } catch {}
  if (explosion == 1) {
    children[1].innerHTML = "<img id='' src='Images/explosed.jpg' alt=''>";
    children[2].textContent = "Explosed";
    children[3].textContent = "";
    children[4].textContent = "";
    children[5].textContent = "";
    children[6].textContent = "";
    children[7].textContent = "";
    children[8].textContent = "";
    children[9].textContent = "";
    children[10].textContent = "";
    children[11].textContent = "";
    children[12].textContent = "";
    children[13].textContent = "";
    children[14].textContent = "";
  }
}
function displaybombs(nbr) {
  let string = "";
  for (let i = 0; i < nbr; i++) {
    string = string.concat("💥");
  }
  return string;
}
function displayheal(nbr) {
  let string = "";
  for (let i = 0; i < nbr; i++) {
    string = string.concat("💖");
  }
  return string;
}
function displaymelee(nbr) {
  let string = "";
  for (let i = 0; i < nbr; i++) {
    string = string.concat("⚔️");
  }
  return string;
}
function displayrange(nbr) {
  let string = "";
  for (let i = 0; i < nbr; i++) {
    string = string.concat("🏹");
  }
  return string;
}
function afficherallcarte() {
  affichercarte(0);
  affichercarte(1);
  affichercarte(2);
  affichercarte(3);
  affichercarte(4);
  affichercarte(5);
}
function generatecards() {
  //$h=💖 |$ha=💕 | $c=🔁|$cc=🔁🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸 | $t=⌛ | $z.=display but ignore
  //+1    |  +4    |  +6  |   +9     |   +3  |   +3  |$p>=0 $p5=1| -1   |  -2   =  +9
  let ephemerelistcards = [];
  //Trash
  ephemerelistcards.push(new Carte("bug", 12, "Bug", "$s$h$c"));
  //Starting deck (=+6 instead of +9)
  ephemerelistcards.push(new Carte("run", 11, "Run forward", "$c", "$p1")); //+7
  ephemerelistcards.push(new Carte("magicorb", 11, "Magic orb", "$m", "$h$h$h")); //+6
  ephemerelistcards.push(new Carte("dualgun", 11, "Dual gun", "$m$r")); //+6
  ephemerelistcards.push(new Carte("two", 11, "Double strike", "$m$m", "$p>")); //+6
  ephemerelistcards.push(new Carte("heal", 11, "Fast heal", "$h", "$c")); //+7
  ephemerelistcards.push(new Carte("longlaser", 11, "Longshot", "$r$r", "$p<")); //+6
  //$h=💖 |$ha=💕 | $c=🔁|$cc=🔁🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸 | $t=⌛ | 💥 | $z.=display but ignore
  //+1    |  +4    |  +6  |   +9     |   +3  |   +3  |$p>=0 $p5=1| -1   |  -2   =  +9
  //Normal => 24
  ephemerelistcards.push(new Carte("trident", 0, "Triple strike", "$m$m$m", "$p>")); //+9
  ephemerelistcards.push(new Carte("spear", 0, "Long attack", "$m$m$r", "$p>")); //+9
  ephemerelistcards.push(new Carte("wooden weapon", 0, "Agou agou", "$m$r$r")); //+9
  ephemerelistcards.push(new Carte("bullet", 0, "Sniping", "$r$r$r", "$p<")); //+9
  ephemerelistcards.push(new Carte("strikeheal", 0, "Strike & Heal", "$m$m", "$h$h$h", "$p>")); //+9
  ephemerelistcards.push(new Carte("attack", 0, "Attack & Heal", "$m$r", "$h$h$h")); //+9
  ephemerelistcards.push(new Carte("snipe", 0, "Snipe & Heal", "$r$r", "$h$h$h", "$p<")); //+9
  ephemerelistcards.push(new Carte("drain", 0, "Drain life", "$m", "$h$h$h$h$h$h$h", "$p>")); //+10
  ephemerelistcards.push(new Carte("boomerang", 0, "Boomerang heal", "$r", "$h$h$h$h$h$h$h", "$p5")); //+11
  ephemerelistcards.push(new Carte("balloonsfish", 0, "Big heal", "$h$h$h$h$h$h$h$h$h$h$h$h$h$h$h$h$h$h$h$h$h")); //+14
  ephemerelistcards.push(new Carte("fourstars", 0, "Quadruple shot", "$r$r$r$r", "$s$s$s", "$p4")); //+10
  ephemerelistcards.push(new Carte("bench", 0, "Heal & Retreat", "$h$h$h", "$c", "$p5")); //+10
  ephemerelistcards.push(new Carte("carddeck", 0, "Quick draw", "$r", "$c")); //+9
  ephemerelistcards.push(new Carte("quick", 0, "Quick attack", "$m", "$c")); //+9
  ephemerelistcards.push(new Carte("coffee", 0, "Instant heal", "$h", "$cc")); //+10
  ephemerelistcards.push(new Carte("handshake", 0, "Instant attack", "$m", "$s$s", "$cc")); //+10
  ephemerelistcards.push(new Carte("bananateleport", 0, "Banana snipe", "$r", "$s$s", "$cc")); //+10
  ephemerelistcards.push(new Carte("time", 0, "Teleport forward", "$cc", "$p1")); //+10
  ephemerelistcards.push(new Carte("bench", 0, "Teleport behind", "$cc", "$p<")); //+9
  ephemerelistcards.push(new Carte("quicklamp", 0, "Quick things", "$s", "Others 🔁 dices (not from Quick things) are rerolled", "$c"));
  ephemerelistcards.push(new Carte("alone", 0, "Lost", "$m", "$s", "$c", "$p1")); //+9
  ephemerelistcards.push(new Carte("catapult", 0, "Flee snipe", "$r", "$s", "$c", "$p5")); //+9
  ephemerelistcards.push(new Carte("switchrole", 0, "Reversed snipe", "$r$r$r", "$h", "$p1")); //+11
  ephemerelistcards.push(new Carte("parry", 0, "Reversed attack", "$m$m$m", "$h", "$p5")); //+10
  //$h=💖 |$ha=💕 | $c=🔁|$cc=🔁🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸 | $t=⌛ | 💥 | $z.=display but ignore
  //+1    |  +4    |  +6  |   +9     |   +3  |   +3  |$p>=0 $p5=1| -1   |  -2   =  +9
  //Delay $t => 19
  ephemerelistcards.push(new Carte("quadruplecard", 1, "Quadruple strike", "$m$m$m$m", "$t", "$p>")); //+10
  ephemerelistcards.push(new Carte("longsnake", 1, "Longest snake", "$m$m$m$r", "$t", "$p>")); //+10
  ephemerelistcards.push(new Carte("dolphin", 1, "Heavy attack", "$m$m$r$r", "$t")); //+10
  ephemerelistcards.push(new Carte("greatshot", 1, "Great shot", "$m$r$r$r", "$t", "$p<")); //+10
  ephemerelistcards.push(new Carte("birdhouse", 1, "Sniping hard", "$r$r$r$r", "$t", "$p<")); //+10
  ephemerelistcards.push(new Carte("stabbing", 1, "Timeal strike", "$m$m$m", "$h$h", "$t", "$p>")); //+9
  ephemerelistcards.push(new Carte("fence", 1, "Install fence", "$m$m$r", "$h$h", "$t")); //+9
  ephemerelistcards.push(new Carte("scorpio", 1, "Scorpio's help", "$m$r$r", "$h$h", "$t")); //+9
  ephemerelistcards.push(new Carte("spiderweb", 1, "Timeal snipe", "$r$r$r", "$h$h", "$t", "$p<")); //+9
  ephemerelistcards.push(new Carte("marblesofdeath", 1, "Marbles of death", "$m$m$m$m$m$m", "$t$t$t$t")); //+10
  ephemerelistcards.push(new Carte("fireworks", 1, "Arrow of the year", "$r$r$r$r$r$r", "$t$t$t$t")); //+10
  ephemerelistcards.push(new Carte("field", 1, "Rest", "$ha$ha$ha", "$t")); //+10
  ephemerelistcards.push(new Carte("meditate", 1, "Mediate", "$ha$ha$ha$ha", "$t$t$t")); //+10
  ephemerelistcards.push(new Carte("sleep", 1, "Time to rest", "$ha$ha$ha$ha$ha", "$t$t$t$t$t")); //+10
  ephemerelistcards.push(new Carte("acceleratetime", 1, "Accelerate time", "⌛ dices loses one coldown", "$c"));
  ephemerelistcards.push(new Carte("skiptime", 1, "Skip time", "⌛ dices loses all coldowns"));
  ephemerelistcards.push(new Carte("onethousandclock", 1, "One thousand clock", "Deal 3^x damage to the enemy where x is the number of dices with ⌛", "$c"));
  ephemerelistcards.push(new Carte("four", 1, "Power of four", "Add ⌛⚔️ to the 4️⃣ card", "$c"));
  //ephemerelistcards.push(new Carte("", 1, "", "Deal 2 damage to the enemy per⌛⚔️ to a random other card with ⌛", "$c"));
  ephemerelistcards.push(new Carte("synchronize", 1, "Synchronize", "Add 🔁⌛⌛⌛ to the 2️⃣ card", "$c", "$b"));
  //$h=💖 |$ha=💕 | $c=🔁|$cc=🔁🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸 | $t=⌛ | 💥 | $z.=display but ignore
  //+1    |  +4    |  +6  |   +9     |   +3  |   +3  |$p>=0 $p5=1| -1   |  -2   =  +9
  //$Heal => 17
  ephemerelistcards.push(new Carte("healimpact", 2, "Heal impact", "$m$m", "$ha", "$p>")); //+10
  ephemerelistcards.push(new Carte("seedtree", 2, "Heal polyvalent", "$m$r", "$ha")); //+10
  ephemerelistcards.push(new Carte("loverock", 2, "Heal meteor", "$r$r", "$ha", "$p<")); //+10
  ephemerelistcards.push(new Carte("woundedheart", 2, "Regeneration attack", "$m", "$h$h", "$ha")); //+9
  ephemerelistcards.push(new Carte("fiveboule", 2, "Regeneration snipe ", "$r", "$h$h", "$ha")); //+9
  ephemerelistcards.push(new Carte("island", 2, "Rejuvenation", "$h$h$h$h$h", "$ha")); //+9
  ephemerelistcards.push(new Carte("letter", 2, "Regeneration", "$h", "$ha$ha")); //+9
  ephemerelistcards.push(new Carte("regenerationleaf", 2, "Triple reparation", "$s$s$s", "$ha$ha$ha")); //+9
  ephemerelistcards.push(new Carte("fastdog", 2, "Wouf", "$ha", "$c")); //+10
  ephemerelistcards.push(new Carte("bloodcell", 2, "Transfer health", "$s$s$s$s$s$s", "$ha$ha", "$c", "$p>")); //+9
  ephemerelistcards.push(new Carte("heart+", 2, "Enhance", "Add 💖 to all others cards", "$cc", "$b")); //+9
  ephemerelistcards.push(new Carte("heartprism", 2, "Battle heart", "This turn, your 💖 deal one damage as extra effect", "$c")); //+9
  ephemerelistcards.push(new Carte("twopurpleheart", 2, "Purple heart", "$s$s", "Double the 💖 of all other ally"));
  ephemerelistcards.push(new Carte("redgift", 2, "Red synergy", "Other red cards gain 💖", "$c")); //+9
  ephemerelistcards.push(new Carte("cultivate", 2, "Upgrading heal", "$m$m", "Gain £°h after each use")); //+6
  ephemerelistcards.push(new Carte("bridge", 4, "Healing dash", "$p1", "💖💖 for each space moved", "$c")); //6 8 10 12 14
  ephemerelistcards.push(new Carte("medictime", 4, "Medical dash", "$p5", "💕 for each space moved")); //0 4 8 12 16
  //$h=💖 |$ha=💕 | $c=🔁|$cc=🔁🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸 | $t=⌛ | 💥 | $z.=display but ignore
  //+1    |  +4    |  +6  |   +9     |   +3  |   +3  |$p>=0 $p5=1| -1   |  -2   =  +9
  //Permanent upgrades $b => 22
  ephemerelistcards.push(new Carte("demonicstrength", 3, "Demonic strength", "Gain permanently £+m", "Loses permanently £-h£-h", "$cc")); //+0p
  ephemerelistcards.push(new Carte("demonicpact", 3, "Demonic's pact", "Gain permanently £+r", "Loses permanently £-h£-h", "$cc")); //+0p
  ephemerelistcards.push(new Carte("hellvolcano", 3, "Demonic health", "Gain permanently £+h£+h£+h£+h", "Loses permanently £-m£-r", "$cc")); //+0p
  ephemerelistcards.push(new Carte("searchforheal", 3, "Lifestone's search", "Gain permanently £+h", "$c", "$bbb")); //+3p
  ephemerelistcards.push(new Carte("purpleflower", 3, "Melee buff", "Gain permanently £+m", "Loses permanently £-h", "$c", "$bbb")); //+3p
  ephemerelistcards.push(new Carte("purpleflower", 3, "Melee buff", "Gain permanently £+m", "Loses permanently £-h", "$c", "$bbb")); //+3p
  ephemerelistcards.push(new Carte("purpleflower", 3, "Melee buff", "Gain permanently £+m", "Loses permanently £-h", "$c", "$bbb")); //+3p
  ephemerelistcards.push(new Carte("purpleflower", 3, "Melee buff", "Gain permanently £+m", "Loses permanently £-h", "$c", "$bbb")); //+3p
  ephemerelistcards.push(new Carte("purpleflower", 3, "Melee buff", "Gain permanently £+m", "Loses permanently £-h", "$c", "$bbb")); //+3p
  ephemerelistcards.push(new Carte("purpleflower", 3, "Melee buff", "Gain permanently £+m", "Loses permanently £-h", "$c", "$bbb")); //+3p
  ephemerelistcards.push(new Carte("purpleflower", 3, "Melee buff", "Gain permanently £+m", "Loses permanently £-h", "$c", "$bbb")); //+3p
  ephemerelistcards.push(new Carte("purpleflower", 3, "Melee buff", "Gain permanently £+m", "Loses permanently £-h", "$c", "$bbb")); //+3p
  ephemerelistcards.push(new Carte("purpleflower", 3, "Melee buff", "Gain permanently £+m", "Loses permanently £-h", "$c", "$bbb")); //+3p
  ephemerelistcards.push(new Carte("sunsetgiraffe", 3, "Ranged buff", "Gain permanently £+r", "Loses permanently £-h", "$c", "$bbb")); //+3p
  ephemerelistcards.push(new Carte("devilclothe", 3, "Attack buff", "Gain permanently £+m£+r", "Loses permanently £-h£-h", "$c", "$bb")); //+4p
  ephemerelistcards.push(new Carte("candleburned", 3, "Demonic attack", "$p>", "$m$m$m", "Loses permanently £-r to deal £wm£wm£wm extra")); //+18
  ephemerelistcards.push(new Carte("escapehell", 3, "Demonic snipe", "$p<", "$r$r$r", "Loses permanently £-m to deal £wr£wr£wr extra")); //+18
  ephemerelistcards.push(new Carte("runexplose", 3, "Attack and run", "$p>", "$m", "Loses permanently £-r to deal £wm£wm£wm extra", "$c")); //+18
  ephemerelistcards.push(new Carte("demonicbow", 3, "Demonic fast snipe", "$p<", "$r", "Loses permanently £-m to deal £wr£wr£wr extra", "$c")); //+18
  ephemerelistcards.push(new Carte("growstrength", 3, "Instable full attack", "$m$m", "Gain £°m after each use", "$bbbbb")); // +6 +9 +12 +15 +18
  ephemerelistcards.push(new Carte("distribution", 3, "Distribution", "💥 cards (non Bunker or Distribution) gain one 💥", "$c", "$bb"));
  ephemerelistcards.push(new Carte("bunker", 3, "Bunker", "💥 cards (non Bunker or Distribution) gain one 💥", "$bbbbb"));
  ephemerelistcards.push(new Carte("triplebullseyes", 3, "Extra attacks", "$m$m$r$r", "$bbbbb")); //+9 3*5
  ephemerelistcards.push(new Carte("atomicbomb", 3, "Instable strikes", "$m$m$m$m$m$m", "$p>", "$bb")); //+9 9*2
  ephemerelistcards.push(new Carte("timedattack", 3, "Instant difficult blow", "$m", "$cc", "$bbb")); //+9 3*3
  ephemerelistcards.push(new Carte("soapbubblee", 3, "Instant medic", "$s$s$s", "$ha", "$cc")); //+10
  ephemerelistcards.push(new Carte("rundog", 3, "Helping dog", "$ha", "$cc", "$bbbbb")); //+9 4*5
  ephemerelistcards.push(new Carte("planeexplosion", 3, "Fast instable attacks", "$m$r", "$c", "$bbb")); //+9 3*3
  ephemerelistcards.push(new Carte("callbomb", 3, "Call for help", "$ha$ha$ha$ha$ha$ha", "$t$t$t", "$bb")); //+9 2*9
  ephemerelistcards.push(new Carte("pizza", 1, "Feed", "$r$r", "If that kill the enemy, gain permanently 💖💖")); //+9
  //$h=💖 |$ha=💕 | $c=🔁|$cc=🔁🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸 | $t=⌛ | 💥 | $z.=display but ignore
  //+1    |  +4    |  +6  |   +9     |   +3  |   +3  |$p>=0 $p5=1| -1   |  -2   =  +9
  //Unique effects => 19
  ephemerelistcards.push(new Carte("perfectspot", 4, "Perfect spot", "$m$r", "$h", "💖🏹 if 🚶‍♂️3", "$p3")); //+8.4
  ephemerelistcards.push(new Carte("target", 4, "Balanced attack", "⚔️⚔️⚔️ if 🚶‍♂️1 or 🚶‍♂️2", "🏹🏹🏹 if 🚶‍♂️4 or 🚶‍♂️5")); //+7.2
  ephemerelistcards.push(new Carte("middlewood", 4, "Fortress in the wood", "$m", "⚔️🏹🏹 if 🚶‍♂️2 or 🚶‍♂️3 or 🚶‍♂️4")); //+8.4
  ephemerelistcards.push(new Carte("longattack", 4, "Snipe dash", "$p4", "🏹🏹 for each space moved")); //0 6 6 12 18
  ephemerelistcards.push(new Carte("fourswap", 4, "Crowd", "Swap randomly 2 by 2 others characters", "$cc")); //+9
  ephemerelistcards.push(new Carte("switch", 4, "Switch", "Swap your ⚔️ & 🏹", "$c")); //+6
  ephemerelistcards.push(new Carte("reroll", 4, "Reroll", "$h", "Reroll all unused dices", "$c")); //+6
  ephemerelistcards.push(new Carte("rubbickscube", 4, "Return", "Return all unused dice", "$c")); //+6
  ephemerelistcards.push(new Carte("jellyfish", 4, "Chaos", "$ha", "Trigger a random other ability (non Chaos)")); //+13
  ephemerelistcards.push(new Carte("copycat", 4, "Copycat", "Apply the 1️⃣ effect")); //+9.5
  ephemerelistcards.push(new Carte("blackhole", 4, "Feed from allies", "$h$h$h$h$h", "All other allies take one damage", "$cc")); //+10
  ephemerelistcards.push(new Carte("fightofelements", 4, "Fight of elements", "Loses permanently 2⚔️ and 3🏹 then double them", "$cc", "$b"));
  ephemerelistcards.push(new Carte("newminion", 4, "Song of robustness", "Loses permanently 6💖 then double it", "$cc", "$b"));
  ephemerelistcards.push(new Carte("doorgate", 4, "Resurrection", "If you have 0⚔️ and 0🏹, gain permanently 4⚔️ and 6🏹", "$cc", "$b"));
  ephemerelistcards.push(new Carte("canyon", 4, "Narrow path", "Permanently reduce 🤲 of enemy to 2", "$c"));
  ephemerelistcards.push(new Carte("panneauetroit", 4, "Launch a panel", "Permanently reduce 🤲 of enemy by 1 (down to 1)", "$c", "$bb"));
  ephemerelistcards.push(new Carte("punch", 4, "Disarm", "Permanently reduce ⚔️ of enemy by 1 (down to 5)", "$c"));
  ephemerelistcards.push(new Carte("lasso", 4, "Lasso", "Permanently reduce ⚔️ of enemy by 3 (down to 5)", "$bb"));
  ephemerelistcards.push(new Carte("halfheart", 4, "Broken heart", "Half the hp of yourself and the enemy (rounded down)"));
  //$h=💖 |$ha=💕 | $c=🔁|$cc=🔁🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸 | $t=⌛ | $z.=display but ignore
  //+1    |  +4    |  +6  |   +9     |   +3  |   +3  |$p>=0 $p5=1| -1   |  -2   =  +9
  generatecardscreateorder(ephemerelistcards);
}
function generatecardscreateorder(ephemerelistcards) {
  let card;
  let text = "";
  let split;
  for (let i=0;i<ephemerelistcards.length;i++){
    card = ephemerelistcards[i];
    let j = [card.effectatk, card.effecthp, card.effectselfdamage, card.effectcantrip, card.effectdelay, card.effectmove, card.effectbomb, card.effect1, card.effect2, card.effect3, card.effect4, card.effect5, card.effectadvanced];
    text += j[0];
    for (let k=1; k<j.length;k++){
      if (j[k] != undefined) {
        text += "|" + j[k];
      }
    }
    listcards.push(new Carte(ephemerelistcards[i].avatar, ephemerelistcards[i].color, ephemerelistcards[i].nom, "", "", "", "", "", "", "", "", "", "", "", "", ""));
  
    let separate = text.split("|")
    let nbreffects=0;
    for (l=0;l<separate.length;l++){
      split = separate[l].split("$");
      //console.log(split);
      for (let k=0;k<split.length;k++){
        let char = split[k].charAt(0);
        let char2 = split[k].charAt(1);
        let chardelete = 0;
          if (char=="m"){
            listcards[i].effectatk += "$m";
            chardelete = 1;
          }
          if (char=="r"){
            listcards[i].effectatk += "$r";
            chardelete = 1;
          }
          if (char=="h"){
            if (char2 =="a"){
              listcards[i].effecthp += "$ha";
              chardelete = 2;
            } else {
              listcards[i].effecthp += "$h";
              chardelete = 1;
            }
          }
          if (char=="s") {
            listcards[i].effectselfdamage += "$s";
            chardelete = 1;
          }
          if (char=="c") {
            if (char2 == "c"){
              listcards[i].effectcantrip += "$cc";
              chardelete = 2;
            } else {
              listcards[i].effectcantrip += "$c";
              chardelete = 1;
            }
          }
          if (char=="t") {
            listcards[i].effectdelay += "$t";
            chardelete = 1;
          }
          if (char=="p") {
            listcards[i].effectmove += "$p" + char2;
            chardelete = 2;
          }
          if (char=="b"){ //last test
            listcards[i].effectbomb += "$";
            let counter=0;
            while (char=="b") {
              listcards[i].effectbomb += "b";
              counter++;
              if (split[k].length > counter){
                char = split[k].charAt(counter);
              } else {
                char="end";
              }
            }
            chardelete = counter;
          }
          //console.log(">" + chardelete + "|" + split[k]);
          if (split[k].length != chardelete) {
            split[k] = split[k].substring(chardelete);
            if (nbreffects == 0){
              listcards[i].effect1 += split[k];
            }
            if (nbreffects == 1){
              listcards[i].effect2 += split[k];
            }
            if (nbreffects == 2){
              listcards[i].effect3 += split[k];
            }
            if (nbreffects == 3){
              listcards[i].effect4 += split[k];
            }
            if (nbreffects == 4){
              listcards[i].effect5 += split[k];
            }
            nbreffects++;
          }
      }
      //console.log(listcards[i].effectatk);
      text = "";
    }
    }
  console.log("Génération cartes faites:");
  console.log(listcards);
}
function createbasicdeck() {
  for (let i=0;i<7;i++){
    listabilities[i]=listcards[i+1];
  }
  for (let i=5;i>5-randostartcard;i--){
    listabilities[9] = listcards[Math.floor(Math.random()*(listcards.length-7))+7];
    cardchosen = 3;
    changecarddeck(i);
  }
}


/* Gameplay */
function lancerdes() {
  diceavailable = ["y", "y", "y", "y", "y"];
  for (let i = 0; i < 5; i++) {
    listpersos[i].de = Math.trunc(Math.random() * 6 + 1);
  }
}
function debutdutour() {
  genererevents();
  lancerdes();
  afficherallperso(ordrepersos);
}
function findutour() {
  if (listpersos[ennemy].currenthp < 1) {
    console.log("Kill");
    //One kill done
    if (ennemy == 15) {
      youwin();
      return;
    }
    ennemy++;
    choosenewcard();
    if (ennemy%2 == 1){
      skips++;
    }
    let elementstyle = document.getElementById("displayrules").style;
    elementstyle.fontSize = "20px";
    elementstyle.width = "120px";
    elementstyle.height = "22px";
  } else {
    //damage
    for (let i=0;i<listpersos[ennemy].atkran;i++){
      listpersos[ordrepersos[i]].currenthp += -1 * listpersos[ennemy].atkmel;
    }
  }
  if (skipnextmessage == 0) {
    document.getElementById("messagecentral").textContent =
      "Select a dice to play";
  }
  skipnextmessage = 0;
  checkhps();
  debutdutour();
}
function turndelaydecrease() {
  for (i = 0; i < 5; i++) {
    if (turndelay[i] > 0) {
      turndelay[i]--;
    }
  }
}
function checkhps() {
  let morts = 672;
  let nbrheal = 0;
  while (morts > 0) {
    morts = 0;
    for (let i = 0; i < 5; i++) {
      if (listpersos[i].currenthp < 1) {
        listpersos[i].currenthp += 4;
        listpersos[0].currenthp--;
        listpersos[1].currenthp--;
        listpersos[2].currenthp--;
        listpersos[3].currenthp--;
        listpersos[4].currenthp--;
        morts++;
        nbrheal++;
      }
    }
    if (morts == 5) {
      gameover();
      return;
    }
  }
  for (let i = 0; i < 5; i++) {
    if (listpersos[i].currenthp > listpersos[i].maxhp) {
      listpersos[i].currenthp = listpersos[i].maxhp;
    }
  }
  if (nbrheal > 0) {
    if (nbrheal == 1) {
      document.getElementById("messagecentral").textContent =
        "Someone took lethal damage: he got healed (*3) but everyone else took damage (" +
        nbrheal +
        " time)";
    } else {
      document.getElementById("messagecentral").textContent =
        "Someone took lethal damage: he got healed (*3) but everyone else took damage (" +
        nbrheal +
        " times)";
    }
  }
}
function genererevents() {
  for (let i = 0; i < 5; i++) {
    document.getElementById("persoetde" + i).addEventListener("click", clickde);
  }
}
function clickde(event) {
  let ev = event.target.id;
  let divdeclique = document.getElementById("de" + ev.charAt(ev.length-1));

  document.getElementById("grayscreen").style.visibility = "hidden";
  document.getElementById("grayscreen").style.zIndex = "35";
  document.getElementById("grayscreen").style.zIndex = "35";
  document.getElementById("messagecentral").style.zIndex = "0";
  for (let i = 0; i < 5; i++) {
    document.getElementsByClassName("ally")[i].style.zIndex = "0";
  }

  let player = listpersos[ordrepersos[divdeclique.id.replace("de", "")]];
  let de = player.de;
  let carte = listabilities[de - 1].id;

  if (de == 7) {
    document.getElementById("messagecentral").textContent =
      "Clicking on 🔁/⌛/🔀 does nothing. You can skip turn instead.";
    return;
  }
  if (nbrbombs[player.de - 1] == -1) {
    document.getElementById("messagecentral").textContent =
      "Trying to use an explosed card does nothing. You can skip turn instead.";
    return;
  }

  resolveeffect(player, carte);

  if (cantrip == 0) {
    afficherallperso(ordrepersos);
    turndelaydecrease();
    findutour();
  } else {
    if (listpersos[ennemy].currenthp < 1) {
      listpersos[ennemy].currenthp = 0;
      afficherallperso(ordrepersos);
      document.getElementById("messagecentral").textContent =
        "Ennemy killed. You must do an extra action (like skip turn) before fighting the next ennemy.";
    } else {
      if (skipnextmessage == 0) {
        document.getElementById("messagecentral").textContent = "Extra turn (🔁)";
      }
      skipnextmessage = 0;
    }
  }
}
function resolveeffect(player, id) {
  //$h=💖 |$ha=💕 | $c=🔁|$cc=🔁🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸 | $t=⌛ | $z.=display but ignore
  //+1    |  +4    |  +6  |   +9     |   +3  |   +3  |$p>=0 $p5=1| -1   |  -2   =  +9
  cantrip = 0;
  let increaseturndelay = 0;
  let applyextraeffects = 0;
  let battleheart = 0;
  id = specialseffectsbeforebeforebefore(player, id);
  id = specialseffectsbeforebefore(player, id);
  id = specialseffectsbefore(player, id);
  //bombs
  if (nbrbombs[listpersos[player.id].de - 1] == 1) {
    //explosion
    nbrbombs[listpersos[player.id].de - 1] = -1;
  } else {
    if (nbrbombs[listpersos[player.id].de - 1] > 1) {
      //-1bomb
      nbrbombs[listpersos[player.id].de - 1]--;
    }
  }

  let permanentbuff = [0,0,0]; //[m, r, h]

for (const property in listabilities[player.de-1]) {
  let currentproperty = `${listabilities[player.de-1][property]}`;
  if (property != "avatar" && property != "color" && property != "nom" && property != "id" && currentproperty != ""){
    let split = currentproperty.split(/\$|\£/).filter(e => e);
    for (j=0;j<split.length;j++){
      //console.log(split[j]);


      let char = split[j].charAt(0);
      if (char[0] == "h") {
        if (split[j].charAt(1) == "a") {
          //💕
          for (let k = 0; k < 5; k++) {
            heal(listpersos[k], 1);
          }
          heal(player, -1); //heal all other ally
        } else {
          //💖
          heal(player, 1);
          //battle heart special effect
          if (battleheart>0){
            attack(battleheart);
          }
        }
      }
      if (char[0] == "c") {
        increaseturndelay--;
        if ((split[j].charAt(1) == "c")) {
          increaseturndelay--;
        }
      }

      if (char[0] == "m") {
        //⚔️
        atkmel(player, 1);
      }
      if (char[0] == "r") {
        //🏹
        atkran(player, 1);
      }
      if (char[0] == "p") {
        //🚶‍♂️
        move(player, split[j].charAt(1));
      }
      if (char[0] == "s") {
        //🩸
        heal(player, -1);
      }
      if (char[0] == "t") {
        //⌛
        increaseturndelay++;
      }

      //permanent buff on perso
      if (char[0] == "+") {
        console.log("+" + split + "| " + split[j].charAt(1));
        if (split[j].charAt(1) == "m") {
          permanentbuff[0]++;
          applyextraeffects=1;
        }
        if (split[j].charAt(1) == "r") {
          permanentbuff[1]++;
          applyextraeffects=1;
        }
        if (split[j].charAt(1) == "h") {
          permanentbuff[2]++;
          applyextraeffects=1;
        }
      }
      if (char[0] == "-") {
        console.log("-" + split + "| " + split[j].charAt(1));
        if (split[j].charAt(1) == "m") {
          if (player.atkmel-permanentbuff[0] < 1) {
            document.getElementById("messagecentral").textContent ="Attack too low: extra effects not applied.";
            skipnextmessage = 1;
            applyextraeffects=0; //useless
          } else {
            permanentbuff[0]--;
            applyextraeffects=1;
          }
        }
        if (split[j].charAt(1) == "r") {
          if (player.atkran-permanentbuff[1] < 1) {
            document.getElementById("messagecentral").textContent ="Range too low: extra effects not applied.";
            skipnextmessage = 1;
            applyextraeffects=0; //useless
          } else {
            permanentbuff[1]--;
            applyextraeffects=1;
          }
        }
        console.log("p");
        if (split[j].charAt(1) == "h") {
          if (player.maxhp-permanentbuff[2] < 2) {
            document.getElementById("messagecentral").textContent =
              "Health too low: extra effects not applied.";
            skipnextmessage = 1;
            applyextraeffects=0; //useless
          } else {
            permanentbuff[2]--;
            applyextraeffects=1;
          }
        }
      }
      if (char[0] == "w" && applyextraeffects==1) {
        //£w
        console.log("Stat lost: extra effects applied");
        if(split[j].charAt(1) == "m"){
          atkmel(player, 1);
        }
        if(split[j].charAt(1) == "r"){
          atkmel(player, 1);
        }
        if(split[j].charAt(1) == "h"){
          heal(player, 1);
        }
      }

      //permanent buff on card
      if (char[0] == "°") {
        if (split[j].charAt(1) == "m") {
          atkmel(player,nbrbonusmelee[player.de]);
          nbrbonusmelee[player.de]++;
          afficherallcarte();
        }
        if (split[j].charAt(1) == "r") {
          atkmel(player,nbrbonusrange[player.de]);
          nbrbonusrange[player.de]++;
          afficherallcarte();
        }
        if (split[j].charAt(1) == "h") {
          heal(player, nbrbonusheal[player.de]);
          nbrbonusheal[player.de]++;
          afficherallcarte();
        }
        console.log("u");
      }

    }
    console.log(split);
  }
}
    /* Advanced mode */
    /*if (j==8){
        if (advancedmode==1){
          if(player.de==1){split = "a:$p1"}; //+4
          if(player.de==2){split = "a:$h$h"}; //+2
          if(player.de==3){split = "a:$ha$t"}; //+2
          if(player.de==4){split = "a:$m"}; //+3
          if(player.de==5){split = "a:$r"}; //+3
          if(player.de==6){split = "a:$c"}; //+1
          split = split.split("$");
        } else {
        split="y";
      }
    }*/
      

  //permanent buff
  if (applyextraeffects==1){
    player.atkmel += permanentbuff[0];
    player.atkran += permanentbuff[1];
    player.maxhp += permanentbuff[2];
    if(permanentbuff[2]>0){ //useless
      heal(player, permanentbuff[2]);
    }
  }

  if (increaseturndelay > 0) {
    turndelay[player.id] = increaseturndelay + 1;
  }
  if(increaseturndelay == -1){
    //🔁 or 🔁🔁⌛
    diceavailable[player.id] = "n";
    cantrip = 1;
  }
  if (increaseturndelay == -2 || increaseturndelay == -3){
    //🔁🔁
    let previousde = listpersos[player.id].de;
    listpersos[player.id].de = Math.trunc(Math.random() * 5 + 1);
    if (listpersos[player.id].de >= previousde) {
    listpersos[player.id].de++;
    }
    cantrip = 1;
  }
  if (increaseturndelay <= -3){
    //🔁🔁🔁
    for (let i=0;i<6;i++){
      if (listpersos[i].de>0 && listpersos[i].de<7) {
      listpersos[i].de = Math.trunc(Math.random() * 5 + 1);
      }
    }
  }
  
  specialseffectsafter(player, id);

  checkhps();
  afficherallcarte();
  afficherallperso(ordrepersos);
}
function specialseffectsbeforebeforebefore(player, id) {
  if (listcards[id].nom == "Chaos") {
    //"$ha", "Trigger a random other ability (non Chaos)"
    let rand;
    let newid = id;
    while (listcards[newid].nom == "Chaos") {
      rand = Math.trunc(Math.random() * 6);
      newid = listabilities[rand].id;
    }
    console.log("Effect chosen randomly:" + [rand+1] + "| id:" + newid);
    document.getElementById("messagecentral").textContent =
      "Effect " + [rand+1] + " done.";
    skipnextmessage = 1;
    //$ha
    for (let k = 0; k < 5; k++) {
      heal(listpersos[k], 1);
    }
    heal(player, -1); //heal all other ally

    return newid;
  }
  return id;
}
function specialseffectsbeforebefore(player, id) {
  if (listcards[id].nom == "Copycat") {
    //Apply the 1️⃣ effect
    if (listabilities[0].nom != "Copycat") {
      return listabilities[0].id;
    } else {
      console.log("Copycat ability used in 1");
      skipnextmessage = 1;
      document.getElementById("messagecentral").textContent =
        "Effect skipped: copycat ability used in 1";
      return "0";
    }
  }
  return id;
}
function specialseffectsbefore(player, id) {
  if (listcards[id].nom == "Perfect spot") {
    //"$m$r", "$h", "💖🏹 if 🚶‍♂️3", "$p3" //+8.4
    if (ordrepersos.indexOf(player.id) == 2) {
      heal(player, 1);
      cantrip = 1;
      diceavailable[player.id] = "n";
    }
  }
  if (listcards[id].nom == "Balanced attack") {
    //"⚔️⚔️⚔️ if 🚶‍♂️1 or 🚶‍♂️2", "$zr$zr$zr if 🚶‍♂️4 or 🚶‍♂️5" //+7.2
    if (ordrepersos.indexOf(player.id) == 0 || ordrepersos.indexOf(player.id) == 1) {
      atkmel(player, 3);
    }
    if (ordrepersos.indexOf(player.id) == 3 || ordrepersos.indexOf(player.id) == 4) {
      atkran(player, 3);
    }
  }
  if (listcards[id].nom == "Fortress in the wood") {
    //"$m", "⚔️$zr$zr if 🚶‍♂️2 or 🚶‍♂️3 or 🚶‍♂️4" //+8.4
    if (
      ordrepersos.indexOf(player.id) == 1 ||
      ordrepersos.indexOf(player.id) == 2 ||
      ordrepersos.indexOf(player.id) == 3
    ) {
      atkmel(player, 1);
      atkran(player, 2);
    }
  }
  if (listcards[id].nom == "Healing dash"){
    //"p1", "💖💖 for each space moved", "$c"
    heal (player,  ordrepersos.indexOf(player.id) *2);
  }
  if (listcards[id].nom == "Snipe dash"){
    //"$p4", "$zr$zr for each space moved"
    if(ordrepersos.indexOf(player.id) == 4){
      atkran(player,1);
    } else {
      atkran (player,  6 - ordrepersos.indexOf(player.id) * 2);
    }
  }
  if (listcards[id].nom == "Medical dash"){
    //"$p5", "💖💕 for each space moved"
    for (let k = 0; k < 5; k++) {
      heal(listpersos[k], 4- ordrepersos.indexOf(player.id));
    }
  }
  if (listcards[id].nom == "Battle heart"){
    //"This turn, your 💖 deal one damage as extra effect", "$c"
    for (let k = 0; k < 5; k++) {
      battleheart = 1;
    }
  }
  if (listcards[id].nom == "Enhance") {
    //"Add 💖 to all others cards", "$cc", "$b"
    for (let i=0;i<6;i++){
      if(listabilities[i].effecthp == undefined) {
        listabilities[i].effecthp = "$h";
      } else {
        listabilities[i].effecthp += "$h";
      }
      listabilities[player.de-1].effecthp = "";
    }
  }
  if (listcards[id].nom == "Red synergy") {
    //"Other red cards gain 💖"
    for (let i=0;i<6;i++){
      if (listabilities[i].color == 2)
        if (listabilities[i].effectmove == undefined) {
          listabilities[i].effectmove = "$h";
        } else {
          listabilities[i].effectmove += "$h";
        }
      listabilities[player.de-1].effectmove = "";
    }
  }
  return id;
}
function specialseffectsafter(player, id) {
  if (listcards[id].nom == "Crowd") {
    //"Change randomly the place of all characters", "$cc"
    let nbrs = [0, 1, 2, 3, 4];
    nbrs.splice(ordrepersos.indexOf(player.id), 1);
    let alea = Math.trunc(Math.random() * 3 + 1);
    swap(nbrs[0], nbrs[alea]);
    nbrs.splice(alea, 1);
    nbrs.splice(0, 1);
    swap(nbrs[0], nbrs[1]);
    afficherallperso(ordrepersos);
  }
  if (listcards[id].nom == "Switch") {
    //"Swap your $m & $r", "$c"
    let i = listpersos[player.id].atkmel;
    listpersos[player.id].atkmel = listpersos[player.id].atkran;
    listpersos[player.id].atkran = i;
    afficherperso(
      document.getElementById("persoetde" + player.id),
      ordrepersos[player.id]
    );
  }
  if (listcards[id].nom == "Reroll") {
    //"$h", "Reroll all unused dices", "$c"
    for (let i = 0; i < 5; i++) {
      if (listpersos[i].de < 7 && listpersos[i].de > 0) {
        listpersos[i].de = Math.trunc(Math.random() * 6 + 1);
      }
    }
    listpersos[player.id].de = 7;
    afficherallperso(ordrepersos);
  }
  if (listcards[id].nom == "Return") {
    //"Return all unused dice", "$c"
    for (let i = 0; i < 5; i++) {
      if (listpersos[i].de < 7 && listpersos[i].de > 0) {
        listpersos[i].de = 7 - listpersos[i].de;
      }
    }
    listpersos[player.id].de = 7;
    afficherallperso(ordrepersos);
  }
  if (listcards[id].nom == "Feed from allies") {
    //"$h$h$h$h$h", "All other allies take one damage", "$cc"
    heal(player, 1);
    heal(listpersos[0], -1);
    heal(listpersos[1], -1);
    heal(listpersos[2], -1);
    heal(listpersos[3], -1);
    heal(listpersos[4], -1);
  }
  if (listcards[id].nom == "Bunker" || listcards[id].nom == "Distribution") {
    //"💥 cards gain one 💥", "$bbbbb"
    let cardplayed = listcards[id];
    for (let i=0;i<6;i++){
      if (nbrbombs[i]>0 && listabilities[i].nom != "Bunker" && listabilities[i].nom != "Distribution"){
        nbrbombs[i]++;
        console.log("bomb added");
      }
    }
    afficherallcarte();
  }
  if (listcards[id].nom == "Accelerate time" || listcards[id].nom == "Skip time") {
    //at:"⌛ cards lose one coldown", "$c"
    //st:"⌛ cards lose all coldowns"
    for (let i=0;i<6;i++){
      if (turndelay[i]>0){
        if (listcards[id].nom == "Accelerate time") {
          //accelerate time
          turndelay[i]--;
        } else {
          //skip time
          turndelay[i]=0;
        }
        if(turndelay[i]==0){
          listpersos[i].de = Math.trunc(Math.random() * 6 + 1);
        }
      }
    }
  }
  if (listcards[id].nom == "Quick things") {
  //"$s", "Others 🔁 dices are rerolled", "$c"
  afficherallperso(ordrepersos);
    for (let i=0;i<6;i++){
      if (listpersos[i].de == 7 && turndelay[i]==0){ //not ⌛
        listpersos[i].de = Math.trunc(Math.random() * 6 + 1);
        diceavailable[i] = "y";
        afficherallperso(ordrepersos);
      }
    }
    diceavailable[player.id] = "x";
    player.de = 7;
  }
  if (listcards[id].nom == "Song of robustness") {
    //"Loses permanently 6💖 then double it", "$b"
    if (player.maxhp > 12){
      let i= (player.maxhp -6);
      heal(player, Math.floor(i * 2 - player.maxhp));
      player.maxhp = Math.floor(i*2);
    }
  }
  if (listcards[id].nom == "Fight of elements") {
    //"Loses permanently 2⚔️ and 3🏹 then double them", "$b"
    player.atkmel = (player.atkmel - 2) * 2;
    player.atkran = (player.atkran - 3) * 2;
  }
  if (listcards[id].nom == "Resurrection") {
    //"If you have 0⚔️ and 0🏹, gain permanently 4⚔️ and 6🏹", "$b"
    if (player.atkmel==0 && player.atkran==0){
      console.log("Effect activated");
      player.atkmel = 4;
      player.atkran = 6;
    }
  }
  if (listcards[id].nom == "Feed"){
    if (listpersos[ennemy].currenthp <1){
      console.log("Feed activated");
      player.maxhp += 2;
      heal(player, 2);
    }
  }
  if (listcards[id].nom == "Narrow path"){
    //"Permanently reduce 🤲 of enemy to 2", "$c"
    if (listpersos[ennemy].atkran>2){
      listpersos[ennemy].atkran = 2;
    }
  }
  if (listcards[id].nom == "Launch a panel"){
    //"Permanently reduce 🤲 of enemy by 1 (down to 1)", "$c", "$bb"
    if (listpersos[ennemy].atkran>1){
      listpersos[ennemy].atkran--;
    }
  }
  if (listcards[id].nom == "Disarm"){
    //"Permanently reduce ⚔️ of enemy by 1 (down to 5)", "$c"
    if (listpersos[ennemy].atkmel>5){
      listpersos[ennemy].atkmel--;
    }
  }
  if (listcards[id].nom == "Lasso"){
    //"Permanently reduce ⚔️ of enemy by 3 (down to 5)", "$b"
    if (listpersos[ennemy].atkmel>5){
      if (listpersos[ennemy].atkmel>7){
        listpersos[ennemy].atkmel += -3;
      } else {
        listpersos[ennemy].atkmel = 5;
      }
    }
  }
  if (listcards[id].nom == "Broken heart"){
    //"Half the hp of yourself and the enemy (rounded up)"
    listpersos[ennemy].currenthp = Math.floor(listpersos[ennemy].currenthp/2);
    player.currenthp = Math.floor(player.currenthp /2);
  }
  if (listcards[id].nom == "Purple heart"){
    //"Double the 💖 of all other ally", "$s$s"
    player.currenthp = player.currenthp /2;
    for (let i=0 ; i<5;i++){
      listpersos[i].currenthp = Math.floor(listpersos[i].currenthp *2);
    }
  }
  if (listcards[id].nom == "One thousand clock"){
    //"Deal 3^x damage to the enemy where x is the number of dices with ⌛", "$c"
    let j=0;
    for (let i=0 ; i<6;i++){
      if (turndelay[i]>0){
        j++;
      }
    }
    attack(player, Math.pow(3,j));
  }
  if (listcards[id].nom == "Power of four"){
    //"Add ⌛⚔️ to the 4️⃣ card", "$c"
    if (listabilities[3].effectmove == undefined) {
      listabilities[3].effectmove = "$t$m";
    } else {
      listabilities[3].effectmove += "$t$m";
    }
  }
  if (listcards[id].nom == "Synchronize"){
    //"Add 🔁⌛⌛⌛ to the 2️⃣ card", "$c", "$b"
    if (listabilities[1].effectmove == undefined) {
      listabilities[1].effectmove = "$c$t$t$t";
    } else {
      listabilities[1].effectmove += "$c$t$t$t";
    }
  }
}
function heal(player, nbr) {
  player.currenthp += nbr;
}
function attack(nbr) {
  listpersos[ennemy].currenthp += -1 * nbr;
}
function atkmel(player, nbr) {
  listpersos[ennemy].currenthp += -1 * nbr * player.atkmel;
}
function atkran(player, nbr) {
  listpersos[ennemy].currenthp += -1 * nbr * player.atkran;
}
function move(player, string) {
  let endroit = ordrepersos.indexOf(player.id);
  if (string == ">") {
    if (endroit == 0) {
      return;
    }
    swap(endroit, endroit - 1);
  } else {
    if (string == "<") {
      if (endroit == 4) {
        return;
      }
      swap(endroit, endroit + 1);
    } else {
      while (endroit != string - 1) {
        if (endroit > string - 1) {
          swap(endroit, endroit - 1);
          endroit--;
        } else {
          swap(endroit, endroit + 1);
          endroit++;
        }
      }
    }
  }
}
function swap(nbr1, nbr2) {
  let i;
  i = ordrepersos[nbr1];
  ordrepersos[nbr1] = ordrepersos[nbr2];
  ordrepersos[nbr2] = i;
}
function gameover() {
  for (let i = 0; i < 5; i++) {
    listpersos[i].currenthp = 0;
  }
  afficherallperso(ordrepersos);
  document.getElementById("messagecentral").textContent =
    "Game over: everyone dies :(";
    if (advancedmode==0){
      document.getElementById("messagecentral").append(" Did you know there was an advanced mode in the options?");
    }
  setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      document.getElementById("persoetde" + i).removeEventListener("click", clickde);
    }
    document.getElementById("skip").removeEventListener("click", skipturn);
  }, 100);
  document.getElementById("playagain").style.visibility = "visible";
  document.getElementById("playagain").addEventListener("click", reload);
}
function youwin() {
  console.log("youwin()");
  afficherallperso(ordrepersos);
  document.getElementById("messagecentral").textContent =
    "Congratulation you won :)";
  setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      document.getElementById("persoetde" + i).removeEventListener("click", clickde);
    }
    document.getElementById("skip").removeEventListener("click", skipturn);
  }, 100);
  document.getElementById("playagain").style.visibility = "visible";
  document.getElementById("playagain").addEventListener("click", reload);
}
function reload() {
  location.reload();
}

/* Replace a card in your deck: */
let cardchosen = 0;
function choosenewcard() {
  document.getElementById("messagecentral").textContent =
    "Choose a card to add to your deck";

  if (cardporposed == "set") {
    //generate 5 randoms cards: 1 in each set
    let lister;
    let rand;
    for (let j = 0; j < 5; j++) {
      if (j == 0) {
        lister = listcards.filter((x) => ordercolor[x.color] == "darkgreen");
      }
      if (j == 1) {
        lister = listcards.filter((x) => ordercolor[x.color] == "purple");
      }
      if (j == 2) {
        lister = listcards.filter((x) => ordercolor[x.color] == "darkred");
      }
      if (j == 3) {
        lister = listcards.filter((x) => ordercolor[x.color] == "darkslategray");
      }
      if (j == 4) {
        lister = listcards.filter((x) => ordercolor[x.color] == "indigo");
      }
      let l = -1;
      let length = lister.length;
      for (let k = 0; k < length; k++) {
        l++;
        if (set[lister[l].color] == "n") {
          lister.splice(l, 1);
          l--;
        }
      }
      if (lister.length == 0) {
        console.log("error: too much options removed");
        listabilities[j + 7] = lister[7];
      } else {
        rand = Math.floor(Math.random() * lister.length);
        listabilities[j + 7] = lister[rand];
      }
    }
  } else {
    //generate 5 randoms cards: randomly
    let numberalreadyrolled = [];
    while (numberalreadyrolled.length < 5) {
      let i = 7 + Math.trunc(Math.random() * (listcards.length - 7));
      if (
        set[listcards[i].color] == "y" &&
        numberalreadyrolled.indexOf(i) === -1
      ) {
        numberalreadyrolled.push(i);
      }
    }
    listabilities[7] = listcards[numberalreadyrolled[0]];
    listabilities[8] = listcards[numberalreadyrolled[1]];
    listabilities[9] = listcards[numberalreadyrolled[2]];
    listabilities[10] = listcards[numberalreadyrolled[3]];
    listabilities[11] = listcards[numberalreadyrolled[4]];
  }

  let element = document.getElementById("skipcard");
  setTimeout(() => {
  if (skips ==0){
    element.textContent = "Skip card (+1 reroll)";
    element.style.backgroundColor = "darkred";
    element.style.fontSize = "20px";
    element.style.width = "170px";
    element.style.height = "25px";
    element.style.left = "46%";
  } else {
    element.textContent = "Reroll (" + skips + " left)";
    element.style.backgroundColor = "darkgreen";
    element.style.fontSize = "40px";
    element.style.width = "240px";
    element.style.height = "50px";
    element.style.left = "42%";
  }
}, 100)

  document.getElementById("extratext").style.visibility = "visible";
  document.getElementById("grayscreen").style.visibility = "visible";
  document.getElementById("grayscreen").style.zIndex = "50";
  for (let i = 1; i < choicesonkill + 1; i++) {
    let element = document.getElementsByClassName("carteextra")[i - 1];
    document.getElementsByClassName("carteextra")[i - 1].style.visibility =
      "visible";
    element.style.backgroundColor = "darkslateblue";
    if (i == 1) {
      element.addEventListener("click", newcard1);
    }
    if (i == 2) {
      element.addEventListener("click", newcard2);
    }
    if (i == 3) {
      element.addEventListener("click", newcard3);
    }
    if (i == 4) {
      element.addEventListener("click", newcard4);
    }
    if (i == 5) {
      element.addEventListener("click", newcard5);
    }
  }

  //skip
  document.getElementById("skipcard").style.visibility = "visible";
  document.getElementById("skipcard").addEventListener("click", skipcard);
  document.getElementById("holdtosee").style.visibility = "visible";
  document.getElementById("holdtosee").addEventListener("mouseover" , holdtosee);
  document.getElementById("holdtosee").addEventListener("mouseout" , holdtoseeout);

  affichercarte(7);
  affichercarte(8);
  affichercarte(9);
  if (choicesonkill > 3) {
    affichercarte(10);
    if (choicesonkill > 4) {
      affichercarte(11);
    }
  }
}
function skipcard() {
  if (skips ==0){
    extrahidden();
    cardchosen = 1;
    changecarddeck(6); //change into trash card
    skips++;
  } else {
    skips--;
    choosenewcard();
  }
}
function holdtosee(){
  document.getElementById("grayscreen").style.visibility = "hidden";
  document.getElementById("skipcard").style.visibility = "hidden";
  document.getElementById("extratext").style.visibility = "hidden";
  for (let i=7;i<12;i++){
    document.getElementById("carteextra" + i).style.visibility = "hidden";
  }
  document.getElementById("holdtosee").style.backgroundColor = "transparent";
  //document.getElementById("holdtosee").style.border = "none";
  document.getElementById("holdtosee").innerHTML = "";
}
function holdtoseeout(){
  document.getElementById("grayscreen").style.visibility = "visible";
  document.getElementById("skipcard").style.visibility = "visible";
  document.getElementById("extratext").style.visibility = "visible";
  for (let i=7;i<12;i++){
    if (choicesonkill+7>i){
      document.getElementById("carteextra" + i).style.visibility = "visible";
    }
  }
  document.getElementById("holdtosee").style.backgroundColor = "darkolivegreen";
  //document.getElementById("holdtosee").style.border = "???";
  document.getElementById("holdtosee").innerHTML = "👀";
}
function newcard1() {
  extrahidden();
  messageapreschoix();
  cardchosen = 1;
}
function newcard2() {
  extrahidden();
  messageapreschoix();
  cardchosen = 2;
}
function newcard3() {
  extrahidden();
  messageapreschoix();
  cardchosen = 3;
}
function newcard4() {
  extrahidden();
  messageapreschoix();
  cardchosen = 4;
}
function newcard5() {
  extrahidden();
  messageapreschoix();
  cardchosen = 5;
}
function extrahidden() {
  document.getElementsByClassName("carteextra")[0].style.visibility = "hidden";
  document.getElementsByClassName("carteextra")[1].style.visibility = "hidden";
  document.getElementsByClassName("carteextra")[2].style.visibility = "hidden";
  document.getElementsByClassName("carteextra")[3].style.visibility = "hidden";
  document.getElementsByClassName("carteextra")[4].style.visibility = "hidden";
  //
  document.getElementById("skipcard").style.visibility = "hidden";
  document.getElementById("holdtosee").style.visibility = "hidden";
  document.getElementById("extratext").style.visibility = "hidden";
  document.getElementById("grayscreen").style.zIndex = "20";
}
function messageapreschoix() {
  document.getElementById("messagecentral").textContent =
    "Now choose a card in your deck (bottom) to replace it";
  document.getElementById("messagecentral").style.zIndex = "40";
}

document.getElementsByClassName("carte")[0].addEventListener("click", deck1);
document.getElementsByClassName("carte")[1].addEventListener("click", deck2);
document.getElementsByClassName("carte")[2].addEventListener("click", deck3);
document.getElementsByClassName("carte")[3].addEventListener("click", deck4);
document.getElementsByClassName("carte")[4].addEventListener("click", deck5);
document.getElementsByClassName("carte")[5].addEventListener("click", deck6);
function deck1() {
  if (cardchosen == 0) {
    return;
  }
  changecarddeck(0);
}
function deck2() {
  if (cardchosen == 0) {
    return;
  }
  changecarddeck(1);
}
function deck3() {
  if (cardchosen == 0) {
    return;
  }
  changecarddeck(2);
}
function deck4() {
  if (cardchosen == 0) {
    return;
  }
  changecarddeck(3);
}
function deck5() {
  if (cardchosen == 0) {
    return;
  }
  changecarddeck(4);
}
function deck6() {
  if (cardchosen == 0) {
    return;
  }
  changecarddeck(5);
}
function changecarddeck(nbr) {
  listabilities[nbr] = listabilities[6 + cardchosen];

  //bombs
  let carte = listabilities[nbr];
  let split = "";
  try {
    split = carte.effectbomb.split("$b");
  } catch {}
  if (split.length>1){
    //there is some bombs
    nbrbombs[nbr] = split[1].length+1;
  } else {
    nbrbombs[nbr] = 0;
  }

  afficherallperso(ordrepersos);
  afficherallcarte();
  cardchosen = 0;
  document.getElementById("grayscreen").style.visibility = "hidden";
  document.getElementById("messagecentral").textContent = "Next fight";
}

/* Skip turn */
document.getElementById("skip").addEventListener("click", skipturn);
function skipturn() {
  turndelaydecrease();
  findutour();
}

/* Parameters */
document.getElementById("parameters").addEventListener("click", openparameters);
function openparameters() {
  document.getElementById("grayscreen").style.visibility = "visible";
  document.getElementById("grayscreen").style.zIndex = "100";

  document.getElementById("closeparametersandcookies").addEventListener("click", closeparametersandcookies);
  document.getElementById("closeparametersandcookies").style.visibility = "visible";
  document.getElementById("closeparameters").addEventListener("click", closeparameters);
  document.getElementById("closeparameters").style.visibility = "visible";
  document.getElementById("closeparameterscancel").addEventListener("click", closeparameterscancel);
  document.getElementById("closeparameterscancel").style.visibility = "visible";

  

  let selector = document.getElementsByClassName("choiceparameter");
  for(let i=0;i<5;i++){
    selector[i].style.visibility = "visible";
  }
  selector[0].style.top = "25px";
  selector[1].style.top = "50px";
  selector[1].style.height = "40px";
  selector[2].style.top = "90px";
  selector[3].style.top = "115px";
  selector[4].style.top = "140px";
  for (let i = 5; i < selector.length; i++) {
    selector[i].style.visibility = "visible";
      selector[i].style.top = 90 + i * 25 + "px";
      try {
        document.getElementById("disableset" + [i - 5]).style.backgroundColor =
          ordercolor[i - 5];
      } catch {}
    }

  selector[0].addEventListener("click", setting0);
  selector[1].addEventListener("click", setting1);
  selector[2].addEventListener("click", setting2);
  selector[3].addEventListener("click", setting3);
  selector[4].addEventListener("click", setting4);
  selector[5].addEventListener("click", setting5);
  selector[6].addEventListener("click", setting6);
  selector[7].addEventListener("click", setting7);
  selector[8].addEventListener("click", setting8);
  selector[9].addEventListener("click", setting9);
  selector[10].addEventListener("click", setting10);
  selector[11].addEventListener("click", setting11);
}
function closeparameters() {
  let selector = document.getElementsByClassName("choiceparameter");
  for (let i = 0; i < selector.length; i++) {
    selector[i].style.visibility = "hidden";
  }
  document.getElementById("grayscreen").style.visibility = "hidden";
  document.getElementById("closeparameters").style.visibility = "hidden";
  document.getElementById("closeparametersandcookies").style.visibility = "hidden";
  document.getElementById("closeparameterscancel").style.visibility = "hidden";
}
function closeparametersandcookies() {
  console.log("cookies saved (normally)");
  //cookies:
  createcookie("disablecolors", disablecolors);
  createcookie("advancedmode", advancedmode);
  createcookie("choicesonkill", choicesonkill);
  createcookie("cardporposed", cardporposed);
  createcookie("randostartcard", randostartcard);
  createcookie("set", set.join("|"));
  closeparameters();
}
function closeparameterscancel() {
  setting11();
  closeparameters();
}

let disablecolors = 0;
function setting0() {
  let element = document.getElementById("disablecolors");
  if (disablecolors == 0) {
    element.innerHTML = "Colors: less";
    disablecolors = 1;
  } else {
    element.innerHTML = "Colors: all";
    disablecolors = 0;
  }
  afficherallcarte();
}

/* Advanced mode: */
let advancedmode = 0;
function setting1() {
  let element = document.getElementById("content");
  if (advancedmode == 0) {
    element.innerHTML = "Content: advanced (each slot got extra effects)(for more thinking)(less balanced)";
    advancedmode = 1;
    document.getElementById("carte0").children[8].textContent = "a:🚶‍♂️1"; //+1
    document.getElementById("carte1").children[8].textContent = "a:💖💖"; //+2
    document.getElementById("carte2").children[8].textContent = "a:💕⌛"; //+2
    document.getElementById("carte3").children[8].textContent = "a:⚔️"; //+3
    document.getElementById("carte4").children[8].textContent = "a:🏹"; //+3
    document.getElementById("carte5").children[8].textContent = "a:🔁"; //+6 
    element.style.backgroundColor = "darkred";
    document.getElementById("imgpoing").textContent = "✊";
    /*for (i=5;i<16;i++){
      listpersos[i].atkmel+=3;
    }
    if (listpersos[5].nom !="Ratatouille"){
      listpersos[5].atkmel+=-3; //resolve bug brutally: the current ennemy is twice in data
    }*/
    generatepersosadvanced();
    document.getElementById("atkmel5").style.backgroundColor="darkred";
    document.getElementById("atkmel5").style.borderRadius="50px";
    document.getElementById("rerolladvanced").textContent = "(🔁🔁🔁: and reroll all non used numbers)";
    document.getElementById("rerolladvanced").style.textDecoration = "underline";
    document.getElementById("rerolladvanced2").textContent = " (🔁⌛: cancel each other)";
    document.getElementById("rerolladvanced2").style.textDecoration = "underline";
    document.getElementById("rerolladvanced3").textContent = "In advanced mode, all cards got an extra effect which depend of the number rolled and not the card on the number rolled.";
    document.getElementById("rerolladvanced3").style.textDecoration = "underline";
    document.getElementById("rerolladvanced4").textContent = " (advanced effects are applied last)";
    document.getElementById("rerolladvanced4").style.textDecoration = "underline";
    document.getElementById("rerolladvanced5").style.visibility = "visible";
    document.getElementById("rerolladvanced5").style.textDecoration = "underline";
  } else {
    element.innerHTML = "Content: base game (extremely encouraged for first game or casual play)";
    advancedmode = 0;
    element.style.backgroundColor = "darkgreen";
    document.getElementById("carte0").children[8].textContent = ""; //+4
    document.getElementById("carte1").children[8].textContent = ""; //+2
    document.getElementById("carte2").children[8].textContent = ""; //+2
    document.getElementById("carte3").children[8].textContent = ""; //+3
    document.getElementById("carte4").children[8].textContent = ""; //+3
    document.getElementById("carte5").children[8].textContent = ""; //+1  
    document.getElementById("imgpoing").textContent = "👊";
    /*for (i=5;i<16;i++){
      listpersos[i].atkmel+=-3;
    }
    if (listpersos[5].nom !="Ratatouille"){
      listpersos[5].atkmel+=+3; //resolve bug brutally: the current ennemy is twice in data
    }*/
    generatepersoseasy();
    document.getElementById("atkmel5").style.backgroundColor="transparent";
  }
  afficherperso(document.getElementById("persoetde5"), 5);
}

let choicesonkill = 5;
function setting2() {
  let element = document.getElementById("cardproposedonkill");
  choicesonkill++;
  if (choicesonkill == 6) {
    choicesonkill = 3;
  }
  element.innerHTML = "Choices on kill: " + choicesonkill;
}

let randostartcard = 2;
function setting3() {
  let element = document.getElementById("randostartcard");
  randostartcard++;
  if (randostartcard == 7) {
    randostartcard = 0;
  }
  element.innerHTML = "Starting random cards: " + randostartcard;
}

let cardporposed = "set";
function setting4() {
  let element = document.getElementById("sets");
  if (cardporposed == "set") {
    element.innerHTML = "Cards proposed: full random";
    cardporposed = "random";
  } else {
    element.innerHTML =
      "Cards proposed: by set (choose random if you change 'Choices on kill' OR disable all of one color)";
    cardporposed = "set";
  }
}

let set = ["y", "y", "y", "y", "y", "y", "y", "y", "y", "y", "y"];
function setting5() {
  let element = document.getElementById("disableset0");
  if (set[0] == "y") {
    element.innerHTML = "Set 0: Basics: disabled";
    set[0] = "n";
  } else {
    element.innerHTML = "Set 0: Basics: enabled";
    set[0] = "y";
  }
}
function setting6() {
  let element = document.getElementById("disableset1");
  if (set[1] == "y") {
    element.innerHTML = "Set 1: Delay: disabled";
    set[1] = "n";
  } else {
    element.innerHTML = "Set 1: Delay: enabled";
    set[1] = "y";
  }
}
function setting7() {
  let element = document.getElementById("disableset2");
  if (set[2] == "y") {
    element.innerHTML = "Set 2: Heal: disabled";
    set[2] = "n";
  } else {
    element.innerHTML = "Set 2: Heal: enabled";
    set[2] = "y";
  }
}
function setting8() {
  let element = document.getElementById("disableset3");
  if (set[3] == "y") {
    element.innerHTML = "Set 3: Bombs: disabled";
    set[3] = "n";
  } else {
    element.innerHTML = "Set 3: Bombs: enabled";
    set[3] = "y";
  }
}
function setting9() {
  let element = document.getElementById("disableset4");
  if (set[4] == "y") {
    element.innerHTML = "Set 4: Extras: disabled";
    set[4] = "n";
  } else {
    element.innerHTML = "Set 4: Extras: enabled";
    set[4] = "y";
  }
}
function setting10() {
  let element = document.getElementById("disablesetall");
  if(element.textContent == "Enable all"){
    set = ["y", "y", "y", "y", "y", "y", "y", "y", "y", "y", "y"];
    document.getElementById("disableset0").innerHTML = "Set 0: Basics: enabled";
    document.getElementById("disableset1").innerHTML =
      "Set 1: Delay: enabled";
    document.getElementById("disableset2").innerHTML = "Set 2: Heal: enabled";
    document.getElementById("disableset3").innerHTML =
      "Set 3: Bombs: enabled";
    document.getElementById("disableset4").innerHTML = "Set 4: Extras: enabled";
    element.innerHTML = "Disable all";
  }else{
    set = ["n", "n", "n", "n", "n", "n", "n", "n", "n", "n", "n"];
    document.getElementById("disableset0").innerHTML = "Set 0: Basics: disabled";
    document.getElementById("disableset1").innerHTML =
    "Set 1: Delay: disabled";
    document.getElementById("disableset2").innerHTML = "Set 2: Heal: disabled";
    document.getElementById("disableset3").innerHTML =
    "Set 3: Bombs: disabled";
    document.getElementById("disableset4").innerHTML = "Set 4: Extras: disabled";
    element.innerHTML = "Enable all";
  }
}
function setting11(){
  disablecolors = 0;
  document.getElementById("disablecolors").innerHTML = "Colors: all";
  advancedmode = 0;
  document.getElementById("content").innerHTML = "Content: base game (extremely encouraged for first game or casual play)";
  document.getElementById("content").style.backgroundColor = "darkgreen";
  choicesonkill = 5;
  document.getElementById("cardproposedonkill").innerHTML = "Choices on kill: " + choicesonkill;
  randostartcard = 2;
  document.getElementById("randostartcard").innerHTML = "Starting random cards: " + randostartcard;

  document.getElementById("sets").innerHTML =
      "Cards proposed: by set (choose random if you change 'Choices on kill' OR disable all of one color)";
  cardporposed = "set";


  set = ["y", "y", "y", "y", "y", "y", "y", "y", "y", "y", "y"];
  document.getElementById("disableset0").innerHTML = "Set 0: Basics: enabled";
  document.getElementById("disableset1").innerHTML =
    "Set 1: Delay: enabled";
  document.getElementById("disableset2").innerHTML = "Set 2: Heal: enabled";
  document.getElementById("disableset3").innerHTML =
    "Set 3: Bombs: enabled";
  document.getElementById("disableset4").innerHTML = "Set 4: Extras: enabled";
  document.getElementById("disablesetall").innerHTML = "Disable all";
  afficherallcarte();
}

/* Cookies (first time): */
function cookieonstart() {
  let x = document.cookie;
  let listcookies = x.split(";");
  if (listcookies.length != 1){

  console.log("List cookies: "  + listcookies);
  
  if(listcookies[0].replace("disablecolors=","")==1){
    setting0();
  };

  if(listcookies[1].replace("advancedmode=","")==1){
    setting1();
  }

  if(listcookies[2].replace("choicesonkill=","")!=5){
    setting2();
  if(listcookies[2].replace("choicesonkill=","")==4){
    setting2();
  }
  };

  let nbr = listcookies[4].replace("randostartcard=","");
  if(nbr!=2){ // space annoying
    if (nbr==4){
      setting3();
    }
    if (nbr==5){
      setting3();
      setting3();
    }
    if (nbr==6){
      setting3();
      setting3();
    }
    if (nbr==0){
      setting3();
      setting3();
      setting3();
    }
    if (nbr==1){
      setting3();
      setting3();
      setting3();
      setting3();
    }
    setting3();
  };

  if(listcookies[3].replace("cardporposed=","")==" random"){ // space annoying
    setting4();
  };

  listset = listcookies[5].replace("set=","").split("|");
  for (let i=0;i<listset.length;i++){
    if (listset[i] == "n" || listset[i] == " n"){ // space annoying
      if(i==0){setting5();}
      if(i==1){setting6();}
      if(i==2){setting7();}
      if(i==3){setting8();}
      if(i==4){setting9();}
    }
  }
    
}
}

function createcookie(name, value) {
  let timecookie = 345600; //4j
  document.cookie =
    name + "=" + value + "; max-age=" + timecookie + "; Samesite=None; Secure";
}
function deletecookie(name, value) {
  document.cookie =
    name +
    "=; Max-Age=0; Path=http://127.0.0.1:5500/JEU_persosd%C3%A9s/index.html/;";
}

//Copied without understanding from internet
function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

document.getElementById("containerrules").addEventListener("click", displayrules);
function displayrules(){
  document.getElementById("rules").style.visibility = "visible";
  document.getElementById("displayrules").style.visibility = "hidden";
  document.getElementById("grayscreen").style.visibility = "hidden";
}