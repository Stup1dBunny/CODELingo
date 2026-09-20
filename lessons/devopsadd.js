window.registerTheme({
  theme: 'DevOps Advanced',
  id: 7,
  questions: [
    // ================= 1. KUBERNETES =================
    {
      id: 'devops-k8s-1',
      subtopic: 'Kubernetes',
      level: 'Junior-',
      q: 'Что такое Kubernetes?',
      a: 'Оркестратор контейнеров. Управляет развёртыванием, масштабированием, самовосстановлением, балансировкой и обновлениями приложений в кластере.',
      wrong: [
        'Платформа контейнеризации, как Docker.',
        'CI-сервер для сборки образов.',
        'Система мониторинга контейнеров.'
      ]
    },
    {
      id: 'devops-k8s-2',
      subtopic: 'Kubernetes',
      level: 'Junior-',
      q: 'Из каких компонентов состоит кластер Kubernetes?',
      a: 'Control plane: API Server, etcd, scheduler, controller-manager. Worker-ноды: kubelet, kube-proxy, container runtime. Плюс CNI, ingress, DNS (CoreDNS).',
      wrong: [
        'Только master и worker.',
        'Только API Server и kubelet.',
        'Docker daemon и kubectl.'
      ]
    },
    {
      id: 'devops-k8s-3',
      subtopic: 'Kubernetes',
      level: 'Junior',
      q: 'Что такое Pod?',
      a: 'Минимальная единица развёртывания. Один или несколько контейнеров с общим network namespace, IP, volumes. Обычно один контейнер на Pod.',
      wrong: [
        'Виртуальная машина.',
        'Docker-контейнер.',
        'Namespace в кластере.'
      ]
    },
    {
      id: 'devops-k8s-4',
      subtopic: 'Kubernetes',
      level: 'Junior',
      q: 'Чем Deployment отличается от Pod?',
      a: 'Deployment управляет ReplicaSet, который создаёт и пересоздаёт Pod. Обеспечивает rolling update, откат, масштабирование. Голый Pod не перезапускается при падении ноды.',
      wrong: [
        'Deployment — это Pod с другим именем.',
        'Pod управляет Deployment.',
        'Deployment работает только с StatefulSet.'
      ]
    },
    {
      id: 'devops-k8s-5',
      subtopic: 'Kubernetes',
      level: 'Junior',
      q: 'Какие основные типы Service в Kubernetes?',
      a: 'ClusterIP (внутренний), NodePort (порт на ноде), LoadBalancer (внешний LB), ExternalName (CNAME). Плюс Headless Service без ClusterIP.',
      wrong: [
        'Только ClusterIP и NodePort.',
        'Только LoadBalancer.',
        'Service — это Pod.'
      ]
    },
    {
      id: 'devops-k8s-6',
      subtopic: 'Kubernetes',
      level: 'Junior+',
      q: 'Что такое Ingress?',
      a: 'HTTP/HTTPS-роутер в кластер. Правила по хостам и путям, TLS-терминация. Требует Ingress Controller (nginx, traefik, HAProxy).',
      wrong: [
        'Тип Service.',
        'Балансировщик L4.',
        'Внутренний DNS.'
      ]
    },
    {
      id: 'devops-k8s-7',
      subtopic: 'Kubernetes',
      level: 'Junior+',
      q: 'Чем ConfigMap отличается от Secret?',
      a: 'ConfigMap — незашифрованные конфиги. Secret — чувствительные данные (base64, не шифрование). Оба монтируются как файлы или передаются в env. Для шифрования — etcd encryption, External Secrets, Vault.',
      wrong: [
        'Secret шифруется по умолчанию.',
        'ConfigMap только для env.',
        'Это одно и то же.'
      ]
    },
    {
      id: 'devops-k8s-8',
      subtopic: 'Kubernetes',
      level: 'Junior+',
      q: 'Какие основные kubectl-команды?',
      a: 'get, describe, logs, exec, apply, delete, create, port-forward, top, rollout, scale, cordon, drain, taint, label, annotate.',
      wrong: [
        'Только get, apply, delete.',
        'Только logs и exec.',
        'kubectl не поддерживает describe.'
      ]
    },
    {
      id: 'devops-k8s-9',
      subtopic: 'Kubernetes',
      level: 'Middle',
      q: 'Что такое liveness, readiness и startup probes?',
      a: 'liveness — перезапуск при зависании. readiness — исключение из балансировки при неготовности. startup — защита медленного старта от liveness. Настраиваются через httpGet, tcpSocket, exec.',
      wrong: [
        'Это одно и то же.',
        'Только liveness.',
        'Probes задаются только в Dockerfile.'
      ]
    },
    {
      id: 'devops-k8s-10',
      subtopic: 'Kubernetes',
      level: 'Middle',
      q: 'Что такое requests и limits?',
      a: 'requests — гарантированный минимум для планирования. limits — максимум, при превышении CPU throttling, память — OOMKill. QoS-классы: Guaranteed, Burstable, BestEffort.',
      wrong: [
        'Это одно и то же.',
        'limits — минимум, requests — максимум.',
        'Только для CPU.'
      ]
    },
    {
      id: 'devops-k8s-11',
      subtopic: 'Kubernetes',
      level: 'Middle',
      q: 'Почему Pod в состоянии CrashLoopBackOff и как дебажить?',
      a: 'kubectl describe pod — events, kubectl logs --previous — логи упавшего контейнера, kubectl exec — зайти, если жив. Причины: ошибка конфига, missing secret, OOM, неверный entrypoint, падение БД.',
      wrong: [
        'Только перезапустить Pod.',
        'Удалить и создать заново.',
        'CrashLoopBackOff не диагностируется.'
      ]
    },
    {
      id: 'devops-k8s-12',
      subtopic: 'Kubernetes',
      level: 'Middle',
      q: 'Что такое Pending Pod и как исправить?',
      a: 'Pod не может быть запланирован. Причины: нехватка ресурсов, nodeSelector/affinity, taints без tolerations, PVC не привязан. Диагностика: kubectl describe pod — events.',
      wrong: [
        'Pending — нормальное состояние.',
        'Только перезапуск ноды.',
        'Pending не диагностируется.'
      ]
    },
    {
      id: 'devops-k8s-13',
      subtopic: 'Kubernetes',
      level: 'Middle',
      q: 'Что такое StatefulSet и чем отличается от Deployment?',
      a: 'StatefulSet даёт стабильные имена Pod (pod-0, pod-1), стабильные PVC и порядок запуска/остановки. Для БД, Kafka, etcd. Deployment — для stateless.',
      wrong: [
        'Это одно и то же.',
        'StatefulSet только для stateless.',
        'Deployment даёт стабильные имена.'
      ]
    },
    {
      id: 'devops-k8s-14',
      subtopic: 'Kubernetes',
      level: 'Middle',
      q: 'Что такое DaemonSet?',
      a: 'Гарантирует запуск Pod на каждой (или выбранной) ноде. Для лог-агентов, мониторинга, CNI, storage.',
      wrong: [
        'Один Pod на кластер.',
        'Только для БД.',
        'Аналог Deployment.'
      ]
    },
    {
      id: 'devops-k8s-15',
      subtopic: 'Kubernetes',
      level: 'Middle+',
      q: 'Что такое Helm?',
      a: 'Пакетный менеджер для Kubernetes. Chart — шаблоны + values.yaml. Команды: helm install/upgrade/rollback/uninstall/template/lint. Есть репозитории (Artifact Hub).',
      wrong: [
        'Оркестратор.',
        'CI-сервер.',
        'Мониторинг.'
      ]
    },
    {
      id: 'devops-k8s-16',
      subtopic: 'Kubernetes',
      level: 'Middle+',
      q: 'Что такое namespace и зачем он нужен?',
      a: 'Логическая изоляция ресурсов внутри кластера. Квоты, RBAC, NetworkPolicy, resource limits per namespace. По умолчанию — default.',
      wrong: [
        'Физический сервер.',
        'Docker namespace.',
        'Только для мониторинга.'
      ]
    },
    {
      id: 'devops-k8s-17',
      subtopic: 'Kubernetes',
      level: 'Middle+',
      q: 'Как работает RBAC в Kubernetes?',
      a: 'Role/ClusterRole — права. RoleBinding/ClusterRoleBinding — привязка к user/group/serviceaccount. ServiceAccount — идентичность Pod. Принцип наименьших привилегий.',
      wrong: [
        'Только через kubeconfig.',
        'RBAC отсутствует в K8s.',
        'Через SSH-ключи.'
      ]
    },
    {
      id: 'devops-k8s-18',
      subtopic: 'Kubernetes',
      level: 'Middle+',
      q: 'Что такое NetworkPolicy?',
      a: 'Правила сетевого доступа между Pod. Требует CNI с поддержкой (Calico, Cilium). По умолчанию весь трафик разрешён — политика запрещает.',
      wrong: [
        'Правила firewall на ноде.',
        'Ingress-правила.',
        'Встроено в kube-proxy.'
      ]
    },
    {
      id: 'devops-k8s-19',
      subtopic: 'Kubernetes',
      level: 'Senior',
      q: 'Что такое ServiceAccount и как им пользоваться?',
      a: 'Идентичность для Pod. Создаётся ServiceAccount, монтируется токен, Pod получает права через RoleBinding. С K8s 1.24 токены временные (TokenRequest API).',
      wrong: [
        'Пользователь кластера.',
        'SSH-ключ.',
        'Docker credential.'
      ]
    },
    {
      id: 'devops-k8s-20',
      subtopic: 'Kubernetes',
      level: 'Senior',
      q: 'Что такое оператор в Kubernetes?',
      a: 'Custom Controller + CRD для управления сложными приложениями (БД, Kafka). Реализует domain-specific логику: бэкапы, failover, scaling. Примеры: Prometheus Operator, Postgres Operator.',
      wrong: [
        'Администратор кластера.',
        'Тип Service.',
        'Плагин kubectl.'
      ]
    },
    {
      id: 'devops-k8s-21',
      subtopic: 'Kubernetes',
      level: 'Senior',
      q: 'Как дебажить Pod, который не может подключиться к Service?',
      a: 'Проверить endpoints (kubectl get endpoints), селекторы Service vs Pod labels, DNS (nslookup внутри Pod), NetworkPolicy, readiness Pod. kubectl exec и curl изнутри.',
      wrong: [
        'Только перезапустить Pod.',
        'Только перезапустить Service.',
        'Дебажить нельзя.'
      ]
    },
    {
      id: 'devops-k8s-22',
      subtopic: 'Kubernetes',
      level: 'Senior',
      q: 'Как обновлять приложение без простоя?',
      a: 'RollingUpdate с maxSurge/maxUnavailable, readiness probes, PodDisruptionBudget, preStop hook, graceful shutdown (SIGTERM), lifecycle. Blue/Green или Canary через Service/Ingress.',
      wrong: [
        'Только остановить и запустить заново.',
        'Recreate.',
        'Обновление без простоя невозможно.'
      ]
    },
    {
      id: 'devops-k8s-23',
      subtopic: 'Kubernetes',
      level: 'Senior',
      q: 'Что такое PDB и зачем нужен?',
      a: 'PodDisruptionBudget ограничивает количество Pod, которые могут быть одновременно недоступны при добровольных disruption (drain, upgrade). minAvailable или maxUnavailable.',
      wrong: [
        'Лимит ресурсов.',
        'Правило affinity.',
        'Тип Service.'
      ]
    },
    {
      id: 'devops-k8s-24',
      subtopic: 'Kubernetes',
      level: 'Senior',
      q: 'Что такое CNI и какие плагины знаешь?',
      a: 'Container Network Interface — стандарт сети для Pod. Плагины: Calico (BGP, NetworkPolicy), Cilium (eBPF), Flannel (простой), Weave. Отвечает за IP-адресацию и маршрутизацию Pod.',
      wrong: [
        'Docker network.',
        'Только Calico.',
        'CNI встроен в kubelet.'
      ]
    },
    {
      id: 'devops-k8s-25',
      subtopic: 'Kubernetes',
      level: 'Senior',
      q: 'Что такое etcd и как его бэкапить?',
      a: 'Распределённое key-value хранилище состояния кластера. Бэкап: etcdctl snapshot save. Восстановление: snapshot restore. Хранить вне кластера, шифровать, тестировать restore.',
      wrong: [
        'База данных приложений.',
        'Мониторинг.',
        'etcd не требует бэкапа.'
      ]
    },
    {
      id: 'devops-k8s-26',
      subtopic: 'Kubernetes',
      level: 'Senior',
      q: 'Как обновить кластер Kubernetes без простоя?',
      a: 'Сначала control plane (по одной ноде), затем worker-ноды поочерёдно: cordon, drain, upgrade, uncordon. PDB, readiness probes, multi-master etcd. Проверить версии kubelet/kubeadm.',
      wrong: [
        'Обновить все ноды сразу.',
        'Пересоздать кластер.',
        'Обновление невозможно без простоя.'
      ]
    },

    // ================= 2. СЕТИ =================
    {
      id: 'devops-net-1',
      subtopic: 'Сети',
      level: 'Junior-',
      q: 'Что такое модель OSI и TCP/IP?',
      a: 'OSI: 7 уровней (physical, data link, network, transport, session, presentation, application). TCP/IP: 4 уровня (link, internet, transport, application). Для диагностики важны L3 (IP), L4 (TCP/UDP), L7 (HTTP).',
      wrong: [
        'OSI — 4 уровня, TCP/IP — 7.',
        'Это одно и то же.',
        'OSI не используется.'
      ]
    },
    {
      id: 'devops-net-2',
      subtopic: 'Сети',
      level: 'Junior-',
      q: 'Чем TCP отличается от UDP?',
      a: 'TCP — надёжный, с установкой соединения (3-way handshake), гарантией доставки, порядком, повторами. UDP — быстрый, без гарантий, для DNS, видео, игр, VoIP.',
      wrong: [
        'TCP быстрее UDP.',
        'UDP надёжнее TCP.',
        'Это одно и то же.'
      ]
    },
    {
      id: 'devops-net-3',
      subtopic: 'Сети',
      level: 'Junior',
      q: 'Что такое DNS и какие типы записей знаешь?',
      a: 'Domain Name System. Записи: A (IPv4), AAAA (IPv6), CNAME (алиас), MX (почта), TXT (SPF, DKIM), NS (серверы), SOA, PTR (reverse). TTL — время кэширования.',
      wrong: [
        'Только A и CNAME.',
        'Только A.',
        'DNS не использует типы записей.'
      ]
    },
    {
      id: 'devops-net-4',
      subtopic: 'Сети',
      level: 'Junior',
      q: 'Какие основные HTTP-статусы?',
      a: '1xx — info, 2xx — успех (200, 201, 204), 3xx — редирект (301, 302, 304), 4xx — ошибка клиента (400, 401, 403, 404, 429), 5xx — ошибка сервера (500, 502, 503, 504).',
      wrong: [
        'Только 200 и 404.',
        'Только 2xx и 5xx.',
        'HTTP-статусы не важны.'
      ]
    },
    {
      id: 'devops-net-5',
      subtopic: 'Сети',
      level: 'Junior',
      q: 'Чем 401 отличается от 403?',
      a: '401 Unauthorized — не аутентифицирован (нужен логин). 403 Forbidden — аутентифицирован, но нет прав. 404 — не найдено, 502 — bad gateway, 504 — gateway timeout.',
      wrong: [
        'Это одно и то же.',
        '401 — нет прав, 403 — не залогинен.',
        '401 — ошибка сервера.'
      ]
    },
    {
      id: 'devops-net-6',
      subtopic: 'Сети',
      level: 'Junior+',
      q: 'Как диагностировать сеть в Linux?',
      a: 'ping — доступность, traceroute/mtr — маршрут, dig/nslookup — DNS, ss/netstat — порты, tcpdump — трафик, curl -v — HTTP, ip a/route — интерфейсы.',
      wrong: [
        'Только ping.',
        'Только ifconfig.',
        'Сеть в Linux не диагностируется.'
      ]
    },
    {
      id: 'devops-net-7',
      subtopic: 'Сети',
      level: 'Junior+',
      q: 'Что такое NAT?',
      a: 'Network Address Translation — подмена адресов. SNAT (исходящий), DNAT (входящий, port forwarding), MASQUERADE (динамический SNAT). Позволяет частным сетям выходить в интернет.',
      wrong: [
        'Тип DNS-записи.',
        'Протокол шифрования.',
        'Балансировщик.'
      ]
    },
    {
      id: 'devops-net-8',
      subtopic: 'Сети',
      level: 'Middle',
      q: 'Чем балансировка L4 отличается от L7?',
      a: 'L4 (TCP/UDP) — быстрее, не понимает HTTP, балансирует по IP/порту. L7 (HTTP) — понимает заголовки, пути, куки, может терминировать TLS, делать sticky sessions. Примеры: L4 — NLB, L7 — ALB, nginx.',
      wrong: [
        'L7 быстрее L4.',
        'Это одно и то же.',
        'L4 работает только с HTTP.'
      ]
    },
    {
      id: 'devops-net-9',
      subtopic: 'Сети',
      level: 'Middle',
      q: 'Как работает TLS-рукопожатие?',
      a: 'ClientHello → ServerHello + сертификат → проверка сертификата → обмен ключами (ECDHE) → session keys → encrypted traffic. TLS 1.3 сократил до 1-RTT, поддерживает 0-RTT.',
      wrong: [
        'Только обмен сертификатами.',
        'Через SSH.',
        'TLS не использует сертификаты.'
      ]
    },
    {
      id: 'devops-net-10',
      subtopic: 'Сети',
      level: 'Middle',
      q: 'Что такое reverse proxy и зачем?',
      a: 'Прокси перед серверами: терминирует TLS, балансирует, кэширует, скрывает бэкенд, отдаёт статику, ограничивает rate. Примеры: nginx, HAProxy, Traefik, Envoy.',
      wrong: [
        'Прокси на стороне клиента.',
        'VPN.',
        'DNS-сервер.'
      ]
    },
    {
      id: 'devops-net-11',
      subtopic: 'Сети',
      level: 'Middle',
      q: 'Что такое MTU и зачем его менять?',
      a: 'Maximum Transmission Unit — максимальный размер пакета. Обычно 1500. При VPN/туннелях уменьшают (1400). Проблемы: фрагментация, PMTUD. Симптомы — «сайт открывается, но большие запросы висят».',
      wrong: [
        'Размер окна TCP.',
        'MTU менять нельзя.',
        'MTU — это DNS-запись.'
      ]
    },
    {
      id: 'devops-net-12',
      subtopic: 'Сети',
      level: 'Middle+',
      q: 'Что такое iptables/nftables и как их использовать?',
      a: 'Firewall в Linux. Таблицы: filter (INPUT/OUTPUT/FORWARD), nat (PREROUTING/POSTROUTING), mangle. nftables — современная замена. Docker и K8s активно используют iptables для NAT и маршрутизации.',
      wrong: [
        'Только для блокировки портов.',
        'Аналог SELinux.',
        'Не используется в K8s.'
      ]
    },
    {
      id: 'devops-net-13',
      subtopic: 'Сети',
      level: 'Middle+',
      q: 'Что такое keep-alive и зачем?',
      a: 'Постоянное TCP-соединение для нескольких HTTP-запросов. Экономит время на handshake. Настраивается на клиенте, сервере, LB. Долгий keep-alive может держать соединения и исчерпывать пул.',
      wrong: [
        'Способ шифрования.',
        'Тип DNS-записи.',
        'UDP-механизм.'
      ]
    },
    {
      id: 'devops-net-14',
      subtopic: 'Сети',
      level: 'Senior',
      q: 'Как диагностировать «сайт тормозит» на сетевом уровне?',
      a: 'mtr — потери по хопам, tcpdump — ретрансмиты, ss -ti — retrans, RTT, cwnd, nstat/ifstat — ошибки интерфейса, curl -w — тайминги (DNS, connect, TLS, TTFB). Проверить MTU, DNS, LB.',
      wrong: [
        'Только ping.',
        'Перезапустить сервер.',
        'Сеть не диагностируется.'
      ]
    },
    {
      id: 'devops-net-15',
      subtopic: 'Сети',
      level: 'Senior',
      q: 'Что такое BGP и где встречается?',
      a: 'Border Gateway Protocol — маршрутизация между автономными системами. В K8s — Calico BGP для Pod-сетей. В облаках — dynamic routing, VPN. В дата-центрах — ECMP, anycast.',
      wrong: [
        'Протокол шифрования.',
        'DNS-протокол.',
        'Только для интернета.'
      ]
    },

    // ================= 3. LINUX TROUBLESHOOTING =================
    {
      id: 'devops-linuxt-1',
      subtopic: 'Linux troubleshooting',
      level: 'Middle',
      q: 'Сервер «тормозит». С чего начнёшь диагностику?',
      a: 'top/htop — CPU и load, free -h — память, df -h — диск, iostat -x 1 — I/O, ss -s — сеть, dmesg — ошибки ядра. Затем углубление: pidstat, iotop, perf, strace.',
      wrong: [
        'Сразу перезагрузить.',
        'Только top.',
        'Проверить логи приложения.'
      ]
    },
    {
      id: 'devops-linuxt-2',
      subtopic: 'Linux troubleshooting',
      level: 'Middle',
      q: 'Что такое strace и когда его применять?',
      a: 'Трассировка системных вызовов процесса. strace -p <pid>, -f (follow forks), -e trace=file/network. Применяется, когда процесс висит, не открывает файл, не подключается к сети.',
      wrong: [
        'Мониторинг CPU.',
        'Сбор логов.',
        'Аналог top.'
      ]
    },
    {
      id: 'devops-linuxt-3',
      subtopic: 'Linux troubleshooting',
      level: 'Middle',
      q: 'Что такое lsof и как использовать?',
      a: 'List open files. lsof -p <pid> — файлы процесса, lsof -i :80 — кто слушает порт, lsof /path — кто держит файл. Полезно при «device busy» и «port already in use».',
      wrong: [
        'Список процессов.',
        'Мониторинг диска.',
        'Аналог ls.'
      ]
    },
    {
      id: 'devops-linuxt-4',
      subtopic: 'Linux troubleshooting',
      level: 'Middle',
      q: 'Как найти, какой процесс слушает порт?',
      a: 'ss -tlnp | grep :80 или lsof -i :80 или netstat -tlnp. Покажет PID и имя процесса. При отсутствии — проверить namespace (контейнеры, network namespaces).',
      wrong: [
        'Только netstat.',
        'Через ps aux.',
        'Порт определить нельзя.'
      ]
    },
    {
      id: 'devops-linuxt-5',
      subtopic: 'Linux troubleshooting',
      level: 'Middle+',
      q: 'Диск заполнен, но du показывает меньше, чем df. Почему?',
      a: 'Удалённые файлы, которые ещё держат процессы (lsof +L1). Занятые inode. Mount point поверх данных. Проверить: lsof | grep deleted, перезапустить процесс или усечь файл через > file.',
      wrong: [
        'Ошибка df.',
        'Нужно перезагрузить.',
        'Это нормально.'
      ]
    },
    {
      id: 'devops-linuxt-6',
      subtopic: 'Linux troubleshooting',
      level: 'Middle+',
      q: 'Как найти утечку памяти в Linux?',
      a: 'top/htop — RES и SHR, ps aux --sort=-rss, smem — детализация, pmap -x <pid>, /proc/<pid>/status. Отличить кэш ядра (buff/cache) от реальной утечки приложения.',
      wrong: [
        'Только free -h.',
        'Перезагрузить сервер.',
        'Утечки в Linux невозможны.'
      ]
    },
    {
      id: 'devops-linuxt-7',
      subtopic: 'Linux troubleshooting',
      level: 'Middle+',
      q: 'Что такое /proc и /sys?',
      a: '/proc — виртуальная ФС с информацией о процессах и ядре (/proc/cpuinfo, /proc/meminfo, /proc/<pid>). /sys — информация об устройствах и драйверах. Оба не на диске, генерируются ядром.',
      wrong: [
        'Обычные директории.',
        'Только для логов.',
        'Только для Docker.'
      ]
    },
    {
      id: 'devops-linuxt-8',
      subtopic: 'Linux troubleshooting',
      level: 'Middle+',
      q: 'Что такое sysctl и какие параметры важны?',
      a: 'Управление параметрами ядра. Важные: net.ipv4.ip_forward, net.core.somaxconn, vm.swappiness, fs.file-max, net.ipv4.tcp_tw_reuse, kernel.pid_max. Применяются через sysctl -w или /etc/sysctl.d/.',
      wrong: [
        'Управление службами.',
        'Аналог systemctl.',
        'Только для сети.'
      ]
    },
    {
      id: 'devops-linuxt-9',
      subtopic: 'Linux troubleshooting',
      level: 'Senior',
      q: 'Как диагностировать зависший процесс?',
      a: 'ps -o stat — состояние (D — uninterruptible sleep, Z — zombie). cat /proc/<pid>/stack — стек ядра. strace -p — системный вызов. gdb — если живой. При D — проблема с I/O или NFS.',
      wrong: [
        'Убить kill -9 сразу.',
        'Перезагрузить сервер.',
        'Зависший процесс не диагностируется.'
      ]
    },
    {
      id: 'devops-linuxt-10',
      subtopic: 'Linux troubleshooting',
      level: 'Senior',
      q: 'Что такое perf и когда нужен?',
      a: 'Профайлер ядра Linux. perf top — горячие функции, perf record/report — запись профиля, perf trace — syscalls. Для поиска узких мест CPU, флеймграфы.',
      wrong: [
        'Мониторинг диска.',
        'Сбор логов.',
        'Аналог top.'
      ]
    },
    {
      id: 'devops-linuxt-11',
      subtopic: 'Linux troubleshooting',
      level: 'Senior',
      q: 'Как восстановить систему, если GRUB сломан?',
      a: 'Загрузиться с live USB, chroot в систему, переустановить GRUB: grub-install /dev/sda, update-grub. Проверить /boot, fstab, UUID. Восстановить через rescue mode.',
      wrong: [
        'Переустановить ОС.',
        'GRUB восстановить нельзя.',
        'Через BIOS.'
      ]
    },
    {
      id: 'devops-linuxt-12',
      subtopic: 'Linux troubleshooting',
      level: 'Senior',
      q: 'Как работают SELinux/AppArmor и как дебажить блокировки?',
      a: 'Мандатный контроль доступа. SELinux: getenforce, setenforce, ausearch -m avc, audit2allow. AppArmor: aa-status, dmesg | grep apparmor. Часто мешают приложениям и контейнерам.',
      wrong: [
        'Это firewall.',
        'Только для Docker.',
        'Не влияет на приложения.'
      ]
    },

    // ================= 4. PYTHON ДЛЯ АВТОМАТИЗАЦИИ =================
    {
      id: 'devops-py-1',
      subtopic: 'Python для автоматизации',
      level: 'Junior+',
      q: 'Как в Python работать с HTTP-запросами?',
      a: 'Через requests: requests.get(url, params, headers, timeout), .json(), .raise_for_status(). Для async — httpx/aiohttp. Retry через urllib3.Retry или tenacity.',
      wrong: [
        'Только через urllib.',
        'Через curl.',
        'HTTP в Python не поддерживается.'
      ]
    },
    {
      id: 'devops-py-2',
      subtopic: 'Python для автоматизации',
      level: 'Middle',
      q: 'Как в Python работать с AWS через boto3?',
      a: 'boto3.client("s3") или boto3.resource("ec2"). Аутентификация через env, ~/.aws/credentials, IAM-роль. Пагинация через paginator, retry через Config. Пример: s3.upload_file(), ec2.describe_instances().',
      wrong: [
        'Только через AWS CLI.',
        'Через paramiko.',
        'boto3 не поддерживает S3.'
      ]
    },
    {
      id: 'devops-py-3',
      subtopic: 'Python для автоматизации',
      level: 'Middle',
      q: 'Как в Python организовать логирование?',
      a: 'logging.basicConfig или dictConfig. Уровни: DEBUG, INFO, WARNING, ERROR, CRITICAL. Handlers: StreamHandler, RotatingFileHandler. Формат с timestamp, уровнем, модулем.',
      wrong: [
        'Через print().',
        'Через sys.stdout.write().',
        'Логирование в Python отсутствует.'
      ]
    },
    {
      id: 'devops-py-4',
      subtopic: 'Python для автоматизации',
      level: 'Middle',
      q: 'Как управлять зависимостями в Python-проекте?',
      a: 'venv для изоляции, pip + requirements.txt, pip-tools для lock-файлов, poetry/pdm для современного управления. Для CI — фиксированные версии.',
      wrong: [
        'Глобальный pip install.',
        'Только conda.',
        'Зависимости не управляются.'
      ]
    },
    {
      id: 'devops-py-5',
      subtopic: 'Python для автоматизации',
      level: 'Middle',
      q: 'Как в Python работать с SSH?',
      a: 'Через paramiko (SSHClient, exec_command, SFTP) или fabric (обёртка для деплоя). Для новых проектов — asyncssh. Для простых задач — subprocess + ssh.',
      wrong: [
        'Только через os.system("ssh ...").',
        'Через requests.',
        'SSH в Python не поддерживается.'
      ]
    },
    {
      id: 'devops-py-6',
      subtopic: 'Python для автоматизации',
      level: 'Middle+',
      q: 'Что такое concurrent.futures и когда применять?',
      a: 'ThreadPoolExecutor — I/O-bound задачи, ProcessPoolExecutor — CPU-bound. submit/map, as_completed, Future. Проще, чем threading/multiprocessing напрямую.',
      wrong: [
        'Только для асинхронности.',
        'Аналог asyncio.',
        'Только для CPU-задач.'
      ]
    },
    {
      id: 'devops-py-7',
      subtopic: 'Python для автоматизации',
      level: 'Middle+',
      q: 'Как в Python писать тесты?',
      a: 'pytest — стандарт: assert, fixtures, parametrize, mock (unittest.mock), coverage. Для инфраструктурного кода — testinfra, pytest-ansible. Запуск в CI.',
      wrong: [
        'Только unittest.',
        'Через print.',
        'Тесты в Python не пишутся.'
      ]
    },
    {
      id: 'devops-py-8',
      subtopic: 'Python для автоматизации',
      level: 'Senior',
      q: 'Что такое typing и зачем в автоматизации?',
      a: 'Аннотации типов: list[str], dict[str, int], Optional, Union, Callable. Помогают mypy/pyright находить ошибки, документируют API. Dataclasses и pydantic для валидации.',
      wrong: [
        'Только для документации.',
        'Замедляют код.',
        'В Python нет типов.'
      ]
    },
    {
      id: 'devops-py-9',
      subtopic: 'Python для автоматизации',
      level: 'Senior',
      q: 'Как в Python обрабатывать конфиги?',
      a: 'pydantic-settings, dynaconf, environs. YAML/TOML через pyyaml/tomli. Приоритет: env > файл > defaults. Секреты — из Vault/AWS Secrets Manager, не в git.',
      wrong: [
        'Только configparser.',
        'Хардкод в коде.',
        'Через os.environ напрямую всегда.'
      ]
    },

    // ================= 5. AWS УГЛУБЛЕНИЕ =================
    {
      id: 'devops-aws-1',
      subtopic: 'AWS углубление',
      level: 'Middle',
      q: 'Что такое ECS и Fargate?',
      a: 'ECS — оркестратор контейнеров AWS. Fargate — serverless-режим, не нужно управлять EC2. Task Definition, Service, Cluster. Альтернатива — EKS (Kubernetes).',
      wrong: [
        'ECS — это Kubernetes.',
        'Fargate — это EC2.',
        'Только для Lambda.'
      ]
    },
    {
      id: 'devops-aws-2',
      subtopic: 'AWS углубление',
      level: 'Middle',
      q: 'Чем ALB отличается от NLB?',
      a: 'ALB — L7, HTTP/HTTPS, пути, хосты, куки, WebSocket. NLB — L4, TCP/UDP, статический IP, ultra-low latency. GWLB — для appliances. Выбор по типу трафика.',
      wrong: [
        'ALB — L4, NLB — L7.',
        'Это одно и то же.',
        'NLB только для HTTP.'
      ]
    },
    {
      id: 'devops-aws-3',
      subtopic: 'AWS углубление',
      level: 'Middle',
      q: 'Что такое Route53 и какие routing policies знаешь?',
      a: 'DNS-сервис AWS. Политики: Simple, Weighted, Latency, Failover, Geolocation, Geoproximity, Multivalue. Alias-записи на AWS-ресурсы. Health checks.',
      wrong: [
        'Только Simple.',
        'Route53 — это CDN.',
        'Только A-записи.'
      ]
    },
    {
      id: 'devops-aws-4',
      subtopic: 'AWS углубление',
      level: 'Middle',
      q: 'Что такое SQS и SNS?',
      a: 'SQS — очередь сообщений (point-to-point, FIFO/Standard). SNS — pub/sub (fan-out). Часто вместе: SNS → несколько SQS. Для decoupling микросервисов, асинхронности.',
      wrong: [
        'SQS — pub/sub, SNS — очередь.',
        'Это одно и то же.',
        'Только для Lambda.'
      ]
    },
    {
      id: 'devops-aws-5',
      subtopic: 'AWS углубление',
      level: 'Middle+',
      q: 'Что такое Secrets Manager и Parameter Store?',
      a: 'Secrets Manager — секреты с ротацией (RDS, API keys), платный. Parameter Store — конфиги и секреты (SecureString), дешевле. Оба интегрированы с IAM и KMS.',
      wrong: [
        'Это одно и то же.',
        'Только для EC2.',
        'Secrets Manager бесплатный.'
      ]
    },
    {
      id: 'devops-aws-6',
      subtopic: 'AWS углубление',
      level: 'Middle+',
      q: 'Что такое Auto Scaling Group?',
      a: 'Управляет количеством EC2: min/max/desired, launch template, health checks. Scaling policies: target tracking, step, scheduled. Интеграция с ELB. Заменяет unhealthy инстансы.',
      wrong: [
        'Только увеличение.',
        'Только для Lambda.',
        'ASG не поддерживает ELB.'
      ]
    },
    {
      id: 'devops-aws-7',
      subtopic: 'AWS углубление',
      level: 'Middle+',
      q: 'Что такое VPC peering и Transit Gateway?',
      a: 'Peering — соединение двух VPC (не транзитное). Transit Gateway — хаб для многих VPC и on-prem, транзитная маршрутизация. TGW масштабируемее, но дороже.',
      wrong: [
        'Это одно и то же.',
        'Peering транзитный.',
        'TGW только для одного VPC.'
      ]
    },
    {
      id: 'devops-aws-8',
      subtopic: 'AWS углубление',
      level: 'Senior',
      q: 'Как организовать мультиаккаунтную стратегию в AWS?',
      a: 'AWS Organizations + Control Tower. OU по средам (dev/stage/prod) и командам. SCP для ограничений. Centralized logging (CloudTrail в log-account), shared services VPC, SSO через IAM Identity Center.',
      wrong: [
        'Один аккаунт на всё.',
        'Только ручное управление.',
        'Organizations не поддерживается.'
      ]
    },
    {
      id: 'devops-aws-9',
      subtopic: 'AWS углубление',
      level: 'Senior',
      q: 'Что такое CloudFormation и CDK?',
      a: 'CFN — IaC от AWS, YAML/JSON шаблоны, stacks, drift detection. CDK — код на TS/Python, генерирует CFN. Альтернатива — Terraform. Для AWS-нативных проектов CFN удобнее.',
      wrong: [
        'CFN — это Terraform.',
        'CDK — это язык.',
        'Только для Lambda.'
      ]
    },
    {
      id: 'devops-aws-10',
      subtopic: 'AWS углубление',
      level: 'Senior',
      q: 'Как построить disaster recovery в AWS?',
      a: 'Стратегии: Backup&Restore (RTO/RPO часы), Pilot Light (минуты), Warm Standby (секунды-минуты), Multi-Site Active/Active (секунды). Выбор по бюджету и RTO/RPO. Регулярные учения.',
      wrong: [
        'Только бэкапы.',
        'Только multi-region.',
        'DR не нужен в облаке.'
      ]
    },

    // ================= 6. JAVA-АДМИН УГЛУБЛЕНИЕ =================
    {
      id: 'devops-javaadv-1',
      subtopic: 'Java-админ углубление',
      level: 'Middle',
      q: 'Как включить GC-логи и что в них смотреть?',
      a: 'Флаги: -Xlog:gc*:file=gc.log:time,uptime,level,tags (Java 9+) или -XX:+PrintGCDetails -Xloggc:gc.log (Java 8). Смотреть: паузы, частоту Full GC, размер heap до/после, allocation rate.',
      wrong: [
        'GC-логи включены по умолчанию.',
        'Только через JConsole.',
        'GC-логи не информативны.'
      ]
    },
    {
      id: 'devops-javaadv-2',
      subtopic: 'Java-админ углубление',
      level: 'Middle',
      q: 'Как анализировать heap dump?',
      a: 'Снять: jmap -dump:live,format=b,file=heap.hprof <pid> или при OOM (-XX:+HeapDumpOnOutOfMemoryError). Анализ: Eclipse MAT (histogram, dominator tree, leak suspects), VisualVM.',
      wrong: [
        'Только текстовым редактором.',
        'Через jstack.',
        'Heap dump не анализируется.'
      ]
    },
    {
      id: 'devops-javaadv-3',
      subtopic: 'Java-админ углубление',
      level: 'Middle+',
      q: 'Как анализировать thread dump?',
      a: 'jstack <pid> или kill -3. Искать: deadlock (jstack сам покажет), BLOCKED на одном мониторе, RUNNABLE в бесконечном цикле, WAITING на пуле. Сравнить 2–3 дампа подряд.',
      wrong: [
        'Только через JConsole.',
        'Thread dump — это heap.',
        'Только для deadlock.'
      ]
    },
    {
      id: 'devops-javaadv-4',
      subtopic: 'Java-админ углубление',
      level: 'Middle+',
      q: 'Как тюнить JVM под нагрузку?',
      a: 'Heap: -Xms = -Xmx (фиксированный). GC: G1 для универсала, ZGC для низких пауз. Metaspace limit, -XX:MaxGCPauseMillis. Thread stack size. Начинать с метрик, не гадать.',
      wrong: [
        'Всегда -Xmx = RAM сервера.',
        'Всегда Serial GC.',
        'Тюнинг не нужен.'
      ]
    },
    {
      id: 'devops-javaadv-5',
      subtopic: 'Java-админ углубление',
      level: 'Middle+',
      q: 'Как экспортировать JVM-метрики в Prometheus?',
      a: 'jmx_exporter (Java agent) или Micrometer (в Spring Boot Actuator). Endpoint /actuator/prometheus. Метрики: heap, GC, threads, http requests, JVM memory pools. Скрейпится Prometheus/VM.',
      wrong: [
        'Только через JConsole.',
        'Через logstash.',
        'JVM-метрики экспортировать нельзя.'
      ]
    },
    {
      id: 'devops-javaadv-6',
      subtopic: 'Java-админ углубление',
      level: 'Middle+',
      q: 'Как настроить graceful shutdown Spring Boot?',
      a: 'server.shutdown=graceful + spring.lifecycle.timeout-per-shutdown-phase. Обработка SIGTERM, завершение in-flight запросов. В K8s — preStop hook + terminationGracePeriodSeconds.',
      wrong: [
        'kill -9 достаточно.',
        'Только через restart.',
        'Graceful shutdown не нужен.'
      ]
    },
    {
      id: 'devops-javaadv-7',
      subtopic: 'Java-админ углубление',
      level: 'Senior',
      q: 'Что такое Metaspace и почему он растёт?',
      a: 'Область для метаданных классов (вместо PermGen). Растёт при загрузке классов. Утечки: classloader leaks при hot-redeploy, прокси, динамические классы. Ограничивать -XX:MaxMetaspaceSize.',
      wrong: [
        'Metaspace = heap.',
        'Metaspace не растёт.',
        'Metaspace удалён в Java 11.'
      ]
    },
    {
      id: 'devops-javaadv-8',
      subtopic: 'Java-админ углубление',
      level: 'Senior',
      q: 'Как диагностировать deadlock в Java?',
      a: 'jstack — покажет «Found one Java-level deadlock». JConsole — Detect Deadlock. Причины: два lock в разном порядке, synchronized на разных объектах. Решение: единый порядок, tryLock с timeout.',
      wrong: [
        'Только перезапуск.',
        'Deadlock в Java невозможен.',
        'Через heap dump.'
      ]
    },
    {
      id: 'devops-javaadv-9',
      subtopic: 'Java-админ углубление',
      level: 'Senior',
      q: 'Что такое JIT и как он влияет на производительность?',
      a: 'Just-In-Time компиляция байт-кода в машинный. C1 (быстрый старт), C2 (оптимизация). Warmup-период, deoptimization. Флаги: -XX:TieredStopAtLevel, -XX:+PrintCompilation. GraalVM AOT для быстрого старта.',
      wrong: [
        'JIT компилирует весь код сразу.',
        'JIT не влияет на производительность.',
        'JIT — это GC.'
      ]
    },
    {
      id: 'devops-javaadv-10',
      subtopic: 'Java-админ углубление',
      level: 'Senior',
      q: 'Как деплоить Java-приложение с zero-downtime?',
      a: 'Blue/Green или Rolling. Readiness probe, graceful shutdown, preStop sleep. Держать 2+ инстанса. Health-check endpoint. Согласованность сессий (sticky или external store).',
      wrong: [
        'Остановить и запустить.',
        'Один инстанс.',
        'Zero-downtime невозможен.'
      ]
    },

    // ================= 7. МОНИТОРИНГ: ПРАКТИКА =================
    {
      id: 'devops-monadv-1',
      subtopic: 'Мониторинг: практика',
      level: 'Middle',
      q: 'Напиши PromQL: процент использования CPU по инстансам.',
      a: '100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100). rate считает скорость counter, avg по instance, вычитаем из 100.',
      wrong: [
        'node_cpu_seconds_total * 100.',
        'sum(node_cpu) / 100.',
        'avg(node_cpu_seconds_total).'
      ]
    },
    {
      id: 'devops-monadv-2',
      subtopic: 'Мониторинг: практика',
      level: 'Middle',
      q: 'Напиши PromQL: 95-й процентиль времени ответа HTTP.',
      a: 'histogram_quantile(0.95, sum by (le) (rate(http_request_duration_seconds_bucket[5m]))). Для Summary — http_request_duration_seconds{quantile="0.95"}.',
      wrong: [
        'avg(http_request_duration_seconds).',
        'max(http_request_duration_seconds).',
        'sum(rate(http_requests_total[5m])).'
      ]
    },
    {
      id: 'devops-monadv-3',
      subtopic: 'Мониторинг: практика',
      level: 'Middle',
      q: 'Напиши PromQL: свободная память в процентах.',
      a: '100 * node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes. MemAvailable точнее, чем MemFree (учитывает кэш).',
      wrong: [
        'node_memory_MemFree_bytes * 100.',
        'node_memory_MemTotal_bytes / node_memory_MemFree_bytes.',
        'free -h в PromQL.'
      ]
    },
    {
      id: 'devops-monadv-4',
      subtopic: 'Мониторинг: практика',
      level: 'Middle',
      q: 'Напиши PromQL: топ-5 подов по потреблению CPU в namespace.',
      a: 'topk(5, sum by (pod) (rate(container_cpu_usage_seconds_total{namespace="prod"}[5m]))).',
      wrong: [
        'container_cpu_usage_seconds_total.',
        'max(container_cpu).',
        'sum(container_cpu) / 5.'
      ]
    },
    {
      id: 'devops-monadv-5',
      subtopic: 'Мониторинг: практика',
      level: 'Middle+',
      q: 'Что такое recording rules и зачем?',
      a: 'Предвычисленные запросы, сохраняются как новые метрики. Ускоряют дашборды и алерты, уменьшают нагрузку. Пример: job:http_requests:rate5m = rate(http_requests_total[5m]).',
      wrong: [
        'Правила алертов.',
        'Конфиг скрейпинга.',
        'Только для Grafana.'
      ]
    },
    {
      id: 'devops-monadv-6',
      subtopic: 'Мониторинг: практика',
      level: 'Middle+',
      q: 'Что такое Alertmanager и как настроить маршрутизацию?',
      a: 'Компонент для обработки алертов из Prometheus/VM. route — дерево по labels (severity, team). receivers — email, slack, pagerduty. inhibit_rules — подавление. silences — временное отключение.',
      wrong: [
        'Только email.',
        'Alertmanager — часть Grafana.',
        'Только для K8s.'
      ]
    },
    {
      id: 'devops-monadv-7',
      subtopic: 'Мониторинг: практика',
      level: 'Middle+',
      q: 'Что такое SLO, SLI, Error Budget?',
      a: 'SLI — метрика (успешные запросы / все). SLO — цель (99.9% за 30 дней). Error Budget — допустимая доля ошибок (0.1%). Если бюджет исчерпан — стоп релизам, фокус на надёжности.',
      wrong: [
        'Это одно и то же.',
        'SLO — это SLA.',
        'Error Budget не связан с SLO.'
      ]
    },
    {
      id: 'devops-monadv-8',
      subtopic: 'Мониторинг: практика',
      level: 'Middle+',
      q: 'Как настроить Grafana as code?',
      a: 'Provisioning через YAML: datasources и dashboards в /etc/grafana/provisioning. Dashboard JSON в git. Terraform provider для Grafana. Grafana Operator в K8s.',
      wrong: [
        'Только вручную через UI.',
        'Через скрипты на bash.',
        'Grafana as code не поддерживается.'
      ]
    },
    {
      id: 'devops-monadv-9',
      subtopic: 'Мониторинг: практика',
      level: 'Senior',
      q: 'Чем метрики отличаются от логов и трейсов?',
      a: 'Метрики — числа во времени, дёшево, агрегируются, для алертов. Логи — события, дорого, детали. Трейсы — путь запроса через сервисы, для latency-анализа. Together = observability.',
      wrong: [
        'Это одно и то же.',
        'Только метрики важны.',
        'Только логи важны.'
      ]
    },
    {
      id: 'devops-monadv-10',
      subtopic: 'Мониторинг: практика',
      level: 'Senior',
      q: 'Что такое OpenTelemetry?',
      a: 'Стандарт для сбора метрик, логов, трейсов. SDK для языков, Collector для приёма/экспорта, OTLP-протокол. Вендор-нейтральный, экспорт в Prometheus, Jaeger, Tempo, VM.',
      wrong: [
        'Только для трейсов.',
        'Продукт Google.',
        'Аналог Prometheus.'
      ]
    },
    {
      id: 'devops-monadv-11',
      subtopic: 'Мониторинг: практика',
      level: 'Senior',
      q: 'Как построить алерты, которые не шумят?',
      a: 'Алертить на симптомы (SLO burn rate), а не на причины. for: 5m для устойчивости. Severity с разными каналами. Inhibit и grouping. Регулярный review и удаление неиспользуемых.',
      wrong: [
        'Алертить на всё.',
        'Только критические.',
        'Алерты не ревьюятся.'
      ]
    },
    {
      id: 'devops-monadv-12',
      subtopic: 'Мониторинг: практика',
      level: 'Senior',
      q: 'Как мониторить VictoriaMetrics сам?',
      a: 'Метрики: vm_* (vm_rows_inserted, vm_slow_queries, vm_cache_*, vm_free_disk_space). Алерты на диск, slow queries, ingestion rate. Само-скрейп vmagent/vmsingle/vmcluster.',
      wrong: [
        'VM не мониторится.',
        'Только через Grafana.',
        'Через node_exporter.'
      ]
    },

    // ================= 8. ПОВЕДЕНЧЕСКИЕ =================
    {
      id: 'devops-beh-1',
      subtopic: 'Поведенческие вопросы',
      level: 'Middle',
      q: 'Расскажи про инцидент, который ты разрулил.',
      a: 'Структура STAR: Situation (контекст), Task (задача), Action (что делал по шагам), Result (результат и выводы). Показать диагностику, коммуникацию, post-mortem, предотвращение.',
      wrong: [
        'Просто «всё починил».',
        'Обвинить коллег.',
        'Не помню.'
      ]
    },
    {
      id: 'devops-beh-2',
      subtopic: 'Поведенческие вопросы',
      level: 'Middle',
      q: 'Что делать, если прод упал в 3 ночи?',
      a: '1) Подтвердить алерт, 2) Оценить масштаб (что именно недоступно), 3) Коммуницировать в инцидент-канал, 4) Митигация (rollback, failover), 5) Root cause после восстановления, 6) Post-mortem без обвинений.',
      wrong: [
        'Сразу писать директору.',
        'Ждать утра.',
        'Перезагрузить всё.'
      ]
    },
    {
      id: 'devops-beh-3',
      subtopic: 'Поведенческие вопросы',
      level: 'Middle',
      q: 'Как ты организуешь дежурство?',
      a: 'On-call ротация, primary/secondary, эскалация, runbooks, алерты только на actionable, компенсация, лимит нагрузки. Review алертов после каждого дежурства.',
      wrong: [
        'Один человек всегда.',
        'Без эскалации.',
        'Только в рабочее время.'
      ]
    },
    {
      id: 'devops-beh-4',
      subtopic: 'Поведенческие вопросы',
      level: 'Middle+',
      q: 'Как ты выбираешь между технологиями?',
      a: 'По требованиям: масштаб, команда, бюджет, поддержка, экосистема. PoC на малом кейсе. Оценка TCO. Предпочтение проверенным решениям, если нет веских причин.',
      wrong: [
        'Всегда новейшее.',
        'Что знаю, то и беру.',
        'По совету в Twitter.'
      ]
    },
    {
      id: 'devops-beh-5',
      subtopic: 'Поведенческие вопросы',
      level: 'Middle+',
      q: 'Как ты документируешь инфраструктуру?',
      a: 'IaC в git — источник правды. README в каждом репо, runbooks для инцидентов, ADR для решений, диаграммы (draw.io, Mermaid), Confluence/Notion для процессов. Документация обновляется в PR.',
      wrong: [
        'Только в голове.',
        'Только в чате.',
        'Документация не нужна.'
      ]
    },
    {
      id: 'devops-beh-6',
      subtopic: 'Поведенческие вопросы',
      level: 'Middle+',
      q: 'Опиши свой последний проект.',
      a: 'Структура: цель, стек, роль, ключевые решения, метрики (uptime, cost, deployment frequency), чему научился. 2–3 минуты, без воды, с конкретикой.',
      wrong: [
        'Просто список технологий.',
        'Без результата.',
        '10 минут монолога.'
      ]
    },
    {
      id: 'devops-beh-7',
      subtopic: 'Поведенческие вопросы',
      level: 'Middle+',
      q: 'Как ты относишься к post-mortem?',
      a: 'Blameless post-mortem — фокус на системах, а не людях. Timeline, root cause (5 whys), impact, action items с владельцами и сроками. Публикация внутри компании.',
      wrong: [
        'Найти виноватого.',
        'Не проводить.',
        'Только для крупных инцидентов.'
      ]
    },
    {
      id: 'devops-beh-8',
      subtopic: 'Поведенческие вопросы',
      level: 'Middle+',
      q: 'Как ты автоматизируешь рутину?',
      a: 'Сначала измерить время, потом автоматизировать частые операции: скрипты, Ansible, CI/CD, self-service. Приоритет по ROI. Не автоматизировать то, что делается раз в год.',
      wrong: [
        'Автоматизировать всё.',
        'Только вручную.',
        'Автоматизация не нужна.'
      ]
    },
    {
      id: 'devops-beh-9',
      subtopic: 'Поведенческие вопросы',
      level: 'Senior',
      q: 'Как ты внедрял культуру SRE в команде?',
      a: 'SLO/SLI, error budget, blameless post-mortem, runbooks, on-call, toil reduction, автоматизация. Начать с малого, показать ценность, обучить команду. Метрики: MTTR, deployment frequency, change failure rate.',
      wrong: [
        'Только нанять SRE.',
        'Только купить инструменты.',
        'Культура не внедряется.'
      ]
    },
    {
      id: 'devops-beh-10',
      subtopic: 'Поведенческие вопросы',
      level: 'Senior',
      q: 'Расскажи про случай, когда ты ошибся.',
      a: 'Честно, с контекстом: что сделал, какой impact, как обнаружил, как митигировал, что изменил в процессе. Показать зрелость и системное мышление.',
      wrong: [
        'Я не ошибаюсь.',
        'Обвинить других.',
        'Без выводов.'
      ]
    },
    {
      id: 'devops-beh-11',
      subtopic: 'Поведенческие вопросы',
      level: 'Senior',
      q: 'Как ты принимаешь решения в условиях неопределённости?',
      a: 'Собрать данные, оценить риск, выбрать обратимые решения, PoC, таймбокс. Коммуницировать assumptions. План B. Регулярно пересматривать.',
      wrong: [
        'Ждать полной информации.',
        'Монетка.',
        'Спросить начальника.'
      ]
    },
    {
      id: 'devops-beh-12',
      subtopic: 'Поведенческие вопросы',
      level: 'Senior',
      q: 'Как ты обучаешь junior-инженеров?',
      a: 'Менторство, парное программирование, code review, runbooks, постепенное усложнение задач. Давать контекст «почему», а не только «как». Безопасная среда для ошибок.',
      wrong: [
        'Только давать задачи.',
        'Делать всё самому.',
        'Не обучать.'
      ]
    }
  ]
});