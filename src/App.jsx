import { useMemo, useState } from 'react';
import { questions } from './data/questions.js';
import { results } from './data/results.js';
import { axisLabels, calculateResult } from './utils/calculateResult.js';

const screens = {
  intro: 'intro',
  test: 'test',
  loading: 'loading',
  result: 'result'
};

export default function App() {
  const [screen, setScreen] = useState(screens.intro);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [copied, setCopied] = useState(false);

  const question = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const resultData = useMemo(() => calculateResult(answers), [answers]);
  const result = results[resultData.key] || results['external-return-yes-release'];

  const start = () => {
    setAnswers({});
    setCurrent(0);
    setScreen(screens.test);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const choose = (choiceId) => {
    setAnswers((prev) => ({ ...prev, [question.id]: choiceId }));
  };

  const next = () => {
    if (!answers[question.id]) return;
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setScreen(screens.loading);
      setTimeout(() => {
        setScreen(screens.result);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 900);
    }
  };

  const prev = () => {
    if (current === 0) return;
    setCurrent((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyResult = async () => {
    const text = `괜찮성 검사 결과\n\n${result.title}\n${result.status}\n\n${result.share}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const shareKakao = () => {
    // Kakao JavaScript SDK를 연결하면 이 부분에 Kakao.Share.sendDefault 로직을 넣으면 됩니다.
    copyResult();
    alert('카카오 공유 SDK 연결 전입니다. 결과 문구를 클립보드에 복사했습니다.');
  };

  if (screen === screens.intro) {
    return (
      <main className="page intro-page">
        <Header code="000_STATUS CHECK" />
        <section className="hero frame">
          <div className="brand-row">
            <p className="eyebrow">해삶도 : 삶의 해상도</p>
            <a className="insta-link" href="https://www.instagram.com/haesalmdo/" target="_blank" rel="noreferrer">@haesalmdo</a>
          </div>
          <h1>괜찮성 검사</h1>
          <p className="subtitle">나의 괜찮음을 확인합니다.</p>
          <p className="note highlight">높고 낮음을 재는 검사가 아니라, 지금 나의 상태를 조용히 살펴보는 점검입니다.</p>
          <div className="intro-copy">
            <p>이 점검은 좋고 나쁨을 판단하지 않는다.</p>
            <p>지금 어떤 방식으로 살아가고 있는지,<br />무너졌을 때 어떻게 돌아오고,<br />어디로 가는지 모를 때 무엇을 따라 움직이는지,<br />지나간 감정을 어떻게 다루는지 조용히 살펴본다.</p>
          </div>
          <button className="primary-btn" onClick={start}>괜찮음 확인하기</button>
        </section>
      </main>
    );
  }

  if (screen === screens.loading) {
    return (
      <main className="page loading-page">
        <Header code="STATUS CHECKING..." />
        <section className="frame loading-box">
          <p className="eyebrow">잠시만</p>
          <h2>상태값을 확인하는 중</h2>
          <p className="highlight">지나온 장면들을 정리하고 있습니다.</p>
          <div className="loading-line" />
        </section>
      </main>
    );
  }

  if (screen === screens.result) {
    return (
      <main className="page result-page">
        <Header code={`RESULT_${result.id}`} />
        <section className="frame result-card">
          <p className="eyebrow">괜찮성 검사 결과</p>
          <h1 className="result-title">{result.title}</h1>
          <p className="result-status highlight">{result.status}</p>
          <div className="result-body">
            {result.body.split('\n').map((line, index) => (
              line ? <p key={index}>{line}</p> : <div key={index} className="paragraph-gap" />
            ))}
          </div>
          <p className="share-sentence highlight">{result.share}</p>
          <div className="tags">
            {result.tags.map((tag) => <span key={tag}>#{tag}</span>)}
          </div>
          <details className="debug-panel">
            <summary>상태값 보기</summary>
            <p>기준: {axisLabels[resultData.selected.standard]} / 회복: {axisLabels[resultData.selected.recovery]} / 방향: {axisLabels[resultData.selected.direction]} / 감정: {axisLabels[resultData.selected.emotion]}</p>
          </details>
          <div className="button-row">
            <button className="secondary-btn" onClick={start}>다시하기</button>
            <button className="secondary-btn" onClick={copyResult}>{copied ? '복사됨' : '링크/결과 복사'}</button>
            <button className="primary-btn small" onClick={shareKakao}>카카오톡 공유</button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page test-page">
      <Header code={`${String(question.id).padStart(3, '0')}_SCENE`} />
      <section className="frame question-card">
        <div className="progress-wrap">
          <span>{String(current + 1).padStart(2, '0')} / {questions.length}</span>
          <div className="progress"><div style={{ width: `${progress}%` }} /></div>
        </div>
        <h1>{question.scene}</h1>
        <p className="question-text">{question.text}</p>
        {current === 0 && <p className="mini-guide">정답은 없습니다. 가장 먼저 몸이 반응하는 문장을 고르면 됩니다.</p>}
        <div className="choices">
          {question.choices.map((choice) => (
            <button
              key={choice.id}
              className={`choice ${answers[question.id] === choice.id ? 'selected' : ''}`}
              onClick={() => choose(choice.id)}
            >
              <span>{choice.id.toUpperCase()}.</span>
              <em>{choice.text}</em>
            </button>
          ))}
        </div>
        <div className="button-row nav-row">
          <button className="secondary-btn" onClick={prev} disabled={current === 0}>이전 장면</button>
          <button className="primary-btn small" onClick={next} disabled={!answers[question.id]}>
            {current === questions.length - 1 ? '괜찮음 확인하기' : '다음 장면으로'}
          </button>
        </div>
      </section>
    </main>
  );
}

function Header({ code }) {
  return (
    <header className="site-header">
      <span>{code}</span>
      <span>Good Enough.</span>
    </header>
  );
}
