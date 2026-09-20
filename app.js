// ================== Хранилище загруженных тем ==================
window.__THEMES__ = [];
window.registerTheme = function (theme) {
  window.__THEMES__.push(theme);
};

// ================== Константы ==================
const LEVELS = ['Junior-', 'Junior', 'Junior+', 'Middle', 'Middle+', 'Senior'];
const LEVEL_LABELS = {
  'Junior-': 'Junior−', 'Junior': 'Junior', 'Junior+': 'Junior+',
  'Middle': 'Middle', 'Middle+': 'Middle+', 'Senior': 'Senior'
};
const STORAGE_KEY = 'quiz_progress_v2';
const GENERAL_TEST_SIZE = 18;

// ================== Состояние ==================
const state = {
  screen: 'themes',
  themeId: null,
  level: null,
  subtopic: null,
  theoryIndex: 0,
  testQueue: [],
  testIndex: 0,
  testAnswers: [],
  revealedAnswer: false,
  generalTest: false,
  lastTestResult: null,
  progress: loadProgress()
};
let DATA = [];

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}
function getSubStatus(themeId, level, sub) {
  const key = `${themeId}::${level}::${sub}`;
  return state.progress[key] || { read: false, done: false };
}
function setSubStatus(themeId, level, sub, patch) {
  const key = `${themeId}::${level}::${sub}`;
  const cur = getSubStatus(themeId, level, sub);
  state.progress[key] = { ...cur, ...patch };
  saveProgress();
}

// ================== Утилиты ==================
function getTheme(id) { return DATA.find(t => t.id === id); }

function questionsOfExactLevel(theme, level) {
  return theme.questions.filter(q => q.level === level);
}
function questionsUpToLevel(theme, level) {
  const maxIdx = LEVELS.indexOf(level);
  return theme.questions.filter(q => LEVELS.indexOf(q.level) <= maxIdx);
}
function subtopicsOfExactLevel(theme, level) {
  const qs = questionsOfExactLevel(theme, level);
  const map = {};
  qs.forEach(q => { (map[q.subtopic] = map[q.subtopic] || []).push(q); });
  return map;
}
function shuffle(a) {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ================== Рендер ==================
const app = document.getElementById('app');
function render() {
  app.innerHTML = '';
  if (state.screen === 'themes') renderThemes();
  else if (state.screen === 'levels') renderLevels();
  else if (state.screen === 'subtopics') renderSubtopics();
  else if (state.screen === 'theory') renderTheory();
  else if (state.screen === 'test') renderTest();
  else if (state.screen === 'testResult') renderTestResult();
}

// ---------- Темы ----------
function renderThemes() {
  const header = document.createElement('header');
  header.className = 'page-head';
  const totalQs = DATA.reduce((s, t) => s + t.questions.length, 0);
  header.innerHTML = `
    <div class="brand">
      <div class="brand__logo">📚</div>
      <div>
        <h1>Подготовка к собесам</h1>
        <div class="muted">${totalQs} вопросов в базе</div>
      </div>
    </div>
    <button class="ghost danger" id="resetAll">Сбросить прогресс</button>
  `;
  app.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'grid themes';

  DATA.forEach(theme => {
    const levelsWithQs = LEVELS.filter(l => questionsOfExactLevel(theme, l).length > 0);
    let totalSubs = 0, doneSubs = 0;
    levelsWithQs.forEach(level => {
      const subs = subtopicsOfExactLevel(theme, level);
      Object.keys(subs).forEach(sub => {
        totalSubs++;
        if (getSubStatus(theme.id, level, sub).done) doneSubs++;
      });
    });
    const pct = totalSubs ? Math.round(doneSubs / totalSubs * 100) : 0;
    const isEmpty = theme.questions.length === 0;

    const card = document.createElement('div');
    card.className = 'card' + (pct === 100 && totalSubs > 0 ? ' is-done' : '');
    if (isEmpty) card.style.opacity = '.55';
    card.innerHTML = `
      <h3>${theme.theme}</h3>
      <div class="sub">${isEmpty ? 'Скоро' : `${doneSubs} / ${totalSubs} подтем · ${pct}%`}</div>
      ${!isEmpty ? `<div class="bar"><i style="width:${pct}%"></i></div>` : ''}
    `;
    if (!isEmpty) {
      card.onclick = () => { state.themeId = theme.id; state.screen = 'levels'; render(); };
    }
    grid.appendChild(card);
  });
  app.appendChild(grid);

  document.getElementById('resetAll').onclick = () => {
    if (confirm('Сбросить весь прогресс?')) {
      state.progress = {}; saveProgress(); render();
    }
  };
}

// ---------- Уровни ----------
function renderLevels() {
  const theme = getTheme(state.themeId);
  topBar(`${theme.theme}`, () => { state.screen = 'themes'; render(); });

  const grid = document.createElement('div');
  grid.className = 'grid levels';

  LEVELS.forEach(level => {
    const qs = questionsOfExactLevel(theme, level);
    if (qs.length === 0) return;
    const subs = subtopicsOfExactLevel(theme, level);
    const subNames = Object.keys(subs);
    const done = subNames.filter(s => getSubStatus(theme.id, level, s).done).length;
    const pct = subNames.length ? Math.round(done / subNames.length * 100) : 0;
    const isDone = done === subNames.length && subNames.length > 0;

    const card = document.createElement('div');
    card.className = 'card' + (isDone ? ' is-done' : '');
    card.innerHTML = `
      <h3>${LEVEL_LABELS[level]}</h3>
      <div class="sub">${done} / ${subNames.length} · ${pct}%</div>
      <div class="bar"><i style="width:${pct}%"></i></div>
    `;
    card.onclick = () => { state.level = level; state.screen = 'subtopics'; render(); };
    grid.appendChild(card);
  });
  app.appendChild(grid);
}

// ---------- Подтемы ----------
function renderSubtopics() {
  const theme = getTheme(state.themeId);
  topBar(`${theme.theme} · ${LEVEL_LABELS[state.level]}`, () => { state.screen = 'levels'; render(); });

  const subs = subtopicsOfExactLevel(theme, state.level);
  const upToCount = questionsUpToLevel(theme, state.level).length;

  const general = document.createElement('div');
  general.className = 'general-card';
  general.innerHTML = `
    <h3>🎯 Общий тест уровня</h3>
    <div class="sub">${Math.min(GENERAL_TEST_SIZE, upToCount)} случайных вопросов со всех уровней до ${LEVEL_LABELS[state.level]} включительно</div>
  `;
  general.onclick = () => startGeneralTest();
  app.appendChild(general);

  const grid = document.createElement('div');
  grid.className = 'grid themes';

  Object.entries(subs).forEach(([sub, list]) => {
    const st = getSubStatus(theme.id, state.level, sub);
    const statusIcon = st.done ? '✓' : st.read ? '📖' : '🔒';
    const card = document.createElement('div');
    card.className = 'card' + (st.done ? ' is-done' : '');
    card.innerHTML = `
      <div class="status">${statusIcon}</div>
      <h3>${sub}</h3>
      <div class="sub">${list.length} ${plural(list.length, 'вопрос', 'вопроса', 'вопросов')}</div>
    `;
    card.onclick = () => startTheory(sub);
    grid.appendChild(card);
  });
  app.appendChild(grid);
}

// ---------- Теория ----------
function startTheory(sub) {
  state.subtopic = sub;
  state.theoryIndex = 0;
  state.screen = 'theory';
  render();
}

function renderTheory() {
  const theme = getTheme(state.themeId);
  const subs = subtopicsOfExactLevel(theme, state.level);
  const list = subs[state.subtopic];
  const total = list.length;
  const idx = state.theoryIndex;
  const q = list[idx];

  const nav = document.createElement('div');
  nav.className = 'theory-nav';
  nav.innerHTML = `
    <button class="ghost icon" id="back">←</button>
    <div class="progress-line" style="flex:1">
      <div class="bar"><i style="width:${(idx+1)/total*100}%"></i></div>
      <span class="counter">${idx+1} / ${total}</span>
    </div>
  `;
  app.appendChild(nav);
  document.getElementById('back').onclick = () => { state.screen = 'subtopics'; render(); };

  const box = document.createElement('div');
  box.className = 'qbox';
  box.innerHTML = `
    <div class="tag">${q.subtopic} · ${LEVEL_LABELS[q.level]}</div>
    <div class="q">${escapeHtml(q.q)}</div>
    <div class="a">${escapeHtml(q.a)}</div>
  `;
  app.appendChild(box);

  const actions = document.createElement('div');
  actions.className = 'actions';
  const isLast = idx === total - 1;
  actions.innerHTML = `
    <button id="prev" ${idx === 0 ? 'disabled' : ''}>← Назад</button>
    <div class="spacer"></div>
    ${isLast
      ? `<button class="primary" id="toTest">Пройти тест →</button>`
      : `<button class="primary" id="next">Далее →</button>`}
  `;
  app.appendChild(actions);

  document.getElementById('prev').onclick = () => { state.theoryIndex--; render(); };
  if (!isLast) {
    document.getElementById('next').onclick = () => { state.theoryIndex++; render(); };
  } else {
    document.getElementById('toTest').onclick = () => startTestForSubtopic();
  }
}

// ---------- Тест по подтеме ----------
function startTestForSubtopic() {
  const theme = getTheme(state.themeId);
  const subs = subtopicsOfExactLevel(theme, state.level);
  const list = subs[state.subtopic];

  setSubStatus(theme.id, state.level, state.subtopic, { read: true });

  state.testQueue = shuffle(list).map(q => makeTestQuestion(q, list));
  state.testIndex = 0;
  state.testAnswers = [];
  state.revealedAnswer = false;
  state.generalTest = false;
  state.screen = 'test';
  render();
}

// ---------- Общий тест ----------
function startGeneralTest() {
  const theme = getTheme(state.themeId);
  const all = questionsUpToLevel(theme, state.level);
  const picked = shuffle(all).slice(0, Math.min(GENERAL_TEST_SIZE, all.length));
  state.testQueue = picked.map(q => makeTestQuestion(q, all));
  state.testIndex = 0;
  state.testAnswers = [];
  state.revealedAnswer = false;
  state.generalTest = true;
  state.screen = 'test';
  render();
}

function makeTestQuestion(q, pool) {
  let options;
  if (Array.isArray(q.wrong) && q.wrong.length >= 3) {
    options = shuffle([
      { text: q.a, correct: true },
      ...q.wrong.slice(0, 3).map(text => ({ text, correct: false }))
    ]);
  } else {
    const others = pool.filter(x => x.id !== q.id);
    let distractors = others.filter(x => x.subtopic === q.subtopic);
    if (distractors.length < 3) distractors = others;
    distractors = shuffle(distractors).slice(0, 3);
    options = shuffle([
      { text: q.a, correct: true },
      ...distractors.map(d => ({ text: d.a, correct: false }))
    ]);
  }
  return { q, options };
}

// ---------- Тест ----------
function renderTest() {
  const total = state.testQueue.length;
  const idx = state.testIndex;
  const item = state.testQueue[idx];

  const nav = document.createElement('div');
  nav.className = 'theory-nav';
  nav.innerHTML = `
    <button class="ghost icon" id="quit">←</button>
    <div class="progress-line" style="flex:1">
      <div class="bar"><i style="width:${idx/total*100}%"></i></div>
      <span class="counter">${idx+1} / ${total}</span>
    </div>
  `;
  app.appendChild(nav);
  document.getElementById('quit').onclick = () => {
    if (confirm('Выйти из теста? Прогресс не сохранится.')) {
      state.screen = 'subtopics'; render();
    }
  };

  const box = document.createElement('div');
  box.className = 'qbox';
  box.innerHTML = `
    <div class="tag">${item.q.subtopic} · ${LEVEL_LABELS[item.q.level]}</div>
    <div class="q">${escapeHtml(item.q.q)}</div>
  `;

  const opts = document.createElement('div');
  opts.className = 'options';
  item.options.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.className = 'opt';
    btn.textContent = o.text;
    btn.dataset.correct = o.correct;
    btn.dataset.i = i;
    btn.onclick = () => {
      if (state.revealedAnswer) return;
      state.revealedAnswer = true;
      const correct = o.correct;
      state.testAnswers.push({ qid: item.q.id, correct });
      opts.querySelectorAll('.opt').forEach((b, j) => {
        if (b.dataset.correct === 'true') b.classList.add('correct');
        else if (j === i) b.classList.add('wrong');
        b.disabled = true;
      });
      const next = document.createElement('button');
      next.className = 'primary';
      next.textContent = idx === total - 1 ? 'Завершить' : 'Далее →';
      next.onclick = () => {
        state.revealedAnswer = false;
        if (idx === total - 1) finishTest();
        else { state.testIndex++; render(); }
      };
      const actions = document.createElement('div');
      actions.className = 'actions';
      actions.appendChild(next);
      app.appendChild(actions);
    };
    opts.appendChild(btn);
  });
  box.appendChild(opts);
  app.appendChild(box);
}

// ---------- Результат ----------
function finishTest() {
  const theme = getTheme(state.themeId);
  const allCorrect = state.testAnswers.every(a => a.correct);

  if (!state.generalTest && allCorrect) {
    setSubStatus(theme.id, state.level, state.subtopic, { done: true, read: true });
  }
  if (!state.generalTest && !allCorrect) {
    setSubStatus(theme.id, state.level, state.subtopic, { done: false, read: false });
  }

  state.lastTestResult = { allCorrect, general: !!state.generalTest };
  state.screen = 'testResult';
  render();
}

function renderTestResult() {
  const { allCorrect, general } = state.lastTestResult;
  const correctCount = state.testAnswers.filter(a => a.correct).length;
  const total = state.testAnswers.length;

  const box = document.createElement('div');
  box.className = 'result-box ' + (allCorrect ? 'ok' : 'fail');
  box.innerHTML = `
    <span class="emoji">${allCorrect ? '🎉' : '😕'}</span>
    <h2>${allCorrect ? 'Тест сдан!' : 'Есть ошибки'}</h2>
    <div class="score">Правильных ответов: <b>${correctCount} / ${total}</b></div>
    ${general ? '<p class="muted">Это был общий тест уровня — он не влияет на прогресс подтем.</p>' : ''}
    ${!allCorrect && !general ? '<p>Придётся перечитать теорию и попробовать снова.</p>' : ''}
  `;
  app.appendChild(box);

  const actions = document.createElement('div');
  actions.className = 'actions';
  if (allCorrect) {
    actions.innerHTML = `<button class="primary" id="back">К подтемам</button>`;
    actions.querySelector('#back').onclick = () => { state.screen = 'subtopics'; render(); };
  } else {
    if (general) {
      actions.innerHTML = `
        <button class="primary" id="retry">Пройти ещё раз</button>
        <button id="back">К подтемам</button>
      `;
      actions.querySelector('#retry').onclick = () => startGeneralTest();
      actions.querySelector('#back').onclick = () => { state.screen = 'subtopics'; render(); };
    } else {
      actions.innerHTML = `<button class="primary" id="readTheory">Перечитать теорию →</button>`;
      actions.querySelector('#readTheory').onclick = () => {
        state.theoryIndex = 0;
        state.screen = 'theory';
        render();
      };
    }
  }
  app.appendChild(actions);
}

// ---------- Хелперы ----------
function topBar(title, onBack) {
  const h = document.createElement('header');
  h.className = 'page-head';
  h.innerHTML = `
    <button class="ghost icon" id="back">←</button>
    <h1 style="flex:1">${title}</h1>
  `;
  app.appendChild(h);
  document.getElementById('back').onclick = onBack;
}

function plural(n, one, few, many) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

// ================== Загрузка тем ==================
(function loadThemes() {
  const files = window.__THEME_MANIFEST__ || [];
  if (files.length === 0) {
    app.innerHTML = '<div class="empty"><h3>Нет тем</h3><p>Проверь themes/_manifest.js</p></div>';
    return;
  }
  let loaded = 0;
  files.forEach(file => {
    const s = document.createElement('script');
    s.src = 'themes/' + file;
    s.onload = () => {
      loaded++;
      if (loaded === files.length) {
        DATA = window.__THEMES__;
        render();
      }
    };
    s.onerror = () => {
      console.error('Не удалось загрузить тему:', file);
      loaded++;
      if (loaded === files.length) { DATA = window.__THEMES__; render(); }
    };
    document.head.appendChild(s);
  });
})();