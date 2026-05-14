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

const copySummaries = {
  '01': '겉으로는 꽤 정상적으로 굴러가는 사람이다. 해야 할 일을 하고, 흐름을 크게 거스르지 않는다. 다만 안쪽에는 작은 이상음이 있다. 괜찮다고 넘기지만 가끔 마음에 경고등이 켜진다. 그래도 멈추지는 않는다. 약간 덜컹거려도 계속 작동하는 방식으로 살아온 사람이다.',
  '02': '겉으로는 잘 넘어간 것처럼 보인다. 상황이 바뀌면 다시 움직이고, 해야 할 일도 해낸다. 다만 감정은 조금 늦게 도착한다. 그때는 괜찮았던 일이 나중에야 마음을 건드린다. 이 사람은 삶을 한 번은 사건으로, 한 번은 뒤늦은 마음으로 다시 겪는다.',
  '03': '뚜렷한 목적지가 없어도 멈추지는 않는 사람이다. 어디로 가야 하는지 몰라도 일단 다음 장면으로 넘어간다. 계획이 틀어져도 크게 무너지지 않고, 다른 길을 찾아본다. 방향이 없다고 해서 길을 잃은 건 아니다. 계속 움직였다는 사실이 그날의 유일한 방향일 때도 있다.',
  '04': '겉으로는 괜찮다고 넘어가지만, 안쪽에서는 지난 마음이 조용히 실행 중이다. 끝난 대화, 애매한 표정, 별일 아니었던 장면들이 뒤늦게 다시 열린다. 그래도 이 사람은 다음 장면으로 간다. 다 닫지 못한 창 몇 개를 켜둔 채로도 삶은 계속 작동한다.',
  '05': '방향이 없는 사람은 아니다. 가야 할 곳도 알고, 해야 할 일도 안다. 다만 속도가 느리다. 남들이 다음 단계로 넘어갈 때 아직 예열 중일 때가 많다. 게으른 게 아니라 과속하면 마음이 먼저 멀미를 하는 사람이다. 저속 주행도 분명 주행이다.',
  '06': '함께 움직이고 흐름에 맞추지만, 지나간 장면을 너무 많이 저장하는 사람이다. 별일 아닌 말, 표정, 마음의 흔들림이 임시 파일처럼 남는다. 그래서 자주 피곤하다. 하지만 그만큼 무심하지 않다. 다만 모든 감정을 보관할 필요는 없다. 마음에도 캐시 삭제가 필요하다.',
  '07': '삶을 세게 밀고 나가기보다 흐름 안에 조용히 머무는 사람이다. 목적지가 없는 건 아니지만, 아직 자기 이름을 부르지 못한 상태에 가깝다. 기다림은 무기력이 아닐 수 있다. 다만 너무 오래 대기열에 있으면 기다림이 삶의 기본 자세가 될 수 있다.',
  '08': '사람들과 섞여 움직이지만, 안쪽 감정은 쉽게 마르지 않는다. 괜찮다고 넘긴 일도 혼자 있을 때 다시 눅눅하게 올라온다. 이 사람은 무심하지 않고, 지나간 온도를 오래 기억한다. 완전히 마르지 않았다고 망한 건 아니다. 다만 가끔은 마음에도 창문을 열어야 한다.',
  '09': '자기 기준으로 판단하고, 흔들려도 결국 스스로 다시 켜지는 사람이다. 무너져도 오래 누워 있지 않고 조용히 복귀한다. 고장 나지 않는 사람이 아니라, 고장 난 뒤에도 다시 작동하는 사람에 가깝다. 다만 셀프 복구가 가능하다고 늘 혼자 수리해야 하는 건 아니다.',
  '10': '가야 할 쪽은 아는데, 마음의 로딩바가 아직 끝나지 않은 사람이다. 자기 안에서 납득되어야 움직이고, 지나간 감정을 쉽게 닫지 못한다. 느려 보여도 멈춘 것은 아니다. 속으로는 계속 경로를 다시 계산하는 중이다. 가면서 처리되는 마음도 있다.',
  '11': '정해진 목적지는 없지만, 몸이 먼저 숨 쉴 곳을 찾아내는 사람이다. 남들이 좋다고 해도 마음이 안 가면 오래 머물지 못하고, 이유 없이 끌리는 쪽으로 움직인다. 대책 없어 보여도 그 안에 생존 감각이 있다. 삶은 가끔 내비게이션보다 발바닥을 먼저 믿어야 한다.',
  '12': '방향은 흐릿하지만, 지나간 장면을 오래 저장하는 사람이다. 낮에는 괜찮았던 일이 새벽에 다시 열리고, 그때는 몰랐던 감정이 뒤늦게 도착한다. 이 사람은 남은 장면들로 자기만의 지도를 만든다. 다만 모든 로그를 매번 다시 실행할 필요는 없다.',
  '13': '목적지는 있지만 에너지를 아껴 쓰며 움직이는 사람이다. 크게 타오르지는 않지만 쉽게 꺼지지도 않는다. 남들이 보기엔 느려 보여도, 오래 가기 위한 속도를 찾는 중일 수 있다. 절전모드도 작동은 작동이다. 다만 언젠가는 밝기를 조금 올려도 된다.',
  '14': '가야 할 곳은 아는데 몸이 잘 따라주지 않는 사람이다. 마음속에는 오래 품은 방향이 있지만, 출발하려 하면 예전의 상처와 두려움이 함께 올라온다. 미루는 것처럼 보여도 사실 내부 결재가 오래 걸리는 상태다. 어떤 출발은 마음보다 발이 먼저 허락해줄 때도 있다.',
  '15': '강한 추진력으로 삶을 밀고 가는 사람은 아니다. 목적지도 흐릿하고 의지도 자주 꺼진다. 하지만 완전히 가라앉지는 않는다. 많은 것을 흘려보내며 그날의 공기 안에서 버틴다. 삶은 늘 추진력으로만 움직이지 않는다. 가끔은 부력만으로도 하루를 넘긴다.',
  '16': '삶을 빠르게 정리하지 못하는 사람이다. 지나간 말, 표정, 장소, 조용했던 순간들이 마음 안에서 계속 재생된다. 방향은 흐릿해도 무엇이 오래 남았는지는 안다. 모든 장면을 다시 열어볼 필요는 없지만, 미완료 파일 몇 개를 품고도 사람은 다음 화면으로 넘어간다.'
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

${copySummaries[result.id] || result.status}

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
          <p className="result-note">점수는 나오지 않습니다.<br />결과는 하나의 상태값으로 출력됩니다.</p>
          <div className="intro-copy">
            <p>이 점검은 좋고 나쁨을 판단하지 않는다.</p>
            <p>지금 어떤 방식으로 살아가고 있는지,<br />무너졌을 때 어떻게 돌아오는지,<br />길을 잃었을 때 무엇을 따라 움직이는지,<br />지나간 감정을 어떻게 다루는지 살펴본다.</p>
          </div>
          <DecorativeCharacter src={characters.duo} className="intro-character" alt="위위와 문문이" />
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
