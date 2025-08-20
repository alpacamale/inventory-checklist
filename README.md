# Inventory Checklist (재고조사표)

간단한 **재고조사표 웹앱**입니다.  
개인 학습 목적으로 만든 프로젝트이며, GitHub Pages를 통해 배포됩니다.

## 📌 주요 기능

- CSV 파일에서 품목 데이터를 불러와 테이블로 표시
- 품목코드 / 품목명 / 단위 / 금일재고량 입력 가능
- JavaScript로 동적 테이블 생성
- 간단한 스타일링 (CSS)

## 📱 PWA 지원

- **홈 화면에 추가** 가능 (안드로이드 크롬 / 삼성 인터넷 브라우저 권장)
- **오프라인 모드**에서도 기본 페이지 열람 가능
- **Maskable 아이콘** 지원으로 다양한 기기에서 자연스러운 앱 아이콘 표시
- **새로고침 방지** 조작 실수로 인한 새로고침으로 데이터가 유실되는 것을 방지

## 🗂️ 데이터 전처리

- 원본 인벤토리 데이터는 Jupyter Notebook에서 전처리했습니다.
- 작업 내용:
  - CSV 인코딩(EUC-KR → UTF-8) 변환
  - 품목코드 / 품목명 / 단위 컬럼만 추출
  - 불필요한 NaN 제거 및 데이터 타입 정리

## 🚀 실행 방법

1. 레포지토리를 클론:

```bash
git clone https://github.com/alpacamale/inventory-checklist.git
cd inventory-checklist
```

2. 로컬에서 실행:

```bash
# 예: VSCode Live Server / python -m http.server 사용
```

3. GitHub Pages 배포:

   - `main` 또는 `gh-pages` 브랜치에서
   - `index.html`이 루트에 있으면 자동 배포

👉 배포된 페이지: [GitHub Pages 링크](https://alpacamale.github.io/inventory-checklist/)

## 📂 프로젝트 구조

```
.
├── data/
│   └── data.csv      # 로우데이터
│   └── encoded.csv   # 인코딩된 재고 데이터
│   └── items.csv     # 전처리된 재고 데이터
├── icons/
│   └── icon-192.png
│   └── icon-512.png
│   └── icon-maskable-512.png
├── src/
│   ├── scripts/
│   │   ├── index.js
│   │   └── sw.js
│   └── styles/
│       └── style.css
├── .gitignore
├── index.html
├── manifest.webmanifest  # PWA를 위한 매니페스트
├── note.ipynb    # Jupyter Notebook (데이터 전처리)
├── README.md
└── sw.js
```

## 📝 메모

- 단순 개인 연습용 프로젝트
- 추후 기능 아이디어:

  - 입력값 저장 (localStorage)
  - 총 재고량 합산 기능
  - 엑셀/CSV로 다시 내보내기
