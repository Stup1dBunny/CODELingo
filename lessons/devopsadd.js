window.registerTheme({
  theme: 'DevOps Advanced',
  id: 7,
  structure: 'flat',
  questions: [
    // ================= 1. KUBERNETES =================
    {
      id: 'devops-k8s-1',
      subtopic: 'Kubernetes',
      q: 'Что такое Kubernetes?',
      a: 'Оркестратор контейнеров. Управляет развёртыванием, масштабированием, самовосстановлением, балансировкой и обновлениями приложений в кластере.',
      explain: 'Kubernetes декларативен: вы описываете желаемое состояние, контроллеры его поддерживают. Работает с любым container runtime через CRI.\n\n```bash\nkubectl apply -f deployment.yaml\n```\n\nВ отличие от Docker Compose, рассчитан на кластер и отказоустойчивость.',
      wrong: [
        'Платформа контейнеризации, как Docker.',
        'CI-сервер для сборки образов.',
        'Система мониторинга контейнеров.'
      ]
    },
    {
      id: 'devops-k8s-2',
      subtopic: 'Kubernetes',
      q: 'Из каких компонентов состоит кластер Kubernetes?',
      a: 'Control plane: API Server, etcd, scheduler, controller-manager. Worker-ноды: kubelet, kube-proxy, container runtime. Плюс CNI, ingress, DNS (CoreDNS).',
      explain: 'API Server — единственная точка входа. etcd хранит состояние. kubelet управляет подами на ноде.\n\n```bash\nkubectl get nodes\nkubectl get pods -n kube-system\n```\n\nТипичная ошибка — путать control plane и worker-ноды.',
      wrong: [
        'Только master и worker.',
        'Только API Server и kubelet.',
        'Docker daemon и kubectl.'
      ]
    },
    {
      id: 'devops-k8s-3',
      subtopic: 'Kubernetes',
      q: 'Что такое Pod?',
      a: 'Минимальная единица развёртывания. Один или несколько контейнеров с общим network namespace, IP, volumes. Обычно один контейнер на Pod.',
      explain: 'Контейнеры в Pod делят сеть и могут общаться через localhost. Sidecar-паттерн — второй контейнер для логирования или прокси.\n\n```yaml\napiVersion: v1\nkind: Pod\nmetadata: { name: web }\n```\n\nТипичная ошибка — создавать голые Pod вместо Deployment.',
      wrong: [
        'Виртуальная машина.',
        'Docker-контейнер.',
        'Namespace в кластере.'
      ]
    },
    {
      id: 'devops-k8s-4',
      subtopic: 'Kubernetes',
      q: 'Чем Deployment отличается от Pod?',
      a: 'Deployment управляет ReplicaSet, который создаёт и пересоздаёт Pod. Обеспечивает rolling update, откат, масштабирование. Голый Pod не перезапускается при падении ноды.',
      explain: 'Deployment — декларативный способ управлять версиями приложения. История ревизий позволяет откатиться.\n\n```bash\nkubectl rollout undo deployment/web\n```\n\nТипичная ошибка — использовать Pod для stateless-приложений.',
      wrong: [
        'Deployment — это Pod с другим именем.',
        'Pod управляет Deployment.',
        'Deployment работает только с StatefulSet.'
      ]
    },
    {
      id: 'devops-k8s-5',
      subtopic: 'Kubernetes',
      q: 'Какие основные типы Service в Kubernetes?',
      a: 'ClusterIP (внутренний), NodePort (порт на ноде), LoadBalancer (внешний LB), ExternalName (CNAME). Плюс Headless Service без ClusterIP.',
      explain: 'ClusterIP — по умолчанию. NodePort открывает порт на всех нодах. LoadBalancer создаёт облачный LB.\n\n```yaml\nspec:\n  type: ClusterIP\n  selector: { app: web }\n```\n\nТипичная ошибка — использовать NodePort в проде вместо Ingress.',
      wrong: [
        'Только ClusterIP и NodePort.',
        'Только LoadBalancer.',
        'Service — это Pod.'
      ]
    },
    {
      id: 'devops-k8s-6',
      subtopic: 'Kubernetes',
      q: 'Что такое Ingress?',
      a: 'HTTP/HTTPS-роутер в кластер. Правила по хостам и путям, TLS-терминация. Требует Ingress Controller (nginx, traefik, HAProxy).',
      explain: 'Ingress — это правила, Controller — реализация. Без контроллера правила не работают.\n\n```yaml\nrules:\n  - host: app.example.com\n    http:\n      paths:\n        - path: /\n```\n\nТипичная ошибка — создать Ingress без установленного контроллера.',
      wrong: [
        'Тип Service.',
        'Балансировщик L4.',
        'Внутренний DNS.'
      ]
    },
    {
      id: 'devops-k8s-7',
      subtopic: 'Kubernetes',
      q: 'Чем ConfigMap отличается от Secret?',
      a: 'ConfigMap — незашифрованные конфиги. Secret — чувствительные данные (base64, не шифрование). Оба монтируются как файлы или передаются в env. Для шифрования — etcd encryption, External Secrets, Vault.',
      explain: 'base64 — это кодирование, не шифрование. Secret нужно защищать RBAC и encryption at rest.\n\n```yaml\nkind: Secret\nstringData: { password: "s3cr3t" }\n```\n\nТипичная ошибка — хранить секреты в git как ConfigMap.',
      wrong: [
        'Secret шифруется по умолчанию.',
        'ConfigMap только для env.',
        'Это одно и то же.'
      ]
    },
    {
      id: 'devops-k8s-8',
      subtopic: 'Kubernetes',
      q: 'Какие основные kubectl-команды?',
      a: 'get, describe, logs, exec, apply, delete, create, port-forward, top, rollout, scale, cordon, drain, taint, label, annotate.',
      explain: 'describe показывает events — ключ к диагностике. logs --previous — логи упавшего контейнера.\n\n```bash\nkubectl describe pod web-123\nkubectl logs web-123 --previous\n```\n\nТипичная ошибка — использовать только get и delete.',
      wrong: [
        'Только get, apply, delete.',
        'Только logs и exec.',
        'kubectl не поддерживает describe.'
      ]
    },
    {
      id: 'devops-k8s-9',
      subtopic: 'Kubernetes',
      q: 'Что такое liveness, readiness и startup probes?',
      a: 'liveness — перезапуск при зависании. readiness — исключение из балансировки при неготовности. startup — защита медленного старта от liveness. Настраиваются через httpGet, tcpSocket, exec.',
      explain: 'readiness важнее liveness для zero-downtime. startup нужен для приложений с долгим стартом.\n\n```yaml\nreadinessProbe:\n  httpGet: { path: /health, port: 8080 }\n```\n\nТипичная ошибка — использовать liveness для медленного старта.',
      wrong: [
        'Это одно и то же.',
        'Только liveness.',
        'Probes задаются только в Dockerfile.'
      ]
    },
    {
      id: 'devops-k8s-10',
      subtopic: 'Kubernetes',
      q: 'Что такое requests и limits?',
      a: 'requests — гарантированный минимум для планирования. limits — максимум, при превышении CPU throttling, память — OOMKill. QoS-классы: Guaranteed, Burstable, BestEffort.',
      explain: 'Guaranteed — requests=limits, самый защищённый. BestEffort — без указания, первый на выселение.\n\n```yaml\nresources:\n  requests: { cpu: 100m, memory: 128Mi }\n  limits: { cpu: 500m, memory: 256Mi }\n```\n\nТипичная ошибка — не указывать requests и получить нестабильный scheduling.',
      wrong: [
        'Это одно и то же.',
        'limits — минимум, requests — максимум.',
        'Только для CPU.'
      ]
    },
    {
      id: 'devops-k8s-11',
      subtopic: 'Kubernetes',
      q: 'Почему Pod в состоянии CrashLoopBackOff и как дебажить?',
      a: 'kubectl describe pod — events, kubectl logs --previous — логи упавшего контейнера, kubectl exec — зайти, если жив. Причины: ошибка конфига, missing secret, OOM, неверный entrypoint, падение БД.',
      explain: 'BackOff — экспоненциальная задержка перезапуска. Events показывают причину: OOMKilled, Error, ImagePullBackOff.\n\n```bash\nkubectl describe pod web-123 | grep -A10 Events\n```\n\nТипичная ошибка — удалять Pod без анализа причины.',
      wrong: [
        'Только перезапустить Pod.',
        'Удалить и создать заново.',
        'CrashLoopBackOff не диагностируется.'
      ]
    },
    {
      id: 'devops-k8s-12',
      subtopic: 'Kubernetes',
      q: 'Что такое Pending Pod и как исправить?',
      a: 'Pod не может быть запланирован. Причины: нехватка ресурсов, nodeSelector/affinity, taints без tolerations, PVC не привязан. Диагностика: kubectl describe pod — events.',
      explain: 'Scheduler не может найти подходящую ноду. Events покажут "Insufficient cpu" или "node(s) had taint".\n\n```bash\nkubectl describe pod web-123 | grep -A10 Events\n```\n\nТипичная ошибка — игнорировать taints и affinity.',
      wrong: [
        'Pending — нормальное состояние.',
        'Только перезапуск ноды.',
        'Pending не диагностируется.'
      ]
    },
    {
      id: 'devops-k8s-13',
      subtopic: 'Kubernetes',
      q: 'Что такое StatefulSet и чем отличается от Deployment?',
      a: 'StatefulSet даёт стабильные имена Pod (pod-0, pod-1), стабильные PVC и порядок запуска/остановки. Для БД, Kafka, etcd. Deployment — для stateless.',
      explain: 'StatefulSet гарантирует идентичность: pod-0 всегда первый. PVC не удаляется при удалении Pod.\n\n```yaml\nkind: StatefulSet\nserviceName: db\n```\n\nТипичная ошибка — использовать Deployment для БД.',
      wrong: [
        'Это одно и то же.',
        'StatefulSet только для stateless.',
        'Deployment даёт стабильные имена.'
      ]
    },
    {
      id: 'devops-k8s-14',
      subtopic: 'Kubernetes',
      q: 'Что такое DaemonSet?',
      a: 'Гарантирует запуск Pod на каждой (или выбранной) ноде. Для лог-агентов, мониторинга, CNI, storage.',
      explain: 'DaemonSet автоматически добавляет Pod на новые ноды. Часто используется для node_exporter, fluentbit.\n\n```yaml\nkind: DaemonSet\n```\n\nТипичная ошибка — использовать Deployment для агентов на каждой ноде.',
      wrong: [
        'Один Pod на кластер.',
        'Только для БД.',
        'Аналог Deployment.'
      ]
    },
    {
      id: 'devops-k8s-15',
      subtopic: 'Kubernetes',
      q: 'Что такое Helm?',
      a: 'Пакетный менеджер для Kubernetes. Chart — шаблоны + values.yaml. Команды: helm install/upgrade/rollback/uninstall/template/lint. Есть репозитории (Artifact Hub).',
      explain: 'Helm шаблонизирует YAML и управляет релизами. values.yaml переопределяет значения.\n\n```bash\nhelm install web ./chart -f values-prod.yaml\n```\n\nТипичная ошибка — хардкодить значения вместо values.yaml.',
      wrong: [
        'Оркестратор.',
        'CI-сервер.',
        'Мониторинг.'
      ]
    },
    {
      id: 'devops-k8s-16',
      subtopic: 'Kubernetes',
      q: 'Что такое namespace и зачем он нужен?',
      a: 'Логическая изоляция ресурсов внутри кластера. Квоты, RBAC, NetworkPolicy, resource limits per namespace. По умолчанию — default.',
      explain: 'Namespace не даёт сетевой изоляции по умолчанию — нужна NetworkPolicy. RBAC привязывается к namespace.\n\n```bash\nkubectl create namespace staging\n```\n\nТипичная ошибка — путать namespace и сетевую изоляцию.',
      wrong: [
        'Физический сервер.',
        'Docker namespace.',
        'Только для мониторинга.'
      ]
    },
    {
      id: 'devops-k8s-17',
      subtopic: 'Kubernetes',
      q: 'Как работает RBAC в Kubernetes?',
      a: 'Role/ClusterRole — права. RoleBinding/ClusterRoleBinding — привязка к user/group/serviceaccount. ServiceAccount — идентичность Pod. Принцип наименьших привилегий.',
      explain: 'Role — в namespace, ClusterRole — глобально. Binding связывает субъект с ролью.\n\n```yaml\nkind: RoleBinding\nsubjects: [{ kind: ServiceAccount, name: app }]\n```\n\nТипичная ошибка — давать cluster-admin всем сервисам.',
      wrong: [
        'Только через kubeconfig.',
        'RBAC отсутствует в K8s.',
        'Через SSH-ключи.'
      ]
    },
    {
      id: 'devops-k8s-18',
      subtopic: 'Kubernetes',
      q: 'Что такое NetworkPolicy?',
      a: 'Правила сетевого доступа между Pod. Требует CNI с поддержкой (Calico, Cilium). По умолчанию весь трафик разрешён — политика запрещает.',
      explain: 'NetworkPolicy — whitelist. Если политика применена к Pod, разрешено только указанное.\n\n```yaml\ningress:\n  - from: [{ podSelector: { matchLabels: { app: api } } }]\n```\n\nТипичная ошибка — ожидать изоляции без NetworkPolicy.',
      wrong: [
        'Правила firewall на ноде.',
        'Ingress-правила.',
        'Встроено в kube-proxy.'
      ]
    },
    {
      id: 'devops-k8s-19',
      subtopic: 'Kubernetes',
      q: 'Что такое ServiceAccount и как им пользоваться?',
      a: 'Идентичность для Pod. Создаётся ServiceAccount, монтируется токен, Pod получает права через RoleBinding. С K8s 1.24 токены временные (TokenRequest API).',
      explain: 'ServiceAccount — не пользователь, а идентичность для Pod. Токен монтируется в /var/run/secrets.\n\n```yaml\nserviceAccountName: app-sa\n```\n\nТипичная ошибка — использовать default ServiceAccount с лишними правами.',
      wrong: [
        'Пользователь кластера.',
        'SSH-ключ.',
        'Docker credential.'
      ]
    },
    {
      id: 'devops-k8s-20',
      subtopic: 'Kubernetes',
      q: 'Что такое оператор в Kubernetes?',
      a: 'Custom Controller + CRD для управления сложными приложениями (БД, Kafka). Реализует domain-specific логику: бэкапы, failover, scaling. Примеры: Prometheus Operator, Postgres Operator.',
      explain: 'Оператор кодирует знания администратора. CRD описывает ресурс, контроллер реагирует на изменения.\n\n```yaml\nkind: PostgresCluster\n```\n\nТипичная ошибка — писать оператор там, где хватает Helm.',
      wrong: [
        'Администратор кластера.',
        'Тип Service.',
        'Плагин kubectl.'
      ]
    },
    {
      id: 'devops-k8s-21',
      subtopic: 'Kubernetes',
      q: 'Как дебажить Pod, который не может подключиться к Service?',
      a: 'Проверить endpoints (kubectl get endpoints), селекторы Service vs Pod labels, DNS (nslookup внутри Pod), NetworkPolicy, readiness Pod. kubectl exec и curl изнутри.',
      explain: 'Если endpoints пусты — селектор не совпадает. DNS-имя — service.namespace.svc.cluster.local.\n\n```bash\nkubectl get endpoints web\nkubectl exec -it pod -- nslookup web\n```\n\nТипичная ошибка — проверять только Service, не глядя на endpoints.',
      wrong: [
        'Только перезапустить Pod.',
        'Только перезапустить Service.',
        'Дебажить нельзя.'
      ]
    },
    {
      id: 'devops-k8s-22',
      subtopic: 'Kubernetes',
      q: 'Как обновлять приложение без простоя?',
      a: 'RollingUpdate с maxSurge/maxUnavailable, readiness probes, PodDisruptionBudget, preStop hook, graceful shutdown (SIGTERM), lifecycle. Blue/Green или Canary через Service/Ingress.',
      explain: 'readiness исключает Pod из балансировки до готовности. preStop даёт время завершить запросы.\n\n```yaml\nstrategy:\n  rollingUpdate: { maxSurge: 1, maxUnavailable: 0 }\n```\n\nТипичная ошибка — maxUnavailable: 100% и простой.',
      wrong: [
        'Только остановить и запустить заново.',
        'Recreate.',
        'Обновление без простоя невозможно.'
      ]
    },
    {
      id: 'devops-k8s-23',
      subtopic: 'Kubernetes',
      q: 'Что такое PDB и зачем нужен?',
      a: 'PodDisruptionBudget ограничивает количество Pod, которые могут быть одновременно недоступны при добровольных disruption (drain, upgrade). minAvailable или maxUnavailable.',
      explain: 'PDB защищает от одновременного выселения всех Pod. Не защищает от падения ноды.\n\n```yaml\nminAvailable: 2\n```\n\nТипичная ошибка — drain ноды без PDB и получить простой.',
      wrong: [
        'Лимит ресурсов.',
        'Правило affinity.',
        'Тип Service.'
      ]
    },
    {
      id: 'devops-k8s-24',
      subtopic: 'Kubernetes',
      q: 'Что такое CNI и какие плагины знаешь?',
      a: 'Container Network Interface — стандарт сети для Pod. Плагины: Calico (BGP, NetworkPolicy), Cilium (eBPF), Flannel (простой), Weave. Отвечает за IP-адресацию и маршрутизацию Pod.',
      explain: 'CNI назначает IP подам и настраивает маршрутизацию. Cilium на eBPF даёт высокую производительность.\n\n```bash\nkubectl get pods -n kube-system | grep calico\n```\n\nТипичная ошибка — выбирать CNI без NetworkPolicy, если нужна изоляция.',
      wrong: [
        'Docker network.',
        'Только Calico.',
        'CNI встроен в kubelet.'
      ]
    },
    {
      id: 'devops-k8s-25',
      subtopic: 'Kubernetes',
      q: 'Что такое etcd и как его бэкапить?',
      a: 'Распределённое key-value хранилище состояния кластера. Бэкап: etcdctl snapshot save. Восстановление: snapshot restore. Хранить вне кластера, шифровать, тестировать restore.',
      explain: 'etcd — единственный источник правды. Потеря etcd = потеря кластера.\n\n```bash\netcdctl snapshot save backup.db\n```\n\nТипичная ошибка — не тестировать restore.',
      wrong: [
        'База данных приложений.',
        'Мониторинг.',
        'etcd не требует бэкапа.'
      ]
    },
    {
      id: 'devops-k8s-26',
      subtopic: 'Kubernetes',
      q: 'Как обновить кластер Kubernetes без простоя?',
      a: 'Сначала control plane (по одной ноде), затем worker-ноды поочерёдно: cordon, drain, upgrade, uncordon. PDB, readiness probes, multi-master etcd. Проверить версии kubelet/kubeadm.',
      explain: 'kubeadm upgrade plan показывает доступные версии. Drain выселяет Pod, PDB ограничивает.\n\n```bash\nkubectl drain node-1 --ignore-daemonsets\n```\n\nТипичная ошибка — обновлять все ноды сразу.',
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
      q: 'Что такое модель OSI и TCP/IP?',
      a: 'OSI: 7 уровней (physical, data link, network, transport, session, presentation, application). TCP/IP: 4 уровня (link, internet, transport, application). Для диагностики важны L3 (IP), L4 (TCP/UDP), L7 (HTTP).',
      explain: 'OSI — теоретическая модель, TCP/IP — практическая. На практике оперируют L3/L4/L7.\n\n```bash\n# L3 — ping, L4 — ss, L7 — curl\n```\n\nТипичная ошибка — путать уровни при диагностике.',
      wrong: [
        'OSI — 4 уровня, TCP/IP — 7.',
        'Это одно и то же.',
        'OSI не используется.'
      ]
    },
    {
      id: 'devops-net-2',
      subtopic: 'Сети',
      q: 'Чем TCP отличается от UDP?',
      a: 'TCP — надёжный, с установкой соединения (3-way handshake), гарантией доставки, порядком, повторами. UDP — быстрый, без гарантий, для DNS, видео, игр, VoIP.',
      explain: 'TCP жертвует скоростью ради надёжности. UDP — наоборот. QUIC combines both.\n\n```bash\nss -tunlp\n```\n\nТипичная ошибка — использовать TCP для стриминга.',
      wrong: [
        'TCP быстрее UDP.',
        'UDP надёжнее TCP.',
        'Это одно и то же.'
      ]
    },
    {
      id: 'devops-net-3',
      subtopic: 'Сети',
      q: 'Что такое DNS и какие типы записей знаешь?',
      a: 'Domain Name System. Записи: A (IPv4), AAAA (IPv6), CNAME (алиас), MX (почта), TXT (SPF, DKIM), NS (серверы), SOA, PTR (reverse). TTL — время кэширования.',
      explain: 'DNS резолвит имя в IP. TTL влияет на скорость propagation при смене.\n\n```bash\ndig example.com A\n```\n\nТипичная ошибка — ставить большой TTL перед миграцией.',
      wrong: [
        'Только A и CNAME.',
        'Только A.',
        'DNS не использует типы записей.'
      ]
    },
    {
      id: 'devops-net-4',
      subtopic: 'Сети',
      q: 'Какие основные HTTP-статусы?',
      a: '1xx — info, 2xx — успех (200, 201, 204), 3xx — редирект (301, 302, 304), 4xx — ошибка клиента (400, 401, 403, 404, 429), 5xx — ошибка сервера (500, 502, 503, 504).',
      explain: '502 — bad gateway (бэкенд недоступен), 504 — gateway timeout. 429 — rate limit.\n\n```bash\ncurl -I https://example.com\n```\n\nТипичная ошибка — путать 502 и 504.',
      wrong: [
        'Только 200 и 404.',
        'Только 2xx и 5xx.',
        'HTTP-статусы не важны.'
      ]
    },
    {
      id: 'devops-net-5',
      subtopic: 'Сети',
      q: 'Чем 401 отличается от 403?',
      a: '401 Unauthorized — не аутентифицирован (нужен логин). 403 Forbidden — аутентифицирован, но нет прав. 404 — не найдено, 502 — bad gateway, 504 — gateway timeout.',
      explain: '401 — проблема с credentials, 403 — с правами. 404 иногда маскирует 403 для безопасности.\n\n```bash\ncurl -v https://api.example.com/secret\n```\n\nТипичная ошибка — возвращать 401 вместо 403.',
      wrong: [
        'Это одно и то же.',
        '401 — нет прав, 403 — не залогинен.',
        '401 — ошибка сервера.'
      ]
    },
    {
      id: 'devops-net-6',
      subtopic: 'Сети',
      q: 'Как диагностировать сеть в Linux?',
      a: 'ping — доступность, traceroute/mtr — маршрут, dig/nslookup — DNS, ss/netstat — порты, tcpdump — трафик, curl -v — HTTP, ip a/route — интерфейсы.',
      explain: 'mtr combines ping и traceroute. tcpdump показывает пакеты. ss заменяет netstat.\n\n```bash\nmtr example.com\nss -tlnp\ntcpdump -i eth0 port 80\n```\n\nТипичная ошибка — ограничиваться ping.',
      wrong: [
        'Только ping.',
        'Только ifconfig.',
        'Сеть в Linux не диагностируется.'
      ]
    },
    {
      id: 'devops-net-7',
      subtopic: 'Сети',
      q: 'Что такое NAT?',
      a: 'Network Address Translation — подмена адресов. SNAT (исходящий), DNAT (входящий, port forwarding), MASQUERADE (динамический SNAT). Позволяет частным сетям выходить в интернет.',
      explain: 'NAT экономит публичные IP. Docker и K8s используют iptables NAT.\n\n```bash\niptables -t nat -L -n\n```\n\nТипичная ошибка — путать SNAT и DNAT.',
      wrong: [
        'Тип DNS-записи.',
        'Протокол шифрования.',
        'Балансировщик.'
      ]
    },
    {
      id: 'devops-net-8',
      subtopic: 'Сети',
      q: 'Чем балансировка L4 отличается от L7?',
      a: 'L4 (TCP/UDP) — быстрее, не понимает HTTP, балансирует по IP/порту. L7 (HTTP) — понимает заголовки, пути, куки, может терминировать TLS, делать sticky sessions. Примеры: L4 — NLB, L7 — ALB, nginx.',
      explain: 'L7 гибче, но дороже по CPU. L4 проще и быстрее. Для HTTP обычно L7.\n\n```nginx\nproxy_pass http://backend;\n```\n\nТипичная ошибка — использовать L4 для path-based routing.',
      wrong: [
        'L7 быстрее L4.',
        'Это одно и то же.',
        'L4 работает только с HTTP.'
      ]
    },
    {
      id: 'devops-net-9',
      subtopic: 'Сети',
      q: 'Как работает TLS-рукопожатие?',
      a: 'ClientHello → ServerHello + сертификат → проверка сертификата → обмен ключами (ECDHE) → session keys → encrypted traffic. TLS 1.3 сократил до 1-RTT, поддерживает 0-RTT.',
      explain: 'ECDHE даёт forward secrecy: компрометация ключа не раскрывает прошлые сессии. TLS 1.3 убрал слабые шифры.\n\n```bash\nopenssl s_client -connect example.com:443\n```\n\nТипичная ошибка — использовать TLS 1.0/1.1.',
      wrong: [
        'Только обмен сертификатами.',
        'Через SSH.',
        'TLS не использует сертификаты.'
      ]
    },
    {
      id: 'devops-net-10',
      subtopic: 'Сети',
      q: 'Что такое reverse proxy и зачем?',
      a: 'Прокси перед серверами: терминирует TLS, балансирует, кэширует, скрывает бэкенд, отдаёт статику, ограничивает rate. Примеры: nginx, HAProxy, Traefik, Envoy.',
      explain: 'Reverse proxy — точка входа. Forward proxy — на стороне клиента.\n\n```nginx\nlocation / { proxy_pass http://backend; }\n```\n\nТипичная ошибка — путать reverse и forward proxy.',
      wrong: [
        'Прокси на стороне клиента.',
        'VPN.',
        'DNS-сервер.'
      ]
    },
    {
      id: 'devops-net-11',
      subtopic: 'Сети',
      q: 'Что такое MTU и зачем его менять?',
      a: 'Maximum Transmission Unit — максимальный размер пакета. Обычно 1500. При VPN/туннелях уменьшают (1400). Проблемы: фрагментация, PMTUD. Симптомы — «сайт открывается, но большие запросы висят».',
      explain: 'Если пакет больше MTU и DF=1, он отбрасывается. PMTUD должен сообщить, но часто блокируется firewall.\n\n```bash\nping -M do -s 1472 example.com\n```\n\nТипичная ошибка — не учитывать MTU при VPN.',
      wrong: [
        'Размер окна TCP.',
        'MTU менять нельзя.',
        'MTU — это DNS-запись.'
      ]
    },
    {
      id: 'devops-net-12',
      subtopic: 'Сети',
      q: 'Что такое iptables/nftables и как их использовать?',
      a: 'Firewall в Linux. Таблицы: filter (INPUT/OUTPUT/FORWARD), nat (PREROUTING/POSTROUTING), mangle. nftables — современная замена. Docker и K8s активно используют iptables для NAT и маршрутизации.',
      explain: 'K8s Service реализован через iptables/IPVS. Docker создаёт цепочки DOCKER и DOCKER-USER.\n\n```bash\niptables -L -n -v\niptables -t nat -L\n```\n\nТипичная ошибка — менять iptables вручную при работающем Docker.',
      wrong: [
        'Только для блокировки портов.',
        'Аналог SELinux.',
        'Не используется в K8s.'
      ]
    },
    {
      id: 'devops-net-13',
      subtopic: 'Сети',
      q: 'Что такое keep-alive и зачем?',
      a: 'Постоянное TCP-соединение для нескольких HTTP-запросов. Экономит время на handshake. Настраивается на клиенте, сервере, LB. Долгий keep-alive может держать соединения и исчерпывать пул.',
      explain: 'HTTP/1.1 keep-alive по умолчанию. HTTP/2 мультиплексирует в одном соединении.\n\n```nginx\nkeepalive_timeout 65;\n```\n\nТипичная ошибка — отключать keep-alive и терять производительность.',
      wrong: [
        'Способ шифрования.',
        'Тип DNS-записи.',
        'UDP-механизм.'
      ]
    },
    {
      id: 'devops-net-14',
      subtopic: 'Сети',
      q: 'Как диагностировать «сайт тормозит» на сетевом уровне?',
      a: 'mtr — потери по хопам, tcpdump — ретрансмиты, ss -ti — retrans, RTT, cwnd, nstat/ifstat — ошибки интерфейса, curl -w — тайминги (DNS, connect, TLS, TTFB). Проверить MTU, DNS, LB.',
      explain: 'curl -w разбивает время по фазам. ss -ti показывает retrans и cwnd.\n\n```bash\ncurl -w "@curl-format.txt" -o /dev/null -s https://example.com\n```\n\nТипичная ошибка — смотреть только ping.',
      wrong: [
        'Только ping.',
        'Перезапустить сервер.',
        'Сеть не диагностируется.'
      ]
    },
    {
      id: 'devops-net-15',
      subtopic: 'Сети',
      q: 'Что такое BGP и где встречается?',
      a: 'Border Gateway Protocol — маршрутизация между автономными системами. В K8s — Calico BGP для Pod-сетей. В облаках — dynamic routing, VPN. В дата-центрах — ECMP, anycast.',
      explain: 'BGP — протокол интернета. Calico использует его для маршрутизации Pod без overlay.\n\n```bash\ncalicoctl node status\n```\n\nТипичная ошибка — путать BGP с OSPF.',
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
      q: 'Сервер «тормозит». С чего начнёшь диагностику?',
      a: 'top/htop — CPU и load, free -h — память, df -h — диск, iostat -x 1 — I/O, ss -s — сеть, dmesg — ошибки ядра. Затем углубление: pidstat, iotop, perf, strace.',
      explain: 'Сначала USE-метод: Utilization, Saturation, Errors для CPU, памяти, диска, сети. Потом углубление.\n\n```bash\nvmstat 1\niostat -x 1\n```\n\nТипичная ошибка — сразу перезагружать сервер.',
      wrong: [
        'Сразу перезагрузить.',
        'Только top.',
        'Проверить логи приложения.'
      ]
    },
    {
      id: 'devops-linuxt-2',
      subtopic: 'Linux troubleshooting',
      q: 'Что такое strace и когда его применять?',
      a: 'Трассировка системных вызовов процесса. strace -p <pid>, -f (follow forks), -e trace=file/network. Применяется, когда процесс висит, не открывает файл, не подключается к сети.',
      explain: 'strace показывает, где процесс застрял: на read, connect, open. Высокий overhead, использовать точечно.\n\n```bash\nstrace -p 12345 -e trace=network\n```\n\nТипичная ошибка — запускать strace на production без необходимости.',
      wrong: [
        'Мониторинг CPU.',
        'Сбор логов.',
        'Аналог top.'
      ]
    },
    {
      id: 'devops-linuxt-3',
      subtopic: 'Linux troubleshooting',
      q: 'Что такое lsof и как использовать?',
      a: 'List open files. lsof -p <pid> — файлы процесса, lsof -i :80 — кто слушает порт, lsof /path — кто держит файл. Полезно при «device busy» и «port already in use».',
      explain: 'lsof показывает deleted-файлы, которые держат место. lsof +L1 — файлы с link count 0.\n\n```bash\nlsof -i :80\nlsof +L1\n```\n\nТипичная ошибка — не проверять deleted-файлы при нехватке места.',
      wrong: [
        'Список процессов.',
        'Мониторинг диска.',
        'Аналог ls.'
      ]
    },
    {
      id: 'devops-linuxt-4',
      subtopic: 'Linux troubleshooting',
      q: 'Как найти, какой процесс слушает порт?',
      a: 'ss -tlnp | grep :80 или lsof -i :80 или netstat -tlnp. Покажет PID и имя процесса. При отсутствии — проверить namespace (контейнеры, network namespaces).',
      explain: 'ss быстрее netstat. В контейнерах порт может быть в другом namespace.\n\n```bash\nss -tlnp\nnsenter -t <pid> -n ss -tlnp\n```\n\nТипичная ошибка — искать порт только в host namespace.',
      wrong: [
        'Только netstat.',
        'Через ps aux.',
        'Порт определить нельзя.'
      ]
    },
    {
      id: 'devops-linuxt-5',
      subtopic: 'Linux troubleshooting',
      q: 'Диск заполнен, но du показывает меньше, чем df. Почему?',
      a: 'Удалённые файлы, которые ещё держат процессы (lsof +L1). Занятые inode. Mount point поверх данных. Проверить: lsof | grep deleted, перезапустить процесс или усечь файл через > file.',
      explain: 'Файл удалён из директории, но inode жив, пока процесс держит дескриптор. Место освободится после закрытия.\n\n```bash\nlsof +L1\ntruncate -s 0 /proc/<pid>/fd/<fd>\n```\n\nТипичная ошибка — перезагружать сервер вместо усечения файла.',
      wrong: [
        'Ошибка df.',
        'Нужно перезагрузить.',
        'Это нормально.'
      ]
    },
    {
      id: 'devops-linuxt-6',
      subtopic: 'Linux troubleshooting',
      q: 'Как найти утечку памяти в Linux?',
      a: 'top/htop — RES и SHR, ps aux --sort=-rss, smem — детализация, pmap -x <pid>, /proc/<pid>/status. Отличить кэш ядра (buff/cache) от реальной утечки приложения.',
      explain: 'buff/cache — нормально, освободится при необходимости. Утечка — рост RSS процесса.\n\n```bash\nps aux --sort=-rss | head\nsmem -t -k\n```\n\nТипичная ошибка — путать кэш и утечку.',
      wrong: [
        'Только free -h.',
        'Перезагрузить сервер.',
        'Утечки в Linux невозможны.'
      ]
    },
    {
      id: 'devops-linuxt-7',
      subtopic: 'Linux troubleshooting',
      q: 'Что такое /proc и /sys?',
      a: '/proc — виртуальная ФС с информацией о процессах и ядре (/proc/cpuinfo, /proc/meminfo, /proc/<pid>). /sys — информация об устройствах и драйверах. Оба не на диске, генерируются ядром.',
      explain: 'Файлы в /proc не занимают место. /proc/<pid>/fd — открытые дескрипторы.\n\n```bash\ncat /proc/meminfo\nls /proc/12345/fd\n```\n\nТипичная ошибка — искать их на диске.',
      wrong: [
        'Обычные директории.',
        'Только для логов.',
        'Только для Docker.'
      ]
    },
    {
      id: 'devops-linuxt-8',
      subtopic: 'Linux troubleshooting',
      q: 'Что такое sysctl и какие параметры важны?',
      a: 'Управление параметрами ядра. Важные: net.ipv4.ip_forward, net.core.somaxconn, vm.swappiness, fs.file-max, net.ipv4.tcp_tw_reuse, kernel.pid_max. Применяются через sysctl -w или /etc/sysctl.d/.',
      explain: 'sysctl -w временный, /etc/sysctl.d/ — постоянный. Для K8s нужен ip_forward=1.\n\n```bash\nsysctl -w net.ipv4.ip_forward=1\n```\n\nТипичная ошибка — менять без понимания и ломать сеть.',
      wrong: [
        'Управление службами.',
        'Аналог systemctl.',
        'Только для сети.'
      ]
    },
    {
      id: 'devops-linuxt-9',
      subtopic: 'Linux troubleshooting',
      q: 'Как диагностировать зависший процесс?',
      a: 'ps -o stat — состояние (D — uninterruptible sleep, Z — zombie). cat /proc/<pid>/stack — стек ядра. strace -p — системный вызов. gdb — если живой. При D — проблема с I/O или NFS.',
      explain: 'D-state не убивается kill -9. Причина — I/O или NFS. Z — зомби, ждёт родителя.\n\n```bash\nps -eo pid,stat,cmd | grep D\ncat /proc/12345/stack\n```\n\nТипичная ошибка — убивать D-процесс и ждать.',
      wrong: [
        'Убить kill -9 сразу.',
        'Перезагрузить сервер.',
        'Зависший процесс не диагностируется.'
      ]
    },
    {
      id: 'devops-linuxt-10',
      subtopic: 'Linux troubleshooting',
      q: 'Что такое perf и когда нужен?',
      a: 'Профайлер ядра Linux. perf top — горячие функции, perf record/report — запись профиля, perf trace — syscalls. Для поиска узких мест CPU, флеймграфы.',
      explain: 'perf record собирает сэмплы, report показывает распределение. Flame graph — визуализация.\n\n```bash\nperf record -g -p 12345\nperf report\n```\n\nТипичная ошибка — профилировать без -g и терять стек.',
      wrong: [
        'Мониторинг диска.',
        'Сбор логов.',
        'Аналог top.'
      ]
    },
    {
      id: 'devops-linuxt-11',
      subtopic: 'Linux troubleshooting',
      q: 'Как восстановить систему, если GRUB сломан?',
      a: 'Загрузиться с live USB, chroot в систему, переустановить GRUB: grub-install /dev/sda, update-grub. Проверить /boot, fstab, UUID. Восстановить через rescue mode.',
      explain: 'chroot даёт доступ к системе. grub-install ставит загрузчик, update-grub генерирует конфиг.\n\n```bash\nmount /dev/sda2 /mnt\nchroot /mnt\ngrub-install /dev/sda\n```\n\nТипичная ошибка — переустанавливать ОС.',
      wrong: [
        'Переустановить ОС.',
        'GRUB восстановить нельзя.',
        'Через BIOS.'
      ]
    },
    {
      id: 'devops-linuxt-12',
      subtopic: 'Linux troubleshooting',
      q: 'Как работают SELinux/AppArmor и как дебажить блокировки?',
      a: 'Мандатный контроль доступа. SELinux: getenforce, setenforce, ausearch -m avc, audit2allow. AppArmor: aa-status, dmesg | grep apparmor. Часто мешают приложениям и контейнерам.',
      explain: 'SELinux метит файлы и процессы. AVC denial — блокировка. audit2allow генерирует политику.\n\n```bash\nausearch -m avc -ts recent\naudit2allow -a\n```\n\nТипичная ошибка — отключать SELinux вместо настройки.',
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
      q: 'Как в Python работать с HTTP-запросами?',
      a: 'Через requests: requests.get(url, params, headers, timeout), .json(), .raise_for_status(). Для async — httpx/aiohttp. Retry через urllib3.Retry или tenacity.',
      explain: 'timeout обязателен: без него запрос может висеть. raise_for_status бросает исключение при 4xx/5xx.\n\n```python\nr = requests.get(url, timeout=5)\nr.raise_for_status()\n```\n\nТипичная ошибка — не ставить timeout.',
      wrong: [
        'Только через urllib.',
        'Через curl.',
        'HTTP в Python не поддерживается.'
      ]
    },
    {
      id: 'devops-py-2',
      subtopic: 'Python для автоматизации',
      q: 'Как в Python работать с AWS через boto3?',
      a: 'boto3.client("s3") или boto3.resource("ec2"). Аутентификация через env, ~/.aws/credentials, IAM-роль. Пагинация через paginator, retry через Config. Пример: s3.upload_file(), ec2.describe_instances().',
      explain: 'client — низкоуровневый, resource — объектный. Paginator автоматически листает результаты.\n\n```python\ns3 = boto3.client("s3")\ns3.upload_file("file", "bucket", "key")\n```\n\nТипичная ошибка — не обрабатывать пагинацию.',
      wrong: [
        'Только через AWS CLI.',
        'Через paramiko.',
        'boto3 не поддерживает S3.'
      ]
    },
    {
      id: 'devops-py-3',
      subtopic: 'Python для автоматизации',
      q: 'Как в Python организовать логирование?',
      a: 'logging.basicConfig или dictConfig. Уровни: DEBUG, INFO, WARNING, ERROR, CRITICAL. Handlers: StreamHandler, RotatingFileHandler. Формат с timestamp, уровнем, модулем.',
      explain: 'RotatingFileHandler ограничивает размер логов. dictConfig удобен для сложных конфигов.\n\n```python\nlogging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")\n```\n\nТипичная ошибка — использовать print вместо logging.',
      wrong: [
        'Через print().',
        'Через sys.stdout.write().',
        'Логирование в Python отсутствует.'
      ]
    },
    {
      id: 'devops-py-4',
      subtopic: 'Python для автоматизации',
      q: 'Как управлять зависимостями в Python-проекте?',
      a: 'venv для изоляции, pip + requirements.txt, pip-tools для lock-файлов, poetry/pdm для современного управления. Для CI — фиксированные версии.',
      explain: 'venv изолирует зависимости проекта. poetry управляет и зависимостями, и виртуальным окружением.\n\n```bash\npython -m venv .venv\nsource .venv/bin/activate\npip install -r requirements.txt\n```\n\nТипичная ошибка — ставить пакеты глобально.',
      wrong: [
        'Глобальный pip install.',
        'Только conda.',
        'Зависимости не управляются.'
      ]
    },
    {
      id: 'devops-py-5',
      subtopic: 'Python для автоматизации',
      q: 'Как в Python работать с SSH?',
      a: 'Через paramiko (SSHClient, exec_command, SFTP) или fabric (обёртка для деплоя). Для новых проектов — asyncssh. Для простых задач — subprocess + ssh.',
      explain: 'paramiko даёт полный контроль. fabric упрощает типовые задачи деплоя.\n\n```python\nimport paramiko\nc = paramiko.SSHClient()\nc.connect(host)\nstdin, stdout, stderr = c.exec_command("uptime")\n```\n\nТипичная ошибка — использовать os.system("ssh ...") и терять контроль.',
      wrong: [
        'Только через os.system("ssh ...").',
        'Через requests.',
        'SSH в Python не поддерживается.'
      ]
    },
    {
      id: 'devops-py-6',
      subtopic: 'Python для автоматизации',
      q: 'Что такое concurrent.futures и когда применять?',
      a: 'ThreadPoolExecutor — I/O-bound задачи, ProcessPoolExecutor — CPU-bound. submit/map, as_completed, Future. Проще, чем threading/multiprocessing напрямую.',
      explain: 'GIL мешает потокам для CPU. Для I/O потоки эффективны. Процессы обходят GIL.\n\n```python\nfrom concurrent.futures import ThreadPoolExecutor\nwith ThreadPoolExecutor(10) as ex:\n    results = ex.map(fetch, urls)\n```\n\nТипичная ошибка — использовать потоки для CPU-задач.',
      wrong: [
        'Только для асинхронности.',
        'Аналог asyncio.',
        'Только для CPU-задач.'
      ]
    },
    {
      id: 'devops-py-7',
      subtopic: 'Python для автоматизации',
      q: 'Как в Python писать тесты?',
      a: 'pytest — стандарт: assert, fixtures, parametrize, mock (unittest.mock), coverage. Для инфраструктурного кода — testinfra, pytest-ansible. Запуск в CI.',
      explain: 'fixtures управляют подготовкой/очисткой. parametrize гоняет один тест с разными данными.\n\n```python\n@pytest.mark.parametrize("x,y", [(1,2),(3,4)])\ndef test_sum(x, y): assert x + y > 0\n```\n\nТипичная ошибка — писать тесты без изоляции.',
      wrong: [
        'Только unittest.',
        'Через print.',
        'Тесты в Python не пишутся.'
      ]
    },
    {
      id: 'devops-py-8',
      subtopic: 'Python для автоматизации',
      q: 'Что такое typing и зачем в автоматизации?',
      a: 'Аннотации типов: list[str], dict[str, int], Optional, Union, Callable. Помогают mypy/pyright находить ошибки, документируют API. Dataclasses и pydantic для валидации.',
      explain: 'Аннотации не влияют на runtime, но ловят ошибки в CI. pydantic валидирует данные.\n\n```python\nfrom pydantic import BaseModel\nclass User(BaseModel):\n    name: str\n    age: int\n```\n\nТипичная ошибка — игнорировать mypy в CI.',
      wrong: [
        'Только для документации.',
        'Замедляют код.',
        'В Python нет типов.'
      ]
    },
    {
      id: 'devops-py-9',
      subtopic: 'Python для автоматизации',
      q: 'Как в Python обрабатывать конфиги?',
      a: 'pydantic-settings, dynaconf, environs. YAML/TOML через pyyaml/tomli. Приоритет: env > файл > defaults. Секреты — из Vault/AWS Secrets Manager, не в git.',
      explain: 'pydantic-settings читает env и валидирует. Секреты не хранят в git.\n\n```python\nfrom pydantic_settings import BaseSettings\nclass Settings(BaseSettings):\n    db_url: str\n```\n\nТипичная ошибка — хардкодить конфиги.',
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
      q: 'Что такое ECS и Fargate?',
      a: 'ECS — оркестратор контейнеров AWS. Fargate — serverless-режим, не нужно управлять EC2. Task Definition, Service, Cluster. Альтернатива — EKS (Kubernetes).',
      explain: 'Fargate убирает управление нодами, но дороже. ECS проще EKS, но менее переносим.\n\n```bash\naws ecs create-cluster --cluster-name prod\n```\n\nТипичная ошибка — выбирать ECS для мультиоблака.',
      wrong: [
        'ECS — это Kubernetes.',
        'Fargate — это EC2.',
        'Только для Lambda.'
      ]
    },
    {
      id: 'devops-aws-2',
      subtopic: 'AWS углубление',
      q: 'Чем ALB отличается от NLB?',
      a: 'ALB — L7, HTTP/HTTPS, пути, хосты, куки, WebSocket. NLB — L4, TCP/UDP, статический IP, ultra-low latency. GWLB — для appliances. Выбор по типу трафика.',
      explain: 'ALB понимает HTTP, NLB — нет. NLB даёт статический IP, ALB — нет.\n\n```bash\naws elbv2 create-load-balancer --type application\n```\n\nТипичная ошибка — использовать ALB для TCP.',
      wrong: [
        'ALB — L4, NLB — L7.',
        'Это одно и то же.',
        'NLB только для HTTP.'
      ]
    },
    {
      id: 'devops-aws-3',
      subtopic: 'AWS углубление',
      q: 'Что такое Route53 и какие routing policies знаешь?',
      a: 'DNS-сервис AWS. Политики: Simple, Weighted, Latency, Failover, Geolocation, Geoproximity, Multivalue. Alias-записи на AWS-ресурсы. Health checks.',
      explain: 'Alias бесплатен для AWS-ресурсов. Failover требует health check.\n\n```bash\naws route53 list-hosted-zones\n```\n\nТипичная ошибка — использовать CNAME вместо Alias для apex.',
      wrong: [
        'Только Simple.',
        'Route53 — это CDN.',
        'Только A-записи.'
      ]
    },
    {
      id: 'devops-aws-4',
      subtopic: 'AWS углубление',
      q: 'Что такое SQS и SNS?',
      a: 'SQS — очередь сообщений (point-to-point, FIFO/Standard). SNS — pub/sub (fan-out). Часто вместе: SNS → несколько SQS. Для decoupling микросервисов, асинхронности.',
      explain: 'SQS гарантирует доставку, SNS — рассылку. FIFO даёт порядок, Standard — throughput.\n\n```bash\naws sqs create-queue --queue-name jobs\n```\n\nТипичная ошибка — путать SQS и SNS.',
      wrong: [
        'SQS — pub/sub, SNS — очередь.',
        'Это одно и то же.',
        'Только для Lambda.'
      ]
    },
    {
      id: 'devops-aws-5',
      subtopic: 'AWS углубление',
      q: 'Что такое Secrets Manager и Parameter Store?',
      a: 'Secrets Manager — секреты с ротацией (RDS, API keys), платный. Parameter Store — конфиги и секреты (SecureString), дешевле. Оба интегрированы с IAM и KMS.',
      explain: 'Secrets Manager умеет автоматически ротировать пароли RDS. Parameter Store дешевле для конфигов.\n\n```bash\naws secretsmanager get-secret-value --secret-id db\n```\n\nТипичная ошибка — хранить секреты в env без шифрования.',
      wrong: [
        'Это одно и то же.',
        'Только для EC2.',
        'Secrets Manager бесплатный.'
      ]
    },
    {
      id: 'devops-aws-6',
      subtopic: 'AWS углубление',
      q: 'Что такое Auto Scaling Group?',
      a: 'Управляет количеством EC2: min/max/desired, launch template, health checks. Scaling policies: target tracking, step, scheduled. Интеграция с ELB. Заменяет unhealthy инстансы.',
      explain: 'ASG автоматически заменяет упавшие инстансы. Target tracking держит метрику на целевом уровне.\n\n```bash\naws autoscaling create-auto-scaling-group\n```\n\nТипичная ошибка — не настраивать health checks.',
      wrong: [
        'Только увеличение.',
        'Только для Lambda.',
        'ASG не поддерживает ELB.'
      ]
    },
    {
      id: 'devops-aws-7',
      subtopic: 'AWS углубление',
      q: 'Что такое VPC peering и Transit Gateway?',
      a: 'Peering — соединение двух VPC (не транзитное). Transit Gateway — хаб для многих VPC и on-prem, транзитная маршрутизация. TGW масштабируемее, но дороже.',
      explain: 'Peering не транзитный: A-B и B-C не дают A-C. TGW решает это хабом.\n\n```bash\naws ec2 create-transit-gateway\n```\n\nТипичная ошибка — строить mesh из peering вместо TGW.',
      wrong: [
        'Это одно и то же.',
        'Peering транзитный.',
        'TGW только для одного VPC.'
      ]
    },
    {
      id: 'devops-aws-8',
      subtopic: 'AWS углубление',
      q: 'Как организовать мультиаккаунтную стратегию в AWS?',
      a: 'AWS Organizations + Control Tower. OU по средам (dev/stage/prod) и командам. SCP для ограничений. Centralized logging (CloudTrail в log-account), shared services VPC, SSO через IAM Identity Center.',
      explain: 'SCP ограничивают максимальные права. Control Tower автоматизирует baseline.\n\n```bash\naws organizations list-accounts\n```\n\nТипичная ошибка — держать всё в одном аккаунте.',
      wrong: [
        'Один аккаунт на всё.',
        'Только ручное управление.',
        'Organizations не поддерживается.'
      ]
    },
    {
      id: 'devops-aws-9',
      subtopic: 'AWS углубление',
      q: 'Что такое CloudFormation и CDK?',
      a: 'CFN — IaC от AWS, YAML/JSON шаблоны, stacks, drift detection. CDK — код на TS/Python, генерирует CFN. Альтернатива — Terraform. Для AWS-нативных проектов CFN удобнее.',
      explain: 'CDK даёт типизацию и абстракции. CFN — декларативный YAML.\n\n```typescript\nnew s3.Bucket(this, "Bucket");\n```\n\nТипичная ошибка — смешивать CFN и Terraform в одном проекте.',
      wrong: [
        'CFN — это Terraform.',
        'CDK — это язык.',
        'Только для Lambda.'
      ]
    },
    {
      id: 'devops-aws-10',
      subtopic: 'AWS углубление',
      q: 'Как построить disaster recovery в AWS?',
      a: 'Стратегии: Backup&Restore (RTO/RPO часы), Pilot Light (минуты), Warm Standby (секунды-минуты), Multi-Site Active/Active (секунды). Выбор по бюджету и RTO/RPO. Регулярные учения.',
      explain: 'RTO — время восстановления, RPO — допустимая потеря данных. Чем меньше, тем дороже.\n\n```bash\n# Backup: AWS Backup + cross-region copy\n```\n\nТипичная ошибка — не тестировать DR.',
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
      q: 'Как включить GC-логи и что в них смотреть?',
      a: 'Флаги: -Xlog:gc*:file=gc.log:time,uptime,level,tags (Java 9+) или -XX:+PrintGCDetails -Xloggc:gc.log (Java 8). Смотреть: паузы, частоту Full GC, размер heap до/после, allocation rate.',
      explain: 'Частый Full GC — признак утечки или малого heap. Паузы влияют на latency.\n\n```bash\njava -Xlog:gc*:file=gc.log -jar app.jar\n```\n\nТипичная ошибка — не собирать GC-логи в проде.',
      wrong: [
        'GC-логи включены по умолчанию.',
        'Только через JConsole.',
        'GC-логи не информативны.'
      ]
    },
    {
      id: 'devops-javaadv-2',
      subtopic: 'Java-админ углубление',
      q: 'Как анализировать heap dump?',
      a: 'Снять: jmap -dump:live,format=b,file=heap.hprof <pid> или при OOM (-XX:+HeapDumpOnOutOfMemoryError). Анализ: Eclipse MAT (histogram, dominator tree, leak suspects), VisualVM.',
      explain: 'MAT показывает, какие объекты держат память. Dominator tree — ключевой вид.\n\n```bash\njmap -dump:live,format=b,file=heap.hprof 12345\n```\n\nТипичная ошибка — снимать dump без :live и получать мусор.',
      wrong: [
        'Только текстовым редактором.',
        'Через jstack.',
        'Heap dump не анализируется.'
      ]
    },
    {
      id: 'devops-javaadv-3',
      subtopic: 'Java-админ углубление',
      q: 'Как анализировать thread dump?',
      a: 'jstack <pid> или kill -3. Искать: deadlock (jstack сам покажет), BLOCKED на одном мониторе, RUNNABLE в бесконечном цикле, WAITING на пуле. Сравнить 2–3 дампа подряд.',
      explain: 'Несколько дампов показывают, какие потоки stuck. jstack находит deadlock автоматически.\n\n```bash\njstack 12345 > t1.txt\nsleep 5\njstack 12345 > t2.txt\n```\n\nТипичная ошибка — анализировать один dump.',
      wrong: [
        'Только через JConsole.',
        'Thread dump — это heap.',
        'Только для deadlock.'
      ]
    },
    {
      id: 'devops-javaadv-4',
      subtopic: 'Java-админ углубление',
      q: 'Как тюнить JVM под нагрузку?',
      a: 'Heap: -Xms = -Xmx (фиксированный). GC: G1 для универсала, ZGC для низких пауз. Metaspace limit, -XX:MaxGCPauseMillis. Thread stack size. Начинать с метрик, не гадать.',
      explain: '-Xms = -Xmx избегает ресайза heap. G1 — дефолт, ZGC — для больших heap с низкими паузами.\n\n```bash\njava -Xms4g -Xmx4g -XX:+UseG1GC -jar app.jar\n```\n\nТипичная ошибка — тюнить без метрик.',
      wrong: [
        'Всегда -Xmx = RAM сервера.',
        'Всегда Serial GC.',
        'Тюнинг не нужен.'
      ]
    },
    {
      id: 'devops-javaadv-5',
      subtopic: 'Java-админ углубление',
      q: 'Как экспортировать JVM-метрики в Prometheus?',
      a: 'jmx_exporter (Java agent) или Micrometer (в Spring Boot Actuator). Endpoint /actuator/prometheus. Метрики: heap, GC, threads, http requests, JVM memory pools. Скрейпится Prometheus/VM.',
      explain: 'Micrometer — стандарт для Spring Boot. jmx_exporter — для любого Java-приложения.\n\n```yaml\n# jmx_exporter config\nrules:\n  - pattern: "java.lang<type=Memory><HeapMemoryUsage>used"\n```\n\nТипичная ошибка — не экспортировать JVM-метрики.',
      wrong: [
        'Только через JConsole.',
        'Через logstash.',
        'JVM-метрики экспортировать нельзя.'
      ]
    },
    {
      id: 'devops-javaadv-6',
      subtopic: 'Java-админ углубление',
      q: 'Как настроить graceful shutdown Spring Boot?',
      a: 'server.shutdown=graceful + spring.lifecycle.timeout-per-shutdown-phase. Обработка SIGTERM, завершение in-flight запросов. В K8s — preStop hook + terminationGracePeriodSeconds.',
      explain: 'Graceful shutdown даёт время завершить запросы. preStop sleep позволяет LB убрать Pod.\n\n```yaml\nserver:\n  shutdown: graceful\n```\n\nТипичная ошибка — kill -9 и обрыв запросов.',
      wrong: [
        'kill -9 достаточно.',
        'Только через restart.',
        'Graceful shutdown не нужен.'
      ]
    },
    {
      id: 'devops-javaadv-7',
      subtopic: 'Java-админ углубление',
      q: 'Что такое Metaspace и почему он растёт?',
      a: 'Область для метаданных классов (вместо PermGen). Растёт при загрузке классов. Утечки: classloader leaks при hot-redeploy, прокси, динамические классы. Ограничивать -XX:MaxMetaspaceSize.',
      explain: 'Metaspace в native memory. Утечка classloader держит классы и течёт.\n\n```bash\n-XX:MaxMetaspaceSize=256m\n```\n\nТипичная ошибка — игнорировать рост Metaspace.',
      wrong: [
        'Metaspace = heap.',
        'Metaspace не растёт.',
        'Metaspace удалён в Java 11.'
      ]
    },
    {
      id: 'devops-javaadv-8',
      subtopic: 'Java-админ углубление',
      q: 'Как диагностировать deadlock в Java?',
      a: 'jstack — покажет «Found one Java-level deadlock». JConsole — Detect Deadlock. Причины: два lock в разном порядке, synchronized на разных объектах. Решение: единый порядок, tryLock с timeout.',
      explain: 'jstack явно показывает deadlock и потоки. tryLock с timeout избегает вечной блокировки.\n\n```bash\njstack 12345 | grep -A20 "deadlock"\n```\n\nТипичная ошибка — перезапускать без анализа.',
      wrong: [
        'Только перезапуск.',
        'Deadlock в Java невозможен.',
        'Через heap dump.'
      ]
    },
    {
      id: 'devops-javaadv-9',
      subtopic: 'Java-админ углубление',
      q: 'Что такое JIT и как он влияет на производительность?',
      a: 'Just-In-Time компиляция байт-кода в машинный. C1 (быстрый старт), C2 (оптимизация). Warmup-период, deoptimization. Флаги: -XX:TieredStopAtLevel, -XX:+PrintCompilation. GraalVM AOT для быстрого старта.',
      explain: 'JIT компилирует горячие методы. Warmup важен для бенчмарков. GraalVM AOT убирает warmup.\n\n```bash\n-XX:+PrintCompilation\n```\n\nТипичная ошибка — мерить производительность без warmup.',
      wrong: [
        'JIT компилирует весь код сразу.',
        'JIT не влияет на производительность.',
        'JIT — это GC.'
      ]
    },
    {
      id: 'devops-javaadv-10',
      subtopic: 'Java-админ углубление',
      q: 'Как деплоить Java-приложение с zero-downtime?',
      a: 'Blue/Green или Rolling. Readiness probe, graceful shutdown, preStop sleep. Держать 2+ инстанса. Health-check endpoint. Согласованность сессий (sticky или external store).',
      explain: 'Readiness исключает из LB до готовности. Graceful shutdown завершает запросы.\n\n```yaml\nreadinessProbe:\n  httpGet: { path: /actuator/health }\n```\n\nТипичная ошибка — один инстанс и Recreate.',
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
      q: 'Напиши PromQL: процент использования CPU по инстансам.',
      a: '100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100). rate считает скорость counter, avg по instance, вычитаем из 100.',
      explain: 'Counter всегда растёт, поэтому нужен rate. mode="idle" — простой. Вычитаем из 100.\n\n```promql\n100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)\n```\n\nТипичная ошибка — использовать gauge вместо rate.',
      wrong: [
        'node_cpu_seconds_total * 100.',
        'sum(node_cpu) / 100.',
        'avg(node_cpu_seconds_total).'
      ]
    },
    {
      id: 'devops-monadv-2',
      subtopic: 'Мониторинг: практика',
      q: 'Напиши PromQL: 95-й процентиль времени ответа HTTP.',
      a: 'histogram_quantile(0.95, sum by (le) (rate(http_request_duration_seconds_bucket[5m]))). Для Summary — http_request_duration_seconds{quantile="0.95"}.',
      explain: 'Histogram требует sum by (le). Summary даёт квантили напрямую, но не агрегируется.\n\n```promql\nhistogram_quantile(0.95, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))\n```\n\nТипичная ошибка — забыть sum by (le).',
      wrong: [
        'avg(http_request_duration_seconds).',
        'max(http_request_duration_seconds).',
        'sum(rate(http_requests_total[5m])).'
      ]
    },
    {
      id: 'devops-monadv-3',
      subtopic: 'Мониторинг: практика',
      q: 'Напиши PromQL: свободная память в процентах.',
      a: '100 * node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes. MemAvailable точнее, чем MemFree (учитывает кэш).',
      explain: 'MemFree не учитывает reclaimable cache. MemAvailable — реально доступная память.\n\n```promql\n100 * node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes\n```\n\nТипичная ошибка — использовать MemFree.',
      wrong: [
        'node_memory_MemFree_bytes * 100.',
        'node_memory_MemTotal_bytes / node_memory_MemFree_bytes.',
        'free -h в PromQL.'
      ]
    },
    {
      id: 'devops-monadv-4',
      subtopic: 'Мониторинг: практика',
      q: 'Напиши PromQL: топ-5 подов по потреблению CPU в namespace.',
      a: 'topk(5, sum by (pod) (rate(container_cpu_usage_seconds_total{namespace="prod"}[5m]))).',
      explain: 'topk возвращает топ-N. sum by (pod) агрегирует по подам. rate по counter.\n\n```promql\ntopk(5, sum by (pod) (rate(container_cpu_usage_seconds_total{namespace="prod"}[5m])))\n```\n\nТипичная ошибка — забыть rate.',
      wrong: [
        'container_cpu_usage_seconds_total.',
        'max(container_cpu).',
        'sum(container_cpu) / 5.'
      ]
    },
    {
      id: 'devops-monadv-5',
      subtopic: 'Мониторинг: практика',
      q: 'Что такое recording rules и зачем?',
      a: 'Предвычисленные запросы, сохраняются как новые метрики. Ускоряют дашборды и алерты, уменьшают нагрузку. Пример: job:http_requests:rate5m = rate(http_requests_total[5m]).',
      explain: 'Recording rules считаются периодически. Дашборды используют готовые метрики.\n\n```yaml\ngroups:\n  - name: http\n    rules:\n      - record: job:http_requests:rate5m\n        expr: rate(http_requests_total[5m])\n```\n\nТипичная ошибка — считать тяжёлые запросы на каждом дашборде.',
      wrong: [
        'Правила алертов.',
        'Конфиг скрейпинга.',
        'Только для Grafana.'
      ]
    },
    {
      id: 'devops-monadv-6',
      subtopic: 'Мониторинг: практика',
      q: 'Что такое Alertmanager и как настроить маршрутизацию?',
      a: 'Компонент для обработки алертов из Prometheus/VM. route — дерево по labels (severity, team). receivers — email, slack, pagerduty. inhibit_rules — подавление. silences — временное отключение.',
      explain: 'route направляет алерты по label. inhibit подавляет вторичные алерты. silences — во время работ.\n\n```yaml\nroute:\n  receiver: slack\n  routes:\n    - match: { severity: critical }\n      receiver: pagerduty\n```\n\nТипичная ошибка — один receiver на всё.',
      wrong: [
        'Только email.',
        'Alertmanager — часть Grafana.',
        'Только для K8s.'
      ]
    },
    {
      id: 'devops-monadv-7',
      subtopic: 'Мониторинг: практика',
      q: 'Что такое SLO, SLI, Error Budget?',
      a: 'SLI — метрика (успешные запросы / все). SLO — цель (99.9% за 30 дней). Error Budget — допустимая доля ошибок (0.1%). Если бюджет исчерпан — стоп релизам, фокус на надёжности.',
      explain: 'Error Budget = 1 - SLO. Баланс между скоростью и надёжностью.\n\n```promql\nsum(rate(http_requests_total{code=~"2.."}[30d])) / sum(rate(http_requests_total[30d]))\n```\n\nТипичная ошибка — путать SLO и SLA.',
      wrong: [
        'Это одно и то же.',
        'SLO — это SLA.',
        'Error Budget не связан с SLO.'
      ]
    },
    {
      id: 'devops-monadv-8',
      subtopic: 'Мониторинг: практика',
      q: 'Как настроить Grafana as code?',
      a: 'Provisioning через YAML: datasources и dashboards в /etc/grafana/provisioning. Dashboard JSON в git. Terraform provider для Grafana. Grafana Operator в K8s.',
      explain: 'Provisioning автоматически подхватывает YAML и JSON. Dashboard as code версионируется.\n\n```yaml\napiVersion: 1\ndatasources:\n  - name: Prometheus\n    type: prometheus\n    url: http://prom:9090\n```\n\nТипичная ошибка — настраивать дашборды вручную.',
      wrong: [
        'Только вручную через UI.',
        'Через скрипты на bash.',
        'Grafana as code не поддерживается.'
      ]
    },
    {
      id: 'devops-monadv-9',
      subtopic: 'Мониторинг: практика',
      q: 'Чем метрики отличаются от логов и трейсов?',
      a: 'Метрики — числа во времени, дёшево, агрегируются, для алертов. Логи — события, дорого, детали. Трейсы — путь запроса через сервисы, для latency-анализа. Together = observability.',
      explain: 'Метрики отвечают «что», логи «что случилось», трейсы «где». Вместе дают observability.\n\n```json\n{ "trace_id": "abc", "span": "db.query" }\n```\n\nТипичная ошибка — использовать только логи.',
      wrong: [
        'Это одно и то же.',
        'Только метрики важны.',
        'Только логи важны.'
      ]
    },
    {
      id: 'devops-monadv-10',
      subtopic: 'Мониторинг: практика',
      q: 'Что такое OpenTelemetry?',
      a: 'Стандарт для сбора метрик, логов, трейсов. SDK для языков, Collector для приёма/экспорта, OTLP-протокол. Вендор-нейтральный, экспорт в Prometheus, Jaeger, Tempo, VM.',
      explain: 'OTel унифицирует инструментацию. Collector принимает OTLP и экспортирует куда угодно.\n\n```yaml\nreceivers: [otlp]\nexporters: [prometheus]\n```\n\nТипичная ошибка — использовать проприетарные SDK.',
      wrong: [
        'Только для трейсов.',
        'Продукт Google.',
        'Аналог Prometheus.'
      ]
    },
    {
      id: 'devops-monadv-11',
      subtopic: 'Мониторинг: практика',
      q: 'Как построить алерты, которые не шумят?',
      a: 'Алертить на симптомы (SLO burn rate), а не на причины. for: 5m для устойчивости. Severity с разными каналами. Inhibit и grouping. Регулярный review и удаление неиспользуемых.',
      explain: 'Burn rate — скорость исчерпания error budget. for: 5m убирает флапы.\n\n```yaml\nexpr: burn_rate > 14.4\nfor: 5m\n```\n\nТипичная ошибка — алертить на каждую метрику.',
      wrong: [
        'Алертить на всё.',
        'Только критические.',
        'Алерты не ревьюятся.'
      ]
    },
    {
      id: 'devops-monadv-12',
      subtopic: 'Мониторинг: практика',
      q: 'Как мониторить VictoriaMetrics сам?',
      a: 'Метрики: vm_* (vm_rows_inserted, vm_slow_queries, vm_cache_*, vm_free_disk_space). Алерты на диск, slow queries, ingestion rate. Само-скрейп vmagent/vmsingle/vmcluster.',
      explain: 'VM экспортирует свои метрики. Алерты на диск и slow queries — базовые.\n\n```promql\nvm_free_disk_space_bytes\n```\n\nТипичная ошибка — не мониторить саму систему мониторинга.',
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
      q: 'Расскажи про инцидент, который ты разрулил.',
      a: 'Структура STAR: Situation (контекст), Task (задача), Action (что делал по шагам), Result (результат и выводы). Показать диагностику, коммуникацию, post-mortem, предотвращение.',
      explain: 'STAR помогает структурировать ответ. Важно показать системное мышление и выводы.\n\n```text\nS: прод упал ночью\nT: восстановить\nA: диагностика, rollback\nR: uptime восстановлен, post-mortem\n```\n\nТипичная ошибка — рассказывать без результата.',
      wrong: [
        'Просто «всё починил».',
        'Обвинить коллег.',
        'Не помню.'
      ]
    },
    {
      id: 'devops-beh-2',
      subtopic: 'Поведенческие вопросы',
      q: 'Что делать, если прод упал в 3 ночи?',
      a: '1) Подтвердить алерт, 2) Оценить масштаб (что именно недоступно), 3) Коммуницировать в инцидент-канал, 4) Митигация (rollback, failover), 5) Root cause после восстановления, 6) Post-mortem без обвинений.',
      explain: 'Сначала митигация, потом root cause. Коммуникация важна для стейкхолдеров.\n\n```text\n1. Ack alert\n2. Mitigate\n3. Post-mortem\n```\n\nТипичная ошибка — искать root cause до восстановления.',
      wrong: [
        'Сразу писать директору.',
        'Ждать утра.',
        'Перезагрузить всё.'
      ]
    },
    {
      id: 'devops-beh-3',
      subtopic: 'Поведенческие вопросы',
      q: 'Как ты организуешь дежурство?',
      a: 'On-call ротация, primary/secondary, эскалация, runbooks, алерты только на actionable, компенсация, лимит нагрузки. Review алертов после каждого дежурства.',
      explain: 'Runbooks ускоряют реакцию. Review алертов убирает шум.\n\n```text\nrotation: weekly\nprimary + secondary\nescalation: 15 min\n```\n\nТипичная ошибка — один человек на всё.',
      wrong: [
        'Один человек всегда.',
        'Без эскалации.',
        'Только в рабочее время.'
      ]
    },
    {
      id: 'devops-beh-4',
      subtopic: 'Поведенческие вопросы',
      q: 'Как ты выбираешь между технологиями?',
      a: 'По требованиям: масштаб, команда, бюджет, поддержка, экосистема. PoC на малом кейсе. Оценка TCO. Предпочтение проверенным решениям, если нет веских причин.',
      explain: 'TCO включает поддержку и обучение. PoC снижает риск.\n\n```text\nRequirements → PoC → TCO → Decision\n```\n\nТипичная ошибка — выбирать по хайпу.',
      wrong: [
        'Всегда новейшее.',
        'Что знаю, то и беру.',
        'По совету в Twitter.'
      ]
    },
    {
      id: 'devops-beh-5',
      subtopic: 'Поведенческие вопросы',
      q: 'Как ты документируешь инфраструктуру?',
      a: 'IaC в git — источник правды. README в каждом репо, runbooks для инцидентов, ADR для решений, диаграммы (draw.io, Mermaid), Confluence/Notion для процессов. Документация обновляется в PR.',
      explain: 'ADR фиксирует решения и контекст. Runbooks — для дежурных.\n\n```markdown\n# ADR-001: Выбор Kubernetes\n```\n\nТипичная ошибка — документация устаревает.',
      wrong: [
        'Только в голове.',
        'Только в чате.',
        'Документация не нужна.'
      ]
    },
    {
      id: 'devops-beh-6',
      subtopic: 'Поведенческие вопросы',
      q: 'Опиши свой последний проект.',
      a: 'Структура: цель, стек, роль, ключевые решения, метрики (uptime, cost, deployment frequency), чему научился. 2–3 минуты, без воды, с конкретикой.',
      explain: 'Метрики показывают impact. Конкретика важнее общих слов.\n\n```text\nGoal: migrate to K8s\nResult: uptime 99.9%, cost -30%\n```\n\nТипичная ошибка — монолог на 10 минут.',
      wrong: [
        'Просто список технологий.',
        'Без результата.',
        '10 минут монолога.'
      ]
    },
    {
      id: 'devops-beh-7',
      subtopic: 'Поведенческие вопросы',
      q: 'Как ты относишься к post-mortem?',
      a: 'Blameless post-mortem — фокус на системах, а не людях. Timeline, root cause (5 whys), impact, action items с владельцами и сроками. Публикация внутри компании.',
      explain: 'Blameless повышает честность. Action items с владельцами не дают забыть.\n\n```text\nTimeline → Root Cause → Actions\n```\n\nТипичная ошибка — искать виноватого.',
      wrong: [
        'Найти виноватого.',
        'Не проводить.',
        'Только для крупных инцидентов.'
      ]
    },
    {
      id: 'devops-beh-8',
      subtopic: 'Поведенческие вопросы',
      q: 'Как ты автоматизируешь рутину?',
      a: 'Сначала измерить время, потом автоматизировать частые операции: скрипты, Ansible, CI/CD, self-service. Приоритет по ROI. Не автоматизировать то, что делается раз в год.',
      explain: 'Toil — рутинная работа. Автоматизация по ROI. Разовые задачи не автоматизируют.\n\n```text\nMeasure → Prioritize → Automate\n```\n\nТипичная ошибка — автоматизировать всё подряд.',
      wrong: [
        'Автоматизировать всё.',
        'Только вручную.',
        'Автоматизация не нужна.'
      ]
    },
    {
      id: 'devops-beh-9',
      subtopic: 'Поведенческие вопросы',
      q: 'Как ты внедрял культуру SRE в команде?',
      a: 'SLO/SLI, error budget, blameless post-mortem, runbooks, on-call, toil reduction, автоматизация. Начать с малого, показать ценность, обучить команду. Метрики: MTTR, deployment frequency, change failure rate.',
      explain: 'DORA-метрики показывают зрелость. Начинать с SLO и post-mortem.\n\n```text\nSLO → Error Budget → Post-mortem → Automation\n```\n\nТипичная ошибка — внедрять всё сразу.',
      wrong: [
        'Только нанять SRE.',
        'Только купить инструменты.',
        'Культура не внедряется.'
      ]
    },
    {
      id: 'devops-beh-10',
      subtopic: 'Поведенческие вопросы',
      q: 'Расскажи про случай, когда ты ошибся.',
      a: 'Честно, с контекстом: что сделал, какой impact, как обнаружил, как митигировал, что изменил в процессе. Показать зрелость и системное мышление.',
      explain: 'Честность важнее «идеального» ответа. Выводы показывают рост.\n\n```text\nMistake → Impact → Fix → Prevention\n```\n\nТипичная ошибка — говорить «я не ошибаюсь».',
      wrong: [
        'Я не ошибаюсь.',
        'Обвинить других.',
        'Без выводов.'
      ]
    },
    {
      id: 'devops-beh-11',
      subtopic: 'Поведенческие вопросы',
      q: 'Как ты принимаешь решения в условиях неопределённости?',
      a: 'Собрать данные, оценить риск, выбрать обратимые решения, PoC, таймбокс. Коммуницировать assumptions. План B. Регулярно пересматривать.',
      explain: 'Обратимые решения (two-way doors) принимаются быстро. Необратимые — медленно.\n\n```text\nData → Risk → Reversible? → Decide\n```\n\nТипичная ошибка — ждать полной информации.',
      wrong: [
        'Ждать полной информации.',
        'Монетка.',
        'Спросить начальника.'
      ]
    },
    {
      id: 'devops-beh-12',
      subtopic: 'Поведенческие вопросы',
      q: 'Как ты обучаешь junior-инженеров?',
      a: 'Менторство, парное программирование, code review, runbooks, постепенное усложнение задач. Давать контекст «почему», а не только «как». Безопасная среда для ошибок.',
      explain: 'Контекст «почему» учит мыслить. Безопасная среда ускоряет рост.\n\n```text\nPair → Review → Context → Gradual\n```\n\nТипичная ошибка — делать всё самому.',
      wrong: [
        'Только давать задачи.',
        'Делать всё самому.',
        'Не обучать.'
      ]
    }
  ]
});