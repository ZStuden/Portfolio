var tri = 0
var word = 0;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(255,195,0);
  fill(100,100,127,150);
  textSize(word);
  textFont('Arial Rounded MT Bold');
  text('Fire!', mouseX, mouseY);
  word = word + 5

  if (word >= 450) {
    word = 0
  }

  push();
  translate(width * 0.5, height * 0.5);
  rotate(frameCount / 50.0);
  star(0, 0, 80, 100, 40);
  pop();
  fill(255,228,132)
  strokeWeight(5)
  stroke(255,68,51)

}


function star(x, y, radius1, radius2, npoints) {
  fill(255,228,132)
  let angle = TWO_PI / npoints;
  let halfAngle = angle / -2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);

}
