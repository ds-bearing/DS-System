document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');
  const title = document.querySelector('.title');

  // [1] 탭 변경 공통 함수
  function changeTab(tabName) {
    const targetTab = document.querySelector(`[data-tab="${tabName}"]`);
    const targetContent = document.getElementById(tabName);

    if (targetTab && targetContent) {
      // 모든 활성화 클래스 제거
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // 대상 활성화
      targetTab.classList.add('active');
      targetContent.classList.add('active');

      // 타이틀 텍스트 변경
      if (title) title.textContent = targetTab.textContent;
    }
  }

  // [2] 탭 버튼 직접 클릭 시
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      changeTab(tab.dataset.tab);
    });
  });

  // [3] ★ 상호작용 핵심: 주소창의 #이 바뀔 때마다 감지 ★
  // ceo.html 안에 있을 때 메뉴에서 '오시는길'을 누르면 실행됩니다.
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'location') {
      changeTab('location');
    } else if (hash === 'greeting' || hash === '') {
      changeTab('greeting');
    }
  });

  // [4] 처음 페이지에 접속했을 때 체크
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash === 'location') {
    setTimeout(() => changeTab('location'), 50);
  }
});