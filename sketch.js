
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Composite = Matter.Composite
const Composites = Matter.Composites
const Constraint = Matter.Constraint


var bg
var b_ball,b_ballImg
var rope
var pipeImg, pipe
var blowerImg, blower
var p,pImg,p2,p2Img


function preload(){
  bg = loadImage("background.jpeg")
  b_ballImg = loadImage("b_ball.png")
  pipeImg = loadImage("Mario_pipe.png")
  blowerImg = loadImage("blower.png")
  pImg = loadImage("pirranha.png")
  p2Img = loadImage("pirranha 2.png")
}

function setup() {
  createCanvas(1000,700);
  engine = Engine.create();
  world = engine.world;

  rope = new Rope(7,{x:30,y:230});
  base1 = new Base(300,230,10,10)
  Matter.Composite.add(rope.body,base1)
  connect = new Link(rope,base1)

  rope2 = new Rope(7,{x:330,y:430});
  base2 = new Base(600,430,10,10)
  Matter.Composite.add(rope2.body,base2)
  connect2 = new Link(rope2,base2)

  rope3 = new Rope(7,{x:600,y:130});
  base3 = new Base(870,130,10,10)
  Matter.Composite.add(rope3.body,base3)
  connect3 = new Link(rope3,base3)

  pipe = createSprite(900,630,10,10)
  pipe.addImage(pipeImg)
  pipe.scale = 0.5

  b_ball = Bodies.circle(200,200,40,{restitution:1.5,density : 0.001,frictionAir:0.01})
  World.add(world,b_ball)

  blower = createSprite(800,635,10,10)
  blower.addImage(blowerImg)
  blower.scale =0.45
  blower.rotation = -45

  p = createSprite(650,630,10,10)
  p.addImage(pImg)
  p.scale = 0.5
  p.velocityX = -4

  p2 = createSprite(100,630,10,10)
  p2.addImage(p2Img)
  p2.scale = 0.3
  p2.velocityX = 3
}


function draw() 
{
  background(bg);
  Engine.update(engine);
  rope.show();
  rope2.show();
  rope3.show();
  imageMode(RADIUS)
  image(b_ballImg,b_ball.position.x,b_ball.position.y,100,80)

  if (keyDown("up")){
    Matter.Body.applyForce(b_ball,{x:0,y:0},{x:0.001,y:-0.01})
  }

  if (p.x<0){
    p.x = 650
  }

  if (p2.x>630){
    p2.x = 100
  }

  drawSprites()
}

