import { questions } from '../data/questions.js';

export const AXES = {
  standard: ['external', 'internal'],
  recovery: ['return', 'stay'],
  direction: ['yes', 'no'],
  emotion: ['release', 'hold']
};

export const axisLabels = {
  external: '외부',
  internal: '내부',
  return: '돌아옴',
  stay: '머묾',
  yes: '있음',
  no: '없음',
  release: '흘림',
  hold: '붙잡음'
};

const defaultScores = () => ({
  standard: { external: 0, internal: 0 },
  recovery: { return: 0, stay: 0 },
  direction: { yes: 0, no: 0 },
  emotion: { release: 0, hold: 0 }
});

const buildMaxScores = () => {
  const maxScores = defaultScores();

  questions.forEach((question) => {
    question.choices.forEach((choice) => {
      choice.scores.forEach(({ axis, value, weight }) => {
        if (!maxScores[axis] || maxScores[axis][value] === undefined) return;
        maxScores[axis][value] += weight;
      });
    });
  });

  return maxScores;
};

const maxScores = buildMaxScores();

export function calculateResult(answers) {
  const scores = defaultScores();
  const lastAxisValue = {};

  questions.forEach((question) => {
    const answerId = answers[question.id];
    const choice = question.choices.find((item) => item.id === answerId);
    if (!choice) return;

    choice.scores.forEach(({ axis, value, weight }) => {
      if (!scores[axis] || scores[axis][value] === undefined) return;
      scores[axis][value] += weight;
      lastAxisValue[axis] = value;
    });
  });

  const selected = {};

  Object.entries(AXES).forEach(([axis, values]) => {
    const [a, b] = values;
    const normalizedA = maxScores[axis][a] ? scores[axis][a] / maxScores[axis][a] : 0;
    const normalizedB = maxScores[axis][b] ? scores[axis][b] / maxScores[axis][b] : 0;

    if (normalizedA > normalizedB) selected[axis] = a;
    else if (normalizedB > normalizedA) selected[axis] = b;
    else selected[axis] = lastAxisValue[axis] || a;
  });

  const key = `${selected.standard}-${selected.recovery}-${selected.direction}-${selected.emotion}`;

  return { key, scores, selected, maxScores };
}
