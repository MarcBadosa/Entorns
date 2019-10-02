// Sketch creat per Jonathan Gómez i Marc Badosa, amb la realització d'aquest sketch volien simular creant figures aleatories amb
// una gamma de colors concrets, una explosió nuclear com es veu al quadre
// hem comentat la part de l'àudio ja que alhora de pujarla al github pessava massa i i el nevagador no tenia temps a 
// carregar-l'ho, la qual cosa produia un error si es descomenta en local es pot escoltar sense cap problema
// link al github pages :   


//inicialitzem les variables esencials per el funcionament del codi
let arrayPoligons = [];
let instruccions = true;
var animacioTerra;
var primerCop = true;

//creem la classe "Poligon" la qual es la classe principal de l'sketch, ja que es tracte de les figures que es crearan aleatoriament
class Poligon{
  //Constructor de la classe i inicialitzem la figura
  constructor(x,y,radi,costats,estat){
    this.x = x;
    this.y = y;
    this.radi = radi; 
    this.costats = costats;
    this.estat = estat;
    this.crearFigura(x,y,radi,costats);
  }
// funció per inicialitzar figures geomètriques a traves de unes cordenades , un radi i un numeró de costats aleatoris, també
// li assignem un color aleatori dins de un rang
  crearFigura(x,y,radi,costats){
    let angle = TWO_PI / costats; 
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radi;
      let sy = y + sin(a) * radi;
      vertex(sx, sy);
    }
    let c = color(255,random(50,200),0);
    fill(c);
    endShape(CLOSE);
  }
// cada vegada que es crida aquesta funció l'objecte en quastio realitza un canvi de coordenades el que simula el
// moviment de la figura
  moureObjecte(){
    this.x = (this.x + random(-10,10));
    this.y = (this.y - 3);
    this.radi = (this.radi - 0.095 );
  }
// un cop canviades les coordenades de l'objecte la funció display la dibuixa per pantalla de manera similar a la funció
// crearFigura()
  display(){
    let angle = TWO_PI / this.costats; 
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = this.x + cos(a) * this.radi;
      let sy = this.y + sin(a) * this.radi;
      vertex(sx, sy);
    }
    let c = color(255,random(50,200),0);
    fill(c);
    endShape(CLOSE);
  }
}
// fi de creació de la classe
//-----------------------------------------------------------------------------------------------------------------
// cridem la funció preaload per precarregar elements que utilitzem a l'sketch abanç de comensar a realitzar el dibuix on 
// inicialitzem el tipus de font, l'audio de fons i l'animació de la terra
function preload() {
  tipografia = loadFont('Fonts/font.otf');
  //audio = loadSound("Audio/Audio.MPEG");
  animacioTerra = loadAnimation ('Imatges/terra1.png','Imatges/terra2.png','Imatges/terra3.png','Imatges/terra4.png','Imatges/terra5.png','Imatges/terra6.png');
}
// funció setup, es la funció on es crean els parametres bàsics del dibuix,  com el canvas, els sprites de les animacions
// i executem la música de fons
function setup() {
  createCanvas(windowWidth=800 , windowHeight=400);
  smooth();
  noStroke();
  if (primerCop)
  {
    //audio.play();
    primerCop = false;
  }
  frameRate(30);
  colorMode(RGB);
  rectMode(CENTER);
  fotoFons = loadImage("Imatges/ImatgeQuadre.png");
  apretat = false;
  spriteTerra = createSprite(width,10, 10);
  spriteTerra.scale = .2;
  spriteTerra.addAnimation('terra', animacioTerra);
  spriteTerra.position.x = 390;
  spriteTerra.position.y = 300;
  spriteTerra.animation.looping=true;
  spriteTerra.animation.frameDelay=6;
}
// funció draw, es la funció on dibuixem tot l'sketch

function draw() {
  if (instruccions) // mirem si la variable intrucions es true per saber si hem de mostrar les instruccions o no en cas afirmatiu
  {                 // dibuixem tot l'apartat de les instruccions
    textFont(tipografia);
    fill(0);
    rect(390,350,550,500);
    fill(255);
    textSize(30);
    text ("Sketch design by: Jonathan Gomez & Marc Badosa.",137,150);
    text ("Press SPACE to play or reset the animation.",170,190);
    drawSprites();
  }
  else  // si la variable instruccions es false comensem a relaitzar el dibuix generatiu de l'sketch sempre i quan cliquem el 
  {     // ratolí
    if (apretat) {
      pol = new Poligon(390, 370, 10,random(3,10), 110, true);  // al clickar creem una nova classe i l'afeixim a l'array
      arrayPoligons.push(pol);
    }
    for (i=0; i<arrayPoligons.length; i++) { // recorrem l'array de elements creats i els anem actualitzan amb les funcions
      pol = arrayPoligons[i];                // previament explicades a la classe
      pol.moureObjecte();
      pol.display();
    }
  }
}

// si apretem el ratolí fiquem la variable apretat a true la variable apretat el que desencadena el dibuix generatiu
function mousePressed() {
  apretat = true;
}
// a la que deixem de clickar el ratolí fiquem a false la variable apretat la qual fa que es deixim de crear objectes
function mouseReleased() {
  apretat = false;
}
// si apretem la tecla 32 del teclat la qual correspon a l'espai mirem si estem a les instruccions o no, si hi som inicialitzem
// la part de dibuixar de l'sketch, si no hi som fem reset dels objectes i tornem a la pantalla de instruccions
function keyPressed ()  
{
  arrayPoligons = []
  if (keyCode === 32)
  {
    if (instruccions != !instruccions)
    {
      setup();
      instruccions = !instruccions;
    }
  }
}
// si toquem la pantalla fiquem la variable apretat a true la variable apretat el que desencadena el dibuix generatiu
function touchStarted() {
  apretat = true;
}
// a la que deixem tocar la pantalla fiquem a false la variable apretat la qual fa que es deixim de crear objectes
function touchEnded() {
  apretat = false;
}
// si movem el dispositiu móbil mirem si estem a les instruccions o no, si hi som inicialitzem
// la part de dibuixar de l'sketch, si no hi som fem reset dels objectes i tornem a la pantalla de instruccions
function deviceShaken() {
  if (instruccions != !instruccions)
  {
    setup();
    instruccions = !instruccions;
  }
}