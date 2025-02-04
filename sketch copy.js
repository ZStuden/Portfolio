var tri = 0
var word = 0

//The setup function only happens once
function setup() {
	createCanvas(500, 500); //create a 500px X 500px canvas
}

//The draw function happens over and over again
function draw() {
  background(213,216,230); //an RGB color for the canvas' background
  //circle
  stroke(mouseX,255,mouseY,mouseX) // an RGB color for the circle's border
  strokeWeight(5)
  fill(55,255,127,150); // an RGB color for the inside of the circle (the last number refers to transparency (min. 0, max. 255))
  ellipse(width/3,height/3,70,70); // center of canvas, 20px dia
  stroke(mouseY,255,mouseX)
  rect(250,137,60,60);
  triangle(tri,tri,130,50,80,110)

  tri = tri + 1

  if (tri >= 450) {
    tri = 0
  }

  fill(mouseX,mouseY,127,150);
  textSize(45);
  textFont('Arial Rounded MT Bold');
  text('Hi', mouseX, mouseY);


}
