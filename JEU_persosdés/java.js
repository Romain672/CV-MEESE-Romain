let listpersos = [];
let listabilities = [6];
let listcards = [];
let ordrepersos = [0,1,2,3,4,5];
let ennemy=5;

window.addEventListener("load", onload);
function onload() {
    generatepersos();
    generatecards();
    createbasicdeck();
    afficherallcarte();
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
var des = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"]; //1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣
function afficherperso(element, id) {
    let children = element.children;
    children[0].textContent = listpersos[id].nom;
    children[2].textContent = "💖".concat((listpersos[id].currenthp.toString()).concat("/").concat(listpersos[id].maxhp.toString()));
    if (id<5){
        children[1].textContent = des[listpersos[id].de-1];
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
    listpersos[6] = new Personnage("🐒","Abu",6,0,12,12,4);
    listpersos[7] = new Personnage("🐺","Fenrir",7,0,16,16,5);
    listpersos[8] = new Personnage("🐻","Teddy",8,0,20,20,6);
    listpersos[9] = new Personnage("🐘","Dumbo",9,0,24,24,7);
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
    //$h=💖 | $c=🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸
    let children = document.getElementById("carte"+id).children;
    //children[0]: intro
    children[1].textContent = listabilities[id].nom;
    children[2].textContent = listabilities[id].effect1.replaceAll("$h","💖").replaceAll("$c","🔁").replaceAll("$m","⚔️").replaceAll("$r","🏹").replaceAll("$p","🚶‍♂️").replaceAll("$s","🩸");
    if(listabilities[id].effect2 != undefined){
        children[3].textContent = listabilities[id].effect2.replaceAll("$h","💖").replaceAll("$c","🔁").replaceAll("$m","⚔️").replaceAll("$r","🏹").replaceAll("$p","🚶‍♂️").replaceAll("$s","🩸");
    }
    if(listabilities[id].effect3 != undefined){
        children[4].textContent = listabilities[id].effect3.replaceAll("$h","💖").replaceAll("$c","🔁").replaceAll("$m","⚔️").replaceAll("$r","🏹").replaceAll("$p","🚶‍♂️").replaceAll("$s","🩸");
    }
    if(listabilities[id].effect4 != undefined){
        children[5].textContent = listabilities[id].effect4.replaceAll("$h","💖").replaceAll("$c","🔁").replaceAll("$m","⚔️").replaceAll("$r","🏹").replaceAll("$p","🚶‍♂️").replaceAll("$s","🩸");
    }
    if(listabilities[id].effect5 != undefined){
        children[6].textContent = listabilities[id].effect5.replaceAll("$h","💖").replaceAll("$c","🔁").replaceAll("$m","⚔️").replaceAll("$r","🏹").replaceAll("$p","🚶‍♂️").replaceAll("$s","🩸");
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
function generatecards(){
    //$h=💖 | $c=🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸
    //Basics
    listcards.push(new Carte("none","Fast heal", 0, "$h","$c"));
    listcards.push(new Carte("none","Heal & Attack", 1, "$h$h$h", "$m"));
    listcards.push(new Carte("none","Double attack", 2,"$m$r"));
    listcards.push(new Carte("none","Double strike", 3, "$m$m", "$p>"));
    listcards.push(new Carte("none","Longshot", 4, "$r$r", "$p<"));
    listcards.push(new Carte("none","Run forward", 5,"$c", "$p1"));
    //Communes
    listcards.push(new Carte("none","Triple strike", 6,"⚔️⚔️⚔️", "🚶‍♂️1"));
    listcards.push(new Carte("none","Long attack", 7,"⚔️⚔️🏹", "🚶‍♂️2"));
    listcards.push(new Carte("none","Small attack", 8,"⚔️🏹🏹", "🚶‍♂️3"));
    listcards.push(new Carte("none","Sniping", 9,"🏹🏹🏹", "🚶‍♂️4"));
    listcards.push(new Carte("none","Regeneration", 10,"💖💖","💖💖 to all ally", "🚶‍♂️5"));
    listcards.push(new Carte("none","Heal & Retreat", 11,"💖💖", "🔁", "🚶‍♂️5"));
    //Rares
    listcards.push(new Carte("none","Quick draw", 11,"🩸🩸", "🏹", "🔁"));
    listcards.push(new Carte("none","Quick attack", 12,"🩸🩸", "⚔️", "🔁"));
    listcards.push(new Carte("none","Perfect spot", 13,"⚔️🏹", "🔁 if 🚶‍♂️3", "🚶‍♂️3"));
    //Epic
    listcards.push(new Carte("none","Balanced attack", 16,"⚔️⚔️⚔️ if 🚶‍♂️1 or 🚶‍♂️2", "🏹🏹🏹 if 🚶‍♂️4 or 🚶‍♂️5"));
    listcards.push(new Carte("none","Central fight", 17,"⚔️🏹", "⚔️🏹 if 🚶‍♂️2 or 🚶‍♂️3 or 🚶‍♂️4"));
    listcards.push(new Carte("none","Command", 18,"Choose another ally to 🚶‍♂️1", "🔁"));
    listcards.push(new Carte("none","Switch", 19,"Swap your ⚔️ & 🏹", "🔁"));
    //Legendary
    listcards.push(new Carte("none","Increase", 21,"🩸🩸", "Add 1 to another dice", "🔁"));
    listcards.push(new Carte("none","Copycat", 22,"🩸", "Apply the 1️⃣ effect"));
    listcards.push(new Carte("none","Quadruple shot", 23,"🩸🩸🩸🩸", "🏹🏹🏹🏹", "🚶‍♂️4"));
}
function createbasicdeck(){
    listabilities[0] = listcards[0];
    listabilities[1] = listcards[1];
    listabilities[2] = listcards[2];
    listabilities[3] = listcards[3];
    listabilities[4] = listcards[4];
    listabilities[5] = listcards[5];
}

/* Gameplay */
function lancerdes() {
    listpersos[0].de = Math.trunc(Math.random()*6+1);
    listpersos[1].de = Math.trunc(Math.random()*6+1);
    listpersos[2].de = Math.trunc(Math.random()*6+1);
    listpersos[3].de = Math.trunc(Math.random()*6+1);
    listpersos[4].de = Math.trunc(Math.random()*6+1);
    document.getElementById("persoetde0").children[0].textContent = listpersos[0].de;
    document.getElementById("persoetde1").children[1].textContent = listpersos[1].de;
    document.getElementById("persoetde2").children[2].textContent = listpersos[2].de;
    document.getElementById("persoetde3").children[3].textContent = listpersos[3].de;
}
function debutdutour() {
    lancerdes();
    afficherallperso(ordrepersos);
    document.getElementById("messagecentral").textContent="Select a dice to play";
}
function findutour(){
    if(listpersos[ennemy].currenthp<1){
        //One kill done
        ennemy++;
        listpersos[5]=listpersos[ennemy];
    } else{
        listpersos[ordrepersos[0]].currenthp+=-1*listpersos[5].atkmel;
    }
    //afficherallperso(ordrepersos);
    for (i=0;i<5;i++){
        if(listpersos[i].currenthp > listpersos[i].maxhp){
            listpersos[i].currenthp = listpersos[i].maxhp;
        }
    }
    debutdutour();
}
for (let i=0;i<5;i++){
    document.getElementsByClassName("de")[i].addEventListener("click",clickde);
}
function clickde(event){
    /*
    console.log(event.target.classList);
    console.log(event.target.classList.add("hidden"));
    console.log(event.target.setAttribute("clickable", "false"));
    console.log(event.target.classList);
    */
    let player=listpersos[ordrepersos[event.target.id.replace("de","")]];
    let de=player.de;
    let carte=listabilities[de-1].id;
    resolveeffect(player, carte);
    if (cantrip==0){
        afficherallperso(ordrepersos);
        findutour();
    }
}
let cantrip=0; //check if you can chose another dice or not
function resolveeffect(player, id){
    //$h=💖 | $c=🔁 | $m=⚔️ | $r=🏹 | $p=🚶‍♂️ | $s=🩸
    cantrip=0;
    for (let j=0;j<5;j++){        
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
        for (let i=1;i<split.length;i++){
            let char = split[i].charAt(0);
            if (char[0]=="h"){
                heal(player, 1);
            }
            if (char[0]=="h"){
                cantrip=1;
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
        }
        //special effect of cards
    }
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