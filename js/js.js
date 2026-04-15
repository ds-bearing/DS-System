// =========================
// "문의하기" 버튼 → 카카오톡 오픈채팅 이동
// =========================

// 1. 카카오톡 오픈채팅 링크
const kakaoOpenChatURL = 'https://open.kakao.com/o/sHkdZvqi'; 

// 2. 모든 대상 버튼 선택 (쉼표로 구분해서 추가하면 됩니다)
// .hero .btn 뿐만 아니라 .kt 클래스도 함께 선택합니다.
const chatButtons = document.querySelectorAll('.hero .btn, .kt');

// 3. 선택된 모든 버튼에 클릭 이벤트 부여
chatButtons.forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault(); // 기본 동작(링크 이동 등) 방지
    window.open(kakaoOpenChatURL, '_blank'); // 새 탭에서 오픈채팅 열기
  });
});

// =========================
// COUNT ANIMATION (FINAL STABLE)
// =========================
const counters = document.querySelectorAll('.count');
let started = false;

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// ⭐ 밝은 그린 계열 (애니메이션용)
const startColor = [76, 217, 100]; // #4cd964
const endColor = [168, 245, 192];  // #a8f5c0

// ⭐ 최종 진한 그린
const finalColor = [0, 180, 50]; // #009632

function lerpColor(a, b, t) {
  return a.map((v, i) => Math.round(v + (b[i] - v) * t));
}

function startCount() {
  if (started) return;
  const section = document.querySelector('.trust');
  const sectionTop = section.getBoundingClientRect().top;

  if (sectionTop < window.innerHeight - 100) {
    started = true;

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000;
      const startTime = performance.now();
      const parent = counter.parentElement;
      const suffix = parent.querySelector('.suffix');
      let current = -1;

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutExpo(progress);

        // 숫자는 linear
        const value = Math.round(progress * target);
        if (value !== current) {
          counter.innerText = value;
          current = value;
        }

        // 움직임은 easing
        const scale = 1 + 0.05 * eased;
        parent.style.transform = `scale(${scale})`;

        // 숫자 + 기호 색상 적용 (애니메이션 중)
        const [r, g, b] = lerpColor(startColor, endColor, eased);
        counter.style.color = `rgb(${r},${g},${b})`;
        if (suffix) suffix.style.color = `rgb(${r},${g},${b})`;
        counter.style.background = 'none';
        counter.style.webkitBackgroundClip = 'unset';

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;

          // bounce
          parent.style.transition = "transform 0.25s ease";
          parent.style.transform = "scale(1.12)";

          setTimeout(() => {
            parent.style.transform = "scale(1)";

            // ⭐ 최종 색상 고정 (진한 그린)
            counter.style.color = `rgb(${finalColor[0]},${finalColor[1]},${finalColor[2]})`;
            if (suffix) suffix.style.color = `rgb(${finalColor[0]},${finalColor[1]},${finalColor[2]})`;
          }, 120);
        }
      }
      requestAnimationFrame(update);
    });
  }
}

window.addEventListener('scroll', startCount);

// fade-up
const faders = document.querySelectorAll('.fade-up');
function checkFade() {
  faders.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('show');
    }
  });
}
window.addEventListener('scroll', checkFade);