var canvas = document.querySelector("canvas");

canvas.height = "200";
canvas.width = "200";
canvas.style.marginTop = ((window.innerHeight - canvas.height)/2 - 50).toString()+"px";
canvas.style.marginLeft = ((window.innerWidth - canvas.width)/2 - 50).toString()+"px";

var c = canvas.getContext('2d');

function Circle(dx, color){
	this.x = 15;
	this.y = 100;
	this.radius = 10;
	this.color = color;
	this.dx = dx;
	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = function() {
		if(this.x + this.radius > canvas.width) {
			this.dx = -this.dx;
		}
		if(this.x - this.radius + this.dx < 0) {
			this.dx = 0;
		}
		this.x += this.dx;

		this.draw();
	}
}

var colorArray = [
	"#F28C9F",
	"#2D61A6",
	"#54A1BF",
	"#F2CA7E",
	"#F26F63",
	"#fffff"

];
var circleArray = [];
var velocity = 1.2;
for (var i = 0; i < 5; i++) {
	circleArray.push(new Circle(velocity, colorArray[i]));
	velocity += 0.3;
}

// console.log(circleArray);
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,canvas.width, canvas.height);
	c.fillText("Loading...", 80, 140);

	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
	
	if(circleArray[0].dx == 0) {
		circleArray = [];
		velocity = 1.2;
		for (var i = 0; i < 5; i++) {
			circleArray.push(new Circle(velocity, colorArray[i]));
			velocity += 0.3;
		}
	}
}

animate();
