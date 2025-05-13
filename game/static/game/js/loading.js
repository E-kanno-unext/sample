gsap.registerPlugin(SplitText);

// スプリットテキスト設定
const splitText = new SplitText(".loading .main", { type: "chars" });
const taglineSplit = new SplitText(".loading .tagline", { type: "chars, words" });

const loading = document.querySelector(".loading");
const loadingBg = document.querySelector(".loading .bg");

const headerH2 = new SplitText(".header .first-view .text h2 .catch", { type: "words,chars,lines" });
const headerH1 = new SplitText(".header .first-view .text h1 .catch", { type: "words,chars,lines" });

gsap.set(loading, { autoAlpha: 1 });
gsap.set([".loading .main", ".loading .tagline"], { autoAlpha: 0 });
gsap.set([headerH2.words, headerH1.chars], { autoAlpha: 0, y: 100, rotationX: 5 });
gsap.set(".header .first-view .text ul li", { autoAlpha: 0, y: 100 });

// ローディングアニメーション
function loadingAnimation() {
	const tl = gsap.timeline();

	tl.to([".loading .main", ".loading .tagline"], { autoAlpha: 1, duration: 0.01 })
	.from(splitText.chars, { opacity: 0, stagger: 0.125, ease: "power1.in", duration: 0.3 })
    .from(taglineSplit.chars, { opacity: 0, yPercent: 0, stagger: 0.075, ease: "power1.in", duration: 0.3 }, "-=0.15")
    .to(splitText.chars, { opacity: 0, stagger: 0.125, ease: "power3.inOut", duration: 0.15 }, "+=1")
    .to(taglineSplit.chars, { opacity: 0, stagger: 0.06, ease: "power3.inOut", duration: 0.25 }, "<")
    .to(loadingBg, { autoAlpha: 0, yPercent: -100, ease: "power3.inOut", duration: 0.7 }, "-=0.25")
    .to(loading, { autoAlpha: 0, ease: "power3.inOut", duration: 0.1, 
		onComplete: () => {
			loading.style.display = "none";
		},
    })

  return tl;
}

// ヘッダーアニメーション
function headerAnimation() {
  const tl = gsap.timeline();

  tl.from(".header nav .logo", { autoAlpha: 0, x: -100, filter: "blur(30px)" })
    .from(".header nav ul li", { autoAlpha: 0, y: 60, stagger: 0.1 }, "<")
    .to(headerH2.words, { autoAlpha: 1, y: 0, rotationX: 0, stagger: 0.05, ease: "power2.out" })
    .to(headerH1.chars, { autoAlpha: 1, y: 0, rotationX: 0, stagger: 0.025, ease: "power2.out" }, "-=0.1")
    .to(".header .first-view .text ul li", { autoAlpha: 1, y: 0, stagger: 0.06 }, "-=0.2")
    .from(".header .first-view .text .sentence", { autoAlpha: 0, y: 100 }, "-=0.2")
    .from(".header .first-view .splide", { autoAlpha: 0, y: 200, x: 200 }, "<")

  return tl;
}

// 開始処理
function openingEffect() {
  const masterTimeline = gsap.timeline();
  
  masterTimeline.add(loadingAnimation()).add(headerAnimation(), "-=0.5") // ローディング終了後、ヘッダーを少し重ねて開始
}

// 実行
openingEffect();
