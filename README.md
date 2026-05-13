# 괜찮성 검사

해삶도 : 삶의 해상도 — 괜찮성 검사 웹 프로토타입입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

## 배포

GitHub에 업로드한 뒤 Vercel에서 해당 저장소를 연결하면 됩니다.

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

## 수정 위치

- 질문/선택지/점수값: `src/data/questions.js`
- 결과 본문/상태값/태그: `src/data/results.js`
- 결과 계산 로직: `src/utils/calculateResult.js`
- 화면 구성: `src/App.jsx`
- 디자인: `src/styles.css`

## 카카오톡 공유

현재 카카오톡 공유 버튼은 SDK 연결 전 상태입니다. 버튼을 누르면 결과 문구가 클립보드에 복사됩니다.
카카오 JavaScript SDK를 연결한 뒤 `src/App.jsx`의 `shareKakao()` 함수에 공유 로직을 넣으면 됩니다.
