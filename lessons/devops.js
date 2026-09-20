window.registerTheme({
  theme: 'DevOps',
  id: 6,
  questions: [
    // ================= 1. LINUX НА УРОВНЕ СИСТЕМНОГО АДМИНИСТРАТОРА =================
    {
      id: 'devops-linux-1',
      subtopic: 'Linux на уровне системного администратора',
      level: 'Junior-',
      q: 'Что такое Linux?',
      a: 'Семейство Unix-подобных операционных систем на базе ядра Linux. Ядро управляет процессами, памятью, устройствами и файловой системой. Дистрибутивы (Ubuntu, CentOS, Debian) добавляют пакетный менеджер и утилиты.',
      wrong: [
        'Конкретная ОС, разработанная одной компанией. Не имеет дистрибутивов и ядра.',
        'Графическая оболочка для Windows. Не является операционной системой.',
        'Язык программирования для работы с серверами.'
      ]
    },
    {
      id: 'devops-linux-2',
      subtopic: 'Linux на уровне системного администратора',
      level: 'Junior-',
      q: 'Какие основные команды навигации по файловой системе?',
      a: 'pwd — текущая директория, ls — список файлов, cd — переход, tree — дерево каталогов, find — поиск файлов.',
      wrong: [
        'Только cd и ls. Остальные команды отсутствуют в Linux.',
        'dir, copy, move — основные команды Linux.',
        'navigate, browse, explore — стандартные команды.'
      ]
    },
    {
      id: 'devops-linux-3',
      subtopic: 'Linux на уровне системного администратора',
      level: 'Junior-',
      q: 'Как посмотреть права доступа к файлу?',
      a: 'Через ls -l. Права выглядят как rwxr-xr-x: владелец, группа, остальные. Изменяются через chmod, владелец — через chown.',
      wrong: [
        'Через cat file — покажет содержимое, не права.',
        'Через file file — покажет тип файла.',
        'Через stat только размер файла.'
      ]
    },
    {
      id: 'devops-linux-4',
      subtopic: 'Linux на уровне системного администратора',
      level: 'Junior',
      q: 'Что такое суперпользователь root?',
      a: 'Пользователь с UID 0, имеющий полный доступ ко всем файлам и командам. Обычно вход под root ограничен, используется sudo для выполнения команд от имени root.',
      wrong: [
        'Обычный пользователь с расширенными правами на чтение.',
        'Группа пользователей с доступом к сети.',
        'Служебная учётная запись для гостевого входа.'
      ]
    },
    {
      id: 'devops-linux-5',
      subtopic: 'Linux на уровне системного администратора',
      level: 'Junior',
      q: 'Как посмотреть запущенные процессы?',
      a: 'Через ps aux — все процессы, top/htop — интерактивный монитор, pgrep — поиск по имени, systemctl status — статус службы.',
      wrong: [
        'Через ls /proc — покажет список файлов, не процессы.',
        'Через cat /etc/passwd — список пользователей.',
        'Через df -h — использование диска.'
      ]
    },
    {
      id: 'devops-linux-6',
      subtopic: 'Linux на уровне системного администратора',
      level: 'Junior+',
      q: 'Как управлять службами в systemd?',
      a: 'systemctl start/stop/restart/reload/enable/disable/status <service>. enable — автозапуск при загрузке, status — состояние.',
      wrong: [
        'service <name> start — устаревший способ, не работает в systemd.',
        'systemd <name> start — неверный синтаксис.',
        'initctl start <name> — для Upstart, не для systemd.'
      ]
    },
    {
      id: 'devops-linux-7',
      subtopic: 'Linux на уровне системного администратора',
      level: 'Junior+',
      q: 'Как посмотреть логи системы?',
      a: 'Через journalctl — логи systemd. journalctl -u <service> — по службе, -f — в реальном времени, --since "1 hour ago" — за период. Также /var/log/ для классических логов.',
      wrong: [
        'Только через cat /var/log/syslog.',
        'Через dmesg — только логи ядра.',
        'Через last — только входы пользователей.'
      ]
    },
    {
      id: 'devops-linux-8',
      subtopic: 'Linux на уровне системного администратора',
      level: 'Middle',
      q: 'Что такое inode и зачем он нужен?',
      a: 'Структура, хранящая метаданные файла: права, владелец, размер, время, ссылки на блоки данных. Имя файла хранится в директории, а inode — в файловой системе. Количество inode ограничено.',
      wrong: [
        'Имя файла в файловой системе.',
        'Содержимое файла.',
        'Тип файловой системы.'
      ]
    },
    {
      id: 'devops-linux-9',
      subtopic: 'Linux на уровне системного администратора',
      level: 'Middle',
      q: 'Чем жёсткая ссылка (hard link) отличается от символической (symlink)?',
      a: 'Hard link — ещё одно имя для того же inode, работает в пределах одной ФС. Symlink — отдельный файл со ссылкой на путь, может указывать на другой раздел и ломается при удалении цели.',
      wrong: [
        'Hard link работает между разными ФС, symlink — нет.',
        'Symlink хранит данные файла, hard link — только путь.',
        'Это одно и то же.'
      ]
    },
    {
      id: 'devops-linux-10',
      subtopic: 'Linux на уровне системного администратора',
      level: 'Middle',
      q: 'Как посмотреть использование диска и найти большие файлы?',
      a: 'df -h — использование разделов. du -sh /path — размер каталога. du -ah /path | sort -rh | head -20 — топ больших файлов.',
      wrong: [
        'Только через df -h.',
        'Через ls -l — покажет размеры, но не итог.',
        'Через free -h — это про память.'
      ]
    },
    {
      id: 'devops-linux-11',
      subtopic: 'Linux на уровне системного администратора',
      level: 'Middle',
      q: 'Что такое load average и как его интерпретировать?',
      a: 'Средняя нагрузка за 1, 5 и 15 минут. Показывает количество процессов в очереди на CPU и в непрерываемом сне. Норма зависит от числа ядер: load 4 при 4 ядрах — полная загрузка.',
      wrong: [
        'Процент использования CPU.',
        'Количество запущенных процессов.',
        'Объём использованной памяти.'
      ]
    },
    {
      id: 'devops-linux-12',
      subtopic: 'Linux на уровне системного администратора',
      level: 'Middle',
      q: 'Как настроить SSH-доступ без пароля?',
      a: 'Сгенерировать ключи ssh-keygen -t ed25519, скопировать публичный ключ на сервер через ssh-copy-id user@host. Приватный ключ хранится только у клиента.',
      wrong: [
        'Отключить пароль в /etc/passwd.',
        'Использовать telnet вместо SSH.',
        'Разрешить вход root без пароля.'
      ]
    },
    {
      id: 'devops-linux-13',
      subtopic: 'Linux на уровне системного администратора',
      level: 'Middle+',
      q: 'Как ограничить ресурсы процесса через systemd?',
      a: 'В unit-файле: MemoryLimit=512M, CPUQuota=50%, TasksMax=100. После изменения — systemctl daemon-reload и restart.',
      wrong: [
        'Через ulimit в /etc/profile — только для сессий.',
        'Через renice — только приоритет.',
        'Ограничить ресурсы в systemd нельзя.'
      ]
    },
    {
      id: 'devops-linux-14',
      subtopic: 'Linux на уровне системного администратора',
      level: 'Middle+',
      q: 'Что такое namespaces и cgroups в Linux?',
      a: 'Namespaces изолируют процессы (PID, network, mount, user). Cgroups ограничивают ресурсы (CPU, память, I/O). Основа контейнеризации (Docker, LXC).',
      wrong: [
        'Namespaces — это права доступа, cgroups — группы пользователей.',
        'Это одно и то же.',
        'Только для виртуальных машин.'
      ]
    },
    {
      id: 'devops-linux-15',
      subtopic: 'Linux на уровне системного администратора',
      level: 'Senior',
      q: 'Как диагностировать высокий I/O wait?',
      a: 'Через iostat -x 1, iotop, pidstat -d. Проверить, какой процесс грузит диск. Возможные причины: БД, логирование, swap. Решения: оптимизация запросов, вынос логов, добавление дисков.',
      wrong: [
        'Через top — покажет только CPU.',
        'Через free -h — покажет память.',
        'I/O wait диагностировать нельзя.'
      ]
    },
    {
      id: 'devops-linux-16',
      subtopic: 'Linux на уровне системного администратора',
      level: 'Senior',
      q: 'Как работает OOM Killer?',
      a: 'При нехватке памяти ядро выбирает процесс с высоким oom_score и убивает его. Настройка через /proc/<pid>/oom_score_adj. Защита критичных процессов — oom_score_adj = -1000.',
      wrong: [
        'OOM Killer убивает случайный процесс.',
        'OOM Killer убивает только root-процессы.',
        'OOM Killer отключает swap.'
      ]
    },
    {
      id: 'devops-linux-17',
      subtopic: 'Linux на уровне системного администратора',
      level: 'Senior',
      q: 'Как настроить сетевой bonding?',
      a: 'Объединяет несколько интерфейсов в один для отказоустойчивости или пропускной способности. Режимы: active-backup (1), LACP (4). Настраивается через nmcli или /etc/network/interfaces.',
      wrong: [
        'Bonding — это только для Wi-Fi.',
        'Bonding объединяет только IP-адреса.',
        'Bonding не поддерживается в Linux.'
      ]
    },

    // ================= 2. СКРИПТЫ BASH / PYTHON =================
    {
      id: 'devops-script-1',
      subtopic: 'Скрипты Bash и Python',
      level: 'Junior-',
      q: 'Что такое shebang в скрипте?',
      a: 'Первая строка вида #!/bin/bash или #!/usr/bin/env python3. Указывает, какой интерпретатор использовать при запуске файла.',
      wrong: [
        'Комментарий, игнорируемый системой.',
        'Название скрипта.',
        'Директива для компилятора.'
      ]
    },
    {
      id: 'devops-script-2',
      subtopic: 'Скрипты Bash и Python',
      level: 'Junior-',
      q: 'Как сделать скрипт исполняемым?',
      a: 'chmod +x script.sh. Затем запуск через ./script.sh или bash script.sh.',
      wrong: [
        'chmod 777 script.sh — избыточно и небезопасно.',
        'Запустить через sh script.sh без chmod.',
        'Переименовать в script.exe.'
      ]
    },
    {
      id: 'devops-script-3',
      subtopic: 'Скрипты Bash и Python',
      level: 'Junior',
      q: 'Какие переменные есть в Bash?',
      a: 'Пользовательские: NAME="value". Специальные: $0 — имя скрипта, $1..$9 — аргументы, $# — количество, $? — код возврата, $$ — PID, $@ — все аргументы.',
      wrong: [
        'Только пользовательские переменные.',
        'Только $1 и $2.',
        'Переменные в Bash отсутствуют.'
      ]
    },
    {
      id: 'devops-script-4',
      subtopic: 'Скрипты Bash и Python',
      level: 'Junior',
      q: 'Как проверить условие в Bash?',
      a: 'Через if [ condition ]; then ... fi. Числа: -eq, -ne, -lt, -gt. Строки: =, !=. Файлы: -f (файл), -d (директория), -e (существует).',
      wrong: [
        'Только через if (condition) { } — синтаксис C.',
        'Через if condition then — без скобок.',
        'Условия в Bash не поддерживаются.'
      ]
    },
    {
      id: 'devops-script-5',
      subtopic: 'Скрипты Bash и Python',
      level: 'Junior',
      q: 'Как работает цикл for в Bash?',
      a: 'for i in 1 2 3; do echo $i; done. Или C-стиль: for ((i=0; i<10; i++)); do ...; done. Также for file in *.txt.',
      wrong: [
        'Только for i in range(10) — как в Python.',
        'Только while.',
        'Циклы в Bash отсутствуют.'
      ]
    },
    {
      id: 'devops-script-6',
      subtopic: 'Скрипты Bash и Python',
      level: 'Junior+',
      q: 'Что такое pipe и перенаправление в Bash?',
      a: 'Pipe | передаёт stdout одной команды в stdin другой. > — перезапись файла, >> — добавление, 2> — stderr, &> — всё вместе.',
      wrong: [
        'Pipe — это только для файлов.',
        '> — добавление, >> — перезапись.',
        'Перенаправление работает только с echo.'
      ]
    },
    {
      id: 'devops-script-7',
      subtopic: 'Скрипты Bash и Python',
      level: 'Junior+',
      q: 'Как обрабатывать ошибки в Bash?',
      a: 'set -e — выход при ошибке, set -u — ошибка при необъявленной переменной, set -o pipefail — ошибка в pipe. Ловушка: trap "cleanup" EXIT.',
      wrong: [
        'Только через if [ $? -ne 0 ].',
        'Bash не поддерживает обработку ошибок.',
        'Через try/catch.'
      ]
    },
    {
      id: 'devops-script-8',
      subtopic: 'Скрипты Bash и Python',
      level: 'Middle',
      q: 'Как в Python прочитать аргументы командной строки?',
      a: 'Через sys.argv (простой список) или argparse (гибкий парсер с флагами, справкой, значениями по умолчанию).',
      wrong: [
        'Через input() — только интерактивный ввод.',
        'Через os.args — такого модуля нет.',
        'Аргументы в Python недоступны.'
      ]
    },
    {
      id: 'devops-script-9',
      subtopic: 'Скрипты Bash и Python',
      level: 'Middle',
      q: 'Как в Python работать с файлами?',
      a: 'Через with open("file", "r") as f: data = f.read(). Контекстный менеджер закрывает файл автоматически. Режимы: r, w, a, rb, wb.',
      wrong: [
        'Только через open() без закрытия.',
        'Через file.read() — без open.',
        'Через cat file.'
      ]
    },
    {
      id: 'devops-script-10',
      subtopic: 'Скрипты Bash и Python',
      level: 'Middle',
      q: 'Как в Python выполнить внешнюю команду?',
      a: 'Через subprocess.run(["ls", "-l"], capture_output=True, text=True). Возвращает объект с returncode, stdout, stderr.',
      wrong: [
        'Через os.system() — устаревший, без контроля вывода.',
        'Через exec() — для Python-кода, не для команд.',
        'Через eval() — небезопасно.'
      ]
    },
    {
      id: 'devops-script-11',
      subtopic: 'Скрипты Bash и Python',
      level: 'Middle+',
      q: 'Как в Python обрабатывать исключения?',
      a: 'Через try/except/finally. Можно ловить конкретные исключения: except FileNotFoundError as e. finally выполняется всегда. raise для повторного выброса.',
      wrong: [
        'Только через try/catch.',
        'Через if error: ...',
        'Исключения в Python не обрабатываются.'
      ]
    },
    {
      id: 'devops-script-12',
      subtopic: 'Скрипты Bash и Python',
      level: 'Middle+',
      q: 'Как в Bash работать с массивами?',
      a: 'arr=(1 2 3); echo ${arr[0]}; echo ${arr[@]}; echo ${#arr[@]}. Перебор: for i in "${arr[@]}".',
      wrong: [
        'Массивы в Bash отсутствуют.',
        'Только через arr[0]=1.',
        'Через list=(1,2,3) — с запятыми.'
      ]
    },
    {
      id: 'devops-script-13',
      subtopic: 'Скрипты Bash и Python',
      level: 'Senior',
      q: 'Как в Python работать с многопоточностью и многопроцессностью?',
      a: 'threading — потоки, ограничены GIL, подходят для I/O. multiprocessing — процессы, обходят GIL, подходят для CPU. asyncio — асинхронность для I/O.',
      wrong: [
        'Только threading.',
        'Только multiprocessing.',
        'Python не поддерживает параллелизм.'
      ]
    },
    {
      id: 'devops-script-14',
      subtopic: 'Скрипты Bash и Python',
      level: 'Senior',
      q: 'Как в Bash безопасно обрабатывать имена файлов с пробелами?',
      a: 'Использовать кавычки: for f in "$@"; do ...; done. Находить через find -print0 | xargs -0. Не использовать for f in $(ls).',
      wrong: [
        'Пробелы в именах файлов не поддерживаются.',
        'Через for f in $(ls) — стандартный способ.',
        'Через echo $(ls).'
      ]
    },

    // ================= 3. GIT И АДМИНИСТРИРОВАНИЕ GITLAB =================
    {
      id: 'devops-git-1',
      subtopic: 'Git и администрирование GitLab',
      level: 'Junior-',
      q: 'Что такое Git?',
      a: 'Распределённая система контроля версий. Хранит историю изменений, позволяет работать с ветками, сливать изменения, откатываться к прошлым версиям.',
      wrong: [
        'Централизованная система контроля версий.',
        'Файловый хостинг.',
        'Система сборки проектов.'
      ]
    },
    {
      id: 'devops-git-2',
      subtopic: 'Git и администрирование GitLab',
      level: 'Junior-',
      q: 'Какие основные команды Git?',
      a: 'git init, clone, add, commit, push, pull, status, log, diff, branch, checkout/switch, merge, rebase, stash.',
      wrong: [
        'Только commit и push.',
        'Только clone и pull.',
        'git save, git upload, git download.'
      ]
    },
    {
      id: 'devops-git-3',
      subtopic: 'Git и администрирование GitLab',
      level: 'Junior',
      q: 'Чем git fetch отличается от git pull?',
      a: 'fetch загружает изменения с удалённого репозитория, но не сливает. pull = fetch + merge (или rebase).',
      wrong: [
        'fetch сливает изменения, pull — только загружает.',
        'Это одно и то же.',
        'pull работает только с локальными ветками.'
      ]
    },
    {
      id: 'devops-git-4',
      subtopic: 'Git и администрирование GitLab',
      level: 'Junior',
      q: 'Что такое ветка в Git?',
      a: 'Указатель на коммит. Позволяет вести разработку параллельно. Основные: main/master, feature-ветки. Слияние через merge или rebase.',
      wrong: [
        'Копия всего репозитория.',
        'Тег версии.',
        'Удалённый репозиторий.'
      ]
    },
    {
      id: 'devops-git-5',
      subtopic: 'Git и администрирование GitLab',
      level: 'Junior+',
      q: 'Что такое merge conflict и как его решить?',
      a: 'Конфликт возникает, когда одни и те же строки изменены в разных ветках. Git помечает файл маркерами <<<<<<<, =======, >>>>>>>. Нужно вручную выбрать нужный вариант, затем git add и git commit.',
      wrong: [
        'Конфликт решается автоматически.',
        'Нужно удалить репозиторий.',
        'Конфликт возникает только при push.'
      ]
    },
    {
      id: 'devops-git-6',
      subtopic: 'Git и администрирование GitLab',
      level: 'Junior+',
      q: 'Чем merge отличается от rebase?',
      a: 'merge создаёт коммит слияния, сохраняя историю ветвления. rebase переносит коммиты на другую базу, делая историю линейной, но переписывает хеши.',
      wrong: [
        'rebase создаёт коммит слияния, merge — нет.',
        'Это одно и то же.',
        'merge работает только с main.'
      ]
    },
    {
      id: 'devops-git-7',
      subtopic: 'Git и администрирование GitLab',
      level: 'Middle',
      q: 'Что такое GitLab и какие у него основные компоненты?',
      a: 'Веб-платформа для Git-репозиториев. Компоненты: GitLab Rails (веб), Gitaly (Git-хранилище), PostgreSQL, Redis, Sidekiq (фоновые задачи), Runner (CI/CD).',
      wrong: [
        'Только веб-интерфейс для Git.',
        'Аналог GitHub без CI/CD.',
        'Только CI-сервер.'
      ]
    },
    {
      id: 'devops-git-8',
      subtopic: 'Git и администрирование GitLab',
      level: 'Middle',
      q: 'Как администрировать GitLab?',
      a: 'Через gitlab-ctl (start/stop/restart/reconfigure), /etc/gitlab/gitlab.rb (конфиг), gitlab-rake (бэкапы, миграции), Admin Area в веб-интерфейсе.',
      wrong: [
        'Только через веб-интерфейс.',
        'Через kubectl.',
        'Через docker-compose без настройки.'
      ]
    },
    {
      id: 'devops-git-9',
      subtopic: 'Git и администрирование GitLab',
      level: 'Middle',
      q: 'Как сделать бэкап GitLab?',
      a: 'gitlab-backup create — создаёт бэкап репозиториев, БД, настроек. Конфиги (/etc/gitlab) бэкапятся отдельно. Восстановление: gitlab-backup restore.',
      wrong: [
        'Через git clone всех репозиториев.',
        'Через pg_dump только БД.',
        'GitLab не поддерживает бэкапы.'
      ]
    },
    {
      id: 'devops-git-10',
      subtopic: 'Git и администрирование GitLab',
      level: 'Middle+',
      q: 'Как настроить GitLab Runner?',
      a: 'Установить gitlab-runner, зарегистрировать через gitlab-runner register с токеном из GitLab. Выбрать executor (docker, shell, kubernetes). Теги для маршрутизации задач.',
      wrong: [
        'Runner не требует регистрации.',
        'Только через веб-интерфейс.',
        'Через SSH без токена.'
      ]
    },
    {
      id: 'devops-git-11',
      subtopic: 'Git и администрирование GitLab',
      level: 'Middle+',
      q: 'Что такое protected branches в GitLab?',
      a: 'Ветки, в которые запрещён прямой push. Разрешены только merge requests с одобрением. Настраивается для main, release-веток. Повышает безопасность.',
      wrong: [
        'Ветки только для чтения.',
        'Ветки, удалённые из репозитория.',
        'Ветки с шифрованием.'
      ]
    },
    {
      id: 'devops-git-12',
      subtopic: 'Git и администрирование GitLab',
      level: 'Senior',
      q: 'Как масштабировать GitLab для большой команды?',
      a: 'Вынести Gitaly на отдельные ноды, использовать PostgreSQL HA (Patroni), Redis Sentinel, несколько Runner с автоскейлом, object storage (S3) для артефактов, load balancer.',
      wrong: [
        'Увеличить RAM на одном сервере.',
        'Использовать только SQLite.',
        'Отключить CI/CD.'
      ]
    },
    {
      id: 'devops-git-13',
      subtopic: 'Git и администрирование GitLab',
      level: 'Senior',
      q: 'Как настроить LDAP/SAML-аутентификацию в GitLab?',
      a: 'В gitlab.rb указать ldap_servers или omniauth_providers (SAML). После reconfigure пользователи входят через корпоративный каталог, группы маппятся на GitLab-группы.',
      wrong: [
        'Только через локальные учётные записи.',
        'Через SSH-ключи.',
        'LDAP в GitLab не поддерживается.'
      ]
    },

    // ================= 4. CI/CD, ANSIBLE, DOCKER =================
    {
      id: 'devops-cicd-1',
      subtopic: 'CI/CD, Ansible, Docker',
      level: 'Junior-',
      q: 'Что такое CI/CD?',
      a: 'Continuous Integration — автоматическая сборка и тестирование при каждом коммите. Continuous Delivery/Deployment — автоматическая доставка и развёртывание.',
      wrong: [
        'Только автоматическая сборка.',
        'Только ручное развёртывание.',
        'Система контроля версий.'
      ]
    },
    {
      id: 'devops-cicd-2',
      subtopic: 'CI/CD, Ansible, Docker',
      level: 'Junior-',
      q: 'Что такое Docker?',
      a: 'Платформа контейнеризации. Упаковывает приложение и зависимости в образ. Контейнеры изолированы, легче ВМ, используют ядро хоста.',
      wrong: [
        'Виртуальная машина.',
        'Система контроля версий.',
        'Оркестратор контейнеров.'
      ]
    },
    {
      id: 'devops-cicd-3',
      subtopic: 'CI/CD, Ansible, Docker',
      level: 'Junior',
      q: 'Чем образ Docker отличается от контейнера?',
      a: 'Образ — неизменяемый шаблон с файловой системой и метаданными. Контейнер — запущенный экземпляр образа с собственным слоем записи.',
      wrong: [
        'Это одно и то же.',
        'Контейнер — шаблон, образ — экземпляр.',
        'Образ можно запустить, контейнер — нет.'
      ]
    },
    {
      id: 'devops-cicd-4',
      subtopic: 'CI/CD, Ansible, Docker',
      level: 'Junior',
      q: 'Какие основные команды Docker?',
      a: 'docker build, run, ps, stop, rm, images, rmi, exec, logs, pull, push, compose up/down.',
      wrong: [
        'Только build и run.',
        'docker start, docker stop — без build.',
        'docker create, docker delete.'
      ]
    },
    {
      id: 'devops-cicd-5',
      subtopic: 'CI/CD, Ansible, Docker',
      level: 'Junior+',
      q: 'Что такое Dockerfile?',
      a: 'Текстовый файл с инструкциями для сборки образа: FROM, RUN, COPY, WORKDIR, ENV, EXPOSE, CMD, ENTRYPOINT. Каждая инструкция создаёт слой.',
      wrong: [
        'Файл с docker-compose.',
        'Скрипт для запуска контейнера.',
        'Конфиг Docker daemon.'
      ]
    },
    {
      id: 'devops-cicd-6',
      subtopic: 'CI/CD, Ansible, Docker',
      level: 'Junior+',
      q: 'Что такое Ansible?',
      a: 'Инструмент управления конфигурациями без агентов. Использует SSH, YAML-плейбуки, идемпотентные модули. Для настройки серверов, деплоя, оркестрации.',
      wrong: [
        'Оркестратор контейнеров.',
        'Система мониторинга.',
        'CI-сервер.'
      ]
    },
    {
      id: 'devops-cicd-7',
      subtopic: 'CI/CD, Ansible, Docker',
      level: 'Middle',
      q: 'Что такое GitLab CI?',
      a: 'Встроенный CI/CD в GitLab. Конфигурация в .gitlab-ci.yml: stages, jobs, scripts, runners. Запускается при push, merge request, по расписанию.',
      wrong: [
        'Отдельный сервер, не связанный с GitLab.',
        'Только для сборки Docker-образов.',
        'Аналог Jenkins без GitLab.'
      ]
    },
    {
      id: 'devops-cicd-8',
      subtopic: 'CI/CD, Ansible, Docker',
      level: 'Middle',
      q: 'Что такое stages и jobs в GitLab CI?',
      a: 'Stages — этапы (build, test, deploy), выполняются последовательно. Jobs — задачи внутри stage, выполняются параллельно. Если job падает — stage останавливается.',
      wrong: [
        'Stages и jobs — одно и то же.',
        'Jobs выполняются последовательно, stages — параллельно.',
        'Stages не поддерживаются.'
      ]
    },
    {
      id: 'devops-cicd-9',
      subtopic: 'CI/CD, Ansible, Docker',
      level: 'Middle',
      q: 'Что такое Ansible playbook, role, inventory?',
      a: 'Playbook — YAML-файл с задачами. Role — структурированный набор задач, шаблонов, переменных. Inventory — список хостов и групп.',
      wrong: [
        'Playbook — список хостов.',
        'Role — список задач без структуры.',
        'Inventory — YAML с задачами.'
      ]
    },
    {
      id: 'devops-cicd-10',
      subtopic: 'CI/CD, Ansible, Docker',
      level: 'Middle',
      q: 'Что такое Docker Compose?',
      a: 'Инструмент для запуска многоконтейнерных приложений. Конфиг в docker-compose.yml: services, networks, volumes. Команды: docker compose up/down.',
      wrong: [
        'Аналог Dockerfile.',
        'Оркестратор для Kubernetes.',
        'Только для одного контейнера.'
      ]
    },
    {
      id: 'devops-cicd-11',
      subtopic: 'CI/CD, Ansible, Docker',
      level: 'Middle+',
      q: 'Чем Jenkins отличается от GitLab CI?',
      a: 'Jenkins — standalone, плагины, Jenkinsfile, гибкий, но требует поддержки. GitLab CI — встроен в GitLab, YAML, проще, меньше плагинов.',
      wrong: [
        'Jenkins встроен в GitLab.',
        'GitLab CI требует отдельной установки.',
        'Это одно и то же.'
      ]
    },
    {
      id: 'devops-cicd-12',
      subtopic: 'CI/CD, Ansible, Docker',
      level: 'Middle+',
      q: 'Как оптимизировать Docker-образ?',
      a: 'Multi-stage build, минимальный базовый образ (alpine, distroless), объединение RUN, .dockerignore, порядок слоёв (зависимости до кода), не запускать от root.',
      wrong: [
        'Использовать ubuntu:latest.',
        'Добавить все файлы в один слой.',
        'Запускать от root.'
      ]
    },
    {
      id: 'devops-cicd-13',
      subtopic: 'CI/CD, Ansible, Docker',
      level: 'Senior',
      q: 'Что такое Kubernetes и зачем он нужен?',
      a: 'Оркестратор контейнеров. Управляет развёртыванием, масштабированием, самовосстановлением, балансировкой. Компоненты: API Server, etcd, scheduler, kubelet, ingress.',
      wrong: [
        'Аналог Docker Compose.',
        'Система мониторинга.',
        'CI-сервер.'
      ]
    },
    {
      id: 'devops-cicd-14',
      subtopic: 'CI/CD, Ansible, Docker',
      level: 'Senior',
      q: 'Как Ansible обеспечивает идемпотентность?',
      a: 'Модули проверяют текущее состояние и меняют только при необходимости. Повторный запуск не меняет систему. Например, apt: name=nginx state=present.',
      wrong: [
        'Ansible не идемпотентен.',
        'Через скрипты на bash.',
        'Через ручное сравнение.'
      ]
    },

    // ================= 5. ОБЛАЧНЫЕ ПРОВАЙДЕРЫ (AWS) =================
    {
      id: 'devops-cloud-1',
      subtopic: 'Облачные провайдеры (AWS)',
      level: 'Junior-',
      q: 'Что такое облачные вычисления?',
      a: 'Предоставление вычислительных ресурсов (серверы, хранилище, БД) через интернет по требованию. Модели: IaaS, PaaS, SaaS.',
      wrong: [
        'Только хранение файлов.',
        'Локальные серверы в дата-центре.',
        'Виртуальные машины без сети.'
      ]
    },
    {
      id: 'devops-cloud-2',
      subtopic: 'Облачные провайдеры (AWS)',
      level: 'Junior-',
      q: 'Что такое AWS?',
      a: 'Amazon Web Services — крупнейший облачный провайдер. Сервисы: EC2 (ВМ), S3 (хранилище), RDS (БД), Lambda (serverless), VPC (сеть).',
      wrong: [
        'Только хостинг сайтов.',
        'Система контроля версий.',
        'Оркестратор контейнеров.'
      ]
    },
    {
      id: 'devops-cloud-3',
      subtopic: 'Облачные провайдеры (AWS)',
      level: 'Junior',
      q: 'Что такое EC2?',
      a: 'Elastic Compute Cloud — виртуальные машины в AWS. Типы инстансов под разные задачи, EBS-диски, security groups, auto scaling.',
      wrong: [
        'Сервис хранения файлов.',
        'База данных.',
        'CDN.'
      ]
    },
    {
      id: 'devops-cloud-4',
      subtopic: 'Облачные провайдеры (AWS)',
      level: 'Junior',
      q: 'Что такое S3?',
      a: 'Simple Storage Service — объектное хранилище. Бакеты, объекты, версионирование, жизненный цикл, статический хостинг. Доступ через IAM-политики.',
      wrong: [
        'Файловая система для EC2.',
        'База данных.',
        'Очередь сообщений.'
      ]
    },
    {
      id: 'devops-cloud-5',
      subtopic: 'Облачные провайдеры (AWS)',
      level: 'Junior+',
      q: 'Что такое IAM в AWS?',
      a: 'Identity and Access Management. Управляет пользователями, группами, ролями, политиками. Принцип наименьших привилегий. Роли для сервисов, MFA для пользователей.',
      wrong: [
        'Сервис для хранения данных.',
        'Мониторинг.',
        'Виртуальная сеть.'
      ]
    },
    {
      id: 'devops-cloud-6',
      subtopic: 'Облачные провайдеры (AWS)',
      level: 'Junior+',
      q: 'Что такое VPC?',
      a: 'Virtual Private Cloud — изолированная сеть в AWS. Подсети (public/private), route tables, internet gateway, NAT gateway, security groups, NACL.',
      wrong: [
        'Сервис хранения.',
        'База данных.',
        'CDN.'
      ]
    },
    {
      id: 'devops-cloud-7',
      subtopic: 'Облачные провайдеры (AWS)',
      level: 'Middle',
      q: 'Чем RDS отличается от EC2 с БД?',
      a: 'RDS — управляемая БД: автоматические бэкапы, патчи, репликация, мониторинг. EC2 с БД — ручное управление. RDS проще, но меньше контроля.',
      wrong: [
        'RDS — это EC2 с MySQL.',
        'RDS не поддерживает репликацию.',
        'EC2 управляется автоматически.'
      ]
    },
    {
      id: 'devops-cloud-8',
      subtopic: 'Облачные провайдеры (AWS)',
      level: 'Middle',
      q: 'Что такое Lambda?',
      a: 'Serverless-вычисления. Запускает код по событию, платишь за время выполнения. Не нужно управлять серверами. Ограничения: время, память, размер.',
      wrong: [
        'Виртуальная машина.',
        'Контейнер.',
        'База данных.'
      ]
    },
    {
      id: 'devops-cloud-9',
      subtopic: 'Облачные провайдеры (AWS)',
      level: 'Middle',
      q: 'Что такое CloudWatch?',
      a: 'Сервис мониторинга AWS. Метрики, логи, алерты, дашборды. Интегрируется с EC2, RDS, Lambda. Можно отправлять кастомные метрики.',
      wrong: [
        'Сервис хранения.',
        'База данных.',
        'CDN.'
      ]
    },
    {
      id: 'devops-cloud-10',
      subtopic: 'Облачные провайдеры (AWS)',
      level: 'Middle+',
      q: 'Как обеспечить отказоустойчивость в AWS?',
      a: 'Multi-AZ: ресурсы в нескольких зонах доступности. Auto Scaling, ELB, RDS Multi-AZ, S3 Cross-Region Replication. Регионы для гео-изоляции.',
      wrong: [
        'Только один AZ.',
        'Ручное переключение.',
        'Отказоустойчивость не поддерживается.'
      ]
    },
    {
      id: 'devops-cloud-11',
      subtopic: 'Облачные провайдеры (AWS)',
      level: 'Middle+',
      q: 'Что такое Terraform и зачем он в AWS?',
      a: 'IaC-инструмент для описания инфраструктуры в коде. Провайдер AWS, state-файл, plan/apply. Позволяет версионировать и повторять инфраструктуру.',
      wrong: [
        'Система мониторинга.',
        'CI-сервер.',
        'Аналог Ansible без состояния.'
      ]
    },
    {
      id: 'devops-cloud-12',
      subtopic: 'Облачные провайдеры (AWS)',
      level: 'Senior',
      q: 'Как оптимизировать затраты в AWS?',
      a: 'Reserved Instances/Savings Plans, Spot Instances для прерываемых задач, right-sizing, auto scaling, S3 lifecycle, удаление неиспользуемых ресурсов, Cost Explorer.',
      wrong: [
        'Использовать только On-Demand.',
        'Увеличить все инстансы.',
        'Отключить мониторинг.'
      ]
    },
    {
      id: 'devops-cloud-13',
      subtopic: 'Облачные провайдеры (AWS)',
      level: 'Senior',
      q: 'Как настроить CI/CD в AWS?',
      a: 'CodePipeline + CodeBuild + CodeDeploy. Или GitLab CI с деплоем в AWS. Артефакты в S3, деплой в ECS/EKS/EC2, Blue/Green через CodeDeploy.',
      wrong: [
        'Только через Jenkins.',
        'Только вручную.',
        'AWS не поддерживает CI/CD.'
      ]
    },

    // ================= 6. АДМИНИСТРИРОВАНИЕ JAVA-ПРИЛОЖЕНИЙ =================
    {
      id: 'devops-java-1',
      subtopic: 'Администрирование Java-приложений',
      level: 'Junior-',
      q: 'Что такое JVM?',
      a: 'Java Virtual Machine — среда выполнения байт-кода Java. Загружает классы, управляет памятью (heap, stack), выполняет сборку мусора, JIT-компиляцию.',
      wrong: [
        'Компилятор Java.',
        'Операционная система.',
        'Веб-сервер.'
      ]
    },
    {
      id: 'devops-java-2',
      subtopic: 'Администрирование Java-приложений',
      level: 'Junior-',
      q: 'Что такое JRE и JDK?',
      a: 'JRE — среда выполнения (JVM + библиотеки). JDK — комплект разработчика (JRE + компилятор javac, утилиты).',
      wrong: [
        'JRE — для разработки, JDK — для запуска.',
        'Это одно и то же.',
        'JDK — только для Android.'
      ]
    },
    {
      id: 'devops-java-3',
      subtopic: 'Администрирование Java-приложений',
      level: 'Junior',
      q: 'Как запустить Java-приложение?',
      a: 'java -jar app.jar. Можно передать параметры JVM: java -Xmx512m -Xms256m -jar app.jar. Аргументы приложения — после jar.',
      wrong: [
        'Только через IDE.',
        'Через javac app.jar.',
        'Через jre app.jar.'
      ]
    },
    {
      id: 'devops-java-4',
      subtopic: 'Администрирование Java-приложений',
      level: 'Junior',
      q: 'Что такое heap и stack в Java?',
      a: 'Heap — общая память для объектов, управляется GC. Stack — память потока для локальных переменных и вызовов. Переполнение heap — OutOfMemoryError, stack — StackOverflowError.',
      wrong: [
        'Heap — для примитивов, stack — для объектов.',
        'Это одно и то же.',
        'Stack управляется GC.'
      ]
    },
    {
      id: 'devops-java-5',
      subtopic: 'Администрирование Java-приложений',
      level: 'Junior+',
      q: 'Какие основные параметры JVM?',
      a: '-Xms (начальный heap), -Xmx (максимальный heap), -XX:MetaspaceSize, -XX:+UseG1GC, -Dproperty=value, -Xlog:gc.',
      wrong: [
        'Только -Xmx.',
        'Только -Xms и -Xmx.',
        'Параметры JVM отсутствуют.'
      ]
    },
    {
      id: 'devops-java-6',
      subtopic: 'Администрирование Java-приложений',
      level: 'Junior+',
      q: 'Как посмотреть процессы Java?',
      a: 'jps — список Java-процессов. jstat -gc <pid> — статистика GC. jstack <pid> — дамп потоков. jmap -heap <pid> — heap. jcmd <pid> — общие команды.',
      wrong: [
        'Только через ps aux | grep java.',
        'Через top.',
        'Через jconsole только.'
      ]
    },
    {
      id: 'devops-java-7',
      subtopic: 'Администрирование Java-приложений',
      level: 'Middle',
      q: 'Что такое сборка мусора (GC)?',
      a: 'Автоматическое освобождение памяти от неиспользуемых объектов. Поколения: Young (Eden, Survivor), Old. Алгоритмы: Serial, Parallel, G1, ZGC, Shenandoah.',
      wrong: [
        'Ручное освобождение памяти.',
        'Только для stack.',
        'GC не влияет на производительность.'
      ]
    },
    {
      id: 'devops-java-8',
      subtopic: 'Администрирование Java-приложений',
      level: 'Middle',
      q: 'Как диагностировать утечку памяти в Java?',
      a: 'jmap -dump:live,format=b,file=heap.bin <pid> — дамп heap. Анализ через Eclipse MAT, VisualVM. jstat -gc — динамика. Причины: статические коллекции, слушатели, ThreadLocal.',
      wrong: [
        'Только через перезапуск.',
        'Через top.',
        'Утечки в Java невозможны.'
      ]
    },
    {
      id: 'devops-java-9',
      subtopic: 'Администрирование Java-приложений',
      level: 'Middle',
      q: 'Что такое Tomcat и как его администрировать?',
      a: 'Servlet-контейнер для Java-веб-приложений. Конфиги: server.xml, web.xml, context.xml. Логи: catalina.out. Управление: startup.sh/shutdown.sh, systemd.',
      wrong: [
        'База данных.',
        'Веб-сервер только для статики.',
        'Аналог Nginx.'
      ]
    },
    {
      id: 'devops-java-10',
      subtopic: 'Администрирование Java-приложений',
      level: 'Middle',
      q: 'Что такое Spring Boot и как его деплоить?',
      a: 'Фреймворк для Java-приложений. Собирается в fat jar, запускается java -jar. Конфиг: application.yml/properties, профили, переменные окружения. Встроенный Tomcat.',
      wrong: [
        'Только для Android.',
        'Требует внешний Tomcat всегда.',
        'Не поддерживает REST.'
      ]
    },
    {
      id: 'devops-java-11',
      subtopic: 'Администрирование Java-приложений',
      level: 'Middle+',
      q: 'Как настроить JMX для мониторинга Java?',
      a: 'Параметры: -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=9999 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false. Подключение через JConsole/VisualVM.',
      wrong: [
        'JMX не поддерживается.',
        'Только через логи.',
        'Через SSH.'
      ]
    },
    {
      id: 'devops-java-12',
      subtopic: 'Администрирование Java-приложений',
      level: 'Middle+',
      q: 'Как выбрать сборщик мусора?',
      a: 'G1 — универсальный, для heap 4–16 ГБ. ZGC/Shenandoah — для низких пауз (большие heap). Parallel — для throughput. Serial — для маленьких heap.',
      wrong: [
        'Всегда Serial.',
        'Всегда Parallel.',
        'GC не выбирается.'
      ]
    },
    {
      id: 'devops-java-13',
      subtopic: 'Администрирование Java-приложений',
      level: 'Senior',
      q: 'Как диагностировать высокую задержку в Java-приложении?',
      a: 'jstack — дампы потоков, поиск deadlock и блокировок. jstat -gc — паузы GC. Async-profiler — профилирование. Thread dump при нагрузке. Анализ логов и APM.',
      wrong: [
        'Только через перезапуск.',
        'Через увеличение heap.',
        'Задержки диагностировать нельзя.'
      ]
    },
    {
      id: 'devops-java-14',
      subtopic: 'Администрирование Java-приложений',
      level: 'Senior',
      q: 'Что такое classloader и его иерархия?',
      a: 'Bootstrap → Platform → Application → Custom. Делегирование родителю. Утечки classloader в контейнерах при передеплое. Диагностика через jcmd GC.class_stats.',
      wrong: [
        'Только один classloader.',
        'Classloader загружает только jar.',
        'Иерархии нет.'
      ]
    },

    // ================= 7. VICTORIA METRICS + GRAFANA =================
    {
      id: 'devops-mon-1',
      subtopic: 'Victoria Metrics и Grafana',
      level: 'Junior-',
      q: 'Что такое мониторинг?',
      a: 'Система сбора, хранения и визуализации метрик. Позволяет отслеживать состояние систем, находить проблемы, строить алерты.',
      wrong: [
        'Только логирование.',
        'Только визуализация.',
        'Резервное копирование.'
      ]
    },
    {
      id: 'devops-mon-2',
      subtopic: 'Victoria Metrics и Grafana',
      level: 'Junior-',
      q: 'Что такое метрика?',
      a: 'Числовое значение во времени: CPU, память, запросы. Имеет имя и метки (labels). Пример: node_cpu_seconds_total{mode="idle"}.',
      wrong: [
        'Текстовый лог.',
        'Событие.',
        'Конфигурация.'
      ]
    },
    {
      id: 'devops-mon-3',
      subtopic: 'Victoria Metrics и Grafana',
      level: 'Junior',
      q: 'Что такое VictoriaMetrics?',
      a: 'Быстрая TSDB (time series database), совместимая с Prometheus. Поддерживает PromQL, удалённое хранилище, кластеризацию. Экономичнее Prometheus по памяти.',
      wrong: [
        'Система логирования.',
        'CI-сервер.',
        'Оркестратор контейнеров.'
      ]
    },
    {
      id: 'devops-mon-4',
      subtopic: 'Victoria Metrics и Grafana',
      level: 'Junior',
      q: 'Что такое Grafana?',
      a: 'Платформа визуализации. Строит дашборды из разных источников: VictoriaMetrics, Prometheus, Elasticsearch, SQL. Поддерживает алерты и переменные.',
      wrong: [
        'База данных.',
        'Система сбора метрик.',
        'CI-сервер.'
      ]
    },
    {
      id: 'devops-mon-5',
      subtopic: 'Victoria Metrics и Grafana',
      level: 'Junior+',
      q: 'Как VictoriaMetrics собирает метрики?',
      a: 'Через pull (vmagent скрейпит экспортеры) или push (клиенты отправляют в vminsert). Поддерживает Prometheus scrape configs.',
      wrong: [
        'Только через push.',
        'Только через pull.',
        'Только через логи.'
      ]
    },
    {
      id: 'devops-mon-6',
      subtopic: 'Victoria Metrics и Grafana',
      level: 'Junior+',
      q: 'Что такое экспортер?',
      a: 'Сервис, отдающий метрики в формате Prometheus. Примеры: node_exporter (Linux), blackbox_exporter (проверки), postgres_exporter, jmx_exporter (Java).',
      wrong: [
        'Клиент для отправки логов.',
        'База данных.',
        'Визуализатор.'
      ]
    },
    {
      id: 'devops-mon-7',
      subtopic: 'Victoria Metrics и Grafana',
      level: 'Middle',
      q: 'Что такое PromQL?',
      a: 'Язык запросов Prometheus/VictoriaMetrics. Примеры: rate(http_requests_total[5m]), sum by (instance) (node_memory_MemFree_bytes), histogram_quantile(0.95, ...).',
      wrong: [
        'Язык разметки.',
        'SQL.',
        'Язык конфигурации.'
      ]
    },
    {
      id: 'devops-mon-8',
      subtopic: 'Victoria Metrics и Grafana',
      level: 'Middle',
      q: 'Какие типы метрик бывают?',
      a: 'Counter — только растёт (запросы). Gauge — может расти и падать (память). Histogram — распределение (время ответа). Summary — квантили.',
      wrong: [
        'Только Counter и Gauge.',
        'Только Histogram.',
        'Типов метрик нет.'
      ]
    },
    {
      id: 'devops-mon-9',
      subtopic: 'Victoria Metrics и Grafana',
      level: 'Middle',
      q: 'Как настроить алерт в Grafana?',
      a: 'Alert rules на основе запроса. Условие, длительность, severity. Notification channels: email, Slack, Telegram, PagerDuty. Группировка и silencing.',
      wrong: [
        'Только через email.',
        'Алерты в Grafana отсутствуют.',
        'Через скрипты на bash.'
      ]
    },
    {
      id: 'devops-mon-10',
      subtopic: 'Victoria Metrics и Grafana',
      level: 'Middle+',
      q: 'Чем VictoriaMetrics отличается от Prometheus?',
      a: 'VM быстрее, экономичнее по памяти, поддерживает кластеризацию, горизонтальное масштабирование. Prometheus проще, но ограничен одним сервером (без Thanos).',
      wrong: [
        'VM медленнее Prometheus.',
        'VM не поддерживает PromQL.',
        'Это одно и то же.'
      ]
    },
    {
      id: 'devops-mon-11',
      subtopic: 'Victoria Metrics и Grafana',
      level: 'Middle+',
      q: 'Что такое vmagent и зачем он нужен?',
      a: 'Агент для сбора и пересылки метрик в VictoriaMetrics. Поддерживает scrape configs, relabeling, буферизацию, несколько remote write.',
      wrong: [
        'Визуализатор.',
        'База данных.',
        'Экспортер.'
      ]
    },
    {
      id: 'devops-mon-12',
      subtopic: 'Victoria Metrics и Grafana',
      level: 'Senior',
      q: 'Как масштабировать VictoriaMetrics?',
      a: 'Кластерная версия: vminsert (приём), vmselect (чтение), vmstorage (хранение). Шардирование по метрикам, репликация, балансировка.',
      wrong: [
        'Только вертикально.',
        'VM не масштабируется.',
        'Через Prometheus.'
      ]
    },
    {
      id: 'devops-mon-13',
      subtopic: 'Victoria Metrics и Grafana',
      level: 'Senior',
      q: 'Что такое cardinality и как с ней работать?',
      a: 'Количество уникальных комбинаций меток. Высокая cardinality (метки с уникальными значениями: user_id, request_id) убивает производительность. Решения: агрегация, удаление лишних меток, recording rules.',
      wrong: [
        'Количество метрик.',
        'Количество серверов.',
        'Cardinality не влияет на производительность.'
      ]
    },
    {
      id: 'devops-mon-14',
      subtopic: 'Victoria Metrics и Grafana',
      level: 'Senior',
      q: 'Как настроить долгосрочное хранение метрик?',
      a: 'Downsampling (прореживание старых данных), retention policy, удалённое хранилище (S3), recording rules для агрегатов. В VM — enterprise downsampling.',
      wrong: [
        'Хранить всё вечно.',
        'Удалять все метрики.',
        'Только в оперативной памяти.'
      ]
    }
  ]
});