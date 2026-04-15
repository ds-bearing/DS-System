/**
 * SBC LINEAR 제품 필터링 시스템 - 초기 로드 버그 수정판
 */

// 1. 제품 데이터베이스
const SBC_DATA = {
    lm_guide: [
        { name: "MSA-S /MSA-LS", img: "../images/MSA-S.MSA-LS.jpg" },
        { name: "MSA-A / MSA-LA", img: "../images/MSA.MSA-LA.jpg" },
        { name: "MSA-E /MSA-LE", img: "../images/MSA.MSA-LA.jpg" },
        { name: "MSB-TS/MSB-S", img: "../images/MSB-TS.MSB-S.jpg" },
        { name: "MSB-TE/MSB-E", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "MSR-S/MSR-LS", img: "../images/MSR-S.MSR-LS.jpg" },
        { name: "MSR-S/MSR-LE", img: "../images/MSR-S.MSR-LS.jpg" },
        { name: "MSC-M/MSC-LM", img: "../images/MSC-M.MSC-LM.jpg" },
        { name: "SME SB/LSB", img: "../images/SME-SM.LSB.jpg" },
        { name: "SME SA/LSA", img: "../images/SME-SM.LSB.jpg" },
        { name: "SME EB/LEB", img: "../images/SME-SM.LSB.jpg" },
        { name: "SME EA/LEA", img: "../images/SME-SM.LSB.jpg" },
        { name: "SMR-S/SMR-LS", img: "../images/SMR-S.SMR-LS.jpg" },
        { name: "SMR-E/SMR-LE", img: "../images/SMR-S.SMR-LS.jpg" },
        { name: "MSD Series", img: "../images/MSD Series.jpg" },
        { name: "MSG Series", img: "../images/MSG Series.jpg" },
        { name: "Mono Stage KM Series", img: "../images/Mono Stage.jpg" },
    ],
    ball_screw: [
        { name: "PMI 내부 볼스크류", img: "../images/pmi.jpg" },
        { name: "PMI 전조 볼스크류", img: "../images/pmi.jpg" }
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