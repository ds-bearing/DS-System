/**
 * SBC LINEAR 제품 필터링 시스템 - 초기 로드 버그 수정판
 */

// 1. 제품 데이터베이스
const SBC_DATA = {
    lm_guide: [
        { name: "HSR", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "SR", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "NR/NRS-X", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "HRW", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "SRS-G", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "RSR", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "HR", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "GSR", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "CSR", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "MX", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "JR", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "HCR", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "HMG", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "NSR-TBC", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "HSR-M1", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "SR-M1", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "RSR-M1", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "HSR-M2", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "HSR-M1VV", img: "../images/MSB-TEMSB-E.jpg" },
        { name: "SRG", img: "../images/SRG.jpg" },
        { name: "SRN", img: "../images/SRG.jpg" },
        { name: "SRW", img: "../images/SRG.jpg" },
        { name: "SHS", img: "../images/SHS.jpg" },
        { name: "SSR", img: "../images/SHS.jpg" },
        { name: "SHW", img: "../images/SHS.jpg" },
        { name: "SRS", img: "../images/SHS.jpg" },
        { name: "SCR", img: "../images/SHS.jpg" },
        { name: "EPF", img: "../images/SHS.jpg" },
        { name: "SVR/SVS", img: "../images/SHS.jpg" }
    ],
    ball_screw: [
        { name: "EPB-V", img: "../images/epb.jpg" },
        { name: "EBB-V", img: "../images/epb.jpg" },
        { name: "SBN-V/SBN", img: "../images/sbn.jpg" },
        { name: "SBK", img: "../images/sbn.jpg" },
        { name: "HBN", img: "../images/sbn.jpg" },
        { name: "SDA-V", img: "../images/sbn.jpg" },
        { name: "SBKH", img: "../images/sbn.jpg" },
        { name: "BNK", img: "../images/bnk.jpg" },
        { name: "BIF-V/BIF", img: "../images/bif.jpg" },
        { name: "DIK", img: "../images/bif.jpg" },
        { name: "DIR", img: "../images/bif.jpg" },
        { name: "BNFN-V/BNFN", img: "../images/bif.jpg" },
        { name: "DKN", img: "../images/bif.jpg" },
        { name: "BLW", img: "../images/bif.jpg" },
        { name: "BNF-V/BNF", img: "../images/bif.jpg" },
        { name: "BNT", img: "../images/bif.jpg" },
        { name: "DK", img: "../images/bif.jpg" },
        { name: "MDK", img: "../images/bif.jpg" },
        { name: "WHF", img: "../images/bif.jpg" },
        { name: "BLK", img: "../images/bif.jpg" },
        { name: "WGF", img: "../images/bif.jpg" },
        { name: "BLR", img: "../images/bif.jpg" },
        { name: "BNS", img: "../images/bns.jpg" },
        { name: "NS", img: "../images/bns.jpg" },
        { name: "JPF", img: "../images/jpf.jpg" },
        { name: "BTK-V", img: "../images/jpf.jpg" },
        { name: "MTF", img: "../images/jpf.jpg" },
        { name: "WHF-V", img: "../images/jpf.jpg" },
        { name: "BNT", img: "../images/jpf.jpg" },
        { name: "BLK", img: "../images/jpf.jpg" },
        { name: "WTF", img: "../images/jpf.jpg" },
        { name: "CNF", img: "../images/jpf.jpg" },
        { name: "BLR", img: "../images/jpf.jpg" },
        { name: "LBS", img: "../images/lbs.jpg" },
        { name: "LBF", img: "../images/lbs.jpg" },
        { name: "LBH", img: "../images/lbs.jpg" },
        { name: "LBST", img: "../images/lbs.jpg" },
        { name: "LBR", img: "../images/lbs.jpg" },
        { name: "LT", img: "../images/lt.jpg" },
        { name: "LF", img: "../images/lt.jpg" },
        { name: "LBG", img: "../images/lbg.jpg" },
        { name: "LBGT", img: "../images/lbg.jpg" },
        { name: "LTR", img: "../images/ltr.jpg" },
        { name: "LTR-A", img: "../images/ltr.jpg" },
        { name: "SKR", img: "../images/skr.jpg" },
        { name: "KR", img: "../images/kr.jpg" }
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