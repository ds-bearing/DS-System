/**
 * THK 제품 필터링 및 CAD 다운로드 시스템 (확장자 자동 인식 버전)
 */

// 1. 제품 데이터베이스 (보내주신 thk.js 리스트 기반)
const SBC_DATA = {
    lm_guide: [
        { name: "MSA", img: "../images/pmi.jpg", file: "../files/MSA.zip" },
        { name: "MSB", img: "../images/pmi.jpg", file: "../files/MSB.zip" },
        { name: "MSC", img: "../images/pmi.jpg", file: "../files/MSC.zip" },
        { name: "SME", img: "../images/pmi.jpg", file: "../files/SME.zip" },
        { name: "SMR", img: "../images/pmi.jpg", file: "../files/SMR.zip" },
        { name: "MR15W(DWG)", img: "../images/cpc.jpg", file: "../files/MR15W(DWG).rar" },
        { name: "MR15M(DWG)", img: "../images/cpc.jpg", file: "../files/MR15M(DWG).rar" },
        { name: "MR12W(DWG)", img: "../images/cpc.jpg", file: "../files/MR12W(DWG).rar" },
        { name: "MR12M(DWG)", img: "../images/cpc.jpg", file: "../files/MR12M(DWG).rar" },
        { name: "MR9W(DWG)", img: "../images/cpc.jpg", file: "../files/MR9W(DWG).rar" },
        { name: "MR9M(DWG)", img: "../images/cpc.jpg", file: "../files/MR9M(DWG).rar" },
        { name: "MR7W(DWG)", img: "../images/cpc.jpg", file: "../files/MR7W(DWG).rar" },
        { name: "MR7M(DWG)", img: "../images/cpc.jpg", file: "../files/MR7M(DWG).rar" },
        { name: "MR5W(DWG)", img: "../images/cpc.jpg", file: "../files/MR5W(DWG).rar" },
        { name: "MR5M(DWG)", img: "../images/cpc.jpg", file: "../files/MR5M(DWG).rar" },
        { name: "MR3W(DWG)", img: "../images/cpc.jpg", file: "../files/MR3W(DWG).rar" },
        { name: "MR3M(DWG)", img: "../images/cpc.jpg", file: "../files/MR3M(DWG).rar" },
        { name: "ARHR25(DWG)", img: "../images/cpc.jpg", file: "../files/ARHR25(DWG).rar" },
        { name: "ARHR20(DWG)", img: "../images/cpc.jpg", file: "../files/ARHR20(DWG).rar" },
        { name: "ARHR15(DWG)", img: "../images/cpc.jpg", file: "../files/ARHR15(DWG).rar" },
    ],
    ball_screw: [
        { name: "MR미래공정 CAD모음", img: "../images/mr.png", file: "../files/MR미래공정CAD모음.zip" },
        { name: "SFKR 미니츄어", img: "../images/tbi.jpg", file: "../files/MR미래공정CAD모음.zip" },
        { name: "SFE", img: "../images/tbi.jpg", file: "../files/SFE.zip" },
        { name: "SFD", img: "../images/tbi.jpg", file: "../files/SFD.zip" },
        { name: "SCD", img: "../images/tbi.jpg", file: "../files/SCD.zip" },
        { name: "DFD", img: "../images/tbi.jpg", file: "../files/DFD.zip" },
        { name: "BNT", img: "../images/tbi.jpg", file: "../files/BNT.zip" },
        { name: "LMK0804A2-C5A-159R210", img: "../images/lmklogo.jpg", file: "../files/LMK0804A2-C5A-159R210.zip" },
        { name: "LMK0804A2-C5A-249R300", img: "../images/lmklogo.jpg", file: "../files/LMK0804A2-C5A-249R300.zip" },
        { name: "LMK0805A2-C5A-160R210", img: "../images/lmklogo.jpg", file: "../files/LMK0805A2-C5A-160R210.zip" },
        { name: "LMK0805A2-C5A-290R340", img: "../images/lmklogo.jpg", file: "../files/LMK0805A2-C5A-290R340.zip" },
        { name: "LMK0808A1-C5A-247R300", img: "../images/lmklogo.jpg", file: "../files/LMK0808A1-C5A-247R300.zip" },
        { name: "LMK0810A1-C5A-157R210", img: "../images/lmklogo.jpg", file: "../files/LMK0810A1-C5A-157R210.zip" },
        { name: "LMK0810A1-C5A-287R340", img: "../images/lmklogo.jpg", file: "../files/LMK0810A1-C5A-287R340.zip" },
    ],
    git: [
        { name: "TM Screw", img: "../images/tm.jpg", file: "../files/TM Screw.zip" },
        { name: "FF", img: "../images/git.jpg", file: "../files/AF.zip" },
        { name: "FF", img: "../images/git.jpg", file: "../files/AF.zip" },
        { name: "EF", img: "../images/git.jpg", file: "../files/EF.zip" },
        { name: "BF", img: "../images/git.jpg", file: "../files/BF.zip" },
        { name: "FK", img: "../images/git.jpg", file: "../files/FK.zip" },
        { name: "AK", img: "../images/git.jpg", file: "../files/AK.zip" },
        { name: "EK", img: "../images/git.jpg", file: "../files/EK.zip" },
        { name: "BK", img: "../images/git.jpg", file: "../files/BK.zip" }
    ]
};

const filterButtons = document.querySelectorAll('.jp-brand-item');
const productDisplay = document.getElementById('jp-product-display');

// 2. 제품 렌더링 함수
function renderSbcProducts(categoryId) {
    productDisplay.style.opacity = '0';
    productDisplay.innerHTML = '';

    setTimeout(() => {
        const products = SBC_DATA[categoryId];

        if (!products || products.length === 0) {
            productDisplay.innerHTML = '<p style="grid-column:1/-1; text-align:center; padding:50px;">등록된 제품 정보가 없습니다.</p>';
        } else {
            products.forEach(item => {
                const cardHTML = `
                    <a href="${item.file}" download="${item.name}" class="jp-product-card">
                        <div class="jp-product-img-box">
                            <img src="${item.img}" alt="${item.name}" class="jp-product-img" onerror="this.src='../images/no-image.png'">
                            <div class="download-overlay">
                                <span>CAD DOWNLOAD</span>
                            </div>
                        </div>
                        <div class="jp-product-info">
                            <h3 class="jp-product-name">${item.name}</h3>
                        </div>
                    </a>
                `;
                productDisplay.insertAdjacentHTML('beforeend', cardHTML);
            });
        }
        productDisplay.style.opacity = '1';
    }, 50);
}

// 3. 클릭 이벤트 설정
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('jp-on') && productDisplay.innerHTML !== '') return;

        filterButtons.forEach(btn => btn.classList.remove('jp-on'));
        this.classList.add('jp-on');

        const category = this.getAttribute('data-category');
        renderSbcProducts(category);
    });
});

// 4. 초기 로드 로직 (수정됨: 주소창 파라미터 읽기 기능 추가)
window.addEventListener('load', () => {
    // 주소창에서 ?category= 파라미터를 읽어옵니다.
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    // 파라미터가 유효하면 해당 카테고리를, 없으면 기본값 "lm_guide"를 사용합니다.
    const initialCategory = (categoryParam && SBC_DATA[categoryParam]) ? categoryParam : "lm_guide";
    
    // 버튼 상태 업데이트
    filterButtons.forEach(btn => {
        if(btn.getAttribute('data-category') === initialCategory) {
            btn.classList.add('jp-on');
        } else {
            btn.classList.remove('jp-on');
        }
    });

    // 제품 렌더링 실행
    setTimeout(() => { 
        renderSbcProducts(initialCategory); 
    }, 100);
});
