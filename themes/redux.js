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
        wrong: [
          'Undo реализуется через встроенный history в Redux.',
          'Undo реализуется через localStorage.',
          'Undo в Redux невозможен.'
        ]
      }]})