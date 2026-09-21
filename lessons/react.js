window.registerTheme({
  theme: 'React',
  id: 3,
  questions: [
    // ================= REACT — ОБЩЕЕ =================
    {
      id: 'react-general-1',
      subtopic: 'React — общее',
      level: 'Junior-',
      q: 'Что такое React?',
      a: 'JS-библиотека для создания пользовательских интерфейсов. Строит компонентные UI, которые обновляются и реагируют на изменение данных. Удобна для динамических веб-приложений.',
      explain: 'React — именно библиотека, а не фреймворк: он отвечает только за слой представления. Роутинг, состояние и формы подключаются отдельно.\n\n```js\nconst root = ReactDOM.createRoot(document.getElementById("root"));\nroot.render(<App />);\n```\n\nВ отличие от Angular, React не навязывает структуру проекта. Часто спрашивают следом: чем React отличается от фреймворка.',
      wrong: [
        'Полноценный фреймворк с роутингом и состоянием из коробки.',
        'Язык программирования для фронтенда.',
        'Серверный фреймворк на Node.js.'
      ]
    },
    {
      id: 'react-general-2',
      subtopic: 'React — общее',
      level: 'Junior-',
      q: 'Какие способы создания компонентов существуют?',
      a: 'Функциональные (современный стандарт) и классовые (устаревший подход).',
      explain: 'Функциональные компоненты — обычные функции, возвращающие JSX, с хуками для состояния и эффектов. Классовые наследуют React.Component.\n\n```js\nfunction Hello() { return <h1>Hi</h1>; }\nclass Hello extends React.Component { render() { return <h1>Hi</h1>; } }\n```\n\nТипичная ошибка — считать, что классовые уже удалены: они поддерживаются, но для нового кода не рекомендуются.',
      wrong: [
        'Только классовые.',
        'Только функциональные.',
        'Функциональные, классовые и через React.createElement без JSX.'
      ]
    },
    {
      id: 'react-general-3',
      subtopic: 'React — общее',
      level: 'Junior',
      q: 'Какой поток данных в React?',
      a: 'Однонаправленный. Данные передаются от родителя к дочерним компонентам через props. Дочерний компонент не может изменить props родителя.',
      explain: 'Однонаправленный поток упрощает отладку: всегда понятно, откуда пришли данные. Чтобы ребёнок мог влиять на родителя, ему передают функцию-колбэк через props.\n\n```js\n<Child value={count} onChange={setCount} />\n```\n\nВ отличие от двустороннего связывания Angular, здесь нет автоматической синхронизации.',
      wrong: [
        'Двунаправленный — как в Angular.',
        'Циклический — данные передаются в обе стороны.',
        'Поток данных определяет разработчик.'
      ]
    },
    {
      id: 'react-general-4',
      subtopic: 'React — общее',
      level: 'Middle',
      q: 'Какие основные минусы у React?',
      a: 'Высокий порог входа (JSX, хуки, ecosystem). Частые обновления требуют постоянного изучения. Нет встроенного решения для роутинга, состояния, форм — нужны библиотеки.',
      explain: 'Экосистема — одновременно плюс и минус: выбор библиотек велик, но нет единого стандарта. Часто спрашивают следом, чем React отличается от Vue: Vue даёт больше из коробки.\n\n```js\n// Роутинг, состояние, формы — всё подключается отдельно\nimport { BrowserRouter } from "react-router-dom";\n```\n\nТипичная ошибка новичка — тащить в проект сразу Redux, хотя хватает useState.',
      wrong: [
        'React медленный и не подходит для больших приложений.',
        'React нельзя использовать с TypeScript.',
        'React не поддерживается в современных браузерах.'
      ]
    },
    {
      id: 'react-general-5',
      subtopic: 'React — общее',
      level: 'Middle',
      q: 'Какой основной набор библиотек используется с React?',
      a: 'React Router — роутинг. Redux / Zustand — состояние. React Hook Form / Formik — формы. Axios / Fetch — HTTP. React Query — кэш серверных данных.',
      explain: 'Выбор зависит от задачи: для небольших приложений хватает Context + fetch, для крупных — Redux Toolkit и React Query.\n\n```js\nimport { useQuery } from "@tanstack/react-query";\nconst { data } = useQuery({ queryKey: ["todos"], queryFn: fetchTodos });\n```\n\nВ отличие от Angular, где всё это встроено, в React каждая часть подключается отдельно.',
      wrong: [
        'Только React Router.',
        'Только Redux.',
        'React не требует дополнительных библиотек — всё есть из коробки.'
      ]
    },
    {
      id: 'react-general-6',
      subtopic: 'React — общее',
      level: 'Middle+',
      q: 'Что такое Synthetic Events?',
      a: 'Обёртка React над нативными DOM-событиями. Обеспечивает кроссбраузерную совместимость, единый API и управление жизненным циклом событий (например, pooling в старых версиях).',
      explain: 'SyntheticEvent имеет те же поля, что и нативное событие: type, target, preventDefault. В React 17+ pooling убран, событие можно читать асинхронно.\n\n```js\nfunction handleClick(e) { console.log(e.type); e.preventDefault(); }\n```\n\nТипичная ошибка — думать, что это отдельные события: на деле React делегирует их к корню приложения.',
      wrong: [
        'Синтетические события — это события, созданные вручную через dispatchEvent.',
        'Это события, эмулирующие пользовательский ввод.',
        'Это нативные события DOM без обёрток.'
      ]
    },
    {
      id: 'react-general-7',
      subtopic: 'React — общее',
      level: 'Senior',
      q: 'Что такое конкурентный режим (Concurrent Mode)?',
      a: 'Режим React 18+, позволяющий рендерить асинхронно, приостанавливать и возобновлять задачи, управлять приоритетами. Включается через createRoot.',
      explain: 'Конкурентный режим — не флаг, а набор возможностей: useTransition, useDeferredValue, Suspense. React может прервать рендер, чтобы не блокировать ввод пользователя.\n\n```js\nconst root = ReactDOM.createRoot(document.getElementById("root"));\nroot.render(<App />);\n```\n\nВ отличие от старого sync-рендера, здесь рендер можно прервать и продолжить.',
      wrong: [
        'Режим для многопоточной работы React.',
        'Режим для параллельного рендера на сервере.',
        'Режим для одновременного рендера нескольких приложений.'
      ]
    },
    {
      id: 'react-general-8',
      subtopic: 'React — общее',
      level: 'Senior',
      q: 'Как React работает под капотом? Что такое Fiber?',
      a: 'Fiber — переписанный алгоритм согласования (reconciliation). Разбивает рендер на единицы работы, позволяет прерывать, приоритизировать и возобновлять. Основа конкурентного режима.',
      explain: 'Fiber — это структура данных (связный список узлов работы) и планировщик. Каждый узел знает о своих детях, siblings и родителе, поэтому обход можно приостановить.\n\n```js\n// Упрощённо: единица работы\n{ type, props, child, sibling, return }\n```\n\nТипичная ошибка — путать Fiber с библиотекой или системой событий.',
      wrong: [
        'Fiber — библиотека для работы с сетью.',
        'Fiber — система событий React.',
        'Fiber — менеджер состояния.'
      ]
    },

    // ================= VIRTUAL DOM =================
    {
      id: 'react-vdom-1',
      subtopic: 'Virtual DOM',
      level: 'Junior-',
      q: 'Что такое Virtual DOM и зачем он нужен?',
      a: 'Облегчённая копия реального DOM в памяти. React сравнивает новое и старое деревья VDOM и обновляет только изменившиеся части реального DOM.',
      explain: 'VDOM — это обычные JS-объекты, а не реальные узлы. Работа с ними дешевле, чем с DOM, поэтому diffing экономит дорогие операции.\n\n```js\n// Упрощённо VDOM-узел\n{ type: "div", props: { className: "box" }, children: [] }\n```\n\nВ отличие от прямых манипуляций DOM, React сначала считает разницу, потом применяет её пакетно.',
      wrong: [
        'Полная копия реального DOM для резервного хранения.',
        'Кэш HTML-страницы в памяти браузера.',
        'Способ отрисовки без DOM вообще.'
      ]
    },
    {
      id: 'react-vdom-2',
      subtopic: 'Virtual DOM',
      level: 'Junior',
      q: 'Для чего нужны ключи (keys) в React?',
      a: 'Для идентификации элементов в списках. Помогают React эффективно отслеживать добавление, удаление и перемещение элементов.',
      explain: 'Без ключей React сопоставляет элементы по индексу, что при перестановке ломает состояние. Ключ должен быть стабильным и уникальным среди siblings.\n\n```js\nitems.map(item => <li key={item.id}>{item.name}</li>);\n```\n\nТипичная ошибка — использовать индекс массива как key при сортировке или удалении.',
      wrong: [
        'Для сортировки элементов.',
        'Для стилизации элементов.',
        'Для передачи данных в компонент.'
      ]
    },
    {
      id: 'react-vdom-3',
      subtopic: 'Virtual DOM',
      level: 'Junior',
      q: 'Что будет, если не использовать ключи?',
      a: 'React может некорректно обновлять элементы списка: перепутает состояние, вызовет лишние ререндеры, потеряет введённые данные в input.',
      explain: 'React предупредит в консоли: "Each child in a list should have a unique key". Особенно заметно на списках с input или локальным состоянием.\n\n```js\n// При перестановке без key состояние input прилипнет не к тому элементу\nitems.map(item => <Row data={item} />);\n```\n\nОшибка не всегда сразу видна — баг проявляется при динамике списка.',
      wrong: [
        'React выдаст ошибку компиляции.',
        'Список вообще не отрендерится.',
        'Ключи необязательны — React всегда справляется сам.'
      ]
    },
    {
      id: 'react-vdom-4',
      subtopic: 'Virtual DOM',
      level: 'Middle',
      q: 'В каком виде хранится VDOM?',
      a: 'В виде дерева объектов JavaScript. Каждый узел описывает тип (тег или компонент), props и детей.',
      explain: 'JSX компилируется в вызовы React.createElement, который возвращает объект. Именно эти объекты и есть VDOM.\n\n```js\nReact.createElement("div", { className: "box" }, "Hi");\n// { type: "div", props: { className: "box", children: "Hi" } }\n```\n\nВ отличие от HTML-строки, объект легко сравнивать и модифицировать.',
      wrong: [
        'В виде HTML-строки.',
        'В виде JSON-файла.',
        'В виде бинарного формата.'
      ]
    },
    {
      id: 'react-vdom-5',
      subtopic: 'Virtual DOM',
      level: 'Middle',
      q: 'Как происходит сравнение (diffing) VDOM?',
      a: 'React сравнивает старое и новое дерево, находит минимальные различия и применяет их к реальному DOM. Алгоритм O(n) за счёт эвристик: разные типы элементов → полная перерисовка ветки; одинаковые — сравнение props и детей.',
      explain: 'Эвристики: элементы разных типов заменяются целиком, ключи помогают сопоставлять списки. Полный алгоритм сравнения деревьев был бы O(n³), поэтому React использует допущения.\n\n```js\n// div → span: вся ветка пересоздаётся\n{ type: "div" } // старый\n{ type: "span" } // новый\n```\n\nТипичная ошибка — думать, что React сравнивает HTML-строки.',
      wrong: [
        'Полное пересоздание DOM при каждом рендере.',
        'Сравнение строк HTML.',
        'Побайтовое сравнение снимков DOM.'
      ]
    },
    {
      id: 'react-vdom-6',
      subtopic: 'Virtual DOM',
      level: 'Senior',
      q: 'По какому паттерну проектирования работает отслеживание состояния React?',
      a: 'Наблюдатель (Observer) + однонаправленный поток данных. Компоненты подписываются на изменения состояния, React уведомляет их и перерисовывает.',
      explain: 'Хуки и setState регистрируют обновления, React ставит их в очередь и планирует ререндер. Это ближе к pull-модели, чем к классическому Observer с прямыми подписками.\n\n```js\nconst [count, setCount] = useState(0);\nsetCount(1); // планирует ререндер подписанного компонента\n```\n\nЧасто путают с MVC — в React нет контроллера как отдельного слоя.',
      wrong: [
        'MVC — Model-View-Controller.',
        'Singleton.',
        'Фабрика.'
      ]
    },
    {
      id: 'react-vdom-7',
      subtopic: 'Virtual DOM',
      level: 'Senior',
      q: 'Что такое Batching в контексте React?',
      a: 'Объединение нескольких setState в один ререндер для оптимизации. В React 17 батчинг работал только в обработчиках событий, в React 18 — везде (включая setTimeout, промисы).',
      explain: 'Автоматический батчинг в React 18 покрывает промисы и таймеры. Если нужно применить обновление немедленно, используют flushSync.\n\n```js\nsetCount(c => c + 1);\nsetFlag(f => !f);\n// один ререндер вместо двух\n```\n\nТипичная ошибка — читать state сразу после setState и получать старое значение.',
      wrong: [
        'Отправка нескольких запросов в одном пакете.',
        'Объединение нескольких компонентов в один.',
        'Кэширование рендеров.'
      ]
    },

    // ================= REACT API =================
    {
      id: 'react-api-1',
      subtopic: 'React API',
      level: 'Junior',
      q: 'Что такое React.Fragment?',
      a: 'Компонент для группировки нескольких элементов без создания лишнего DOM-узла. Синтаксис: <React.Fragment> или <></>.',
      explain: 'Fragment не рендерит обёртку в DOM, поэтому не ломает flex/grid-разметку. Сокращённая запись <></> не принимает атрибуты.\n\n```js\n<>\n  <li>One</li>\n  <li>Two</li>\n</>\n```\n\nВ отличие от div-обёртки, Fragment не создаёт лишний узел.',
      wrong: [
        'Компонент для создания порталов.',
        'Обёртка для стилизации группы элементов.',
        'Способ разделения кода.'
      ]
    },
    {
      id: 'react-api-2',
      subtopic: 'React API',
      level: 'Junior',
      q: 'Чем <React.Fragment> отличается от <></>?',
      a: 'Синтаксически почти ничем. Разница: <React.Fragment> позволяет передать key (например, в списке), а <></> — нет.',
      explain: 'Полная запись нужна, когда фрагменту требуется key или другой атрибут. Сокращённая <></> — просто синтаксический сахар.\n\n```js\nitems.map(item => (\n  <React.Fragment key={item.id}>\n    <dt>{item.term}</dt>\n    <dd>{item.def}</dd>\n  </React.Fragment>\n));\n```\n\nТипичная ошибка — пытаться передать key в <></>.',
      wrong: [
        'Разницы нет вообще.',
        '<></> работает только в функциональных компонентах.',
        '<React.Fragment> создаёт DOM-узел, <></> — нет.'
      ]
    },
    {
      id: 'react-api-3',
      subtopic: 'React API',
      level: 'Junior+',
      q: 'Что такое React Portal? Для чего нужен?',
      a: 'Позволяет рендерить компонент в другой DOM-узел, вне иерархии родителя. Полезен для модалок, тултипов, попапов, где нужно избежать overflow: hidden или z-index.',
      explain: 'Portal сохраняет React-контекст и всплытие событий, хотя DOM-узел находится в другом месте. Это важно для модалок внутри прокручиваемых контейнеров.\n\n```js\nReactDOM.createPortal(<Modal />, document.getElementById("modal-root"));\n```\n\nВ отличие от обычного рендера, событие всплывает по React-дереву, а не по DOM.',
      wrong: [
        'Позволяет рендерить компонент в новом окне браузера.',
        'Способ передать данные между компонентами.',
        'Устаревший аналог React.Fragment.'
      ]
    },
    {
      id: 'react-api-4',
      subtopic: 'React API',
      level: 'Middle',
      q: 'Что такое React.Lazy и React.Suspense?',
      a: 'React.lazy — ленивая загрузка компонентов (код загружается по требованию). React.Suspense — обёртка, показывающая fallback (спиннер) до загрузки ленивого компонента.',
      explain: 'lazy принимает функцию, возвращающую динамический import. Suspense нужен, чтобы показать заглушку во время загрузки.\n\n```js\nconst Chart = React.lazy(() => import("./Chart"));\n<Suspense fallback={<Spinner />}><Chart /></Suspense>\n```\n\nТипичная ошибка — использовать lazy без Suspense: React выдаст ошибку.',
      wrong: [
        'lazy — загрузка данных, Suspense — их кэширование.',
        'lazy — мемоизация, Suspense — отложенный рендер.',
        'Оба про асинхронные запросы.'
      ]
    },
    {
      id: 'react-api-5',
      subtopic: 'React API',
      level: 'Middle+',
      q: 'Что такое React.StrictMode?',
      a: 'Компонент-обёртка для разработки. Двойной вызов рендеров и эффектов (для поиска сайд-эффектов), предупреждения об устаревших API. В продакшене не работает.',
      explain: 'Двойной вызов эффектов помогает найти утечки: если подписка не отписывается, это проявится в StrictMode. В dev-режиме монтирование и размонтирование повторяются.\n\n```js\n<React.StrictMode>\n  <App />\n</React.StrictMode>\n```\n\nЧасто путают с валидацией props — StrictMode ничего не валидирует.',
      wrong: [
        'Строгий режим, запрещающий любые ошибки.',
        'Компонент для валидации props.',
        'Режим для продакшена.'
      ]
    },
    {
      id: 'react-api-6',
      subtopic: 'React API',
      level: 'Middle+',
      q: 'Как показать пользователю сообщение об ошибке вместо красного экрана?',
      a: 'Через Error Boundary — компонент с componentDidCatch или getDerivedStateFromError. В функциональных компонентах пока нет встроенного аналога — нужны библиотеки (react-error-boundary).',
      explain: 'Error Boundary ловит ошибки в детях, но не в себе и не в асинхронном коде. Оборачивать нужно на уровне маршрутов или крупных блоков.\n\n```js\nclass Boundary extends React.Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() { return { hasError: true }; }\n  render() { return this.state.hasError ? <Fallback /> : this.props.children; }\n}\n```\n\nТипичная ошибка — ожидать, что try/catch вокруг JSX поймает ошибку рендера.',
      wrong: [
        'Через try/catch вокруг JSX.',
        'Через window.onerror.',
        'Через React.StrictMode.'
      ]
    },
    {
      id: 'react-api-7',
      subtopic: 'React API',
      level: 'Senior',
      q: 'Как проверить производительность и количество рендеров компонентов?',
      a: 'React DevTools Profiler — показывает, какие компоненты рендерились, сколько раз и сколько заняло. Также можно использовать console.log в рендере или why-did-you-render.',
      explain: 'Profiler записывает сессию и показывает flame chart. why-did-you-render подсвечивает лишние ререндеры с одинаковыми props.\n\n```js\nconsole.log("render"); // быстрый способ увидеть частоту\n```\n\nВ отличие от Chrome Performance, Profiler понимает компоненты React.',
      wrong: [
        'Только через Chrome Performance tab.',
        'Только через console.time.',
        'React не предоставляет инструментов для профилирования.'
      ]
    },

    // ================= STATE & PROPS =================
    {
      id: 'react-state-1',
      subtopic: 'State & Props',
      level: 'Junior-',
      q: 'Что такое state и props? Чем отличаются?',
      a: 'state — внутреннее состояние компонента, изменяемое самим компонентом. props — данные, передаваемые от родителя, для ребёнка read-only.',
      explain: 'state принадлежит компоненту и меняется через setState/useState. props приходят снаружи и не должны мутироваться.\n\n```js\nfunction Child({ name }) { return <p>{name}</p>; }\nfunction Parent() { return <Child name="Ann" />; }\n```\n\nТипичная ошибка — пытаться изменить props внутри ребёнка.',
      wrong: [
        'Это одно и то же.',
        'state передаётся от родителя, props хранится внутри.',
        'props можно менять, state — нет.'
      ]
    },
    {
      id: 'react-state-2',
      subtopic: 'State & Props',
      level: 'Junior',
      q: 'Почему не стоит напрямую менять state или props?',
      a: 'Прямое изменение state (this.state.x = 1 или state.x = 1) не уведомляет React — ререндер не произойдёт, UI останется старым. props менять нельзя — это данные родителя.',
      explain: 'React сравнивает ссылки, а не глубоко мутирует объекты. Поэтому нужно создавать новый объект или массив.\n\n```js\nsetItems([...items, newItem]); // новый массив\nsetUser({ ...user, name: "Ann" }); // новый объект\n```\n\nТипичная ошибка — push в массив state и ожидать ререндер.',
      wrong: [
        'Это вызовет ошибку компиляции.',
        'Это разрешено, просто не рекомендуется.',
        'Прямое изменение работает, но быстрее.'
      ]
    },
    {
      id: 'react-state-3',
      subtopic: 'State & Props',
      level: 'Junior',
      q: 'Как передать в компонент несколько props из одного объекта?',
      a: 'Через спред: <Component {...props} />. Все свойства объекта станут отдельными props.',
      explain: 'Спред — синтаксический сахар над React.createElement. Он не создаёт новый объект, а разворачивает свойства.\n\n```js\nconst data = { id: 1, name: "Ann" };\n<Card {...data} /> // id={1} name="Ann"\n```\n\nВ отличие от props={data}, при спреде компонент получает отдельные поля.',
      wrong: [
        'Через props={obj}.',
        'Через Component.props = obj.',
        'Передать можно только по одному.'
      ]
    },

    // ================= CONTEXT =================
    {
      id: 'react-context-1',
      subtopic: 'Context',
      level: 'Junior',
      q: 'Что такое Props drilling?',
      a: 'Проброс props через несколько уровней вложенных компонентов, даже если промежуточные их не используют. Усложняет поддержку.',
      explain: 'Проблема растёт с глубиной дерева: каждый промежуточный компонент вынужден знать о props, которые ему не нужны. Context или state-менеджер решают это.\n\n```js\n<A user={user}><B user={user}><C user={user} /></B></A>\n```\n\nТипичная ошибка — тащить props через 5 уровней вместо Context.',
      wrong: [
        'Передача props от родителя к ребёнку напрямую.',
        'Передача функций через props.',
        'Автоматический проброс props через компоненты.'
      ]
    },
    {
      id: 'react-context-2',
      subtopic: 'Context',
      level: 'Junior',
      q: 'Чем пользуются для избежания props drilling?',
      a: 'Context API, Redux, Zustand, MobX — библиотеки управления состоянием.',
      explain: 'Context хорош для редко меняющихся данных (тема, локаль). Для сложного состояния с частыми обновлениями лучше Redux или Zustand.\n\n```js\nconst ThemeContext = React.createContext("light");\n```\n\nВ отличие от Redux, Context не даёт devtools и middlewares из коробки.',
      wrong: [
        'Только Redux.',
        'Только Context API.',
        'Props drilling невозможно избежать.'
      ]
    },
    {
      id: 'react-context-3',
      subtopic: 'Context',
      level: 'Junior+',
      q: 'Что такое Context object и как его создать?',
      a: 'Объект, позволяющий передавать данные через дерево без явного проброса props. Создаётся через React.createContext(defaultValue).',
      explain: 'defaultValue используется, если выше нет Provider. Сам объект содержит Provider и Consumer.\n\n```js\nconst ThemeContext = React.createContext("light");\n<ThemeContext.Provider value="dark"><App /></ThemeContext.Provider>\n```\n\nЧасто путают сам Context и его Provider.',
      wrong: [
        'Объект состояния приложения.',
        'Компонент-обёртка.',
        'Способ хранения данных в localStorage.'
      ]
    },
    {
      id: 'react-context-4',
      subtopic: 'Context',
      level: 'Junior+',
      q: 'Какими способами получить доступ к Context в компоненте?',
      a: 'Через хук useContext(MyContext) в функциональных. Или через MyContext.Consumer в классовых. Или через static contextType в классах.',
      explain: 'useContext читает ближайший Provider выше по дереву. static contextType даёт this.context в классе.\n\n```js\nconst theme = useContext(ThemeContext);\n```\n\nТипичная ошибка — вызывать useContext вне компонента.',
      wrong: [
        'Только через Consumer.',
        'Только через this.context.',
        'Context доступен автоматически без импорта.'
      ]
    },
    {
      id: 'react-context-5',
      subtopic: 'Context',
      level: 'Junior+',
      q: 'Как использовать хук useContext?',
      a: 'import { useContext } from "react"; const value = useContext(MyContext); Возвращает текущее значение из ближайшего Provider выше по дереву.',
      explain: 'Если Provider нет, вернётся defaultValue, переданный в createContext. Хук должен вызываться на верхнем уровне компонента.\n\n```js\nconst theme = useContext(ThemeContext);\n```\n\nТипичная ошибка — вызывать useContext внутри условия или цикла.',
      wrong: [
        'const value = MyContext.use();',
        'const value = this.useContext(MyContext);',
        'useContext требует передачи компонента вторым аргументом.'
      ]
    },
    {
      id: 'react-context-6',
      subtopic: 'Context',
      level: 'Middle',
      q: 'Почему нельзя задавать value={{...}} напрямую?',
      a: 'Объект создаётся заново при каждом рендере — это триггерит ререндер всех потребителей Context, даже если данные не изменились. Нужно мемоизировать через useMemo.',
      explain: 'React сравнивает value по ссылке. Новый объект = новая ссылка = ререндер всех потребителей.\n\n```js\nconst value = useMemo(() => ({ user, setUser }), [user]);\n<Ctx.Provider value={value}><App /></Ctx.Provider>\n```\n\nТипичная ошибка — передавать inline-объект и удивляться лишним ререндерам.',
      wrong: [
        'Это вызовет синтаксическую ошибку.',
        'React не поддерживает объекты в value.',
        'Никаких проблем, это стандартный подход.'
      ]
    },
    {
      id: 'react-context-7',
      subtopic: 'Context',
      level: 'Middle+',
      q: 'Можно ли вкладывать провайдеры одного и того же Context?',
      a: 'Да. Данные берутся из ближайшего Provider выше по дереву — внутренний перекрывает внешний.',
      explain: 'Это удобно для переопределения значения в поддереве. Consumer/useContext всегда читает ближайший Provider.\n\n```js\n<Ctx.Provider value="a">\n  <Ctx.Provider value="b"><Child /></Ctx.Provider>\n</Ctx.Provider>\n// Child получит "b"\n```\n\nВ отличие от глобальной переменной, значение локально для поддерева.',
      wrong: [
        'Нет, это вызовет ошибку.',
        'Да, но данные суммируются.',
        'Да, но берутся из самого верхнего.'
      ]
    },
    {
      id: 'react-context-8',
      subtopic: 'Context',
      level: 'Middle+',
      q: 'Как обновить Context из глубоко вложенного компонента?',
      a: 'Прокинуть setState через Context: провайдер хранит значение и функцию обновления, дети вызывают её через useContext. Либо использовать state-менеджер (Redux/Zustand).',
      explain: 'Context хранит данные, но не логику обновления. Обычно в value кладут и значение, и сеттер.\n\n```js\nconst Ctx = createContext(null);\n<Ctx.Provider value={{ user, setUser }}><App /></Ctx.Provider>\n```\n\nТипичная ошибка — пытаться мутировать value напрямую.',
      wrong: [
        'Context нельзя обновить из дочернего компонента.',
        'Через прямое изменение value.',
        'Через глобальную переменную.'
      ]
    },
    {
      id: 'react-context-9',
      subtopic: 'Context',
      level: 'Senior',
      q: 'С какого компонента начнётся ререндер после изменения value Context?',
      a: 'Со всех компонентов-потребителей (useContext/Consumer) ниже провайдера. Промежуточные компоненты, не потребляющие Context, не перерисовываются.',
      explain: 'React помечает только тех, кто подписан на Context. Это отличает Context от Redux, где ререндер зависит от селектора.\n\n```js\n// ChildA и ChildB используют useContext — оба ререндерятся\n<Ctx.Provider value={v}><ChildA /><ChildB /></Ctx.Provider>\n```\n\nТипичная ошибка — думать, что ререндерится всё поддерево.',
      wrong: [
        'Со всех компонентов приложения.',
        'Только с прямых детей провайдера.',
        'Ни с каких — Context не триггерит ререндер.'
      ]
    },
    {
      id: 'react-context-10',
      subtopic: 'Context',
      level: 'Senior',
      q: 'Для чего нужен Context.displayName?',
      a: 'Задаёт имя Context для отображения в React DevTools. Помогает различать несколько контекстов при отладке.',
      explain: 'По умолчанию Context отображается как Context.Provider без имени. displayName делает дерево читаемым.\n\n```js\nThemeContext.displayName = "ThemeContext";\n```\n\nНе влияет на работу приложения — только на отладку.',
      wrong: [
        'Для стилизации компонента.',
        'Для передачи значения по умолчанию.',
        'Для доступа к Context в классах.'
      ]
    },

    // ================= HOC & RENDER PROP =================
    {
      id: 'react-hoc-1',
      subtopic: 'HOC & render-prop',
      level: 'Middle',
      q: 'Что такое HOC (Higher-Order Component)? Когда полезен?',
      a: 'Функция, принимающая компонент и возвращающая новый компонент с дополнительной функциональностью. Полезен для переиспользования логики: авторизация, логирование, инжект props.',
      explain: 'HOC — не компонент, а функция. Он не мутирует исходный компонент, а создаёт обёртку.\n\n```js\nconst withAuth = (Component) => (props) =>\n  isLoggedIn ? <Component {...props} /> : <Login />;\n```\n\nТипичная ошибка — мутировать переданный компонент.',
      wrong: [
        'Компонент высшего порядка — родительский компонент.',
        'Компонент с большим количеством props.',
        'Компонент с состоянием.'
      ]
    },
    {
      id: 'react-hoc-2',
      subtopic: 'HOC & render-prop',
      level: 'Middle',
      q: 'Как передать в возвращаемый компонент все props и добавить новые?',
      a: 'function withLogger(Component) { return function(props) { console.log("render"); return <Component {...props} extraProp={1} />; }; }',
      explain: 'Спред передаёт все исходные props, а дополнительные указываются явно. Важно не потерять ref и displayName.\n\n```js\nreturn <Component {...props} extraProp={1} />;\n```\n\nТипичная ошибка — забыть пробросить props и сломать компонент.',
      wrong: [
        'Компонент нельзя обернуть — только наследовать.',
        'Через Component.props = {...}.',
        'Через props.extra = 1 — мутация запрещена.'
      ]
    },
    {
      id: 'react-hoc-3',
      subtopic: 'HOC & render-prop',
      level: 'Middle+',
      q: 'Можно ли в HOC обернуть сразу несколько элементов?',
      a: 'HOC работает с одним компонентом, но этот компонент может рендерить любую структуру. Оборачивать несколько компонентов сразу — нельзя, только по одному.',
      explain: 'HOC принимает один компонент. Если нужно обернуть несколько — применяют HOC к каждому или к родителю.\n\n```js\nconst Enhanced = withAuth(withLogger(Component));\n```\n\nТипичная ошибка — передавать массив компонентов в HOC.',
      wrong: [
        'Да, через массив компонентов.',
        'Да, через React.Fragment.',
        'HOC не работает с компонентами.'
      ]
    },
    {
      id: 'react-hoc-4',
      subtopic: 'HOC & render-prop',
      level: 'Middle+',
      q: 'Как комбинировать HOC?',
      a: 'Через композицию: withAuth(withLogger(Component)). Или через compose из Redux/recompose. Порядок обёрток влияет на результат.',
      explain: 'Композиция справа налево: сначала применяется внутренний HOC. Порядок важен, если HOC зависят от props друг друга.\n\n```js\nconst Enhanced = compose(withAuth, withLogger)(Component);\n```\n\nТипичная ошибка — путать порядок применения.',
      wrong: [
        'Только по одному HOC на компонент.',
        'Через Object.assign(Component, HOC).',
        'Комбинировать HOC нельзя.'
      ]
    },
    {
      id: 'react-hoc-5',
      subtopic: 'HOC & render-prop',
      level: 'Middle+',
      q: 'Что такое render-prop?',
      a: 'Паттерн, при котором компонент принимает функцию-рендер через prop и вызывает её, передавая данные. Позволяет переиспользовать логику без HOC.',
      explain: 'Render-prop даёт больше гибкости, чем HOC: логика и разметка разделены. Часто используется в библиотеках до хуков.\n\n```js\n<DataLoader render={(data) => <List data={data} />} />\n```\n\nВ отличие от HOC, не создаёт лишних обёрток в дереве.',
      wrong: [
        'Передача JSX как prop.',
        'Передача компонента через prop.',
        'Функция внутри рендера компонента.'
      ]
    },

    // ================= REF =================
    {
      id: 'react-ref-1',
      subtopic: 'Ref',
      level: 'Junior+',
      q: 'Для чего используется React.forwardRef?',
      a: 'Позволяет передавать ref через компонент внутрь дочернего DOM-элемента. Без forwardRef ref не пробросится — React его перехватит.',
      explain: 'forwardRef принимает функцию с двумя аргументами: props и ref. Это нужно для библиотек и обёрток над input.\n\n```js\nconst Input = React.forwardRef((props, ref) => <input ref={ref} {...props} />);\n```\n\nТипичная ошибка — пытаться передать ref как обычный prop.',
      wrong: [
        'Для клонирования элементов.',
        'Для создания ссылок на компоненты.',
        'Для передачи props в классовые компоненты.'
      ]
    },
    {
      id: 'react-ref-2',
      subtopic: 'Ref',
      level: 'Middle',
      q: 'Почему нельзя просто передать ref через props?',
      a: 'ref — зарезервированное имя в React. Он не попадает в props, а обрабатывается отдельно. Для передачи нужен forwardRef или другое имя (например, innerRef).',
      explain: 'React извлекает ref до передачи props. Поэтому в дочернем компоненте props.ref будет undefined.\n\n```js\n<Child ref={myRef} /> // ref не попадёт в props Child\n```\n\nТипичная ошибка — ожидать ref в props и удивляться.',
      wrong: [
        'ref можно передать через props без проблем.',
        'ref передаётся только в классовые компоненты.',
        'forwardRef нужен только для типизации.'
      ]
    },
    {
      id: 'react-ref-3',
      subtopic: 'Ref',
      level: 'Middle+',
      q: 'Какие данные стоит хранить в useRef для оптимизации?',
      a: 'Значения, изменение которых не должно триггерить ререндер: таймеры, предыдущие значения, флаги «первый рендер», ссылки на DOM-узлы.',
      explain: 'useRef возвращает объект с полем current, который сохраняется между рендерами. Изменение current не вызывает ререндер.\n\n```js\nconst timer = useRef(null);\ntimer.current = setTimeout(fn, 1000);\n```\n\nТипичная ошибка — хранить в ref данные, которые должны влиять на UI.',
      wrong: [
        'Все данные, которые нужны в компоненте.',
        'Состояние формы.',
        'Данные, влияющие на UI.'
      ]
    },

    // ================= КОМПОНЕНТЫ =================
    {
      id: 'react-comp-1',
      subtopic: 'Компоненты',
      level: 'Junior-',
      q: 'Что такое JSX и зачем он нужен?',
      a: 'Синтаксическое расширение JS, позволяющее писать разметку внутри кода. Компилируется в React.createElement(). Улучшает читаемость компонентов.',
      explain: 'JSX не обязателен, но без него код становится громоздким. Babel или TypeScript компилируют его в вызовы createElement.\n\n```js\nconst el = <h1 className="title">Hi</h1>;\n// React.createElement("h1", { className: "title" }, "Hi")\n```\n\nТипичная ошибка — использовать class вместо className.',
      wrong: [
        'Язык разметки, как HTML.',
        'Библиотека для работы с DOM.',
        'Формат данных, как JSON.'
      ]
    },
    {
      id: 'react-comp-2',
      subtopic: 'Компоненты',
      level: 'Junior',
      q: 'Почему атрибуты в JSX пишутся в camelCase?',
      a: 'JSX-атрибуты — это свойства объектов JS, а в JS имена не могут содержать дефисы и не могут совпадать с зарезервированными словами. Поэтому tabindex → tabIndex, class → className.',
      explain: 'class — зарезервированное слово в JS, поэтому в JSX используется className. Аналогично for → htmlFor.\n\n```js\n<label htmlFor="name" tabIndex={0}>Name</label>\n```\n\nТипичная ошибка — писать class вместо className.',
      wrong: [
        'Так принято в стандарте HTML.',
        'Для совместимости с CSS.',
        'Это ошибка React, оставленная для совместимости.'
      ]
    },
    {
      id: 'react-comp-3',
      subtopic: 'Компоненты',
      level: 'Junior',
      q: 'Почему название компонента в JSX должно начинаться с большой буквы?',
      a: 'React различает HTML-теги и компоненты: строчные буквы → DOM-элементы (<div>), заглавные → компоненты (<MyComponent>).',
      explain: 'Если написать <myComponent />, React создаст неизвестный HTML-тег. Правило простое: компоненты — с заглавной.\n\n```js\n<MyComponent /> // компонент\n<myComponent /> // DOM-тег\n```\n\nТипичная ошибка — lowercase-имя компонента и пустой рендер.',
      wrong: [
        'Это просто соглашение, не влияет на работу.',
        'Для совместимости с CSS-классами.',
        'Чтобы избежать конфликта с зарезервированными словами.'
      ]
    },
    {
      id: 'react-comp-4',
      subtopic: 'Компоненты',
      level: 'Junior',
      q: 'Для чего нужен PropTypes?',
      a: 'Для проверки типов props в рантайме. Помогает отлавливать ошибки передачи данных в разработке. В TypeScript заменяется типизацией.',
      explain: 'PropTypes работают только в dev-режиме и не заменяют TypeScript. Они полезны в JS-проектах без типизации.\n\n```js\nButton.propTypes = { label: PropTypes.string.isRequired };\n```\n\nТипичная ошибка — ожидать ошибку в продакшене.',
      wrong: [
        'Для типизации состояния.',
        'Для типизации функций.',
        'Для валидации форм.'
      ]
    },
    {
      id: 'react-comp-5',
      subtopic: 'Компоненты',
      level: 'Middle',
      q: 'Чем controlled-компоненты отличаются от uncontrolled?',
      a: 'Controlled — значение input управляется React через state (value + onChange). Uncontrolled — значение хранится в DOM, доступ через ref.',
      explain: 'Controlled даёт полный контроль над значением и валидацией. Uncontrolled проще, но менее предсказуем.\n\n```js\n<input value={name} onChange={e => setName(e.target.value)} />\n<input ref={inputRef} defaultValue="Ann" />\n```\n\nТипичная ошибка — смешивать value без onChange (input станет read-only).',
      wrong: [
        'Controlled — с валидацией, uncontrolled — без.',
        'Controlled — функциональные, uncontrolled — классовые.',
        'Это одно и то же.'
      ]
    },
    {
      id: 'react-comp-6',
      subtopic: 'Компоненты',
      level: 'Middle',
      q: 'Какие виды компонентов бывают и когда какой использовать?',
      a: 'Функциональные — современный стандарт, с хуками, проще. Классовые — устаревший подход, нужны только для legacy-кода и Error Boundary. Для нового кода — всегда функциональные.',
      explain: 'Error Boundary до сих пор требует классового компонента (getDerivedStateFromError). Всё остальное можно сделать хуками.\n\n```js\nfunction App() { const [n, setN] = useState(0); return <button onClick={() => setN(n + 1)}>{n}</button>; }\n```\n\nТипичная ошибка — писать новый код на классах.',
      wrong: [
        'Классовые — современный стандарт.',
        'Выбор зависит от размера компонента.',
        'Оба вида равнозначны.'
      ]
    },
    // ================= КЛАССОВЫЕ КОМПОНЕНТЫ =================
    {
      id: 'react-class-1',
      subtopic: 'Классовые компоненты',
      level: 'Junior',
      q: 'Как создать классовый компонент?',
      a: 'class MyComponent extends React.Component { render() { return <div>Hello</div>; } }',
      explain: 'Классовый компонент обязан наследовать React.Component и реализовать render. Без extends не будет this.props и жизненного цикла.\n\n```js\nclass MyComponent extends React.Component {\n  render() { return <div>Hello</div>; }\n}\n```\n\nТипичная ошибка — забыть extends или render.',
      wrong: [
        'class MyComponent { render() { ... } } — без extends.',
        'function MyComponent() { this.render = ... }',
        'const MyComponent = new React.Component();'
      ]
    },
    {
      id: 'react-class-2',
      subtopic: 'Классовые компоненты',
      level: 'Junior+',
      q: 'Почему мы должны использовать extends React.Component?',
      a: 'Чтобы получить доступ к жизненному циклу, this.state, this.props, setState и методу render, которые предоставляет базовый класс Component.',
      explain: 'React.Component задаёт контракт: render, setState, жизненный цикл. Без наследования React не сможет управлять компонентом.\n\n```js\nclass Counter extends React.Component {\n  state = { n: 0 };\n  render() { return <button onClick={() => this.setState({ n: this.state.n + 1 })}>{this.state.n}</button>; }\n}\n```\n\nТипичная ошибка — создать класс без наследования.',
      wrong: [
        'Чтобы компонент стал функциональным.',
        'Чтобы включить типизацию.',
        'Это необязательно — можно обойтись без extends.'
      ]
    },
    {
      id: 'react-class-3',
      subtopic: 'Классовые компоненты',
      level: 'Junior+',
      q: 'Зачем писать super(props) в конструкторе?',
      a: 'Чтобы вызвать конструктор родителя и получить доступ к this.props внутри конструктора. Без super() this будет недоступен.',
      explain: 'super(props) инициализирует this и передаёт props в родительский конструктор. Если не вызвать super, обращение к this бросит ошибку.\n\n```js\nconstructor(props) {\n  super(props);\n  this.state = { n: 0 };\n}\n```\n\nТипичная ошибка — забыть super и получить "this is not defined".',
      wrong: [
        'Для инициализации state.',
        'Для регистрации компонента в React.',
        'Это необязательно.'
      ]
    },
    {
      id: 'react-class-4',
      subtopic: 'Классовые компоненты',
      level: 'Junior+',
      q: 'Чего не стоит делать в конструкторе?',
      a: 'Побочных эффектов: запросов к API, подписок, работы с DOM, вызова setState. Конструктор — только для инициализации state и bind методов.',
      explain: 'Конструктор вызывается до монтирования, DOM ещё нет. Запросы и подписки — в componentDidMount.\n\n```js\nconstructor(props) { super(props); this.state = { n: 0 }; this.handle = this.handle.bind(this); }\n```\n\nТипичная ошибка — fetch в конструкторе и работа с DOM.',
      wrong: [
        'Инициализировать state.',
        'Привязывать методы через bind.',
        'Инициализировать ref.'
      ]
    },
    {
      id: 'react-class-5',
      subtopic: 'Классовые компоненты',
      level: 'Middle',
      q: 'Какие фазы жизненного цикла есть у классового компонента?',
      a: 'Mounting (монтирование), Updating (обновление), Unmounting (размонтирование). Плюс обработка ошибок.',
      explain: 'Каждая фаза имеет свои методы: componentDidMount, componentDidUpdate, componentWillUnmount, componentDidCatch. Порядок вызовов важен.\n\n```js\ncomponentDidMount() { fetchData(); }\ncomponentWillUnmount() { clearInterval(this.timer); }\n```\n\nТипичная ошибка — путать порядок фаз.',
      wrong: [
        'Только Mounting и Unmounting.',
        'Только Updating.',
        'Жизненный цикл только у функциональных компонентов.'
      ]
    },
    {
      id: 'react-class-6',
      subtopic: 'Классовые компоненты',
      level: 'Middle',
      q: 'Где делать запросы к API в классовом компоненте?',
      a: 'В componentDidMount. Там компонент уже смонтирован, DOM доступен, запрос выполнится один раз после первого рендера.',
      explain: 'componentDidMount вызывается один раз после монтирования. Если нужен запрос при изменении props — в componentDidUpdate с проверкой.\n\n```js\ncomponentDidMount() { fetch("/api").then(r => r.json()).then(data => this.setState({ data })); }\n```\n\nТипичная ошибка — запрос в render или конструкторе.',
      wrong: [
        'В конструкторе.',
        'В render().',
        'В componentWillMount (устарел).'
      ]
    },
    {
      id: 'react-class-7',
      subtopic: 'Классовые компоненты',
      level: 'Middle+',
      q: 'В чём проблема componentDidUpdate?',
      a: 'Вызывается после каждого обновления. Если внутри делать setState без условия — бесконечный цикл. Нужно сравнивать prevProps/prevState с текущими.',
      explain: 'Всегда проверяйте, изменилось ли то, что вас интересует. Иначе setState → componentDidUpdate → setState → ...\n\n```js\ncomponentDidUpdate(prevProps) {\n  if (prevProps.id !== this.props.id) fetchData(this.props.id);\n}\n```\n\nТипичная ошибка — безусловный setState.',
      wrong: [
        'componentDidUpdate вызывается только один раз.',
        'В нём нельзя делать запросы.',
        'Это устаревший метод, не работает в React 18.'
      ]
    },
    {
      id: 'react-class-8',
      subtopic: 'Классовые компоненты',
      level: 'Middle+',
      q: 'Почему render() должен быть чистым?',
      a: 'render вызывается многократно. Побочные эффекты (setState, запросы, подписки) приведут к непредсказуемому поведению и утечкам.',
      explain: 'render должен только вычислять JSX на основе props/state. Любые действия — в lifecycle-методах или хуках.\n\n```js\nrender() { return <div>{this.props.title}</div>; } // чисто\n```\n\nТипичная ошибка — fetch или setState в render.',
      wrong: [
        'render вызывается один раз.',
        'В render нельзя использовать props.',
        'Чистота render не важна.'
      ]
    },
    {
      id: 'react-class-9',
      subtopic: 'Классовые компоненты',
      level: 'Middle+',
      q: 'Что такое unsafe lifecycle methods?',
      a: 'Устаревшие методы (componentWillMount, componentWillReceiveProps, componentWillUpdate), помеченные UNSAFE_. Небезопасны с асинхронным рендером. Заменены на getDerivedStateFromProps, getSnapshotBeforeUpdate, componentDidUpdate.',
      explain: 'Эти методы могут вызваться несколько раз при конкурентном рендере. Их использование даёт предупреждение.\n\n```js\n// Было: componentWillReceiveProps\n// Стало: getDerivedStateFromProps\nstatic getDerivedStateFromProps(nextProps, prevState) { ... }\n```\n\nТипичная ошибка — использовать UNSAFE_ в новом коде.',
      wrong: [
        'Методы, работающие только в unsafe-режиме.',
        'Методы для работы с ошибками.',
        'Методы, доступные только в продакшене.'
      ]
    },
    {
      id: 'react-class-10',
      subtopic: 'Классовые компоненты',
      level: 'Middle+',
      q: 'Зачем нужен getDerivedStateFromProps?',
      a: 'Статический метод, вызываемый перед каждым рендером. Позволяет обновить state на основе props. Возвращает объект-обновление или null.',
      explain: 'Метод статический — нет доступа к this. Используется редко, чаще достаточно полностью контролировать компонент через props.\n\n```js\nstatic getDerivedStateFromProps(nextProps, prevState) {\n  if (nextProps.value !== prevState.value) return { value: nextProps.value };\n  return null;\n}\n```\n\nТипичная ошибка — использовать его для запросов.',
      wrong: [
        'Для сравнения props и state.',
        'Для отмены рендера.',
        'Для получения данных из API.'
      ]
    },
    {
      id: 'react-class-11',
      subtopic: 'Классовые компоненты',
      level: 'Senior',
      q: 'Для чего нужен shouldComponentUpdate?',
      a: 'Определяет, нужно ли перерисовывать компонент при изменении props/state. Возвращает boolean. Используется для оптимизации (PureComponent делает это через shallow compare).',
      explain: 'Возврат false отменяет рендер, но не отменяет обновление state. Сравнение поверхностное — вложенные объекты не проверяются.\n\n```js\nshouldComponentUpdate(nextProps) { return nextProps.id !== this.props.id; }\n```\n\nТипичная ошибка — сравнивать глубоко и терять производительность.',
      wrong: [
        'Для обновления state.',
        'Для выполнения сайд-эффектов.',
        'Для отмены unmount.'
      ]
    },
    {
      id: 'react-class-12',
      subtopic: 'Классовые компоненты',
      level: 'Senior',
      q: 'Для чего нужны forceUpdate, getSnapshotBeforeUpdate, componentDidCatch?',
      a: 'forceUpdate — принудительный ререндер в обход shouldComponentUpdate. getSnapshotBeforeUpdate — получить данные из DOM до обновления (например, позицию скролла). componentDidCatch — обработка ошибок в детях.',
      explain: 'getSnapshotBeforeUpdate возвращает значение, которое попадёт в componentDidUpdate третьим аргументом. componentDidCatch — основа Error Boundary.\n\n```js\ngetSnapshotBeforeUpdate() { return this.list.scrollTop; }\ncomponentDidUpdate(prevProps, prevState, snapshot) { this.list.scrollTop = snapshot; }\n```\n\nТипичная ошибка — использовать forceUpdate вместо нормального обновления state.',
      wrong: [
        'Это устаревшие методы, не работают в React 18.',
        'Это методы для работы с API.',
        'Это методы для оптимизации.'
      ]
    },
    {
      id: 'react-class-13',
      subtopic: 'Классовые компоненты',
      level: 'Senior',
      q: 'Является ли this.props в классовом компоненте неизменяемым?',
      a: 'Формально this.props не заморожен и его можно мутировать, но это антипаттерн. React пересоздаёт объект props при каждом рендере. Проблема привела к появлению функционального React с хуками, где props — обычный объект.',
      explain: 'Мутация props не вызовет ререндер и запутает отладку. React перезаписывает this.props при каждом обновлении.\n\n```js\nthis.props.name = "New"; // не делайте так\n```\n\nТипичная ошибка — менять props и ждать обновления UI.',
      wrong: [
        'this.props полностью неизменяем (Object.freeze).',
        'this.props можно менять без последствий.',
        'this.props — это состояние, а не данные родителя.'
      ]
    },

    // ================= ФУНКЦИОНАЛЬНЫЕ КОМПОНЕНТЫ =================
    {
      id: 'react-fn-1',
      subtopic: 'Функциональные компоненты',
      level: 'Junior-',
      q: 'Для чего предназначены хуки useState и useEffect?',
      a: 'useState — управление состоянием. useEffect — побочные эффекты (запросы, подписки, работа с DOM), аналогия с жизненным циклом.',
      explain: 'useState возвращает значение и сеттер. useEffect заменяет componentDidMount/Update/Unmount через массив зависимостей.\n\n```js\nconst [n, setN] = useState(0);\nuseEffect(() => { document.title = n; }, [n]);\n```\n\nТипичная ошибка — путать порядок: useState — состояние, useEffect — эффекты.',
      wrong: [
        'useState — эффекты, useEffect — состояние.',
        'Оба для работы с состоянием.',
        'Оба для работы с API.'
      ]
    },
    {
      id: 'react-fn-2',
      subtopic: 'Функциональные компоненты',
      level: 'Junior',
      q: 'Что может возвращать колбэк в useEffect?',
      a: 'Ничего или функцию очистки (cleanup), которая вызовется перед следующим эффектом или при размонтировании. Пример: отписка, clearTimeout.',
      explain: 'Cleanup нужен для отписки от событий, таймеров и отмены запросов. Если вернуть промис, React выдаст ошибку.\n\n```js\nuseEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);\n```\n\nТипичная ошибка — async-колбэк в useEffect.',
      wrong: [
        'Только промис.',
        'Только другой колбэк.',
        'Только JSX.'
      ]
    },
    {
      id: 'react-fn-3',
      subtopic: 'Функциональные компоненты',
      level: 'Junior',
      q: 'Что такое массив зависимостей в useEffect?',
      a: 'Второй аргумент useEffect. [] — эффект выполнится один раз после монтирования. [dep1, dep2] — эффект перезапустится при изменении любой зависимости. Без массива — эффект выполняется после каждого рендера.',
      explain: 'React сравнивает зависимости по ссылке (Object.is). Если dep — объект или функция, создаваемые каждый рендер, эффект будет срабатывать постоянно.\n\n```js\nuseEffect(() => { fetchUser(id); }, [id]);\n```\n\nТипичная ошибка — пустой массив при использовании внешних переменных.',
      wrong: [
        'Массив функций для выполнения.',
        'Список props, обязательных к передаче.',
        'Массив компонентов, использующих эффект.'
      ]
    },
    {
      id: 'react-fn-4',
      subtopic: 'Функциональные компоненты',
      level: 'Middle',
      q: 'Почему стоит использовать функциональные компоненты?',
      a: 'Проще синтаксис, нет this, хуки дают доступ к состоянию и жизненному циклу, легче тестировать и переиспользовать логику (кастомные хуки).',
      explain: 'Хуки решают проблему переиспользования логики, которую в классах решали HOC и render-props. Код становится компактнее.\n\n```js\nfunction useWindowSize() { const [w, setW] = useState(window.innerWidth); /* ... */ return w; }\n```\n\nТипичная ошибка — думать, что функциональные компоненты быстрее на уровне движка.',
      wrong: [
        'Они быстрее классовых на уровне движка.',
        'Они работают только с TypeScript.',
        'Классовые компоненты устарели и не поддерживаются.'
      ]
    },
    {
      id: 'react-fn-5',
      subtopic: 'Функциональные компоненты',
      level: 'Middle',
      q: 'Где можно использовать хуки?',
      a: 'Только в функциональных компонентах и в кастомных хуках. Нельзя в классах, обычных функциях, циклах, условиях.',
      explain: 'Хуки полагаются на порядок вызова. Условия и циклы его нарушают, поэтому ESLint-правило hooks/rules-of-hooks это запрещает.\n\n```js\nfunction useCount() { const [n, setN] = useState(0); return n; } // можно\n// if (x) { useState(0); } — нельзя\n```\n\nТипичная ошибка — вызов хука внутри условия.',
      wrong: [
        'В любых функциях.',
        'Только в классовых компонентах.',
        'В глобальной области видимости.'
      ]
    },
    {
      id: 'react-fn-6',
      subtopic: 'Функциональные компоненты',
      level: 'Middle',
      q: 'Как создать свой кастомный хук?',
      a: 'Функция, начинающаяся с use, использующая встроенные хуки, возвращающая значения или функции. Пример: function useWindowSize() { const [size, setSize] = useState(...); useEffect(...); return size; }',
      explain: 'Кастомный хук — это композиция встроенных хуков. Префикс use нужен, чтобы ESLint применял правила хуков.\n\n```js\nfunction useWindowSize() {\n  const [w, setW] = useState(window.innerWidth);\n  useEffect(() => {\n    const onResize = () => setW(window.innerWidth);\n    window.addEventListener("resize", onResize);\n    return () => window.removeEventListener("resize", onResize);\n  }, []);\n  return w;\n}\n```\n\nТипичная ошибка — называть хук без префикса use.',
      wrong: [
        'Любая функция, использующая useState.',
        'Класс с методами.',
        'Компонент с префиксом use.'
      ]
    },
    {
      id: 'react-fn-7',
      subtopic: 'Функциональные компоненты',
      level: 'Middle+',
      q: 'Можно ли использовать хуки внутри других хуков?',
      a: 'Да, это основа создания кастомных хуков. Внутри useMyHook можно вызывать useState, useEffect и другие.',
      explain: 'Кастомные хуки — это просто функции, вызывающие другие хуки. Именно так строится переиспользуемая логика.\n\n```js\nfunction useCounter(initial = 0) {\n  const [n, setN] = useState(initial);\n  const inc = useCallback(() => setN(x => x + 1), []);\n  return { n, inc };\n}\n```\n\nТипичная ошибка — думать, что хуки можно вызывать только напрямую в компоненте.',
      wrong: [
        'Нет, хуки только в компонентах.',
        'Только useState можно вызывать внутри хуков.',
        'Только если хук возвращает JSX.'
      ]
    },
    {
      id: 'react-fn-8',
      subtopic: 'Функциональные компоненты',
      level: 'Middle+',
      q: 'Как реализовать forceUpdate в функциональном компоненте?',
      a: 'Через useState и функцию-триггер: const [, forceUpdate] = useReducer(x => x + 1, 0); forceUpdate();',
      explain: 'forceUpdate нужен редко — обычно это признак проблемы с архитектурой. Но если нужно, useReducer с инкрементом даёт ререндер.\n\n```js\nconst [, forceUpdate] = useReducer(x => x + 1, 0);\n<button onClick={forceUpdate}>Update</button>\n```\n\nТипичная ошибка — пытаться вызвать this.forceUpdate в функции.',
      wrong: [
        'Через this.forceUpdate() — доступен и в функциях.',
        'Через React.forceUpdate().',
        'В функциональных компонентах это невозможно.'
      ]
    },
    {
      id: 'react-fn-9',
      subtopic: 'Функциональные компоненты',
      level: 'Senior',
      q: 'Почему React-разработчики говорят, что функциональные компоненты быстрее?',
      a: 'Они не быстрее в рендере, но легче оптимизируются: нет инстанса класса, меньше накладных расходов на создание, хуки позволяют точно контролировать пересчёт. Плюс React развивает функциональный подход как приоритетный.',
      explain: 'Разница в производительности незначительна. Основной выигрыш — в читаемости, переиспользовании и меньшем количестве кода.\n\n```js\n// Класс: this.setState, bind, жизненный цикл\n// Функция: useState, useEffect, кастомные хуки\n```\n\nТипичная ошибка — выбирать функциональные компоненты только ради скорости.',
      wrong: [
        'Они работают в отдельном потоке.',
        'Они компилируются в WebAssembly.',
        'Они вообще не перерисовываются.'
      ]
    },

    // ================= useState =================
    {
      id: 'react-usestate-1',
      subtopic: 'State в функциональных компонентах',
      level: 'Junior-',
      q: 'Как работает useState?',
      a: 'Возвращает пару [значение, функция-сеттер]. При вызове сеттера React перерисовывает компонент с новым значением. Начальное значение задаётся аргументом.',
      explain: 'Сеттер можно вызывать с функцией-апдейтером, чтобы избежать проблем с замыканием при батчинге. Начальное значение вычисляется только при первом рендере.\n\n```js\nconst [count, setCount] = useState(0);\nsetCount(prev => prev + 1);\n```\n\nТипичная ошибка — читать state сразу после setState.',
      wrong: [
        'Возвращает объект {state, setState}.',
        'Автоматически синхронизирует state с localStorage.',
        'Изменяет состояние без ререндера.'
      ]
    },
    {
      id: 'react-usestate-2',
      subtopic: 'State в функциональных компонентах',
      level: 'Junior+',
      q: 'Как запустить эффект после изменения state?',
      a: 'Через useEffect с этим state в массиве зависимостей: useEffect(() => {...}, [count]).',
      explain: 'Эффект сработает после рендера, в котором state обновился. Если зависимостей несколько, эффект запустится при изменении любой.\n\n```js\nuseEffect(() => { console.log("count changed", count); }, [count]);\n```\n\nТипичная ошибка — пытаться запустить эффект прямо в сеттере.',
      wrong: [
        'Напрямую в сеттере state.',
        'Через componentDidUpdate.',
        'Эффект запускается автоматически при setState.'
      ]
    },
    {
      id: 'react-usestate-3',
      subtopic: 'State в функциональных компонентах',
      level: 'Junior+',
      q: 'setState — синхронная или асинхронная функция?',
      a: 'Асинхронная. Значение обновляется не сразу, а в рамках следующего рендера. Несколько setState могут батчиться в один ререндер.',
      explain: 'В React 18 батчинг работает везде: в таймерах, промисах, нативных обработчиках. Поэтому нельзя полагаться на немедленное обновление.\n\n```js\nsetCount(1);\nconsole.log(count); // старое значение\n```\n\nТипичная ошибка — ждать синхронного обновления.',
      wrong: [
        'Синхронная — значение обновляется мгновенно.',
        'Зависит от браузера.',
        'Синхронная в React 17, асинхронная в 18.'
      ]
    },
    {
      id: 'react-usestate-4',
      subtopic: 'State в функциональных компонентах',
      level: 'Middle',
      q: 'Можно ли использовать await setState?',
      a: 'Нет. setState не возвращает промис. Если нужно дождаться обновления — используй useEffect, который сработает после рендера.',
      explain: 'setState возвращает undefined. Единственный способ дождаться — эффект с зависимостью от этого state.\n\n```js\nuseEffect(() => { doSomething(count); }, [count]);\n```\n\nТипичная ошибка — await setCount() и ожидание промиса.',
      wrong: [
        'Да, setState возвращает промис.',
        'Да, но только в async-функциях.',
        'Только если state — примитив.'
      ]
    },
    {
      id: 'react-usestate-5',
      subtopic: 'State в функциональных компонентах',
      level: 'Middle',
      q: 'Что можно указывать как начальное значение useState?',
      a: 'Любое значение: примитив, массив, объект, функцию (ленивая инициализация). Функция вызовется только при первом рендере.',
      explain: 'Ленивая инициализация полезна для дорогих вычислений: функция не вызывается на каждом рендере.\n\n```js\nconst [data] = useState(() => expensiveComputation());\n```\n\nВ отличие от useState(expensiveComputation()), скобки не добавляются.',
      wrong: [
        'Только примитивы.',
        'Только объекты.',
        'Только значения без функций.'
      ]
    },
    {
      id: 'react-usestate-6',
      subtopic: 'State в функциональных компонентах',
      level: 'Middle+',
      q: 'Как обновить state на основе предыдущего значения?',
      a: 'Через функцию-апдейтер: setCount(prev => prev + 1). Это безопаснее при батчинге, когда несколько обновлений идут подряд.',
      explain: 'Функция-апдейтер получает актуальное значение из очереди. Прямое setCount(count + 1) может использовать устаревшее замыкание.\n\n```js\nsetCount(c => c + 1);\nsetCount(c => c + 1); // оба сработают\n```\n\nТипичная ошибка — setCount(count + 1) дважды подряд.',
      wrong: [
        'Напрямую: setCount(count + 1) — единственный способ.',
        'Через this.setState({count: this.state.count + 1}).',
        'Через useEffect.'
      ]
    },

    // ================= useEffect / useLayoutEffect =================
    {
      id: 'react-useeffect-1',
      subtopic: 'Lifecycles в функциональных',
      level: 'Junior-',
      q: 'Что такое useEffect и для чего нужен массив зависимостей?',
      a: 'useEffect выполняет побочные эффекты после рендера. Массив зависимостей определяет, когда эффект перезапускается: [] — один раз, [dep] — при изменении dep, без массива — каждый рендер.',
      explain: 'Эффект запускается после отрисовки, но до того, как браузер отрисует изменения? Нет, после. Для синхронных измерений DOM есть useLayoutEffect.\n\n```js\nuseEffect(() => { document.title = title; }, [title]);\n```\n\nТипичная ошибка — отсутствие зависимостей при использовании внешних переменных.',
      wrong: [
        'useEffect заменяет setState.',
        'Массив зависимостей — обязательный аргумент.',
        'useEffect работает только при монтировании.'
      ]
    },
    {
      id: 'react-useeffect-2',
      subtopic: 'Lifecycles в функциональных',
      level: 'Middle',
      q: 'Какие возможности применения useEffect как аналога lifecycle-методов?',
      a: 'componentDidMount → useEffect(fn, []). componentDidUpdate → useEffect(fn, [deps]). componentWillUnmount → useEffect(() => cleanup, []). Можно комбинировать: подписка в mount + отписка в unmount.',
      explain: 'Один useEffect может заменить несколько lifecycle-методов. Важно правильно указать зависимости, чтобы не было лишних вызовов.\n\n```js\nuseEffect(() => {\n  const sub = subscribe();\n  return () => sub.unsubscribe();\n}, []);\n```\n\nТипичная ошибка — забыть cleanup и получить утечку.',
      wrong: [
        'useEffect не может заменить lifecycle-методы.',
        'Только componentDidMount.',
        'Только componentWillUnmount.'
      ]
    },
    {
      id: 'react-useeffect-3',
      subtopic: 'Lifecycles в функциональных',
      level: 'Middle',
      q: 'Почему нужно передавать все используемые переменные в массив зависимостей?',
      a: 'Иначе эффект «застрянет» на старых значениях (устаревшее замыкание) и не будет реагировать на изменения. ESLint-правило exhaustive-deps помогает это отслеживать.',
      explain: 'Замыкание захватывает значение на момент создания эффекта. Если переменная не в зависимостях, эффект её не увидит.\n\n```js\nuseEffect(() => { console.log(count); }, [count]); // без count — старое значение\n```\n\nТипичная ошибка — отключать exhaustive-deps и получать баги.',
      wrong: [
        'Это необязательно — React сам отслеживает зависимости.',
        'Чтобы избежать ошибок типизации.',
        'Только для оптимизации.'
      ]
    },
    {
      id: 'react-useeffect-4',
      subtopic: 'Lifecycles в функциональных',
      level: 'Middle+',
      q: 'Как писать асинхронный код внутри useEffect?',
      a: 'Обернуть в async-функцию внутри: useEffect(() => { let cancelled = false; (async () => { const data = await fetch(...); if (!cancelled) setData(data); })(); return () => { cancelled = true; }; }, []);',
      explain: 'useEffect не принимает async-функцию напрямую. Флаг cancelled защищает от setState после размонтирования.\n\n```js\nuseEffect(() => {\n  let cancelled = false;\n  (async () => {\n    const res = await fetch(url);\n    if (!cancelled) setData(await res.json());\n  })();\n  return () => { cancelled = true; };\n}, [url]);\n```\n\nТипичная ошибка — useEffect(async () => {...}).',
      wrong: [
        'useEffect(async () => {...}) — напрямую.',
        'Через await на верхнем уровне useEffect.',
        'Асинхронный код в useEffect запрещён.'
      ]
    },
    {
      id: 'react-useeffect-5',
      subtopic: 'Lifecycles в функциональных',
      level: 'Middle+',
      q: 'Чем useLayoutEffect отличается от useEffect и когда нужен?',
      a: 'useLayoutEffect вызывается синхронно после мутаций DOM, но до отрисовки в браузере. Нужен для измерений DOM (размеры, позиции) и синхронных мутаций без визуальных миганий.',
      explain: 'useLayoutEffect блокирует отрисовку, поэтому его используют осторожно. Для большинства эффектов достаточно useEffect.\n\n```js\nuseLayoutEffect(() => { const h = ref.current.offsetHeight; setHeight(h); }, []);\n```\n\nТипичная ошибка — использовать useLayoutEffect для запросов к API.',
      wrong: [
        'useLayoutEffect — асинхронный, useEffect — синхронный.',
        'Это одно и то же.',
        'useLayoutEffect работает только при монтировании.'
      ]
    },
    {
      id: 'react-useeffect-6',
      subtopic: 'Lifecycles в функциональных',
      level: 'Senior',
      q: 'Что будет, если useEffect без массива зависимостей делает setState?',
      a: 'Бесконечный цикл ререндеров: эффект → setState → ререндер → эффект → ...',
      explain: 'Эффект без зависимостей выполняется после каждого рендера. setState вызывает новый рендер, который снова запускает эффект.\n\n```js\nuseEffect(() => { setCount(c => c + 1); }); // бесконечный цикл\n```\n\nТипичная ошибка — забыть массив зависимостей.',
      wrong: [
        'React выдаст ошибку.',
        'Эффект выполнится один раз.',
        'setState проигнорируется.'
      ]
    },
    // ================= ОПТИМИЗАЦИЯ =================
    {
      id: 'react-opt-1',
      subtopic: 'Оптимизация React-приложений',
      level: 'Middle',
      q: 'Как работают useMemo и useCallback? В чём отличия?',
      a: 'useMemo мемоизирует вычисленное значение (результат функции). useCallback мемоизирует саму функцию. Оба возвращают кэшированное значение, пока зависимости не изменятся.',
      explain: 'useMemo возвращает результат вызова, useCallback — саму функцию. Это синтаксический сахар: useCallback(fn, deps) эквивалентен useMemo(() => fn, deps).\n\n```js\nconst value = useMemo(() => compute(a, b), [a, b]);\nconst handler = useCallback(() => doSomething(id), [id]);\n```\n\nТипичная ошибка — путать, что что мемоизирует.',
      wrong: [
        'useMemo — для функций, useCallback — для значений.',
        'Это одно и то же.',
        'Оба мемоизируют компоненты.'
      ]
    },
    {
      id: 'react-opt-2',
      subtopic: 'Оптимизация React-приложений',
      level: 'Middle',
      q: 'В каком случае использовать useMemo?',
      a: 'Для тяжёлых вычислений, которые не должны пересчитываться при каждом рендере. Или для сохранения ссылочной идентичности объектов, передаваемых в зависимости.',
      explain: 'Мемоизация объектов важна, когда они попадают в зависимости useEffect или в props мемоизированных компонентов.\n\n```js\nconst sorted = useMemo(() => items.slice().sort(), [items]);\n```\n\nТипичная ошибка — оборачивать в useMemo всё подряд.',
      wrong: [
        'Для всех вычислений без исключения.',
        'Только для работы с массивами.',
        'Для запросов к API.'
      ]
    },
    {
      id: 'react-opt-3',
      subtopic: 'Оптимизация React-приложений',
      level: 'Middle',
      q: 'В каком случае использовать useCallback?',
      a: 'Когда функция передаётся в дочерний компонент, обёрнутый в React.memo, или в массив зависимостей другого хука. Без этого ссылка меняется при каждом рендере.',
      explain: 'useCallback сохраняет ссылку на функцию между рендерами. Это важно для React.memo и для эффектов, зависящих от функции.\n\n```js\nconst handleClick = useCallback(() => setCount(c => c + 1), []);\n```\n\nТипичная ошибка — оборачивать все функции без необходимости.',
      wrong: [
        'Для всех функций в компоненте.',
        'Для функций, работающих с DOM.',
        'Только для обработчиков событий.'
      ]
    },
    {
      id: 'react-opt-4',
      subtopic: 'Оптимизация React-приложений',
      level: 'Middle+',
      q: 'Что такое React.memo и когда его использовать?',
      a: 'HOC, мемоизирующий компонент: ререндер происходит только при изменении props (shallow compare). Полезен для «тяжёлых» компонентов, которые часто получают одинаковые props.',
      explain: 'React.memo сравнивает props поверхностно. Для объектов и функций нужны useMemo/useCallback, иначе сравнение не сработает.\n\n```js\nconst Row = React.memo(function Row({ item }) { return <li>{item.name}</li>; });\n```\n\nТипичная ошибка — оборачивать всё в memo без профилирования.',
      wrong: [
        'Аналог useMemo для компонентов без props.',
        'Обязательная обёртка для всех компонентов.',
        'Способ кэширования API-запросов.'
      ]
    },
    {
      id: 'react-opt-5',
      subtopic: 'Оптимизация React-приложений',
      level: 'Middle+',
      q: 'Что такое продакшн-сборка и чем она отличается от dev?',
      a: 'Продакшн-сборка минифицирована, без отладочной информации, с оптимизациями (tree-shaking, dead code elimination). Dev-сборка включает предупреждения и React DevTools.',
      explain: 'В продакшене React работает быстрее за счёт отключения проверок и предупреждений. Dev-сборка нужна для отладки.\n\n```js\n// process.env.NODE_ENV === "production"\n```\n\nТипичная ошибка — деплоить dev-сборку.',
      wrong: [
        'Продакшн-сборка работает в отдельном потоке.',
        'Отличий нет, кроме размера.',
        'Продакшн-сборка отключает хуки.'
      ]
    },
    {
      id: 'react-opt-6',
      subtopic: 'Оптимизация React-приложений',
      level: 'Senior',
      q: 'Когда useMemo/useCallback могут навредить?',
      a: 'Когда применяются бездумно ко всему: расход памяти на кэш, сложность кода, накладные расходы на сравнение зависимостей превышают выгоду. Мемоизация оправдана только для дорогих вычислений.',
      explain: 'Мемоизация не бесплатна: нужно хранить зависимости и сравнивать их. Для простых вычислений это медленнее, чем пересчёт.\n\n```js\nuseMemo(() => a + b, [a, b]); // скорее всего, лишнее\n```\n\nТипичная ошибка — оборачивать всё подряд.',
      wrong: [
        'Они никогда не вредят.',
        'Они вредят только в классовых компонентах.',
        'Они вредят только при работе с массивами.'
      ]
    },
    {
      id: 'react-opt-7',
      subtopic: 'Оптимизация React-приложений',
      level: 'Senior',
      q: 'Что такое code splitting и как его делать в React?',
      a: 'Разбиение бандла на части, загружаемые по требованию. В React — через React.lazy + Suspense, динамический import(), или React Router с lazy-загрузкой маршрутов.',
      explain: 'Code splitting уменьшает начальный бандл. Маршруты — самый частый кандидат на ленивую загрузку.\n\n```js\nconst About = React.lazy(() => import("./About"));\n<Suspense fallback={<Spinner />}><About /></Suspense>\n```\n\nТипичная ошибка — лениво грузить компонент без Suspense.',
      wrong: [
        'Разделение кода на модули при сборке.',
        'Разбиение компонентов на файлы.',
        'Разделение CSS и JS.'
      ]
    },

    // ================= OTHER HOOKS =================
    {
      id: 'react-hooks-1',
      subtopic: 'Other hooks',
      level: 'Junior+',
      q: 'Для чего нужен useRef?',
      a: 'Для создания ссылок на DOM-элементы или хранения значений, которые React не контролирует (не триггерят ререндер): таймеры, предыдущие значения, флаги.',
      explain: 'useRef возвращает объект { current }, который живёт между рендерами. Изменение current не вызывает ререндер.\n\n```js\nconst inputRef = useRef(null);\n<input ref={inputRef} />\n```\n\nТипичная ошибка — ждать ререндер после ref.current = value.',
      wrong: [
        'Для создания состояния.',
        'Для выполнения эффектов.',
        'Для мемоизации значений.'
      ]
    },
    {
      id: 'react-hooks-2',
      subtopic: 'Other hooks',
      level: 'Middle',
      q: 'Для чего нужен useReducer?',
      a: 'Для управления сложным состоянием с несколькими вариантами обновления. Принимает редьюсер и initialState, возвращает [state, dispatch]. Альтернатива useState.',
      explain: 'useReducer удобен, когда следующее состояние зависит от предыдущего и от action. Логика выносится в чистую функцию.\n\n```js\nconst [state, dispatch] = useReducer(reducer, { count: 0 });\ndispatch({ type: "increment" });\n```\n\nТипичная ошибка — использовать useReducer для простого счётчика.',
      wrong: [
        'Для выполнения редукции массива.',
        'Для оптимизации рендера.',
        'Для работы с формами.'
      ]
    },
    {
      id: 'react-hooks-3',
      subtopic: 'Other hooks',
      level: 'Middle+',
      q: 'В каких ситуациях использовать useReducer вместо useState?',
      a: 'Когда логика обновления сложная (несколько связанных значений), когда следующее состояние зависит от предыдущего, когда нужна предсказуемость (Redux-подобный подход).',
      explain: 'useReducer упрощает тестирование: редьюсер — чистая функция. Также удобен для форм с множеством полей.\n\n```js\nfunction reducer(state, action) {\n  switch (action.type) {\n    case "inc": return { count: state.count + 1 };\n    default: return state;\n  }\n}\n```\n\nТипичная ошибка — тащить useReducer туда, где хватает useState.',
      wrong: [
        'Всегда — useReducer быстрее useState.',
        'Только когда state — объект.',
        'Только с TypeScript.'
      ]
    },
    {
      id: 'react-hooks-4',
      subtopic: 'Other hooks',
      level: 'Middle+',
      q: 'Что делать, если начальное значение useRef — кастомный класс через new Class?',
      a: 'useRef(new Class()) создаст новый объект при каждом рендере, но сохранит только первый. Для ленивой инициализации: const ref = useRef(null); if (ref.current === null) ref.current = new Class();',
      explain: 'new Class() вычисляется при каждом рендере, хотя результат игнорируется. Ленивая инициализация избегает лишних аллокаций.\n\n```js\nconst ref = useRef(null);\nif (ref.current === null) ref.current = new HeavyClass();\n```\n\nТипичная ошибка — useRef(new HeavyClass()) без ленивой инициализации.',
      wrong: [
        'useRef автоматически кэширует new Class().',
        'Нужно использовать useMemo.',
        'Через useState с функцией-инициализатором.'
      ]
    },
    {
      id: 'react-hooks-5',
      subtopic: 'New hooks (React 18)',
      level: 'Middle+',
      q: 'Когда нужно использовать useId? Как он работает?',
      a: 'Для генерации уникальных идентификаторов внутри компонентов (aria-атрибуты, label-input связи). Работает стабильно между сервером и клиентом (SSR-friendly).',
      explain: 'useId не предназначен для ключей в списках — только для accessibility-атрибутов. Он даёт одинаковый id на сервере и клиенте.\n\n```js\nconst id = useId();\n<label htmlFor={id}>Name</label>\n<input id={id} />\n```\n\nТипичная ошибка — использовать useId как key.',
      wrong: [
        'Для генерации ключей в списках.',
        'Для создания уникальных id в localStorage.',
        'Для кэширования данных.'
      ]
    },
    {
      id: 'react-hooks-6',
      subtopic: 'New hooks (React 18)',
      level: 'Senior',
      q: 'Что такое useSyncExternalStore и какую проблему решает?',
      a: 'Хук для подписки на внешние источники данных (Redux, Zustand, браузерные API). Решает проблему tearing — рассинхронизации UI при конкурентном рендере.',
      explain: 'Tearing возникает, когда внешний стор меняется между прерываниями рендера. useSyncExternalStore гарантирует консистентность.\n\n```js\nconst state = useSyncExternalStore(store.subscribe, store.getSnapshot);\n```\n\nТипичная ошибка — использовать его напрямую вместо библиотек.',
      wrong: [
        'Для синхронизации useState между компонентами.',
        'Для работы с localStorage.',
        'Устаревший аналог useEffect.'
      ]
    },
    {
      id: 'react-hooks-7',
      subtopic: 'New hooks (React 18)',
      level: 'Senior',
      q: 'Для чего нужен useTransition (startTransition)?',
      a: 'Помечает обновления состояния как несрочные, чтобы React мог прервать их ради более приоритетных обновлений (ввод пользователя). Улучшает отзывчивость UI.',
      explain: 'startTransition не ускоряет рендер, а меняет приоритет. Срочные обновления (input) остаются отзывчивыми.\n\n```js\nconst [isPending, startTransition] = useTransition();\nstartTransition(() => setQuery(value));\n```\n\nТипичная ошибка — оборачивать в transition всё.',
      wrong: [
        'Для анимаций переходов между страницами.',
        'Для управления временем в компоненте.',
        'Для отложенной загрузки данных.'
      ]
    },
    {
      id: 'react-hooks-8',
      subtopic: 'New hooks (React 18)',
      level: 'Senior',
      q: 'Приведи пример использования useTransition.',
      a: 'const [isPending, startTransition] = useTransition(); const handleSearch = (value) => { startTransition(() => setQuery(value)); }; Срочный ввод обновляет input, тяжёлая фильтрация — откладывается.',
      explain: 'isPending показывает, что переход в процессе. Можно показать спиннер, не блокируя ввод.\n\n```js\n<input onChange={e => {\n  setInput(e.target.value);\n  startTransition(() => setQuery(e.target.value));\n}} />\n```\n\nТипичная ошибка — передавать в startTransition асинхронный код.',
      wrong: [
        'const [isPending, startTransition] = useTransition(1000);',
        'Через setTimeout внутри useTransition.',
        'useTransition работает только с useEffect.'
      ]
    },
    {
      id: 'react-hooks-9',
      subtopic: 'New hooks (React 18)',
      level: 'Senior',
      q: 'В каких ситуациях нужен useDeferredValue?',
      a: 'Когда значение обновляется слишком часто и тормозит UI (например, поиск с фильтрацией). Возвращает отложенную версию значения, которую React обновляет в фоне.',
      explain: 'useDeferredValue не управляет состоянием, а откладывает его использование. Похож на useTransition, но без функции-обёртки.\n\n```js\nconst deferred = useDeferredValue(query);\n<List filter={deferred} />\n```\n\nТипичная ошибка — использовать его для всех значений.',
      wrong: [
        'Когда нужно отложить выполнение эффекта.',
        'Когда нужно кэшировать значение.',
        'Когда нужно синхронизировать state между компонентами.'
      ]
    },
    {
      id: 'react-hooks-10',
      subtopic: 'New hooks (React 18)',
      level: 'Senior',
      q: 'Какую проблему решает useInsertionEffect?',
      a: 'Позволяет вставлять стили (например, CSS-in-JS) до того, как React применит layout-эффекты. Гарантирует, что стили уже в DOM к моменту useLayoutEffect в других компонентах.',
      explain: 'Это низкоуровневый хук для библиотек CSS-in-JS. В прикладном коде几乎 не используется.\n\n```js\nuseInsertionEffect(() => {\n  const style = document.createElement("style");\n  style.textContent = css;\n  document.head.appendChild(style);\n}, [css]);\n```\n\nТипичная ошибка — использовать его вместо useEffect.',
      wrong: [
        'Вставляет HTML-элементы в DOM до рендера.',
        'Оптимизирует вставку новых компонентов.',
        'Устаревший аналог useEffect.'
      ]
    },

    // ================= ТЕСТИРОВАНИЕ =================
    {
      id: 'react-test-1',
      subtopic: 'Тестирование',
      level: 'Middle',
      q: 'Что такое describe и it в Jest?',
      a: 'describe — группировка тестов (обычно для одного модуля или компонента). it (или test) — конкретный тест-сценарий с проверками expect.',
      explain: 'describe можно вкладывать, создавая иерархию. it может быть асинхронным и возвращать промис.\n\n```js\ndescribe("Button", () => {\n  it("renders label", () => { expect(...).toBe(...); });\n});\n```\n\nТипичная ошибка — путать describe и it местами.',
      wrong: [
        'describe — проверка, it — группировка.',
        'describe — для асинхронных тестов.',
        'Это одно и то же.'
      ]
    },
    {
      id: 'react-test-2',
      subtopic: 'Тестирование',
      level: 'Middle',
      q: 'Как react-testing-library используется для тестирования компонента?',
      a: 'Через render(<Component />) — компонент рендерится в тестовый DOM. Затем через screen.getByText, getByRole и т.д. ищутся элементы, через fireEvent/userEvent эмулируются действия.',
      explain: 'RTL поощряет тестирование через поведение пользователя, а не внутренности компонента. Запросы по роли и тексту предпочтительнее testid.\n\n```js\nrender(<Button>Click</Button>);\nexpect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument();\n```\n\nТипичная ошибка — искать по классам или id.',
      wrong: [
        'Через shallow() из enzyme.',
        'Через mount() — RTL не поддерживает.',
        'RTL используется только для хуков.'
      ]
    },
    {
      id: 'react-test-3',
      subtopic: 'Тестирование',
      level: 'Middle',
      q: 'Как проверить, что функция была вызвана с аргументами и определённое количество раз?',
      a: 'Через jest.fn() для создания мока и expect(mockFn).toHaveBeenCalled(), toHaveBeenCalledWith(args), toHaveBeenCalledTimes(n), toHaveReturnedWith(value).',
      explain: 'jest.fn() создаёт мок-функцию с историей вызовов. Можно задать реализацию через mockImplementation.\n\n```js\nconst fn = jest.fn();\nfn("a");\nexpect(fn).toHaveBeenCalledWith("a");\nexpect(fn).toHaveBeenCalledTimes(1);\n```\n\nТипичная ошибка — забыть очистить мок между тестами.',
      wrong: [
        'Через console.log в функции.',
        'Через spy().',
        'Только через toHaveBeenCalled.'
      ]
    },
    {
      id: 'react-test-4',
      subtopic: 'Тестирование',
      level: 'Middle',
      q: 'Что такое snapshot-тестирование?',
      a: 'Сохранение снимка отрендеренного компонента и сравнение с ним при последующих запусках. Помогает отследить неожиданные изменения UI.',
      explain: 'Снапшоты хранятся в __snapshots__. При намеренном изменении UI снапшот обновляют флагом -u.\n\n```js\nit("matches snapshot", () => {\n  const { asFragment } = render(<Button />);\n  expect(asFragment()).toMatchSnapshot();\n});\n```\n\nТипичная ошибка — слепо обновлять снапшоты, не проверяя diff.',
      wrong: [
        'Скриншот компонента в браузере.',
        'Сохранение состояния в localStorage.',
        'Проверка производительности.'
      ]
    },
    {
      id: 'react-test-5',
      subtopic: 'Тестирование',
      level: 'Middle',
      q: 'Где располагаются файлы тестов?',
      a: 'Чаще всего рядом с компонентом: Button.test.js или в папке __tests__/. Jest по умолчанию ищет файлы с .test.js или .spec.js.',
      explain: 'Расположение рядом с компонентом упрощает навигацию. Jest также подхватывает файлы в __tests__.\n\n```\nsrc/\n  Button.js\n  Button.test.js\n```\n\nТипичная ошибка — класть тесты в произвольные файлы без нужного суффикса.',
      wrong: [
        'Только в папке tests в корне проекта.',
        'Только в папке __tests__.',
        'В любом месте — Jest ищет все файлы.'
      ]
    },
    {
      id: 'react-test-6',
      subtopic: 'Тестирование',
      level: 'Middle+',
      q: 'Как тестировать данные, которые меняются со временем (например, дата)?',
      a: 'Через мокирование: jest.useFakeTimers() + jest.setSystemTime(new Date("2025-01-01")), или мок Date через jest.spyOn(global, "Date").',
      explain: 'Фейковые таймеры позволяют управлять Date.now и setTimeout. Это делает тесты детерминированными.\n\n```js\njest.useFakeTimers().setSystemTime(new Date("2025-01-01"));\nexpect(getToday()).toBe("2025-01-01");\n```\n\nТипичная ошибка — реальное ожидание времени в тестах.',
      wrong: [
        'Тестировать нельзя — только вручную проверять.',
        'Через await new Promise(r => setTimeout(r, 1000)).',
        'Через реальное ожидание времени.'
      ]
    },
    {
      id: 'react-test-7',
      subtopic: 'Тестирование',
      level: 'Middle+',
      q: 'Что такое jest.mock и как им пользоваться?',
      a: 'Заменяет реальный модуль или функцию фиктивной реализацией. jest.mock("./api") заменяет весь модуль. Глобальный мок — в setup-файле Jest.',
      explain: 'jest.mock поднимается в начало файла (hoisting). Для частичного мока используют jest.requireActual.\n\n```js\njest.mock("./api");\nimport { fetchUser } from "./api";\nfetchUser.mockResolvedValue({ name: "Ann" });\n```\n\nТипичная ошибка — забыть, что мок применяется ко всему файлу.',
      wrong: [
        'jest.mock только логирует вызовы.',
        'jest.mock работает только с функциями.',
        'jest.mock применяется только в продакшене.'
      ]
    },
    {
      id: 'react-test-8',
      subtopic: 'Тестирование',
      level: 'Middle+',
      q: 'Как тестировать асинхронные функции?',
      a: 'Через async/await в тестах, await waitFor(() => expect(...)), findBy* запросы в RTL. Jest дождётся промисов.',
      explain: 'findBy* возвращает промис и ждёт появления элемента. waitFor повторяет проверку до таймаута.\n\n```js\nit("loads data", async () => {\n  render(<User id={1} />);\n  expect(await screen.findByText("Ann")).toBeInTheDocument();\n});\n```\n\nТипичная ошибка — забыть await и получить ложный проход.',
      wrong: [
        'Только через setTimeout.',
        'Асинхронные функции тестировать нельзя.',
        'Только через done() callback.'
      ]
    },
    {
      id: 'react-test-9',
      subtopic: 'Тестирование',
      level: 'Middle+',
      q: 'Как посмотреть coverage тестов?',
      a: 'Через jest --coverage. Jest генерирует отчёт в папке coverage/, показывает % покрытия строк, ветвей, функций.',
      explain: 'Coverage помогает найти непротестированные ветки, но 100% не гарантирует качество. Настраивается через collectCoverageFrom.\n\n```bash\nnpx jest --coverage\n```\n\nТипичная ошибка — гнаться за 100% покрытия в ущерб смыслу тестов.',
      wrong: [
        'Только через плагины IDE.',
        'Через npm run test --verbose.',
        'Coverage в Jest отсутствует.'
      ]
    },
    {
      id: 'react-test-10',
      subtopic: 'Тестирование',
      level: 'Senior',
      q: 'Что такое mockImplementation, mockImplementationOnce, jest.fn, jest.spyOn?',
      a: 'jest.fn — создаёт мок-функцию. mockImplementation — задаёт реализацию навсегда. mockImplementationOnce — на один вызов. jest.spyOn — оборачивает существующий метод, сохраняя оригинал.',
      explain: 'spyOn позволяет проверить вызов, не подменяя реализацию полностью. mockImplementationOnce удобен для разных ответов на последовательные вызовы.\n\n```js\nconst spy = jest.spyOn(api, "get");\nspy.mockImplementationOnce(() => Promise.resolve(1));\n```\n\nТипичная ошибка — забыть восстановить spy через mockRestore.',
      wrong: [
        'Все четыре — одно и то же.',
        'mockImplementation для async, остальные для sync.',
        'mockImplementationOnce работает только со стрелочными функциями.'
      ]
    },
    {
      id: 'react-test-11',
      subtopic: 'Тестирование',
      level: 'Senior',
      q: 'Почему надо чистить моки между тестами?',
      a: 'Иначе состояние мока (вызовы, реализация) перетекает из теста в тест, приводя к ложным результатам. Через beforeEach(() => jest.clearAllMocks()) или clearMocks: true в конфиге.',
      explain: 'clearAllMocks сбрасывает вызовы, resetAllMocks — ещё и реализации. restoreAllMocks возвращает оригиналы после spyOn.\n\n```js\nbeforeEach(() => { jest.clearAllMocks(); });\n```\n\nТипичная ошибка — полагаться на порядок тестов.',
      wrong: [
        'Чистка замедляет тесты.',
        'Jest чистит моки автоматически.',
        'Чистка нужна только для snapshot-тестов.'
      ]
    },
    {
      id: 'react-test-12',
      subtopic: 'Тестирование',
      level: 'Senior',
      q: 'Для чего нужен атрибут data-testid?',
      a: 'Для поиска элементов в тестах, когда нет подходящей роли или текста. Используется через screen.getByTestId("submit-button").',
      explain: 'RTL рекомендует роли и текст, но для динамических или неочевидных элементов testid — запасной вариант. Он не влияет на поведение.\n\n```jsx\n<button data-testid="submit">Send</button>\n```\n\nТипичная ошибка — использовать testid везде вместо доступных запросов.',
      wrong: [
        'Для стилизации элементов.',
        'Для SEO.',
        'Для передачи данных в компонент.'
      ]
    },
    {
      id: 'react-test-13',
      subtopic: 'Тестирование',
      level: 'Senior',
      q: 'Как эмулировать действие пользователя?',
      a: 'Через fireEvent.click(element) (простой вариант) или userEvent.click(element) (более реалистичный, асинхронный, эмулирует hover, focus, ввод посимвольно).',
      explain: 'userEvent ближе к реальному поведению, но требует await. fireEvent синхронный и проще.\n\n```js\nawait userEvent.type(input, "hello");\nfireEvent.click(button);\n```\n\nТипичная ошибка — забыть await для userEvent.',
      wrong: [
        'Только через element.click().',
        'Через dispatchEvent вручную.',
        'Эмуляция действий в RTL не поддерживается.'
      ]
    },
    {
      id: 'react-test-14',
      subtopic: 'Тестирование',
      level: 'Senior',
      q: 'Как эмулировать update и изменение props?',
      a: 'Через rerender(<Component prop="new" />) — RTL повторно рендерит с новыми props. Для обновления state — действия пользователя или await waitFor.',
      explain: 'rerender переиспользует контейнер и обновляет дерево. Это позволяет проверить реакцию на новые props.\n\n```js\nconst { rerender } = render(<User name="Ann" />);\nrerender(<User name="Bob" />);\n```\n\nТипичная ошибка — unmount и render заново вместо rerender.',
      wrong: [
        'Только через unmount + render заново.',
        'Через прямое изменение component.props.',
        'Обновление props в тестах невозможно.'
      ]
    },
    {
      id: 'react-test-15',
      subtopic: 'Тестирование',
      level: 'Senior',
      q: 'Как тестировать кастомный хук?',
      a: 'Через renderHook из @testing-library/react. Пример: const { result } = renderHook(() => useCounter()); act(() => result.current.increment());',
      explain: 'renderHook создаёт тестовый компонент-обёртку. act гарантирует применение обновлений.\n\n```js\nconst { result } = renderHook(() => useCounter());\nact(() => result.current.increment());\nexpect(result.current.count).toBe(1);\n```\n\nТипичная ошибка — вызывать хук вне renderHook.',
      wrong: [
        'Через render(() => useCounter()).',
        'Кастомные хуки нельзя тестировать.',
        'Только через интеграционный тест компонента.'
      ]
    },
    {
      id: 'react-test-16',
      subtopic: 'Тестирование',
      level: 'Senior',
      q: 'Что такое act и как его использовать?',
      a: 'Обёртка для обновлений состояния в тестах. Гарантирует, что React применит все эффекты и рендеры до проверок. RTL-методы уже обёрнуты в act, но для прямых вызовов setState нужен явный act.',
      explain: 'act синхронизирует тест с React-рендером. Без него можно получить предупреждение и ложные результаты.\n\n```js\nact(() => { result.current.increment(); });\n```\n\nТипичная ошибка — оборачивать в act всё подряд.',
      wrong: [
        'act — это commit фаза React.',
        'act используется для анимаций.',
        'act не нужен в React 18.'
      ]
    },
    {
      id: 'react-test-17',
      subtopic: 'Тестирование',
      level: 'Senior',
      q: 'Как тестировать компоненты, связанные с Redux?',
      a: 'Оборачивать компонент в <Provider store={mockStore}> с тестовым стором (redux-mock-store или configureStore). Для thunk — использовать jest.mock или реальный store с мок-API.',
      explain: 'Тестовый store создаётся с нужным состоянием. Компонент получает данные через useSelector.\n\n```js\nrender(<Provider store={store}><User /></Provider>);\n```\n\nТипичная ошибка — использовать продакшн-store в тестах.',
      wrong: [
        'Тестировать Redux-компоненты нельзя.',
        'Только через реальный store продакшена.',
        'Через прямое изменение state Redux.'
      ]
    },
    {
      id: 'react-test-18',
      subtopic: 'Testing — Storybook',
      level: 'Middle',
      q: 'Что такое Storybook и какие проблемы решает?',
      a: 'Инструмент для разработки и тестирования компонентов в изоляции. Визуальная документация, песочница для разных состояний, удобная коммуникация с дизайнерами.',
      explain: 'Storybook изолирует компонент от приложения, позволяя проверить все состояния. Истории можно использовать в визуальных тестах.\n\n```js\nexport default { component: Button };\nexport const Primary = { args: { variant: "primary" } };\n```\n\nТипичная ошибка — путать Storybook с юнит-тестами.',
      wrong: [
        'Инструмент для юнит-тестирования.',
        'Менеджер состояния.',
        'UI-библиотека компонентов.'
      ]
    },
    {
      id: 'react-test-19',
      subtopic: 'Testing — Storybook',
      level: 'Middle+',
      q: 'Как настроить выбор props в Storybook?',
      a: 'Через Controls (args): export default { component: Button, args: { label: "Click" } }. Storybook автоматически генерирует UI для изменения args в реальном времени.',
      explain: 'Controls строятся на основе args и propTypes/TypeScript-типов. Это позволяет менять props без пересборки.\n\n```js\nexport default {\n  component: Button,\n  argTypes: { variant: { control: "select", options: ["primary", "secondary"] } }\n};\n```\n\nТипичная ошибка — забыть указать argTypes для сложных props.',
      wrong: [
        'Только через отдельный файл с propTypes.',
        'Настроить нельзя — Storybook показывает только статичные истории.',
        'Через Redux.'
      ]
    },
    {
      id: 'react-test-20',
      subtopic: 'Testing — E2E',
      level: 'Senior',
      q: 'Как реализовать e2e-тестирование?',
      a: 'Через Playwright, Cypress, Selenium. Тест запускает реальный браузер, взаимодействует с приложением как пользователь: клики, ввод, проверка UI, работа с сетью.',
      explain: 'E2E проверяет приложение целиком, включая фронтенд и бэкенд. Playwright и Cypress дают auto-wait и удобную отладку.\n\n```js\nawait page.goto("/login");\nawait page.fill("#email", "a@b.c");\nawait page.click("button[type=submit]");\n```\n\nТипичная ошибка — писать E2E вместо юнит-тестов для простых случаев.',
      wrong: [
        'Только через Jest + RTL.',
        'E2E-тесты пишутся без браузера.',
        'Только через Selenium.'
      ]
    },

    // ================= LIBRARIES — ROUTER =================
    {
      id: 'react-router-1',
      subtopic: 'Libraries — Router',
      level: 'Junior',
      q: 'Как программно переключаться между страницами?',
      a: 'Через хук useNavigate: const navigate = useNavigate(); navigate("/about");',
      explain: 'useNavigate заменяет useHistory из v5. Он возвращает функцию для навигации.\n\n```js\nconst navigate = useNavigate();\n<button onClick={() => navigate("/about")}>About</button>\n```\n\nТипичная ошибка — использовать useHistory в React Router 6.',
      wrong: [
        'Через window.location.href.',
        'Через useHistory — устарел в React Router 6.',
        'Через this.props.history.push.'
      ]
    },
    {
      id: 'react-router-2',
      subtopic: 'Libraries — Router',
      level: 'Junior+',
      q: 'Как получить параметры из текущего роута?',
      a: 'Через useParams: const { id } = useParams(); — возвращает объект с параметрами из URL (например, /user/:id).',
      explain: 'useParams работает только внутри Route с динамическим сегментом. Параметры всегда строки.\n\n```js\n<Route path="/user/:id" element={<User />} />\nconst { id } = useParams();\n```\n\nТипичная ошибка — путать useParams и useSearchParams.',
      wrong: [
        'Через useLocation().params.',
        'Через this.props.match.params.',
        'Через useSearchParams.'
      ]
    },
    {
      id: 'react-router-3',
      subtopic: 'Libraries — Router',
      level: 'Junior+',
      q: 'Как программно перейти на другую страницу?',
      a: 'Через useNavigate: navigate("/path") или navigate("/path", { replace: true }).',
      explain: 'navigate — функция, возвращаемая хуком. Она работает и в обработчиках, и в эффектах.\n\n```js\nconst navigate = useNavigate();\nnavigate("/dashboard");\n```\n\nТипичная ошибка — вызывать navigate во время рендера.',
      wrong: [
        'Через <Link to="/path"> внутри обработчика.',
        'Через window.location.assign.',
        'Через useHistory().push — устарел.'
      ]
    },
    {
      id: 'react-router-4',
      subtopic: 'Libraries — Router',
      level: 'Middle',
      q: 'Как перейти на страницу без сохранения в истории?',
      a: 'Через navigate("/path", { replace: true }) — заменяет текущую запись в истории.',
      explain: 'replace: true полезен после логина, чтобы кнопка «назад» не возвращала на форму. Это аналог history.replaceState.\n\n```js\nnavigate("/home", { replace: true });\n```\n\nТипичная ошибка — использовать replace везде и терять историю.',
      wrong: [
        'Через navigate("/path", { push: false }).',
        'Через navigate("/path", { history: "skip" }).',
        'Это невозможно.'
      ]
    },
    {
      id: 'react-router-5',
      subtopic: 'Libraries — Router',
      level: 'Middle',
      q: 'Как очистить историю переходов?',
      a: 'Прямого метода нет. Можно использовать replace: true при навигации, чтобы не засорять историю. Полная очистка требует работы с history-стеком вручную или перезагрузки.',
      explain: 'React Router не даёт API для очистки истории. На практике используют replace или перезагрузку.\n\n```js\nnavigate("/", { replace: true });\n```\n\nТипичная ошибка — искать метод clearHistory.',
      wrong: [
        'Через navigate.reset().',
        'Через history.clear().',
        'Через useNavigate().clearHistory().'
      ]
    },
    {
      id: 'react-router-6',
      subtopic: 'Libraries — Router',
      level: 'Middle',
      q: 'Как программно вернуться на предыдущую страницу?',
      a: 'Через navigate(-1) — аналог кнопки «назад» в браузере.',
      explain: 'navigate принимает число: -1 назад, -2 на две страницы назад. Это работает с историей браузера.\n\n```js\nnavigate(-1);\n```\n\nТипичная ошибка — использовать window.history.back() вместе с React Router.',
      wrong: [
        'Через navigate("/back").',
        'Через history.back() — вне React Router.',
        'Через useNavigate().previous().'
      ]
    },
    {
      id: 'react-router-7',
      subtopic: 'Libraries — Router',
      level: 'Middle+',
      q: 'Какие вариации роутинга могут быть в React?',
      a: 'BrowserRouter (HTML5 History API), HashRouter (через #), MemoryRouter (для тестов и non-browser окружений). Плюс вложенные роуты, layout-роуты, lazy-роуты.',
      explain: 'BrowserRouter требует настройки сервера для SPA-fallback. HashRouter работает без сервера, но URL содержит #.\n\n```js\n<HashRouter><App /></HashRouter>\n```\n\nТипичная ошибка — использовать BrowserRouter без fallback на сервере.',
      wrong: [
        'Только BrowserRouter.',
        'Только HashRouter.',
        'Роутинг в React встроен в ядро.'
      ]
    },
    {
      id: 'react-router-8',
      subtopic: 'Libraries — Router',
      level: 'Senior',
      q: 'Что изменилось в React Router v6 по сравнению с v5?',
      a: 'Убрали useHistory, вместо него useNavigate. Switch заменён на Routes. Компонент Route использует element вместо component/render. Появились вложенные роуты через Outlet.',
      explain: 'v6 упрощает вложенный роутинг и делает его более декларативным. Outlet рендерит дочерний маршрут.\n\n```js\n<Routes>\n  <Route path="/" element={<Layout />}>\n    <Route index element={<Home />} />\n  </Route>\n</Routes>\n```\n\nТипичная ошибка — использовать component вместо element.',
      wrong: [
        'Ничего значимого не изменилось.',
        'Убрали BrowserRouter.',
        'Убрали вложенные роуты.'
      ]
    },

    // ================= LIBRARIES — FORMS =================
    {
      id: 'react-forms-1',
      subtopic: 'Libraries — Forms',
      level: 'Junior',
      q: 'Как можно работать с формами в React?',
      a: 'Через controlled-компоненты (значение в state, onChange обновляет state) или uncontrolled (значение в DOM, доступ через ref). Плюс библиотеки: React Hook Form, Formik.',
      explain: 'Controlled даёт полный контроль, но много кода. Uncontrolled проще, но сложнее валидировать. Библиотеки совмещают оба подхода.\n\n```js\n<input value={name} onChange={e => setName(e.target.value)} />\n```\n\nТипичная ошибка — смешивать controlled и uncontrolled в одном input.',
      wrong: [
        'Только через controlled.',
        'Только через uncontrolled.',
        'Только через библиотеки.'
      ]
    },
    {
      id: 'react-forms-2',
      subtopic: 'Libraries — Forms',
      level: 'Junior+',
      q: 'Какие есть библиотеки для работы с формами в React?',
      a: 'React Hook Form (самая популярная, лёгкая), Formik (классика), React Final Form. Для валидации — Yup, Zod, Joi.',
      explain: 'React Hook Form использует ref и минимизирует ререндеры. Formik хранит значения в state.\n\n```js\nconst { register, handleSubmit } = useForm();\n```\n\nТипичная ошибка — выбирать библиотеку без учёта размера и требований.',
      wrong: [
        'Только Formik.',
        'Только React Hook Form.',
        'Встроенных библиотек нет, только свои решения.'
      ]
    },
    {
      id: 'react-forms-3',
      subtopic: 'Libraries — Forms',
      level: 'Middle',
      q: 'Чем контролируемые компоненты отличаются от неконтролируемых?',
      a: 'Controlled: значение хранится в state React, каждое изменение через onChange + setState. Uncontrolled: значение хранится в DOM, чтение через ref. Controlled удобнее для валидации и динамики.',
      explain: 'Controlled требует больше кода, но даёт мгновенную валидацию и форматирование. Uncontrolled ближе к нативному HTML.\n\n```js\n<input ref={ref} defaultValue="Ann" /> // uncontrolled\n```\n\nТипичная ошибка — value без onChange в controlled.',
      wrong: [
        'Controlled — с валидацией, uncontrolled — без.',
        'Controlled работает только с input type=text.',
        'Отличий нет.'
      ]
    },
    {
      id: 'react-forms-4',
      subtopic: 'Libraries — Forms',
      level: 'Middle+',
      q: 'Почему появилось множество библиотек для работы с формами?',
      a: 'Нативные controlled-формы требуют много шаблонного кода (state + onChange для каждого поля), плохо масштабируются, перерендеривают всё при каждом нажатии. Библиотеки решают это через uncontrolled refs и оптимизации.',
      explain: 'В большой форме каждый ввод вызывает ререндер всего компонента. Библиотеки вроде RHF подписываются только на нужные поля.\n\n```js\nconst { register } = useForm();\n<input {...register("email")} />\n```\n\nТипичная ошибка — писать свою мини-библиотеку вместо готовой.',
      wrong: [
        'React не поддерживает формы из коробки.',
        'Из-за отсутствия HTML-валидации.',
        'Из-за проблем с TypeScript.'
      ]
    },
    {
      id: 'react-forms-5',
      subtopic: 'Libraries — Forms',
      level: 'Senior',
      q: 'В чём ключевое преимущество React Hook Form?',
      a: 'Использует uncontrolled inputs (ref) и минимизирует ререндеры. Меньше boilerplate, высокая производительность, встроенная валидация, хорошая работа с TypeScript.',
      explain: 'RHF не хранит значения в state, а читает их из DOM по ref. Ререндер происходит только при ошибках или submit.\n\n```js\nconst { register, handleSubmit, formState: { errors } } = useForm();\n```\n\nТипичная ошибка — использовать RHF с controlled-компонентами без Controller.',
      wrong: [
        'Использует controlled inputs и Redux.',
        'Автоматически отправляет формы на сервер.',
        'Работает только с TypeScript.'
      ]
    }
  ]
});