const canvas = document.getElementById("mapCanvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// 地面
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228822 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// プレイヤー（立方体）
const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
const playerMaterial = new THREE.MeshStandardMaterial({ color: 0x3333ff });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.y = 1;
scene.add(player);

// ライト
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

// カメラ初期位置
camera.position.set(0, 5, 10);
camera.lookAt(player.position);

// キー入力管理
const keys = {};
window.addEventListener("keydown", (e) => { keys[e.key] = true; });
window.addEventListener("keyup", (e) => { keys[e.key] = false; });

// アニメーションループ
function animate() {
    requestAnimationFrame(animate);

    const speed = 0.1;
    if (keys["w"] || keys["ArrowUp"]) player.position.z -= speed;
    if (keys["s"] || keys["ArrowDown"]) player.position.z += speed;
    if (keys["a"] || keys["ArrowLeft"]) player.position.x -= speed;
    if (keys["d"] || keys["ArrowRight"]) player.position.x += speed;

    if (Math.abs(player.position.x) > 10 || Math.abs(player.position.z) > 10) {
        window.location.href = "/map/event/";
    }

    // カメラ追従
    camera.position.x = player.position.x;
    camera.position.z = player.position.z + 10;
    camera.lookAt(player.position);

    renderer.render(scene, camera);
}

animate();
