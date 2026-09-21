window.registerTheme({
  theme: 'SQL',
  id: 5,
  questions: [
    // ================= ОБЩЕЕ =================
    {
      id: 'sql-general-1',
      subtopic: 'Общее',
      level: 'Junior-',
      q: 'Что такое SQL?',
      a: 'Structured Query Language — декларативный язык для работы с реляционными базами данных. Описывает, что нужно получить, а не как. Стандарт ANSI/ISO, но каждая СУБД имеет свои расширения.',
      explain: 'Декларативность означает, что вы описываете результат, а планировщик БД решает, как его получить. Стандарт есть, но диалекты различаются.\n\n```sql\nSELECT name FROM users WHERE age > 18;\n```\n\nВ отличие от императивного кода, здесь нет циклов и условий выполнения.',
      wrong: [
        'Императивный язык программирования общего назначения. Используется для написания серверной логики, а не для работы с данными.',
        'NoSQL-язык для работы с документными базами. Не имеет отношения к реляционным СУБД.',
        'Библиотека для работы с массивами и объектами в JavaScript.'
      ]
    },
    {
      id: 'sql-general-2',
      subtopic: 'Общее',
      level: 'Junior-',
      q: 'Что такое СУБД?',
      a: 'Система управления базами данных — программное обеспечение, которое хранит данные, обрабатывает запросы, управляет доступом и обеспечивает целостность. Примеры: PostgreSQL, MySQL, SQLite, MS SQL Server, Oracle.',
      explain: 'СУБД — это сервер (или встраиваемая библиотека, как SQLite), который управляет данными. База данных — набор объектов внутри СУБД.\n\n```sql\n-- PostgreSQL: одна СУБД, много баз и схем\n```\n\nТипичная ошибка — путать СУБД, базу данных и таблицу.',
      wrong: [
        'Файл с данными на диске. СУБД — это просто расширение файла .db.',
        'Язык запросов к базе данных. Синоним SQL.',
        'Библиотека для подключения к базе из кода.'
      ]
    },
    {
      id: 'sql-general-3',
      subtopic: 'Общее',
      level: 'Junior',
      q: 'Что такое реляционная модель данных?',
      a: 'Модель, где данные хранятся в таблицах (отношениях) со строками и столбцами. Таблицы связаны через ключи. Основана на теории множеств и реляционной алгебре.',
      explain: 'Отношение — математический термин для таблицы. Связи между таблицами выражаются через внешние ключи.\n\n```sql\n-- users и orders связаны через user_id\n```\n\nВ отличие от документной модели, здесь строгая схема.',
      wrong: [
        'Модель, где данные хранятся в виде документов JSON без строгой структуры.',
        'Модель, где данные хранятся в графах с узлами и рёбрами.',
        'Модель, где данные хранятся в виде ключ-значение без таблиц.'
      ]
    },
    {
      id: 'sql-general-4',
      subtopic: 'Общее',
      level: 'Junior',
      q: 'На какие группы делятся команды SQL?',
      a: 'DDL (CREATE, ALTER, DROP), DML (INSERT, UPDATE, DELETE), DQL (SELECT), DCL (GRANT, REVOKE), TCL (BEGIN, COMMIT, ROLLBACK).',
      explain: 'Группы отражают назначение команд: структура, данные, чтение, права, транзакции. Это помогает в вопросах на собеседовании.\n\n```sql\n-- DDL\nCREATE TABLE t (id INT);\n-- DML\nINSERT INTO t VALUES (1);\n```\n\nТипичная ошибка — относить SELECT к DML: он выделяется в DQL.',
      wrong: [
        'Только DDL и DML. Остальных групп не существует.',
        'Только SELECT и INSERT. Остальное — расширения конкретных СУБД.',
        'Только DDL, DML и DQL. Управление правами и транзакциями в SQL отсутствует.'
      ]
    },
    {
      id: 'sql-general-5',
      subtopic: 'Общее',
      level: 'Junior',
      q: 'Что такое первичный ключ (PRIMARY KEY)?',
      a: 'Столбец или набор столбцов, однозначно идентифицирующий строку. Не может быть NULL, значения уникальны. Таблица может иметь только один PRIMARY KEY.',
      explain: 'PRIMARY KEY автоматически создаёт уникальный индекс. Составной ключ задаётся по нескольким столбцам.\n\n```sql\nCREATE TABLE t (id SERIAL PRIMARY KEY);\n```\n\nТипичная ошибка — путать PRIMARY KEY и UNIQUE (второй допускает NULL).',
      wrong: [
        'Столбец, который может содержать NULL и повторяющиеся значения.',
        'Любой столбец с числовыми данными. Уникальность не требуется.',
        'Внешний ключ, ссылающийся на другую таблицу.'
      ]
    },
    {
      id: 'sql-general-6',
      subtopic: 'Общее',
      level: 'Junior+',
      q: 'Что такое внешний ключ (FOREIGN KEY)?',
      a: 'Столбец, ссылающийся на PRIMARY KEY другой таблицы. Обеспечивает ссылочную целостность: нельзя вставить значение, которого нет в родительской таблице.',
      explain: 'Внешний ключ может ссылаться на UNIQUE-столбец, не только на PRIMARY KEY. Действия при удалении задаются через ON DELETE.\n\n```sql\nFOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE\n```\n\nТипичная ошибка — забыть про ON DELETE и получить ошибку при удалении.',
      wrong: [
        'Столбец, уникально идентифицирующий строку в таблице.',
        'Столбец, который может содержать любые значения без ограничений.',
        'Индекс для ускорения поиска по таблице.'
      ]
    },
    {
      id: 'sql-general-7',
      subtopic: 'Общее',
      level: 'Junior+',
      q: 'Что такое схема (schema) в базе данных?',
      a: 'Пространство имён, группирующее таблицы, представления, функции. Позволяет разделять объекты по логическим группам и управлять правами. В PostgreSQL схема — обязательный элемент.',
      explain: 'По умолчанию используется схема public. Обращение к таблице — schema.table.\n\n```sql\nCREATE SCHEMA sales;\nCREATE TABLE sales.orders (id INT);\n```\n\nТипичная ошибка — путать схему со структурой таблицы.',
      wrong: [
        'Структура одной таблицы: список столбцов и их типов.',
        'Файл с дампом базы данных.',
        'Пользователь базы данных с определёнными правами.'
      ]
    },
    {
      id: 'sql-general-8',
      subtopic: 'Общее',
      level: 'Middle',
      q: 'Чем DDL отличается от DML?',
      a: 'DDL изменяет структуру (CREATE, ALTER, DROP) и обычно автоматически коммитится. DML изменяет данные (INSERT, UPDATE, DELETE) и может быть откатан в транзакции.',
      explain: 'В PostgreSQL DDL транзакционен, в MySQL — нет (до 8.0 в части случаев). Это важно при миграциях.\n\n```sql\nBEGIN;\nALTER TABLE t ADD COLUMN x INT;\nROLLBACK; -- в PostgreSQL сработает\n```\n\nТипичная ошибка — считать, что DDL всегда можно откатить.',
      wrong: [
        'DDL работает с данными, DML — со структурой.',
        'DDL и DML — синонимы, разницы нет.',
        'DDL работает только с индексами, DML — только с таблицами.'
      ]
    },
    {
      id: 'sql-general-9',
      subtopic: 'Общее',
      level: 'Middle',
      q: 'Что такое представление (VIEW)?',
      a: 'Сохранённый запрос, который выглядит как таблица. Не хранит данные (кроме materialized view), а вычисляет их при обращении. Упрощает сложные запросы и ограничивает доступ.',
      explain: 'VIEW — это именованный SELECT. Можно выдавать права на view, не открывая базовые таблицы.\n\n```sql\nCREATE VIEW active_users AS SELECT * FROM users WHERE active = true;\n```\n\nТипичная ошибка — ожидать, что view кэширует данные.',
      wrong: [
        'Физическая копия таблицы, хранящая данные на диске.',
        'Индекс для ускорения запросов.',
        'Триггер, срабатывающий при изменении данных.'
      ]
    },
    {
      id: 'sql-general-10',
      subtopic: 'Общее',
      level: 'Middle+',
      q: 'Что такое materialized view?',
      a: 'Представление, которое физически хранит результат запроса на диске. Требует обновления (REFRESH) при изменении данных. Ускоряет тяжёлые аналитические запросы.',
      explain: 'Materialized view может обновляться вручную или по расписанию. В PostgreSQL поддерживается CONCURRENTLY для обновления без блокировки.\n\n```sql\nREFRESH MATERIALIZED VIEW CONCURRENTLY mv;\n```\n\nТипичная ошибка — забыть обновить mv и получить устаревшие данные.',
      wrong: [
        'Обычное представление, которое не хранит данные.',
        'Индекс на представление.',
        'Временная таблица, удаляемая при закрытии сессии.'
      ]
    },

    // ================= ТИПЫ ДАННЫХ =================
    {
      id: 'sql-types-1',
      subtopic: 'Типы данных',
      level: 'Junior-',
      q: 'Какие основные типы данных есть в SQL?',
      a: 'Числовые (INT, BIGINT, DECIMAL, FLOAT), строковые (CHAR, VARCHAR, TEXT), дата/время (DATE, TIME, TIMESTAMP), логический (BOOLEAN), бинарные (BLOB), JSON, UUID, массивы (в PostgreSQL).',
      explain: 'Выбор типа влияет на размер, скорость и точность. Для денег — DECIMAL, для времени — TIMESTAMPTZ.\n\n```sql\nCREATE TABLE t (id UUID, price DECIMAL(10,2), tags TEXT[]);\n```\n\nТипичная ошибка — хранить деньги в FLOAT.',
      wrong: [
        'Только INT, VARCHAR и DATE. Остальные типы в SQL отсутствуют.',
        'Только строковые и числовые типы. Дата и boolean не поддерживаются.',
        'Только TEXT и BLOB. Числа хранятся как строки.'
      ]
    },
    {
      id: 'sql-types-2',
      subtopic: 'Типы данных',
      level: 'Junior-',
      q: 'Чем CHAR отличается от VARCHAR?',
      a: 'CHAR(n) — строка фиксированной длины, дополняется пробелами. VARCHAR(n) — строка переменной длины, хранит только реальные символы. VARCHAR экономичнее.',
      explain: 'VARCHAR без длины в PostgreSQL работает как TEXT. CHAR редко оправдан.\n\n```sql\ncode CHAR(2), name VARCHAR(100)\n```\n\nТипичная ошибка — использовать CHAR для имён и получать лишние пробелы.',
      wrong: [
        'CHAR — переменной длины, VARCHAR — фиксированной.',
        'CHAR хранит только числа, VARCHAR — только строки.',
        'Это синонимы, разницы нет.'
      ]
    },
    {
      id: 'sql-types-3',
      subtopic: 'Типы данных',
      level: 'Junior',
      q: 'Что такое NULL в SQL?',
      a: 'Отсутствие значения. NULL не равен нулю и не равен пустой строке. Любая операция с NULL возвращает NULL. Для проверки используется IS NULL / IS NOT NULL.',
      explain: 'NULL — это UNKNOWN в трёхзначной логике. WHERE NULL = NULL не вернёт строк. Используйте IS NULL.\n\n```sql\nSELECT * FROM users WHERE email IS NULL;\n```\n\nТипичная ошибка — сравнивать с NULL через =.',
      wrong: [
        'Нулевое значение. NULL = 0 возвращает true.',
        'Пустая строка. NULL = "" возвращает true.',
        'Специальный тип данных для хранения отсутствующих значений.'
      ]
    },
    {
      id: 'sql-types-4',
      subtopic: 'Типы данных',
      level: 'Junior+',
      q: 'Чем TIMESTAMP отличается от TIMESTAMP WITH TIME ZONE?',
      a: 'TIMESTAMP хранит дату и время без информации о зоне. TIMESTAMPTZ хранит момент времени в UTC и преобразует при выводе в зону сессии. Для мультизонных приложений — TIMESTAMPTZ.',
      explain: 'TIMESTAMPTZ не хранит зону, а хранит момент в UTC. При выводе применяется TimeZone сессии.\n\n```sql\nSELECT now()::timestamptz AT TIME ZONE "Europe/Moscow";\n```\n\nТипичная ошибка — использовать TIMESTAMP без зоны в мультизонном приложении.',
      wrong: [
        'TIMESTAMPTZ хранит дату без времени.',
        'TIMESTAMP хранит зону, TIMESTAMPTZ — нет.',
        'Это синонимы в PostgreSQL.'
      ]
    },
    {
      id: 'sql-types-5',
      subtopic: 'Типы данных',
      level: 'Junior+',
      q: 'Когда использовать DECIMAL вместо FLOAT?',
      a: 'DECIMAL (NUMERIC) — точное число с фиксированной точностью, подходит для денег. FLOAT — приближённое, может давать ошибки округления. Для финансов — только DECIMAL.',
      explain: 'FLOAT хранит двоичную дробь и не может точно представить 0.1. DECIMAL хранит десятичную точно.\n\n```sql\nprice DECIMAL(10,2) -- 10 цифр, 2 после точки\n```\n\nТипичная ошибка — хранить деньги в FLOAT и терять копейки.',
      wrong: [
        'FLOAT точнее DECIMAL, поэтому для денег используют FLOAT.',
        'DECIMAL хранит только целые числа.',
        'Это синонимы, разницы нет.'
      ]
    },
    {
      id: 'sql-types-6',
      subtopic: 'Типы данных',
      level: 'Middle',
      q: 'Что такое SERIAL / AUTO_INCREMENT?',
      a: 'Специальный тип для автоинкрементного столбца. В PostgreSQL — SERIAL / GENERATED ALWAYS AS IDENTITY, в MySQL — AUTO_INCREMENT. Автоматически присваивает следующее число при вставке.',
      explain: 'SERIAL — это синтаксический сахар: создаётся sequence и DEFAULT nextval. IDENTITY — современный стандарт.\n\n```sql\nid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY\n```\n\nТипичная ошибка — вручную вставлять id в IDENTITY-столбец.',
      wrong: [
        'Тип для хранения сериализованных объектов.',
        'Тип для хранения UUID.',
        'Обычный INT без автоматического увеличения.'
      ]
    },
    {
      id: 'sql-types-7',
      subtopic: 'Типы данных',
      level: 'Middle',
      q: 'Зачем нужен тип JSONB в PostgreSQL?',
      a: 'Хранит JSON в бинарном виде с индексацией и возможностью запросов по ключам. Быстрее JSON, поддерживает операторы @>, ->, ->>. Для полуструктурированных данных.',
      explain: 'JSONB можно индексировать через GIN. JSON хранит текст как есть, JSONB — разобранное дерево.\n\n```sql\nSELECT data->>"name" FROM t WHERE data @> `{"active": true}`;\n```\n\nТипичная ошибка — использовать JSONB там, где нужна строгая схема.',
      wrong: [
        'Хранит JSON как обычную строку без индексации.',
        'Аналог TEXT для хранения JSON.',
        'Тип для хранения массивов.'
      ]
    },
    {
      id: 'sql-types-8',
      subtopic: 'Типы данных',
      level: 'Middle+',
      q: 'Что такое ENUM в SQL?',
      a: 'Тип с фиксированным набором значений. В PostgreSQL — CREATE TYPE ... AS ENUM. Обеспечивает валидацию на уровне БД, но изменение набора требует ALTER TYPE.',
      explain: 'ENUM хранится эффективно, но добавление значения — DDL-операция. Альтернатива — CHECK или справочная таблица.\n\n```sql\nCREATE TYPE status AS ENUM ("active", "banned");\n```\n\nТипичная ошибка — использовать ENUM для часто меняющихся наборов.',
      wrong: [
        'Тип для хранения перечислений чисел.',
        'Синоним BOOLEAN.',
        'Тип для хранения массива строк.'
      ]
    },
    {
      id: 'sql-types-9',
      subtopic: 'Типы данных',
      level: 'Middle+',
      q: 'Что такое UUID и когда его использовать?',
      a: 'Universally Unique Identifier — 128-битный идентификатор. Используется вместо SERIAL, когда нужна глобальная уникальность (распределённые системы, синхронизация). Минус — больше размер и медленнее индексация.',
      explain: 'UUID можно генерировать на клиенте, не дожидаясь БД. Это удобно для офлайн-режима и синхронизации.\n\n```sql\nid UUID DEFAULT gen_random_uuid()\n```\n\nТипичная ошибка — использовать UUID везде без необходимости.',
      wrong: [
        'UUID — это автоинкрементное число.',
        'UUID хранит только строки.',
        'UUID нельзя использовать как PRIMARY KEY.'
      ]
    },

    // ================= DDL =================
    {
      id: 'sql-ddl-1',
      subtopic: 'DDL — создание и изменение',
      level: 'Junior-',
      q: 'Как создать таблицу?',
      a: 'CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(255) UNIQUE, created_at TIMESTAMP DEFAULT NOW());',
      explain: 'В одном CREATE TABLE задаются столбцы, типы и ограничения. PRIMARY KEY создаёт индекс автоматически.\n\n```sql\nCREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL\n);\n```\n\nТипичная ошибка — забыть NOT NULL и получить NULL там, где его не ждут.',
      wrong: [
        'CREATE users (id INT, name TEXT); — без ключевого слова TABLE.',
        'INSERT TABLE users (id, name);',
        'NEW TABLE users (id INT);'
      ]
    },
    {
      id: 'sql-ddl-2',
      subtopic: 'DDL — создание и изменение',
      level: 'Junior',
      q: 'Как добавить столбец в существующую таблицу?',
      a: 'ALTER TABLE users ADD COLUMN age INT; Можно указать DEFAULT и NOT NULL.',
      explain: 'При добавлении NOT NULL столбца в непустую таблицу нужен DEFAULT, иначе операция упадёт.\n\n```sql\nALTER TABLE users ADD COLUMN age INT DEFAULT 0 NOT NULL;\n```\n\nТипичная ошибка — добавлять NOT NULL без DEFAULT в таблицу с данными.',
      wrong: [
        'UPDATE TABLE users ADD age INT;',
        'INSERT COLUMN age INTO users;',
        'CREATE COLUMN age IN users;'
      ]
    },
    {
      id: 'sql-ddl-3',
      subtopic: 'DDL — создание и изменение',
      level: 'Junior',
      q: 'Чем DROP TABLE отличается от TRUNCATE TABLE?',
      a: 'DROP удаляет таблицу и её структуру полностью. TRUNCATE удаляет все строки, но оставляет таблицу и её структуру. TRUNCATE быстрее и сбрасывает счётчики.',
      explain: 'TRUNCATE — DDL-операция, обычно транзакционная в PostgreSQL. DROP необратим без бэкапа.\n\n```sql\nTRUNCATE users RESTART IDENTITY;\n```\n\nТипичная ошибка — использовать DELETE без WHERE вместо TRUNCATE.',
      wrong: [
        'DROP удаляет строки, TRUNCATE — таблицу.',
        'Это синонимы.',
        'TRUNCATE удаляет только строки с NULL.'
      ]
    },
    {
      id: 'sql-ddl-4',
      subtopic: 'DDL — создание и изменение',
      level: 'Junior+',
      q: 'Какие ограничения (constraints) бывают в SQL?',
      a: 'PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, DEFAULT. Обеспечивают целостность данных на уровне БД.',
      explain: 'Ограничения можно задавать при создании таблицы или через ALTER TABLE. Они защищают данные от некорректных значений.\n\n```sql\nALTER TABLE t ADD CONSTRAINT chk CHECK (age >= 18);\n```\n\nТипичная ошибка — проверять всё только в приложении.',
      wrong: [
        'Только PRIMARY KEY и FOREIGN KEY.',
        'Только NOT NULL и UNIQUE.',
        'Ограничения задаются только в коде приложения, не в БД.'
      ]
    },
    {
      id: 'sql-ddl-5',
      subtopic: 'DDL — создание и изменение',
      level: 'Junior+',
      q: 'Что делает ограничение CHECK?',
      a: 'Проверяет условие при вставке/обновлении. Пример: CHECK (age >= 18). Если условие ложно — операция отклоняется.',
      explain: 'CHECK не пропускает NULL как нарушение, если условие не запрещает NULL явно. Для строгой проверки добавляют NOT NULL.\n\n```sql\nage INT CHECK (age >= 18)\n```\n\nТипичная ошибка — ожидать, что CHECK отловит NULL.',
      wrong: [
        'Проверяет уникальность значения.',
        'Проверяет наличие значения (не NULL).',
        'Создаёт индекс на столбец.'
      ]
    },
    {
      id: 'sql-ddl-6',
      subtopic: 'DDL — создание и изменение',
      level: 'Middle',
      q: 'Как изменить тип столбца?',
      a: 'ALTER TABLE users ALTER COLUMN age TYPE BIGINT; В PostgreSQL — с USING для преобразования. В MySQL — MODIFY COLUMN.',
      explain: 'USING задаёт выражение преобразования: ALTER COLUMN age TYPE INT USING age::int. Без него преобразование должно быть неявным.\n\n```sql\nALTER TABLE t ALTER COLUMN x TYPE INT USING x::int;\n```\n\nТипичная ошибка — менять тип без USING и получать ошибку.',
      wrong: [
        'UPDATE TABLE users CHANGE age BIGINT;',
        'ALTER COLUMN age SET TYPE BIGINT;',
        'Изменить тип столбца нельзя, только удалить и создать заново.'
      ]
    },
    {
      id: 'sql-ddl-7',
      subtopic: 'DDL — создание и изменение',
      level: 'Middle',
      q: 'Что такое ON DELETE CASCADE?',
      a: 'Опция внешнего ключа: при удалении родительской строки автоматически удаляются дочерние. Альтернативы: SET NULL, SET DEFAULT, RESTRICT, NO ACTION.',
      explain: 'CASCADE удобен, но опасен: одно удаление может снести много данных. RESTRICT запрещает удаление родителя при наличии детей.\n\n```sql\nFOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE\n```\n\nТипичная ошибка — использовать CASCADE там, где нужен RESTRICT.',
      wrong: [
        'При удалении родителя дочерние строки остаются с NULL.',
        'При удалении родителя дочерние строки блокируются.',
        'Опция для каскадного обновления данных.'
      ]
    },
    {
      id: 'sql-ddl-8',
      subtopic: 'DDL — создание и изменение',
      level: 'Middle+',
      q: 'Что такое партиционирование таблиц?',
      a: 'Разбиение большой таблицы на части (партиции) по ключу (дата, диапазон, хеш). Ускоряет запросы и упрощает обслуживание. В PostgreSQL — PARTITION BY RANGE/LIST/HASH.',
      explain: 'Партиционирование позволяет быстро удалять старые данные через DROP PARTITION. Запросы к родительской таблице идут через partition pruning.\n\n```sql\nCREATE TABLE logs (d DATE) PARTITION BY RANGE (d);\n```\n\nТипичная ошибка — партиционировать без учета ключа запросов.',
      wrong: [
        'Создание копии таблицы для бэкапа.',
        'Разбиение таблицы на несколько баз данных.',
        'Индексация всех столбцов таблицы.'
      ]
    },

    // ================= DML =================
    {
      id: 'sql-dml-1',
      subtopic: 'DML — изменение данных',
      level: 'Junior-',
      q: 'Как вставить строку в таблицу?',
      a: 'INSERT INTO users (name, email) VALUES ("John", "john@mail.com"); Можно вставить несколько строк через запятую.',
      explain: 'Список столбцов можно опустить, но тогда нужно передать все значения по порядку. Явный список безопаснее.\n\n```sql\nINSERT INTO users (name, email) VALUES\n  ("John", "j@m.com"),\n  ("Jane", "jane@m.com");\n```\n\nТипичная ошибка — перепутать порядок значений без списка столбцов.',
      wrong: [
        'ADD INTO users (name) VALUES ("John");',
        'INSERT users SET name = "John";',
        'PUT users (name) VALUES ("John");'
      ]
    },
    {
      id: 'sql-dml-2',
      subtopic: 'DML — изменение данных',
      level: 'Junior',
      q: 'Как обновить данные?',
      a: 'UPDATE users SET name = "Jane" WHERE id = 1; Без WHERE обновятся все строки — это частая ошибка.',
      explain: 'UPDATE всегда должен иметь WHERE, кроме намеренного обновления всей таблицы. Перед выполнением полезно сделать SELECT с тем же WHERE.\n\n```sql\nUPDATE users SET name = "Jane" WHERE id = 1;\n```\n\nТипичная ошибка — забыть WHERE в продакшене.',
      wrong: [
        'SET users name = "Jane" WHERE id = 1;',
        'MODIFY users SET name = "Jane";',
        'UPDATE users name = "Jane"; — без SET.'
      ]
    },
    {
      id: 'sql-dml-3',
      subtopic: 'DML — изменение данных',
      level: 'Junior',
      q: 'Как удалить строки?',
      a: 'DELETE FROM users WHERE id = 1; Без WHERE удалятся все строки. Для полной очистки быстрее TRUNCATE.',
      explain: 'DELETE логируется построчно и может быть откатан. TRUNCATE быстрее, но обычно требует блокировки таблицы.\n\n```sql\nDELETE FROM users WHERE id = 1;\n```\n\nТипичная ошибка — DELETE без WHERE.',
      wrong: [
        'REMOVE FROM users WHERE id = 1;',
        'DELETE users WHERE id = 1; — без FROM.',
        'DROP FROM users WHERE id = 1;'
      ]
    },
    {
      id: 'sql-dml-4',
      subtopic: 'DML — изменение данных',
      level: 'Junior+',
      q: 'Что произойдёт при UPDATE без WHERE?',
      a: 'Обновятся все строки таблицы. Это опасная операция, особенно в продакшене. Всегда проверяй WHERE перед выполнением.',
      explain: 'Без WHERE обновляется вся таблица. Это может быть намеренно, но чаще — ошибка.\n\n```sql\nUPDATE users SET active = true; -- все строки\n```\n\nТипичная ошибка — запуск UPDATE без WHERE в проде.',
      wrong: [
        'Обновится только первая строка.',
        'Запрос вернёт ошибку.',
        'Ничего не произойдёт.'
      ]
    },
    {
      id: 'sql-dml-5',
      subtopic: 'DML — изменение данных',
      level: 'Middle',
      q: 'Что такое UPSERT?',
      a: 'Вставка с обновлением при конфликте. В PostgreSQL — INSERT ... ON CONFLICT (id) DO UPDATE SET ...; в MySQL — INSERT ... ON DUPLICATE KEY UPDATE.',
      explain: 'UPSERT позволяет одним запросом вставить или обновить. Конфликт определяется по уникальному индексу.\n\n```sql\nINSERT INTO t (id, v) VALUES (1, "a")\nON CONFLICT (id) DO UPDATE SET v = EXCLUDED.v;\n```\n\nТипичная ошибка — забыть указать конфликтный столбец.',
      wrong: [
        'Вставка без проверки конфликтов.',
        'Обновление без вставки.',
        'Удаление с последующей вставкой.'
      ]
    },
    {
      id: 'sql-dml-6',
      subtopic: 'DML — изменение данных',
      level: 'Middle',
      q: 'Как вернуть изменённые данные в PostgreSQL?',
      a: 'Через RETURNING: INSERT INTO users (name) VALUES ("John") RETURNING id, name; Работает также с UPDATE и DELETE.',
      explain: 'RETURNING избавляет от дополнительного SELECT. Особенно полезен для получения сгенерированного id.\n\n```sql\nINSERT INTO users (name) VALUES ("John") RETURNING id;\n```\n\nТипичная ошибка — делать SELECT после INSERT вместо RETURNING.',
      wrong: [
        'Через SELECT после INSERT.',
        'Через OUTPUT — в PostgreSQL не поддерживается.',
        'Вернуть данные из INSERT нельзя.'
      ]
    },
    {
      id: 'sql-dml-7',
      subtopic: 'DML — изменение данных',
      level: 'Middle+',
      q: 'Что такое MERGE?',
      a: 'Команда для слияния данных: вставляет, обновляет или удаляет строки в целевой таблице на основе источника. Стандарт SQL:2003, поддерживается в PostgreSQL 15+, MSSQL, Oracle.',
      explain: 'MERGE заменяет сложные конструкции с UPSERT и DELETE. Условия задаются через WHEN MATCHED / WHEN NOT MATCHED.\n\n```sql\nMERGE INTO target t USING source s ON t.id = s.id\nWHEN MATCHED THEN UPDATE SET v = s.v\nWHEN NOT MATCHED THEN INSERT VALUES (s.id, s.v);\n```\n\nТипичная ошибка — использовать MERGE там, где хватает UPSERT.',
      wrong: [
        'Синоним INSERT.',
        'Команда для объединения двух таблиц в одну.',
        'Команда для сортировки данных.'
      ]
    },

    // ================= SELECT И ФИЛЬТРАЦИЯ =================
    {
      id: 'sql-select-1',
      subtopic: 'SELECT и фильтрация',
      level: 'Junior-',
      q: 'Как выбрать все столбцы из таблицы?',
      a: 'SELECT * FROM users; Звёздочка возвращает все столбцы. В продакшене лучше перечислять нужные столбцы явно.',
      explain: 'SELECT * удобен для отладки, но в коде опасен: при изменении схемы ломается вывод. Явный список стабильнее.\n\n```sql\nSELECT id, name FROM users;\n```\n\nТипичная ошибка — использовать * в продакшн-запросах.',
      wrong: [
        'SELECT ALL FROM users;',
        'GET * FROM users;',
        'SELECT users.* FROM users; — только для JOIN.'
      ]
    },
    {
      id: 'sql-select-2',
      subtopic: 'SELECT и фильтрация',
      level: 'Junior-',
      q: 'Как отфильтровать строки по условию?',
      a: 'Через WHERE: SELECT * FROM users WHERE age > 18;',
      explain: 'WHERE выполняется до группировки и сортировки. Он фильтрует строки, а не группы.\n\n```sql\nSELECT * FROM users WHERE age > 18;\n```\n\nТипичная ошибка — путать WHERE и HAVING.',
      wrong: [
        'Через HAVING: SELECT * FROM users HAVING age > 18;',
        'Через FILTER: SELECT * FROM users FILTER age > 18;',
        'Через IF: SELECT * FROM users IF age > 18;'
      ]
    },
    {
      id: 'sql-select-3',
      subtopic: 'SELECT и фильтрация',
      level: 'Junior',
      q: 'Какие операторы сравнения есть в SQL?',
      a: '=, <>, !=, <, >, <=, >=. Для NULL — IS NULL / IS NOT NULL. Для диапазона — BETWEEN. Для списка — IN. Для шаблона — LIKE.',
      explain: 'NULL не сравнивается через =. Для диапазона BETWEEN включает границы. IN удобен для списка значений.\n\n```sql\nWHERE age BETWEEN 18 AND 30 AND city IN ("Moscow", "SPb");\n```\n\nТипичная ошибка — использовать = NULL.',
      wrong: [
        'Только = и <>. Остальные операторы не поддерживаются.',
        'Только =, <, >. Остальное — расширения.',
        'Только LIKE и IN.'
      ]
    },
    {
      id: 'sql-select-4',
      subtopic: 'SELECT и фильтрация',
      level: 'Junior',
      q: 'Чем LIKE отличается от ILIKE?',
      a: 'LIKE — регистрозависимый поиск по шаблону. ILIKE — регистронезависимый (в PostgreSQL). Шаблоны: % — любое количество символов, _ — один символ.',
      explain: 'ILIKE — расширение PostgreSQL. В других СУБД для регистронезависимости используют LOWER или специальные настройки collation.\n\n```sql\nWHERE name ILIKE "john%";\n```\n\nТипичная ошибка — ожидать ILIKE в MySQL.',
      wrong: [
        'LIKE — регистронезависимый, ILIKE — регистрозависимый.',
        'ILIKE работает только с числами.',
        'Это синонимы.'
      ]
    },
    {
      id: 'sql-select-5',
      subtopic: 'SELECT и фильтрация',
      level: 'Junior+',
      q: 'Как проверить значение на NULL?',
      a: 'Через IS NULL или IS NOT NULL. Нельзя использовать = NULL — это вернёт NULL, а не true.',
      explain: 'NULL — это UNKNOWN, а не значение. Любое сравнение с ним даёт NULL, и WHERE не пропускает строку.\n\n```sql\nWHERE email IS NULL;\n```\n\nТипичная ошибка — писать WHERE email = NULL.',
      wrong: [
        'Через = NULL — это корректный способ.',
        'Через == NULL.',
        'Через NULL(value).'
      ]
    },
    {
      id: 'sql-select-6',
      subtopic: 'SELECT и фильтрация',
      level: 'Junior+',
      q: 'Что делает оператор IN?',
      a: 'Проверяет, входит ли значение в список: WHERE id IN (1, 2, 3). Можно комбинировать с подзапросом.',
      explain: 'IN эквивалентен цепочке OR. С подзапросом IN загружает список значений и сравнивает.\n\n```sql\nWHERE id IN (SELECT user_id FROM orders);\n```\n\nТипичная ошибка — использовать IN с NULL в списке.',
      wrong: [
        'Проверяет, входит ли значение в диапазон.',
        'Проверяет наличие NULL.',
        'Объединяет две таблицы.'
      ]
    },
    {
      id: 'sql-select-7',
      subtopic: 'SELECT и фильтрация',
      level: 'Junior+',
      q: 'Что делает BETWEEN?',
      a: 'Проверяет диапазон включительно: WHERE age BETWEEN 18 AND 30. Эквивалентно age >= 18 AND age <= 30.',
      explain: 'BETWEEN включает обе границы. Работает с числами, датами, строками.\n\n```sql\nWHERE created_at BETWEEN "2025-01-01" AND "2025-12-31";\n```\n\nТипичная ошибка — забыть, что границы включаются.',
      wrong: [
        'Проверяет диапазон исключительно.',
        'Проверяет только целые числа.',
        'Проверяет наличие значения в списке.'
      ]
    },
    {
      id: 'sql-select-8',
      subtopic: 'SELECT и фильтрация',
      level: 'Middle',
      q: 'Как работает трёхзначная логика в SQL?',
      a: 'Значения: TRUE, FALSE, UNKNOWN (NULL). NULL в условиях не true и не false. WHERE пропускает строки, где условие UNKNOWN. Для обработки — COALESCE, IS NULL.',
      explain: 'NOT UNKNOWN = UNKNOWN. TRUE OR UNKNOWN = TRUE, FALSE AND UNKNOWN = FALSE. Это важно при построении условий.\n\n```sql\nWHERE NOT (email = "a@b.c") -- не вернёт строки с NULL email\n```\n\nТипичная ошибка — ожидать, что NOT с NULL вернёт true.',
      wrong: [
        'В SQL только два значения: TRUE и FALSE.',
        'NULL автоматически приводится к FALSE.',
        'NULL автоматически приводится к TRUE.'
      ]
    },
    {
      id: 'sql-select-9',
      subtopic: 'SELECT и фильтрация',
      level: 'Middle',
      q: 'Что делает COALESCE?',
      a: 'Возвращает первое не-NULL значение из списка: COALESCE(phone, email, "нет контакта"). Часто используется для значений по умолчанию.',
      explain: 'COALESCE работает с любым числом аргументов. Похожие функции: NULLIF, IFNULL (MySQL), ISNULL (MSSQL).\n\n```sql\nSELECT COALESCE(nickname, name, "anonymous") FROM users;\n```\n\nТипичная ошибка — путать COALESCE и CASE.',
      wrong: [
        'Возвращает последнее значение из списка.',
        'Проверяет значение на NULL.',
        'Объединяет строки.'
      ]
    },
    {
      id: 'sql-select-10',
      subtopic: 'SELECT и фильтрация',
      level: 'Middle',
      q: 'Что делает CASE?',
      a: 'Условное выражение: CASE WHEN age < 18 THEN "child" WHEN age < 65 THEN "adult" ELSE "senior" END. Работает в SELECT, WHERE, ORDER BY.',
      explain: 'CASE — это выражение, а не оператор. Его можно использовать в любом месте, где ожидается значение.\n\n```sql\nSELECT CASE WHEN age < 18 THEN "child" ELSE "adult" END FROM users;\n```\n\nТипичная ошибка — забыть ELSE и получить NULL.',
      wrong: [
        'Аналог IF в WHERE, работает только там.',
        'Создаёт новую таблицу.',
        'Проверяет только NULL.'
      ]
    },
    {
      id: 'sql-select-11',
      subtopic: 'SELECT и фильтрация',
      level: 'Middle+',
      q: 'Чем WHERE отличается от HAVING?',
      a: 'WHERE фильтрует строки до группировки. HAVING фильтрует группы после GROUP BY. В HAVING можно использовать агрегатные функции, в WHERE — нет.',
      explain: 'Порядок: WHERE → GROUP BY → HAVING → ORDER BY. Агрегаты в WHERE запрещены.\n\n```sql\nSELECT city, COUNT(*) FROM users\nGROUP BY city HAVING COUNT(*) > 10;\n```\n\nТипичная ошибка — писать COUNT(*) в WHERE.',
      wrong: [
        'WHERE фильтрует группы, HAVING — строки.',
        'Это синонимы.',
        'HAVING работает без GROUP BY всегда.'
      ]
    },
    {
      id: 'sql-select-12',
      subtopic: 'SELECT и фильтрация',
      level: 'Middle+',
      q: 'Что такое DISTINCT?',
      a: 'Убирает дубликаты из результата: SELECT DISTINCT city FROM users; Работает по всем выбранным столбцам. Может быть медленным на больших данных.',
      explain: 'DISTINCT применяется ко всей строке результата, а не к одному столбцу. DISTINCT ON (PostgreSQL) — к указанным столбцам.\n\n```sql\nSELECT DISTINCT city FROM users;\n```\n\nТипичная ошибка — ждать DISTINCT по одному столбцу при выборке нескольких.',
      wrong: [
        'Сортирует результат.',
        'Считает количество уникальных значений.',
        'Удаляет NULL из результата.'
      ]
    },

    // ================= СОРТИРОВКА И ЛИМИТЫ =================
    {
      id: 'sql-order-1',
      subtopic: 'Сортировка и лимиты',
      level: 'Junior-',
      q: 'Как отсортировать результат?',
      a: 'Через ORDER BY: SELECT * FROM users ORDER BY age DESC; По умолчанию ASC. Можно сортировать по нескольким столбцам.',
      explain: 'ORDER BY выполняется после GROUP BY и HAVING. Можно сортировать по выражению или алиасу.\n\n```sql\nORDER BY age DESC, name ASC;\n```\n\nТипичная ошибка — использовать сортировку без индекса на больших данных.',
      wrong: [
        'Через SORT BY: SELECT * FROM users SORT BY age;',
        'Через GROUP BY: SELECT * FROM users GROUP BY age;',
        'Через ORDER: SELECT * FROM users ORDER age;'
      ]
    },
    {
      id: 'sql-order-2',
      subtopic: 'Сортировка и лимиты',
      level: 'Junior',
      q: 'Как ограничить количество строк?',
      a: 'Через LIMIT: SELECT * FROM users LIMIT 10; В MSSQL — TOP 10, в Oracle — FETCH FIRST 10 ROWS ONLY.',
      explain: 'LIMIT без ORDER BY даёт произвольные строки. Для стабильного результата нужен ORDER BY.\n\n```sql\nSELECT * FROM users ORDER BY id LIMIT 10;\n```\n\nТипичная ошибка — LIMIT без ORDER BY и ожидание порядка.',
      wrong: [
        'Через TOP во всех СУБД.',
        'Через MAX: SELECT MAX(10) FROM users;',
        'Через COUNT: SELECT COUNT(10) FROM users;'
      ]
    },
    {
      id: 'sql-order-3',
      subtopic: 'Сортировка и лимиты',
      level: 'Junior+',
      q: 'Что делает OFFSET?',
      a: 'Пропускает N строк: SELECT * FROM users LIMIT 10 OFFSET 20; Для пагинации. На больших OFFSET может быть медленным.',
      explain: 'OFFSET отсчитывается от начала результата. Без ORDER BY порядок не определён.\n\n```sql\nSELECT * FROM users ORDER BY id LIMIT 10 OFFSET 20;\n```\n\nТипичная ошибка — большой OFFSET без keyset-пагинации.',
      wrong: [
        'Сортирует результат.',
        'Ограничивает количество строк.',
        'Группирует строки.'
      ]
    },
    {
      id: 'sql-order-4',
      subtopic: 'Сортировка и лимиты',
      level: 'Middle',
      q: 'Почему пагинация через OFFSET может быть медленной?',
      a: 'БД читает и отбрасывает OFFSET строк. На больших значениях это дорого. Альтернатива — keyset pagination (WHERE id > last_id ORDER BY id LIMIT 10).',
      explain: 'Keyset-пагинация использует индекс и не читает пропущенные строки. Это важно для лент и списков.\n\n```sql\nWHERE id > 1000 ORDER BY id LIMIT 10;\n```\n\nТипичная ошибка — использовать OFFSET на миллионах строк.',
      wrong: [
        'OFFSET всегда быстрый.',
        'OFFSET работает только с индексами.',
        'OFFSET нельзя использовать с LIMIT.'
      ]
    },
    {
      id: 'sql-order-5',
      subtopic: 'Сортировка и лимиты',
      level: 'Middle+',
      q: 'Как работает NULL в ORDER BY?',
      a: 'В PostgreSQL NULL считается больше любого значения (в ASC — в конце). В MySQL — меньше (в начале). Можно управлять: ORDER BY age NULLS LAST.',
      explain: 'Поведение по умолчанию зависит от СУБД. NULLS FIRST/LAST делает сортировку предсказуемой.\n\n```sql\nORDER BY age ASC NULLS LAST;\n```\n\nТипичная ошибка — полагаться на поведение по умолчанию.',
      wrong: [
        'NULL всегда игнорируется в сортировке.',
        'NULL всегда в начале.',
        'NULL всегда в конце во всех СУБД.'
      ]
    },

    // ================= АГРЕГАЦИЯ И ГРУППИРОВКА =================
    {
      id: 'sql-agg-1',
      subtopic: 'Агрегация и группировка',
      level: 'Junior-',
      q: 'Какие агрегатные функции знаешь?',
      a: 'COUNT, SUM, AVG, MIN, MAX. Также STRING_AGG (PostgreSQL), GROUP_CONCAT (MySQL), ARRAY_AGG.',
      explain: 'Агрегаты игнорируют NULL, кроме COUNT(*). AVG считает только не-NULL значения.\n\n```sql\nSELECT COUNT(*), AVG(age) FROM users;\n```\n\nТипичная ошибка — ожидать, что AVG учтёт NULL как 0.',
      wrong: [
        'Только COUNT и SUM.',
        'Только MIN и MAX.',
        'Агрегатные функции не поддерживаются в SQL.'
      ]
    },
    {
      id: 'sql-agg-2',
      subtopic: 'Агрегация и группировка',
      level: 'Junior',
      q: 'Чем COUNT(*) отличается от COUNT(column)?',
      a: 'COUNT(*) считает все строки. COUNT(column) считает только строки, где column IS NOT NULL. COUNT(DISTINCT column) — уникальные значения.',
      explain: 'COUNT(*) не читает столбцы, поэтому может быть быстрее. COUNT(column) пропускает NULL.\n\n```sql\nSELECT COUNT(*), COUNT(email) FROM users;\n```\n\nТипичная ошибка — путать эти формы.',
      wrong: [
        'Это синонимы.',
        'COUNT(column) считает все строки, COUNT(*) — только не-NULL.',
        'COUNT(*) работает только с индексами.'
      ]
    },
    {
      id: 'sql-agg-3',
      subtopic: 'Агрегация и группировка',
      level: 'Junior',
      q: 'Как сгруппировать данные?',
      a: 'Через GROUP BY: SELECT city, COUNT(*) FROM users GROUP BY city; В SELECT можно использовать только агрегаты и столбцы из GROUP BY.',
      explain: 'GROUP BY сворачивает строки в группы. Все неагрегированные столбцы в SELECT должны быть в GROUP BY.\n\n```sql\nSELECT city, COUNT(*) FROM users GROUP BY city;\n```\n\nТипичная ошибка — выбрать столбец, которого нет в GROUP BY.',
      wrong: [
        'Через ORDER BY: SELECT city, COUNT(*) FROM users ORDER BY city;',
        'Через HAVING без GROUP BY.',
        'Через DISTINCT.'
      ]
    },
    {
      id: 'sql-agg-4',
      subtopic: 'Агрегация и группировка',
      level: 'Junior+',
      q: 'Почему нельзя выбрать столбец, которого нет в GROUP BY?',
      a: 'БД не знает, какое значение выбрать из группы. Исключение — если столбец функционально зависит от GROUP BY (в PostgreSQL при PRIMARY KEY).',
      explain: 'Функциональная зависимость: если GROUP BY по первичному ключу, все остальные столбцы зависят от него.\n\n```sql\nSELECT id, name FROM users GROUP BY id; -- ок, id — PK\n```\n\nТипичная ошибка — использовать MySQL с ONLY_FULL_GROUP_BY=off.',
      wrong: [
        'Можно, БД выберет случайное значение.',
        'Можно, БД выберет первое значение.',
        'Можно, если столбец числовой.'
      ]
    },
    {
      id: 'sql-agg-5',
      subtopic: 'Агрегация и группировка',
      level: 'Middle',
      q: 'Что делает GROUPING SETS?',
      a: 'Позволяет группировать по нескольким наборам столбцов в одном запросе: GROUP BY GROUPING SETS ((city), (country), ()). Эквивалент UNION ALL нескольких GROUP BY.',
      explain: 'GROUPING SETS экономит проходы по данным. Пустой набор () даёт общий итог.\n\n```sql\nGROUP BY GROUPING SETS ((city), (country), ());\n```\n\nТипичная ошибка — писать несколько GROUP BY вместо GROUPING SETS.',
      wrong: [
        'Группирует только по одному столбцу.',
        'Создаёт временную таблицу с группами.',
        'Удаляет дубликаты из результата.'
      ]
    },
    {
      id: 'sql-agg-6',
      subtopic: 'Агрегация и группировка',
      level: 'Middle+',
      q: 'Что такое ROLLUP и CUBE?',
      a: 'ROLLUP создаёт иерархические подытоги: ROLLUP(country, city) → группировки по (country, city), (country), (). CUBE — все возможные комбинации столбцов.',
      explain: 'ROLLUP полезен для отчётов с итогами. CUBE — для многомерного анализа.\n\n```sql\nGROUP BY ROLLUP (country, city);\n```\n\nТипичная ошибка — путать ROLLUP и CUBE.',
      wrong: [
        'ROLLUP и CUBE — синонимы GROUP BY.',
        'ROLLUP работает только с числами.',
        'CUBE создаёт куб данных в памяти.'
      ]
    },

    // ================= JOIN'Ы =================
    {
      id: 'sql-join-1',
      subtopic: 'JOIN\'ы',
      level: 'Junior-',
      q: 'Что такое JOIN?',
      a: 'Операция объединения строк из двух или более таблиц по связанному столбцу. Без JOIN данные пришлось бы собирать вручную в приложении.',
      explain: 'JOIN работает по условию ON. Без условия получится CROSS JOIN (декартово произведение).\n\n```sql\nSELECT u.name, o.total FROM users u JOIN orders o ON o.user_id = u.id;\n```\n\nТипичная ошибка — забыть ON и получить декартово произведение.',
      wrong: [
        'Операция объединения двух таблиц в одну физически.',
        'Операция сортировки двух таблиц.',
        'Операция удаления дубликатов.'
      ]
    },
    {
      id: 'sql-join-2',
      subtopic: 'JOIN\'ы',
      level: 'Junior',
      q: 'Чем INNER JOIN отличается от LEFT JOIN?',
      a: 'INNER JOIN возвращает только совпадающие строки из обеих таблиц. LEFT JOIN возвращает все строки из левой таблицы + совпадения из правой (или NULL, если совпадений нет).',
      explain: 'LEFT JOIN полезен, когда нужны все левые строки, даже без пары. RIGHT JOIN — зеркально.\n\n```sql\nSELECT u.name, o.id FROM users u LEFT JOIN orders o ON o.user_id = u.id;\n```\n\nТипичная ошибка — фильтровать правую таблицу в WHERE и терять LEFT-семантику.',
      wrong: [
        'INNER JOIN возвращает все строки, LEFT JOIN — только совпадающие.',
        'LEFT JOIN возвращает строки только из правой таблицы.',
        'Это синонимы.'
      ]
    },
    {
      id: 'sql-join-3',
      subtopic: 'JOIN\'ы',
      level: 'Junior+',
      q: 'Что такое RIGHT JOIN и FULL JOIN?',
      a: 'RIGHT JOIN — все строки из правой таблицы + совпадения из левой. FULL JOIN — все строки из обеих таблиц, где нет совпадений — NULL.',
      explain: 'FULL JOIN редко используется, но полезен для поиска расхождений между таблицами.\n\n```sql\nSELECT * FROM a FULL JOIN b ON a.id = b.id;\n```\n\nТипичная ошибка — использовать RIGHT JOIN вместо LEFT с перестановкой таблиц.',
      wrong: [
        'RIGHT JOIN — все строки из левой таблицы.',
        'FULL JOIN — только совпадающие строки.',
        'FULL JOIN работает только с двумя таблицами.'
      ]
    },
    {
      id: 'sql-join-4',
      subtopic: 'JOIN\'ы',
      level: 'Junior+',
      q: 'Что такое CROSS JOIN?',
      a: 'Декартово произведение: каждая строка левой таблицы соединяется с каждой строкой правой. Если в таблицах 10 и 20 строк — результат 200 строк.',
      explain: 'CROSS JOIN не имеет условия ON. Используется для генерации комбинаций.\n\n```sql\nSELECT * FROM colors CROSS JOIN sizes;\n```\n\nТипичная ошибка — случайно получить CROSS JOIN, забыв ON.',
      wrong: [
        'Объединение только совпадающих строк.',
        'Объединение по внешнему ключу.',
        'Сортировка двух таблиц.'
      ]
    },
    {
      id: 'sql-join-5',
      subtopic: 'JOIN\'ы',
      level: 'Middle',
      q: 'Что такое SELF JOIN?',
      a: 'Соединение таблицы с самой собой. Используется для иерархий (сотрудник → менеджер) или поиска дубликатов. Обязательны алиасы.',
      explain: 'SELF JOIN требует двух алиасов, чтобы различать «левую» и «правую» копии таблицы.\n\n```sql\nSELECT e.name, m.name AS manager\nFROM employees e LEFT JOIN employees m ON e.manager_id = m.id;\n```\n\nТипичная ошибка — забыть алиасы и получить неоднозначность.',
      wrong: [
        'Соединение таблицы с копией в другой базе.',
        'Автоматическое соединение по PRIMARY KEY.',
        'Соединение без условия ON.'
      ]
    },
    {
      id: 'sql-join-6',
      subtopic: 'JOIN\'ы',
      level: 'Middle',
      q: 'Чем ON отличается от USING?',
      a: 'ON принимает любое условие: ON a.id = b.a_id. USING — сокращение для одинаковых столбцов: USING (id). В результате USING столбец выводится один раз.',
      explain: 'USING удобен, когда столбцы называются одинаково. ON гибче и обязателен для сложных условий.\n\n```sql\nSELECT * FROM a JOIN b USING (id);\n```\n\nТипичная ошибка — использовать USING при разных именах столбцов.',
      wrong: [
        'USING принимает любое условие, ON — только равенство.',
        'Это синонимы.',
        'USING работает только с тремя таблицами.'
      ]
    },
    {
      id: 'sql-join-7',
      subtopic: 'JOIN\'ы',
      level: 'Middle+',
      q: 'Почему условие в WHERE может превратить LEFT JOIN в INNER JOIN?',
      a: 'Если в WHERE фильтровать по столбцу правой таблицы (WHERE b.status = "active"), строки с NULL отбрасываются, и LEFT JOIN теряет смысл. Условие нужно переносить в ON.',
      explain: 'NULL не проходит проверку b.status = "active". Поэтому LEFT JOIN с таким WHERE эквивалентен INNER JOIN.\n\n```sql\nLEFT JOIN orders o ON o.user_id = u.id AND o.status = "active"\n```\n\nТипичная ошибка — фильтровать правую таблицу в WHERE.',
      wrong: [
        'WHERE не влияет на тип JOIN.',
        'LEFT JOIN всегда остаётся LEFT JOIN.',
        'Условие в WHERE удаляет только NULL-строки из левой таблицы.'
      ]
    },

    // ================= ПОДЗАПРОСЫ =================
    {
      id: 'sql-sub-1',
      subtopic: 'Подзапросы',
      level: 'Junior+',
      q: 'Что такое подзапрос?',
      a: 'Запрос внутри другого запроса. Может возвращать скаляр, строку, столбец или таблицу. Используется в SELECT, FROM, WHERE, HAVING.',
      explain: 'Подзапрос в FROM называется derived table и требует алиаса. В WHERE — обычно скаляр или список.\n\n```sql\nSELECT * FROM (SELECT id FROM users) AS sub;\n```\n\nТипичная ошибка — забыть алиас для подзапроса в FROM.',
      wrong: [
        'Запрос, который выполняется первым и сохраняется в таблицу.',
        'Запрос, который нельзя использовать в WHERE.',
        'Запрос только для агрегатных функций.'
      ]
    },
    {
      id: 'sql-sub-2',
      subtopic: 'Подзапросы',
      level: 'Junior+',
      q: 'Что такое скалярный подзапрос?',
      a: 'Подзапрос, возвращающий одно значение (одна строка, один столбец). Пример: SELECT name, (SELECT COUNT(*) FROM orders WHERE user_id = u.id) FROM users u;',
      explain: 'Скалярный подзапрос можно использовать там, где ожидается значение. Если вернёт больше одной строки — ошибка.\n\n```sql\nSELECT (SELECT COUNT(*) FROM orders) AS total;\n```\n\nТипичная ошибка — получить больше одной строки из скалярного подзапроса.',
      wrong: [
        'Подзапрос, возвращающий таблицу.',
        'Подзапрос, возвращающий массив значений.',
        'Подзапрос без SELECT.'
      ]
    },
    {
      id: 'sql-sub-3',
      subtopic: 'Подзапросы',
      level: 'Middle',
      q: 'Чем EXISTS отличается от IN?',
      a: 'EXISTS проверяет наличие строк и часто быстрее на больших данных. IN загружает список значений и сравнивает. EXISTS корректнее работает с NULL.',
      explain: 'EXISTS останавливается на первой найденной строке. IN может материализовать весь список.\n\n```sql\nWHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);\n```\n\nТипичная ошибка — использовать IN с подзапросом, возвращающим NULL.',
      wrong: [
        'IN всегда быстрее EXISTS.',
        'EXISTS работает только со скалярными подзапросами.',
        'Это синонимы.'
      ]
    },
    {
      id: 'sql-sub-4',
      subtopic: 'Подзапросы',
      level: 'Middle',
      q: 'Что такое коррелированный подзапрос?',
      a: 'Подзапрос, ссылающийся на столбцы внешнего запроса. Выполняется для каждой строки внешнего запроса. Может быть медленным, часто заменяется JOIN.',
      explain: 'Коррелированный подзапрос зависит от внешней строки. Планировщик может переписать его в JOIN.\n\n```sql\nSELECT * FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);\n```\n\nТипичная ошибка — использовать коррелированный подзапрос на больших таблицах.',
      wrong: [
        'Подзапрос без ссылок на внешний запрос.',
        'Подзапрос, выполняемый один раз.',
        'Подзапрос только в SELECT.'
      ]
    },
    {
      id: 'sql-sub-5',
      subtopic: 'Подзапросы',
      level: 'Middle+',
      q: 'Что такое ANY и ALL?',
      a: 'ANY — true, если условие верно хотя бы для одного значения подзапроса: WHERE age > ANY (SELECT age FROM users). ALL — если верно для всех.',
      explain: 'ANY и ALL работают с подзапросами и массивами. SOME — синоним ANY.\n\n```sql\nWHERE age > ALL (SELECT age FROM users WHERE city = "Moscow");\n```\n\nТипичная ошибка — путать ANY и ALL.',
      wrong: [
        'ANY и ALL — синонимы IN.',
        'ALL — true, если верно хотя бы для одного.',
        'ANY работает только с числами.'
      ]
    },

    // ================= CTE И РЕКУРСИЯ =================
    {
      id: 'sql-cte-1',
      subtopic: 'CTE и рекурсия',
      level: 'Junior+',
      q: 'Что такое CTE (WITH)?',
      a: 'Common Table Expression — именованный временный результат, доступный в основном запросе. Упрощает сложные запросы и заменяет вложенные подзапросы.',
      explain: 'CTE живёт только на время запроса. Можно определять несколько CTE через запятую.\n\n```sql\nWITH active AS (SELECT * FROM users WHERE active)\nSELECT * FROM active;\n```\n\nТипичная ошибка — считать CTE материализованным (в PostgreSQL 12+ он инлайнится).',
      wrong: [
        'Постоянная таблица, сохраняемая в БД.',
        'Индекс для ускорения запросов.',
        'Триггер для обновления данных.'
      ]
    },
    {
      id: 'sql-cte-2',
      subtopic: 'CTE и рекурсия',
      level: 'Middle',
      q: 'Чем CTE отличается от подзапроса?',
      a: 'CTE выносится в начало запроса, может использоваться несколько раз и читается сверху вниз. Подзапрос вложен и часто дублируется. CTE улучшает читаемость.',
      explain: 'CTE не всегда быстрее — в некоторых СУБД он материализуется. Но читаемость важнее.\n\n```sql\nWITH a AS (...), b AS (...) SELECT * FROM a JOIN b ON ...;\n```\n\nТипичная ошибка — ожидать, что CTE всегда оптимизируется.',
      wrong: [
        'CTE всегда быстрее подзапроса.',
        'Подзапрос можно использовать несколько раз, CTE — нет.',
        'CTE работает только с SELECT.'
      ]
    },
    {
      id: 'sql-cte-3',
      subtopic: 'CTE и рекурсия',
      level: 'Middle+',
      q: 'Что такое рекурсивный CTE?',
      a: 'CTE, ссылающийся на себя: WITH RECURSIVE tree AS (SELECT ... UNION ALL SELECT ... FROM tree JOIN ...). Используется для иерархий (дерево категорий, оргструктура).',
      explain: 'Рекурсивный CTE состоит из anchor (базовый случай) и recursive (шаг). Обязательно условие выхода.\n\n```sql\nWITH RECURSIVE tree AS (\n  SELECT id, parent_id FROM nodes WHERE parent_id IS NULL\n  UNION ALL\n  SELECT n.id, n.parent_id FROM nodes n JOIN tree t ON n.parent_id = t.id\n)\nSELECT * FROM tree;\n```\n\nТипичная ошибка — забыть условие выхода и получить бесконечный цикл.',
      wrong: [
        'CTE, который вызывается из другой БД.',
        'CTE без условия выхода — так нельзя.',
        'Рекурсивные CTE не поддерживаются в SQL.'
      ]
    },
    {
      id: 'sql-cte-4',
      subtopic: 'CTE и рекурсия',
      level: 'Senior',
      q: 'Как работает рекурсивный CTE по шагам?',
      a: '1) Базовый запрос (anchor) даёт начальные строки. 2) Рекурсивная часть выполняется для результата предыдущей итерации. 3) Процесс повторяется, пока рекурсивная часть возвращает строки. 4) UNION ALL объединяет все итерации.',
      explain: 'Итерации накапливаются в working table. Когда рекурсивная часть возвращает 0 строк — цикл останавливается.\n\n```sql\n-- anchor: корни, recursive: дети\n```\n\nТипичная ошибка — использовать UNION вместо UNION ALL и терять производительность.',
      wrong: [
        'CTE выполняется один раз без итераций.',
        'Рекурсия останавливается только по таймауту.',
        'Рекурсивная часть выполняется до базовой.'
      ]
    },

    // ================= ОКОННЫЕ ФУНКЦИИ =================
    {
      id: 'sql-win-1',
      subtopic: 'Оконные функции',
      level: 'Middle',
      q: 'Что такое оконные функции?',
      a: 'Функции, вычисляющие значение по группе строк (окну), но не сворачивающие результат в одну строку. Пример: ROW_NUMBER() OVER (PARTITION BY city ORDER BY age).',
      explain: 'Оконные функции сохраняют все строки, в отличие от GROUP BY. OVER задаёт окно.\n\n```sql\nSELECT name, ROW_NUMBER() OVER (ORDER BY age) FROM users;\n```\n\nТипичная ошибка — путать оконные функции с агрегатными.',
      wrong: [
        'Агрегатные функции, сворачивающие строки в одну.',
        'Функции для работы с окнами браузера.',
        'Функции только для сортировки.'
      ]
    },
    {
      id: 'sql-win-2',
      subtopic: 'Оконные функции',
      level: 'Middle',
      q: 'Чем ROW_NUMBER отличается от RANK и DENSE_RANK?',
      a: 'ROW_NUMBER — уникальный номер без повторов. RANK — одинаковый ранг при равенстве, следующий ранг с пропуском (1, 1, 3). DENSE_RANK — без пропуска (1, 1, 2).',
      explain: 'ROW_NUMBER всегда уникален. RANK и DENSE_RANK различаются обработкой повторов.\n\n```sql\nROW_NUMBER() OVER (ORDER BY score DESC)\n```\n\nТипичная ошибка — использовать RANK там, где нужен уникальный номер.',
      wrong: [
        'ROW_NUMBER и RANK — синонимы.',
        'DENSE_RANK пропускает ранги.',
        'RANK всегда уникален.'
      ]
    },
    {
      id: 'sql-win-3',
      subtopic: 'Оконные функции',
      level: 'Middle+',
      q: 'Что делают LAG и LEAD?',
      a: 'LAG(col, n) — значение из предыдущей строки окна, LEAD(col, n) — из следующей. Используются для сравнения с предыдущим периодом, вычисления разниц.',
      explain: 'Третий аргумент — значение по умолчанию, если строки нет.\n\n```sql\nLAG(price, 1, 0) OVER (ORDER BY d)\n```\n\nТипичная ошибка — путать LAG и LEAD.',
      wrong: [
        'LAG и LEAD — агрегатные функции.',
        'LAG возвращает следующую строку, LEAD — предыдущую.',
        'LAG работает только с числами.'
      ]
    },
    {
      id: 'sql-win-4',
      subtopic: 'Оконные функции',
      level: 'Middle+',
      q: 'Что такое PARTITION BY в оконной функции?',
      a: 'Разбивает строки на группы (партиции) для независимого вычисления. Пример: SUM(salary) OVER (PARTITION BY department) — сумма по каждому отделу.',
      explain: 'PARTITION BY похож на GROUP BY, но не сворачивает строки. Внутри партиции можно задать ORDER BY.\n\n```sql\nSUM(salary) OVER (PARTITION BY department ORDER BY hired_at)\n```\n\nТипичная ошибка — путать PARTITION BY и GROUP BY.',
      wrong: [
        'Сортирует строки внутри окна.',
        'Ограничивает количество строк.',
        'Удаляет дубликаты.'
      ]
    },
    {
      id: 'sql-win-5',
      subtopic: 'Оконные функции',
      level: 'Senior',
      q: 'Что такое frame clause в оконных функциях?',
      a: 'Определяет диапазон строк внутри окна: ROWS BETWEEN 2 PRECEDING AND CURRENT ROW. Позволяет считать скользящие суммы, средние за N строк.',
      explain: 'Frame задаётся после ORDER BY. По умолчанию — RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.\n\n```sql\nAVG(price) OVER (ORDER BY d ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)\n```\n\nТипичная ошибка — забыть frame и получить накопительный итог вместо скользящего.',
      wrong: [
        'Frame clause задаёт PARTITION BY.',
        'Frame clause работает только с ROW_NUMBER.',
        'Frame clause не поддерживается в SQL.'
      ]
    },

    // ================= ИНДЕКСЫ И ОПТИМИЗАЦИЯ =================
    {
      id: 'sql-index-1',
      subtopic: 'Индексы и оптимизация',
      level: 'Junior+',
      q: 'Что такое индекс?',
      a: 'Структура данных (обычно B-tree), ускоряющая поиск строк. Аналог оглавления книги. Ускоряет SELECT, но замедляет INSERT/UPDATE/DELETE и занимает место.',
      explain: 'Индекс хранит отсортированные значения и ссылки на строки. Планировщик решает, использовать ли индекс.\n\n```sql\nCREATE INDEX idx_users_email ON users(email);\n```\n\nТипичная ошибка — создавать индексы на все столбцы.',
      wrong: [
        'Копия таблицы для быстрого доступа.',
        'Ограничение на столбец.',
        'Триггер для автоматического обновления.'
      ]
    },
    {
      id: 'sql-index-2',
      subtopic: 'Индексы и оптимизация',
      level: 'Junior+',
      q: 'Какие типы индексов бывают?',
      a: 'B-tree (по умолчанию), Hash, GIN, GiST, BRIN (PostgreSQL), Full-text. B-tree — универсальный для сравнений и сортировки.',
      explain: 'GIN — для JSONB и массивов. BRIN — для больших таблиц с естественной сортировкой. Hash — только для равенства.\n\n```sql\nCREATE INDEX idx ON t USING GIN (data);\n```\n\nТипичная ошибка — использовать B-tree для полнотекстового поиска.',
      wrong: [
        'Только B-tree.',
        'Только Hash.',
        'Индексы бывают только уникальными.'
      ]
    },
    {
      id: 'sql-index-3',
      subtopic: 'Индексы и оптимизация',
      level: 'Middle',
      q: 'Что такое составной индекс и правило левого префикса?',
      a: 'Индекс по нескольким столбцам: (last_name, first_name). Работает для запросов по last_name или (last_name, first_name), но не по first_name отдельно — это правило левого префикса.',
      explain: 'Порядок столбцов в индексе важен. Для запросов по first_name нужен отдельный индекс.\n\n```sql\nCREATE INDEX idx ON users(last_name, first_name);\n```\n\nТипичная ошибка — создать индекс (a, b) и ждать ускорения запросов по b.',
      wrong: [
        'Составной индекс работает по любому столбцу.',
        'Составной индекс — это два отдельных индекса.',
        'Составной индекс работает только с числами.'
      ]
    },
    {
      id: 'sql-index-4',
      subtopic: 'Индексы и оптимизация',
      level: 'Middle+',
      q: 'Что такое EXPLAIN и EXPLAIN ANALYZE?',
      a: 'EXPLAIN показывает план запроса без выполнения. EXPLAIN ANALYZE выполняет запрос и показывает реальное время, количество строк, узкие места.',
      explain: 'План показывает узлы: Seq Scan, Index Scan, Hash Join. ANALYZE добавляет actual time и rows.\n\n```sql\nEXPLAIN ANALYZE SELECT * FROM users WHERE id = 1;\n```\n\nТипичная ошибка — читать план без ANALYZE и гадать о стоимости.',
      wrong: [
        'EXPLAIN выполняет запрос и показывает результат.',
        'EXPLAIN ANALYZE только строит план без выполнения.',
        'EXPLAIN работает только с SELECT.'
      ]
    },
    {
      id: 'sql-index-5',
      subtopic: 'Индексы и оптимизация',
      level: 'Senior',
      q: 'Какие причины могут помешать использованию индекса?',
      a: 'Функция на столбце (WHERE LOWER(name) = ...), неявное приведение типов, LIKE с % в начале, OR, низкая селективность, устаревшая статистика. Решения: функциональные индексы, переписывание запроса, ANALYZE.',
      explain: 'Функциональный индекс: CREATE INDEX ON users(LOWER(name)). Это позволяет индексировать выражение.\n\n```sql\nCREATE INDEX idx_lower ON users(LOWER(name));\n```\n\nТипичная ошибка — оборачивать столбец в функцию и терять индекс.',
      wrong: [
        'Индекс используется всегда, если он есть.',
        'Индекс не работает только с NULL.',
        'Индекс не работает только с текстом.'
      ]
    },

    // ================= ТРАНЗАКЦИИ =================
    {
      id: 'sql-tx-1',
      subtopic: 'Транзакции и блокировки',
      level: 'Junior+',
      q: 'Что такое транзакция?',
      a: 'Группа операций, выполняемых как единое целое: либо все успешно, либо все откатываются. Начинается с BEGIN, завершается COMMIT или ROLLBACK.',
      explain: 'Транзакция обеспечивает атомарность. При ошибке можно откатить все изменения.\n\n```sql\nBEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;\n```\n\nТипичная ошибка — забыть COMMIT и держать блокировки.',
      wrong: [
        'Одиночный запрос SELECT.',
        'Копия базы данных.',
        'Индекс для ускорения запросов.'
      ]
    },
    {
      id: 'sql-tx-2',
      subtopic: 'Транзакции и блокировки',
      level: 'Junior+',
      q: 'Что такое ACID?',
      a: 'Atomicity (атомарность), Consistency (согласованность), Isolation (изоляция), Durability (долговечность). Четыре свойства надёжной транзакции.',
      explain: 'Atomicity — всё или ничего. Consistency — переход из одного валидного состояния в другое. Isolation — параллельные транзакции не мешают. Durability — после COMMIT данные сохранены.\n\n```sql\nCOMMIT; -- гарантия Durability\n```\n\nТипичная ошибка — путать ACID с BASE.',
      wrong: [
        'Четыре типа индексов.',
        'Четыре уровня изоляции.',
        'Четыре типа JOIN.'
      ]
    },
    {
      id: 'sql-tx-3',
      subtopic: 'Транзакции и блокировки',
      level: 'Middle',
      q: 'Какие уровни изоляции транзакций знаешь?',
      a: 'READ UNCOMMITTED (грязное чтение), READ COMMITTED (по умолчанию в PostgreSQL), REPEATABLE READ (по умолчанию в MySQL), SERIALIZABLE (полная изоляция).',
      explain: 'Чем выше уровень, тем меньше аномалий и больше блокировок. SERIALIZABLE может давать ошибки сериализации.\n\n```sql\nBEGIN ISOLATION LEVEL SERIALIZABLE;\n```\n\nТипичная ошибка — использовать SERIALIZABLE везде без необходимости.',
      wrong: [
        'Только READ COMMITTED и SERIALIZABLE.',
        'Только SERIALIZABLE.',
        'Уровни изоляции не поддерживаются в SQL.'
      ]
    },
    {
      id: 'sql-tx-4',
      subtopic: 'Транзакции и блокировки',
      level: 'Middle+',
      q: 'Что такое грязное чтение, неповторяющееся чтение и фантомное чтение?',
      a: 'Грязное — чтение незакоммиченных данных. Неповторяющееся — повторный SELECT даёт другие данные. Фантомное — повторный SELECT даёт новые строки. Решаются уровнями изоляции.',
      explain: 'READ COMMITTED решает грязное чтение. REPEATABLE READ — неповторяющееся. SERIALIZABLE — фантомное.\n\n```sql\n-- аномалии исчезают с ростом уровня изоляции\n```\n\nТипичная ошибка — путать неповторяющееся и фантомное чтение.',
      wrong: [
        'Это синонимы.',
        'Все три решаются только SERIALIZABLE.',
        'Это типы JOIN.'
      ]
    },
    {
      id: 'sql-tx-5',
      subtopic: 'Транзакции и блокировки',
      level: 'Senior',
      q: 'Что такое дедлок и как его избежать?',
      a: 'Ситуация, когда две транзакции ждут ресурсы друг друга. БД обнаруживает и откатывает одну. Профилактика: одинаковый порядок доступа к таблицам, короткие транзакции, блокировки в одном порядке.',
      explain: 'PostgreSQL автоматически обнаруживает дедлок по таймауту deadlock_timeout. Одна транзакция откатывается с ошибкой.\n\n```sql\n-- порядок блокировок должен быть одинаковым\n```\n\nТипичная ошибка — длинные транзакции с блокировками в разном порядке.',
      wrong: [
        'Дедлок — это ошибка в SQL-запросе.',
        'Дедлок нельзя обнаружить.',
        'Дедлок решается увеличением таймаута.'
      ]
    },

    // ================= НОРМАЛИЗАЦИЯ =================
    {
      id: 'sql-norm-1',
      subtopic: 'Нормализация и проектирование',
      level: 'Junior+',
      q: 'Что такое нормализация?',
      a: 'Процесс организации данных для устранения избыточности и аномалий. Разбиение на таблицы с связями. Цель — целостность и экономия места.',
      explain: 'Нормализация уменьшает дублирование и аномалии вставки/обновления/удаления. Но увеличивает число JOIN.\n\n```sql\n-- вместо города в каждой строке — отдельная таблица cities\n```\n\nТипичная ошибка — нормализовать всё до 3NF без нужды.',
      wrong: [
        'Объединение всех данных в одну таблицу.',
        'Создание индексов на все столбцы.',
        'Шифрование данных.'
      ]
    },
    {
      id: 'sql-norm-2',
      subtopic: 'Нормализация и проектирование',
      level: 'Middle',
      q: 'Что такое 1NF, 2NF, 3NF?',
      a: '1NF — атомарные значения, нет повторяющихся групп. 2NF — 1NF + нет частичной зависимости от составного ключа. 3NF — 2NF + нет транзитивных зависимостей.',
      explain: '1NF запрещает массивы в ячейке. 2NF убирает зависимость от части ключа. 3NF убирает зависимость неключевых столбцов друг от друга.\n\n```sql\n-- 3NF: city_id вместо city_name, если city_name зависит от city_id\n```\n\nТипичная ошибка — путать 2NF и 3NF.',
      wrong: [
        '1NF, 2NF, 3NF — уровни изоляции транзакций.',
        '1NF — это PRIMARY KEY.',
        '3NF — это денормализация.'
      ]
    },
    {
      id: 'sql-norm-3',
      subtopic: 'Нормализация и проектирование',
      level: 'Middle+',
      q: 'Когда нужна денормализация?',
      a: 'Когда JOIN\'ы становятся узким местом, а данные читаются чаще, чем пишутся. Примеры: аналитические витрины, кэширующие столбцы, materialized view. Плата — риск рассинхронизации.',
      explain: 'Денормализация ускоряет чтение, но усложняет запись. Требует поддержки целостности вручную или триггерами.\n\n```sql\n-- кэш: orders.total хранится, а не считается\n```\n\nТипичная ошибка — денормализовать преждевременно.',
      wrong: [
        'Денормализация нужна всегда.',
        'Денормализация — это удаление индексов.',
        'Денормализация запрещена в продакшене.'
      ]
    },
    {
      id: 'sql-norm-4',
      subtopic: 'Нормализация и проектирование',
      level: 'Middle+',
      q: 'Что такое связь многие-ко-многим и как её реализовать?',
      a: 'Связь, где одна строка A связана с многими B, и наоборот. Реализуется через промежуточную таблицу: users — user_roles — roles. В промежуточной таблице составной PRIMARY KEY.',
      explain: 'Промежуточная таблица содержит два внешних ключа. Составной PRIMARY KEY гарантирует уникальность пары.\n\n```sql\nCREATE TABLE user_roles (\n  user_id INT REFERENCES users(id),\n  role_id INT REFERENCES roles(id),\n  PRIMARY KEY (user_id, role_id)\n);\n```\n\nТипичная ошибка — хранить массив id в одной таблице.',
      wrong: [
        'Реализуется через внешний ключ в одной из таблиц.',
        'Реализуется через массив в столбце.',
        'Многие-ко-многим в SQL невозможна.'
      ]
    },

    // ================= ХРАНИМЫЕ ПРОЦЕДУРЫ =================
    {
      id: 'sql-proc-1',
      subtopic: 'Хранимые процедуры и триггеры',
      level: 'Middle',
      q: 'Что такое хранимая процедура?',
      a: 'Именованный блок SQL-кода, сохраняемый в БД и вызываемый по имени. Может принимать параметры, возвращать значения, содержать логику. Пример: CREATE PROCEDURE ... CALL procedure_name().',
      explain: 'Процедура хранится на сервере и выполняется там же. Это экономит трафик и переиспользует логику.\n\n```sql\nCREATE PROCEDURE add_user(name TEXT) AS $$ BEGIN INSERT INTO users(name) VALUES (name); END; $$ LANGUAGE plpgsql;\n```\n\nТипичная ошибка — дублировать логику между приложением и процедурой.',
      wrong: [
        'Обычный SELECT-запрос.',
        'Индекс для ускорения запросов.',
        'Триггер, срабатывающий автоматически.'
      ]
    },
    {
      id: 'sql-proc-2',
      subtopic: 'Хранимые процедуры и триггеры',
      level: 'Middle+',
      q: 'Что такое триггер?',
      a: 'Функция, автоматически выполняемая при событии (INSERT, UPDATE, DELETE) на таблице. Используется для аудита, валидации, каскадных действий. Пример: CREATE TRIGGER ... AFTER INSERT ON users ...',
      explain: 'Триггеры могут быть BEFORE или AFTER, FOR EACH ROW или FOR EACH STATEMENT. Скрытая логика усложняет отладку.\n\n```sql\nCREATE TRIGGER audit AFTER INSERT ON users FOR EACH ROW EXECUTE FUNCTION log_insert();\n```\n\nТипичная ошибка — злоупотреблять триггерами и терять контроль над логикой.',
      wrong: [
        'Ручной вызов процедуры.',
        'Индекс для ускорения вставки.',
        'Ограничение CHECK.'
      ]
    },
    {
      id: 'sql-proc-3',
      subtopic: 'Хранимые процедуры и триггеры',
      level: 'Senior',
      q: 'Плюсы и минусы хранимых процедур?',
      a: 'Плюсы: производительность (ближе к данным), переиспользование, безопасность. Минусы: сложнее версионировать, отладка, переносимость между СУБД, логика размазывается между кодом и БД.',
      explain: 'Процедуры уменьшают трафик, но их сложнее тестировать в CI. Миграции и версионирование требуют дисциплины.\n\n```sql\n-- версионирование через миграции\n```\n\nТипичная ошибка — переносить всю бизнес-логику в БД.',
      wrong: [
        'Только плюсы, минусов нет.',
        'Только минусы, плюсов нет.',
        'Хранимые процедуры устарели и не используются.'
      ]
    },

    // ================= БЕЗОПАСНОСТЬ =================
    {
      id: 'sql-sec-1',
      subtopic: 'Безопасность',
      level: 'Middle',
      q: 'Что такое SQL-инъекция?',
      a: 'Атака, при которой вредоносный SQL внедряется через пользовательский ввод. Пример: " OR 1=1 --. Защита — параметризованные запросы (prepared statements), валидация, минимальные права.',
      explain: 'Инъекция возможна при конкатенации строк. Параметризация отделяет код от данных.\n\n```sql\n-- плохо: "SELECT * FROM users WHERE name = \'" + name + "\'"\n-- хорошо: SELECT * FROM users WHERE name = $1\n```\n\nТипичная ошибка — экранировать кавычки вручную вместо параметризации.',
      wrong: [
        'Ошибка в SQL-запросе.',
        'Атака на сеть, не связанная с SQL.',
        'Способ ускорить запрос.'
      ]
    },
    {
      id: 'sql-sec-2',
      subtopic: 'Безопасность',
      level: 'Middle+',
      q: 'Как prepared statements защищают от SQL-инъекций?',
      a: 'Запрос и данные передаются раздельно. БД сначала компилирует запрос с плейсхолдерами ($1, ?), потом подставляет значения как данные, а не как SQL-код.',
      explain: 'Значения не интерпретируются как SQL. Даже если ввести " OR 1=1 --, это будет строкой, а не условием.\n\n```sql\nPREPARE q AS SELECT * FROM users WHERE name = $1;\nEXECUTE q("Robert"); DROP TABLE users; --");\n```\n\nТипичная ошибка — думать, что prepared statements экранируют вручную.',
      wrong: [
        'Prepared statements экранируют кавычки вручную.',
        'Prepared statements запрещают любые запросы с параметрами.',
        'Prepared statements работают только с числами.'
      ]
    },
    {
      id: 'sql-sec-3',
      subtopic: 'Безопасность',
      level: 'Middle+',
      q: 'Что такое принцип наименьших привилегий?',
      a: 'Пользователь/приложение получает только те права, которые нужны для работы. Пример: приложению не нужен DROP TABLE — только SELECT/INSERT/UPDATE. Ограничивает ущерб при взломе.',
      explain: 'Отдельные роли для чтения и записи. Миграции выполняются под отдельным пользователем.\n\n```sql\nGRANT SELECT, INSERT, UPDATE ON users TO app_user;\n```\n\nТипичная ошибка — использовать суперпользователя в приложении.',
      wrong: [
        'Приложение должно иметь права суперпользователя.',
        'Принцип применяется только к администраторам.',
        'Принцип запрещает использовать индексы.'
      ]
    },

    // ================= ДИАЛЕКТЫ =================
    {
      id: 'sql-dialect-1',
      subtopic: 'Диалекты SQL',
      level: 'Middle',
      q: 'Чем LIMIT в PostgreSQL/MySQL отличается от TOP в MSSQL?',
      a: 'PostgreSQL/MySQL/SQLite: LIMIT 10 OFFSET 20. MSSQL: SELECT TOP 10 ... или OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY. Oracle: FETCH FIRST 10 ROWS ONLY.',
      explain: 'Синтаксис различается, но смысл один. При переносе запросов между СУБД это частая правка.\n\n```sql\n-- PostgreSQL\nSELECT * FROM t LIMIT 10;\n-- MSSQL\nSELECT TOP 10 * FROM t;\n```\n\nТипичная ошибка — использовать LIMIT в MSSQL.',
      wrong: [
        'Во всех СУБД используется LIMIT.',
        'В PostgreSQL используется TOP.',
        'LIMIT работает только в MySQL.'
      ]
    },
    {
      id: 'sql-dialect-2',
      subtopic: 'Диалекты SQL',
      level: 'Middle+',
      q: 'Чем автоинкремент отличается в PostgreSQL и MySQL?',
      a: 'PostgreSQL: SERIAL / BIGSERIAL или GENERATED ALWAYS AS IDENTITY. MySQL: AUTO_INCREMENT. MSSQL: IDENTITY(1,1).',
      explain: 'SERIAL создаёт sequence. IDENTITY — стандартный синтаксис. AUTO_INCREMENT — MySQL-специфичный.\n\n```sql\n-- PostgreSQL\nid INT GENERATED ALWAYS AS IDENTITY\n-- MySQL\nid INT AUTO_INCREMENT\n```\n\nТипичная ошибка — писать AUTO_INCREMENT в PostgreSQL.',
      wrong: [
        'Во всех СУБД AUTO_INCREMENT.',
        'В PostgreSQL AUTO_INCREMENT.',
        'Автоинкремент не поддерживается в PostgreSQL.'
      ]
    },
    {
      id: 'sql-dialect-3',
      subtopic: 'Диалекты SQL',
      level: 'Senior',
      q: 'Чем UPSERT отличается в PostgreSQL, MySQL и SQLite?',
      a: 'PostgreSQL: INSERT ... ON CONFLICT (id) DO UPDATE. MySQL: INSERT ... ON DUPLICATE KEY UPDATE. SQLite: INSERT ... ON CONFLICT (id) DO UPDATE (с 3.24).',
      explain: 'PostgreSQL и SQLite используют ON CONFLICT. MySQL — ON DUPLICATE KEY. Семантика похожа.\n\n```sql\n-- PostgreSQL\nINSERT INTO t (id, v) VALUES (1, "a") ON CONFLICT (id) DO UPDATE SET v = EXCLUDED.v;\n```\n\nТипичная ошибка — использовать синтаксис MySQL в PostgreSQL.',
      wrong: [
        'Во всех СУБД UPSERT синтаксис одинаков.',
        'UPSERT есть только в MySQL.',
        'UPSERT запрещён в PostgreSQL.'
      ]
    }
  ]
});