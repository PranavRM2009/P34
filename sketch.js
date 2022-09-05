
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


function preload(){
  bg = loadImage("background.jpeg")
  b_ballImg = loadImage("b_ball.png")
  pipeImg = loadImage("Mario_pipe.png")
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

  b_ball = Bodies.circle(200,200,40)
  World.add(world,b_ball)

}


function draw() 
{
  background(bg);
  Engine.update(engine);
  rope.show();
  rope2.show();
  rope3.show();
  imageMode(RADIUS)
  image(b_ballImg,b_ball.position.x,b_ball.position.y,60,60)

  drawSprites()
}

