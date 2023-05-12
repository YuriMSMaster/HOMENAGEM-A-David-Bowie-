const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 500; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.1
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = `hsl(${Math.random() * 360}, 80%, 70%)`;
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();

document.addEventListener("mousemove", event => {
  const x = event.clientX;
  const y = event.clientY;

  stars = stars.map(star => {
    const dx = star.x - x;
    const dy = star.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const force = -1000 / distance;
    const angle = Math.atan2(dy, dx);
    const ax = force * Math.cos(angle);
    const ay = force * Math.sin(angle);

    return {
      ...star,
      x: star.x + star.speed * ax,
      y: star.y + star.speed * ay
    };
  });
});


