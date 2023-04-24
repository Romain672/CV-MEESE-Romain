let listpersos = [];
let listabilities = [12]; //7ème card is empty, 8/9/10/11/12ème are for choices
let listcards = [];
let ordrepersos = [0, 1, 2, 3, 4, 5];
let diceavailable = ["y", "y", "y", "y", "y"];
let turndelay = [0, 0, 0, 0, 0, 0];
let nbrbombs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let ennemy = 5;
let skipnextmessage = 0;

window.addEventListener("load", onload);
function onload() {
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
    "Select a dice to play, the corresponding card below will take effect";
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
  children[0].textContent = listpersos[id].nom;
  children[2].textContent = "💖".concat(
    listpersos[id].currenthp
      .toString()
      .concat("/")
      .concat(listpersos[id].maxhp.toString())
  );

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
  listpersos[0] = new Personnage("none", "Albert", 0, 14, 2, 1);
  listpersos[1] = new Personnage("none", "Bernard", 0, 10, 4, 1);
  listpersos[2] = new Personnage("none", "Catherine", 0, 10, 3, 2);
  listpersos[3] = new Personnage("none", "Derick", 0, 6, 4, 4);
  listpersos[4] = new Personnage("none", "Elise", 0, 6, 1, 6);
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
  //let color = ["darkgreen", "darkblue", "darkcyan", "darkred", "darkorange", "", "brown", "darksalmon", "indigo", "", ""];
  let color = [
    "darkgreen",
    "darkblue",
    "darkcyan",
    "darkcyan",
    "darkred",
    "brown",
    "darkblue",
    "black",
    "brown",
    "mediumvioletred",
    "indigo",
  ];
  this.color = color[b];
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
        listabilities[id].color;
    } catch {
      document.getElementById("carteextra" + id).style.backgroundColor =
        listabilities[id].color;
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

  children[1].textContent = listabilities[id].nom;
  children[2].textContent = listabilities[id].effect1
    .replaceAll("$+", "$")
    .replaceAll("$-", "$")
    .replaceAll("$z", "$")
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
    children[3].textContent = listabilities[id].effect2
      .replaceAll("$+", "$")
      .replaceAll("$-", "$")
      .replaceAll("$z", "$")
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
    children[3].textContent = "";
  }
  try {
    children[4].textContent = listabilities[id].effect3
      .replaceAll("$+", "$")
      .replaceAll("$-", "$")
      .replaceAll("$z", "$")
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
    children[5].textContent = listabilities[id].effect4
      .replaceAll("$+", "$")
      .replaceAll("$-", "$")
      .replaceAll("$z", "$")
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
    children[6].textContent = listabilities[id].effect5
      .replaceAll("$+", "$")
      .replaceAll("$-", "$")
      .replaceAll("$z", "$")
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
    if (listabilities[id].effect1[1] == "b") {
      //if there is some bombs
      if (nbrbombs[id] == 0) {
        children[2].textContent = displaybombs(
          listabilities[id].effect1.length - 1
        );
      } else {
        if (nbrbombs[id] == -1) {
          explosion = 1;
        } else {
          children[2].textContent = displaybombs(nbrbombs[id]);
        }
      }
    }
  } catch {}
  try {
    if (listabilities[id].effect2[1] == "b") {
      //if there is some bombs
      if (nbrbombs[id] == 0) {
        children[3].textContent = displaybombs(
          listabilities[id].effect2.length - 1
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
    if (listabilities[id].effect3[1] == "b") {
      //if there is some bombs
      if (nbrbombs[id] == 0) {
        children[4].textContent = displaybombs(
          listabilities[id].effect3.length - 1
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
    if (listabilities[id].effect4[1] == "b") {
      //if there is some bombs
      if (nbrbombs[id] == 0) {
        children[5].textContent = displaybombs(
          listabilities[id].effect4.length - 1
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
    if (listabilities[id].effect5[1] == "b") {
      //if there is some bombs
      if (nbrbombs[id] == 0) {
        children[6].textContent = displaybombs(
          listabilities[id].effect5.length - 1
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
  if (explosion == 1) {
    children[1].textContent = "Explosed";
    children[2].textContent = "";
    children[3].textContent = "";
    children[4].textContent = "";
    children[5].textContent = "";
    children[6].textContent = "";
  }
}
function displaybombs(nbr) {
  let string = "";
  for (let i = 0; i < nbr; i++) {
    string = string.concat("💣");
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
  listcards.push(new Carte("none", "black", "none", "$s$h$c"));
  //Starting deck (=+6 instead of +9)
  listcards.push(new Carte("none", "", "Fast heal", "$h", "$c")); //+7
  listcards.push(new Carte("none", "", "Heal & Attack", "$m", "$h$h$h")); //+6
  listcards.push(new Carte("none", "", "Double attack", "$m$r")); //+6
  listcards.push(new Carte("none", "", "Double strike", "$m$m", "$p>")); //+6
  listcards.push(new Carte("none", "", "Longshot", "$r$r", "$p<")); //+6
  listcards.push(new Carte("none", "", "Run forward", "$c", "$p1")); //+7
  //Normal: triples
  listcards.push(new Carte("none", 0, "Triple strike", "$m$m$m", "$p>")); //+9
  listcards.push(new Carte("none", 0, "Long attack", "$m$m$r", "$p>")); //+9
  listcards.push(new Carte("none", 0, "Small attack", "$m$r$r")); //+9
  listcards.push(new Carte("none", 0, "Sniping", "$r$r$r", "$p<")); //+9
  listcards.push(
    new Carte("none", 0, "Strike & Heal", "$m$m", "$h$h$h", "$p>")
  ); //+9
  listcards.push(new Carte("none", 0, "Attack & Heal", "$m$r", "$h$h$h")); //+9
  listcards.push(new Carte("none", 0, "Snipe & Heal", "$r$r", "$h$h$h", "$p<")); //+9
  //Normal extras
  listcards.push(
    new Carte("none", 0, "Drain life", "$m", "$h$h$h$h$h$h$h", "$p>")
  ); //+10
  listcards.push(
    new Carte("none", 0, "Boomerang heal", "$r", "$h$h$h$h$h$h$h", "$p5")
  ); //+11
  listcards.push(
    new Carte("none", 0, "Big heal", "$h$h$h$h$h$h$h$h$h$h$h$h$h$h")
  ); //+14
  //Self sacrifice
  listcards.push(
    new Carte("none", 0, "Quadruple shot", "$r$r$r$r", "$s$s$s", "$p4")
  ); //+10
  //$c
  listcards.push(new Carte("none", 1, "Heal & Retreat", "$h$h$h", "$c", "$p5")); //+10
  listcards.push(new Carte("none", 1, "Quick draw", "$r", "$c")); //+9
  listcards.push(new Carte("none", 1, "Quick attack", "$m", "$c")); //+9
  //Delay damage
  listcards.push(
    new Carte("none", 2, "Quadruple strike", "$m$m$m$m", "$t", "$p>")
  ); //+10
  listcards.push(
    new Carte("none", 2, "Longest attack", "$m$m$m$r", "$t", "$p>")
  ); //+10
  listcards.push(new Carte("none", 2, "Heavy attack", "$m$m$r$r", "$t")); //+10
  listcards.push(new Carte("none", 2, "Great shot", "$m$r$r$r", "$t", "$p<")); //+10
  listcards.push(new Carte("none", 2, "Sniping hard", "$r$r$r$r", "$t", "$p<")); //+10
  //Delay damage+heal
  listcards.push(
    new Carte("none", 2, "Timeal strike", "$m$m$m", "$h$h", "$t", "$p>")
  ); //+9
  listcards.push(
    new Carte("none", 2, "Timeal long attack", "$m$m$r", "$h$h", "$t")
  ); //+9
  listcards.push(new Carte("none", 2, "Timeal attack", "$m$r$r", "$h$h", "$t")); //+9
  listcards.push(
    new Carte("none", 2, "Timeal snipe", "$r$r$r", "$h$h", "$t", "$p<")
  ); //+9
  //Delay weird
  listcards.push(
    new Carte("none", 3, "Sixtuple strike", "$m$m$m$m$m$m", "$t$t$t$t")
  ); //+10
  listcards.push(
    new Carte("none", 3, "Arrow of the year", "$r$r$r$r$r$r", "$t$t$t$t")
  ); //+10
  listcards.push(new Carte("none", 3, "Exhausting strike", "$m$m", "$c", "$t")); //+10
  listcards.push(new Carte("none", 3, "Exhausting snipe", "$r$r", "$c", "$t")); //+10
  listcards.push(
    new Carte("none", 3, "Exhausting heal", "$h$h$h$h$h$h", "$c", "$t")
  ); //+10
  listcards.push(
    new Carte("none", 3, "Melting pot", "$m$r", "$s", "$c", "$t", "$p<")
  ); //+9
  //$ha
  listcards.push(new Carte("none", 4, "Heal impact", "$m$m", "$ha", "$p>")); //+10
  listcards.push(new Carte("none", 4, "Heal polyvalent", "$m$r", "$ha")); //+10
  listcards.push(new Carte("none", 4, "Heal meteor", "$r$r", "$ha", "$p<")); //+10
  listcards.push(
    new Carte("none", 4, "Regeneration attack", "$m", "$h$h", "$ha")
  ); //+9
  listcards.push(
    new Carte("none", 4, "Regeneration snipe ", "$r", "$h$h", "$ha")
  ); //+9
  listcards.push(new Carte("none", 4, "Rejuvenation", "$h$h$h$h$h", "$ha")); //+9
  listcards.push(new Carte("none", 4, "Regeneration", "$h", "$ha$ha")); //+9
  listcards.push(
    new Carte("none", 4, "Triple reparation", "$s$s$s", "$ha$ha$ha")
  ); //+9
  listcards.push(new Carte("none", 4, "Fast medic", "$ha", "$c")); //+10
  listcards.push(
    new Carte(
      "none",
      4,
      "Fast sacrificial medic",
      "$s$s$s$s$s",
      "$ha$ha",
      "$c",
      "$p>"
    )
  ); //+9
  listcards.push(
    new Carte(
      "none",
      4,
      "Sacrificial medic",
      "$s$s$s$s$s$s$s$s$s",
      "$ha$ha$ha",
      "$c",
      "$p>"
    )
  ); //+9
  listcards.push(new Carte("none", 4, "Waiting heal", "$ha$ha$ha", "$t")); //+10
  listcards.push(
    new Carte("none", 4, "Heal and sleep", "$ha$ha$ha$ha", "$t$t$t")
  ); //+10
  listcards.push(
    new Carte("none", 4, "Heal before rest", "$ha$ha$ha$ha$ha", "$t$t$t$t$t")
  ); //+10
  //Movement
  listcards.push(new Carte("none", 5, "Run attack", "$m", "$s", "$c", "$p1")); //+9
  listcards.push(new Carte("none", 5, "Flee snipe", "$r", "$s", "$c", "$p5")); //+9
  listcards.push(new Carte("none", 5, "Reversed snipe", "$r$r$r", "$h", "$p1")); //+11
  listcards.push(
    new Carte("none", 5, "Reversed attack", "$m$m$m", "$h", "$p5")
  ); //+10
  //Double $cc
  listcards.push(new Carte("none", 6, "Instant heal", "$h", "$cc")); //+10
  listcards.push(new Carte("none", 6, "Instant attack", "$m", "$s$s", "$cc")); //+10
  listcards.push(new Carte("none", 6, "Instant snipe", "$r", "$s$s", "$cc")); //+10
  listcards.push(new Carte("none", 6, "Teleport forward", "$cc", "$p1")); //+10
  listcards.push(new Carte("none", 6, "Teleport behind", "$cc", "$p<")); //+9

  //Bomb $b
  listcards.push(new Carte("none", 7, "Extra attacks", "$m$m$r$r", "$bbbbb")); //+9 3*5
  listcards.push(
    new Carte("none", 7, "Instable strikes", "$m$m$m$m$m$m", "$p>", "$bb")
  ); //+9 9*2
  listcards.push(
    new Carte("none", 7, "Instant difficult blow", "$m", "$cc", "$bbb")
  ); //+9 3*3
  listcards.push(new Carte("none", 7, "Instant medic", "$ha", "$cc", "$bbbbb")); //+9 4*5
  listcards.push(
    new Carte("none", 7, "Fast instable attacks", "$m$r", "$c", "$bbb")
  ); //+9 3*3
  listcards.push(
    new Carte("none", 7, "Call for help", "$ha$ha$ha$ha$ha$ha", "$t$t$t", "$bb")
  ); //+9 2*9
  //Permanent upgrades $b
  listcards.push(
    new Carte(
      "none",
      8,
      "Demonic strength",
      "Gain permanently $+m",
      "Loses permanently     $-h$-h",
      "$c"
    )
  );
  listcards.push(
    new Carte(
      "none",
      8,
      "Demonic range",
      "Gain permanently $+r",
      "Loses permanently     $-h$-h",
      "$c"
    )
  );
  listcards.push(
    new Carte(
      "none",
      8,
      "Demonic health",
      "Gain permanently $+h$+h$+h$+h",
      "Loses permanently     $-m$-r",
      "$c"
    )
  );
  listcards.push(
    new Carte("none", 8, "Hp buff", "Gain permanently $+h", "$bbb")
  ); //+1
  listcards.push(
    new Carte(
      "none",
      8,
      "Melee buff",
      "Gain permanently $+m",
      "Loses permanently $-h",
      "$bbb"
    )
  ); //+0
  listcards.push(
    new Carte(
      "none",
      8,
      "Ranged buff",
      "Gain permanently $+r",
      "Loses permanently $-h",
      "$bbb"
    )
  ); //+1
  listcards.push(
    new Carte(
      "none",
      8,
      "Attack buff",
      "Gain permanently $+m",
      "Loses permanently $-h",
      "$bbb"
    )
  ); //+1
  listcards.push(
    new Carte(
      "none",
      8,
      "Demonic attack",
      "$p>",
      "$m$m$m$m$m",
      "Loses permanently $-r"
    )
  ); //+15
  listcards.push(
    new Carte(
      "none",
      8,
      "Demonic snipe",
      "$p<",
      "$r$r$r$r$r",
      "Loses permanently $-m"
    )
  ); //+15
  listcards.push(
    new Carte(
      "none",
      8,
      "Demonic fast attack",
      "$p>",
      "$m$m$m",
      "Loses permanently $-r",
      "$c"
    )
  ); //+12
  listcards.push(
    new Carte(
      "none",
      8,
      "Demonic fast snipe",
      "$p<",
      "$r$r$r",
      "Loses permanently $-m",
      "$c"
    )
  ); //+12

  //$h=💖 |$ha=💕 | $c=🔁|$cc=🔁🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸 | $t=⌛ | $z.=display but ignore
  //+1    |  +4    |  +6  |   +9     |   +3  |   +3  |$p>=0 $p5=1| -1   |  -2   =  +9

  //Normal triple copied
  /*
    listcards.push(new Carte("none","Triple strike", "$m$m$m", "$p>")); //+9
    listcards.push(new Carte("none","Long attack", "$m$m$r", "$p>")); //+9
    listcards.push(new Carte("none","Small attack", "$m$r$r")); //+9
    listcards.push(new Carte("none","Sniping", "$r$r$r", "$p<")); //+9
    listcards.push(new Carte("none","Strike & Heal", "$m$m","$h$h$h", "$p>")); //+9
    listcards.push(new Carte("none","Attack & Heal", "$m$r","$h$h$h")); //+9
    listcards.push(new Carte("none","Snipe & Heal", "$r$r","$h$h$h", "$p<")); //+9*/
  //UNIQUE EFFECTS
  //Positionnal bonus
  listcards.push(
    new Carte("none", 9, "Perfect spot", "$m$r", "$h", "$zh$zc if $zp3", "$p3")
  ); //+8.4
  listcards.push(
    new Carte(
      "none",
      9,
      "Balanced attack",
      "$zm$zm$zm if $zp1 or $zp2",
      "$zr$zr$zr if $zp4 or $zp5"
    )
  ); //+7.2
  listcards.push(
    new Carte(
      "none",
      9,
      "Central fight",
      "$m",
      "$zm$zr$zr if $zp2 or $zp3 or $zp4"
    )
  ); //+8.4
  //Position of others
  listcards.push(
    new Carte(
      "none",
      10,
      "Crowd",
      "Swap randomly 2 by 2 others characters",
      "$cc"
    )
  ); //+9
  //Change of atkmel/atkran
  listcards.push(new Carte("none", 10, "Switch", "Swap your $m & $r", "$c")); //+6
  //Reroll/support
  listcards.push(
    new Carte("none", 10, "Reroll", "$h", "Reroll all unused dices", "$c")
  ); //+6
  listcards.push(
    new Carte("none", 10, "Return", "Return all unused dice", "$c")
  ); //+6
  listcards.push(
    new Carte(
      "none",
      10,
      "Chaos",
      "$ha",
      "Trigger a random other ability (non Chaos)"
    )
  ); //+13
  listcards.push(new Carte("none", 10, "Copycat", "Apply the 1️⃣ effect")); //+9.5
  listcards.push(
    new Carte(
      "none",
      10,
      "Feed from allies",
      "$h$h$h$h$h",
      "All other allies take one damage",
      "$cc"
    )
  ); //+10

  //$h=💖 |$ha=💕 | $c=🔁|$cc=🔁🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸 | $t=⌛ | $z.=display but ignore
  //+1    |  +4    |  +6  |   +9     |   +3  |   +3  |$p>=0 $p5=1| -1   |  -2   =  +9
  /*
    listcards.push(new Carte("none","Duplicate", "🩸🩸🩸🩸🩸🩸", "The next ability (non duplicate) trigger twice", "🔁"));
    */
  /*
    Hard mode (coming soon) extra effect: +3atk for the enemy and:
    1:🩸⌛🔁 | 2:🩸💕 | 3:💖💖💖 | 4:⚔️ | 5:🏹 | 6:🚶‍♂️1
   */

  listcards.push(
    new Carte("none", 10, "Chaos", "$ha", "Trigger a random other ability")
  ); //+13
  listcards.push(
    new Carte("none", 10, "Chaos", "$ha", "Trigger a random other ability")
  ); //+13
  listcards.push(
    new Carte("none", 10, "Chaos", "$ha", "Trigger a random other ability")
  ); //+13
  listcards.push(
    new Carte("none", 10, "Chaos", "$ha", "Trigger a random other ability")
  ); //+13
  listcards.push(
    new Carte("none", 10, "Chaos", "$ha", "Trigger a random other ability")
  ); //+13
  listcards.push(
    new Carte("none", 10, "Chaos", "$ha", "Trigger a random other ability")
  ); //+13
  listcards.push(
    new Carte("none", 10, "Chaos", "$ha", "Trigger a random other ability")
  ); //+13
  listcards.push(
    new Carte("none", 10, "Chaos", "$ha", "Trigger a random other ability")
  ); //+13
  listcards.push(
    new Carte("none", 10, "Chaos", "$ha", "Trigger a random other ability")
  ); //+13
}
function createbasicdeck() {
  listabilities[0] = listcards[1];
  listabilities[1] = listcards[2];
  listabilities[2] = listcards[3];
  listabilities[3] = listcards[4];
  listabilities[4] = listcards[5];
  listabilities[5] = listcards[6];
  listabilities[6] = listcards[0]; //carte vide
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
    document.getElementsByClassName("de")[i].addEventListener("click", clickde);
  }
}
function clickde(event) {
  document.getElementById("grayscreen").style.visibility = "hidden";
  document.getElementById("grayscreen").style.zIndex = "35";
  document.getElementById("grayscreen").style.zIndex = "35";
  document.getElementById("messagecentral").style.zIndex = "0";
  for (let i = 0; i < 5; i++) {
    document.getElementsByClassName("deperso")[i].style.zIndex = "0";
  }

  let player = listpersos[ordrepersos[event.target.id.replace("de", "")]];
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
        document.getElementById("messagecentral").textContent = "Extra turn";
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
      if (char[0] == "+") {
        console.log("+");
        if (split[1].charAt(1) == "m") {
          player.atkmel++;
        }
        if (split[1].charAt(1) == "r") {
          player.atkran++;
        }
        if (split[1].charAt(1) == "h") {
          player.maxhp++;
          heal(player, 1);
        }
      }
      if (char[0] == "-") {
        console.log("-");
        if (split[1].charAt(1) == "m") {
          if (player.atkmel == 0) {
            document.getElementById("messagecentral").textContent =
              "Attack too low. Action cancelled";
            cantrip = 1;
            skipnextmessage = 1;
            return;
          }
          player.atkmel--;
        }
        if (split[1].charAt(1) == "r") {
          if (player.atkran == 0) {
            document.getElementById("messagecentral").textContent =
              "Range too low. Action cancelled";
            cantrip = 1;
            skipnextmessage = 1;
            return;
          }
          player.atkran--;
        }
        if (split[1].charAt(1) == "h") {
          if (player.maxhp == 1) {
            document.getElementById("messagecentral").textContent =
              "Health too low. Action cancelled";
            cantrip = 1;
            skipnextmessage = 1;
            return;
          }
          player.maxhp--;
        }
      }
    }
  }

  afficherallcarte();

  specialseffectsafter(player, id);
  if (increaseturndelay > 0) {
    turndelay[player.id] = increaseturndelay + 1;
  }
  checkhps();
  afficherallperso(ordrepersos);
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
function specialseffectsbefore(player, id) {
  if (listcards[id].nom == "Perfect spot") {
    //"$m$r", "$h", "$zh$zc if $zp3", "$p3" //+8.4
    console.log("ps");
    if (ordrepersos[player.id] == 2) {
      heal(player, 1);
      cantrip = 1;
      diceavailable[player.id] = "n";
    }
  }
  if (listcards[id].nom == "Balanced attack") {
    //"$zm$zm$zm if $zp1 or $zp2", "$zr$zr$zr if $zp4 or $zp5" //+7.2
    console.log("ba");
    if (ordrepersos[player.id] == 0 || ordrepersos[player.id] == 1) {
      atkmel(player, 3);
    }
    if (ordrepersos[player.id] == 3 || ordrepersos[player.id] == 4) {
      atkran(player, 3);
    }
  }
  if (listcards[id].nom == "Central fight") {
    //"$m", "$zm$zr$zr if $zp2 or $zp3 or $zp4" //+8.4
    console.log("cf");
    if (
      ordrepersos[player.id] == 1 ||
      ordrepersos[player.id] == 2 ||
      ordrepersos[player.id] == 3
    ) {
      atkmel(player, 1);
      atkran(player, 2);
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
  let numberalreadyrolled = [];
  while (numberalreadyrolled.length < 5) {
    let i = 7 + Math.trunc(Math.random() * (listcards.length - 7));
    if (numberalreadyrolled.indexOf(i) === -1) {
      numberalreadyrolled.push(i);
    }
  }
  listabilities[7] = listcards[numberalreadyrolled[0]];
  listabilities[8] = listcards[numberalreadyrolled[1]];
  listabilities[9] = listcards[numberalreadyrolled[2]];
  listabilities[10] = listcards[numberalreadyrolled[3]];
  listabilities[11] = listcards[numberalreadyrolled[4]];

  document.getElementById("extratext").style.visibility = "visible";
  document.getElementById("grayscreen").style.visibility = "visible";
  document.getElementById("grayscreen").style.zIndex = "50";
  for (let i = 1; i < 6; i++) {
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
  affichercarte(10);
  affichercarte(11);
}
function skipcard() {
  extrahidden();
  cardchosen = 1;
  changecarddeck(6); //change into trash card
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

  //WEIRD 'BUG'
  //console.log(split);
  /*
  try {
    nbrbombs[nbr] = split[1].length + 1;
  } catch {
    try{
    nbrbombs[nbr] = split[0].length + 1;
  }
  catch{
    nbrbombs[nbr] = 0;
  }
  }*/
  /*
  console.log("#")
  console.log(split)
  console.log(nbrbombs)
  try {
    split[1];
    nbrbombs[nbr] = split[1].length + 1;
  }
  catch{
    nbrbombs[nbr] = 0;
  }
  console.log(nbrbombs)*/

  //WEIRD 'BUG'
  afficherallperso(ordrepersos);
  afficherallcarte();
  cardchosen = 0;
  document.getElementById("grayscreen").style.visibility = "hidden";
  document.getElementById("messagecentral").textContent = "Next fight";
  for (i = 7; i < 12; i++) {
    listabilities[i] = listabilities[6];
    listabilities[i].effect1 = "";
    listabilities[i].effect2 = "";
    listabilities[i].effect3 = "";
    listabilities[i].effect4 = "";
    listabilities[i].effect5 = "";
  }
}

/* Skip turn */
document.getElementById("skip").addEventListener("click", skipturn);
function skipturn() {
  turndelaydecrease();
  findutour();
}

/* Disable colors */
let disablecolors = 0;
document
  .getElementById("disablecolors")
  .addEventListener("click", disablecolor);
function disablecolor() {
  disablecolors = 1;
  document.getElementById("disablecolors").style.visibility = "hidden";
  afficherallcarte();
}
