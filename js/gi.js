/**
 * SBC LINEAR 제품 필터링 시스템 - 초기 로드 버그 수정판
 */

// 1. 제품 데이터베이스
const SBC_DATA = {
    lm_guide: [
        { name: "BK 고정측", img: "../images/BK.jpg" },
        { name: "EK 고정측", img: "../images/EK.jpg" },
        { name: "AK 고정측", img: "../images/AK.jpg" },
        { name: "FK 고정측", img: "../images/FK.jpg" },
        { name: "BF 지지측", img: "../images/BF.jpg" },
        { name: "EF 지지측", img: "../images/EF.jpg" },
        { name: "AF 지지측", img: "../images/AF.jpg" },
        { name: "FF 지지측", img: "../images/FF.jpg" },
        { name: "WBK", img: "../images/WBK.jpg" },
        { name: "COLLAR", img: "../images/COLLAR.jpg" }, // 칼라만 영어로 변경
        { name: "RN,RAN,KZMV", img: "../images/RN.jpg" }
    ],
    ball_screw: [
        { name: "TTMH", img: "../images/TTMH.jpg" },
        { name: "STM", img: "../images/STM.jpg" },
        { name: "BTM", img: "../images/BTM.jpg" },
        { name: "ATM, FTM, TTM", img: "../images/ATM.jpg" },
        { name: "CTM", img: "../images/CTM.jpg" },
        { name: "TMC 좌우나사", img: "../images/TMC.jpg" },
        { name: "TTM 대형 너트", img: "../images/TTM.jpg" },
        { name: "TML 오른나사", img: "../images/TML.jpg" },
        { name: "TMSR 스테인리스나사 전조", img: "../images/TMSR.jpg" },
        { name: "TML 나사 절삭 TM나사", img: "../images/TMLN.jpg" },
        { name: "TMR 나사 절삭 TM나사", img: "../images/TMR.jpg" }
    ],
    re: [
        { name: "LM형", img: "../images/LM.jpg" },
        { name: "LM-GA형", img: "../images/LMGA.jpg" },
        { name: "LM-MG형", img: "../images/LMMG.jpg" },
        { name: "LME형", img: "../images/LME.jpg" },
        { name: "LM - L형", img: "../images/LML.jpg" },
        { name: "LMF - M형", img: "../images/LMFM.jpg" },
        { name: "LMK형", img: "../images/LMK.jpg" },
        { name: "LMK-M형", img: "../images/LMKM.jpg" },
        { name: "LMF-L형", img: "../images/LMFL.jpg" },
        { name: "LMF-ML형", img: "../images/LMFML.jpg" },
        { name: "LMK-L형", img: "../images/LMKL.jpg" },
        { name: "LMK-ML형", img: "../images/LMKML.jpg" },
        { name: "LMH형", img: "../images/LMH.jpg" },
        { name: "LMH-L형", img: "../images/LMHL.jpg" },
        { name: "SC6 ~ 30형", img: "../images/SC6.jpg" },
        { name: "SC35 ~ 50형", img: "../images/SC35.jpg" },
        { name: "SL형", img: "../images/SL.jpg" },
        { name: "SH형", img: "../images/SH.jpg" },
        { name: "SH-L형", img: "../images/SHL.jpg" },
        { name: "SK형", img: "../images/SK.jpg" }
    ],
    boll: [
        { name: "깊은홈 베어링", img: "../images/boll1.jpg" },
        { name: "미니쳐 볼베어링", img: "../images/boll2.jpg" },
        { name: "앵귤러 볼베어링", img: "../images/boll3.jpg" },
        { name: "자동조심 볼베어링", img: "../images/boll4.jpg" },
        { name: "복열 앵귤러 볼베어링", img: "../images/boll5.jpg" },
        { name: "단식 스러스트 볼베어링", img: "../images/boll6.jpg" },
        { name: "복식 스러스트 볼베어링", img: "../images/boll7.jpg" },
        { name: "미니어처 스러스트 : SST", img: "../images/boll8.jpg" },
        { name: "미니어처 스러스트 : SST-D..", img: "../images/boll9.jpg" },
        { name: "UC 유니트 볼베어링 : UCP2", img: "../images/boll10.jpg" },
        { name: "UC 유니트 볼베어링 : UKP2", img: "../images/boll10.jpg" },
        { name: "UC 유니트 볼베어링 : UCP3", img: "../images/boll10.jpg" },
        { name: "UC 유니트 볼베어링 : UKP3", img: "../images/boll10.jpg" },
        { name: "UC 유니트 볼베어링 : UCF2", img: "../images/boll11.jpg" },
        { name: "UC 유니트 볼베어링 : UCF3", img: "../images/boll11.jpg" },
        { name: "UC 유니트 볼베어링 : UCFC..", img: "../images/boll12.jpg" },
        { name: "UC 유니트 볼베어링 : UCFL..", img: "../images/boll13.jpg" },
        { name: "UC 유니트 볼베어링 : UCT2", img: "../images/boll14.jpg" },
        { name: "UC 유니트 볼베어링 : UCT3", img: "../images/boll14.jpg" },
        { name: "UC 유니트 볼베어링 : UCC2", img: "../images/boll15.jpg" },
        { name: "UC 유니트 볼베어링 : UCPH", img: "../images/boll16.jpg" },
        { name: "UC 유니트 볼베어링 : UCPA", img: "../images/boll17.jpg" },
        { name: "UC 유니트 볼베어링 : UCFA", img: "../images/boll18.jpg" },
        { name: "UC 유니트 볼베어링 : UCFB", img: "../images/boll19.jpg" },
        { name: "UC 유니트 볼베어링 : UCHA", img: "../images/boll20.jpg" },
        { name: "UC 유니트 볼베어링 : SALP", img: "../images/boll21.jpg" },
        { name: "UC 유니트 볼베어링 : SALF", img: "../images/boll22.jpg" },
        { name: "UC 유니트 볼베어링 : SAPP", img: "../images/boll23.jpg" },
        { name: "UC 유니트 볼베어링 : SAPF", img: "../images/boll24.jpg" },
        { name: "UC 유니트 볼베어링 : HC2", img: "../images/boll25.jpg" },
        { name: "UC 유니트 볼베어링 : UR2", img: "../images/boll26.jpg" },
        { name: "UC 유니트 볼베어링 : SER2", img: "../images/boll27.jpg" },
        { name: "UC 유니트 볼베어링 : SA2", img: "../images/boll28.jpg" },
        { name: "UC 유니트 볼베어링 : SB2", img: "../images/boll29.jpg" },
        { name: "소형 볼베어링 유니트 : BP", img: "../images/boll30.jpg" },
        { name: "소형 볼베어링 유니트 : BF", img: "../images/boll31.jpg" },
        { name: "소형 볼베어링 유니트 : UP", img: "../images/boll32.jpg" },
        { name: "소형 볼베어링 유니트 : UF", img: "../images/boll33.jpg" },
        { name: "소형 볼베어링 유니트 : SI", img: "../images/boll34.jpg" }
    ],
    lol: [
        { name: "스페리컬 롤러베어링", img: "../images/lolboll1.jpg" },
        { name: "테이퍼 롤러베이링", img: "../images/lolboll2.jpg" },
        { name: "스러스트 자동조심 베어링", img: "../images/lolboll3.jpg" },
        { name: "복열 원통 로울러 베어링", img: "../images/lolboll4.jpg" },
        { name: "단열 원통 로울러 베어링", img: "../images/lolboll5.jpg" },
        { name: "니들 롤러 베어링 : TLA..Z", img: "../images/lolboll6.jpg" },
        { name: "니들 롤러 베어링 : TLAM", img: "../images/lolboll6.jpg" },
        { name: "니들 로울러 베어링 : TA....", img: "../images/lolboll6.jpg" },
        { name: "니들 롤러 베어링 : KT", img: "../images/lolboll6.jpg" },
        { name: "니들 롤러 베어링 : NTB", img: "../images/lolboll7.jpg" },
        { name: "니들 롤러 베어링 : AS.NTB", img: "../images/lolboll8.jpg" },
        { name: "니들 롤러 베어링 : AZ", img: "../images/lolboll9.jpg" },
        { name: "니들 롤러 베어링 : NA 49 ..", img: "../images/lolboll6.jpg" },
        { name: "니들 롤러 베어링 : NA 69 ..", img: "../images/lolboll6.jpg" },
        { name: "니들 롤러 베어링 : TAFI ...", img: "../images/lolboll6.jpg" }
    ],
    k:[
        { name: "GSP-0180-3BN", img: "../images/k1.jpg" },
        { name: "GSP-0180-2BN", img: "../images/k1.jpg" },
        { name: "GSP-0180-1BN", img: "../images/k1.jpg" },
        { name: "GSP-0180-1B", img: "../images/k1.jpg" },
        { name: "GSP-0180-SB", img: "../images/k1.jpg" },
        { name: "GSP-0150-3B", img: "../images/k1.jpg" },
        { name: "GSP-0150-1B", img: "../images/k1.jpg" },
        { name: "GSP-0150-SB", img: "../images/k1.jpg" },
        { name: "GSP-0160-10", img: "../images/k1.jpg" },
        { name: "GSP-0120-10", img: "../images/k1.jpg" },
        { name: "GSP-0100-4", img: "../images/k1.jpg" },
        { name: "GSP-0625-108BH", img: "../images/k1.jpg" },
        { name: "GSP-0625-108B", img: "../images/k1.jpg" },
        { name: "GSP-0625-65BH", img: "../images/k1.jpg" },
        { name: "GSP-0625-65B", img: "../images/k1.jpg" },
        { name: "GSP-0450-4BN", img: "../images/k1.jpg" },
        { name: "GSP-0450-3BN", img: "../images/k1.jpg" },
        { name: "GSP-0450-2BN", img: "../images/k1.jpg" },
        { name: "GSP-0450-1BN", img: "../images/k1.jpg" },
        { name: "GSP-0320-50B", img: "../images/k1.jpg" },
        { name: "GSP-0320-38B", img: "../images/k1.jpg" },
        { name: "GSP-0320-26B", img: "../images/k1.jpg" },
        { name: "GSP-0320-3BN", img: "../images/k1.jpg" },
        { name: "GSP-0320-38BN", img: "../images/k1.jpg" },
        { name: "GSP-0320-2BN", img: "../images/k1.jpg" },
        { name: "GSP-0320-1BN", img: "../images/k1.jpg" },
        { name: "GSP-0180-27B", img: "../images/k1.jpg" },
        { name: "GSP-0180-4BN", img: "../images/k1.jpg" },
        { name: "GSPC-1200", img: "../images/k2.jpg" },
        { name: "GSPC-0625", img: "../images/k2.jpg" },
        { name: "GSPC-0400", img: "../images/k2.jpg" },
        { name: "GSSP-0900", img: "../images/k3.jpg" },
        { name: "GSSP-0700", img: "../images/k3.jpg" },
        { name: "GSSP-1100", img: "../images/k3.jpg" },
        { name: "GSSPD-1100", img: "../images/k4.jpg" },
        { name: "GSSPD-0900", img: "../images/k4.jpg" },
        { name: "GSSPD-0700", img: "../images/k4.jpg" },
        { name: "GSSP-1100HD", img: "../images/k3.jpg" },
        { name: "GSSP-1200HD", img: "../images/k3.jpg" },
        { name: "GSSP-0900HD", img: "../images/k3.jpg" },
        { name: "GSSP-0625HD", img: "../images/k3.jpg" },
        { name: "GSSP-0400HD", img: "../images/k3.jpg" },
        { name: "GSSP-1100RHD", img: "../images/k3.jpg" },
        { name: "GSSP-1200RHD", img: "../images/k3.jpg" },
        { name: "GSSP-0900RHD", img: "../images/k3.jpg" },
        { name: "GSSP-0625RHD", img: "../images/k3.jpg" },
        { name: "GSSP-0400RHD", img: "../images/k3.jpg" },
        { name: "GS-095", img: "../images/k5.jpg" },
        { name: "GS-070", img: "../images/k5.jpg" },
        { name: "GS-250", img: "../images/k5.jpg" },
        { name: "GS-180", img: "../images/k5.jpg" },
        { name: "GS-130", img: "../images/k5.jpg" },
        { name: "GSS-180RH", img: "../images/k5.jpg" },
        { name: "GSS-180", img: "../images/k5.jpg" },
        { name: "GSS-130", img: "../images/k5.jpg" },
        { name: "GSS-095", img: "../images/k5.jpg" },
        { name: "GSS-070", img: "../images/k5.jpg" },
        { name: "GSS-0350", img: "../images/k5.jpg" }
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