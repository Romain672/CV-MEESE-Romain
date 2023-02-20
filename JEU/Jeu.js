let nombrepersonnesdepart = 6;
let listpersons = [];
let personnageactif = -1;
let variable = 0;
let difficulty = 14;
let cadreinit = [];
let fuite = 0;
let fuiteactif;

//debut: generation
window.addEventListener("load", createstats);
function createstats() {
  //ennemi
  listpersons.unshift(newpersonnage(difficulty, "enemy"));
  afficherpersonnage(listpersons[0], document.getElementById("ennemi"));
  afficherareneennemi();

  //joueur
  for (let i = 1; i < nombrepersonnesdepart + Number(1); i++) {
    listpersons[i] = newpersonnage(24, "ally");
    afficherpersonnage(listpersons[i],document.getElementById("personne" + [i]));
    document.getElementById("personne"+i).addEventListener("drop", dropacard);
  }

  document.getElementById("personnageactif").innerHTML = "No person selected.";

  //icon player default
  afficherarenejoueur(0);
}

//combat
document.getElementById("buttonfight").addEventListener("click", buttonfight);
function buttonfight() {
  //combattre
  if (personnageactif>-1){
    combat();
  } else {
    document.getElementById("logs").prepend("Erreur: no person selected.");
    document.getElementById("logs").prepend(document.createElement("br"));
    return;
  }
  let joueur = listpersons[personnageactif];
  if (fuite>0){
    return;
  }
  if (joueur.currenthp > 0) {
    //VICTOIRE
    //HEAL *4 OVERWRITED HERE
    document
      .getElementById("logs")
      .prepend("Victory, heal of 💗" + joueur.regen *4);
    joueur.currenthp = joueur.currenthp + joueur.regen *4;
    if (joueur.currenthp > joueur.hp) {
      joueur.currenthp = joueur.hp;
    }
    document.getElementById("logs").prepend(document.createElement("br"));
    //rafraichissement
    afficherpersonnage(joueur,document.getElementById("personne"+personnageactif));
    afficherpersonnage(joueur,document.getElementById("personnageactif"));
    afficherarenejoueur(personnageactif);
    //nouvel allié
    listpersons[listpersons.length] = newpersonnage(24);
    afficherpersonnage(listpersons[listpersons.length-1],document.getElementById("personne" + [listpersons.length-1])
    );
    document.getElementById("personne"+[listpersons.length-1]).addEventListener("drop", dropacard);

    //nouvel ennemi
    difficulty++;
    listpersons.shift();
    listpersons.unshift(newpersonnage(difficulty, "enemy"));
    afficherpersonnage(listpersons[0], document.getElementById("ennemi"));

    //icon ennemi
    afficherareneennemi();
  } else {
    //DEFAITE
    document.getElementById("logs").prepend("Defeat :(");
    document.getElementById("logs").prepend(document.createElement("br"));
    supprimerpersonnage(personnageactif);
    document.getElementById("personnageactif").innerHTML = "No person selected.";
    personnageactif = -1;
  }

  //nouvelle carte
  document.getElementById("logs").prepend("New card.");
  createcard();
}

//change joueur actif
document.getElementById("coulisses").addEventListener("click", clickonroaster);
function clickonroaster(e) {
  let test = e.target.id.replace("textpersonne","").replace("personne","").replace("statsprincipales","").replace("statssecondaires","");
  if (test=="coulisses"){
    return;
  }
  personnageactif = test;
  afficherpersonnage(listpersons[personnageactif],document.getElementById("personnageactif"));

  //icon player default
  afficherarenejoueur(personnageactif);
}

//// BACK v

function afficherarenejoueur(number) {
  statstransform(listpersons[number]);
  document.getElementById("iconplayer").innerHTML =
    "<img src='../CV/Icones/" +
    listpersons[number].avatar +
    "' alt='icone age' class='icon'>";
  document.getElementById("hpplayer").innerHTML =
    Math.floor(listpersons[number].currenthp) +
    "/" +
    Math.floor(listpersons[number].hp);
    statstransformback(listpersons[number]);
}

function afficherareneennemi() {
  statstransform(listpersons[0]);
  document.getElementById("iconennemi").innerHTML =
    "<img src='../CV/Icones/" +
    listpersons[0].avatar +
    "' alt='icone age' class='icon'>";

  document.getElementById("hpennemi").innerHTML =
    Math.floor(listpersons[0].currenthp) + "/" + Math.floor(listpersons[0].hp);
  statstransformback(listpersons[0]);
}

document.getElementById("help").addEventListener("click", help);
function help(){
  alert("Choses intéressantes du point de vue code:\nGénération aléatoire des personnages, icones, noms, et statistiques.\nMettre la souris sur les personnages en haut à gauche.\nCliquer déposer sur les cartes en bas (avec des choses qui 's'illuminent').\nCliquer sur un personnage puis sur fight pour afficher des logs.\nAprès un combat réussi, ajout de personnages, cartes, génération d'un nouvel ennemi plus fort.\n\n------------------------------------\n\nVous avez des unités cliquable en haut à gauche que vous pouvez choisir pour combattre dans l'arène. Un ennemi en haut à droite est prêt à l'affronter.\n\nPour les faire combattre, il suffit de sélectionner un personnage et de cliquer sur 'fight' (des logs apparaitront qui se lisent de bas en haut).\n\nDe plus, vous disposez de cartes en bas que vous pouvez glisser et déposer jusqu'à vos personnages pour les améliorer\.\n\nL'une des abilités les plus importantes (en gameplay) est la fuite 💤\. Si vous réussissez le jeu de dé lors d'un combat, vous avez la possibilité de choisir un autre personnage pour effectuer la suite du combat\.\n\nUn combat réussi vous donne des cartes en plus, un personnage de plus, et un autre ennemi aléatoire un peu plus fort que le précédent\.\n\nIl n'y a pas de condition de victoire pour le moment.\n\nJe crois que 2 ou 3 effets sur les dix des cartes ne marche pas/ne marche pas totalement.\n\:)");
  //alert("Welcome to the game\.\nOn the left, you got some units ready to fight\. When you click on one of them, they will be ready to fight on the Arena, present on the right\.\nOn the right, you got a an ennemy you must kill, and a button fight to make your selected person and the enemy fight\.\n\nThe goal is to survive as many fights as possible\.\n\nEach character have 4 main stats: 💪strength, 🛡️defense, 💨speed, and 🪄magic.\nEach point of 💪 give you ⚔️+1 minimum damage, ⚔️+3 maximum damage, 🎯+5 precision.\nEach point of 🛡️defense give you 💖+3hp, 🦺+1 armor, 👣+5dodge.\nEach point of 💨speed give you 📕many point of initiative to start the first turn, 🔃+6% chance to play again after your turn, 👈+12% chance to inflict 4 direct damage to the opponent when he misses.\nEach point of 🪄Magic give you 📈+1/3 of scaling (without effect atm), 💗+4 heal when you kill the ennemy, 💤+3% chance to be able to flee the combat.\n\nWhen you kill an ennemy, you gain a new person. When you get killed, you lose that character.\n\nWhen you start a fight, the highest 📕 start. Then we compare 🎯with 🎲-ennemy👣. If it's superior the attack is succesful: the active player deal ⚔️-🦺 in 💖damage to the other player. If he kill it, the active player win. If the initial attack failed, we instead compare ennemy👈 with 🎲, and if it's higher, the active player take 4 damages. Then if the active player is yourself, you got a chance to 💤. If you success, you can either ignore it by fighting again (will be as if the roll was failed), or change the active player (the 📕 will be rolled again). Then we compare 🔃 with 🎲 to maybe make the active player play again. And we repeat until a winner or a flee.\n\nAfter a kill, you heal💗 some of your hp, gain another person, and create a new ennemy with the sum of his stats being one higher.\nHave fun.");
}

let personnage = {
  //noms
  avatar: "age.svg",
  nom: "noname",
  //stats principales
  attaque: 0,
  defense: 0,
  vitesse: 0,
  magie: 0,
  //attaque
  mindmg: 0,
  maxdmg: 0,
  precision: 0,
  //defense
  hp: 0,
  currenthp: 0,
  armor: 0,
  dodge: 0,
  //vitesse
  initiative: 0,
  extratour: 0,
  riposte: 0,
  //magie
  combo: 0,
  regen: 0,
  fuite: 0,
};

function Personnage(
  a,
  b,
  d,
  e,
  f,
  g,
  h,
  i,
  j,
  k,
  l,
  m,
  n,
  o,
  p,
  q,
  r,
  s,
  t,
) {
  this.avatar = a;
  this.nom = b;
  this.attaque = d;
  this.defense = e;
  this.vitesse = f;
  this.magie = g;
  this.mindmg = h;
  this.maxdmg = i;
  this.precision = j;
  this.hp = k;
  this.currenthp = l;
  this.armor = m;
  this.dodge = n;
  this.initiative = o;
  this.extratour = p;
  this.riposte = q;
  this.combo = r;
  this.regen = s;
  this.fuite = t;
}

let nombrepersonnagesvivant = 0;
function newpersonnage(skills, text = "ally") {
  nombrepersonnagesvivant++;
  let i = listpersons.length;
  variable = i;

  if (text != "enemy") {
    cadreinit[i] = "<div id='personne" + [i] + "' class='personne'></div>";
    document.getElementById("coulisses").insertAdjacentHTML("beforeend", cadreinit[i]);
  }

  //noms
  let avatar = randomavatar();
  let name = generaterandomname();
  //stats principales
  let attaque = 0;
  let defense = 0;
  let vitesse = 0;
  let magie = 0;
  for (let i = 0; i < skills; i++) {
    let nbr;
    if (text == "enemy") {
       nbr = Math.floor(Math.random() * 3);
    } else {
       nbr = Math.floor(Math.random() * 4);
    }
    if (nbr == 0) {
      attaque++;
    }
    if (nbr == 1) {
      defense++;
    }
    if (nbr == 2) {
      vitesse++;
    }
    if (nbr == 3) {
      magie++;
    }
  }
  //attaque
  let mindmg = attaque;
  let maxdmg = attaque;
  let precision = attaque;
  //defense
  let hp = defense;
  let currenthp = defense;
  let armor = defense;
  let dodge = defense;
  //vitesse
  let initiative = vitesse;
  let extratour = vitesse;
  let riposte = vitesse;
  //magie
  let combo = magie;
  let regen = magie;
  let fuite = magie;

  return new Personnage(
    avatar,
    name,
    attaque,
    defense,
    vitesse,
    magie,
    mindmg,
    maxdmg,
    precision,
    hp,
    currenthp,
    armor,
    dodge,
    initiative,
    extratour,
    riposte,
    combo,
    regen,
    fuite
  );
}

function supprimerpersonnage(personnageactif) {
  listpersons.splice(personnageactif, 1);
  document.getElementById("personne" + personnageactif).remove();
  let nbr = Number(personnageactif) + Number(1);
  let len = listpersons.length + 1;
  for (let i = nbr; i < len; i++) {
    document.getElementById(["personne" + i]).id = "personne" + [i - 1];
    document.getElementById(["textpersonne" + i]).id = "textpersonne" + [i - 1];
  }
}

function afficherpersonnage(moi, element) {
  statstransform(moi);
  element.innerHTML =
    "<span id='textpersonne" +
    variable +
    "' class='textpersonne'><img src='../CV/Icones/" +
    moi.avatar +
    "' alt='icone age' class='icon'>" +
    moi.nom +
    ": ❤️‍🩹" +
    moi.currenthp +
    "<br>" +
    "<span id='statsprincipales" +
    variable +
    "' class='statsprincipales'>💪" +
    moi.attaque +
    " 🛡️" +
    moi.defense +
    " 💨" +
    moi.vitesse +
    " 🪄" +
    moi.magie +
    "</span><br><span id='statssecondaires" +
    variable + 
    "' class='statssecondaires'>" +
    "💪 ⚔️" +
    moi.mindmg +
    "~" +
    moi.maxdmg +
    " 🎯" +
    moi.precision +
    "<br>" +
    "🛡️ 💖" +
    moi.hp +
    " 🦺" +
    moi.armor +
    " 👣" +
    moi.dodge +
    "<br>" +
    "💨 📕" +
    moi.initiative +
    " 🔃" +
    moi.extratour +
    " 👈" +
    moi.riposte +
    "<br>" +
    "🪄 📈" +
    moi.combo +
    " 💗" +
    moi.regen +
    " 💤" +
    moi.fuite +
    "<br></span></span>";
    statstransformback(moi);
}

function statstransform(moi) {
  //attaque
  moi.mindmg = 5 + moi.mindmg;
  moi.maxdmg = 6 + 3 * moi.maxdmg;
  moi.precision = 60 + 5* moi.precision;
  //defense
  moi.hp = 20 + 3* moi.hp;
  moi.currenthp = 20 + 3* moi.currenthp;
  //moi.armor = moi.armor;
  moi.dodge = 5 * moi.dodge;
  //vitesse
  //moi.initiative = moi.initiative;
  moi.extratour = moi.extratour * 6;
  moi.riposte = moi.riposte * 12;
  //magie
  moi.combo = moi.combo;
  moi.regen = moi.regen * 4;
  moi.fuite = moi.fuite * 3;
}

function statstransformback(moi) {
  //attaque
  moi.mindmg = moi.mindmg - 5;
  moi.maxdmg = (moi.maxdmg - 6) /3
  moi.precision = (moi.precision - 60) /5;
  //defense
  moi.hp = (moi.hp - 20) /3;
  moi.currenthp = (moi.currenthp - 20) /3;
  //moi.armor = moi.armor;
  moi.dodge = moi.dodge /5;
  //vitesse
  //moi.initiative = moi.initiative;
  moi.extratour = moi.extratour / 6;
  moi.riposte = moi.riposte / 12;
  //magie
  moi.combo = moi.combo;
  moi.regen = moi.regen / 4;
  moi.fuite = moi.fuite / 3;
}


//COMBAT
function combat(){
  statstransform(listpersons[personnageactif]);
  statstransform(listpersons[0]);
  combat2();
  statstransformback(listpersons[0]);
  statstransformback(listpersons[personnageactif]);
  afficherpersonnage(listpersons[personnageactif],document.getElementById("personne"+personnageactif));
  afficherpersonnage(listpersons[personnageactif],document.getElementById("personnageactif"));
  afficherarenejoueur(personnageactif - 1);
  afficherareneennemi();
}
function combat2() {
  let logs = document.getElementById("logs");
  let j = [];
  let joueur = listpersons[personnageactif];
  let ennemi = listpersons[0];
  let actif;
  j[0] = joueur;
  j[1] = ennemi;

  //empty the logs
  logs.innerHTML = "";

  //début
  if (fuite == 0 || personnageactif != fuite) {
    logs.prepend(document.createElement("br"));
    logs.prepend(document.createElement("br"));
    logs.prepend(document.createElement("br"));
    logs.prepend(document.createElement("br"));
    logs.prepend(document.createElement("br"));
    logs.prepend("Start of combat:");
    logs.prepend(document.createElement("br"));
    //initiative
    if (joueur.initiative < ennemi.initiative) {
      logs.prepend("Enemy start");
      actif = 1;
    } else {
      if (joueur.initiative > ennemi.initiative) {
        logs.prepend("Player start");
        actif = 0;
      } else {
        random = Math.floor(Math.random() * 100);
        if (random > 49) {
          logs.prepend(" >49: Player start");
          actif = 0;
        } else {
          logs.prepend(" <50: Ennemy start");
          actif = 1;
        }
        logs.prepend("Initiatives equals: 🎲" + random);
      }
    }
    logs.prepend(
      "📕 Intiatives: " + joueur.initiative + " vs " + ennemi.initiative + ": "
    );
    logs.prepend(document.createElement("br"));
  } else {
    //==>
    actif = fuiteactif;
    logs.prepend("Fuite non effectuée");
    logs.prepend(document.createElement("br"));
    random = Math.floor(Math.random() * 100);
    if (j[actif].extratour > random) {
      logs.prepend("Extra turn");
    } else {
      logs.prepend("Turn of other player");
      actif = (actif + 1) % 2;
    }
    logs.prepend("🔃 Tour suivant: 🔃" + j[actif].extratour + " vs 🎲" + random + " : ");
    logs.prepend(document.createElement("br"));

    /*
      📈3   12
      */

    logs.prepend(document.createElement("br"));
    //<==
  }
  fuite = 0;

  while (1) {
    logs.prepend(document.createElement("br"));
    if (actif == 0) {
      logs.prepend(" (player):");
    } else {
      logs.prepend(" (enemy):");
    }
    logs.prepend("Turn of " + j[actif].nom);
    logs.prepend(document.createElement("br"));

    //précision & dodge
    let random = Math.floor(Math.random() * 100);
    let degats;

    if (j[actif].precision < random + j[[(actif + 1) % 2]].dodge) {
      logs.prepend("Missed");
    logs.prepend(
      "🎯" +
        j[actif].precision +
        " vs 👣" +
        j[[(actif + 1) % 2]].dodge +
        " + 🎲" +
        random +
        ": "
    );
      //riposte
      random = Math.floor(Math.random() * 100);
      logs.prepend(document.createElement("br"));

      if (random > j[[(actif + 1) % 2]].riposte) {
        logs.prepend("miss");
      } else {
        j[actif].currenthp = j[actif].currenthp - 4;
        logs.prepend(
          "Success, riposte of -4hp: 💖" + j[[actif]].currenthp + " left."
        );
      }
      
      logs.prepend("Riposte 👈" + j[[(actif + 1) % 2]].riposte + " vs 🎲" + random + ": ");

    } else {
      logs.prepend(" success");
      logs.prepend(
        "🎯" +
          j[actif].precision +
          " vs 👣" +
          j[[(actif + 1) % 2]].dodge +
          " + 🎲" +
          random +
          ": "
      );
      logs.prepend(document.createElement("br"));
      //dégâts & armure
      random = Math.floor(
        Math.random() * (j[actif].maxdmg - j[actif].mindmg) + j[actif].mindmg
      );

      degats = random - j[[(actif + 1) % 2]].armor;
      logs.prepend(
        "Inflict ⚔️🎲" +
          random +
          "damage " +
          "- 🦺" +
          j[[(actif + 1) % 2]].armor +
          "armor"
      );
      logs.prepend(document.createElement("br"));
      if (degats > 0) {
        //currenthp
        j[[(actif + 1) % 2]].currenthp =
          j[[(actif + 1) % 2]].currenthp - degats;
        logs.prepend(
          degats +
            " damage inflicted: 💖" +
            j[[(actif + 1) % 2]].currenthp +
            " left."
        );

      } else {
        logs.prepend("All damages absorbed by the armor.");
      }
    }

    
    if (j[actif].currenthp < 1) {
      logs.prepend(document.createElement("br"));
      logs.prepend("Dead.");
      logs.prepend(document.createElement("br"));
      return;
    }

    logs.prepend(document.createElement("br"));

    //fuite
    if (actif == 0) {
      random = Math.floor(Math.random() * 100);
      if (j[actif].fuite > random) {
        logs.prepend(" successfull: you can now leave the fight:");
        logs.prepend("💤 Leak " + j[actif].fuite + " vs 🎲" + random);

        fuite = personnageactif;
        fuiteactif = actif;
        return;
      } else {
        logs.prepend(": failed");
        logs.prepend("💤 Leak " + j[actif].fuite + " vs 🎲" + random);
        logs.prepend(document.createElement("br"));
      }
    }

    //tour suivant
    random = Math.floor(Math.random() * 100);
     if (j[actif].extratour > random) {
      logs.prepend("Extra turn");
    } else {
      logs.prepend("Other player's turn");
      actif = (actif + 1) % 2;
    }
    logs.prepend(
      "Next turn: 🔃" + j[actif].extratour + " vs 🎲" + random + " : "
    );
    logs.prepend(document.createElement("br"));
  }
  
   /*
    📈
    */

  logs.prepend(document.createElement("br"));
}

//RANDOM X
function randomavatar() {
  var avatar = [
    "2vertical",
    "add",
    "age",
    "alarme",
    "anglais",
    "avion",
    "cerclemoitie",
    "chatbubbles",
    "cleamolette",
    "clef",
    "coeur",
    "contacts",
    "creations",
    "CV",
    "doublesigne",
    "etoilemoitie",
  ];
  var rand = Math.floor(Math.random() * avatar.length);
  return (rValue = avatar[rand].concat(".svg"));
}

function generaterandomname() {
  //generatzed with https://www.randomlists.com/random-first-names
  var name = [
    "Abbott",
    "Acevedo",
    "Acosta",
    "Adams",
    "Adkins",
    "Aguilar",
    "Aguirre",
    "Alexander",
    "Ali",
    "Allen",
    "Allison",
    "Alvarado",
    "Alvarez",
    "Andersen",
    "Anderson",
    "Andrade",
    "Andrews",
    "Anthony",
    "Archer",
    "Arellano",
    "Arias",
    "Armstrong",
    "Arnold",
    "Arroyo",
    "Ashley",
    "Atkins",
    "Atkinson",
    "Austin",
    "Avery",
    "Avila",
    "Ayala",
    "Ayers",
    "Bailey",
    "Baird",
    "Baker",
    "Baldwin",
    "Ball",
    "Ballard",
    "Banks",
    "Barajas",
    "Barber",
    "Barker",
    "Barnes",
    "Barnett",
    "Barr",
    "Barrera",
    "Barrett",
    "Barron",
    "Barry",
    "Bartlett",
    "Barton",
    "Bass",
    "Bates",
    "Bauer",
    "Bautista",
    "Baxter",
    "Bean",
    "Beard",
    "Beasley",
    "Beck",
    "Becker",
    "Bell",
    "Beltran",
    "Bender",
    "Benitez",
    "Benjamin",
    "Bennett",
    "Benson",
    "Bentley",
    "Benton",
    "Berg",
    "Berger",
    "Bernard",
    "Berry",
    "Best",
    "Bird",
    "Bishop",
    "Black",
    "Blackburn",
    "Blackwell",
    "Blair",
    "Blake",
    "Blanchard",
    "Blankenship",
    "Blevins",
    "Bolton",
    "Bond",
    "Bonilla",
    "Booker",
    "Boone",
    "Booth",
    "Bowen",
    "Bowers",
    "Bowman",
    "Boyd",
    "Boyer",
    "Boyle",
    "Bradford",
    "Bradley",
    "Bradshaw",
    "Brady",
    "Branch",
    "Brandt",
    "Braun",
    "Bray",
    "Brennan",
    "Brewer",
    "Bridges",
    "Briggs",
    "Bright",
    "Brock",
    "Brooks",
    "Brown",
    "Browning",
    "Bruce",
    "Bryan",
    "Bryant",
    "Buchanan",
    "Buck",
    "Buckley",
    "Bullock",
    "Burch",
    "Burgess",
    "Burke",
    "Burnett",
    "Burns",
    "Burton",
    "Bush",
    "Butler",
    "Byrd",
    "Cabrera",
    "Cain",
    "Calderon",
    "Caldwell",
    "Calhoun",
    "Callahan",
    "Camacho",
    "Cameron",
    "Campbell",
    "Campos",
    "Cannon",
    "Cantrell",
    "Cantu",
    "Cardenas",
    "Carey",
    "Carlson",
    "Carney",
    "Carpenter",
    "Carr",
    "Carrillo",
    "Carroll",
    "Carson",
    "Carter",
    "Case",
    "Casey",
    "Castaneda",
    "Castillo",
    "Castro",
    "Cervantes",
    "Chambers",
    "Chan",
    "Chandler",
    "Chaney",
    "Chang",
    "Chapman",
    "Charles",
    "Chase",
    "Chavez",
    "Chen",
    "Cherry",
    "Choi",
    "Christensen",
    "Christian",
    "Chung",
    "Church",
    "Cisneros",
    "Clark",
    "Clarke",
    "Clay",
    "Clayton",
    "Clements",
    "Cline",
    "Cobb",
    "Cochran",
    "Coffey",
    "Cohen",
    "Cole",
    "Coleman",
    "Collier",
    "Collins",
    "Colon",
    "Combs",
    "Compton",
    "Conley",
    "Conner",
    "Conrad",
    "Contreras",
    "Conway",
    "Cook",
    "Cooke",
    "Cooley",
    "Cooper",
    "Copeland",
    "Cordova",
    "Cortez",
    "Costa",
    "Cowan",
    "Cox",
    "Craig",
    "Crane",
    "Crawford",
    "Crosby",
    "Cross",
    "Cruz",
    "Cuevas",
    "Cummings",
    "Cunningham",
    "Curry",
    "Curtis",
    "Dalton",
    "Daniel",
    "Daniels",
    "Daugherty",
    "Davenport",
    "David",
    "Davidson",
    "Davies",
    "Davila",
    "Davis",
    "Dawson",
    "Day",
    "Dean",
    "Decker",
    "Delacruz",
    "Deleon",
    "Delgado",
    "Dennis",
    "Diaz",
    "Dickerson",
    "Dickson",
    "Dillon",
    "Dixon",
    "Dodson",
    "Dominguez",
    "Donaldson",
    "Donovan",
    "Dorsey",
    "Dougherty",
    "Douglas",
    "Downs",
    "Doyle",
    "Drake",
    "Duarte",
    "Dudley",
    "Duffy",
    "Duke",
    "Duncan",
    "Dunlap",
    "Dunn",
    "Duran",
    "Durham",
    "Dyer",
    "Eaton",
    "Edwards",
    "Elliott",
    "Ellis",
    "Ellison",
    "English",
    "Erickson",
    "Escobar",
    "Esparza",
    "Espinoza",
    "Estes",
    "Estrada",
    "Evans",
    "Everett",
    "Ewing",
    "Farley",
    "Farmer",
    "Farrell",
    "Faulkner",
    "Ferguson",
    "Fernandez",
    "Ferrell",
    "Fields",
    "Figueroa",
    "Finley",
    "Fischer",
    "Fisher",
    "Fitzgerald",
    "Fitzpatrick",
    "Fleming",
    "Fletcher",
    "Flores",
    "Flowers",
    "Floyd",
    "Flynn",
    "Foley",
    "Forbes",
    "Ford",
    "Foster",
    "Fowler",
    "Fox",
    "Francis",
    "Franco",
    "Frank",
    "Franklin",
    "Frazier",
    "Frederick",
    "Freeman",
    "French",
    "Frey",
    "Friedman",
    "Fritz",
    "Frost",
    "Fry",
    "Frye",
    "Fuentes",
    "Fuller",
    "Gaines",
    "Gallagher",
    "Gallegos",
    "Galloway",
    "Galvan",
    "Gamble",
    "Garcia",
    "Gardner",
    "Garner",
    "Garrett",
    "Garrison",
    "Garza",
    "Gates",
    "Gay",
    "Gentry",
    "George",
    "Gibbs",
    "Gibson",
    "Gilbert",
    "Giles",
    "Gill",
    "Gillespie",
    "Gilmore",
    "Glass",
    "Glenn",
    "Glover",
    "Golden",
    "Gomez",
    "Gonzales",
    "Gonzalez",
    "Good",
    "Goodman",
    "Goodwin",
    "Gordon",
    "Gould",
    "Graham",
    "Grant",
    "Graves",
    "Gray",
    "Green",
    "Greene",
    "Greer",
    "Gregory",
    "Griffin",
    "Griffith",
    "Grimes",
    "Gross",
    "Guerra",
    "Guerrero",
    "Gutierrez",
    "Guzman",
    "Haas",
    "Hahn",
    "Hale",
    "Haley",
    "Hall",
    "Hamilton",
    "Hammond",
    "Hampton",
    "Hancock",
    "Haney",
    "Hanna",
    "Hansen",
    "Hanson",
    "Hardin",
    "Harding",
    "Hardy",
    "Harmon",
    "Harper",
    "Harrell",
    "Harrington",
    "Harris",
    "Harrison",
    "Hart",
    "Hartman",
    "Harvey",
    "Hatfield",
    "Hawkins",
    "Hayden",
    "Hayes",
    "Haynes",
    "Hays",
    "Heath",
    "Hebert",
    "Henderson",
    "Hendricks",
    "Hendrix",
    "Henry",
    "Hensley",
    "Henson",
    "Herman",
    "Hernandez",
    "Herrera",
    "Herring",
    "Hess",
    "Hester",
    "Hickman",
    "Hicks",
    "Higgins",
    "Hill",
    "Hines",
    "Hinton",
    "Ho",
    "Hobbs",
    "Hodge",
    "Hodges",
    "Hoffman",
    "Hogan",
    "Holden",
    "Holder",
    "Holland",
    "Holloway",
    "Holmes",
    "Holt",
    "Hood",
    "Hooper",
    "Hoover",
    "Hopkins",
    "Horn",
    "Horne",
    "Horton",
    "House",
    "Houston",
    "Howard",
    "Howe",
    "Howell",
    "Huang",
    "Hubbard",
    "Huber",
    "Hudson",
    "Huerta",
    "Huff",
    "Huffman",
    "Hughes",
    "Hull",
    "Humphrey",
    "Hunt",
    "Hunter",
    "Hurley",
    "Hurst",
    "Hutchinson",
    "Huynh",
    "Ibarra",
    "Ingram",
    "Irwin",
    "Jackson",
    "Jacobs",
    "Jacobson",
    "James",
    "Jarvis",
    "Jefferson",
    "Jenkins",
    "Jennings",
    "Jensen",
    "Jimenez",
    "Johns",
    "Johnson",
    "Johnston",
    "Jones",
    "Jordan",
    "Joseph",
    "Joyce",
    "Juarez",
    "Kaiser",
    "Kane",
    "Kaufman",
    "Keith",
    "Keller",
    "Kelley",
    "Kelly",
    "Kemp",
    "Kennedy",
    "Kent",
    "Kerr",
    "Key",
    "Khan",
    "Kidd",
    "Kim",
    "King",
    "Kirby",
    "Kirk",
    "Klein",
    "Kline",
    "Knapp",
    "Knight",
    "Knox",
    "Koch",
    "Kramer",
    "Krause",
    "Krueger",
    "Lam",
    "Lamb",
    "Lambert",
    "Landry",
    "Lane",
    "Lang",
    "Lara",
    "Larsen",
    "Larson",
    "Lawrence",
    "Lawson",
    "Le",
    "Leach",
    "Leblanc",
    "Lee",
    "Leon",
    "Leonard",
    "Lester",
    "Levine",
    "Levy",
    "Lewis",
    "Li",
    "Lin",
    "Lindsey",
    "Little",
    "Liu",
    "Livingston",
    "Lloyd",
    "Logan",
    "Long",
    "Lopez",
    "Love",
    "Lowe",
    "Lowery",
    "Lozano",
    "Lucas",
    "Lucero",
    "Luna",
    "Lutz",
    "Lynch",
    "Lynn",
    "Lyons",
    "Macdonald",
    "Macias",
    "Mack",
    "Madden",
    "Maddox",
    "Mahoney",
    "Maldonado",
    "Malone",
    "Mann",
    "Manning",
    "Marks",
    "Marquez",
    "Marsh",
    "Marshall",
    "Martin",
    "Martinez",
    "Mason",
    "Massey",
    "Mata",
    "Mathews",
    "Mathis",
    "Matthews",
    "Maxwell",
    "May",
    "Mayer",
    "Maynard",
    "Mayo",
    "Mays",
    "Mcbride",
    "Mccall",
    "Mccann",
    "Mccarthy",
    "Mccarty",
    "Mcclain",
    "Mcclure",
    "Mcconnell",
    "Mccormick",
    "Mccoy",
    "Mccullough",
    "Mcdaniel",
    "Mcdonald",
    "Mcdowell",
    "Mcfarland",
    "Mcgee",
    "Mcgrath",
    "Mcguire",
    "Mcintosh",
    "Mcintyre",
    "Mckay",
    "Mckee",
    "Mckenzie",
    "Mckinney",
    "Mcknight",
    "Mclaughlin",
    "Mclean",
    "Mcmahon",
    "Mcmillan",
    "Mcneil",
    "Mcpherson",
    "Meadows",
    "Medina",
    "Mejia",
    "Melendez",
    "Melton",
    "Mendez",
    "Mendoza",
    "Mercado",
    "Mercer",
    "Merritt",
    "Meyer",
    "Meyers",
    "Meza",
    "Michael",
    "Middleton",
    "Miles",
    "Miller",
    "Mills",
    "Miranda",
    "Mitchell",
    "Molina",
    "Monroe",
    "Montes",
    "Montgomery",
    "Montoya",
    "Moody",
    "Moon",
    "Mooney",
    "Moore",
    "Mora",
    "Morales",
    "Moran",
    "Moreno",
    "Morgan",
    "Morris",
    "Morrison",
    "Morrow",
    "Morse",
    "Morton",
    "Moses",
    "Mosley",
    "Moss",
    "Moyer",
    "Mueller",
    "Mullen",
    "Mullins",
    "Munoz",
    "Murillo",
    "Murphy",
    "Murray",
    "Myers",
    "Nash",
    "Navarro",
    "Neal",
    "Nelson",
    "Newman",
    "Newton",
    "Nguyen",
    "Nichols",
    "Nicholson",
    "Nielsen",
    "Nixon",
    "Noble",
    "Nolan",
    "Norman",
    "Norris",
    "Norton",
    "Novak",
    "Nunez",
    "Obrien",
    "Ochoa",
    "Oconnell",
    "Oconnor",
    "Odom",
    "Odonnell",
    "Oliver",
    "Olsen",
    "Olson",
    "Oneal",
    "Oneill",
    "Orozco",
    "Orr",
    "Ortega",
    "Ortiz",
    "Osborn",
    "Osborne",
    "Owen",
    "Owens",
    "Pace",
    "Pacheco",
    "Padilla",
    "Page",
    "Palmer",
    "Park",
    "Parker",
    "Parks",
    "Parrish",
    "Parsons",
    "Patel",
    "Patrick",
    "Patterson",
    "Patton",
    "Paul",
    "Payne",
    "Pearson",
    "Peck",
    "Pena",
    "Pennington",
    "Perez",
    "Perkins",
    "Perry",
    "Peters",
    "Petersen",
    "Peterson",
    "Petty",
    "Pham",
    "Phelps",
    "Phillips",
    "Pierce",
    "Pineda",
    "Pittman",
    "Pitts",
    "Pollard",
    "Ponce",
    "Poole",
    "Pope",
    "Porter",
    "Potter",
    "Potts",
    "Powell",
    "Powers",
    "Pratt",
    "Preston",
    "Price",
    "Prince",
    "Proctor",
    "Pruitt",
    "Pugh",
    "Quinn",
    "Ramirez",
    "Ramos",
    "Ramsey",
    "Randall",
    "Randolph",
    "Rangel",
    "Rasmussen",
    "Ray",
    "Raymond",
    "Reed",
    "Reese",
    "Reeves",
    "Reid",
    "Reilly",
    "Reyes",
    "Reynolds",
    "Rhodes",
    "Rice",
    "Rich",
    "Richard",
    "Richards",
    "Richardson",
    "Richmond",
    "Riddle",
    "Riggs",
    "Riley",
    "Rios",
    "Ritter",
    "Rivas",
    "Rivera",
    "Rivers",
    "Roach",
    "Robbins",
    "Roberson",
    "Roberts",
    "Robertson",
    "Robinson",
    "Robles",
    "Rocha",
    "Rodgers",
    "Rodriguez",
    "Rogers",
    "Rojas",
    "Rollins",
    "Roman",
    "Romero",
    "Rosales",
    "Rosario",
    "Rose",
    "Ross",
    "Roth",
    "Rowe",
    "Rowland",
    "Roy",
    "Rubio",
    "Ruiz",
    "Rush",
    "Russell",
    "Russo",
    "Ryan",
    "Salas",
    "Salazar",
    "Salinas",
    "Sampson",
    "Sanchez",
    "Sanders",
    "Sandoval",
    "Sanford",
    "Santana",
    "Santiago",
    "Santos",
    "Saunders",
    "Savage",
    "Sawyer",
    "Schaefer",
    "Schmidt",
    "Schmitt",
    "Schneider",
    "Schroeder",
    "Schultz",
    "Schwartz",
    "Scott",
    "Sellers",
    "Serrano",
    "Sexton",
    "Shaffer",
    "Shah",
    "Shannon",
    "Sharp",
    "Shaw",
    "Shea",
    "Shelton",
    "Shepard",
    "Shepherd",
    "Sheppard",
    "Sherman",
    "Shields",
    "Short",
    "Silva",
    "Simmons",
    "Simon",
    "Simpson",
    "Sims",
    "Singh",
    "Singleton",
    "Skinner",
    "Sloan",
    "Small",
    "Smith",
    "Snow",
    "Snyder",
    "Solis",
    "Solomon",
    "Sosa",
    "Soto",
    "Sparks",
    "Spears",
    "Spence",
    "Spencer",
    "Stafford",
    "Stanley",
    "Stanton",
    "Stark",
    "Steele",
    "Stein",
    "Stephens",
    "Stephenson",
    "Stevens",
    "Stevenson",
    "Stewart",
    "Stokes",
    "Stone",
    "Stout",
    "Strickland",
    "Strong",
    "Stuart",
    "Suarez",
    "Sullivan",
    "Summers",
    "Sutton",
    "Swanson",
    "Sweeney",
    "Tanner",
    "Tapia",
    "Tate",
    "Taylor",
    "Terrell",
    "Terry",
    "Thomas",
    "Thompson",
    "Thornton",
    "Todd",
    "Torres",
    "Townsend",
    "Tran",
    "Travis",
    "Trevino",
    "Trujillo",
    "Tucker",
    "Turner",
    "Tyler",
    "Underwood",
    "Valdez",
    "Valencia",
    "Valentine",
    "Valenzuela",
    "Vance",
    "Vang",
    "Vargas",
    "Vasquez",
    "Vaughan",
    "Vaughn",
    "Vazquez",
    "Vega",
    "Velasquez",
    "Velazquez",
    "Velez",
    "Villa",
    "Villanueva",
    "Villarreal",
    "Villegas",
    "Vincent",
    "Wade",
    "Wagner",
    "Walker",
    "Wall",
    "Wallace",
    "Waller",
    "Walls",
    "Walsh",
    "Walter",
    "Walters",
    "Walton",
    "Wang",
    "Ward",
    "Ware",
    "Warner",
    "Warren",
    "Washington",
    "Waters",
    "Watkins",
    "Watson",
    "Watts",
    "Weaver",
    "Webb",
    "Weber",
    "Webster",
    "Weeks",
    "Weiss",
    "Welch",
    "Wells",
    "Werner",
    "West",
    "Wheeler",
    "Whitaker",
    "White",
    "Whitehead",
    "Whitney",
    "Wiggins",
    "Wilcox",
    "Wiley",
    "Wilkerson",
    "Wilkins",
    "Wilkinson",
    "Williams",
    "Williamson",
    "Willis",
    "Wilson",
    "Winters",
    "Wise",
    "Wolf",
    "Wolfe",
    "Wong",
    "Wood",
    "Woodard",
    "Woods",
    "Woodward",
    "Wright",
    "Wu",
    "Wyatt",
    "Yang",
    "Yates",
    "Yoder",
    "York",
    "Young",
    "Yu",
    "Zamora",
    "Zavala",
    "Zhang",
    "Zimmerman",
    "Zuniga",
  ];
  var rand = Math.floor(Math.random() * name.length);
  return (rValue = name[rand]);
}

/*

  //attaque
  let mindmg = 5 + attaque;
  let maxdmg = 6 + 3 * attaque;
  let precision;
  precision = 60 + 5 * attaque;
  //defense
  let nbr = 20 + 3 * defense;
  let hp = nbr;
  let currenthp = nbr;
  let armor = defense;
  let dodge = 5 * defense;
  //vitesse
  let initiative = vitesse * 5 + defense * 2 + magie;
  let extratour;
  if (vitesse < 14) {
    extratour = vitesse * 6;
  } else {
    extratour = 80;
  }
  let riposte;
  if (vitesse < 9) {
    riposte = vitesse * 12;
  } else {
    riposte = 100;
  }
  //magie
  let combo = Math.floor(magie/3);
  let regen = magie * 4;
  let fuite = magie * 3;
  */