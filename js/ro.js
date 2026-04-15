/**
 * SBC LINEAR 제품 필터링 시스템 - 초기 로드 버그 수정판
 */

// 1. 제품 데이터베이스
const SBC_DATA = {
    lm_guide: [
    { name: "KZM", img: "../images/KZM.jpg" },
    { name: "KZMT", img: "../images/KZMT.jpg" },
    { name: "KZMV", img: "../images/KZMV.jpg" },
    { name: "DCN", img: "../images/DCN.jpg" },
    { name: "KSNA", img: "../images/KSNA.jpg" },
    { name: "KZMF", img: "../images/KZMF.jpg" },
    { name: "AN", img: "../images/AN.jpg" },
    { name: "DN", img: "../images/DN.jpg" },
    { name: "TWIN FU-NUT", img: "../images/twinfu-nut.jpg" },
    { name: "FINE U-NUT", img: "../images/fineu-nut.jpg" },
    { name: "육각 U-NUT", img: "../images/u-nut.jpg" },
    { name: "FINE U-NUT TOOL SET", img: "../images/fineu-nuttoolset.jpg" },
    
    ],
    ball_screw: [
    { name: "ZMG", img: "../images/ZMG.jpg" },
    { name: "ZMVG", img: "../images/ZMVG.jpg" },
    { name: "UZMG", img: "../images/UZMG.jpg" },
    { name: "ZMFG", img: "../images/ZMFG.jpg" },
    { name: "UZMVG", img: "../images/UZMVG.jpg" },
    { name: "UZMFG", img: "../images/UZMFG.jpg" },
    { name: "UBGN-A", img: "../images/UBGN-A.jpg" },
    { name: "UKANG", img: "../images/UKANG.jpg" },
    { name: "UBGN-B", img: "../images/UBGN-B.jpg" },
    { name: "UBGN-C", img: "../images/UBGN-C.jpg" },
    { name: "UBGN-D", img: "../images/UBGN-D.jpg" },
    { name: "UBGN-E", img: "../images/UBGN-E.jpg" }
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