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
const INTERVIEW_CONFIG_KEY = 'quiz_interview_config_v1';
const GENERAL_TEST_SIZE = 18;
const INTERVIEW_DEFAULT_SIZE = 15;
const INTERVIEW_SIZES = [10, 15, 20, 30];

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
  interviewMode: false,
  interviewConfig: null,
  questionShownAt: 0,
  lastTestResult: null,
  progress: loadProgress()
};
let DATA = [];
const DATA_MAP = new Map();
const QUESTIONS_MAP = new Map();

// ---------- Прогресс ----------
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

// ---------- Статистика по вопросу ----------
function getQStat(qid) {
  return state.progress[`q::${qid}`] || {
    wrongCount: 0, correctStreak: 0, lastWrongAt: 0, lastSeenAt: 0, avgTimeMs: 0, seen: 0
  };
}
function recordAnswer(qid, correct, timeMs) {
  const key = `q::${qid}`;
  const s = getQStat(qid);
  s.seen = (s.seen || 0) + 1;
  s.lastSeenAt = Date.now();
  const prevTotal = (s.avgTimeMs || 0) * (s.seen - 1);
  s.avgTimeMs = Math.round((prevTotal + timeMs) / s.seen);
  if (correct) {
    s.correctStreak = (s.correctStreak || 0) + 1;
  } else {
    s.wrongCount = (s.wrongCount || 0) + 1;
    s.correctStreak = 0;
    s.lastWrongAt = Date.now();
  }
  state.progress[key] = s;
  saveProgress();
}

// Вес для «умной» выборки: чаще спрашивать то, что плохо знаешь
function questionWeight(qid) {
  const s = getQStat(qid);
  const wrong = s.wrongCount || 0;
  const streak = s.correctStreak || 0;
  return Math.max(0.5, 1 + wrong * 2 - streak * 0.5);
}

// ---------- Конфиг собеседования ----------
function loadInterviewConfig() {
  try {
    const raw = localStorage.getItem(INTERVIEW_CONFIG_KEY);
    if (!raw) return null;
    const cfg = JSON.parse(raw);
    if (!cfg || !Array.isArray(cfg.themeIds)) return null;
    return cfg;
  } catch { return null; }
}
function saveInterviewConfig(cfg) {
  localStorage.setItem(INTERVIEW_CONFIG_KEY, JSON.stringify(cfg));
}

// ================== Утилиты ==================
function getTheme(id) { return DATA_MAP.get(id); }

function questionsOfExactLevel(theme, level) {
  return theme.questions.filter(q => q.level === level);
}
function questionsUpToLevel(theme, level) {
  const maxIdx = LEVELS.indexOf(level);
  if (maxIdx < 0) return theme.questions.slice();
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

// ---------- Rich text: подсветка кода ----------
function renderRichText(text) {
  if (!text) return '';
  let s = escapeHtml(text);

  // Блочный код: ```lang\n...\n```
  s = s.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    const l = (lang || 'javascript').toLowerCase();
    return `<pre><code class="language-${l}">${code}</code></pre>`;
  });

  // Инлайн `code`
  s = s.replace(/`([^`\n]+)`/g, '<code>$1</code>');

  // Переносы строк → <br>, кроме блоков <pre>
  s = s.split(/(<pre>[\s\S]*?<\/pre>)/).map(part => {
    if (part.startsWith('<pre>')) return part;
    return part.replace(/\n/g, '<br>');
  }).join('');

  return s;
}

// Подсветка + кнопка «Копировать» для <pre>
function applyCodeHighlight(container) {
  if (window.hljs) {
    container.querySelectorAll('pre code').forEach(el => {
      try { hljs.highlightElement(el); } catch (e) {}
    });
  }
  container.querySelectorAll('pre').forEach(pre => {
    if (pre.querySelector('.copy-btn')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = 'Копировать';
    btn.onclick = (e) => {
      e.stopPropagation();
      const code = pre.querySelector('code');
      const text = code ? code.innerText : pre.innerText;
      const done = () => {
        btn.textContent = '✓';
        setTimeout(() => btn.textContent = 'Копировать', 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (_) {}
        document.body.removeChild(ta);
        done();
      }
    };
    pre.appendChild(btn);
  });
}

// ---------- Взвешенная выборка без повторов ----------
function weightedSample(pool, size) {
  if (!pool.length || size <= 0) return [];
  const items = pool.map(q => ({ q, w: questionWeight(q.id) }));
  const picked = [];
  const copy = [...items];
  while (picked.length < size && copy.length) {
    const total = copy.reduce((s, x) => s + x.w, 0);
    let r = Math.random() * total;
    let idx = 0;
    for (let i = 0; i < copy.length; i++) {
      r -= copy[i].w;
      if (r <= 0) { idx = i; break; }
    }
    picked.push(copy[idx].q);
    copy.splice(idx, 1);
  }
  return picked;
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
  else if (state.screen === 'interviewConfig') renderInterviewConfig();
  else if (state.screen === 'review') renderReview();
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
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
    <button class="ghost" id="interviewBtn">🎯 Собеседование</button>
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

  document.getElementById('interviewBtn').onclick = () => {
    state.screen = 'interviewConfig';
    render();
  };
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
      <div class="bar"><i style="width:${(idx + 1) / total * 100}%"></i></div>
      <span class="counter">${idx + 1} / ${total}</span>
    </div>
  `;
  app.appendChild(nav);
  document.getElementById('back').onclick = () => { state.screen = 'subtopics'; render(); };

  const box = document.createElement('div');
  box.className = 'qbox';
  box.innerHTML = `
    <div class="tag">${q.subtopic} · ${LEVEL_LABELS[q.level]}</div>
    <div class="q">${renderRichText(q.q)}</div>
    <div class="a">${renderRichText(q.explain || q.a)}</div>
  `;
  app.appendChild(box);
  applyCodeHighlight(box);

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
  state.interviewMode = false;
  state.questionShownAt = Date.now();
  state.screen = 'test';
  render();
}

// ---------- Общий тест уровня ----------
function startGeneralTest() {
  const theme = getTheme(state.themeId);
  const all = questionsUpToLevel(theme, state.level);
  const picked = weightedSample(all, Math.min(GENERAL_TEST_SIZE, all.length));
  state.testQueue = picked.map(q => makeTestQuestion(q, all));
  state.testIndex = 0;
  state.testAnswers = [];
  state.revealedAnswer = false;
  state.generalTest = true;
  state.interviewMode = false;
  state.questionShownAt = Date.now();
  state.screen = 'test';
  render();
}

// ---------- Режим собеседования ----------
function renderInterviewConfig() {
  const saved = loadInterviewConfig();
  const cfg = saved || {
    themeIds: DATA.map(t => t.id), // по умолчанию все темы
    maxLevel: 'Senior',
    size: INTERVIEW_DEFAULT_SIZE,
    useMistakes: true
  };

  topBar('🎯 Режим собеседования', () => { state.screen = 'themes'; render(); });

  const wrap = document.createElement('div');

  // 1) Темы
  const themesBlock = document.createElement('div');
  themesBlock.className = 'config-section';
  themesBlock.innerHTML = `<label>Темы</label>`;
  const themeList = document.createElement('div');
  themeList.className = 'check-list';
  DATA.forEach(t => {
    const checked = cfg.themeIds.includes(t.id);
    const qCount = t.questions.length;
    const item = document.createElement('label');
    item.className = 'check-item' + (checked ? ' checked' : '');
    item.innerHTML = `
      <input type="checkbox" data-theme-id="${t.id}" ${checked ? 'checked' : ''}>
      <span style="flex:1">${t.theme}</span>
      <span class="muted">${qCount} ${plural(qCount, 'вопрос', 'вопроса', 'вопросов')}</span>
    `;
    item.querySelector('input').onchange = (e) => {
      if (e.target.checked) {
        if (!cfg.themeIds.includes(t.id)) cfg.themeIds.push(t.id);
      } else {
        cfg.themeIds = cfg.themeIds.filter(id => id !== t.id);
      }
      item.classList.toggle('checked', e.target.checked);
      updatePoolInfo();
    };
    themeList.appendChild(item);
  });
  themesBlock.appendChild(themeList);
  wrap.appendChild(themesBlock);

  // 2) Уровень
  const levelBlock = document.createElement('div');
  levelBlock.className = 'config-section';
  levelBlock.innerHTML = `<label>Уровень (до какого включительно)</label>`;
  const chipRow = document.createElement('div');
  chipRow.className = 'chip-row';
  const levelOptions = [...LEVELS, 'all'];
  levelOptions.forEach(lv => {
    const chip = document.createElement('div');
    chip.className = 'chip' + ((cfg.maxLevel === lv) ? ' active' : '');
    chip.textContent = lv === 'all' ? 'Все уровни' : LEVEL_LABELS[lv];
    chip.onclick = () => {
      cfg.maxLevel = lv;
      chipRow.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      updatePoolInfo();
    };
    chipRow.appendChild(chip);
  });
  levelBlock.appendChild(chipRow);
  wrap.appendChild(levelBlock);

  // 3) Количество
  const sizeBlock = document.createElement('div');
  sizeBlock.className = 'config-section';
  sizeBlock.innerHTML = `<label>Количество вопросов</label>`;
  const sizeRow = document.createElement('div');
  sizeRow.className = 'chip-row';
  INTERVIEW_SIZES.forEach(n => {
    const chip = document.createElement('div');
    chip.className = 'chip' + (cfg.size === n ? ' active' : '');
    chip.textContent = String(n);
    chip.onclick = () => {
      cfg.size = n;
      sizeRow.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      updatePoolInfo();
    };
    sizeRow.appendChild(chip);
  });
  sizeBlock.appendChild(sizeRow);
  wrap.appendChild(sizeBlock);

  // 4) Учитывать ошибки
  const mistakeBlock = document.createElement('div');
  mistakeBlock.className = 'config-section';
  const mistakeItem = document.createElement('label');
  mistakeItem.className = 'check-item' + (cfg.useMistakes ? ' checked' : '');
  mistakeItem.innerHTML = `
    <input type="checkbox" id="useMistakes" ${cfg.useMistakes ? 'checked' : ''}>
    <span style="flex:1">
      Чаще спрашивать то, что я плохо знаю
      <div class="muted">Вопросы с ошибками попадаются чаще</div>
    </span>
  `;
  mistakeItem.querySelector('input').onchange = (e) => {
    cfg.useMistakes = e.target.checked;
    mistakeItem.classList.toggle('checked', e.target.checked);
  };
  mistakeBlock.appendChild(mistakeItem);
  wrap.appendChild(mistakeBlock);

  // Pool info
  const poolInfo = document.createElement('div');
  poolInfo.className = 'pool-info';
  wrap.appendChild(poolInfo);

  // Start button
  const startBtn = document.createElement('button');
  startBtn.className = 'primary';
  startBtn.style.width = '100%';
  startBtn.style.marginTop = '14px';
  startBtn.textContent = 'Начать собеседование';
  startBtn.onclick = () => {
    saveInterviewConfig(cfg);
    startInterview(cfg);
  };
  wrap.appendChild(startBtn);

  function collectPool() {
    const themes = DATA.filter(t => cfg.themeIds.includes(t.id));
    let pool = [];
    themes.forEach(t => {
      if (cfg.maxLevel === 'all') pool = pool.concat(t.questions);
      else pool = pool.concat(questionsUpToLevel(t, cfg.maxLevel));
    });
    return pool;
  }

  function updatePoolInfo() {
    const pool = collectPool();
    const enough = pool.length >= 5;
    poolInfo.innerHTML = `Вопросов в выборке: <b>${pool.length}</b>`;
    startBtn.disabled = pool.length === 0 || !enough;
    if (pool.length === 0) poolInfo.innerHTML += ' · выбери хотя бы одну тему';
    else if (!enough) poolInfo.innerHTML += ' · нужно минимум 5';
  }
  updatePoolInfo();

  app.appendChild(wrap);
}

function startInterview(cfg) {
  const themes = DATA.filter(t => cfg.themeIds.includes(t.id));
  let pool = [];
  themes.forEach(t => {
    if (cfg.maxLevel === 'all') pool = pool.concat(t.questions);
    else pool = pool.concat(questionsUpToLevel(t, cfg.maxLevel));
  });
  if (!pool.length) return;

  const size = Math.min(cfg.size, pool.length);
  const picked = cfg.useMistakes
    ? weightedSample(pool, size)
    : shuffle(pool).slice(0, size);

  state.testQueue = picked.map(q => makeTestQuestion(q, pool));
  state.testIndex = 0;
  state.testAnswers = [];
  state.revealedAnswer = false;
  state.generalTest = false;
  state.interviewMode = true;
  state.interviewConfig = cfg;
  state.questionShownAt = Date.now();
  state.screen = 'test';
  render();
}

// ---------- Генерация тестового вопроса ----------
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
  const interview = state.interviewMode;
  state.questionShownAt = Date.now();

  const nav = document.createElement('div');
  nav.className = 'theory-nav';
  nav.innerHTML = `
    <button class="ghost icon" id="quit">←</button>
    <div class="progress-line" style="flex:1">
      <div class="bar"><i style="width:${idx / total * 100}%"></i></div>
      <span class="counter">${idx + 1} / ${total}</span>
    </div>
  `;
  app.appendChild(nav);
  document.getElementById('quit').onclick = () => {
    if (confirm('Выйти из теста? Прогресс не сохранится.')) {
      if (interview) { state.screen = 'interviewConfig'; }
      else { state.screen = 'subtopics'; }
      render();
    }
  };

  const box = document.createElement('div');
  box.className = 'qbox';
  const interviewBadge = interview ? '<div class="tag tag--interview">🎯 Собеседование</div>' : '';
  box.innerHTML = `
    <div class="tag-row">
      <div class="tag">${item.q.subtopic} · ${LEVEL_LABELS[item.q.level]}</div>
      ${interviewBadge}
    </div>
    <div class="q">${renderRichText(item.q.q)}</div>
  `;
  app.appendChild(box);
  applyCodeHighlight(box);

  const opts = document.createElement('div');
  opts.className = 'options';

  item.options.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'opt';
    btn.dataset.correct = o.correct;
    btn.dataset.i = i;
    // ВАЖНО: варианты — plain text, без форматирования и подсветки
    btn.innerHTML = `<span class="key">${i + 1}</span>${escapeHtml(o.text)}`;

    btn.onclick = () => {
      if (state.revealedAnswer) return;
      const timeMs = Date.now() - state.questionShownAt;

      if (interview) {
        state.revealedAnswer = true;
        state.testAnswers.push({
          qid: item.q.id,
          correct: o.correct,
          chosenText: o.text,
          correctText: item.q.explain || item.q.a,
          timeMs,
          interview: true
        });
        recordAnswer(item.q.id, o.correct, timeMs);
        opts.querySelectorAll('.opt').forEach(b => { b.disabled = true; });
        btn.classList.add('chosen');

        const next = document.createElement('button');
        next.className = 'primary';
        next.textContent = idx === total - 1 ? 'Завершить' : 'Далее →';
        next.onclick = () => {
          state.revealedAnswer = false;
          if (idx === total - 1) finishInterview();
          else { state.testIndex++; render(); }
        };
        const actions = document.createElement('div');
        actions.className = 'actions';
        actions.appendChild(next);
        app.appendChild(actions);
      } else {
        state.revealedAnswer = true;
        state.testAnswers.push({
          qid: item.q.id,
          correct: o.correct,
          timeMs
        });
        recordAnswer(item.q.id, o.correct, timeMs);

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
      }
    };
    opts.appendChild(btn);
  });
  box.appendChild(opts);
}

// ---------- Результат обычного теста ----------
function finishTest() {
  const theme = getTheme(state.themeId);
  const allCorrect = state.testAnswers.every(a => a.correct);

  if (!state.generalTest && allCorrect) {
    setSubStatus(theme.id, state.level, state.subtopic, { done: true, read: true });
  }
  if (!state.generalTest && !allCorrect) {
    setSubStatus(theme.id, state.level, state.subtopic, { done: false, read: false });
  }

  state.lastTestResult = { allCorrect, general: !!state.generalTest, interview: false };
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

// ---------- Итог собеседования ----------
function finishInterview() {
  const correctCount = state.testAnswers.filter(a => a.correct).length;
  state.lastTestResult = {
    allCorrect: false,
    general: false,
    interview: true,
    correctCount,
    total: state.testAnswers.length
  };
  state.screen = 'review';
  render();
}

function renderReview() {
  const answers = state.testAnswers;
  const correctCount = answers.filter(a => a.correct).length;
  const total = answers.length;
  const pct = total ? Math.round(correctCount / total * 100) : 0;
  const ok = correctCount === total;

  const header = document.createElement('header');
  header.className = 'page-head';
  header.innerHTML = `
    <button class="ghost icon" id="back">←</button>
    <h1 style="flex:1">Разбор собеседования</h1>
  `;
  app.appendChild(header);
  document.getElementById('back').onclick = () => {
    state.screen = 'themes';
    render();
  };

  const summary = document.createElement('div');
  summary.className = 'result-box ' + (ok ? 'ok' : 'fail');
  summary.innerHTML = `
    <span class="emoji">${ok ? '🎉' : (pct >= 70 ? '👍' : '😕')}</span>
    <h2>${pct}%</h2>
    <div class="score">Правильных ответов: <b>${correctCount} / ${total}</b></div>
  `;
  app.appendChild(summary);

  const sorted = [...answers].sort((a, b) => {
    if (a.correct !== b.correct) return a.correct ? 1 : -1;
    return (b.timeMs || 0) - (a.timeMs || 0);
  });

  const list = document.createElement('div');
  list.className = 'review-list';

  sorted.forEach(a => {
    const q = QUESTIONS_MAP.get(a.qid);
    const item = document.createElement('div');
    item.className = 'review-item' + (a.correct ? ' ok' : '');
    const timeSec = a.timeMs ? (a.timeMs / 1000).toFixed(1) : '—';
    const rightAnswer = a.correctText || (q ? (q.explain || q.a) : '');
    item.innerHTML = `
      <div class="rq">${renderRichText(q ? q.q : a.qid)}</div>
      ${a.correct ? '' : `
        <div class="answer-row wrong">
          <span class="lbl">Твой ответ:</span>
          <span class="val">${escapeHtml(a.chosenText || '')}</span>
        </div>
      `}
      <div class="answer-row right">
        <span class="lbl">${a.correct ? 'Ответ:' : 'Верно:'}</span>
        <span class="val">${renderRichText(rightAnswer)}</span>
      </div>
      <div class="meta">
        <span>${a.correct ? '✅ Верно' : '❌ Ошибка'}</span>
        <span>⏱ ${timeSec} с</span>
        <button class="ghost" data-qid="${a.qid}">Открыть теорию →</button>
      </div>
    `;
    list.appendChild(item);
  });
  app.appendChild(list);
  applyCodeHighlight(list);

  list.querySelectorAll('button[data-qid]').forEach(btn => {
    btn.onclick = () => {
      const qid = btn.dataset.qid;
      jumpToQuestion(qid);
    };
  });

  const actions = document.createElement('div');
  actions.className = 'actions';
  actions.innerHTML = `
    <button class="primary" id="retry">Пройти ещё раз</button>
    <button id="back2">На главную</button>
  `;
  actions.querySelector('#retry').onclick = () => {
    if (state.interviewConfig) startInterview(state.interviewConfig);
  };
  actions.querySelector('#back2').onclick = () => { state.screen = 'themes'; render(); };
  app.appendChild(actions);
}

// Прыжок в теорию на конкретный вопрос
function jumpToQuestion(qid) {
  const q = QUESTIONS_MAP.get(qid);
  if (!q) return;
  const theme = DATA.find(t => t.questions.some(x => x.id === qid));
  if (!theme) return;
  const subs = subtopicsOfExactLevel(theme, q.level);
  const list = subs[q.subtopic];
  if (!list) return;
  state.themeId = theme.id;
  state.level = q.level;
  state.subtopic = q.subtopic;
  state.theoryIndex = list.findIndex(x => x.id === qid);
  state.screen = 'theory';
  render();
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

// ================== Клавиатура ==================
document.addEventListener('keydown', (e) => {
  // Игнорируем, если пользователь что-то вводит
  const tag = (e.target && e.target.tagName) || '';
  if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;

  if (state.screen === 'test') {
    if (['1', '2', '3', '4'].includes(e.key)) {
      const i = +e.key - 1;
      const btns = document.querySelectorAll('.opt');
      const btn = btns[i];
      if (btn && !btn.disabled) { e.preventDefault(); btn.click(); }
    }
    if (e.key === 'Enter') {
      const next = document.querySelector('.actions .primary');
      if (next && !next.disabled) { e.preventDefault(); next.click(); }
    }
    if (e.key === 'Escape') {
      const q = document.getElementById('quit');
      if (q) q.click();
    }
  } else if (state.screen === 'theory') {
    if (e.key === 'ArrowRight') {
      const n = document.getElementById('next') || document.getElementById('toTest');
      if (n) n.click();
    }
    if (e.key === 'ArrowLeft') {
      const p = document.getElementById('prev');
      if (p && !p.disabled) p.click();
    }
    if (e.key === 'Escape') {
      const b = document.getElementById('back');
      if (b) b.click();
    }
  } else if (state.screen === 'interviewConfig' || state.screen === 'review') {
    if (e.key === 'Escape') {
      const b = document.getElementById('back');
      if (b) b.click();
    }
  }
});

// ================== Свайпы (touch) ==================
let touchStartX = 0, touchStartY = 0, touchActive = false;
document.addEventListener('touchstart', (e) => {
  if (e.touches.length !== 1) return;
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  touchActive = true;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  if (!touchActive) return;
  touchActive = false;
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;
  if (Math.abs(dx) < 60) return;             // слишком короткий свайп
  if (Math.abs(dy) > Math.abs(dx)) return;   // вертикальный скролл — не трогаем

  if (state.screen === 'theory') {
    if (dx < 0) {
      const n = document.getElementById('next') || document.getElementById('toTest');
      if (n) n.click();
    } else {
      const p = document.getElementById('prev');
      if (p && !p.disabled) p.click();
    }
  }
}, { passive: true });

// ================== Загрузка тем ==================
(function loadThemes() {
  const files = window.__THEME_MANIFEST__ || [];
  if (files.length === 0) {
    app.innerHTML = '<div class="empty"><h3>Нет тем</h3><p>Проверь lessons/manifest.js</p></div>';
    return;
  }
  let loaded = 0;
  const finish = () => {
    DATA = window.__THEMES__;
    DATA_MAP.clear();
    QUESTIONS_MAP.clear();
    DATA.forEach(t => {
      DATA_MAP.set(t.id, t);
      (t.questions || []).forEach(q => QUESTIONS_MAP.set(q.id, q));
    });
    render();
  };
  files.forEach(file => {
    const s = document.createElement('script');
    s.src = 'lessons/' + file;
    s.onload = () => {
      loaded++;
      if (loaded === files.length) finish();
    };
    s.onerror = () => {
      console.error('Не удалось загрузить тему:', file);
      loaded++;
      if (loaded === files.length) finish();
    };
    document.head.appendChild(s);
  });
})();

// ================== PWA: Service Worker ==================
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}