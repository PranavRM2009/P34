
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
var win,winImg
var next
var distance
var emptyStar,emptyStarImg,star1,star2,starImg,starsImg,star1Img
var gameOver,gameOverImg


function preload(){
  bg = loadImage("background.jpeg")
  b_ballImg = loadImage("b_ball.png")
  pipeImg = loadImage("Mario_pipe.png")
  blowerImg = loadImage("blower.png")
  pImg = loadImage("pirranha.png")
  p2Img = loadImage("pirranha 2.png")
  winImg = loadImage("You Win.png")
  emptyStarImg = loadAnimation("empty.png")
  starImg = loadImage("star.png")
  star1Img = loadAnimation("one_star.png")
  starsImg = loadAnimation("stars.png")
  gameOverImg = loadImage("gameover.png")
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

  next = createSprite(900,630,70,70)
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

  win = createSprite(800,635,10,10)
  win.addImage(winImg)
  win.scale = 0.5
  win.visible = false

  gameOver = createSprite(500,350,10,10)
  gameOver.addImage(gameOverImg)
  gameOver.visible=false

  star1 = createSprite(500,400,20,20)
  star1.addImage(starImg)
  star1.scale = 0.03

  star2 = createSprite(800,100,20,20)
  star2.addImage(starImg)
  star2.scale = 0.03

  emptyStar = createSprite(90,50)
  emptyStar.addAnimation("empty",emptyStarImg)
  emptyStar.addAnimation("1",star1Img)
  emptyStar.addAnimation("full",starsImg)
  emptyStar.scale = 0.3

  wall1 = Bodies.rectangle(0,350,10,700,{isStatic:true})
  World.add(world,wall1)

  wall2 = Bodies.rectangle(1000,350,10,700,{isStatic:true})
  World.add(world,wall2)

  wall3 = Bodies.rectangle(500,700,1000,10,{isStatic:true})
  World.add(world,wall3)

  //emptyStar.debug = true
}



function draw() 
{
  background(bg);
  Engine.update(engine);
  rope.show();
  rope2.show();
  rope3.show();
  imageMode(RADIUS)
  rectMode(CENTER)
  rect(wall1.position.x,wall1.position.y,10,700)
  rect(wall2.position.x,wall2.position.y,10,700)
  rect(wall3.position.x,wall3.position.y,1000,10)
  if (b_ball!=null){
    image(b_ballImg,b_ball.position.x,b_ball.position.y,100,80)
  }

  if (keyDown("up")){
    Matter.Body.applyForce(b_ball,{x:0,y:0},{x:0.001,y:-0.01})
  }

  if (keyDown("left")){
    Matter.Body.applyForce(b_ball,{x:0,y:0},{x:-0.001,y:-0.01})
  }

  if (p.x<0){
    p.x = 650
  }

  if (p2.x>630){
    p2.x = 100
  }

 /* if(b_ball.position.y>500)
  {
    b_ball=null
  }*/

 /* if(collide(b_ball,pipe)===true)
  {
    win.visible = true
  }*/

  if (collide(b_ball,wall1,70)==true ){
    gameOver.visible = true
    Matter.Body.setStatic(b_ball,true)
  }
  
  if (collide(b_ball,wall2,70)==true ){
    gameOver.visible = true
    Matter.Body.setStatic(b_ball,true)
  }
  
  if (collide(b_ball,wall3,70)==true ){
    gameOver.visible = true
    Matter.Body.setStatic(b_ball,true)
  }

 if (collide(b_ball,next)==true){
  nextScreen()
 }

 if (collide(b_ball,star1,80)==true){
    emptyStar.changeAnimation("1")
    star1.visible = false
 }

 if (collide(b_ball,star2,80)==true){
  emptyStar.changeAnimation("full")
  star2.visible = false
}

/*if (collide(b_ball,wall1)==true || collide(b_ball,wall2)==true || collide(b_ball,wall3)==true){
  gameOver.visible = true
  Matter.Body.setStatic(b_ball,true)
}*/



text('x:'+mouseX +',y:'+mouseX,mouseX,mouseY)

  drawSprites()
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}

function nextScreen(){
  background("green")
  Matter.Body.setStatic(b_ball,true)
}

