var canvas = document.getElementById('rotationalLoader');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext('2d');

var mouse = {
	x: canvas.width/2,
	y: canvas.height/2,
}

window.addEventListener('mousemove', event => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
	console.log(mouse);
});

addEventListener('resize', () => {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;

	init();
});


function Circle(x, y, radius, radians, color){

	this.x = x;
	this.y = y;
	this.radius = radius;
	this.radians = radians;
	this.velocity = 0.05;
	this.color = color;
	this.lastMouse = {x: x,	y: y};

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = function() {
		this.lastMouse.x += (mouse.x - this.lastMouse.x) *0.05;
		this.lastMouse.y += (mouse.y - this.lastMouse.y) *0.05;

		this.radians = this.radians + this.velocity;
		this.x = this.lastMouse.x + (Math.cos(this.radians) * 100);
		this.y = this.lastMouse.y + (Math.sin(this.radians) * 100);
		this.draw();
	}

}

var colorArray = [
	"#F21BA7",
	"#034C8C",
	"#4B93BF",
	"#04D960",
	"#408C3E"
];
var circleArray = [];

function init() {
	radiansArray = [0, 2/5, 4/5, 8/5, 16/5];
	// console.log(radiansArray)
	// var circle = new Circle(canvas.width/2, canvas.height/2, 5, Math.PI * (4/5));

	circleArray = [];
	for (var i = 0; i < 5; i++) {
		circleArray.push(new Circle(canvas.width/2, canvas.height/2, 5, radiansArray[i]*Math.PI, colorArray[i]));
	}
	// console.log(circleArray)
}
var lm = {x: canvas.width/2-20, y: canvas.height/2};
function animate() {
	requestAnimationFrame(animate);
	lm.x += (mouse.x - lm.x) *0.05;
	lm.y += (mouse.y - lm.y) *0.05;
	c.fillText("Loading...", lm.x-20, lm.y);

	c.fillStyle = 'rgba(255, 255, 255, 0.1)';
	c.fillRect(0,0,canvas.width, canvas.height);
	
	// c.fill();
	circleArray.forEach(circle => {
		circle.update();
	});
}

init();
animate();