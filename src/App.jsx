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

const HAESALMDO_URL = 'https://www.instagram.com/haesalmdo/';
const characters = {
  wiwi: 'https://static.wixstatic.com/media/5471a2_6a38e2131c85482985a2a44dfb11f0cb~mv2.png',
  munmun: 'https://static.wixstatic.com/media/5471a2_b55032fa47824105a1dcc3486b618187~mv2.png',
  duo: 'https://static.wixstatic.com/media/5471a2_23c176c59a5c403581c3944e6623f777~mv2.png'
};

export default function App() {
  const [screen, setScreen] = useState(screens.intro);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [copiedType, setCopiedType] = useState(null);

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
      }, 5000);
    }
  };

  const prev = () => {
    if (current === 0) return;
    setCurrent((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const makeCopyText = (type) => {
    const header = `INSTA : @haesalmdo

해삶도의 얼마나 괜찮은지 검사결과`;
    const tags = result.tags.map((tag) => `#${tag}`).join(' ');

    if (type === 'summary') {
      return `${header}

${result.title}

${result.summary || result.status}

${HAESALMDO_URL}`;
    }

    return `${header}

${result.title}
${result.status}

${result.body}

${result.share}

${tags}

${HAESALMDO_URL}`;
  };

  const copyResult = async (type) => {
    try {
      await navigator.clipboard.writeText(makeCopyText(type));
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 1600);
    } catch {
      setCopiedType(null);
    }
  };

  if (screen === screens.intro) {
    return (
      <main className="page intro-page">
        <Header />
        <section className="hero frame">
          <div className="intro-mark">Good Enough Check</div>
          <h1>괜찮성 검사</h1>
          <p className="subtitle">나의 괜찮음을 확인합니다.</p>
          <p className="note highlight">높고 낮음을 재는 검사가 아니라, 지금 나의 상태를 조용히 살펴보는 점검입니다.</p>
          <p className="action-note">16개의 장면을 지나며<br />약 2분 동안 나의 괜찮음이<br />어떤 방식으로 작동하는지 확인합니다.</p>
          <button className="primary-btn" onClick={start}>괜찮음 확인하기 →</button>
          <DecorativeCharacter src={characters.duo} className="intro-character" alt="위위와 문문이" />
          <p className="result-note">점수는 나오지 않습니다.<br />결과는 하나의 상태값으로 출력됩니다.</p>
          <div className="intro-copy">
            <p>이 점검은 좋고 나쁨을 판단하지 않습니다.</p>
            <p>지금 어떤 방식으로 살아가고 있는지,<br />무너졌을 때 어떻게 돌아오는지,<br />길을 잃었을 때 무엇을 따라 움직이는지,<br />지나간 감정을 어떻게 다루는지 살펴봅니다.</p>
          </div>
        </section>
      </main>
    );
  }

  if (screen === screens.loading) {
    return (
      <main className="page loading-page">
        <Header />
        <section className="frame loading-box">
          <p className="eyebrow">잠시만</p>
          <h2>상태값을 확인하는 중</h2>
          <p className="highlight">지나온 장면들을 정리하고 있습니다.</p>
          <DecorativeCharacter src={characters.wiwi} className="loading-character" alt="위위" />
          <div className="loading-line" />
        </section>
      </main>
    );
  }

  if (screen === screens.result) {
    return (
      <main className="page result-page">
        <Header />
        <section className="frame result-card">
          <p className="eyebrow">{`RESULT_${String(result.id).padStart(2, '0')} · 괜찮성 검사 결과`}</p>
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
          <DecorativeCharacter src={characters.munmun} className="result-character" alt="문문이" />
          <div className="button-row result-actions">
            <button className="secondary-btn" onClick={start}>다시하기</button>
            <button className="secondary-btn" onClick={() => copyResult('summary')}>{copiedType === 'summary' ? '요약본 복사됨' : '요약본 복사'}</button>
            <button className="secondary-btn" onClick={() => copyResult('full')}>{copiedType === 'full' ? '전체 복사됨' : '결과전체 복사'}</button>
          </div>
          <a className="essaytoon-link" href={HAESALMDO_URL} target="_blank" rel="noreferrer">해삶도 에세이툰 보기</a>
        </section>
      </main>
    );
  }

  return (
    <main className="page test-page">
      <Header />
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

function Header() {
  return (
    <header className="site-header">
      <a className="header-brand" href={HAESALMDO_URL} target="_blank" rel="noreferrer">
        <span>해삶도</span>
        <b>:</b>
        <span>삶의 해상도</span>
      </a>
      <a className="insta-link" href={HAESALMDO_URL} target="_blank" rel="noreferrer">@haesalmdo</a>
    </header>
  );
}

function DecorativeCharacter({ src, className = '', alt = '' }) {
  return <img className={`character ${className}`} src={src} alt={alt} loading="lazy" />;
}
