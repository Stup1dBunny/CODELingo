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
      explain: 'Ядро — только часть системы. Пользовательское окружение (coreutils, systemd, пакетный менеджер) отличает дистрибутивы друг от друга.\n\n```bash\nuname -r   # версия ядра\ndeb --version # версия дистрибутива\n```\n\nТипичная ошибка — путать ядро и дистрибутив.',
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
      explain: 'find гибче: ищет по имени, типу, размеру, дате. ls показывает только текущий уровень.\n\n```bash\nfind /var/log -name "*.log" -mtime -1\n```\n\nТипичная ошибка — использовать ls для рекурсивного поиска.',
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
      explain: 'r=4, w=2, x=1. chmod 755 даёт rwxr-xr-x. Специальные биты: setuid, setgid, sticky.\n\n```bash\nchmod 644 file.txt\nchown user:group file.txt\n```\n\nТипичная ошибка — использовать chmod 777 по умолчанию.',
      wrong: [
        'Через cat file — покажет содержимое, не права.',
        'Через file file — покажет тип файла.',
        'Через stat только размер файла.'
      ]
    },
    {
      id: 'devops-linux-4',
      subtopic: 'Linux на уровне системного администратора',
      level: 'Junior-',
      q: 'Что такое суперпользователь root?',
      a: 'Пользователь с UID 0, имеющий полный доступ ко всем файлам и командам. Обычно вход под root ограничен, используется sudo для выполнения команд от имени root.',
      explain: 'sudo логирует команды и позволяет точечно давать права. Прямой вход под root опасен.\n\n```bash\nsudo systemctl restart nginx\n```\n\nТипичная ошибка — работать под root постоянно.',
      wrong: [
        'Обычный пользователь с расширенными правами на чтение.',
        'Группа пользователей с доступом к сети.',
        'Служебная учётная запись для гостевого входа.'
      ]
    },
    {
      id: 'devops-linux-5',
      subtopic: 'Linux на уровне системного администратора',
      level: 'Junior-',
      q: 'Как посмотреть запущенные процессы?',
      a: 'Через ps aux — все процессы, top/htop — интерактивный монитор, pgrep — поиск по имени, systemctl status — статус службы.',
      explain: 'ps — снимок, top — динамика. pgrep удобен для скриптов.\n\n```bash\nps aux | grep nginx\npgrep -a nginx\n```\n\nТипичная ошибка — искать процессы через ls /proc.',
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
      explain: 'reload перечитывает конфиг без перезапуска (если поддерживается). enable создаёт симлинк в wants.\n\n```bash\nsystemctl enable --now nginx\n```\n\nТипичная ошибка — использовать service вместо systemctl.',
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
      explain: 'journalctl хранит логи в бинарном журнале. Для анализа — -p err, --disk-usage.\n\n```bash\njournalctl -u nginx -f\njournalctl --since "1 hour ago" -p err\n```\n\nТипичная ошибка — искать всё только в /var/log/syslog.',
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
      explain: 'Можно исчерпать inode при миллионах мелких файлов, хотя место на диске останется.\n\n```bash\ndf -i   # использование inode\n```\n\nТипичная ошибка — путать нехватку места и нехватку inode.',
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
      explain: 'Hard link нельзя создать на директорию. Symlink может быть битым (dangling).\n\n```bash\nln file hardlink\nln -s file symlink\n```\n\nТипичная ошибка — ждать, что hard link работает между разделами.',
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
      explain: 'df показывает файловую систему, du — конкретные каталоги. Они могут расходиться из-за удалённых, но открытых файлов.\n\n```bash\ndu -ah /var | sort -rh | head -20\n```\n\nТипичная ошибка — искать большие файлы через ls -l.',
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
      explain: 'Load включает процессы в D-state (ожидание I/O). Высокий load при низком CPU может означать проблему с диском.\n\n```bash\nuptime\nnproc\n```\n\nТипичная ошибка — сравнивать load с 1 без учёта числа ядер.',
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
      explain: 'ed25519 короче и безопаснее RSA. Публичный ключ попадает в ~/.ssh/authorized_keys.\n\n```bash\nssh-keygen -t ed25519\nssh-copy-id user@host\n```\n\nТипичная ошибка — копировать приватный ключ на сервер.',
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
      explain: 'systemd использует cgroups для ограничений. Это надёжнее ulimit, который действует только на сессию.\n\n```ini\n[Service]\nMemoryLimit=512M\nCPUQuota=50%\n```\n\nТипичная ошибка — менять unit без daemon-reload.',
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
      explain: 'Namespaces дают иллюзию отдельной системы, cgroups — квоты. Вместе это контейнер.\n\n```bash\nunshare --pid --fork bash\n```\n\nТипичная ошибка — путать изоляцию и ограничение.',
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
      explain: 'iowait — время, когда CPU ждёт диск. Высокий iowait при низком CPU = узкое место диск.\n\n```bash\niostat -x 1\niotop -o\n```\n\nТипичная ошибка — смотреть только top и не видеть диск.',
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
      explain: 'OOM Killer срабатывает, когда память и swap исчерпаны. oom_score зависит от потребления памяти и приоритета.\n\n```bash\necho -1000 > /proc/$(pidof nginx)/oom_score_adj\n```\n\nТипичная ошибка — игнорировать OOM и видеть загадочные перезапуски.',
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
      explain: 'active-backup — один активный, остальные в резерве. LACP требует поддержки на switch.\n\n```bash\nnmcli con add type bond ifname bond0 mode active-backup\n```\n\nТипичная ошибка — настраивать LACP без поддержки на коммутаторе.',
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
      explain: '/usr/bin/env ищет интерпретатор в PATH, что переносимее. Без shebang файл запустится текущей оболочкой.\n\n```bash\n#!/usr/bin/env bash\n```\n\nТипичная ошибка — забыть shebang и получить странное поведение.',
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
      explain: 'chmod +x добавляет бит выполнения. Без него ./script.sh даст "Permission denied".\n\n```bash\nchmod +x deploy.sh\n./deploy.sh\n```\n\nТипичная ошибка — использовать chmod 777.',
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
      explain: '$@ сохраняет разделение аргументов, $* склеивает в одну строку. Для циклов используйте "$@".\n\n```bash\necho "Аргументов: $#"\nfor arg in "$@"; do echo "$arg"; done\n```\n\nТипичная ошибка — использовать $* вместо "$@".',
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
      explain: '[[ ]] безопаснее [ ]: не требует кавычек и поддерживает регулярки. Пробелы внутри скобок обязательны.\n\n```bash\nif [[ -f "$file" ]]; then echo "exists"; fi\n```\n\nТипичная ошибка — забыть пробелы вокруг скобок.',
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
      explain: 'for по глобу перебирает файлы. Для безопасной работы с пробелами используйте "$file".\n\n```bash\nfor f in *.log; do echo "$f"; done\n```\n\nТипичная ошибка — for f in $(ls) с пробелами в именах.',
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
      explain: '2>&1 объединяет stderr и stdout. Порядок важен: command > file 2>&1.\n\n```bash\ncmd > out.log 2>&1\n```\n\nТипичная ошибка — путать > и >>.',
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
      explain: 'set -euo pipefail — стандартный набор для надёжных скриптов. trap EXIT гарантирует очистку.\n\n```bash\nset -euo pipefail\ntrap "rm -f $tmp" EXIT\n```\n\nТипичная ошибка — не использовать set -e и продолжать после ошибки.',
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
      explain: 'argparse автоматически строит -h и валидирует типы. Для сложных CLI — click или typer.\n\n```python\nimport argparse\np = argparse.ArgumentParser()\np.add_argument("--name", required=True)\nargs = p.parse_args()\n```\n\nТипичная ошибка — парсить sys.argv вручную.',
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
      explain: 'with гарантирует закрытие даже при исключении. Для больших файлов — итерация по строкам.\n\n```python\nwith open("data.txt") as f:\n    for line in f:\n        print(line.strip())\n```\n\nТипичная ошибка — открывать файл без with и забыть close.',
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
      explain: 'Список аргументов безопаснее строки: не нужен shell=True. check=True бросает исключение при ошибке.\n\n```python\nsubprocess.run(["ls", "-l"], check=True, capture_output=True, text=True)\n```\n\nТипичная ошибка — использовать os.system и терять вывод.',
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
      explain: 'Ловите конкретные исключения, а не всё подряд. else выполняется, если исключения не было.\n\n```python\ntry:\n    f = open("x")\nexcept FileNotFoundError:\n    pass\nfinally:\n    print("done")\n```\n\nТипичная ошибка — except: pass и скрытие ошибок.',
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
      explain: '${arr[@]} раскрывается в отдельные элементы, ${arr[*]} — в одну строку. Для безопасности — кавычки.\n\n```bash\narr=(one two three)\nfor x in "${arr[@]}"; do echo "$x"; done\n```\n\nТипичная ошибка — использовать arr=(1,2,3) с запятыми.',
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
      explain: 'GIL мешает параллельным вычислениям в потоках. Для CPU — multiprocessing. Для сетевого I/O — asyncio.\n\n```python\nimport asyncio\nasync def main():\n    await asyncio.sleep(1)\nasyncio.run(main())\n```\n\nТипичная ошибка — использовать threading для CPU-задач.',
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
      explain: '-print0 разделяет имена нулевым байтом, xargs -0 читает их. Это единственный безопасный способ.\n\n```bash\nfind . -name "*.log" -print0 | xargs -0 wc -l\n```\n\nТипичная ошибка — for f in $(ls) и пробелы в именах.',
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
      explain: 'У каждого разработчика полная копия репозитория. Распределённость позволяет работать офлайн и иметь несколько удалённых репозиториев.\n\n```bash\ngit clone https://github.com/user/repo.git\n```\n\nТипичная ошибка — путать Git (инструмент) и GitHub/GitLab (хостинг).',
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
      explain: 'switch и restore — современные替代 checkout. stash временно прячет изменения.\n\n```bash\ngit switch -c feature/login\ngit stash\ngit stash pop\n```\n\nТипичная ошибка — использовать checkout для всего.',
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
      explain: 'fetch безопасен: можно посмотреть diff до слияния. pull сразу меняет рабочую ветку.\n\n```bash\ngit fetch origin\ngit log HEAD..origin/main\n```\n\nТипичная ошибка — делать pull без просмотра изменений.',
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
      explain: 'Ветка — лёгкий указатель, не копия файлов. Переключение мгновенное.\n\n```bash\ngit branch feature\ngit switch feature\n```\n\nТипичная ошибка — думать, что ветка копирует весь репозиторий.',
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
      explain: 'Конфликт — не ошибка, а сигнал, что Git не может решить автоматически. После правки файла — git add и git commit (или git merge --continue).\n\n```bash\ngit status   # покажет конфликтующие файлы\ngit add file\ngit commit\n```\n\nТипичная ошибка — оставить маркеры конфликта в коде.',
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
      explain: 'rebase нельзя делать для публичных веток: переписывание хешей ломает чужие копии. Для локальных feature-веток — норм.\n\n```bash\ngit rebase main\ngit merge main\n```\n\nТипичная ошибка — rebase в main после push.',
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
      explain: 'Omnibus-пакет ставит все компоненты сразу. В крупных инсталляциях их разносят по нодам.\n\n```bash\ngitlab-ctl status\n```\n\nТипичная ошибка — путать GitLab с простым хостингом Git.',
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
      explain: 'После правки gitlab.rb — обязательный reconfigure. gitlab-rake — для миграций и бэкапов.\n\n```bash\ngitlab-ctl reconfigure\ngitlab-rake gitlab:check\n```\n\nТипичная ошибка — менять конфиг без reconfigure.',
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
      explain: 'Бэкап не включает конфиги и секреты. Их нужно копировать отдельно.\n\n```bash\ngitlab-backup create\ntar -czf gitlab-config.tar.gz /etc/gitlab\n```\n\nТипичная ошибка — восстановить бэкап без конфигов.',
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
      explain: 'Executor docker изолирует сборки. Теги позволяют направлять джобы на конкретные раннеры.\n\n```bash\ngitlab-runner register --url https://gitlab.com --token XXX\n```\n\nТипичная ошибка — запускать раннер без тегов и получать неожиданные задачи.',
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
      explain: 'Protected branches защищают ключевые ветки от случайных изменений. Можно разрешить push только maintainers.\n\n```yaml\n# Настройка в Settings → Repository → Protected branches\n```\n\nТипичная ошибка — не защищать main и получать поломки.',
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
      explain: 'GitLab поддерживает reference architecture для разных масштабов. Ключевые узкие места — Gitaly и PostgreSQL.\n\n```yaml\n# Gitaly на отдельной ноде\n```\n\nТипичная ошибка — масштабировать только Rails-ноду.',
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
      explain: 'LDAP даёт единый вход и автоматическое отключение уволенных. SAML — через IdP (Okta, Keycloak).\n\n```ruby\ngitlab_rails[`ldap_enabled`] = true\ngitlab_rails[`ldap_servers`] = YAML.load_file(`/etc/gitlab/ldap.yml`)\n```\n\nТипичная ошибка — дублировать пользователей в LDAP и GitLab.',
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
      explain: 'CI ловит ошибки рано. CD ускоряет выпуск. Deployment — полностью автоматический, Delivery — с ручным подтверждением.\n\n```yaml\n# .gitlab-ci.yml\nstages: [build, test, deploy]\n```\n\nТипичная ошибка — путать Delivery и Deployment.',
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
      explain: 'Контейнеры используют namespaces и cgroups. Образы хранятся в registry.\n\n```bash\ndocker run -d -p 8080:80 nginx\n```\n\nТипичная ошибка — путать контейнеры и виртуальные машины.',
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
      explain: 'Образы состоят из слоёв, кэшируются. Контейнеры можно создавать и удалять быстро.\n\n```bash\ndocker images\ndocker ps -a\n```\n\nТипичная ошибка — путать образ и контейнер.',
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
      explain: 'docker exec — зайти в работающий контейнер. docker logs — посмотреть вывод. docker system prune — очистка.\n\n```bash\ndocker exec -it container_id bash\ndocker logs -f container_id\n```\n\nТипичная ошибка — удалять контейнеры без остановки.',
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
      explain: 'ENTRYPOINT — основная команда, CMD — аргументы по умолчанию. Один Dockerfile — один образ.\n\n```dockerfile\nFROM node:20-alpine\nWORKDIR /app\nCOPY . .\nRUN npm ci\nCMD ["node", "index.js"]\n```\n\nТипичная ошибка — путать CMD и ENTRYPOINT.',
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
      explain: 'Ansible не требует установки агента на целевые хосты. Идемпотентность — ключевое свойство модулей.\n\n```yaml\n- hosts: web\n  tasks:\n    - apt: name=nginx state=present\n```\n\nТипичная ошибка — писать bash-скрипты вместо модулей.',
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
      explain: 'Пайплайн описывается YAML. Jobs выполняются на раннерах. Артефакты и кэш передаются между стадиями.\n\n```yaml\nbuild:\n  stage: build\n  script: make build\n```\n\nТипичная ошибка — запускать тяжёлые задачи на shared runner.',
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
      explain: 'По умолчанию падение job останавливает пайплайн. allow_failure: true отключает это.\n\n```yaml\nstages: [build, test, deploy]\n```\n\nТипичная ошибка — ожидать последовательного выполнения jobs одного stage.',
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
      explain: 'Role разбивает playbook на переиспользуемые части. Inventory может быть статическим или динамическим.\n\n```yaml\n- hosts: web\n  roles:\n    - nginx\n```\n\nТипичная ошибка — держать всё в одном огромном playbook.',
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
      explain: 'Compose подходит для локальной разработки и небольших деплоев. Для продакшена — Kubernetes или Swarm.\n\n```yaml\nservices:\n  web:\n    image: nginx\n  db:\n    image: postgres\n```\n\nТипичная ошибка — использовать Compose для оркестрации в проде.',
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
      explain: 'Jenkins старше и гибче, но требует обслуживания. GitLab CI удобнее, если уже есть GitLab.\n\n```groovy\n// Jenkinsfile\npipeline { agent any; stages { ... } }\n```\n\nТипичная ошибка — выбирать Jenkins только из привычки.',
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
      explain: 'Кэш слоёв работает, пока не изменится инструкция. Копирование package.json до кода ускоряет сборку.\n\n```dockerfile\nFROM node:20-alpine AS build\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\n```\n\nТипичная ошибка — копировать всё и терять кэш.',
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
      explain: 'Kubernetes декларативен: вы описываете желаемое состояние, а контроллеры его поддерживают. Pod — минимальная единица.\n\n```yaml\napiVersion: apps/v1\nkind: Deployment\n```\n\nТипичная ошибка — использовать Kubernetes для одного контейнера.',
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
      explain: 'Идемпотентность позволяет безопасно перезапускать playbook. Состояние описывается декларативно.\n\n```yaml\n- apt: name=nginx state=present\n```\n\nТипичная ошибка — использовать command/shell и терять идемпотентность.',
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
      explain: 'IaaS — виртуальные машины, PaaS — платформа, SaaS — готовое ПО. Оплата по факту использования.\n\n```bash\naws ec2 describe-instances\n```\n\nТипичная ошибка — путать модели обслуживания.',
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
      explain: 'AWS предлагает сотни сервисов. Регионы и зоны доступности обеспечивают гео-распределение.\n\n```bash\naws s3 ls\n```\n\nТипичная ошибка — использовать один регион без резервирования.',
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
      explain: 'Тип инстанса определяет CPU/память/сеть. EBS — сетевой диск, привязанный к AZ.\n\n```bash\naws ec2 run-instances --image-id ami-xxx --instance-type t3.micro\n```\n\nТипичная ошибка — выбирать инстанс без учёта нагрузки.',
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
      explain: 'S3 не файловая система, а объектное хранилище. Ключи — плоское пространство имён.\n\n```bash\naws s3 cp file.txt s3://bucket/\n```\n\nТипичная ошибка — использовать S3 как ФС для БД.',
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
      explain: 'Роли дают временные credentials сервисам. Политики описывают allow/deny.\n\n```json\n{ "Effect": "Allow", "Action": "s3:GetObject", "Resource": "*" }\n```\n\nТипичная ошибка — использовать root-аккаунт для повседневных задач.',
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
      explain: 'Public subnet имеет маршрут в internet gateway. Private — через NAT для исходящего трафика.\n\n```bash\naws ec2 create-vpc --cidr-block 10.0.0.0/16\n```\n\nТипичная ошибка — размещать БД в public subnet.',
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
      explain: 'RDS Multi-AZ даёт отказоустойчивость. Read replicas — масштабирование чтения.\n\n```bash\naws rds create-db-instance --db-instance-class db.t3.micro\n```\n\nТипичная ошибка — выбирать EC2 ради «контроля» без необходимости.',
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
      explain: 'Lambda масштабируется автоматически. Холодный старт может влиять на задержку.\n\n```bash\naws lambda invoke --function-name my-fn out.json\n```\n\nТипичная ошибка — использовать Lambda для длительных задач.',
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
      explain: 'Logs Insights позволяет запрашивать логи. Alarms уведомляют через SNS.\n\n```bash\naws cloudwatch put-metric-alarm --alarm-name high-cpu\n```\n\nТипичная ошибка — не настраивать алерты и узнавать о проблемах от пользователей.',
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
      explain: 'AZ — изолированные дата-центры внутри региона. Multi-AZ защищает от отказа одной зоны.\n\n```bash\naws elbv2 create-load-balancer --subnets subnet-a subnet-b\n```\n\nТипичная ошибка — размещать всё в одной AZ.',
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
      explain: 'Terraform хранит состояние в state-файле. Plan показывает изменения до применения.\n\n```hcl\nresource "aws_instance" "web" {\n  ami = "ami-xxx"\n  instance_type = "t3.micro"\n}\n```\n\nТипичная ошибка — менять инфраструктуру вручную и терять state.',
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
      explain: 'Spot дешевле On-Demand, но может быть прерван. Reserved — скидка за обязательство.\n\n```bash\naws ce get-cost-and-usage --time-period Start=2025-01-01,End=2025-01-31\n```\n\nТипичная ошибка — оставлять неиспользуемые ресурсы.',
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
      explain: 'CodePipeline оркестрирует этапы. CodeDeploy поддерживает Blue/Green и Canary.\n\n```yaml\n# buildspec.yml\nphases:\n  build:\n    commands:\n      - npm run build\n```\n\nТипичная ошибка — деплоить без возможности отката.',
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
      explain: 'JVM абстрагирует ОС: один байт-код работает везде. JIT компилирует горячие методы в машинный код.\n\n```bash\njava -version\n```\n\nТипичная ошибка — путать JVM и JRE.',
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
      explain: 'Для запуска приложения достаточно JRE. Для сборки — JDK.\n\n```bash\njavac Main.java   # нужен JDK\njava Main          # достаточно JRE\n```\n\nТипичная ошибка — ставить JRE на сборочный сервер.',
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
      explain: 'Параметры JVM идут до -jar, аргументы приложения — после. Это частая путаница.\n\n```bash\njava -Xmx512m -jar app.jar --port=8080\n```\n\nТипичная ошибка — ставить параметры JVM после -jar.',
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
      explain: 'Каждый поток имеет свой stack. Heap общий для всех потоков.\n\n```bash\njava -Xmx1g -Xss512k -jar app.jar\n```\n\nТипичная ошибка — путать OutOfMemoryError и StackOverflowError.',
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
      explain: '-Xms и -Xmx часто ставят равными в проде, чтобы избежать ресайза heap. Metaspace — вместо PermGen.\n\n```bash\njava -Xms2g -Xmx2g -XX:+UseG1GC -jar app.jar\n```\n\nТипичная ошибка — не ограничивать heap и получить OOM.',
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
      explain: 'jps показывает pid и main class. jstack полезен для поиска deadlock.\n\n```bash\njps -l\njstack 12345 > threads.txt\n```\n\nТипичная ошибка — использовать только ps aux.',
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
      explain: 'Молодые объекты собираются чаще. G1 и ZGC дают низкие паузы. Full GC — самая долгая.\n\n```bash\n-XX:+UseG1GC -XX:MaxGCPauseMillis=200\n```\n\nТипичная ошибка — игнорировать паузы GC в latency-критичных приложениях.',
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
      explain: 'Утечка — объекты, на которые есть ссылки, но они не нужны. MAT показывает dominator tree.\n\n```bash\njmap -dump:live,format=b,file=heap.bin 12345\n```\n\nТипичная ошибка — перезапускать приложение вместо анализа дампа.',
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
      explain: 'Tomcat — контейнер сервлетов, не полноценный Java EE-сервер. Spring Boot использует встроенный Tomcat.\n\n```bash\n$CATALINA_HOME/bin/startup.sh\ntail -f $CATALINA_HOME/logs/catalina.out\n```\n\nТипичная ошибка — смотреть только логи приложения, а не контейнера.',
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
      explain: 'Fat jar содержит все зависимости. Профили переключают конфиг: --spring.profiles.active=prod.\n\n```bash\njava -jar app.jar --spring.profiles.active=prod\n```\n\nТипичная ошибка — хардкодить конфиги вместо переменных окружения.',
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
      explain: 'JMX даёт метрики heap, потоков, GC. В проде лучше с authenticate=true и SSL.\n\n```bash\njava -Dcom.sun.management.jmxremote.port=9999 -jar app.jar\n```\n\nТипичная ошибка — открывать JMX без аутентификации в интернет.',
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
      explain: 'G1 — дефолт в современных JVM. ZGC даёт паузы <10 мс на больших heap.\n\n```bash\n-XX:+UseZGC -Xmx16g\n```\n\nТипичная ошибка — использовать Serial на сервере с большой нагрузкой.',
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
      explain: 'Async-profiler показывает flame graph и узкие места. Thread dump берут несколько раз подряд.\n\n```bash\njstack 12345 > t1.txt\njstack 12345 > t2.txt\n```\n\nТипичная ошибка — смотреть только средние метрики без перцентилей.',
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
      explain: 'Classloader загружает классы лениво. При передеплое старый classloader может держать ссылки и течь.\n\n```bash\njcmd 12345 GC.class_stats\n```\n\nТипичная ошибка — не учитывать утечки classloader в сервлет-контейнерах.',
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
      explain: 'Мониторинг отвечает на вопрос «что происходит сейчас и как менялось». Логи — «что случилось». Трейсинг — «где именно».\n\n```bash\n# сбор метрик через vmagent\n```\n\nТипичная ошибка — путать мониторинг и логирование.',
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
      explain: 'Метки позволяют фильтровать и агрегировать. Высокая cardinality меток — проблема.\n\n```promql\nnode_cpu_seconds_total{mode="idle"}\n```\n\nТипичная ошибка — добавлять уникальные значения (user_id) в метки.',
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
      explain: 'VM быстрее и экономичнее Prometheus на больших объёмах. Поддерживает Prometheus scrape configs.\n\n```bash\nvictoria-metrics -storageDataPath=/data\n```\n\nТипичная ошибка — мигрировать без проверки совместимости запросов.',
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
      explain: 'Grafana не хранит метрики, а запрашивает их из источника. Панели настраиваются через UI или JSON.\n\n```json\n{ "type": "timeseries", "targets": [{ "expr": "up" }] }\n```\n\nТипичная ошибка — строить дашборды без шаблонов и переменных.',
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
      explain: 'vmagent — замена Prometheus scrape. vminsert — приём в кластерной версии.\n\n```yaml\nscrape_configs:\n  - job_name: node\n    static_configs:\n      - targets: ["localhost:9100"]\n```\n\nТипичная ошибка — использовать pull и push одновременно без необходимости.',
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
      explain: 'Экспортер слушает HTTP и отдаёт /metrics. Прометеус или vmagent скрейпит его.\n\n```bash\nnode_exporter --web.listen-address=:9100\n```\n\nТипичная ошибка — писать свой экспортер вместо готового.',
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
      explain: 'rate считает скорость по counter. by группирует. histogram_quantile считает перцентили.\n\n```promql\nrate(http_requests_total[5m])\n```\n\nТипичная ошибка — использовать rate на gauge.',
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
      explain: 'Counter сбрасывается при рестарте, поэтому нужен rate. Histogram даёт перцентили через histogram_quantile.\n\n```promql\nhistogram_quantile(0.95, rate(http_duration_seconds_bucket[5m]))\n```\n\nТипичная ошибка — использовать counter без rate.',
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
      explain: 'Алерт срабатывает, когда условие выполняется заданное время. Silencing подавляет шум.\n\n```yaml\ngroups:\n  - name: example\n    rules:\n      - alert: HighCPU\n        expr: cpu > 90\n```\n\nТипичная ошибка — алертить на всё и получить alert fatigue.',
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
      explain: 'Prometheus хранит данные локально и не масштабируется горизонтально. VM решает это кластером.\n\n```bash\n# VM: vminsert, vmselect, vmstorage\n```\n\nТипичная ошибка — мигрировать на VM без оценки cardinality.',
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
      explain: 'vmagent заменяет Prometheus scrape. Может буферизовать при недоступности хранилища.\n\n```bash\nvmagent -promscrape.config=scrape.yml -remoteWrite.url=http://vm:8428\n```\n\nТипичная ошибка — использовать Prometheus для scrape при наличии VM.',
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
      explain: 'vmstorage шардирует данные. replicationFactor задаёт число копий. vmselect опрашивает все storage.\n\n```bash\n-replicationFactor=2\n```\n\nТипичная ошибка — масштабировать только vminsert без vmstorage.',
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
      explain: 'Каждая уникальная комбинация — отдельный временной ряд. Миллионы рядов = память и CPU.\n\n```promql\ncount by (__name__) ({__name__=~".+"})\n```\n\nТипичная ошибка — добавлять request_id в метки.',
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
      explain: 'Downsampling снижает детализацию старых данных. Retention удаляет устаревшее.\n\n```bash\n-retentionPeriod=12  # месяцев\n```\n\nТипичная ошибка — хранить все метрики вечно в полной детализации.',
      wrong: [
        'Хранить всё вечно.',
        'Удалять все метрики.',
        'Только в оперативной памяти.'
      ]
    }
  ]
});