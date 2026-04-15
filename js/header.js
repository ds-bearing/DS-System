document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.main-menu');
  const items = document.querySelectorAll('.main-menu > li');
  

  const kakaoOpenChatURL = 'https://open.kakao.com/o/sHkdZvqi'; 

  // 2. 모든 대상 버튼 선택 (쉼표로 구분해서 추가하면 됩니다)
  // .hero .btn 뿐만 아니라 .kt 클래스도 함께 선택합니다.
  const chatButtons = document.querySelectorAll('.kt');

  // 3. 선택된 모든 버튼에 클릭 이벤트 부여
  chatButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault(); // 기본 동작(링크 이동 등) 방지
      window.open(kakaoOpenChatURL, '_blank'); // 새 탭에서 오픈채팅 열기
    });
  });

  
  // 1. 햄버거 버튼 토글
  hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');

    // 닫을 때 상태 초기화
    if (!menu.classList.contains('active')) {
      resetMenu();
    }
  });

  // 2. 모바일 아코디언 로직
  items.forEach(li => {
    const link = li.querySelector('a');
    const sub = li.querySelector('.sub');

    if (sub) {
      link.addEventListener('click', e => {
        if (window.innerWidth <= 1024) {
          e.preventDefault();

          const isOpen = sub.classList.contains('active');

          // 다른 메뉴 닫기 (하나만 열리게 함)
          items.forEach(i => {
            i.classList.remove('active-parent');
            const s = i.querySelector('.sub');
            const a = i.querySelector('.arrow');
            if (s) { s.style.maxHeight = null; s.classList.remove('active'); }
            if (a) a.classList.remove('open');
          });

          // 현재 메뉴 열기
          if (!isOpen) {
            li.classList.add('active-parent');
            sub.classList.add('active');
            sub.style.maxHeight = sub.scrollHeight + "px";
            const arrow = li.querySelector('.arrow');
            if (arrow) arrow.classList.add('open');
          }
        }
      });
    }
  });

  // 초기화 함수
  function resetMenu() {
    items.forEach(li => {
      li.classList.remove('active-parent');
      const sub = li.querySelector('.sub');
      const arrow = li.querySelector('.arrow');
      if (sub) { sub.style.maxHeight = null; sub.classList.remove('active'); }
      if (arrow) arrow.classList.remove('open');
    });
  }

  // 리사이즈 시 대응
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      menu.classList.remove('active');
      hamburger.classList.remove('active');
      resetMenu();
    }
  });
});