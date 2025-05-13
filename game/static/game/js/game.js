// static/game/js/game.js

document.addEventListener("DOMContentLoaded", () => {
  // ローディング終了後にmainを表示
  const loading = document.querySelector(".loading");
  if (loading) {
    loading.style.display = "none";
  }

  // フェードイン効果
  const fadeInElements = document.querySelectorAll(".fade-in");
  fadeInElements.forEach(el => {
    el.style.opacity = 0;
    setTimeout(() => {
      el.style.transition = "opacity 1s ease";
      el.style.opacity = 1;
    }, 300);
  });

  // BGM再生（任意）
  const bgm = document.getElementById("bgm");
  if (bgm && bgm.paused) {
    bgm.volume = 0.4;
    bgm.play().catch(e => {
      console.log("BGM再生はユーザー操作後で再生可能です");
    });
  }
});
