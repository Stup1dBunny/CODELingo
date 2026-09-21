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
const FINAL_SUB = '__final__';
const FLAT_LEVEL = 'all';
const INTERVIEW_DEFAULT_SIZE = 15;
const INTERVIEW_SIZES = [10, 15, 20, 30];

// Паттерн зигзага: 3 позиции, цикл. Соседние узлы всегда в разных колонках.
const ZIGZAG = ['left', 'center', 'right'];

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
  finalTest: false,
  finalLevel: null,
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

function isFlat(theme) {
  return !!(theme && theme.structure === 'flat');
}
function isPath(theme) {
  return !isFlat(theme);
}

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
function allSubtopicsOfTheme(theme) {
  const map = {};
  (theme.questions || []).forEach(q => {
    (map[q.subtopic] = map[q.subtopic] || []).push(q);
  });
  return map;
}
function allQuestionsOfTheme(theme) {
  return (theme.questions || []).slice();
}
function subtopicsForState(theme, level) {
  if (isFlat(theme) || level === FLAT_LEVEL) {
    return allSubtopicsOfTheme(theme);
  }
  return subtopicsOfExactLevel(theme, level);
}

function levelsWithQuestions(theme) {
  return LEVELS.filter(l => questionsOfExactLevel(theme, l).length > 0);
}

// ---------- Статус подтемы на пути ----------
function getSubtopicPathStatus(theme, level, sub, opts = {}) {
  const { subsOrder, index } = opts;
  const st = getSubStatus(theme.id, level, sub);
  if (st.done) return 'done';
  if (index === 0) {
    const prevLevel = prevLevelOf(theme, level);
    if (!prevLevel) return 'current';
    return isLevelCompleted(theme, prevLevel) ? 'current' : 'locked';
  }
  const prevSub = subsOrder[index - 1];
  const prevSt = getSubStatus(theme.id, level, prevSub);
  return prevSt.done ? 'current' : 'locked';
}

function prevLevelOf(theme, level) {
  const levels = levelsWithQuestions(theme);
  const idx = levels.indexOf(level);
  if (idx <= 0) return null;
  return levels[idx - 1];
}

function isLevelCompleted(theme, level) {
  const subs = subtopicsOfExactLevel(theme, level);
  const subNames = Object.keys(subs);
  if (subNames.length === 0) return true;
  const allDone = subNames.every(s => getSubStatus(theme.id, level, s).done);
  if (!allDone) return false;
  return !!getSubStatus(theme.id, level, FINAL_SUB).done;
}

function isFinalTestAvailable(theme, level) {
  const subs = subtopicsOfExactLevel(theme, level);
  const subNames = Object.keys(subs);
  if (subNames.length === 0) return false;
  return subNames.every(s => getSubStatus(theme.id, level, s).done);
}

function finalTestSize(theme, level) {
  const pool = questionsUpToLevel(theme, level);
  if (pool.length === 0) return 0;
  return Math.max(10, Math.min(20, Math.floor(pool.length / 4)));
}

// ---------- Общие утилиты ----------
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
function plural(n, one, few, many) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

// ---------- Rich text ----------
function renderRichText(text) {
  if (!text) return '';
  let s = escapeHtml(text);
  s = s.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    const l = (lang || 'javascript').toLowerCase();
    return `<pre><code class="language-${l}">${code}</code></pre>`;
  });
  s = s.replace(/`([^`\n]+)`/g, '<code>$1</code>');
  s = s.split(/(<pre>[\s\S]*?<\/pre>)/).map(part => {
    if (part.startsWith('<pre>')) return part;
    return part.replace(/\n/g, '<br>');
  }).join('');
  return s;
}
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

// ---------- Взвешенная выборка ----------
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
  else if (state.screen === 'path') renderPath();
  else if (state.screen === 'flatSubtopics') renderFlatSubtopics();
  else if (state.screen === 'theory') renderTheory();
  else if (state.screen === 'test') renderTest();
  else if (state.screen === 'testResult') renderTestResult();
  else if (state.screen === 'interviewConfig') renderInterviewConfig();
  else if (state.screen === 'review') renderReview();
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

// ---------- Главная ----------
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
    const isEmpty = theme.questions.length === 0;
    let totalSubs = 0, doneSubs = 0, pct = 0;

    if (!isEmpty) {
      if (isFlat(theme)) {
        const subs = allSubtopicsOfTheme(theme);
        Object.keys(subs).forEach(sub => {
          totalSubs++;
          if (getSubStatus(theme.id, FLAT_LEVEL, sub).done) doneSubs++;
        });
      } else {
        LEVELS.forEach(level => {
          const subs = subtopicsOfExactLevel(theme, level);
          Object.keys(subs).forEach(sub => {
            totalSubs++;
            if (getSubStatus(theme.id, level, sub).done) doneSubs++;
          });
        });
      }
      pct = totalSubs ? Math.round(doneSubs / totalSubs * 100) : 0;
    }

    const card = document.createElement('div');
    card.className = 'card' + (pct === 100 && totalSubs > 0 ? ' is-done' : '');
    if (isEmpty) card.style.opacity = '.55';
    card.innerHTML = `
      <h3>${theme.theme}</h3>
      <div class="sub">${isEmpty ? 'Скоро' : `${doneSubs} / ${totalSubs} подтем · ${pct}%`}</div>
      ${!isEmpty ? `<div class="bar"><i style="width:${pct}%"></i></div>` : ''}
    `;
    if (!isEmpty) {
      card.onclick = () => {
        state.themeId = theme.id;
        if (isFlat(theme)) {
          state.level = FLAT_LEVEL;
          state.screen = 'flatSubtopics';
        } else {
          state.level = null;
          state.screen = 'path';
        }
        render();
      };
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

// ================== PATH: экран пути ==================
function renderPath() {
  const theme = getTheme(state.themeId);
  topBar(theme.theme, () => { state.screen = 'themes'; render(); });

  const levels = levelsWithQuestions(theme);
  const wrap = document.createElement('div');
  wrap.className = 'path-wrap';

  levels.forEach((level, li) => {
    const isLocked = li > 0 && !isLevelCompleted(theme, levels[li - 1]);
    const levelDone = isLevelCompleted(theme, level);

    // --- Заголовок сегмента ---
    const seg = document.createElement('div');
    seg.className = 'path-segment'
      + (isLocked ? ' is-locked' : '')
      + (levelDone ? ' is-done' : '');

    const subsForLevel = subtopicsOfExactLevel(theme, level);
    const subNames = Object.keys(subsForLevel);
    const doneCount = subNames.filter(s => getSubStatus(theme.id, level, s).done).length;

    seg.innerHTML = `
      <div class="path-segment__title">
        ${isLocked ? '🔒' : (levelDone ? '✓' : '●')}
        <span>${LEVEL_LABELS[level]}</span>
      </div>
      <div class="path-segment__meta">${doneCount} / ${subNames.length} подтем</div>
    `;
    wrap.appendChild(seg);

    // --- Змейка ---
    const snake = document.createElement('div');
    snake.className = 'path-snake' + (isLocked ? ' is-disabled' : '');
    snake.dataset.level = level;

    // SVG-слой для линий. Заполняется после appendChild в drawPathLines.
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'path-lines');
    svg.setAttribute('aria-hidden', 'true');
    snake.appendChild(svg);

    // Узлы подтем + финальный
    const allNodes = subNames.slice();
    const finalStatus = (() => {
      if (isLocked) return 'locked';
      if (getSubStatus(theme.id, level, FINAL_SUB).done) return 'done';
      if (isFinalTestAvailable(theme, level)) return 'current';
      return 'locked';
    })();

    // Формируем список строк: каждая — { type, sub?, status, position }
    const rows = [];

    subNames.forEach((sub, si) => {
      const status = isLocked
        ? 'locked'
        : getSubtopicPathStatus(theme, level, sub, { subsOrder: subNames, index: si });
      rows.push({ type: 'sub', sub, status });
    });

    rows.push({ type: 'final', status: finalStatus });

    // Определяем позиции по циклу
    // Но! Финальный узел хочется в центре. Тогда последний sub — не center.
    // Проще: назначаем позиции по кругу, а финальный — всегда center,
    // и сдвигаем цикл так, чтобы последний sub был НЕ center.
    // Упростим: цикл left → center → right → left → ...
    // Финальный — center. Если предыдущий sub тоже center — поменяем sub на left.
    rows.forEach((row, i) => {
      if (row.type === 'final') {
        row.pos = 'center';
      } else {
        row.pos = ZIGZAG[i % ZIGZAG.length];
      }
    });

    // Разрешаем коллизию: если рядом с финалом (center) стоит sub с pos=center
    if (rows.length >= 2) {
      const lastSub = rows[rows.length - 2];
      if (lastSub.type === 'sub' && lastSub.pos === 'center') {
        // Сдвинем его в left или right
        lastSub.pos = 'left';
      }
    }

    // Рендерим узлы
    rows.forEach((row, i) => {
      const rowEl = document.createElement('div');
      rowEl.className = 'path-node-row path-node-row--' + row.pos;
      rowEl.dataset.index = i;

      const item = document.createElement('div');
      item.className = 'path-item';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'path-node';
      btn.dataset.pos = row.pos;

      let labelText = '';
      let clickHandler = null;

      if (row.type === 'sub') {
        item.classList.add('path-item--' + row.status);
        btn.classList.add('path-node--' + row.status);
        btn.innerHTML = row.status === 'done' ? '✓' : (row.status === 'locked' ? '🔒' : '●');
        btn.disabled = row.status === 'locked';
        btn.setAttribute('aria-label', row.sub);
        labelText = row.sub;
        const subRef = row.sub;
        const statusRef = row.status;
        clickHandler = () => {
          if (statusRef === 'locked') return;
          state.level = level;
          startTheory(subRef);
        };
      } else {
        item.classList.add('path-item--final');
        item.classList.add('path-item--' + row.status);
        btn.classList.add('path-node--final');
        btn.classList.add('path-node--' + row.status);
        btn.innerHTML = row.status === 'done' ? '🏆' : '🏁';
        btn.disabled = row.status === 'locked';
        btn.setAttribute('aria-label', 'Итоговый тест');
        labelText = 'Итоговый тест';
        const statusRef = row.status;
        clickHandler = () => {
          if (statusRef === 'locked') return;
          startFinalTest(level);
        };
      }

      if (clickHandler) btn.onclick = clickHandler;
      item.appendChild(btn);

      // Подпись: только у текущего узла (В)
      if (row.status === 'current') {
        const label = document.createElement('div');
        label.className = 'path-label';
        label.textContent = labelText;
        item.appendChild(label);
      }

      // Для финала — подпись внизу всегда (иначе не найти)
      if (row.type === 'final') {
        const label = document.createElement('div');
        label.className = 'path-label path-label--final';
        label.textContent = labelText;
        item.appendChild(label);
      }

      rowEl.appendChild(item);
      snake.appendChild(rowEl);
    });

    wrap.appendChild(snake);
  });

  app.appendChild(wrap);

  // После вставки в DOM — рисуем линии
  requestAnimationFrame(() => {
    wrap.querySelectorAll('.path-snake').forEach(snake => drawPathLines(snake));
  });
}

// ---------- Рисуем SVG-линии между центрами соседних узлов ----------
function drawPathLines(snake) {
  const svg = snake.querySelector('svg.path-lines');
  if (!svg) return;
  const rows = snake.querySelectorAll('.path-node-row');
  if (rows.length < 2) {
    svg.innerHTML = '';
    return;
  }

  const snakeRect = snake.getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${snakeRect.width} ${snakeRect.height}`);
  svg.setAttribute('width', snakeRect.width);
  svg.setAttribute('height', snakeRect.height);
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  svg.style.width = snakeRect.width + 'px';
  svg.style.height = snakeRect.height + 'px';
  svg.style.pointerEvents = 'none';

  const centers = [];
  rows.forEach(row => {
    const btn = row.querySelector('.path-node');
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    centers.push({
      x: r.left + r.width / 2 - snakeRect.left,
      y: r.top + r.height / 2 - snakeRect.top,
      status: (btn.classList.contains('path-node--done')) ? 'done'
        : (btn.classList.contains('path-node--current')) ? 'current'
        : 'locked'
    });
  });

  let html = '';
  for (let i = 0; i < centers.length - 1; i++) {
    const a = centers[i];
    const b = centers[i + 1];
    // Цвет линии: если оба узла done — зелёный, иначе серый
    const lineClass = (a.status === 'done' && b.status === 'done') ? 'path-line path-line--done' : 'path-line';
    html += `<line class="${lineClass}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" />`;
  }
  svg.innerHTML = html;
}

// Перерисовывать линии при ресайзе
window.addEventListener('resize', () => {
  if (state.screen !== 'path') return;
  document.querySelectorAll('.path-snake').forEach(snake => drawPathLines(snake));
});

// ================== FLAT: подтемы ==================
function renderFlatSubtopics() {
  const theme = getTheme(state.themeId);
  topBar(theme.theme, () => { state.screen = 'themes'; render(); });

  const subs = allSubtopicsOfTheme(theme);
  const grid = document.createElement('div');
  grid.className = 'grid themes';

  Object.entries(subs).forEach(([sub, list]) => {
    const st = getSubStatus(theme.id, FLAT_LEVEL, sub);
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
  const subs = subtopicsForState(theme, state.level);
  const list = subs[state.subtopic];

  if (!list || !list.length) {
    console.warn(`[renderTheory] Не найдена подтема "${state.subtopic}" для темы "${theme.theme}" (level=${state.level})`);
    state.screen = isFlat(theme) ? 'flatSubtopics' : 'path';
    render();
    return;
  }

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
  document.getElementById('back').onclick = () => {
    if (isFlat(theme) || state.level === FLAT_LEVEL) {
      state.screen = 'flatSubtopics';
    } else {
      state.screen = 'path';
    }
    render();
  };

  const box = document.createElement('div');
  box.className = 'qbox';
  box.innerHTML = `
    <div class="tag">${q.subtopic}${q.level ? ' · ' + LEVEL_LABELS[q.level] : ''}</div>
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
  const subs = subtopicsForState(theme, state.level);
  const list = subs[state.subtopic];

  if (!list || !list.length) {
    console.warn(`[startTestForSubtopic] Не найдена подтема "${state.subtopic}"`);
    state.screen = isFlat(theme) ? 'flatSubtopics' : 'path';
    render();
    return;
  }

  setSubStatus(theme.id, state.level, state.subtopic, { read: true });

  state.testQueue = shuffle(list).map(q => makeTestQuestion(q, list));
  state.testIndex = 0;
  state.testAnswers = [];
  state.revealedAnswer = false;
  state.generalTest = false;
  state.interviewMode = false;
  state.finalTest = false;
  state.finalLevel = null;
  state.questionShownAt = Date.now();
  state.screen = 'test';
  render();
}

// ---------- Итоговый тест сегмента ----------
function startFinalTest(level) {
  const theme = getTheme(state.themeId);
  const pool = questionsUpToLevel(theme, level);
  const size = finalTestSize(theme, level);

  if (!pool.length || size === 0) return;

  const picked = weightedSample(pool, Math.min(size, pool.length));

  state.testQueue = picked.map(q => makeTestQuestion(q, pool));
  state.testIndex = 0;
  state.testAnswers = [];
  state.revealedAnswer = false;
  state.generalTest = false;
  state.interviewMode = true;
  state.finalTest = true;
  state.finalLevel = level;
  state.questionShownAt = Date.now();
  state.screen = 'test';
  render();
}

// ---------- Генерация вопроса ----------
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
  const finalTest = state.finalTest;
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
      if (finalTest) { state.screen = 'path'; }
      else if (interview) { state.screen = 'interviewConfig'; }
      else if (isFlat(getTheme(state.themeId))) { state.screen = 'flatSubtopics'; }
      else { state.screen = 'path'; }
      render();
    }
  };

  const box = document.createElement('div');
  box.className = 'qbox';
  const badges = [];
  if (finalTest) badges.push('<div class="tag tag--final">🏁 Итоговый тест</div>');
  if (interview && !finalTest) badges.push('<div class="tag tag--interview">🎯 Собеседование</div>');
  const levelTag = item.q.level ? ` · ${LEVEL_LABELS[item.q.level]}` : '';
  box.innerHTML = `
    <div class="tag-row">
      <div class="tag">${item.q.subtopic}${levelTag}</div>
      ${badges.join('')}
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
          if (idx === total - 1) {
            if (finalTest) finishFinalTest();
            else finishInterview();
          } else { state.testIndex++; render(); }
        };
        const actions = document.createElement('div');
        actions.className = 'actions';
        actions.appendChild(next);
        app.appendChild(actions);
      } else {
        state.revealedAnswer = true;
        state.testAnswers.push({ qid: item.q.id, correct: o.correct, timeMs });
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

// ---------- Результат теста по подтеме ----------
function finishTest() {
  const theme = getTheme(state.themeId);
  const allCorrect = state.testAnswers.every(a => a.correct);

  if (!state.generalTest && allCorrect) {
    setSubStatus(theme.id, state.level, state.subtopic, { done: true, read: true });
  }
  if (!state.generalTest && !allCorrect) {
    setSubStatus(theme.id, state.level, state.subtopic, { done: false, read: false });
  }

  state.lastTestResult = { allCorrect, general: false, interview: false, final: false };
  state.screen = 'testResult';
  render();
}

// ---------- Результат итогового теста ----------
function finishFinalTest() {
  const theme = getTheme(state.themeId);
  const level = state.finalLevel;
  const allCorrect = state.testAnswers.every(a => a.correct);

  if (allCorrect) {
    setSubStatus(theme.id, level, FINAL_SUB, { done: true });
  }

  state.lastTestResult = {
    allCorrect,
    general: false,
    interview: true,
    final: true,
    finalLevel: level
  };
  state.screen = 'testResult';
  render();
}

// ---------- Результат ----------
function renderTestResult() {
  const r = state.lastTestResult;
  const correctCount = state.testAnswers.filter(a => a.correct).length;
  const total = state.testAnswers.length;

  const box = document.createElement('div');
  box.className = 'result-box ' + (r.allCorrect ? 'ok' : 'fail');
  box.innerHTML = `
    <span class="emoji">${r.allCorrect ? '🎉' : '😕'}</span>
    <h2>${r.final
      ? (r.allCorrect ? 'Сегмент пройден!' : 'Итоговый тест не сдан')
      : (r.allCorrect ? 'Тест сдан!' : 'Есть ошибки')}</h2>
    <div class="score">Правильных ответов: <b>${correctCount} / ${total}</b></div>
    ${r.final ? '<p class="muted">Итоговый тест открывает следующий уровень только при 100%.</p>' : ''}
    ${!r.allCorrect && !r.final ? '<p>Придётся перечитать теорию и попробовать снова.</p>' : ''}
  `;
  app.appendChild(box);

  const actions = document.createElement('div');
  actions.className = 'actions';

  if (r.final) {
    if (r.allCorrect) {
      actions.innerHTML = `<button class="primary" id="back">К пути</button>`;
      actions.querySelector('#back').onclick = () => { state.screen = 'path'; render(); };
    } else {
      actions.innerHTML = `
        <button class="primary" id="retry">Пройти ещё раз</button>
        <button id="back">К пути</button>
      `;
      actions.querySelector('#retry').onclick = () => startFinalTest(r.finalLevel);
      actions.querySelector('#back').onclick = () => { state.screen = 'path'; render(); };
    }
  } else if (r.allCorrect) {
    actions.innerHTML = `<button class="primary" id="back">К пути</button>`;
    actions.querySelector('#back').onclick = () => {
      if (isFlat(getTheme(state.themeId))) state.screen = 'flatSubtopics';
      else state.screen = 'path';
      render();
    };
  } else {
    actions.innerHTML = `<button class="primary" id="readTheory">Перечитать теорию →</button>`;
    actions.querySelector('#readTheory').onclick = () => {
      state.theoryIndex = 0;
      state.screen = 'theory';
      render();
    };
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
    final: false,
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
  document.getElementById('back').onclick = () => { state.screen = 'themes'; render(); };

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
    btn.onclick = () => jumpToQuestion(btn.dataset.qid);
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

// ---------- Прыжок в теорию ----------
function jumpToQuestion(qid) {
  const q = QUESTIONS_MAP.get(qid);
  if (!q) return;
  const theme = DATA.find(t => t.questions.some(x => x.id === qid));
  if (!theme) return;

  if (isFlat(theme)) {
    state.themeId = theme.id;
    state.level = FLAT_LEVEL;
    state.subtopic = q.subtopic;
    const subs = allSubtopicsOfTheme(theme);
    const list = subs[q.subtopic];
    if (!list) return;
    state.theoryIndex = list.findIndex(x => x.id === qid);
  } else {
    state.themeId = theme.id;
    state.level = q.level;
    state.subtopic = q.subtopic;
    const subs = subtopicsOfExactLevel(theme, q.level);
    const list = subs[q.subtopic];
    if (!list) return;
    state.theoryIndex = list.findIndex(x => x.id === qid);
  }
  state.screen = 'theory';
  render();
}

// ================== РЕЖИМ СОБЕСЕДОВАНИЯ ==================
function renderInterviewConfig() {
  const saved = loadInterviewConfig();
  const cfg = saved || {
    themeIds: DATA.map(t => t.id),
    maxLevel: 'Senior',
    size: INTERVIEW_DEFAULT_SIZE,
    useMistakes: true
  };

  topBar('🎯 Режим собеседования', () => { state.screen = 'themes'; render(); });

  const wrap = document.createElement('div');

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

  const poolInfo = document.createElement('div');
  poolInfo.className = 'pool-info';
  wrap.appendChild(poolInfo);

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
      if (isFlat(t)) {
        pool = pool.concat(t.questions);
      } else if (cfg.maxLevel === 'all') {
        pool = pool.concat(t.questions);
      } else {
        pool = pool.concat(questionsUpToLevel(t, cfg.maxLevel));
      }
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
    if (isFlat(t)) {
      pool = pool.concat(t.questions);
    } else if (cfg.maxLevel === 'all') {
      pool = pool.concat(t.questions);
    } else {
      pool = pool.concat(questionsUpToLevel(t, cfg.maxLevel));
    }
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
  state.finalTest = false;
  state.finalLevel = null;
  state.interviewConfig = cfg;
  state.questionShownAt = Date.now();
  state.screen = 'test';
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

// ================== Клавиатура ==================
document.addEventListener('keydown', (e) => {
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
  } else if (state.screen === 'interviewConfig' || state.screen === 'review' || state.screen === 'path') {
    if (e.key === 'Escape') {
      const b = document.getElementById('back');
      if (b) b.click();
    }
  }
});

// ================== Свайпы ==================
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
  if (Math.abs(dx) < 60) return;
  if (Math.abs(dy) > Math.abs(dx)) return;

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
      t.questions = t.questions || [];
      DATA_MAP.set(t.id, t);
      t.questions.forEach(q => QUESTIONS_MAP.set(q.id, q));

      if (t.structure === 'flat') {
        t.questions.forEach(q => {
          if (q.level) {
            console.warn(`[flat-theme] ${t.theme}: вопрос ${q.id} содержит level, но тема flat`);
          }
        });
      }
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

// ================== PWA ==================
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}