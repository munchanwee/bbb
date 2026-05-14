export const questions = [
  {
    id: 1,
    scene: '떠나기로 했다',
    text: '며칠 전부터\n어딘가 가야 할 것 같은 생각이 들었다.',
    choices: [
      { id: 'a', text: '사람들이 좋다고 한 곳이 떠올랐다', scores: [{ axis: 'standard', value: 'external', weight: 1 }, { axis: 'direction', value: 'yes', weight: 0.5 }] },
      { id: 'b', text: '여기서 조금 벗어나고 싶었다', scores: [{ axis: 'standard', value: 'internal', weight: 1 }, { axis: 'direction', value: 'no', weight: 0.5 }] },
      { id: 'c', text: '오래전부터 가보고 싶었던 곳이 있었다', scores: [{ axis: 'standard', value: 'internal', weight: 1 }, { axis: 'direction', value: 'yes', weight: 0.5 }] },
      { id: 'd', text: '이유는 잘 모르겠는데 그냥 나가고 싶었다', scores: [{ axis: 'standard', value: 'internal', weight: 1 }, { axis: 'direction', value: 'no', weight: 0.5 }] }
    ]
  },
  {
    id: 2,
    scene: '출발 당일 아침',
    text: '알람은 울렸고,\n생각보다 몸이 무거웠다.',
    choices: [
      { id: 'a', text: '원래 출발 전엔 늘 이런 편이다', scores: [{ axis: 'recovery', value: 'return', weight: 1 }, { axis: 'emotion', value: 'release', weight: 0.5 }] },
      { id: 'b', text: '조금만 더 누워 있을까 고민했다', scores: [{ axis: 'recovery', value: 'stay', weight: 1 }, { axis: 'emotion', value: 'hold', weight: 0.5 }] },
      { id: 'c', text: '예약한 것들이 생각나서 일어났다', scores: [{ axis: 'recovery', value: 'return', weight: 1 }, { axis: 'standard', value: 'external', weight: 0.5 }] },
      { id: 'd', text: '집안을 어슬렁어슬렁 거리고 있다', scores: [{ axis: 'recovery', value: 'stay', weight: 1 }, { axis: 'emotion', value: 'hold', weight: 0.5 }] }
    ]
  },
  {
    id: 3,
    scene: '짐을 싸는 중',
    text: '서랍 안쪽에서\n예전에 찾아 헤매던 물건을 발견했다.',
    choices: [
      { id: 'a', text: '다시 넣어두고 짐을 마저 쌌다', scores: [{ axis: 'emotion', value: 'release', weight: 1 }, { axis: 'recovery', value: 'return', weight: 0.5 }] },
      { id: 'b', text: '잠깐 보려다가 생각보다 오래 들여다봤다', scores: [{ axis: 'emotion', value: 'hold', weight: 1 }, { axis: 'recovery', value: 'stay', weight: 0.5 }] },
      { id: 'c', text: '왜 이제야 나왔는지 생각했다', scores: [{ axis: 'emotion', value: 'hold', weight: 1 }, { axis: 'standard', value: 'internal', weight: 0.5 }] },
      { id: 'd', text: '사진 찍어둘까 잠깐 고민했다', scores: [{ axis: 'emotion', value: 'hold', weight: 1 }, { axis: 'direction', value: 'yes', weight: 0.5 }] }
    ]
  },
  {
    id: 4,
    scene: '버스를 놓쳤다',
    text: '도착했을 때는 이미\n버스가 출발한 뒤였다.',
    choices: [
      { id: 'a', text: '다음 시간을 바로 확인했다', scores: [{ axis: 'recovery', value: 'return', weight: 1 }, { axis: 'direction', value: 'yes', weight: 0.5 }] },
      { id: 'b', text: '그냥 멍해졌다', scores: [{ axis: 'recovery', value: 'stay', weight: 1 }, { axis: 'emotion', value: 'release', weight: 0.5 }] },
      { id: 'c', text: '출발부터 꼬인 느낌이 들었다', scores: [{ axis: 'recovery', value: 'stay', weight: 1 }, { axis: 'emotion', value: 'hold', weight: 0.5 }] },
      { id: 'd', text: '근처 편의점부터 들어갔다', scores: [{ axis: 'recovery', value: 'return', weight: 1 }, { axis: 'direction', value: 'no', weight: 0.5 }] }
    ]
  },
  {
    id: 5,
    scene: '옆자리 사람이 말을 건다',
    text: '어디까지 가냐는 질문이\n생각보다 오래 이어졌다.',
    choices: [
      { id: 'a', text: '자연스럽게 대화를 이어갔다', scores: [{ axis: 'standard', value: 'external', weight: 1 }, { axis: 'emotion', value: 'release', weight: 0.5 }] },
      { id: 'b', text: '적당히 대답하고 창밖을 봤다', scores: [{ axis: 'standard', value: 'internal', weight: 1 }, { axis: 'emotion', value: 'release', weight: 0.5 }] },
      { id: 'c', text: '불편해서 경계심이 발동했다', scores: [{ axis: 'standard', value: 'internal', weight: 1 }, { axis: 'emotion', value: 'hold', weight: 0.5 }] },
      { id: 'd', text: '호감이 생기면 더 이야기해볼 생각이었다', scores: [{ axis: 'standard', value: 'internal', weight: 1 }, { axis: 'direction', value: 'yes', weight: 0.5 }] }
    ]
  },
  {
    id: 6,
    scene: '계획 없는 동네',
    text: '도착은 했는데\n어디부터 가야 할지는 모르겠다.',
    choices: [
      { id: 'a', text: '유명한 곳부터 검색했다', scores: [{ axis: 'direction', value: 'yes', weight: 1 }, { axis: 'standard', value: 'external', weight: 0.5 }] },
      { id: 'b', text: '그냥 눈에 들어오는 골목으로 걸었다', scores: [{ axis: 'direction', value: 'no', weight: 1 }, { axis: 'standard', value: 'internal', weight: 0.5 }] },
      { id: 'c', text: '카페부터 찾아 들어갔다', scores: [{ axis: 'direction', value: 'no', weight: 1 }, { axis: 'recovery', value: 'stay', weight: 0.5 }] },
      { id: 'd', text: '사람 많은 방향으로 움직였다', scores: [{ axis: 'direction', value: 'no', weight: 1 }, { axis: 'standard', value: 'external', weight: 0.5 }] }
    ]
  },
  {
    id: 7,
    scene: '낯선 가게',
    text: '가게에 들어갔는데\n무엇을 골라야 할지 잘 모르겠다.',
    choices: [
      { id: 'a', text: '다른 사람이 고른 걸 따라 골랐다', scores: [{ axis: 'standard', value: 'external', weight: 1 }, { axis: 'direction', value: 'no', weight: 0.5 }] },
      { id: 'b', text: '제일 끌리는 이름을 골랐다', scores: [{ axis: 'standard', value: 'internal', weight: 1 }, { axis: 'direction', value: 'no', weight: 0.5 }] },
      { id: 'c', text: '하나씩 찾아보며 확인했다', scores: [{ axis: 'standard', value: 'internal', weight: 1 }, { axis: 'direction', value: 'yes', weight: 0.5 }] },
      { id: 'd', text: '추천을 물어봤다', scores: [{ axis: 'standard', value: 'external', weight: 1 }, { axis: 'direction', value: 'yes', weight: 0.5 }] }
    ]
  },
  {
    id: 8,
    scene: '예약한 숙소',
    text: '사진으로 봤던 분위기와\n생각보다 많이 달랐다.',
    choices: [
      { id: 'a', text: '일단 짐부터 풀었다', scores: [{ axis: 'recovery', value: 'return', weight: 1 }, { axis: 'emotion', value: 'release', weight: 0.5 }] },
      { id: 'b', text: '환불 가능한지 확인했다', scores: [{ axis: 'recovery', value: 'return', weight: 1 }, { axis: 'standard', value: 'internal', weight: 0.5 }] },
      { id: 'c', text: '하루쯤은 이럴 수도 있다고 생각했다', scores: [{ axis: 'recovery', value: 'return', weight: 1 }, { axis: 'emotion', value: 'release', weight: 0.5 }] },
      { id: 'd', text: '환기를 시키려고 창문을 열었다', scores: [{ axis: 'recovery', value: 'stay', weight: 1 }, { axis: 'emotion', value: 'hold', weight: 0.5 }] }
    ]
  },
  {
    id: 9,
    scene: '갑자기 비가 왔다',
    text: '우산은 없고\n생각보다 비가 오래 온다.',
    choices: [
      { id: 'a', text: '비 피할 곳부터 찾았다', scores: [{ axis: 'emotion', value: 'release', weight: 1 }, { axis: 'recovery', value: 'return', weight: 0.5 }] },
      { id: 'b', text: '그냥 조금 맞고 걸었다', scores: [{ axis: 'emotion', value: 'release', weight: 1 }, { axis: 'standard', value: 'internal', weight: 0.5 }] },
      { id: 'c', text: '처마 아래 한참 서 있었다', scores: [{ axis: 'emotion', value: 'hold', weight: 1 }, { axis: 'recovery', value: 'stay', weight: 0.5 }] },
      { id: 'd', text: '비 냄새가 좋다고 생각했다', scores: [{ axis: 'emotion', value: 'hold', weight: 1 }, { axis: 'recovery', value: 'stay', weight: 0.5 }] }
    ]
  },
  {
    id: 10,
    scene: '혼자 먹는 저녁',
    text: '옆 테이블 웃음소리가\n자꾸 들린다.',
    choices: [
      { id: 'a', text: '이어폰으로 귀를 닫는다', scores: [{ axis: 'standard', value: 'internal', weight: 1 }, { axis: 'emotion', value: 'release', weight: 0.5 }] },
      { id: 'b', text: '무슨 얘긴지 괜히 듣게 됐다', scores: [{ axis: 'standard', value: 'external', weight: 1 }, { axis: 'emotion', value: 'hold', weight: 0.5 }] },
      { id: 'c', text: '나도 모르게 따라 웃었다', scores: [{ axis: 'standard', value: 'external', weight: 1 }, { axis: 'emotion', value: 'release', weight: 0.5 }] },
      { id: 'd', text: '빨리 먹고 나간다', scores: [{ axis: 'standard', value: 'internal', weight: 1 }, { axis: 'recovery', value: 'return', weight: 0.5 }] }
    ]
  },
  {
    id: 11,
    scene: '오래된 가게 앞',
    text: '내 취향에 맞는\n오래된 가게의 멋스러움에 눈길이 갔다.',
    choices: [
      { id: 'a', text: '그냥 지나갔다', scores: [{ axis: 'emotion', value: 'release', weight: 1 }, { axis: 'direction', value: 'yes', weight: 0.5 }] },
      { id: 'b', text: '예전엔 어떤 곳이었을지 상상했다', scores: [{ axis: 'emotion', value: 'hold', weight: 1 }, { axis: 'direction', value: 'no', weight: 0.5 }] },
      { id: 'c', text: '사진 한 장 찍었다', scores: [{ axis: 'emotion', value: 'hold', weight: 1 }, { axis: 'direction', value: 'yes', weight: 0.5 }] },
      { id: 'd', text: '한참을 바라본다', scores: [{ axis: 'emotion', value: 'hold', weight: 1 }, { axis: 'recovery', value: 'stay', weight: 0.5 }] }
    ]
  },
  {
    id: 12,
    scene: '이동 중 떠오른 현실',
    text: '갑자기 돌아가서 해야 할 일들이 생각났다.',
    choices: [
      { id: 'a', text: '잠깐 생각하다 말았다', scores: [{ axis: 'recovery', value: 'return', weight: 1 }, { axis: 'emotion', value: 'release', weight: 0.5 }] },
      { id: 'b', text: '메모장에 적어뒀다', scores: [{ axis: 'recovery', value: 'return', weight: 1 }, { axis: 'standard', value: 'internal', weight: 0.5 }] },
      { id: 'c', text: '머리가 무거워진다', scores: [{ axis: 'recovery', value: 'stay', weight: 1 }, { axis: 'emotion', value: 'hold', weight: 0.5 }] },
      { id: 'd', text: '누군가한테 연락할까 고민했다', scores: [{ axis: 'recovery', value: 'stay', weight: 1 }, { axis: 'standard', value: 'external', weight: 0.5 }] }
    ]
  },
  {
    id: 13,
    scene: '예상 못한 풍경',
    text: '길을 잘못 들었는데\n생각보다 괜찮은 곳이 나왔다.',
    choices: [
      { id: 'a', text: '사진부터 찍었다', scores: [{ axis: 'direction', value: 'yes', weight: 1 }, { axis: 'emotion', value: 'hold', weight: 0.5 }] },
      { id: 'b', text: '다음에 다시 와야겠다고 생각했다', scores: [{ axis: 'direction', value: 'yes', weight: 1 }, { axis: 'emotion', value: 'hold', weight: 0.5 }] },
      { id: 'c', text: '그냥 한참 보고 있었다', scores: [{ axis: 'direction', value: 'no', weight: 1 }, { axis: 'emotion', value: 'release', weight: 0.5 }] },
      { id: 'd', text: '이곳에서 하루를 보낸다', scores: [{ axis: 'direction', value: 'no', weight: 1 }, { axis: 'emotion', value: 'hold', weight: 0.5 }] }
    ]
  },
  {
    id: 14,
    scene: '마지막 밤',
    text: '내일이면 돌아간다.',
    choices: [
      { id: 'a', text: '돌아가서 할 일들을 생각했다', scores: [{ axis: 'emotion', value: 'release', weight: 1 }, { axis: 'recovery', value: 'return', weight: 0.5 }] },
      { id: 'b', text: '오늘 있었던 일들을 천천히 떠올렸다', scores: [{ axis: 'emotion', value: 'hold', weight: 1 }, { axis: 'recovery', value: 'stay', weight: 0.5 }] },
      { id: 'c', text: '빨리 집 가서 쉬고 싶었다', scores: [{ axis: 'emotion', value: 'release', weight: 1 }, { axis: 'recovery', value: 'return', weight: 0.5 }] },
      { id: 'd', text: '괜히 잠들기 싫었다', scores: [{ axis: 'emotion', value: 'hold', weight: 1 }, { axis: 'recovery', value: 'stay', weight: 0.5 }] }
    ]
  },
  {
    id: 15,
    scene: '돌아가는 길',
    text: '창밖 풍경이 계속 뒤로 밀려났다.',
    choices: [
      { id: 'a', text: '다음 이동을 벌써 생각하고 있었다', scores: [{ axis: 'direction', value: 'yes', weight: 1 }, { axis: 'emotion', value: 'release', weight: 0.5 }] },
      { id: 'b', text: '돌아가면 뭘 먼저 해야 할지 정리했다', scores: [{ axis: 'direction', value: 'yes', weight: 1 }, { axis: 'recovery', value: 'return', weight: 0.5 }] },
      { id: 'c', text: '아무 생각 없이 음악만 들었다', scores: [{ axis: 'direction', value: 'no', weight: 1 }, { axis: 'emotion', value: 'release', weight: 0.5 }] },
      { id: 'd', text: '이동 중 만난 얼굴들이 떠올랐다', scores: [{ axis: 'direction', value: 'no', weight: 1 }, { axis: 'emotion', value: 'hold', weight: 0.5 }] }
    ]
  },
  {
    id: 16,
    scene: '집 앞에 도착했다',
    text: '생각보다 조용했다.',
    choices: [
      { id: 'a', text: '짐부터 풀었다', scores: [{ axis: 'recovery', value: 'return', weight: 1 }, { axis: 'emotion', value: 'release', weight: 0.5 }] },
      { id: 'b', text: '근처 카페를 들렀다 간다', scores: [{ axis: 'recovery', value: 'stay', weight: 1 }, { axis: 'emotion', value: 'hold', weight: 0.5 }] },
      { id: 'c', text: '다녀왔다고 누군가에게 연락했다', scores: [{ axis: 'recovery', value: 'return', weight: 1 }, { axis: 'standard', value: 'external', weight: 0.5 }] },
      { id: 'd', text: '지나온 사진부터 다시 봤다', scores: [{ axis: 'recovery', value: 'stay', weight: 1 }, { axis: 'emotion', value: 'hold', weight: 0.5 }] }
    ]
  }
];
