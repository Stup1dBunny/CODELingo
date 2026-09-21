window.registerTheme({
  theme: 'Redux',
  id: 4,
  questions: [
    // ================= REDUX — ОБЩЕЕ =================
    {
      id: 'redux-general-1',
      subtopic: 'Redux — общее',
      level: 'Junior-',
      q: 'Что такое Redux?',
      a: 'Библиотека управления состоянием для JavaScript-приложений. Хранит всё состояние в одном объекте store, изменения происходят предсказуемо через actions и reducers.',
      explain: 'Redux не привязан к React — это самостоятельная библиотека. С React её связывает react-redux (Provider, useSelector, useDispatch).\n\n```js\nconst store = createStore(reducer);\nstore.dispatch({ type: "increment" });\n```\n\nТипичная ошибка — считать Redux частью React.',
      wrong: [
        'Фреймворк для построения UI.',
        'Библиотека для работы с API.',
        'Менеджер пакетов.'
      ]
    },
    {
      id: 'redux-general-2',
      subtopic: 'Redux — общее',
      level: 'Junior',
      q: 'Назови три основных принципа Redux.',
      a: '1) Единый источник правды — всё состояние в одном store. 2) Состояние только для чтения — изменить можно только через dispatch(action). 3) Изменения через чистые функции — reducers.',
      explain: 'Эти принципы обеспечивают предсказуемость и time-travel debugging. Любое изменение проходит через один путь.\n\n```js\nstore.dispatch({ type: "todos/add", payload: "Buy milk" });\n```\n\nТипичная ошибка — мутировать state напрямую в компоненте.',
      wrong: [
        'Один store, много reducers, нет actions.',
        'Много stores, прямой мутации, асинхронные reducers.',
        'Только единый store — остальных принципов нет.'
      ]
    },
    {
      id: 'redux-general-3',
      subtopic: 'Redux — общее',
      level: 'Junior',
      q: 'Что такое Single source of truth в Redux?',
      a: 'Всё состояние приложения хранится в одном объекте — store. Это упрощает отладку, тестирование и сериализацию состояния.',
      explain: 'Единый store позволяет сохранять и восстанавливать состояние целиком. Это основа для SSR и персистентности.\n\n```js\nconst state = store.getState();\nlocalStorage.setItem("state", JSON.stringify(state));\n```\n\nТипичная ошибка — дублировать состояние в локальных стейтах компонентов.',
      wrong: [
        'Каждый компонент хранит своё состояние.',
        'Состояние хранится в localStorage.',
        'Состояние дублируется в каждом reducer.'
      ]
    },
    {
      id: 'redux-general-4',
      subtopic: 'Redux — общее',
      level: 'Junior',
      q: 'Что означает «state is read-only» в Redux?',
      a: 'Состояние нельзя изменить напрямую. Единственный способ — dispatch(action), который описывает, что произошло. Reducer создаёт новое состояние на основе старого.',
      explain: 'Иммутабельность позволяет сравнивать состояния по ссылке и делать time-travel. Мутация ломает подписки и DevTools.\n\n```js\n// плохо: state.todos.push(todo)\n// хорошо: return { ...state, todos: [...state.todos, todo] }\n```\n\nТипичная ошибка — push в массив state.',
      wrong: [
        'Состояние можно менять напрямую в компонентах.',
        'Состояние доступно только для чтения после инициализации.',
        'Состояние read-only только в dev-режиме.'
      ]
    },
    {
      id: 'redux-general-5',
      subtopic: 'Redux — общее',
      level: 'Junior+',
      q: 'Что такое action в Redux?',
      a: 'Обычный объект с полем type (обязательно) и payload (опционально). Описывает, что произошло. Создаётся через action creators — функции, возвращающие action.',
      explain: 'type — строка, обычно в формате "slice/event". payload может быть любого типа.\n\n```js\nconst addTodo = (text) => ({ type: "todos/add", payload: text });\n```\n\nТипичная ошибка — делать action классом или промисом.',
      wrong: [
        'Функция, изменяющая state.',
        'Промис, возвращающий данные.',
        'Класс с методами.'
      ]
    },
    {
      id: 'redux-general-6',
      subtopic: 'Redux — общее',
      level: 'Junior+',
      q: 'Что такое reducer в Redux?',
      a: 'Чистая функция (state, action) => newState. Принимает текущее состояние и action, возвращает новое состояние. Не мутирует исходное, не делает запросов, не имеет сайд-эффектов.',
      explain: 'Чистота reducer — залог предсказуемости. При неизвестном action нужно вернуть текущий state.\n\n```js\nfunction reducer(state = 0, action) {\n  if (action.type === "inc") return state + 1;\n  return state;\n}\n```\n\nТипичная ошибка — делать запросы или мутировать state в reducer.',
      wrong: [
        'Функция для запросов к API.',
        'Мутирующая функция, изменяющая state напрямую.',
        'Компонент высшего порядка.'
      ]
    },
    {
      id: 'redux-general-7',
      subtopic: 'Redux — общее',
      level: 'Junior+',
      q: 'Что такое store в Redux?',
      a: 'Объект, хранящий всё состояние приложения. Предоставляет методы getState(), dispatch(action), subscribe(listener). Один store на приложение.',
      explain: 'store создаётся через createStore(reducer) или configureStore (RTK). В React доступ через Provider.\n\n```js\nconst store = createStore(rootReducer);\nstore.subscribe(() => console.log(store.getState()));\n```\n\nТипичная ошибка — создавать несколько store.',
      wrong: [
        'Компонент, отображающий state.',
        'Массив actions.',
        'Reducer верхнего уровня.'
      ]
    },
    {
      id: 'redux-general-8',
      subtopic: 'Redux — общее',
      level: 'Junior+',
      q: 'Опиши основной flow работы с Redux.',
      a: 'Компонент вызывает dispatch(action) → store передаёт action в reducer → reducer возвращает новое state → store обновляется → подписанные компоненты перерисовываются.',
      explain: 'Поток однонаправленный: view → action → reducer → store → view. Это упрощает отладку.\n\n```js\ndispatch({ type: "inc" }); // → reducer → новый state → ререндер\n```\n\nТипичная ошибка — ожидать синхронного обновления props сразу после dispatch.',
      wrong: [
        'Компонент изменяет state напрямую → store уведомляет reducer.',
        'Reducer вызывает dispatch → store обновляется.',
        'Store напрямую изменяет компоненты.'
      ]
    },
    {
      id: 'redux-general-9',
      subtopic: 'Redux — общее',
      level: 'Middle',
      q: 'Как использовать Redux с помощью хуков?',
      a: 'useSelector(state => state.slice.value) — читает данные из store. useDispatch() — возвращает dispatch для отправки actions. Заменяют connect() из старого API.',
      explain: 'useSelector подписывается на store и ререндерит компонент при изменении выбранного значения. Сравнение по ссылке (Object.is).\n\n```js\nconst count = useSelector(s => s.counter.value);\nconst dispatch = useDispatch();\n```\n\nТипичная ошибка — возвращать из селектора новый объект каждый раз.',
      wrong: [
        'Только через connect().',
        'Только через this.props.',
        'Хуки Redux не поддерживает.'
      ]
    },
    {
      id: 'redux-general-10',
      subtopic: 'Redux — общее',
      level: 'Middle',
      q: 'Как разбить Redux store на отдельные feature reducers?',
      a: 'Через combineReducers({ users: usersReducer, posts: postsReducer }). Каждый reducer отвечает за свой срез состояния, итоговый store — объект с этими ключами.',
      explain: 'Каждый reducer получает только свой срез state. При dispatch все reducers вызываются, но обрабатывают только свои actions.\n\n```js\nconst root = combineReducers({ users, posts });\n```\n\nТипичная ошибка — забыть, что state в reducer — только его срез.',
      wrong: [
        'Один reducer на всё приложение.',
        'Каждый reducer создаёт свой store.',
        'Разбить store нельзя.'
      ]
    },
    {
      id: 'redux-general-11',
      subtopic: 'Redux — общее',
      level: 'Middle',
      q: 'Что такое Flux-архитектура?',
      a: 'Паттерн однонаправленного потока данных: Action → Dispatcher → Store → View → Action. Redux — упрощённая реализация идей Flux.',
      explain: 'В Flux может быть несколько stores и центральный dispatcher. Redux свёл всё к одному store и убрал dispatcher как отдельную сущность.\n\n```js\n// Flux: dispatcher.dispatch(action)\n// Redux: store.dispatch(action)\n```\n\nТипичная ошибка — считать Redux и Flux одним и тем же.',
      wrong: [
        'Двунаправленный поток данных.',
        'Паттерн MVC.',
        'Способ работы с API.'
      ]
    },
    {
      id: 'redux-general-12',
      subtopic: 'Redux — общее',
      level: 'Middle+',
      q: 'Работа со store за пределами компонента — как?',
      a: 'Импортировать store и вызывать store.getState(), store.dispatch(action), store.subscribe(listener). Используется в утилитах, middleware, тестах.',
      explain: 'Прямой доступ к store удобен в не-React коде (api-клиенты, аналитика). Но в компонентах предпочтительны хуки.\n\n```js\nimport { store } from "./store";\nstore.dispatch({ type: "logout" });\n```\n\nТипичная ошибка — импортировать store в компонент вместо хуков.',
      wrong: [
        'За пределами компонента store недоступен.',
        'Только через хуки.',
        'Только через connect().'
      ]
    },
    {
      id: 'redux-general-13',
      subtopic: 'Redux — общее',
      level: 'Middle+',
      q: 'Использование Redux через connect(mapStateToProps, mapDispatchToProps) — все ли функции mapStateToProps вызываются при обновлении store?',
      a: 'Да, mapStateToProps вызывается при каждом обновлении store. Но connect использует shallow compare результата и перерисовывает компонент только если данные изменились.',
      explain: 'Это частая причина лишних вычислений: mapStateToProps дешёвый, но вызывается часто. Мемоизация через reselect решает проблему.\n\n```js\nconnect((state) => ({ count: state.counter.value }))(Component);\n```\n\nТипичная ошибка — делать тяжёлые вычисления в mapStateToProps.',
      wrong: [
        'Нет, только для изменённых срезов.',
        'mapStateToProps вызывается один раз.',
        'connect не использует mapStateToProps.'
      ]
    },
    {
      id: 'redux-general-14',
      subtopic: 'Redux — общее',
      level: 'Senior',
      q: 'Работа с middleware в Redux.',
      a: 'Middleware — функции между dispatch и reducer. Перехватывают actions, могут логировать, изменять, откладывать. Подключаются через applyMiddleware. Примеры: redux-thunk, redux-saga, redux-logger.',
      explain: 'Middleware выстраиваются в цепочку: каждый может вызвать next(action) или остановить цепочку. Так работает thunk: если action — функция, он её вызывает.\n\n```js\nconst store = createStore(reducer, applyMiddleware(thunk, logger));\n```\n\nТипичная ошибка — пытаться делать сайд-эффекты в reducer.',
      wrong: [
        'Middleware работает внутри reducers.',
        'Middleware применяется только к store.',
        'Middleware заменяет reducers.'
      ]
    },
    {
      id: 'redux-general-15',
      subtopic: 'Redux — общее',
      level: 'Senior',
      q: 'Как подключить Redux DevTools?',
      a: 'Через composeWithDevTools или в configureStore (RTK) — DevTools подключены по умолчанию. Позволяют просматривать actions, state, time-travel debugging.',
      explain: 'DevTools — расширение браузера + интеграция в store. В RTK достаточно установить расширение, ничего не настраивая.\n\n```js\nconst store = configureStore({ reducer }); // DevTools из коробки\n```\n\nТипичная ошибка — оставлять DevTools в проде без ограничений.',
      wrong: [
        'Через расширение браузера без изменений в коде.',
        'Только в продакшене.',
        'Redux DevTools не существует.'
      ]
    },
    {
      id: 'redux-general-16',
      subtopic: 'Redux — общее',
      level: 'Senior',
      q: 'Полностью ли Redux реализует архитектуру Flux?',
      a: 'Нет. В Flux несколько stores и центральный dispatcher. В Redux — один store, а dispatch — метод store. Redux упрощает Flux, убирая dispatcher как отдельную сущность.',
      explain: 'Redux вдохновлён Flux, но это не его реализация один-в-один. Ключевые отличия: один store, чистые reducers, отсутствие dispatcher.\n\n```js\n// Flux: несколько stores\n// Redux: один store\n```\n\nТипичная ошибка — говорить «Redux — это Flux».',
      wrong: [
        'Да, полностью.',
        'Redux — это Flux без изменений.',
        'Redux не связан с Flux.'
      ]
    },
    {
      id: 'redux-general-17',
      subtopic: 'Redux — общее',
      level: 'Senior',
      q: 'Основные принципы Flux.',
      a: 'Однонаправленный поток данных, центральный dispatcher, actions как единственный источник изменений, stores подписаны на dispatcher, views реагируют на изменения stores.',
      explain: 'Flux запрещает прямое изменение store из view. Всё идёт через dispatcher.\n\n```js\ndispatcher.dispatch({ type: "ADD" });\n```\n\nТипичная ошибка — путать Flux и MVC.',
      wrong: [
        'Двунаправленный поток данных.',
        'Прямое изменение store из views.',
        'Отсутствие dispatcher.'
      ]
    },
    {
      id: 'redux-general-18',
      subtopic: 'Redux — общее',
      level: 'Senior',
      q: 'Понимание архитектурных принципов, стоящих за Redux.',
      a: 'Иммутабельность, чистые функции, предсказуемость, time-travel debugging, единый источник правды. Основано на функциональном программировании и Flux.',
      explain: 'Иммутабельность и чистые функции — из ФП. Flux даёт однонаправленный поток. Вместе это делает состояние предсказуемым.\n\n```js\n// чистая функция + иммутабельность\nconst next = { ...state, count: state.count + 1 };\n```\n\nТипичная ошибка — привносить ООП-мутации в reducers.',
      wrong: [
        'Основано на ООП и наследовании.',
        'Основано на MVC.',
        'Основано на событийной модели DOM.'
      ]
    },

    // ================= REDUX TOOLKIT =================
    {
      id: 'redux-rtk-1',
      subtopic: 'Redux Toolkit',
      level: 'Junior+',
      q: 'В чём преимущества Redux Toolkit перед чистым Redux?',
      a: 'Меньше boilerplate, встроенный immer (мутации в reducers), удобная типизация, createSlice, RTK Query, лучшая структура для больших приложений.',
      explain: 'RTK — официальный рекомендованный способ писать Redux. В нём уже настроены thunk, DevTools и immer.\n\n```js\nconst store = configureStore({ reducer: { counter } });\n```\n\nТипичная ошибка — писать новый код на чистом Redux без причины.',
      wrong: [
        'RTK работает быстрее Redux.',
        'RTK отменяет actions и reducers.',
        'RTK — это просто обёртка без улучшений.'
      ]
    },
    {
      id: 'redux-rtk-2',
      subtopic: 'Redux Toolkit',
      level: 'Middle',
      q: 'Что такое createSlice?',
      a: 'Функция RTK, создающая slice — набор из initialState, reducers и автоматически сгенерированных action creators и action types. Один слайс = один срез состояния.',
      explain: 'createSlice избавляет от ручного написания action types и creators. Имена actions генерируются как name/reducerName.\n\n```js\nconst counter = createSlice({\n  name: "counter",\n  initialState: { value: 0 },\n  reducers: { inc: (s) => { s.value++; } }\n});\n```\n\nТипичная ошибка — писать actions вручную рядом со slice.',
      wrong: [
        'Функция для создания store.',
        'Функция для запросов к API.',
        'Устаревший аналог combineReducers.'
      ]
    },
    {
      id: 'redux-rtk-3',
      subtopic: 'Redux Toolkit',
      level: 'Middle',
      q: 'Что содержит slice?',
      a: 'name (имя слайса), initialState (начальное состояние), reducers (функции, изменяющие state). Возвращает объект с reducer, actions, caseReducers.',
      explain: 'reducer из slice подключается в configureStore. actions экспортируются и используются в dispatch.\n\n```js\nconst { reducer, actions } = counter;\nexport const { inc } = actions;\n```\n\nТипичная ошибка — забыть подключить reducer в store.',
      wrong: [
        'Только reducers.',
        'Только actions.',
        'Только initialState.'
      ]
    },
    {
      id: 'redux-rtk-4',
      subtopic: 'Redux Toolkit',
      level: 'Middle',
      q: 'Что такое createAction?',
      a: 'Утилита RTK для создания action creator. Пример: const increment = createAction("counter/increment"); increment(5) → { type: "counter/increment", payload: 5 }.',
      explain: 'createAction полезен вне slice — например, для общих actions или thunk. Он автоматически добавляет toString.\n\n```js\nconst increment = createAction("counter/increment");\n```\n\nТипичная ошибка — использовать createAction вместо reducers в slice.',
      wrong: [
        'Функция для создания reducer.',
        'Функция для создания store.',
        'Устаревший аналог dispatch.'
      ]
    },
    {
      id: 'redux-rtk-5',
      subtopic: 'Redux Toolkit',
      level: 'Middle+',
      q: 'Что такое createSelector?',
      a: 'Утилита из reselect для создания мемоизированных селекторов. Пересчитывает результат только при изменении входных данных. Оптимизирует доступ к state.',
      explain: 'Мемоизация важна, когда селектор создаёт новый объект или массив. Иначе useSelector будет ререндерить компонент каждый раз.\n\n```js\nconst selectIds = createSelector(\n  (s) => s.todos,\n  (todos) => todos.map(t => t.id)\n);\n```\n\nТипичная ошибка — возвращать новый объект из обычного селектора.',
      wrong: [
        'Функция для создания slice.',
        'Функция для создания store.',
        'Устаревший аналог useSelector.'
      ]
    },
    {
      id: 'redux-rtk-6',
      subtopic: 'Redux Toolkit',
      level: 'Middle+',
      q: 'Какие библиотеки объединяет Redux Toolkit?',
      a: 'immer (иммутабельные обновления через мутации), reselect (мемоизированные селекторы), redux-thunk (асинхронные actions), redux-devtools.',
      explain: 'RTK — это набор лучших практик и библиотек в одном пакете. Отдельно их подключать не нужно.\n\n```js\n// immer включён в createSlice\nreducers: { inc: (s) => { s.value++; } }\n```\n\nТипичная ошибка — подключать thunk вручную поверх RTK.',
      wrong: [
        'Только immer.',
        'Только reselect.',
        'Только redux-thunk.'
      ]
    },
    {
      id: 'redux-rtk-7',
      subtopic: 'Redux Toolkit',
      level: 'Senior',
      q: 'Что такое RTK Query?',
      a: 'Встроенное в RTK решение для запросов к API. Автоматически кэширует данные, инвалидирует, предоставляет хуки useQuery/useMutation. Альтернатива React Query.',
      explain: 'RTK Query генерирует хуки из описания эндпоинтов. Кэш и инвалидация настраиваются через теги.\n\n```js\nconst api = createApi({ baseQuery: fetchBaseQuery({ baseUrl: "/api" }), endpoints: (b) => ({ getUsers: b.query({ query: () => "users" }) }) });\n```\n\nТипичная ошибка — писать вручную thunk для каждого запроса.',
      wrong: [
        'Отдельный менеджер состояния.',
        'Библиотека для работы с GraphQL.',
        'Устаревший аналог axios.'
      ]
    },

    // ================= SIDE EFFECTS — THUNK =================
    {
      id: 'redux-se-1',
      subtopic: 'Side effects — общее',
      level: 'Middle',
      q: 'Для чего нужны менеджеры сайд-эффектов в Redux?',
      a: 'Reducers — чистые функции, не могут делать запросы, таймеры, работу с localStorage. Middleware вроде thunk/saga перехватывают actions и выполняют асинхронные операции.',
      explain: 'Сайд-эффекты выносятся из reducer в middleware. Так сохраняется чистота и предсказуемость.\n\n```js\n// reducer не делает запросов\n// thunk/saga делают\n```\n\nТипичная ошибка — fetch прямо в reducer.',
      wrong: [
        'Для ускорения рендера.',
        'Для оптимизации store.',
        'Для типизации.'
      ]
    },
    {
      id: 'redux-se-2',
      subtopic: 'Side effects — Thunk',
      level: 'Middle',
      q: 'Что такое Redux Thunk?',
      a: 'Middleware, позволяющий action creator возвращать функцию вместо объекта. Функция получает dispatch и getState, может выполнять асинхронные операции и диспатчить другие actions.',
      explain: 'Thunk — самый простой способ асинхронности в Redux. Он встроен в RTK по умолчанию.\n\n```js\nconst fetchUser = (id) => async (dispatch) => {\n  const user = await api.getUser(id);\n  dispatch(setUser(user));\n};\n```\n\nТипичная ошибка — забыть подключить thunk middleware в чистом Redux.',
      wrong: [
        'Reducer для асинхронных операций.',
        'Store для асинхронных actions.',
        'Устаревшая замена Redux.'
      ]
    },
    {
      id: 'redux-se-3',
      subtopic: 'Side effects — Thunk',
      level: 'Middle',
      q: 'Опиши основной flow работы с Redux Thunk.',
      a: 'Обычные action creators возвращают объекты. Thunk возвращает функцию (dispatch, getState) => {...}. Внутри можно делать запросы, затем dispatch(success/error).',
      explain: 'Thunk получает dispatch и getState как аргументы. Это позволяет читать state и диспатчить несколько actions.\n\n```js\nexport const load = () => async (dispatch, getState) => {\n  dispatch(loading());\n};\n```\n\nТипичная ошибка — возвращать промис вместо функции.',
      wrong: [
        'Thunk возвращает промис.',
        'Thunk возвращает массив actions.',
        'Thunk возвращает новый store.'
      ]
    },
    {
      id: 'redux-se-4',
      subtopic: 'Side effects — Thunk',
      level: 'Middle+',
      q: 'Приведи пример Thunk.',
      a: 'const fetchUser = (id) => async (dispatch) => { dispatch(loading()); try { const user = await api.getUser(id); dispatch(success(user)); } catch (e) { dispatch(error(e.message)); } };',
      explain: 'Паттерн loading/success/error — классика для thunk. Он даёт UI понятные состояния.\n\n```js\ndispatch(fetchUser(1));\n```\n\nТипичная ошибка — не обрабатывать ошибки в thunk.',
      wrong: [
        'const fetchUser = (id) => ({ type: "FETCH", id });',
        'const fetchUser = (id) => api.getUser(id);',
        'const fetchUser = (id) => ({ payload: api.getUser(id) });'
      ]
    },

    // ================= SIDE EFFECTS — SAGA =================
    {
      id: 'redux-se-5',
      subtopic: 'Side effects — Saga',
      level: 'Middle+',
      q: 'Что такое Redux Saga?',
      a: 'Middleware для управления сайд-эффектами через генераторы. Позволяет писать асинхронную логику как синхронный код, легко тестируется, поддерживает отмену, гонки, retry.',
      explain: 'Саги описывают эффекты декларативно. Это упрощает тестирование: не нужно мокать API, достаточно проверить yielded эффекты.\n\n```js\nfunction* fetchUser() {\n  const user = yield call(api.getUser);\n  yield put(setUser(user));\n}\n```\n\nТипичная ошибка — использовать saga для простых задач, где хватает thunk.',
      wrong: [
        'Альтернатива reducer.',
        'Библиотека для UI.',
        'Устаревший аналог Thunk.'
      ]
    },
    {
      id: 'redux-se-6',
      subtopic: 'Side effects — Saga',
      level: 'Senior',
      q: 'На чём строится Redux Saga?',
      a: 'На генераторах (function*). Саги слушают actions через takeEvery/takeLatest, выполняют side effects через call, put, select.',
      explain: 'Генераторы позволяют приостанавливать выполнение. Saga-рантайм управляет этими паузами и эффектами.\n\n```js\nfunction* watchFetch() {\n  yield takeLatest("user/fetch", fetchUser);\n}\n```\n\nТипичная ошибка — путать саги с async/await.',
      wrong: [
        'На промисах.',
        'На классах.',
        'На async/await.'
      ]
    },
    {
      id: 'redux-se-7',
      subtopic: 'Side effects — Saga',
      level: 'Senior',
      q: 'Опиши основной flow работы с Redux Saga.',
      a: 'Saga-функция слушает actions через watcher (takeEvery/takeLatest). При нужном action выполняется worker: call(api) → put(action success/error). Saga запускается при инициализации store.',
      explain: 'Watcher и worker разделены: watcher следит за actions, worker выполняет логику. Это упрощает композицию саг.\n\n```js\nfunction* watch() { yield takeEvery("fetch", worker); }\n```\n\nТипичная ошибка — запускать сагу вне sagaMiddleware.run().',
      wrong: [
        'Saga вызывается напрямую из reducer.',
        'Saga возвращает новый state.',
        'Saga заменяет dispatch.'
      ]
    },
    {
      id: 'redux-se-8',
      subtopic: 'Side effects — Saga',
      level: 'Senior',
      q: 'Каким образом обрабатывается action при делегировании запроса в Redux Saga?',
      a: 'Компонент dispatch(action) → saga перехватывает через takeEvery/takeLatest → выполняет worker (call API) → put(success/error action) → reducer обновляет state.',
      explain: 'Saga не меняет state напрямую — только диспатчит actions. Reducer остаётся единственным местом изменения state.\n\n```js\nyield put({ type: "user/success", payload: user });\n```\n\nТипичная ошибка — менять state внутри саги.',
      wrong: [
        'Action идёт напрямую в reducer, минуя saga.',
        'Saga изменяет state напрямую.',
        'Saga возвращает action в компонент.'
      ]
    },
    {
      id: 'redux-se-9',
      subtopic: 'Side effects — Saga',
      level: 'Senior',
      q: 'Минусы Redux Thunk по сравнению с Saga.',
      a: 'Thunk сложно тестировать (зависит от dispatch/getState). Нет встроенной отмены, retry, гонок. Саги декларативны, легко тестируются, поддерживают сложные сценарии.',
      explain: 'Thunk проще для мелких задач. Saga выигрывает, когда сценариев много: отмена, debounce, гонки.\n\n```js\n// Thunk: тест требует мок dispatch\nexpect(dispatch).toHaveBeenCalledWith(success(user));\n```\n\nТипичная ошибка — выбирать saga для простого CRUD.',
      wrong: [
        'Thunk медленнее Saga.',
        'Thunk требует TypeScript.',
        'Thunk не работает с async/await.'
      ]
    },
    {
      id: 'redux-se-10',
      subtopic: 'Side effects — Saga',
      level: 'Senior',
      q: 'Основные методы Redux Saga: take, call, put, select, fork, takeEvery, takeLatest.',
      a: 'take — ждёт action. call — вызывает функцию (обычно API). put — dispatch action. select — читает state. fork — запускает неблокирующую задачу. takeEvery — обрабатывает все actions. takeLatest — только последний (отменяет предыдущие).',
      explain: 'takeEvery и takeLatest — самые частые watcher-эффекты. takeLatest полезен для поиска: отменяет предыдущий запрос.\n\n```js\nyield takeLatest("search", searchWorker);\n```\n\nТипичная ошибка — путать takeEvery и takeLatest.',
      wrong: [
        'Все методы делают одно и то же.',
        'take — dispatch, put — ожидание.',
        'select — вызов API, call — чтение state.'
      ]
    },
    {
      id: 'redux-se-11',
      subtopic: 'Side effects — Saga',
      level: 'Senior',
      q: 'Эффекты в Redux Saga: throttle, delay, race, debounce.',
      a: 'throttle — пропускает не чаще раза в N мс. delay — пауза. race — гонка между эффектами (побеждает первый). debounce — ждёт паузу после последнего вызова.',
      explain: 'race удобен для Undo и таймаутов. throttle/debounce — для оптимизации частых actions.\n\n```js\nyield race({ data: call(api), timeout: delay(3000) });\n```\n\nТипичная ошибка — путать throttle и debounce.',
      wrong: [
        'Все эффекты — синонимы.',
        'throttle и debounce идентичны.',
        'race возвращает массив результатов.'
      ]
    },
    {
      id: 'redux-se-12',
      subtopic: 'Side effects — Saga',
      level: 'Senior',
      q: 'Что такое Undo-паттерн в Redux с Saga?',
      a: 'Отмена действия через race между самим action и action-отменой. Пример: пользователь удалил элемент, всплывает тост «Отменить» — если нажать, race отдаёт приоритет отмене.',
      explain: 'race позволяет дождаться одного из двух actions. Если победил cancel — восстанавливаем состояние.\n\n```js\nconst { cancel } = yield race({ done: delay(5000), cancel: take("undo") });\nif (cancel) yield put(restore());\n```\n\nТипичная ошибка — пытаться реализовать Undo через history в reducers.',
      wrong: [
        'Undo реализуется через встроенный history в Redux.',
        'Undo реализуется через localStorage.',
        'Undo в Redux невозможен.'
      ]
    }
  ]
});