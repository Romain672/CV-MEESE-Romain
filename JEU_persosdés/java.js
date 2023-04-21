let listpersos = [];
let listabilities = [10]; //7ème card is empty, 8/9/10ème are for choices
let listcards = [];
let ordrepersos = [0,1,2,3,4,5];
let diceavailable = ["y","y","y","y","y"];
let turndelay = [0,0,0,0,0,0];
let ennemy=5;

window.addEventListener("load", onload);
function onload() {
    generatepersos();
    generatecards();
    createbasicdeck();
    afficherallcarte();
    document.getElementById("grayscreen").style.height = document.body.scrollHeight + 20 + "px";
    document.getElementById("grayscreen").style.visibility = "visible";
    document.getElementById("grayscreen").style.zIndex = "35";
    document.getElementById("messagecentral").textContent="Select a dice to play, the corresponding card below will take effect";
    document.getElementById("messagecentral").style.zIndex = "40";

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
}
function Personnage(a, b, c, d, e, f, g, h) {
    this.avatar = a;
    this.nom = b;
    this.id = c;
    this.de = d;
    this.currenthp = e;
    this.maxhp = f;
    this.atkmel = g;
    this.atkran = h;
}
var des = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "🔁"]; //1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣🔀🔢🔁
function afficherperso(element, id) {
    let children = element.children;
    if(id==0){
        element.style.backgroundColor = "navy";
    }
    if(id==1){
        element.style.backgroundColor = "green";
    }
    if(id==2){
        element.style.backgroundColor = "darkolivegreen";
    }
    if(id==3){
        element.style.backgroundColor = "darkgreen";
    }
    if(id==4){
        element.style.backgroundColor = "darkslategray";
    }
    children[0].textContent = listpersos[id].nom;
    children[2].textContent = "💖".concat((listpersos[id].currenthp.toString()).concat("/").concat(listpersos[id].maxhp.toString()));
    
    if (id<5){
        if (turndelay[id]!=0){
            let nbr=turndelay[id];
            if (nbr==1){
                children[1].textContent = "⌛";
            }
            if (nbr==2){
                children[1].textContent = "⌛²";
            }
            if (nbr==3){
                children[1].textContent = "⌛³";
            }
            if (nbr==4){
                children[1].textContent = "⌛⁴";
            }
            if (nbr==5){
                children[1].textContent = "⌛⁵";
            }
            if (nbr==6){
                children[1].textContent = "⌛⁶";
            }
            if (nbr==7){
                children[1].textContent = "⌛⁷";
            }
            if (nbr==8){
                children[1].textContent = "⌛⁸";
            }
            if (nbr>8){
                children[1].textContent = "⌛⁹";
            }
            listpersos[ordrepersos[ordrepersos.indexOf(id)]].de = "7" ;
        }  else {
            if(diceavailable[id]=="n"){
                children[1].textContent = "🔁";
                listpersos[ordrepersos[ordrepersos.indexOf(id)]].de = "7" ;
            } else {
                children[1].textContent = des[listpersos[id].de-1];
            }
        }        

        children[3].textContent = "⚔️".concat(listpersos[id].atkmel).concat(" - ").concat("🏹".concat(listpersos[id].atkran));
    } else{
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
function generatepersos(){
    //ally
    listpersos[0] = new Personnage("none","Albert",0,0,14,14,2,1);
    listpersos[1] = new Personnage("none","Bernard",1,0,10,10,4,1);
    listpersos[2] = new Personnage("none","Catherine",2,0,10,10,3,2);
    listpersos[3] = new Personnage("none","Derick",3,0,6,6,4,4);
    listpersos[4] = new Personnage("none","Elise",4,0,6,6,1,6);
    //ennemy
    listpersos[5] = new Personnage("🐀","Ratatouille",5,0,8,8,3);
    listpersos[6] = new Personnage("🐤","Piou",6,0,12,12,4);
    listpersos[7] = new Personnage("🐧","Siffli",7,0,16,16,5);
    listpersos[8] = new Personnage("🐈","Garfield",8,0,20,20,6);
    listpersos[9] = new Personnage("🐒","Abu",9,0,24,24,7);
    listpersos[10] = new Personnage("🐺","Fenrir",10,0,28,28,8);
    listpersos[11] = new Personnage("🐄","Abigaëlle",11,0,32,32,9);
    listpersos[12] = new Personnage("🐎","Pégase",12,0,36,36,10);
    listpersos[13] = new Personnage("🐻","Teddy",13,0,40,40,11);
    listpersos[14] = new Personnage("🐘","Dumbo",14,0,44,44,12);
}

/* Cartes */
let carte = {
    avatar: "none",
    nom: "none",
    id: 0,
    effect1:"",
    effect2:"",
    effect3:"",
    effect4:"",
    effect5:"",
}
function Carte(a, b, c, d, e, f, g, h) {
    this.avatar = a;
    this.nom = b;
    this.id = c;
    this.effect1 = d;
    this.effect2 = e;
    this.effect3 = f;
    this.effect4 = g;
    this.effect5 = h;
}
function affichercarte(id) {
    //$h|$ha=💖 | $c=🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸 | $t=⌛
    let children;
    if(document.getElementById("carte"+id) != null){
        children = document.getElementById("carte"+id).children;
    }else{
        children = document.getElementById("carteextra"+id).children;
    }
    //children[0]: intro
    children[1].textContent = listabilities[id].nom;
    children[2].textContent = listabilities[id].effect1.replaceAll("$ha","💕").replaceAll("$h","💖").replaceAll("$c","🔁").replaceAll("$m","⚔️").replaceAll("$r","🏹").replaceAll("$p","🚶‍♂️").replaceAll("$s","🩸").replaceAll("$t","⌛");
    if(listabilities[id].effect2 != undefined){
        children[3].textContent = listabilities[id].effect2.replaceAll("$ha","💕").replaceAll("$h","💖").replaceAll("$c","🔁").replaceAll("$m","⚔️").replaceAll("$r","🏹").replaceAll("$p","🚶‍♂️").replaceAll("$s","🩸").replaceAll("$t","⌛");
    } else {
        children[3].textContent = "";
    }
    if(listabilities[id].effect3 != undefined){
        children[4].textContent = listabilities[id].effect3.replaceAll("$ha","💕").replaceAll("$h","💖").replaceAll("$c","🔁").replaceAll("$m","⚔️").replaceAll("$r","🏹").replaceAll("$p","🚶‍♂️").replaceAll("$s","🩸").replaceAll("$t","⌛");
    } else {
        children[4].textContent = "";
    }
    if(listabilities[id].effect4 != undefined){
        children[5].textContent = listabilities[id].effect4.replaceAll("$ha","💕").replaceAll("$h","💖").replaceAll("$c","🔁").replaceAll("$m","⚔️").replaceAll("$r","🏹").replaceAll("$p","🚶‍♂️").replaceAll("$s","🩸").replaceAll("$t","⌛");
    } else {
        children[5].textContent = "";
    }
    if(listabilities[id].effect5 != undefined){
        children[6].textContent = listabilities[id].effect5.replaceAll("$ha","💕").replaceAll("$h","💖").replaceAll("$c","🔁").replaceAll("$m","⚔️").replaceAll("$r","🏹").replaceAll("$p","🚶‍♂️").replaceAll("$s","🩸").replaceAll("$t","⌛");
    } else {
        children[6].textContent = "";
    }
}
function afficherallcarte(){
    affichercarte(0);
    affichercarte(1);
    affichercarte(2);
    affichercarte(3);
    affichercarte(4);
    affichercarte(5);
}
let maxidcard = 56;
function generatecards(){
    //$h=💖 |$ha=💕 | $c=🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸 | $t=⌛
    //+1    |  +4    |  +6   |   +3  |   +3   |   0    |  -1   |  -2   =  +9
    //Trash
    listcards.push(new Carte("none","none", 0, "$s$h$c"));
    //Starting deck (=+6 instead of +9)
    listcards.push(new Carte("none","Fast heal", 1, "$h","$c")); //+7
    listcards.push(new Carte("none","Heal & Attack", 2, "$h$h$h", "$m")); //+6
    listcards.push(new Carte("none","Double attack", 3,"$m$r")); //+6
    listcards.push(new Carte("none","Double strike", 4, "$m$m", "$p>")); //+6
    listcards.push(new Carte("none","Longshot", 5, "$r$r", "$p<")); //+6
    listcards.push(new Carte("none","Run forward", 6,"$c", "$p1")); //+6
    //Normal: triples
    listcards.push(new Carte("none","Triple strike", 7,"$m$m$m", "$p>")); //+9
    listcards.push(new Carte("none","Long attack", 8,"$m$m$r", "$p>")); //+9
    listcards.push(new Carte("none","Small attack", 9,"$m$r$r")); //+9
    listcards.push(new Carte("none","Sniping", 10,"$r$r$r", "$p<")); //+9
    listcards.push(new Carte("none","Strike & Heal", 11,"$m$m","$h$h$h", "$p>")); //+9
    listcards.push(new Carte("none","Attack & Heal", 12,"$m$r","$h$h$h")); //+9
    listcards.push(new Carte("none","Snipe & Heal", 13,"$r$r","$h$h$h", "$p<")); //+9
    //Normal extras
    listcards.push(new Carte("none","Drain life", 14,"$m","$h$h$h$h$h$h$h", "$p>")); //+10
    listcards.push(new Carte("none","Boomerang heal", 15,"$r","$h$h$h$h$h$h$h", "$p5")); //+10
    listcards.push(new Carte("none","Big heal", 16,"$h$h$h$h$h$h$h$h$h$h$h$h$h$h")); //+14
    //Self sacrifice
    listcards.push(new Carte("none","Quadruple shot", 17,"$r$r$r$r","$s$s$s","$p4")); //+9
    //$c
    listcards.push(new Carte("none","Heal & Retreat", 18,"$h$h$h", "$c", "$p5")); //+9
    listcards.push(new Carte("none","Quick draw", 19,"$r", "$c")); //+9
    listcards.push(new Carte("none","Quick attack", 20,"$m", "$c")); //+9
    //Delay damage
    listcards.push(new Carte("none","Quadruple strike", 21,"$m$m$m$m", "$t", "$p>")); //+10
    listcards.push(new Carte("none","Longest attack", 22,"$m$m$m$r", "$t", "$p>")); //+10
    listcards.push(new Carte("none","Heavy attack", 23,"$m$m$r$r", "$t")); //+10
    listcards.push(new Carte("none","Great shot", 24,"$m$r$r$r", "$t", "$p<")); //+10
    listcards.push(new Carte("none","Sniping hard", 25,"$r$r$r$r", "$t", "$p<")); //+10
    //Delay damage+heal
    listcards.push(new Carte("none","Timeal strike", 26, "$m$m$m", "$h$h", "$t", "$p>")); //+9
    listcards.push(new Carte("none","Timeal long attack", 27, "$m$m$r", "$h$h", "$t")); //+9
    listcards.push(new Carte("none","Timeal attack", 28, "$m$r$r", "$h$h", "$t")); //+9
    listcards.push(new Carte("none","Timeal snipe", 29, "$r$r$r", "$h$h", "$t", "$p<")); //+9
    //Delay weird
    listcards.push(new Carte("none","Sixtuple strike", 30,"$m$m$m$m$m$m", "$t$t$t$t")); //+10
    listcards.push(new Carte("none","Arrow of the year", 31,"$r$r$r$r$r$r", "$t$t$t$t")); //+10
    listcards.push(new Carte("none","Exhausting strike", 32, "$m$m", "$c", "$t")); //+10
    listcards.push(new Carte("none","Exhausting snipe", 33, "$r$r", "$c", "$t")); //+10
    listcards.push(new Carte("none","Exhausting heal", 34, "$h$h$h$h$h$h$h$h", "$c", "$t")); //+10
    listcards.push(new Carte("none","Melting pot", 35, "$m$r", "$s", "$c", "$t", "$p<")); //+9
    //$ha
    listcards.push(new Carte("none","Heal impact", 36,"$m$m", "$ha", "$p>")); //+10
    listcards.push(new Carte("none","Heal polyvalent", 37,"$m$r","$ha")); //+10
    listcards.push(new Carte("none","Heal meteor", 38,"$r$r", "$ha", "$p<")); //+10
    listcards.push(new Carte("none","Regeneration attack", 39,"$m", "$h$h","$ha")); //+9
    listcards.push(new Carte("none","Regeneration snipe ", 40,"$r", "$h$h","$ha")); //+9
    listcards.push(new Carte("none","Rejuvenation", 41,"$h$h$h$h$h","$ha")); //+9
    listcards.push(new Carte("none","Regeneration", 42,"$h","$ha$ha")); //+9
    listcards.push(new Carte("none","Triple reparation", 43,"$s$s$s", "$ha$ha$ha")); //+9
    listcards.push(new Carte("none","Fast medic", 44,"$ha","$c")); //+10
    listcards.push(new Carte("none","Fast sacrificial medic", 45,"$s$s$s$s$s", "$ha$ha", "$c", "$p>")); //+9
    listcards.push(new Carte("none","Sacrificial medic", 46,"$s$s$s$s$s$s$s$s$s", "$ha$ha$ha","$c", "$p>")); //+9
    listcards.push(new Carte("none","Waiting heal", 47,"$ha$ha$ha", "$t")); //+10
    listcards.push(new Carte("none","Heal and sleep", 48,"$ha$ha$ha$ha", "$t$t$t")); //+10
    listcards.push(new Carte("none","Heal before rest", 49,"$ha$ha$ha$ha$ha", "$t$t$t$t$t")); //+10
    //Normal triple copied:
    listcards.push(new Carte("none","Triple strike", 50,"$m$m$m", "$p>")); //+9
    listcards.push(new Carte("none","Long attack", 51,"$m$m$r", "$p>")); //+9
    listcards.push(new Carte("none","Small attack", 52,"$m$r$r")); //+9
    listcards.push(new Carte("none","Sniping", 53,"$r$r$r", "$p<")); //+9
    listcards.push(new Carte("none","Strike & Heal", 54,"$m$m","$h$h$h", "$p>")); //+9
    listcards.push(new Carte("none","Attack & Heal", 55,"$m$r","$h$h$h")); //+9
    listcards.push(new Carte("none","Snipe & Heal", 56,"$r$r","$h$h$h", "$p<")); //+9
    
    //$h=💖 |$ha=💕 | $c=🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸 | $t=⌛
    //+1    |  +4    |  +6   |   +3  |   +3   |   0    |  -1   |  -2   =  +9
    /*
    //listcards.push(new Carte("none","Exhausting heal", 34, "$ha$ha", "$c", "$t")); //+10
    listcards.push(new Carte("none","Perfect spot", 115,"⚔️🏹", "🔁 if 🚶‍♂️3", "🚶‍♂️3"));
    listcards.push(new Carte("none","Balanced attack", 116,"⚔️⚔️⚔️ if 🚶‍♂️1 or 🚶‍♂️2", "🏹🏹🏹 if 🚶‍♂️4 or 🚶‍♂️5"));
    listcards.push(new Carte("none","Central fight", 117,"⚔️🏹", "⚔️🏹 if 🚶‍♂️2 or 🚶‍♂️3 or 🚶‍♂️4"));
    listcards.push(new Carte("none","Command", 118,"Choose another ally to 🚶‍♂️1", "🔁"));
    listcards.push(new Carte("none","Switch", 119,"Swap your ⚔️ & 🏹", "🔁"));
    listcards.push(new Carte("none","Reroll", 120,"🩸","Reroll all unused dices", "🔁"));
    listcards.push(new Carte("none","Increase", 121,"🩸🩸", "Add 1 to another dice", "🔁"));
    listcards.push(new Carte("none","Copycat", 122,"🩸", "Apply the 1️⃣ effect"));
    listcards.push(new Carte("none","Duplicate", 124,"🩸🩸🩸🩸🩸🩸", "The next ability (non duplicate) trigger twice", "🔁"));
    */
}
function createbasicdeck(){
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
    diceavailable = ["y","y","y","y","y"];
    for (let i=0;i<5;i++){
        listpersos[i].de = Math.trunc(Math.random()*6+1);
        //document.getElementById("persoetde"+i).children[1].textContent = listpersos[i].de;
    }
}
function debutdutour() {
    genererevents();
    lancerdes();
    afficherallperso(ordrepersos);
}
function findutour(){
    if(listpersos[ennemy].currenthp<1){
        //One kill done
        ennemy++;
        listpersos[5]=listpersos[ennemy];
        choosenewcard();
    } else{
        listpersos[ordrepersos[0]].currenthp+=-1*listpersos[5].atkmel;
    }
    document.getElementById("messagecentral").textContent="Select a dice to play";
    checkhps();
    debutdutour();
}
function turndelaydecrease(){
    for(i=0;i<5;i++){
        if (turndelay[i]>0){
            turndelay[i]--;
        }
    }
}
function checkhps(){
    let morts = 672;
    let nbrheal = 0;
    while (morts>0) {
        morts = 0;
        for (let i=0;i<5;i++){
            if(listpersos[i].currenthp <1){
                listpersos[i].currenthp+=4;
                listpersos[0].currenthp--;
                listpersos[1].currenthp--;
                listpersos[2].currenthp--;
                listpersos[3].currenthp--;
                listpersos[4].currenthp--;
                morts++;
                nbrheal++;
            }
        }
        if (morts == 5 ) {
            gameover();
            return;
        }
    }
    for (let i=0;i<5;i++){
        if(listpersos[i].currenthp > listpersos[i].maxhp) {
            listpersos[i].currenthp = listpersos[i].maxhp;
        }
    }
    if (nbrheal >0) {
        document.getElementById("messagecentral").textContent= "Someone took lethal damage: he got healed (*3) but everyone else took damage (" + nbrheal +" time(s)).";
    }
}
function genererevents (){
    for (let i=0;i<5;i++){
        document.getElementsByClassName("de")[i].addEventListener("click",clickde);
    }
}
function clickde(event){
    document.getElementById("grayscreen").style.visibility = "hidden";
    document.getElementById("grayscreen").style.zIndex = "35";
    document.getElementById("grayscreen").style.zIndex = "35";
    document.getElementById("messagecentral").style.zIndex = "0";
    for (let i=0;i<5;i++){
        document.getElementsByClassName("deperso")[i].style.zIndex = "0";
    }


    let player=listpersos[ordrepersos[event.target.id.replace("de","")]];
    let de=player.de;
    let carte=listabilities[de-1].id;

    if (de==7){ //click on 🔁/⌛
        return;
    }

    resolveeffect(player, carte);
    
    if (cantrip==0){
        afficherallperso(ordrepersos);
        turndelaydecrease();
        findutour();
    }
      
}
let cantrip=0; //check if you can chose another dice or not
function resolveeffect(player, id){
    //$h|$ha=💖 | $c=🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸 | $t=⌛
    cantrip=0;
    let increaseturndelay=0;
    for (let j=4;j>-1;j--){        
        let split;
        if (j==0){
            split = listcards[id].effect1.split("$");
        }
        if (j==1) {
            if(listcards[id].effect2 != undefined) {
            split = listcards[id].effect2.split("$");
            } else {
                split="b";
            }
        }
        if (j==2){
            if(listcards[id].effect3 != undefined) {
            split = listcards[id].effect3.split("$");
            } else {
                split="b";
            }
        }
        if (j==3){
            if(listcards[id].effect4 != undefined) {
            split = listcards[id].effect4.split("$");
            } else {
                split="b";
            }
        }
        if (j==4){
            if(listcards[id].effect5 != undefined) {
            split = listcards[id].effect5.split("$");
            } else {
                split="b";
            }
        }
        for (let i=0;i<split.length;i++){
            let char = split[i].charAt(0);
            if (char[0]=="h"){
                if(split[i].charAt(1)=="a"){
                    for (let k=0;k<5;k++){
                        heal(listpersos[k],1);
                    }
                    heal(player, -1); //heal all other ally
                } else {
                    heal(player, 1);
                }
            }
            if (char[0]=="c"){
                cantrip=1;
                diceavailable[player.id]="n";
            }
            if (char[0]=="m"){
                atkmel(player,1);
            }
            if (char[0]=="r"){
                atkran(player,1);
            }
            if (char[0]=="p"){
                move(player,split[i].charAt(1));
            }
            if (char[0]=="s"){
                heal(player, -1);
            }
            if (char[0]=="t"){
                increaseturndelay++;
            }
        }
        //special effect of cards
    }
    if (increaseturndelay>0){
            turndelay[player.id]=increaseturndelay+1;
    }
    checkhps();
    afficherallperso(ordrepersos);
}
function heal(player, nbr) {
    player.currenthp+=nbr;
}
function attack(nbr) {
    listpersos[5].currenthp+=-1*nbr;
}
function atkmel(player, nbr) {
    listpersos[5].currenthp+=-1*nbr*(player.atkmel);
}
function atkran(player, nbr) {
    listpersos[5].currenthp+=-1*nbr*(player.atkran);
}
function move(player, string){
    let endroit=(ordrepersos.indexOf(player.id));
    if (string==">"){
        if (endroit==0){
            return;
        }
        swap(endroit, endroit-1);
    } else {
        if (string=="<"){
            if (endroit==4){
                return;
            }
            swap(endroit, endroit+1);
        } else {
            while (endroit != string-1){
                if (endroit > string -1){
                    swap(endroit, endroit-1);
                    endroit--;
                }else{
                    swap(endroit, endroit+1);
                    endroit++;
                }
            }
        }
    }
}
function swap(nbr1, nbr2){
    let i;
    i=ordrepersos[nbr1];
    ordrepersos[nbr1]=ordrepersos[nbr2];
    ordrepersos[nbr2]=i;
}
function gameover(){
    for (let i=0;i<5;i++){
        listpersos[i].currenthp=0;
    }
    afficherallperso(ordrepersos);
    document.getElementById("messagecentral").textContent="Game over: everyone dies :(";
    setTimeout(() => {      
        for (let i=0;i<5;i++){
            document.getElementsByClassName("de")[i].removeEventListener("click",clickde);
        }
        document.getElementById("skip").removeEventListener("click",skipturn);
    }, 1000);
    document.getElementById("playagain").style.visibility = "visible";
    document.getElementById("playagain").addEventListener("click", reload);
}
function reload() {
    location.reload();
}
//Replace a card in your deck:
let cardchosen = 0;
function choosenewcard(){
    document.getElementById("messagecentral").textContent="Choose a card to add to your deck";
    listabilities[7] = 0;
    listabilities[8] = 0;
    while(listabilities[7]==listabilities[8] || listabilities[7]==listabilities[9] || listabilities[8]==listabilities[9]){
        listabilities[7] = listcards[7+Math.trunc(Math.random()*(maxidcard-7))];
        listabilities[8] = listcards[7+Math.trunc(Math.random()*(maxidcard-7))];
        listabilities[9] = listcards[7+Math.trunc(Math.random()*(maxidcard-7))];
    }
    
    document.getElementById("extratext").style.visibility = "visible";
    document.getElementById("grayscreen").style.visibility = "visible";
    document.getElementById("grayscreen").style.zIndex = "50";
    for (let i=1;i<4;i++){
        let element=document.getElementsByClassName("carteextra")[i-1];
        document.getElementsByClassName("carteextra")[i-1].style.visibility = "visible";
        element.style.backgroundColor="darkslategray";
        if (i==1){
            element.addEventListener("click",newcard1);
        }
        if (i==2){
            element.addEventListener("click",newcard2);
        }
        if (i==3){
            element.addEventListener("click",newcard3);
        }
    }

    //skip
    document.getElementById("skipcard").style.visibility = "visible";
    document.getElementById("skipcard").addEventListener("click",skipcard);

    affichercarte(7);
    affichercarte(8);
    affichercarte(9);
}
function skipcard(){
    extrahidden();
    cardchosen = 1;
    changecarddeck(6); //change into trash card
}
function newcard1(){
    extrahidden();
    messageapreschoix();
    cardchosen = 1;
}
function newcard2(){
    extrahidden();
    messageapreschoix();
    cardchosen = 2;
}
function newcard3(){
    extrahidden();
    messageapreschoix();
    cardchosen = 3;
}
function extrahidden(){
    document.getElementsByClassName("carteextra")[0].style.visibility = "hidden";
    document.getElementsByClassName("carteextra")[1].style.visibility = "hidden";
    document.getElementsByClassName("carteextra")[2].style.visibility = "hidden";
    //
    document.getElementById("skipcard").style.visibility = "hidden";
    document.getElementById("extratext").style.visibility = "hidden";
    document.getElementById("grayscreen").style.zIndex = "20";
}
function messageapreschoix(){
    document.getElementById("messagecentral").textContent="Now choose a card in your deck (bottom) to replace it";
    document.getElementById("messagecentral").style.zIndex = "40";
}

document.getElementsByClassName("carte")[0].addEventListener("click",deck1);
document.getElementsByClassName("carte")[1].addEventListener("click",deck2);
document.getElementsByClassName("carte")[2].addEventListener("click",deck3);
document.getElementsByClassName("carte")[3].addEventListener("click",deck4);
document.getElementsByClassName("carte")[4].addEventListener("click",deck5);
document.getElementsByClassName("carte")[5].addEventListener("click",deck6);
function deck1(){
    if (cardchosen==0){
        return;
    }
    changecarddeck(0);
}
function deck2(){
    if (cardchosen==0){
        return;
    }
    changecarddeck(1);
}
function deck3(){
    if (cardchosen==0){
        return;
    }
    changecarddeck(2);
}
function deck4(){
    if (cardchosen==0){
        return;
    }
    changecarddeck(3);
}
function deck5(){
    if (cardchosen==0){
        return;
    }
    changecarddeck(4);
}
function deck6(){
    if (cardchosen==0){
        return;
    }
    changecarddeck(5);
}
function changecarddeck(nbr){
    listabilities[nbr]=listabilities[6+cardchosen];
    afficherallperso(ordrepersos);
    affichercarte(0);
    affichercarte(1);
    affichercarte(2);
    affichercarte(3);
    affichercarte(4);
    affichercarte(5);
    cardchosen=0;
    document.getElementById("grayscreen").style.visibility = "hidden";
    document.getElementById("messagecentral").textContent="Next fight";
    for (i=7;i<10;i++){
        listabilities[i]=listabilities[6];
        listabilities[i].effect1="";
        listabilities[i].effect2="";
        listabilities[i].effect3="";
        listabilities[i].effect4="";
        listabilities[i].effect5="";
    }
}

// Skip turn
document.getElementById("skip").addEventListener("click",skipturn);
function skipturn(){
    turndelaydecrease();
    findutour();
}