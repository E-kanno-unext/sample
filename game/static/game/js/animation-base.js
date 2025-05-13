// GSAPとSplitTextのプラグインを登録
gsap.registerPlugin(SplitText, ScrollTrigger);

// 共通のSplitText処理を関数化
function splitAndAnimate(selector, staggerDelay) {
  const split = new SplitText(selector, { type: "words,chars,lines" });
  const chars = split.chars;
  gsap.set(chars, { autoAlpha: 0, scale: 0, y: 30, rotationX: 10 });
  return gsap.to(chars, {
    autoAlpha: 1,
    scale: 1,
    y: 0,
    rotationX: 0,
    stagger: staggerDelay,
    transformOrigin: "0% 50%",
    ease: "power2.out",
  });
}


// start -----------------------------------------------------------------------------------//
//
//			#headerのアニメーション
// 



// const headerH2 = new SplitText('.header .first-view .text h2 .catch', { type: 'words,chars,lines' });
// const headerH1 = new SplitText('.header .first-view .text h1 .catch', { type: 'words,chars,lines' });

// gsap.set([headerH2.words, headerH1.chars], { autoAlpha: 0, y: 100, rotationX: 5 });
// gsap.set('.header .first-view .text ul li', { autoAlpha: 0, y: 100 });

// const headerAnimation = gsap.timeline();

// headerAnimation
// .from('.header nav .logo', { autoAlpha: 0, x: -100, filter: 'blur(30px)' })
// .from('.header nav ul li', { autoAlpha: 0, y: 60, stagger: 0.1 }, '<')
// .to(headerH2.words, { autoAlpha: 1, y: 0, rotationX: 0, stagger: 0.05, ease: 'power2.out' })
// .to(headerH1.chars, { autoAlpha: 1, y: 0, rotationX: 0, stagger: 0.025, ease: 'power2.out' }, '-=0.1')
// .to('.header .first-view .text ul li', { autoAlpha: 1, y: 0, stagger: 0.06 }, '-=0.2')
// .from('.header .first-view .text .sentence', { autoAlpha: 0, y: 100 }, '-=0.2')
// .from('.header .first-view .splide', { autoAlpha: 0, y: 200, x: 200 }, '<')


// start -----------------------------------------------------------------------------------//
//
//			.whatのアニメーション
//

const whatAnimation = gsap.timeline({
	scrollTrigger: {
		trigger: ".what",
		start: 'top 60%',
	},
});
  
whatAnimation
.from(".what .bg-image", { autoAlpha: 0, duration: 1.0 })
.from(".what .bg-color", { autoAlpha: 0, yPercent: 100, transformOrigin: "center bottom" }, "<=1")
.from(".what .back p", { autoAlpha: 0, y: -100 }, "<=0.1")
.from(".what .container .mark-wrapper ul li", { autoAlpha: 0, y: 100, stagger: 0.2 }, "<")
.add(splitAndAnimate(".what .container .text h2", 0.04), "<")
.add(splitAndAnimate(".what .container .text .sentence", 0.01), "<=0.15")






// start -----------------------------------------------------------------------------------//
//
//			.worksのアニメーション
//

const worksAnimation= gsap.timeline({
	scrollTrigger: {
		trigger: ".works",
		start:'top 45%',
	},
});

worksAnimation
.from(".works .bg", { autoAlpha: 0, filter: "blur(30px)", x:100, y:100, duration:1.75})
.from(".works .title h3",{ autoAlpha: 0, y:-50 },"<=0.5")
.from(".works .title h2",{ autoAlpha: 0, y:50 },"<=0.1")
.from(".works .splide",{ autoAlpha: 0, y:100, duration:1.5 },"<=1")





// start -----------------------------------------------------------------------------------//
//
//			.featureのアニメーション
//

const featureTitleAnimation = gsap.timeline({
	defaults: {
		autoAlpha: 0,
		filter: "blur(30px)",
		x: -100,
		y: 100,
		duration: 0.75,
	},
	scrollTrigger: {
		trigger: ".feature",
		start: 'top 45%',
	},
});
  
featureTitleAnimation
.from(".feature .container .title .text h3", { duration: 1.0 })
.from(".feature .container .title .text h2", {}, "<=0.25")
.from(".feature .container .title .thumb", { x: 100 }, "<=0.5")



// .feature .container .box-wrapper .box 要素を配列として取得
const featureBoxes = gsap.utils.toArray(".feature .container .box-wrapper .box");

// 各ボックスに対してアニメーションを設定
featureBoxes.forEach((target) => {
  // 子要素の取得
  const thumb = target.querySelector(".top .thumb");
  const textElements = target.querySelectorAll(".top .text .en, .top .text h3");
  const textLi = target.querySelectorAll(".top .text ul li");
  const geometory = target.querySelector(".top .text .geometory");
  const sentence = target.querySelector(".bottom .sentence");

  // タイムラインの作成とデフォルト設定
  const featureBoxAnimation = gsap.timeline({
    defaults: {
      autoAlpha: 0,
      filter: "blur(30px)",
      x: -100,
      y: 100,
      duration: 0.75,
    },
    scrollTrigger: {
      trigger: target,
      start: 'top 45%',
    },
  });

  // アニメーションの定義
  featureBoxAnimation
    .from(thumb, { duration: 1.0 })
    .from(textElements, {}, "<=0.25")
    .from(textLi, { x: 100, stagger: 0.1 }, "-=0.5")
    .from(geometory, { x: 100 }, "<")
    .from(sentence, { x: 100 }, "<");
});



// start -----------------------------------------------------------------------------------//
//
//			.meritのアニメーション
//

const meritTitleAnimation = gsap.timeline({
	defaults: {
		autoAlpha: 0,
		filter: "blur(30px)",
		scale: 2,
		duration: 1.15,
	},
	scrollTrigger: {
		trigger: ".merit .title",
		start: 'top 55%',
	},
});
  
meritTitleAnimation
.from('.merit .container .title h3', {})
.from('.merit .container .title h2', {}, "<")



// .merit .container .box-wrapper .box 要素を配列として取得
const meritBoxes = gsap.utils.toArray(".merit .container .box-wrapper .box");

// 各ボックスに対してアニメーションを設定
meritBoxes.forEach((target) => {
  // 子要素の取得
  const thumbElements = target.querySelectorAll(".thumb-wrapper .thumb");
  const textElements = target.querySelectorAll(".text .back, .text .inset .semi-title .number, .text .inset .semi-title h3, .text .inset .sentence");

  // タイムラインの作成とデフォルト設定
  const meritBoxAnimation = gsap.timeline({
    defaults: {
      autoAlpha: 0,
      filter: "blur(30px)",
      x: -100,
      y: 100,
      duration: 0.75,
    },
    scrollTrigger: {
      trigger: target,
      start: 'top 45%',
    },
  });

  // アニメーションの定義
  meritBoxAnimation
    .from(thumbElements, { x: (i) => i % 2 === 0 ? -100 : 100, stagger: 0.1, duration: 1.0 })
    .from(textElements, { stagger: 0.1 }, "<=0.25");
});

// start -----------------------------------------------------------------------------------//
//
//			.flowのアニメーション
//

// .flowセクションのタイトルアニメーション
const flowTitleAnimation = gsap.timeline({
	defaults: {
		autoAlpha: 0,
		filter: "blur(30px)",
		scale: 2,
		duration: 1.15,
	},
	scrollTrigger: {
		trigger: ".flow .title",
		start: 'top 55%',
	},
});
  
flowTitleAnimation
.from('.flow .container .title h3', {})
.from('.flow .container .title h2', {}, "<");

// .flowセクションのボックスアニメーション
gsap.from(".flow .container .box-wrapper .box", {
	autoAlpha: 0,
	y: 100,
	filter: "blur(30px)",
	stagger: 0.3,
	duration: 0.75,
	scrollTrigger: {
		trigger: ".flow .container .box-wrapper",
		start: 'top 60%',
	},
});




// start -----------------------------------------------------------------------------------//
//
//			.ctaのアニメーション
//

// .cta 要素を配列として取得
const ctaElements = gsap.utils.toArray(".cta");

ctaElements.forEach((target) => {
  // 子要素の取得
  const inner = target.querySelector(".cta .container .inner");
  const h2 = target.querySelector(".cta .container h2");
  const sentence = target.querySelector(".cta .container .inner .block .sentence");
  const blockLi = target.querySelectorAll(".cta .container .inner .block ul li");
  const blockForm = target.querySelectorAll(".cta .container .inner .block .form");

  // タイムラインの作成とデフォルト設定
  const ctaAnimation = gsap.timeline({
    defaults: {
      autoAlpha: 0,
      filter: "blur(30px)",
      y: 100,
      duration: 0.75,
    },
    scrollTrigger: {
      trigger: target,
      start: 'top 45%',
    },
  });

  // アニメーションの定義
  ctaAnimation
    .from(inner, { filter: "blur(60px)", duration: 1.0 })
    .from(h2, { x: -100, duration: 1.0 }, "-=0.5")
    .from(sentence, { x: -100 }, "<=0.25")
    .from(blockLi, { x: 100, stagger: 0.1 }, "-=0.5")
    .from(blockForm, { x: 100 }, "<");
});


// start -----------------------------------------------------------------------------------//
//
//			.footerのアニメーション
//

// 要素の取得
const footer = document.querySelector('.footer');
const footerLogoPlane = footer.querySelector('.logo .plane');
const footerLogoWhite = footer.querySelector('.logo .white');
const footerLinks = footer.querySelectorAll('.container .top nav ul li a, .container .privacy p a, .container .copyright small');

// 初期設定
gsap.set(footer, {
  backgroundImage: "linear-gradient(90deg, rgba(210,210,210,1) 0%, rgba(255,255,255,1) 100%)"
});
gsap.set(footerLinks, { color: "#111" });
gsap.set(footerLogoWhite, { autoAlpha: 0 });

// アニメーションの定義
const footerAnimation = gsap.timeline({
  scrollTrigger: {
    trigger: footer,
    start: 'top 45%',
  },
});

footerAnimation
.to(footer, {
backgroundImage: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)",
duration: 1.25
})
.to(footerLogoPlane, { autoAlpha: 0 }, "<")
.to(footerLogoWhite, { autoAlpha: 1 }, "<")
.to(footerLinks, { color: "#fff", stagger: 0.25 }, "<=0.5");


