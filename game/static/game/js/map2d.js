
const player = document.getElementById("player");
let posX = 380;
let posY = 280;
const speed = 5;

const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

function movePlayer() {
  if (keys["arrowup"] || keys["w"]) posY -= speed;
  if (keys["arrowdown"] || keys["s"]) posY += speed;
  if (keys["arrowleft"] || keys["a"]) posX -= speed;
  if (keys["arrowright"] || keys["d"]) posX += speed;

  // 画面端を制限
  posX = Math.max(0, Math.min(760, posX));
  posY = Math.max(0, Math.min(560, posY));

  player.style.left = posX + "px";
  player.style.top = posY + "px";

  // マップ端に到達したらイベントページへ遷移
  if (posX <= 0 || posX >= 760 || posY <= 0 || posY >= 560) {
    window.location.href = "/map/event/";
  }
}

setInterval(movePlayer, 30);
