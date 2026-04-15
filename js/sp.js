/**
 * SBC LINEAR 제품 필터링 시스템 - 초기 로드 버그 수정판
 */

// 1. 제품 데이터베이스
const SBC_DATA = {
    lm_guide: [
        { name: "SSR253A", img: "../images/SSR253A.jpg" },
        { name: "SSR253B", img: "../images/SSR253A.jpg" },
        { name: "SSR253C", img: "../images/SSR253C.jpg" },
        { name: "SSR253D", img: "../images/SSR253C.jpg" },
        { name: "SSR254A", img: "../images/SSR254A.jpg" },
        { name: "SSR254B", img: "../images/SSR254A.jpg" },
        { name: "SSR254C", img: "../images/SSR254C.jpg" },
        { name: "SSR254D", img: "../images/SSR254D.jpg" },
        { name: "SSR3544A", img: "../images/SSR354A.jpg" },
        { name: "SSR354B", img: "../images/SSR354B.jpg" },
        { name: "SSR354C", img: "../images/SSR354C.jpg" },
        { name: "SSR354D", img: "../images/SSR354D.jpg" },
        { name: "SSR454A", img: "../images/SSR454A.jpg" },
        { name: "SSR454B", img: "../images/SSR454B.jpg" },
        { name: "SSR454C", img: "../images/SSR454C.jpg" }
    ],
    ball_screw: [
        { name: "S20PS", img: "../images/S20PS.jpg" },
    { name: "S20PD", img: "../images/S20PD.jpg" },
    { name: "S27RS", img: "../images/S20PS.jpg" },
    { name: "S27RD", img: "../images/S20PD.jpg" },
    { name: "S27SU", img: "../images/S20PS.jpg" },
    { name: "S27DU", img: "../images/S20PD.jpg" },
    { name: "S35RS", img: "../images/S20PS.jpg" },
    { name: "S35RD", img: "../images/S20PD.jpg" },
    { name: "S35SU", img: "../images/S20PS.jpg" },
    { name: "S35DU", img: "../images/S20PD.jpg" },
    { name: "S40RS", img: "../images/S20PS.jpg" },
    { name: "S40RD", img: "../images/S20PD.jpg" },
    { name: "S71RD", img: "../images/S71RD.jpg" },
    { name: "S80RD", img: "../images/S45R3.jpg" },
    { name: "S45R3-LS", img: "../images/S56P3.jpg" },
    { name: "S56P3", img: "../images/S20PD.jpg" }
    ]
};

const filterButtons = document.querySelectorAll('.jp-brand-item');
const productDisplay = document.getElementById('jp-product-display');

// 2. 제품 렌더링 함수
function renderSbcProducts(categoryId) {
    // 투명도를 0으로 만들어 부드러운 전환 준비
    productDisplay.style.opacity = '0';
    
    // 이전 카드를 즉시 지워서 잔상 제거
    productDisplay.innerHTML = '';

    setTimeout(() => {
        const products = SBC_DATA[categoryId];

        if (!products || products.length === 0) {
            productDisplay.innerHTML = '<p style="grid-column:1/-1; text-align:center; padding:50px;">등록된 제품 정보가 없습니다.</p>';
        } else {
            products.forEach(item => {
                const cardHTML = `
                    <div class="jp-product-card">
                        <div class="jp-product-img-box">
                            <img src="${item.img}" alt="${item.name}" class="jp-product-img" onerror="this.src='../images/no-image.png'">
                        </div>
                        <div class="jp-product-info">
                            <h3 class="jp-product-name">${item.name}</h3>
                        </div>
                    </div>
                `;
                productDisplay.insertAdjacentHTML('beforeend', cardHTML);
            });
        }
        // 데이터가 다 쌓인 후 투명도를 1로 변경
        productDisplay.style.opacity = '1';
    }, 50); // 짧은 지연 시간을 주어 렌더링 안정성 확보
}

// 3. 클릭 이벤트 설정
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // 이미 활성화된 버튼이면 중복 실행 방지
        if (this.classList.contains('jp-on') && productDisplay.innerHTML !== '') return;

        filterButtons.forEach(btn => btn.classList.remove('jp-on'));
        this.classList.add('jp-on');

        const category = this.getAttribute('data-category');
        renderSbcProducts(category);
    });
});

// 4. [수정됨] 초기 로드 로직
window.addEventListener('load', () => {
    // DOMContentLoaded 대신 window.load를 사용하여 모든 리소스가 준비된 후 실행
    const initialCategory = "lm_guide"; // 초기 보여줄 카테고리
    
    // 버튼 스타일 먼저 맞추기
    filterButtons.forEach(btn => {
        if(btn.getAttribute('data-category') === initialCategory) {
            btn.classList.add('jp-on');
        } else {
            btn.classList.remove('jp-on');
        }
    });

    // 0.1초 뒤에 제품 리스트 강제 호출
    setTimeout(() => {
        renderSbcProducts(initialCategory);
    }, 100);
});