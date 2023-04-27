/*Known bugs:
 - Attack too low: action cancelled when having the atk
 - attack too low make the dice became 🔀
  - rare bug on choice of cards

  
function changecarddeck(nbr)
*/

let listpersos = [];
let listabilities = [12]; //7ème card is empty, 8/9/10/11/12ème are for choices
let listcards = [];
let ordrepersos = [0, 1, 2, 3, 4, 5];
let diceavailable = ["y", "y", "y", "y", "y"];
let turndelay = [0, 0, 0, 0, 0, 0];
let nbrbombs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let nbrbonusheal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let nbrbonusmelee = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let nbrbonusrange = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let ennemy = 5;
let skipnextmessage = 0;
let ordercolor = [
  "darkgreen",
  "darkgreen",
  "purple",
  "purple",
  "darkred",
  "darkslategray",
  "darkgreen",
  "indigo",
  "darkslategray",
  "darkslategray",
  "indigo",
  /*Extras*/
  "darkslateblue",
  "black",
];
let skips = 1;

window.addEventListener("load", onload);
function onload() {
  cookieonstart();
  generatepersos();
  generatecards();
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
var des = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "🔁"]; //1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣🔀🔢🔁
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
        children[1].textContent = des[listpersos[id].de - 1];
      }
    }

    children[3].textContent = "⚔️"
      .concat(listpersos[id].atkmel)
      .concat(" - ")
      .concat("🏹".concat(listpersos[id].atkran));
  } else {
    //ennemi
    children[1].textContent = listpersos[id].avatar;
    children[3].textContent = "⚔️".concat(listpersos[id].atkmel);
  }
}
function afficherallperso(array) {
  afficherperso(document.getElementById("persoetde0"), array[0]);
  afficherperso(document.getElementById("persoetde1"), array[1]);
  afficherperso(document.getElementById("persoetde2"), array[2]);
  afficherperso(document.getElementById("persoetde3"), array[3]);
  afficherperso(document.getElementById("persoetde4"), array[4]);
  afficherperso(document.getElementById("persoetde5"), array[5]);
}
function generatepersos() {
  //ally
  listpersos[0] = new Personnage("👻", "Albert", 0, 14, 2, 1);
  listpersos[1] = new Personnage("🤡", "Bernard", 0, 10, 4, 1);
  listpersos[2] = new Personnage("🤖", "Catherine", 0, 10, 3, 2);
  listpersos[3] = new Personnage("👽", "Derick", 0, 6, 4, 4);
  listpersos[4] = new Personnage("🎅", "Elise", 0, 6, 1, 6);
  //ennemy
  listpersos[5] = new Personnage("🐀", "Ratatouille", 0, 8, 3);
  listpersos[6] = new Personnage("🐤", "Piou", 0, 12, 4);
  listpersos[7] = new Personnage("🐧", "Siffli", 0, 16, 5);
  listpersos[8] = new Personnage("🐈", "Garfield", 0, 20, 6);
  listpersos[9] = new Personnage("🐒", "Abu", 0, 24, 7);
  listpersos[10] = new Personnage("🐺", "Fenrir", 0, 28, 8);
  listpersos[11] = new Personnage("🐄", "Abigaëlle", 0, 32, 9);
  listpersos[12] = new Personnage("🐎", "Pégase", 0, 36, 10);
  listpersos[13] = new Personnage("🐻", "Teddy", 0, 40, 11);
  listpersos[14] = new Personnage("🐘", "Dumbo", 0, 44, 12);
  listpersos[15] = new Personnage("👨", "The developper", 0, 48, 13);
}

/* Cartes */
let carte = {
  avatar: "none",
  color: "darkslateblue",
  nom: "none",
  id: 0,
  effect1: "",
  effect2: "",
  effect3: "",
  effect4: "",
  effect5: "",
};
function Carte(a, b, c, d, e, f, g, h) {
  this.avatar = a;
  //              0easy         1$c        2delay 3delayweird   4medic        5move    6$cc      7bomb     8permanentup 9positionalup 10unique
  //let color = ["darkgreen", "darkblue", "darkcyan", "darkred", "darkorange", "cyan", "brown", "black", "indigo", "mediumvioletred", "black"];
  /*
darkgreen19
darkcyan15
darkred14
brown18
indigo22
*/
  //  easy    delay    medic   move+permanentup+positionalup bomb+unique
  //darkgreen darkcyan darkred          brown                 indigo

  //let color = ["darkgreen", "darkblue", "darkcyan", "darkcyan", "darkred", "brown", "darkblue", "black", "brown", "mediumvioletred", "indigo"];
  /*
darkgreen11
darkblue8
darkcyan15
darkred14
brown15
black6
mediumvioletred3
indigo16
*/
  this.color = b;
  this.nom = c;
  this.id = listcards.length;
  this.effect1 = d;
  this.effect2 = e;
  this.effect3 = f;
  this.effect4 = g;
  this.effect5 = h;
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
  children[2].innerHTML = "<img id='' src='Images/" + listabilities[id].avatar + ".jpg' alt=''>";
  children[3].textContent = listabilities[id].effect1
    .replaceAll("$+", "$")
    .replaceAll("$-", "$")
    .replaceAll("$z", "$")
    .replaceAll("$°", "$")
    .replaceAll("$ha", "💕")
    .replaceAll("$h", "💖")
    .replaceAll("$cc", "🔁🔁")
    .replaceAll("$c", "🔁")
    .replaceAll("$m", "⚔️")
    .replaceAll("$r", "🏹")
    .replaceAll("$p", "🚶‍♂️")
    .replaceAll("$s", "🩸")
    .replaceAll("$t", "⌛");

  try {
    children[4].textContent = listabilities[id].effect2
      .replaceAll("$+", "$")
      .replaceAll("$-", "$")
      .replaceAll("$z", "$")
      .replaceAll("$°", "$")
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
    children[4].textContent = "";
  }
  try {
    children[5].textContent = listabilities[id].effect3
      .replaceAll("$+", "$")
      .replaceAll("$-", "$")
      .replaceAll("$z", "$")
      .replaceAll("$°", "$")
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
    children[5].textContent = "";
  }
  try {
    children[6].textContent = listabilities[id].effect4
      .replaceAll("$+", "$")
      .replaceAll("$-", "$")
      .replaceAll("$z", "$")
      .replaceAll("$°", "$")
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
    children[6].textContent = "";
  }
  try {
    children[7].textContent = listabilities[id].effect5
      .replaceAll("$+", "$")
      .replaceAll("$-", "$")
      .replaceAll("$z", "$")
      .replaceAll("$°", "$")
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
    children[7].textContent = "";
  }
  children[7].append(displayheal(nbrbonusheal[id+1]));
  children[7].append(displaymelee(nbrbonusmelee[id+1]));
  children[7].append(displayrange(nbrbonusrange[id+1]));

  try {
    if (listabilities[id].effect1[1] == "b") {
      //if there is some bombs
      if (nbrbombs[id] == 0) {
        children[3].textContent = displaybombs(
          listabilities[id].effect1.length - 1
        );
      } else {
        if (nbrbombs[id] == -1) {
          explosion = 1;
        } else {
          children[3].textContent = displaybombs(nbrbombs[id]);
        }
      }
    }
  } catch {}
  try {
    if (listabilities[id].effect2[1] == "b") {
      //if there is some bombs
      if (nbrbombs[id] == 0) {
        children[4].textContent = displaybombs(
          listabilities[id].effect2.length - 1
        );
      } else {
        if (nbrbombs[id] == -1) {
          explosion = 1;
        } else {
          children[4].textContent = displaybombs(nbrbombs[id]);
        }
      }
    }
  } catch {}
  try {
    if (listabilities[id].effect3[1] == "b") {
      //if there is some bombs
      if (nbrbombs[id] == 0) {
        children[5].textContent = displaybombs(
          listabilities[id].effect3.length - 1
        );
      } else {
        if (nbrbombs[id] == -1) {
          explosion = 1;
        } else {
          children[5].textContent = displaybombs(nbrbombs[id]);
        }
      }
    }
  } catch {}
  try {
    if (listabilities[id].effect4[1] == "b") {
      //if there is some bombs
      if (nbrbombs[id] == 0) {
        children[6].textContent = displaybombs(
          listabilities[id].effect4.length - 1
        );
      } else {
        if (nbrbombs[id] == -1) {
          explosion = 1;
        } else {
          children[6].textContent = displaybombs(nbrbombs[id]);
        }
      }
    }
  } catch {}
  try {
    if (listabilities[id].effect5[1] == "b") {
      //if there is some bombs
      if (nbrbombs[id] == 0) {
        children[7].textContent = displaybombs(
          listabilities[id].effect5.length - 1
        );
      } else {
        if (nbrbombs[id] == -1) {
          explosion = 1;
        } else {
          children[7].textContent = displaybombs(nbrbombs[id]);
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
  //Trash
  listcards.push(new Carte("bug", 12, "Bug", "$s$h$c"));
  //Starting deck (=+6 instead of +9)
  listcards.push(new Carte("run", 11, "Run forward", "$c", "$p1")); //+7
  listcards.push(new Carte("magicorb", 11, "Magic orb", "$m", "$h$h$h")); //+6
  listcards.push(new Carte("dualgun", 11, "Dual gun", "$m$r")); //+6
  listcards.push(new Carte("two", 11, "Double strike", "$m$m", "$p>")); //+6
  listcards.push(new Carte("heal", 11, "Fast heal", "$h", "$c")); //+7
  listcards.push(new Carte("longlaser", 11, "Longshot", "$r$r", "$p<")); //+6
  //Normal: triples
  listcards.push(new Carte("trident", 0, "Triple strike", "$m$m$m", "$p>")); //+9
  listcards.push(new Carte("spear", 0, "Long attack", "$m$m$r", "$p>")); //+9
  listcards.push(new Carte("wooden weapon", 0, "Small attack", "$m$r$r")); //+9
  listcards.push(new Carte("bullet", 0, "Sniping", "$r$r$r", "$p<")); //+9
  listcards.push(new Carte("strikeheal", 0, "Strike & Heal", "$m$m", "$h$h$h", "$p>")); //+9
  listcards.push(new Carte("attack", 0, "Attack & Heal", "$m$r", "$h$h$h")); //+9
  listcards.push(new Carte("snipe", 0, "Snipe & Heal", "$r$r", "$h$h$h", "$p<")); //+9
  //Normal extras
  listcards.push(new Carte("drain", 0, "Drain life", "$m", "$h$h$h$h$h$h$h", "$p>")); //+10
  listcards.push(new Carte("boomerang", 0, "Boomerang heal", "$r", "$h$h$h$h$h$h$h", "$p5")); //+11
  listcards.push(new Carte("balloonsfish", 0, "Big heal", "$h$h$h$h$h$h$h$h$h$h$h$h$h$h$h$h$h$h$h$h$h")); //+14
  //Self sacrifice
  listcards.push(new Carte("fourstars", 0, "Quadruple shot", "$r$r$r$r", "$s$s$s", "$p4")); //+10
  //$c
  listcards.push(new Carte("bench", 1, "Heal & Retreat", "$h$h$h", "$c", "$p5")); //+10
  listcards.push(new Carte("carddeck", 1, "Quick draw", "$r", "$c")); //+9
  listcards.push(new Carte("quick", 1, "Quick attack", "$m", "$c")); //+9
  //Delay damage
  listcards.push(new Carte("quadruplecard", 2, "Quadruple strike", "$m$m$m$m", "$t", "$p>")); //+10
  listcards.push(new Carte("longsnake", 2, "Longest snake", "$m$m$m$r", "$t", "$p>")); //+10
  listcards.push(new Carte("dolphin", 2, "Heavy attack", "$m$m$r$r", "$t")); //+10
  listcards.push(new Carte("greatshot", 2, "Great shot", "$m$r$r$r", "$t", "$p<")); //+10
  listcards.push(new Carte("birdhouse", 2, "Sniping hard", "$r$r$r$r", "$t", "$p<")); //+10
  //Delay damage+heal
  listcards.push(new Carte("stabbing", 2, "Timeal strike", "$m$m$m", "$h$h", "$t", "$p>")); //+9
  listcards.push(new Carte("fence", 2, "Install fence", "$m$m$r", "$h$h", "$t")); //+9
  listcards.push(new Carte("scorpio", 2, "Scorpio's help", "$m$r$r", "$h$h", "$t")); //+9
  listcards.push(new Carte("spiderweb", 2, "Timeal snipe", "$r$r$r", "$h$h", "$t", "$p<")); //+9
  //Delay weird
  listcards.push(new Carte("marblesofdeath", 3, "Marbles of death", "$m$m$m$m$m$m", "$t$t$t$t")); //+10
  listcards.push(new Carte("fireworks", 3, "Arrow of the year", "$r$r$r$r$r$r", "$t$t$t$t")); //+10
  listcards.push(new Carte("exhaustwork", 3, "Exhausting strike", "$m$m", "$c", "$t")); //+10
  listcards.push(new Carte("exhaustsnipe", 3, "Exhausting snipe", "$r$r", "$c", "$t")); //+10
  listcards.push(new Carte("exhaustingheal", 3, "Exhausting heal", "$h$h$h$h$h$h", "$c", "$t")); //+10
  listcards.push(new Carte("fiesta", 3, "Melting pot", "$m$r", "$s", "$c", "$t", "$p<")); //+9
  //$ha
  listcards.push(new Carte("healimpact", 4, "Heal impact", "$m$m", "$ha", "$p>")); //+10
  listcards.push(new Carte("seedtree", 4, "Heal polyvalent", "$m$r", "$ha")); //+10
  listcards.push(new Carte("loverock", 4, "Heal meteor", "$r$r", "$ha", "$p<")); //+10
  listcards.push(new Carte("woundedheart", 4, "Regeneration attack", "$m", "$h$h", "$ha")); //+9
  listcards.push(new Carte("fiveboule", 4, "Regeneration snipe ", "$r", "$h$h", "$ha")); //+9
  listcards.push(new Carte("island", 4, "Rejuvenation", "$h$h$h$h$h", "$ha")); //+9
  listcards.push(new Carte("letter", 4, "Regeneration", "$h", "$ha$ha")); //+9
  listcards.push(new Carte("regenerationleaf", 4, "Triple reparation", "$s$s$s", "$ha$ha$ha")); //+9
  listcards.push(new Carte("fastdog", 4, "Wouf", "$ha", "$c")); //+10
  listcards.push(new Carte("bloodcell", 4, "Transfer health", "$s$s$s$s$s", "$ha$ha","$c", "$p>")); //+9
  listcards.push(new Carte("field", 4, "Waiting heal", "$ha$ha$ha", "$t")); //+10
  listcards.push(new Carte("meditate", 4, "Mediate", "$ha$ha$ha$ha", "$t$t$t")); //+10
  listcards.push(new Carte("sleep", 4, "Time to rest", "$ha$ha$ha$ha$ha", "$t$t$t$t$t")); //+10
  //Movement
  listcards.push(new Carte("alone", 5, "Lost", "$m", "$s", "$c", "$p1")); //+9
  listcards.push(new Carte("catapult", 5, "Flee snipe", "$r", "$s", "$c", "$p5")); //+9
  listcards.push(new Carte("switchrole", 5, "Reversed snipe", "$r$r$r", "$h", "$p1")); //+11
  listcards.push(new Carte("parry", 5, "Reversed attack", "$m$m$m", "$h", "$p5")); //+10
  //Double $cc
  listcards.push(new Carte("coffee", 6, "Instant heal", "$h", "$cc")); //+10
  listcards.push(new Carte("handshake", 6, "Instant attack", "$m", "$s$s", "$cc")); //+10
  listcards.push(new Carte("bananateleport", 6, "Banana snipe", "$r", "$s$s", "$cc")); //+10
  listcards.push(new Carte("time", 6, "Teleport forward", "$cc", "$p1")); //+10
  listcards.push(new Carte("bench", 6, "Teleport behind", "$cc", "$p<")); //+9
  //Bomb $b
  listcards.push(new Carte("triplebullseyes", 7, "Extra attacks", "$m$m$r$r", "$bbbbb")); //+9 3*5
  listcards.push(new Carte("atomicbomb", 7, "Instable strikes", "$m$m$m$m$m$m", "$p>", "$bb")); //+9 9*2
  listcards.push(new Carte("timedattack", 7, "Instant difficult blow", "$m", "$cc", "$bbb")); //+9 3*3
  listcards.push(new Carte("soapbubblee", 7, "Instant medic", "$s$s$s", "$ha", "$cc")); //+10
  listcards.push(new Carte("rundog", 7, "Helping dog", "$ha", "$cc", "$bbbbb")); //+9 4*5
  listcards.push(new Carte("planeexplosion", 7, "Fast instable attacks", "$m$r", "$c", "$bbb")); //+9 3*3
  listcards.push(new Carte("callbomb", 7, "Call for help", "$ha$ha$ha$ha$ha$ha", "$t$t$t", "$bb")); //+9 2*9
  //Permanent upgrades $b
  listcards.push(new Carte("demonicstrength", 8, "Demonic strength", "Gain permanently $+m", "Loses permanently $-h$-h", "$c"));
  listcards.push(new Carte("demonicpact", 8, "Demonic's pact", "Gain permanently $+r", "Loses permanently $-h$-h", "$c"));
  listcards.push(new Carte("hellvolcano", 8, "Demonic health", "Gain permanently $+h$+h$+h$+h", "Loses permanently $-m$-r", "$c"));
  listcards.push(new Carte("searchforheal", 8, "Lifestone's search", "Gain permanently $+h", "$bbb")); //+1
  listcards.push(new Carte("purpleflower", 8, "Melee buff", "Gain permanently $+m", "Loses permanently $-h", "$bbb")); //+0
  listcards.push(new Carte("sunsetgiraffe", 8, "Ranged buff", "Gain permanently $+r", "Loses permanently $-h", "$bbb")); //+1
  listcards.push(new Carte("devilclothe", 8, "Attack buff", "Gain permanently $+m$+r", "Loses permanently $-h$-h", "$bb")); //+1
  listcards.push(new Carte("candleburned", 8, "Demonic attack", "$p>", "$m$m$m$m$m", "Loses permanently $-r")); //+15
  listcards.push(new Carte("escapehell", 8, "Demonic snipe", "$p<", "$r$r$r$r$r", "Loses permanently $-m")); //+15
  listcards.push(new Carte("runexplose", 8, "Attack and run", "$p>", "$m$m$m", "Loses permanently $-r", "$c")); //+12
  listcards.push(new Carte("demonicbow", 8, "Demonic fast snipe", "$p<", "$r$r$r", "Loses permanently $-m", "$c")); //+12
  listcards.push(new Carte("cultivate", 8, "Upgrading heal", "$m$m", "Gain $°h after each use")); //+6
  listcards.push(new Carte("growstrength", 8, "Instable full attack", "$m$m", "Gain $°m after each use", "$bbbbb")); // +6 +9 +12 +15 +18

  //$h=💖 |$ha=💕 | $c=🔁|$cc=🔁🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸 | $t=⌛ | $z.=display but ignore
  //+1    |  +4    |  +6  |   +9     |   +3  |   +3  |$p>=0 $p5=1| -1   |  -2   =  +9
  //UNIQUE EFFECTS
  //Positionnal bonus
  listcards.push(new Carte("perfectspot", 9, "Perfect spot", "$m$r", "$h", "$zh$zc if $zp3", "$p3")); //+8.4
  listcards.push(new Carte("target", 9, "Balanced attack", "$zm$zm$zm if $zp1 or $zp2", "$zr$zr$zr if $zp4 or $zp5")); //+7.2
  listcards.push(new Carte("middlewood", 9, "Fortress in the wood", "$m", "$zm$zr$zr if $zp2 or $zp3 or $zp4")); //+8.4
  listcards.push(new Carte("bridge", 9, "Healing dash", "$p1", "$zh$zh for each space moved", "$c")); //6 8 10 12 14
  listcards.push(new Carte("longattack", 9, "Snipe dash", "$p4", "$zr$zr for each space moved")); //0 6 6 12 18
  listcards.push(new Carte("medictime", 9, "Medical dash", "$p5", "$zha for each space moved")); //0 4 8 12 16

  //Position of others
  listcards.push(new Carte("fourswap", 10, "Crowd", "Swap randomly 2 by 2 others characters", "$cc")); //+9
  //Change of atkmel/atkran
  listcards.push(new Carte("switch", 10, "Switch", "Swap your $m & $r", "$c")); //+6
  //Reroll/support
  listcards.push(new Carte("reroll", 10, "Reroll", "$h", "Reroll all unused dices", "$c")); //+6
  listcards.push(new Carte("rubbickscube", 10, "Return", "Return all unused dice", "$c")); //+6
  listcards.push(new Carte("jellyfish", 10, "Chaos", "$ha", "Trigger a random other ability (non Chaos)")); //+13
  listcards.push(new Carte("copycat", 10, "Copycat", "Apply the 1️⃣ effect")); //+9.5
  listcards.push(new Carte("blackhole", 10, "Feed from allies", "$h$h$h$h$h", "All other allies take one damage", "$cc")); //+10

  //$h=💖 |$ha=💕 | $c=🔁|$cc=🔁🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸 | $t=⌛ | $z.=display but ignore
  //+1    |  +4    |  +6  |   +9     |   +3  |   +3  |$p>=0 $p5=1| -1   |  -2   =  +9
  /*
    Hard mode (coming soon) extra effect: +3atk for the enemy and:
    1:🩸⌛🔁 | 2:🩸💕 | 3:💖💖💖 | 4:⚔️ | 5:🏹 | 6:🚶‍♂️1
   */
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
    //document.getElementById("persoetde"+i).children[1].textContent = listpersos[i].de;
  }
}
function debutdutour() {
  genererevents();
  lancerdes();
  afficherallperso(ordrepersos);
}
function findutour() {
  if (listpersos[ennemy].currenthp < 1) {
    //One kill done
    ennemy++;
    listpersos[5] = listpersos[ennemy];
    choosenewcard();
    if (ennemy == 16) {
      youwin();
      return;
    }
    if (ennemy == 7 || ennemy == 9 || ennemy > 10){
      skips++;
    }
  } else {
    listpersos[ordrepersos[0]].currenthp += -1 * listpersos[5].atkmel;
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
    //document.getElementsByClassName("de")[i].addEventListener("click", clickde);
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
      "Clicking on 🔁/⌛ does nothing. You can skip turn instead.";
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
    if (listpersos[5].currenthp < 1) {
      listpersos[5].currenthp = 0;
      afficherallperso(ordrepersos);
      document.getElementById("messagecentral").textContent =
        "Enemy killed. You must do an extra action (like skip turn) before fighting the next enemy.";
    } else {
      if (skipnextmessage == 0) {
        document.getElementById("messagecentral").textContent = "Extra turn (🔁)";
      }
      skipnextmessage = 0;
    }
  }
}
let cantrip = 0; //check if you can chose another dice or not
function resolveeffect(player, id) {
  //$h=💖 |$ha=💕 | $c=🔁|$cc=🔁🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸 | $t=⌛ | $z.=display but ignore
  //+1    |  +4    |  +6  |   +9     |   +3  |   +3  |$p>=0 $p5=1| -1   |  -2   =  +9
  cantrip = 0;
  let increaseturndelay = 0;
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
  for (let j = 4; j > -1; j--) {
    let split;
    if (j == 0) {
      split = listcards[id].effect1.split("$");
    }
    if (j == 1) {
      try {
        split = listcards[id].effect2.split("$");
      } catch {
        split = "y";
      }
    }
    if (j == 2) {
      try {
        split = listcards[id].effect3.split("$");
      } catch {
        split = "y";
      }
    }
    if (j == 3) {
      try {
        split = listcards[id].effect4.split("$");
      } catch {
        split = "y";
      }
    }
    if (j == 4) {
      try {
        split = listcards[id].effect5.split("$");
      } catch {
        split = "y";
      }
    }
    for (let i = 0; i < split.length; i++) {
      let char = split[i].charAt(0);
      if (char[0] == "h") {
        if (split[i].charAt(1) == "a") {
          //💕
          for (let k = 0; k < 5; k++) {
            heal(listpersos[k], 1);
          }
          heal(player, -1); //heal all other ally
        } else {
          //💖
          heal(player, 1);
        }
      }
      if (char[0] == "c") {
        cantrip = 1;
        if (split[i].charAt(1) != "c") {
          //🔁
          diceavailable[player.id] = "n";
        } else {
          //🔁🔁
          let previousde = listpersos[player.id].de;
          listpersos[player.id].de = Math.trunc(Math.random() * 5 + 1);
          if (listpersos[player.id].de >= previousde) {
            listpersos[player.id].de++;
          }
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
        move(player, split[i].charAt(1));
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
        console.log("+");
        console.log(split);
        console.log(split[i].charAt(1));
        if (split[i].charAt(1) == "m") {
          permanentbuff[0]++;
        }
        if (split[i].charAt(1) == "r") {
          permanentbuff[1]++;
        }
        if (split[i].charAt(1) == "h") {
          permanentbuff[2]++;
          heal(player, 1);
        }
      }
      if (char[0] == "-") {
        console.log("-");
        console.log(split);
        console.log(split[i].charAt(1));
        if (split[i].charAt(1) == "m") {
          if (player.atkmel-permanentbuff[0] == 0) {
            document.getElementById("messagecentral").textContent =
              "Attack too low. Action cancelled";
            cantrip = 1;
            skipnextmessage = 1;
            return;
          }
          permanentbuff[0]--;
        }
        if (split[i].charAt(1) == "r") {
          if (player.atkran-permanentbuff[1] == 0) {
            document.getElementById("messagecentral").textContent =
              "Range too low. Action cancelled";
            cantrip = 1;
            skipnextmessage = 1;
            return;
          }
          permanentbuff[1]--;
        }
        if (split[i].charAt(1) == "h") {
          if (player.maxhp-permanentbuff[2] == 1) {
            document.getElementById("messagecentral").textContent =
              "Health too low. Action cancelled";
            cantrip = 1;
            skipnextmessage = 1;
            return;
          }
          permanentbuff[2]--;
        }
      }

      //permanent buff on card
      if (char[0] == "°") {
        if (split[i].charAt(1) == "m") {
          atkmel(player,nbrbonusmelee[player.de]);
          nbrbonusmelee[player.de]++;
          afficherallcarte();
        }
        if (split[i].charAt(1) == "r") {
          atkmel(player,nbrbonusrange[player.de]);
          nbrbonusrange[player.de]++;
          afficherallcarte();
        }
        if (split[i].charAt(1) == "h") {
          heal(player, nbrbonusheal[player.de]);
          nbrbonusheal[player.de]++;
          afficherallcarte();
        }
      }


    }
  }

    //permanent buff
    player.atkmel += permanentbuff[0];
    player.atkran += permanentbuff[1];
    player.maxhp += permanentbuff[2];
    if(permanentbuff[2]>0){
      heal(player, permanentbuff[2]);
    }

  afficherallcarte();

  specialseffectsafter(player, id);
  if (increaseturndelay > 0) {
    turndelay[player.id] = increaseturndelay + 1;
  }
  checkhps();
  afficherallperso(ordrepersos);
}
function specialseffectsbeforebeforebefore(player, id) {
  if (listcards[id].nom == "Chaos") {
    //"$ha", "Trigger a random other ability (non Chaos)"
    console.log("c");
    let rand;
    let newid = id;
    while (listcards[newid].nom == "Chaos") {
      rand = Math.trunc(Math.random() * 6);
      newid = listabilities[rand].id;
    }
    console.log("Effect chosen randomly:" + newid);
    document.getElementById("messagecentral").textContent =
      "Effect " + newid + " done.";
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
    //"$m$r", "$h", "$zh$zc if $zp3", "$p3" //+8.4
    console.log("ps");
    if (ordrepersos.indexOf(player.id) == 2) {
      heal(player, 1);
      cantrip = 1;
      diceavailable[player.id] = "n";
    }
  }
  if (listcards[id].nom == "Balanced attack") {
    //"$zm$zm$zm if $zp1 or $zp2", "$zr$zr$zr if $zp4 or $zp5" //+7.2
    console.log("ba");
    if (ordrepersos.indexOf(player.id) == 0 || ordrepersos.indexOf(player.id) == 1) {
      atkmel(player, 3);
    }
    if (ordrepersos.indexOf(player.id) == 3 || ordrepersos.indexOf(player.id) == 4) {
      atkran(player, 3);
    }
  }
  if (listcards[id].nom == "Central fight") {
    //"$m", "$zm$zr$zr if $zp2 or $zp3 or $zp4" //+8.4
    console.log("cf");
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
    //"p1", "$zh$zh for each space moved", "$c"
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
    //"$p5", "$zh$zha for each space moved"
    for (let k = 0; k < 5; k++) {
      heal(listpersos[k], 4- ordrepersos.indexOf(player.id));
    }
  }
  return id;
}
function specialseffectsafter(player, id) {
  if (listcards[id].nom == "Crowd") {
    //"Change randomly the place of all characters", "$cc"
    console.log("c");
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
    console.log("s");
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
    console.log("r");
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
    console.log("i");
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
}
function heal(player, nbr) {
  player.currenthp += nbr;
}
function attack(nbr) {
  listpersos[5].currenthp += -1 * nbr;
}
function atkmel(player, nbr) {
  listpersos[5].currenthp += -1 * nbr * player.atkmel;
}
function atkran(player, nbr) {
  listpersos[5].currenthp += -1 * nbr * player.atkran;
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
  setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      document
        .getElementsByClassName("de")
        [i].removeEventListener("click", clickde);
    }
    document.getElementById("skip").removeEventListener("click", skipturn);
  }, 1000);
  document.getElementById("playagain").style.visibility = "visible";
  document.getElementById("playagain").addEventListener("click", reload);
}
function youwin() {
  afficherallperso(ordrepersos);
  document.getElementById("messagecentral").textContent =
    "Congratulation you won :)";
  setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      document
        .getElementsByClassName("de")
        [i].removeEventListener("click", clickde);
    }
    document.getElementById("skip").removeEventListener("click", skipturn);
  }, 1000);
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
  let carte = listabilities[6 + cardchosen];
  let split = "";
  try {
    split = carte.effect1.split("$b");
  } catch {}
  try {
    split = carte.effect2.split("$b");
  } catch {}
  try {
    split = carte.effect3.split("$b");
  } catch {}
  try {
    split = carte.effect4.split("$b");
  } catch {}
  try {
    split = carte.effect5.split("$b");
  } catch {}
/*
  console.log(split);
  console.log(split.length);*/
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
  /*for (i = 7; i < 12; i++) {
    listabilities[i] = listabilities[6];
    listabilities[i].effect1 = "ici";
    listabilities[i].effect2 = "ici";
    listabilities[i].effect3 = "ici";
    listabilities[i].effect4 = "ici";
    listabilities[i].effect5 = "ici";
  }*/
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

  document
    .getElementById("closeparameters")
    .addEventListener("click", closeparameter);
  document.getElementById("closeparameters").style.visibility = "visible";

  let selector = document.getElementsByClassName("choiceparameter");
  for (let i = 0; i < selector.length; i++) {
    selector[i].style.visibility = "visible";
    if (i < 5) {
      selector[i].style.top = 25 + i * 25 + "px";
    } else {
      selector[i].style.top = 75 + i * 25 + "px";
      try {
        document.getElementById("disableset" + [i - 5]).style.backgroundColor =
          ordercolor[i - 5];
      } catch {}
    }
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
  selector[12].addEventListener("click", setting12);
  selector[13].addEventListener("click", setting13);
  selector[14].addEventListener("click", setting14);
  selector[15].addEventListener("click", setting15);
  selector[16].addEventListener("click", setting16);
  selector[17].addEventListener("click", setting17);
}
function closeparameter() {
  let selector = document.getElementsByClassName("choiceparameter");
  for (let i = 0; i < selector.length; i++) {
    selector[i].style.visibility = "hidden";
  }
  document.getElementById("grayscreen").style.visibility = "hidden";
  document.getElementById("closeparameters").style.visibility = "hidden";

  //cookies:
  createcookie("disablecolors", disablecolors);
  createcookie("choicesonkill", choicesonkill);
  createcookie("cardporposed", cardporposed);
  createcookie("randostartcard", randostartcard);
  createcookie("set", set.join("|"));
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

function setting1() {
  let element = document.getElementById("content");
  element.innerHTML = "not done atm D:";
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
    element.innerHTML = "Set 0 Easy: disabled";
    set[0] = "n";
  } else {
    element.innerHTML = "Set 0 Easy: enabled";
    set[0] = "y";
  }
}
function setting6() {
  let element = document.getElementById("disableset1");
  if (set[1] == "y") {
    element.innerHTML = "Set 1 Play again: disabled";
    set[1] = "n";
  } else {
    element.innerHTML = "Set 1 Play again: enabled";
    set[1] = "y";
  }
}
function setting7() {
  let element = document.getElementById("disableset2");
  if (set[2] == "y") {
    element.innerHTML = "Set 2 Delay: disabled";
    set[2] = "n";
  } else {
    element.innerHTML = "Set 2 Delay: enabled";
    set[2] = "y";
  }
}
function setting8() {
  let element = document.getElementById("disableset3");
  if (set[3] == "y") {
    element.innerHTML = "Set 3 Delayweird: disabled";
    set[3] = "n";
  } else {
    element.innerHTML = "Set 3 Delayweird: enabled";
    set[3] = "y";
  }
}
function setting9() {
  let element = document.getElementById("disableset4");
  if (set[4] == "y") {
    element.innerHTML = "Set 4 Medic: disabled";
    set[4] = "n";
  } else {
    element.innerHTML = "Set 4 Medic: enabled";
    set[4] = "y";
  }
}
function setting10() {
  let element = document.getElementById("disableset5");
  if (set[5] == "y") {
    element.innerHTML = "Set 5 Move: disabled";
    set[5] = "n";
  } else {
    element.innerHTML = "Set 5 Move: enabled";
    set[5] = "y";
  }
}
function setting11() {
  let element = document.getElementById("disableset6");
  if (set[6] == "y") {
    element.innerHTML = "Set 6 Double play again: disabled";
    set[6] = "n";
  } else {
    element.innerHTML = "Set 6 Double play again: enabled";
    set[6] = "y";
  }
}
function setting12() {
  let element = document.getElementById("disableset7");
  if (set[7] == "y") {
    element.innerHTML = "Set 7 Bomb: disabled";
    set[7] = "n";
  } else {
    element.innerHTML = "Set 7 Bomb: enabled";
    set[7] = "y";
  }
}
function setting13() {
  let element = document.getElementById("disableset8");
  if (set[8] == "y") {
    element.innerHTML = "Set 8 PermanentUp: disabled";
    set[8] = "n";
  } else {
    element.innerHTML = "Set 8 PermanentUp: enabled";
    set[8] = "y";
  }
}
function setting14() {
  let element = document.getElementById("disableset9");
  if (set[9] == "y") {
    element.innerHTML = "Set 9 PositionalUp: disabled";
    set[9] = "n";
  } else {
    element.innerHTML = "Set 9 PositionalUp: enabled";
    set[9] = "y";
  }
}
function setting15() {
  let element = document.getElementById("disableset10");
  if (set[10] == "y") {
    element.innerHTML = "Set 10 Unique: disabled";
    set[10] = "n";
  } else {
    element.innerHTML = "Set 10 Unique: enabled";
    set[10] = "y";
  }
}
function setting16() {
  let element = document.getElementById("disablesetall");
  if(element.textContent == "Enable all"){
    set = ["y", "y", "y", "y", "y", "y", "y", "y", "y", "y", "y"];
    document.getElementById("disableset0").innerHTML = "Set 0 Easy: enabled";
    document.getElementById("disableset1").innerHTML =
      "Set 1 Play again: enabled";
    document.getElementById("disableset2").innerHTML = "Set 2 Delay: enabled";
    document.getElementById("disableset3").innerHTML =
      "Set 3 Delayweird: enabled";
    document.getElementById("disableset4").innerHTML = "Set 4 Medic: enabled";
    document.getElementById("disableset5").innerHTML = "Set 5 Move: enabled";
    document.getElementById("disableset6").innerHTML =
      "Set 6 Double play again: enabled";
    document.getElementById("disableset7").innerHTML = "Set 7 Bomb: enabled";
    document.getElementById("disableset8").innerHTML =
      "Set 8 PermanentUp: enabled";
    document.getElementById("disableset9").innerHTML =
      "Set 9 PositionalUp: enabled";
    document.getElementById("disableset10").innerHTML = "Set 10 Unique: enabled";
    element.innerHTML = "Disable all";
  }else{
    set = ["n", "n", "n", "n", "n", "n", "n", "n", "n", "n", "n"];
    document.getElementById("disableset0").innerHTML = "Set 0 Easy: disabled";
    document.getElementById("disableset1").innerHTML =
      "Set 1 Play again: disabled";
    document.getElementById("disableset2").innerHTML = "Set 2 Delay: disabled";
    document.getElementById("disableset3").innerHTML =
      "Set 3 Delayweird: disabled";
    document.getElementById("disableset4").innerHTML = "Set 4 Medic: disabled";
    document.getElementById("disableset5").innerHTML = "Set 5 Move: disabled";
    document.getElementById("disableset6").innerHTML =
      "Set 6 Double play again: disabled";
    document.getElementById("disableset7").innerHTML = "Set 7 Bomb: disabled";
    document.getElementById("disableset8").innerHTML =
      "Set 8 PermanentUp: disabled";
    document.getElementById("disableset9").innerHTML =
      "Set 9 PositionalUp: disabled";
    document.getElementById("disableset10").innerHTML = "Set 10 Unique: disabled";
    element.innerHTML = "Enable all";
  }
}
function setting17(){
  disablecolors = 0;
  document.getElementById("disablecolors").innerHTML = "Colors: all";
  choicesonkill = 5;
  document.getElementById("cardproposedonkill").innerHTML = "Choices on kill: " + choicesonkill;
  randostartcard = 2;
  document.getElementById("randostartcard").innerHTML = "Starting random cards: " + randostartcard;

  document.getElementById("sets").innerHTML =
      "Cards proposed: by set (choose random if you change 'Choices on kill' OR disable all of one color)";
  cardporposed = "set";


  set = ["y", "y", "y", "y", "y", "y", "y", "y", "y", "y", "y"];
  document.getElementById("disableset0").innerHTML = "Set 0 Easy: enabled";
  document.getElementById("disableset1").innerHTML =
    "Set 1 Play again: enabled";
  document.getElementById("disableset2").innerHTML = "Set 2 Delay: enabled";
  document.getElementById("disableset3").innerHTML =
    "Set 3 Delayweird: enabled";
  document.getElementById("disableset4").innerHTML = "Set 4 Medic: enabled";
  document.getElementById("disableset5").innerHTML = "Set 5 Move: enabled";
  document.getElementById("disableset6").innerHTML =
    "Set 6 Double play again: enabled";
  document.getElementById("disableset7").innerHTML = "Set 7 Bomb: enabled";
  document.getElementById("disableset8").innerHTML =
    "Set 8 PermanentUp: enabled";
  document.getElementById("disableset9").innerHTML =
    "Set 9 PositionalUp: enabled";
  document.getElementById("disableset10").innerHTML = "Set 10 Unique: enabled";
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

  if(listcookies[1].replace("choicesonkill=","")!=5){
    setting2();
  if(listcookies[1].replace("choicesonkill=","")==4){
    setting2();
  }
  };

  let nbr = listcookies[3].replace("randostartcard=","");
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

  if(listcookies[2].replace("cardporposed=","")==" random"){ // space annoying
    setting4();
  };

  listset = listcookies[4].replace("set=","").split("|");
  for (let i=0;i<listset.length;i++){
    if (listset[i] == "n" || listset[i] == " n"){ // space annoying
      if(i==0){setting5();}
      if(i==1){setting6();}
      if(i==2){setting7();}
      if(i==3){setting8();}
      if(i==4){setting9();}
      if(i==5){setting10();}
      if(i==6){setting11();}
      if(i==7){setting12();}
      if(i==8){setting13();}
      if(i==9){setting14();}
      if(i==10){setting15();}
    }
  }
    
}
}

let timecookie = 7200; //2h
function createcookie(name, value) {
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
}