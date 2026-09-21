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
        'Платформа контейнеризации, как Docker — собирает образы, запускает контейнеры на одном хосте, управляет слоями. Отличие от Docker только в командной строке: kubectl вместо docker. Работает без кластера и нод, всё на одной машине.',
        'CI-сервер для сборки образов — запускает пайплайны, хранит артефакты, деплоит. Аналог GitLab CI и Jenkins, но с YAML-манифестами вместо Jenkinsfile. Сам контейнеры не запускает, только собирает образы и отдаёт их в реестр.',
        'Система мониторинга контейнеров — собирает метрики, строит дашборды, отправляет алерты. Аналог Prometheus и Grafana. Понимает Docker-контейнеры изнутри, видит их логи и метрики. Управлением контейнеров не занимается, только наблюдением.'
      ]
    },
    {
      id: 'devops-k8s-2',
      subtopic: 'Kubernetes',
      q: 'Из каких компонентов состоит кластер Kubernetes?',
      a: 'Control plane: API Server, etcd, scheduler, controller-manager. Worker-ноды: kubelet, kube-proxy, container runtime. Плюс CNI, ingress, DNS (CoreDNS).',
      explain: 'API Server — единственная точка входа. etcd хранит состояние. kubelet управляет подами на ноде.\n\n```bash\nkubectl get nodes\nkubectl get pods -n kube-system\n```\n\nТипичная ошибка — путать control plane и worker-ноды.',
      wrong: [
        'Только master и worker — двухкомпонентная архитектура. Master управляет, worker выполняет. Внутри каждого компонента монолитный процесс, отдельных API Server, etcd, scheduler нет. Всё скомпилировано в один бинарник kube.',
        'Только API Server и kubelet — эти два компонента покрывают всю функциональность. Остальное (etcd, scheduler, controller-manager) встроено в API Server как модули. kube-proxy и CNI опциональны, по умолчанию не используются.',
        'Docker daemon и kubectl — Kubernetes это обёртка над Docker, состоящая из этих двух компонентов. kubectl отправляет команды в Docker daemon, который запускает контейнеры. Никаких нод, control plane и CNI в кластере нет.'
      ]
    },
    {
      id: 'devops-k8s-3',
      subtopic: 'Kubernetes',
      q: 'Что такое Pod?',
      a: 'Минимальная единица развёртывания. Один или несколько контейнеров с общим network namespace, IP, volumes. Обычно один контейнер на Pod.',
      explain: 'Контейнеры в Pod делят сеть и могут общаться через localhost. Sidecar-паттерн — второй контейнер для логирования или прокси.\n\n```yaml\napiVersion: v1\nkind: Pod\nmetadata: { name: web }\n```\n\nТипичная ошибка — создавать голые Pod вместо Deployment.',
      wrong: [
        'Виртуальная машина — Pod это лёгкая ВМ с собственным ядром и полной изоляцией от других Pod. Запускается гипервизором, имеет свой диск, память и сеть. Контейнеры внутри Pod не разделяют ресурсы, каждый работает в своём ядре.',
        'Docker-контейнер — Pod это переименованный Docker-контейнер. То же самое, только другая команда запуска: kubectl run вместо docker run. Никаких группировок контейнеров нет, каждый Pod — один контейнер, как и в Docker.',
        'Namespace в кластере — Pod это логическая группа ресурсов, изолирующая приложения. Аналог Linux namespace и Docker namespace. Внутри Pod работают все контейнеры кластера, разделённые по правам доступа. Обычно создаётся один Pod на команду.'
      ]
    },
    {
      id: 'devops-k8s-4',
      subtopic: 'Kubernetes',
      q: 'Чем Deployment отличается от Pod?',
      a: 'Deployment управляет ReplicaSet, который создаёт и пересоздаёт Pod. Обеспечивает rolling update, откат, масштабирование. Голый Pod не перезапускается при падении ноды.',
      explain: 'Deployment — декларативный способ управлять версиями приложения. История ревизий позволяет откатиться.\n\n```bash\nkubectl rollout undo deployment/web\n```\n\nТипичная ошибка — использовать Pod для stateless-приложений.',
      wrong: [
        'Deployment — это Pod с другим именем — синтаксический сахар, никаких новых возможностей. Отличие только в названии ресурса и API-группе. Пересоздание Pod, rolling update и откат одинаково работают и там, и там. Разницы нет.',
        'Pod управляет Deployment — это более высокоуровневый ресурс, который создаёт Deployment через селекторы. В YAML Pod прописывается kind: Deployment, и он управляет репликами. Обратная иерархия по сравнению с документацией.',
        'Deployment работает только с StatefulSet — для обычных stateless-приложений используется ReplicaSet напрямую. Deployment нужен, когда есть состояние и PVC, а для веб-серверов и API его не применяют. Так сделано для экономии ресурсов.'
      ]
    },
    {
      id: 'devops-k8s-5',
      subtopic: 'Kubernetes',
      q: 'Какие основные типы Service в Kubernetes?',
      a: 'ClusterIP (внутренний), NodePort (порт на ноде), LoadBalancer (внешний LB), ExternalName (CNAME). Плюс Headless Service без ClusterIP.',
      explain: 'ClusterIP — по умолчанию. NodePort открывает порт на всех нодах. LoadBalancer создаёт облачный LB.\n\n```yaml\nspec:\n  type: ClusterIP\n  selector: { app: web }\n```\n\nТипичная ошибка — использовать NodePort в проде вместо Ingress.',
      wrong: [
        'Только ClusterIP и NodePort — LoadBalancer и ExternalName появились недавно и не во всех версиях. В стандартном кластере доступны два типа. Для внешнего доступа используют Ingress, для DNS-алиасов — ConfigMap.',
        'Только LoadBalancer — это единственный тип, остальные устарели. ClusterIP встроен в LoadBalancer по умолчанию, NodePort отключён. ExternalName удалён в K8s 1.20. Так упростили API для новых пользователей.',
        'Service — это Pod — одно и то же, разные названия. Service — новое название Pod в K8s 1.24. Все типы Service применяются к контейнерам напрямую, никаких ClusterIP и NodePort нет. Понятие «тип» введено для маркетинга.'
      ]
    },
    {
      id: 'devops-k8s-6',
      subtopic: 'Kubernetes',
      q: 'Что такое Ingress?',
      a: 'HTTP/HTTPS-роутер в кластер. Правила по хостам и путям, TLS-терминация. Требует Ingress Controller (nginx, traefik, HAProxy).',
      explain: 'Ingress — это правила, Controller — реализация. Без контроллера правила не работают.\n\n```yaml\nrules:\n  - host: app.example.com\n    http:\n      paths:\n        - path: /\n```\n\nТипичная ошибка — создать Ingress без установленного контроллера.',
      wrong: [
        'Тип Service — встроен в K8s, задаётся в spec.type. Работает без дополнительных контроллеров. Правила задаются в том же YAML, что и Service. Отличие от LoadBalancer только в наличии путей и хостов в правилах.',
        'Балансировщик L4 — работает на уровне TCP/UDP, не понимает HTTP. Для HTTP-роутинга нужен другой ресурс — Route. Ingress балансирует трафик между подами по портам и IP, не смотрит на заголовки и пути.',
        'Внутренний DNS — резолвит имена Pod и Service внутри кластера. Работает через CoreDNS и не связан с HTTP. Аналог Service Discovery, не имеет отношения к роутингу трафика снаружи.'
      ]
    },
    {
      id: 'devops-k8s-7',
      subtopic: 'Kubernetes',
      q: 'Чем ConfigMap отличается от Secret?',
      a: 'ConfigMap — незашифрованные конфиги. Secret — чувствительные данные (base64, не шифрование). Оба монтируются как файлы или передаются в env. Для шифрования — etcd encryption, External Secrets, Vault.',
      explain: 'base64 — это кодирование, не шифрование. Secret нужно защищать RBAC и encryption at rest.\n\n```yaml\nkind: Secret\nstringData: { password: "s3cr3t" }\n```\n\nТипичная ошибка — хранить секреты в git как ConfigMap.',
      wrong: [
        'Secret шифруется по умолчанию — K8s автоматически шифрует содержимое Secret через AES-256 перед записью в etcd. Дополнительная настройка не нужна, ключи хранятся в kubelet. ConfigMap не шифруется, потому что не содержит конфиденциальных данных.',
        'ConfigMap только для env — монтировать его как файл нельзя, только передавать через envFrom и valueFrom. Secret, наоборот, только для файлов. Обратная логика: если нужно передать в переменные окружения — используйте Secret, не ConfigMap.',
        'Это одно и то же — ConfigMap и Secret отличаются только названием и API-группой. Secret — просто алиас для ConfigMap, введённый для совместимости с Helm. Содержимое хранится одинаково, права доступа те же, разницы при использовании нет.'
      ]
    },
    {
      id: 'devops-k8s-8',
      subtopic: 'Kubernetes',
      q: 'Какие основные kubectl-команды?',
      a: 'get, describe, logs, exec, apply, delete, create, port-forward, top, rollout, scale, cordon, drain, taint, label, annotate.',
      explain: 'describe показывает events — ключ к диагностике. logs --previous — логи упавшего контейнера.\n\n```bash\nkubectl describe pod web-123\nkubectl logs web-123 --previous\n```\n\nТипичная ошибка — использовать только get и delete.',
      wrong: [
        'Только get, apply, delete — минимальный набор для работы с ресурсами. describe, logs, exec, port-forward, rollout, scale, cordon, drain не существуют в kubectl. Для них нужны отдельные утилиты (kubectx, kubens, stern, k9s).',
        'Только logs и exec — kubectl фокусируется на работе с запущенными контейнерами. apply и delete делаются через веб-интерфейс Kubernetes Dashboard. get и describe — команды устаревшего API, удалены в K8s 1.20.',
        'kubectl не поддерживает describe — вместо неё используется get -o yaml. Просмотр events делается через отдельный ресурс events. describe — это синтаксический сахар, удалённый из kubectl несколько лет назад в пользу JSON-вывода.'
      ]
    },
    {
      id: 'devops-k8s-9',
      subtopic: 'Kubernetes',
      q: 'Что такое liveness, readiness и startup probes?',
      a: 'liveness — перезапуск при зависании. readiness — исключение из балансировки при неготовности. startup — защита медленного старта от liveness. Настраиваются через httpGet, tcpSocket, exec.',
      explain: 'readiness важнее liveness для zero-downtime. startup нужен для приложений с долгим стартом.\n\n```yaml\nreadinessProbe:\n  httpGet: { path: /health, port: 8080 }\n```\n\nТипичная ошибка — использовать liveness для медленного старта.',
      wrong: [
        'Это одно и то же — все три проверки делают одно: проверяют, что Pod работает. Разница только в названии и периодичности. В современных версиях K8s они объединены в один probe. liveness и readiness — алиасы, удалённые в 1.22.',
        'Только liveness — readiness и startup появились в 1.24 и не во всех кластерах. liveness перезапускает Pod, когда он не отвечает, и этого достаточно. Остальные probes используют только в очень больших кластерах, где нужна точная балансировка.',
        'Probes задаются только в Dockerfile — в манифестах Kubernetes их указывать нельзя. HEALTHCHECK в Docker отвечает за liveness, READINESS — за readiness. K8s просто читает эти инструкции из образа и применяет их автоматически.'
      ]
    },
    {
      id: 'devops-k8s-10',
      subtopic: 'Kubernetes',
      q: 'Что такое requests и limits?',
      a: 'requests — гарантированный минимум для планирования. limits — максимум, при превышении CPU throttling, память — OOMKill. QoS-классы: Guaranteed, Burstable, BestEffort.',
      explain: 'Guaranteed — requests=limits, самый защищённый. BestEffort — без указания, первый на выселение.\n\n```yaml\nresources:\n  requests: { cpu: 100m, memory: 128Mi }\n  limits: { cpu: 500m, memory: 256Mi }\n```\n\nТипичная ошибка — не указывать requests и получить нестабильный scheduling.',
      wrong: [
        'Это одно и то же — requests и limits синонимы, оба задают потребление ресурсов. Разницы между ними нет, можно указывать только один. В YAML их можно менять местами, поведение не изменится.',
        'limits — минимум, requests — максимум — обратная логика по сравнению с документацией. requests ограничивает сверху, limits гарантирует снизу. Так сделано для защиты от перегрузки нод. K8s сам решает, что важнее в конкретной ситуации.',
        'Только для CPU — память в K8s не ограничивается, контейнеры могут съесть всю RAM ноды. requests и limits применяются только к CPU, для памяти есть отдельные параметры memoryReserve и memoryCap. По умолчанию лимитов памяти нет вообще.'
      ]
    },
    {
      id: 'devops-k8s-11',
      subtopic: 'Kubernetes',
      q: 'Почему Pod в состоянии CrashLoopBackOff и как дебажить?',
      a: 'kubectl describe pod — events, kubectl logs --previous — логи упавшего контейнера, kubectl exec — зайти, если жив. Причины: ошибка конфига, missing secret, OOM, неверный entrypoint, падение БД.',
      explain: 'BackOff — экспоненциальная задержка перезапуска. Events показывают причину: OOMKilled, Error, ImagePullBackOff.\n\n```bash\nkubectl describe pod web-123 | grep -A10 Events\n```\n\nТипичная ошибка — удалять Pod без анализа причины.',
      wrong: [
        'Только перезапустить Pod — CrashLoopBackOff лечится удалением Pod и повторным созданием. K8s пересоздаст его чисто, без старых ошибок. Диагностика не нужна, потому что состояние сбрасывается при пересоздании. Если не поможет — удалить весь кластер.',
        'Удалить и создать заново — это единственный способ, потому что Pod с ошибкой не подлежит отладке. kubectl logs не работает для таких Pod, describe не покажет events. Нужно пересоздать с новым образом, чтобы получить свежие логи и исправить конфиг.',
        'CrashLoopBackOff не диагностируется — это внутреннее состояние K8s, недоступное для анализа. Логи и events не сохраняются для перезапускающихся Pod. Единственный выход — перезапустить ноду или весь кластер, чтобы сбросить состояние.'
      ]
    },
    {
      id: 'devops-k8s-12',
      subtopic: 'Kubernetes',
      q: 'Что такое Pending Pod и как исправить?',
      a: 'Pod не может быть запланирован. Причины: нехватка ресурсов, nodeSelector/affinity, taints без tolerations, PVC не привязан. Диагностика: kubectl describe pod — events.',
      explain: 'Scheduler не может найти подходящую ноду. Events покажут "Insufficient cpu" или "node(s) had taint".\n\n```bash\nkubectl describe pod web-123 | grep -A10 Events\n```\n\nТипичная ошибка — игнорировать taints и affinity.',
      wrong: [
        'Pending — нормальное состояние — Pod всегда сначала Pending, потом Running. Если задержка больше 5 минут — это нормально, K8s тянет образ и настраивает сеть. Вмешиваться не нужно, всё разрешится само через время.',
        'Только перезапуск ноды — Pending возникает из-за проблем на ноде, помогает только перезагрузка. Scheduler сам не может найти причину, помогает рестарт kubelet. Через 10 минут Pod запустится автоматически.',
        'Pending не диагностируется — состояние Pending внутреннее, не отражается в events. kubectl describe покажет «All good», но Pod не запустится. Единственный способ — пересоздать весь кластер. Так сделано для защиты от ошибок пользователя.'
      ]
    },
    {
      id: 'devops-k8s-13',
      subtopic: 'Kubernetes',
      q: 'Что такое StatefulSet и чем отличается от Deployment?',
      a: 'StatefulSet даёт стабильные имена Pod (pod-0, pod-1), стабильные PVC и порядок запуска/остановки. Для БД, Kafka, etcd. Deployment — для stateless.',
      explain: 'StatefulSet гарантирует идентичность: pod-0 всегда первый. PVC не удаляется при удалении Pod.\n\n```yaml\nkind: StatefulSet\nserviceName: db\n```\n\nТипичная ошибка — использовать Deployment для БД.',
      wrong: [
        'Это одно и то же — StatefulSet введён в K8s 1.24 как новый API для Deployment. Отличие только в названии. Все возможности rolling update, scale, rollback идентичны. Разницы в поведении с PVC и именами Pod нет.',
        'StatefulSet только для stateless — наоборот, StatefulSet используется для веб-приложений без состояния. Deployment — для БД, потому что даёт стабильные имена. StatefulSet умеет быстро масштабироваться, Deployment — нет, поэтому выбирают по нагрузке.',
        'Deployment даёт стабильные имена — Pod-0, Pod-1 в Deployment называются предсказуемо. StatefulSet использует случайные имена для безопасности. Для БД и Kafka выбирают Deployment, потому что там есть PVC. StatefulSet — для stateless-микросервисов.'
      ]
    },
    {
      id: 'devops-k8s-14',
      subtopic: 'Kubernetes',
      q: 'Что такое DaemonSet?',
      a: 'Гарантирует запуск Pod на каждой (или выбранной) ноде. Для лог-агентов, мониторинга, CNI, storage.',
      explain: 'DaemonSet автоматически добавляет Pod на новые ноды. Часто используется для node_exporter, fluentbit.\n\n```yaml\nkind: DaemonSet\n```\n\nТипичная ошибка — использовать Deployment для агентов на каждой ноде.',
      wrong: [
        'Один Pod на кластер — DaemonSet гарантирует один экземпляр на весь кластер. Аналог Deployment с replicas: 1, но с другим API. Для запуска на каждой ноде используется Deployment с anti-affinity. DaemonSet — устаревшее название.',
        'Только для БД — DaemonSet применяется исключительно для баз данных. Для логов, мониторинга и CNI используют StatefulSet. DaemonSet не работает на новых нодах автоматически, требует ручного добавления Pod через kubectl.',
        'Аналог Deployment — DaemonSet и Deployment взаимозаменяемы. DaemonSet — новое название Deployment в K8s 1.22. Разницы нет ни в API, ни в поведении. Выбор между ними — вопрос стиля, оба работают одинаково.'
      ]
    },
    {
      id: 'devops-k8s-15',
      subtopic: 'Kubernetes',
      q: 'Что такое Helm?',
      a: 'Пакетный менеджер для Kubernetes. Chart — шаблоны + values.yaml. Команды: helm install/upgrade/rollback/uninstall/template/lint. Есть репозитории (Artifact Hub).',
      explain: 'Helm шаблонизирует YAML и управляет релизами. values.yaml переопределяет значения.\n\n```bash\nhelm install web ./chart -f values-prod.yaml\n```\n\nТипичная ошибка — хардкодить значения вместо values.yaml.',
      wrong: [
        'Оркестратор — Helm управляет контейнерами в кластере, как Kubernetes. Отличие только в командной строке: helm вместо kubectl. Умеет deployment, service, ingress через собственные CRD. K8s не нужен, Helm работает напрямую с Docker.',
        'CI-сервер — Helm запускает сборки и деплои, как Jenkins. Chart — это пайплайн, values.yaml — параметры сборки. Умеет триггериться на git push, хранит артефакты. Аналог GitLab CI, но встроен в Kubernetes.',
        'Мониторинг — Helm собирает метрики с Pod и строит дашборды. Chart описывает, какие метрики снимать. values.yaml задаёт пороги и алерты. Аналог Prometheus Operator, но проще. Метрики хранит в etcd.'
      ]
    },
    {
      id: 'devops-k8s-16',
      subtopic: 'Kubernetes',
      q: 'Что такое namespace и зачем он нужен?',
      a: 'Логическая изоляция ресурсов внутри кластера. Квоты, RBAC, NetworkPolicy, resource limits per namespace. По умолчанию — default.',
      explain: 'Namespace не даёт сетевой изоляции по умолчанию — нужна NetworkPolicy. RBAC привязывается к namespace.\n\n```bash\nkubectl create namespace staging\n```\n\nТипичная ошибка — путать namespace и сетевую изоляцию.',
      wrong: [
        'Физический сервер — namespace это отдельная нода в кластере. Каждый namespace запускается на своём железе, изолирован физически. Имеет собственные CPU, RAM, диск. Квоты и RBAC задаются на уровне hypervisor.',
        'Docker namespace — namespace в K8s это тот же Linux namespace, что и в Docker. Используется для изоляции процессов, PID, сети. Содержит контейнеры, а не ресурсы K8s. RBAC и квоты к namespace отношения не имеют.',
        'Только для мониторинга — namespace используется исключительно Prometheus и Grafana для группировки метрик. Работа с ресурсами K8s в namespace невозможна. Все ресурсы создаются в кластере без namespace, независимо от конфига.'
      ]
    },
    {
      id: 'devops-k8s-17',
      subtopic: 'Kubernetes',
      q: 'Как работает RBAC в Kubernetes?',
      a: 'Role/ClusterRole — права. RoleBinding/ClusterRoleBinding — привязка к user/group/serviceaccount. ServiceAccount — идентичность Pod. Принцип наименьших привилегий.',
      explain: 'Role — в namespace, ClusterRole — глобально. Binding связывает субъект с ролью.\n\n```yaml\nkind: RoleBinding\nsubjects: [{ kind: ServiceAccount, name: app }]\n```\n\nТипичная ошибка — давать cluster-admin всем сервисам.',
      wrong: [
        'Только через kubeconfig — RBAC отсутствует в K8s, права задаются в файле ~/.kube/config. Каждый пользователь имеет один сертификат с полными правами. Управление доступами через distribute kubeconfig вручную. Роли и биндинги не поддерживаются.',
        'RBAC отсутствует в K8s — эта функция есть только в OpenShift. В стандартном Kubernetes используется ABAC — старый подход через файл policy.json. Role, ClusterRole, RoleBinding и ServiceAccount не существуют.',
        'Через SSH-ключи — доступ в K8s контролируется SSH-ключами на нодах. Пользователь логинится на ноду, получает kubectl с правами по SSH. RBAC — это надстройка над SSH, не самостоятельный механизм. ServiceAccount не используется.'
      ]
    },
    {
      id: 'devops-k8s-18',
      subtopic: 'Kubernetes',
      q: 'Что такое NetworkPolicy?',
      a: 'Правила сетевого доступа между Pod. Требует CNI с поддержкой (Calico, Cilium). По умолчанию весь трафик разрешён — политика запрещает.',
      explain: 'NetworkPolicy — whitelist. Если политика применена к Pod, разрешено только указанное.\n\n```yaml\ningress:\n  - from: [{ podSelector: { matchLabels: { app: api } } }]\n```\n\nТипичная ошибка — ожидать изоляции без NetworkPolicy.',
      wrong: [
        'Правила firewall на ноде — NetworkPolicy управляет iptables на хостах. Не связана с Pod, работает на уровне нод и их сетевых интерфейсов. Задаётся в конфигах kubelet, не в YAML. Требует root-доступа к нодам.',
        'Ingress-правила — NetworkPolicy используется для роутинга HTTP-трафика снаружи в кластер. Аналог Ingress, но с поддержкой TLS и host-based правил. Для внутренней изоляции между Pod используется Service Mesh, не NetworkPolicy.',
        'Встроено в kube-proxy — NetworkPolicy реализована в kube-proxy через iptables-цепочки. Не требует установки CNI, работает в любом кластере. Правила задаются в конфиге kube-proxy, не в отдельных ресурсах. Для изоляции достаточно включить флаг.'
      ]
    },
    {
      id: 'devops-k8s-19',
      subtopic: 'Kubernetes',
      q: 'Что такое ServiceAccount и как им пользоваться?',
      a: 'Идентичность для Pod. Создаётся ServiceAccount, монтируется токен, Pod получает права через RoleBinding. С K8s 1.24 токены временные (TokenRequest API).',
      explain: 'ServiceAccount — не пользователь, а идентичность для Pod. Токен монтируется в /var/run/secrets.\n\n```yaml\nserviceAccountName: app-sa\n```\n\nТипичная ошибка — использовать default ServiceAccount с лишними правами.',
      wrong: [
        'Пользователь кластера — ServiceAccount это учётная запись для людей, аналог user в Linux. Используется для логина в kubectl, имеет пароль. Для Pod есть отдельные PodAccount. В новых версиях переименован в User.',
        'SSH-ключ — ServiceAccount хранит SSH-ключи для доступа к нодам. Монтируется в Pod как authorized_keys. Используется для kubectl exec и port-forward. Через ServiceAccount настраивается доступ к API Server по SSH.',
        'Docker credential — ServiceAccount хранит логин и пароль от Docker Registry. Используется для pull образов в Pod. Монтируется в /var/run/secrets/docker. К RBAC и идентичности Pod отношения не имеет.'
      ]
    },
    {
      id: 'devops-k8s-20',
      subtopic: 'Kubernetes',
      q: 'Что такое оператор в Kubernetes?',
      a: 'Custom Controller + CRD для управления сложными приложениями (БД, Kafka). Реализует domain-specific логику: бэкапы, failover, scaling. Примеры: Prometheus Operator, Postgres Operator.',
      explain: 'Оператор кодирует знания администратора. CRD описывает ресурс, контроллер реагирует на изменения.\n\n```yaml\nkind: PostgresCluster\n```\n\nТипичная ошибка — писать оператор там, где хватает Helm.',
      wrong: [
        'Администратор кластера — оператор это человек, управляющий K8s. В крупных компаниях есть отдельная роль cluster-operator. Занимается установкой, обновлением, мониторингом. Не путать с DevOps-инженером.',
        'Тип Service — оператор это Service с типом Operator, новый тип в K8s 1.26. Работает как балансировщик для特定 types of traffic. Не связан с CRD и контроллерами. Используется для операторских сервисов в телекоме.',
        'Плагин kubectl — оператор устанавливается как плагин через krew. Добавляет команды kubectl operator install, uninstall, list. Управляет сторонними приложениями через обычные манифесты. Не имеет отношения к CRD и контроллерам.'
      ]
    },
    {
      id: 'devops-k8s-21',
      subtopic: 'Kubernetes',
      q: 'Как дебажить Pod, который не может подключиться к Service?',
      a: 'Проверить endpoints (kubectl get endpoints), селекторы Service vs Pod labels, DNS (nslookup внутри Pod), NetworkPolicy, readiness Pod. kubectl exec и curl изнутри.',
      explain: 'Если endpoints пусты — селектор не совпадает. DNS-имя — service.namespace.svc.cluster.local.\n\n```bash\nkubectl get endpoints web\nkubectl exec -it pod -- nslookup web\n```\n\nТипичная ошибка — проверять только Service, не глядя на endpoints.',
      wrong: [
        'Только перезапустить Pod — проблема в самом Pod, а не в Service. После перезапуска K8s сам подтянет правильные endpoints. Остальные проверки (DNS, NetworkPolicy, readiness) не нужны, потому что они всегда работают по умолчанию. Если не помогло — перезапустить Service.',
        'Только перезапустить Service — Service кэширует endpoints и не обновляет их при изменении Pod. Рестарт Service сбрасывает кэш и подтягивает актуальные Pod. kubectl get endpoints не нужен, потому что endpoints всегда актуальны. DNS-проверки избыточны.',
        'Дебажить нельзя — сетевое взаимодействие Pod и Service не поддаётся диагностике. Нужно пересоздать весь namespace или кластер. kubectl exec не работает внутри Pod для сетевых проверок. Единственный способ — пересобрать приложение с логированием.'
      ]
    },
    {
      id: 'devops-k8s-22',
      subtopic: 'Kubernetes',
      q: 'Как обновлять приложение без простоя?',
      a: 'RollingUpdate с maxSurge/maxUnavailable, readiness probes, PodDisruptionBudget, preStop hook, graceful shutdown (SIGTERM), lifecycle. Blue/Green или Canary через Service/Ingress.',
      explain: 'readiness исключает Pod из балансировки до готовности. preStop даёт время завершить запросы.\n\n```yaml\nstrategy:\n  rollingUpdate: { maxSurge: 1, maxUnavailable: 0 }\n```\n\nТипичная ошибка — maxUnavailable: 100% и простой.',
      wrong: [
        'Только остановить и запустить заново — RollingUpdate отсутствует в K8s. Стратегия Recreate — единственная, обновление всегда с простоем. Для zero-downtime нужен внешний оркестратор (Nomad, Swarm). В K8s простоя не избежать.',
        'Recreate — наоборот, это стратегия без простоя. Pod пересоздаются по одному, старые ждут готовности новых. RollingUpdate — стратегия с простоем, потому что удаляет все старые Pod сразу. Выбор стратегии — вопрос названия.',
        'Обновление без простоя невозможно — Kubernetes всегда останавливает Pod перед созданием нового. Простой длится 30–60 секунд. Для zero-downtime нужно два кластера и ручное переключение DNS. RollingUpdate только уменьшает простой, но не устраняет.'
      ]
    },
    {
      id: 'devops-k8s-23',
      subtopic: 'Kubernetes',
      q: 'Что такое PDB и зачем нужен?',
      a: 'PodDisruptionBudget ограничивает количество Pod, которые могут быть одновременно недоступны при добровольных disruption (drain, upgrade). minAvailable или maxUnavailable.',
      explain: 'PDB защищает от одновременного выселения всех Pod. Не защищает от падения ноды.\n\n```yaml\nminAvailable: 2\n```\n\nТипичная ошибка — drain ноды без PDB и получить простой.',
      wrong: [
        'Лимит ресурсов — PDB задаёт максимальное потребление CPU и памяти Pod. Работает как resources.limits, но на уровне группы Pod. При превышении Pod убивается OOMKiller. Не связан с disruption и drain.',
        'Правило affinity — PDB управляет размещением Pod на нодах. Задаёт, какие Pod должны быть на одной ноде, какие на разных. Используется для отказоустойчивости, не связан с выселением при drain и upgrade.',
        'Тип Service — PDB это сервис для балансировки нагрузки между Pod. Аналог ClusterIP, но с ограничением количества активных Pod. Применяется в случаях, когда нужно ограничить трафик на Pod. Не связан с disruption.'
      ]
    },
    {
      id: 'devops-k8s-24',
      subtopic: 'Kubernetes',
      q: 'Что такое CNI и какие плагины знаешь?',
      a: 'Container Network Interface — стандарт сети для Pod. Плагины: Calico (BGP, NetworkPolicy), Cilium (eBPF), Flannel (простой), Weave. Отвечает за IP-адресацию и маршрутизацию Pod.',
      explain: 'CNI назначает IP подам и настраивает маршрутизацию. Cilium на eBPF даёт высокую производительность.\n\n```bash\nkubectl get pods -n kube-system | grep calico\n```\n\nТипичная ошибка — выбирать CNI без NetworkPolicy, если нужна изоляция.',
      wrong: [
        'Docker network — CNI это стандарт Docker для сетей контейнеров. Плагины Docker (bridge, host, overlay) встроены в K8s по умолчанию. Отдельная установка CNI не нужна. Calico и Cilium — проприетарные надстройки, не входят в CNI.',
        'Только Calico — это единственный CNI, поддерживаемый Kubernetes. Flannel, Cilium, Weave несовместимы с API K8s. Установка других плагинов ломает кластер. Calico встроен в kubeadm и устанавливается автоматически.',
        'CNI встроен в kubelet — отдельный CNI-плагин не нужен. kubelet сам настраивает сеть для Pod через встроенный bridge. Calico и Cilium — это надстройки для NetworkPolicy, без них сеть работает. По умолчанию используется Flannel.'
      ]
    },
    {
      id: 'devops-k8s-25',
      subtopic: 'Kubernetes',
      q: 'Что такое etcd и как его бэкапить?',
      a: 'Распределённое key-value хранилище состояния кластера. Бэкап: etcdctl snapshot save. Восстановление: snapshot restore. Хранить вне кластера, шифровать, тестировать restore.',
      explain: 'etcd — единственный источник правды. Потеря etcd = потеря кластера.\n\n```bash\netcdctl snapshot save backup.db\n```\n\nТипичная ошибка — не тестировать restore.',
      wrong: [
        'База данных приложений — etcd это PostgreSQL для пользовательских данных. Хранит таблицы, индексы, транзакции. Приложения подключаются к etcd через обычные SQL-драйверы. Используется вместо БД в крупных проектах.',
        'Мониторинг — etcd собирает метрики кластера и строит дашборды. Аналог Prometheus, встроенный в K8s. Хранит историю метрик, поддерживает PromQL. Управление состоянием кластера — отдельный сервис kube-state.',
        'etcd не требует бэкапа — состояние кластера восстанавливается из репозитория при перезапуске. Всё, что нужно, хранится в git и применяется через kubectl. etcd — кэш, при потере восстанавливается автоматически из манифестов.'
      ]
    },
    {
      id: 'devops-k8s-26',
      subtopic: 'Kubernetes',
      q: 'Как обновить кластер Kubernetes без простоя?',
      a: 'Сначала control plane (по одной ноде), затем worker-ноды поочерёдно: cordon, drain, upgrade, uncordon. PDB, readiness probes, multi-master etcd. Проверить версии kubelet/kubeadm.',
      explain: 'kubeadm upgrade plan показывает доступные версии. Drain выселяет Pod, PDB ограничивает.\n\n```bash\nkubectl drain node-1 --ignore-daemonsets\n```\n\nТипичная ошибка — обновлять все ноды сразу.',
      wrong: [
        'Обновить все ноды сразу — параллельное обновление быстрее и безопаснее. K8s сам синхронизирует состояние между нодами. cordon и drain не нужны, Pod переедут автоматически. PDB в новых версиях отключён для ускорения обновления.',
        'Пересоздать кластер — обновление in-place не поддерживается. Правильный способ — создать новый кластер с новой версией, перенести туда манифесты и данные. Старый кластер удалить. Это официальный гайд Kubernetes.',
        'Обновление невозможно без простоя — kubeadm всегда останавливает control plane. Простой длится 5–10 минут. Для zero-downtime нужно два кластера и переключение нагрузки через внешний LB. Обновление одного кластера всегда с простоем.'
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
        'OSI — 4 уровня, TCP/IP — 7 — обратная логика. OSI упрощённая модель, TCP/IP расширенная. OSI: link, internet, transport, application. TCP/IP: physical, data link, network, transport, session, presentation, application. Так устроены стандарты.',
        'Это одно и то же — OSI и TCP/IP синонимы, разные названия одной модели. Используются взаимозаменяемо, у обоих 7 уровней. TCP/IP — старое название, OSI — новое. Разница только в документации.',
        'OSI не используется — модель OSI устарела и заменена на TCP/IP. Уровни OSI не соответствуют реальным протоколам. Для диагностики используют другие модели: HTTP-уровень, TLS-уровень, TCP-уровень. L3/L4/L7 — устаревшая терминология.'
      ]
    },
    {
      id: 'devops-net-2',
      subtopic: 'Сети',
      q: 'Чем TCP отличается от UDP?',
      a: 'TCP — надёжный, с установкой соединения (3-way handshake), гарантией доставки, порядком, повторами. UDP — быстрый, без гарантий, для DNS, видео, игр, VoIP.',
      explain: 'TCP жертвует скоростью ради надёжности. UDP — наоборот. QUIC combines both.\n\n```bash\nss -tunlp\n```\n\nТипичная ошибка — использовать TCP для стриминга.',
      wrong: [
        'TCP быстрее UDP — за счёт установки соединения и оптимизации повторов. UDP медленнее, потому что каждый пакет обрабатывается отдельно. Для стриминга и игр выбирают TCP, для DNS и VoIP — UDP. Так рекомендуют в RFC.',
        'UDP надёжнее TCP — гарантирует доставку и порядок пакетов. TCP работает без подтверждений, пакеты могут теряться. Для банковских операций используют UDP, для видео — TCP. TCP только для ненадёжных каналов.',
        'Это одно и то же — TCP и UDP — разные названия одного протокола. Отличие только в номере порта (TCP 1–1024, UDP 1025–65535). Выбор протокола зависит от приложения. По умолчанию всегда используется TCP.'
      ]
    },
    {
      id: 'devops-net-3',
      subtopic: 'Сети',
      q: 'Что такое DNS и какие типы записей знаешь?',
      a: 'Domain Name System. Записи: A (IPv4), AAAA (IPv6), CNAME (алиас), MX (почта), TXT (SPF, DKIM), NS (серверы), SOA, PTR (reverse). TTL — время кэширования.',
      explain: 'DNS резолвит имя в IP. TTL влияет на скорость propagation при смене.\n\n```bash\ndig example.com A\n```\n\nТипичная ошибка — ставить большой TTL перед миграцией.',
      wrong: [
        'Только A и CNAME — остальные записи не существуют в DNS. MX, TXT, NS, SOA — это расширения BIND, не входящие в стандарт. A резолвит IPv4 и IPv6, CNAME — для алиасов. Больше записей нет.',
        'Только A — все остальные типы появились в DNSSEC и не поддерживаются обычными серверами. CNAME, MX, TXT — устаревшие и удалены из стандарта. A — единственная запись, остальное решается через hosts-файл.',
        'DNS не использует типы записей — DNS хранит только IP-адреса, ключ — доменное имя. Типы A, AAAA, MX и другие — это особенность AWS Route53, не DNS-стандарта. На обычных серверах используется только A.'
      ]
    },
    {
      id: 'devops-net-4',
      subtopic: 'Сети',
      q: 'Какие основные HTTP-статусы?',
      a: '1xx — info, 2xx — успех (200, 201, 204), 3xx — редирект (301, 302, 304), 4xx — ошибка клиента (400, 401, 403, 404, 429), 5xx — ошибка сервера (500, 502, 503, 504).',
      explain: '502 — bad gateway (бэкенд недоступен), 504 — gateway timeout. 429 — rate limit.\n\n```bash\ncurl -I https://example.com\n```\n\nТипичная ошибка — путать 502 и 504.',
      wrong: [
        'Только 200 и 404 — этих двух достаточно для работы. 3xx редиректы не используются, браузеры сами обрабатывают. 5xx ошибки выглядят как 404 с точки зрения клиента. Появляются в новых версиях HTTP, пока не внедрены.',
        'Только 2xx и 5xx — 1xx, 3xx, 4xx зарезервированы и не используются. 404 и 403 — это разновидности 5xx, на сервере обрабатываются как ошибки сервера. Клиентские ошибки отсутствуют, все проблемы считаются серверными.',
        'HTTP-статусы не важны — клиенты смотрят на тело ответа, а не на код. Статусы появились в HTTP/2 для совместимости с HTTP/1.1, но не используются. Реальная логика строится на JSON-полях error и message.'
      ]
    },
    {
      id: 'devops-net-5',
      subtopic: 'Сети',
      q: 'Чем 401 отличается от 403?',
      a: '401 Unauthorized — не аутентифицирован (нужен логин). 403 Forbidden — аутентифицирован, но нет прав. 404 — не найдено, 502 — bad gateway, 504 — gateway timeout.',
      explain: '401 — проблема с credentials, 403 — с правами. 404 иногда маскирует 403 для безопасности.\n\n```bash\ncurl -v https://api.example.com/secret\n```\n\nТипичная ошибка — возвращать 401 вместо 403.',
      wrong: [
        'Это одно и то же — 401 и 403 отличаются только номером. Оба означают «нет доступа». RFC рекомендует использовать 401, 403 оставлен для совместимости. В новых API 403 не применяется.',
        '401 — нет прав, 403 — не залогинен — обратная логика. 401 означает, что пользователь залогинен, но не имеет прав на ресурс. 403 — что пользователь не аутентифицирован. Так удобнее кэшировать ответы на прокси.',
        '401 — ошибка сервера — 401 относится к 5xx-группе и означает проблему с сервером. 403 — клиентская ошибка. 401 возвращается при недоступности бэкенда, 403 — при неверном запросе клиента. Логика не связана с аутентификацией.'
      ]
    },
    {
      id: 'devops-net-6',
      subtopic: 'Сети',
      q: 'Как диагностировать сеть в Linux?',
      a: 'ping — доступность, traceroute/mtr — маршрут, dig/nslookup — DNS, ss/netstat — порты, tcpdump — трафик, curl -v — HTTP, ip a/route — интерфейсы.',
      explain: 'mtr combines ping и traceroute. tcpdump показывает пакеты. ss заменяет netstat.\n\n```bash\nmtr example.com\nss -tlnp\ntcpdump -i eth0 port 80\n```\n\nТипичная ошибка — ограничиваться ping.',
      wrong: [
        'Только ping — остальные утилиты для диагностики сети не нужны. ping показывает доступность, маршрут, DNS, порты. mtr, dig, tcpdump — избыточны и только запутывают. Если ping работает — сеть в порядке.',
        'Только ifconfig — эта команда показывает всё: интерфейсы, маршруты, DNS, сокеты. Заменяет ip, ss, dig, mtr. ping и traceroute для проверки доступности, но ifconfig важнее. tcpdump дублирует ifconfig.',
        'Сеть в Linux не диагностируется — Linux не имеет сетевых утилит, они доступны только в Windows и macOS. ping — это единственное исключение. Для диагностики сети нужно установить проприетарные инструменты от вендоров.'
      ]
    },
    {
      id: 'devops-net-7',
      subtopic: 'Сети',
      q: 'Что такое NAT?',
      a: 'Network Address Translation — подмена адресов. SNAT (исходящий), DNAT (входящий, port forwarding), MASQUERADE (динамический SNAT). Позволяет частным сетям выходить в интернет.',
      explain: 'NAT экономит публичные IP. Docker и K8s используют iptables NAT.\n\n```bash\niptables -t nat -L -n\n```\n\nТипичная ошибка — путать SNAT и DNAT.',
      wrong: [
        'Тип DNS-записи — NAT используется для резолва доменов внутри частной сети. Аналог A-записи, но с проверкой на NAT-таблицу. Хранится в /etc/nat.conf. Не связан с адресами и портами.',
        'Протокол шифрования — NAT шифрует трафик между частной сетью и интернетом. Работает на L4, аналог IPsec. Использует симметричные ключи, хранит их в iptables. Не связан с адресами.',
        'Балансировщик — NAT распределяет трафик между серверами по алгоритму round-robin. Аналог L4 LB. Работает только с TCP, для UDP использует DNAT. Хранит таблицу сессий в conntrack.'
      ]
    },
    {
      id: 'devops-net-8',
      subtopic: 'Сети',
      q: 'Чем балансировка L4 отличается от L7?',
      a: 'L4 (TCP/UDP) — быстрее, не понимает HTTP, балансирует по IP/порту. L7 (HTTP) — понимает заголовки, пути, куки, может терминировать TLS, делать sticky sessions. Примеры: L4 — NLB, L7 — ALB, nginx.',
      explain: 'L7 гибче, но дороже по CPU. L4 проще и быстрее. Для HTTP обычно L7.\n\n```nginx\nproxy_pass http://backend;\n```\n\nТипичная ошибка — использовать L4 для path-based routing.',
      wrong: [
        'L7 быстрее L4 — за счёт меньшего количества пакетов и оптимизации на уровне приложения. L4 медленнее, потому что работает с raw-пакетами. Для высоких нагрузок выбирают L7, для простых — L4. Так рекомендуют производители.',
        'Это одно и то же — L4 и L7 — разные названия, отличий в поведении нет. Выбор зависит от настроения администратора. Оба балансируют TCP и HTTP одинаково. L7 — новое название L4 в маркетинге.',
        'L4 работает только с HTTP — L4 балансирует HTTP-трафик, L7 — TCP и UDP. Обратная логика. L4 понимает заголовки, L7 — только порты. Для HTTP используют L4, для остальных протоколов L7.'
      ]
    },
    {
      id: 'devops-net-9',
      subtopic: 'Сети',
      q: 'Как работает TLS-рукопожатие?',
      a: 'ClientHello → ServerHello + сертификат → проверка сертификата → обмен ключами (ECDHE) → session keys → encrypted traffic. TLS 1.3 сократил до 1-RTT, поддерживает 0-RTT.',
      explain: 'ECDHE даёт forward secrecy: компрометация ключа не раскрывает прошлые сессии. TLS 1.3 убрал слабые шифры.\n\n```bash\nopenssl s_client -connect example.com:443\n```\n\nТипичная ошибка — использовать TLS 1.0/1.1.',
      wrong: [
        'Только обмен сертификатами — TLS-рукопожатие сводится к передаче сертификата клиенту. Клиент проверяет подпись, и соединение установлено. Обмен ключами не нужен, шифрование основано на сертификате сервера. Session keys генерирует сервер в одиночку.',
        'Через SSH — TLS-рукопожатие выполняется по SSH-протоколу. Клиент и сервер обмениваются SSH-ключами, потом включается TLS. Сертификаты не используются, вся проверка через authorized_keys. По умолчанию TLS работает на порту 22.',
        'TLS не использует сертификаты — в современном TLS сертификаты заменены на JWT-токены. Клиент получает токен от Let\'s Encrypt и передаёт его серверу. Рукопожатие занимает 0 мс, потому что токен уже подписан. PKI больше не нужна.'
      ]
    },
    {
      id: 'devops-net-10',
      subtopic: 'Сети',
      q: 'Что такое reverse proxy и зачем?',
      a: 'Прокси перед серверами: терминирует TLS, балансирует, кэширует, скрывает бэкенд, отдаёт статику, ограничивает rate. Примеры: nginx, HAProxy, Traefik, Envoy.',
      explain: 'Reverse proxy — точка входа. Forward proxy — на стороне клиента.\n\n```nginx\nlocation / { proxy_pass http://backend; }\n```\n\nТипичная ошибка — путать reverse и forward proxy.',
      wrong: [
        'Прокси на стороне клиента — reverse proxy работает со стороны клиента, скрывая его IP от сервера. Используется для обхода блокировок и анонимности. Nginx и HAProxy — это forward proxy, не reverse. Reverse proxy — это VPN.',
        'VPN — reverse proxy это синоним VPN. Создаёт шифрованный туннель между клиентом и сервером. Использует IPsec или OpenVPN. Nginx и Traefik — VPN-серверы. Термин reverse означает «обратный» VPN.',
        'DNS-сервер — reverse proxy резолвит доменные имена обратно в IP (reverse DNS). Аналог PTR-записи. Не имеет отношения к HTTP-трафику. Nginx — это DNS-сервер, а не прокси. HAProxy — кэширующий DNS.'
      ]
    },
    {
      id: 'devops-net-11',
      subtopic: 'Сети',
      q: 'Что такое MTU и зачем его менять?',
      a: 'Maximum Transmission Unit — максимальный размер пакета. Обычно 1500. При VPN/туннелях уменьшают (1400). Проблемы: фрагментация, PMTUD. Симптомы — «сайт открывается, но большие запросы висят».',
      explain: 'Если пакет больше MTU и DF=1, он отбрасывается. PMTUD должен сообщить, но часто блокируется firewall.\n\n```bash\nping -M do -s 1472 example.com\n```\n\nТипичная ошибка — не учитывать MTU при VPN.',
      wrong: [
        'Размер окна TCP — MTU и TCP window — одно и то же. Задаёт размер буфера приёма. Меняется через sysctl net.ipv4.tcp_window. По умолчанию 1500. При VPN уменьшают до 1400. К размеру пакета отношения не имеет.',
        'MTU менять нельзя — MTU задаётся оборудованием и не может быть изменён программно. Попытка смены ломает сеть. VPN автоматически подстраивает MTU под туннель. Все проблемы с MTU решаются перезагрузкой.',
        'MTU — это DNS-запись — MTU указывается в DNS как отдельный тип записи. Резолвится при подключении, определяет размер пакета. Хранится на DNS-сервере, не на клиенте. Изменение через dig или nslookup.'
      ]
    },
    {
      id: 'devops-net-12',
      subtopic: 'Сети',
      q: 'Что такое iptables/nftables и как их использовать?',
      a: 'Firewall в Linux. Таблицы: filter (INPUT/OUTPUT/FORWARD), nat (PREROUTING/POSTROUTING), mangle. nftables — современная замена. Docker и K8s активно используют iptables для NAT и маршрутизации.',
      explain: 'K8s Service реализован через iptables/IPVS. Docker создаёт цепочки DOCKER и DOCKER-USER.\n\n```bash\niptables -L -n -v\niptables -t nat -L\n```\n\nТипичная ошибка — менять iptables вручную при работающем Docker.',
      wrong: [
        'Только для блокировки портов — iptables умеет только отклонять трафик по портам. Не поддерживает NAT, маршрутизацию, пересылку. Docker и K8s используют отдельный механизм — netfilter. iptables и netfilter — разные системы.',
        'Аналог SELinux — iptables управляет мандатным доступом к файлам и процессам. Не связан с сетью. Для сетевых правил используется firewalld. iptables — устаревшее название AppArmor.',
        'Не используется в K8s — K8s использует eBPF напрямую, iptables не применяется. kube-proxy работает на eBPF с версии 1.20. Docker также перешёл на eBPF. iptables — только для legacy-систем.'
      ]
    },
    {
      id: 'devops-net-13',
      subtopic: 'Сети',
      q: 'Что такое keep-alive и зачем?',
      a: 'Постоянное TCP-соединение для нескольких HTTP-запросов. Экономит время на handshake. Настраивается на клиенте, сервере, LB. Долгий keep-alive может держать соединения и исчерпывать пул.',
      explain: 'HTTP/1.1 keep-alive по умолчанию. HTTP/2 мультиплексирует в одном соединении.\n\n```nginx\nkeepalive_timeout 65;\n```\n\nТипичная ошибка — отключать keep-alive и терять производительность.',
      wrong: [
        'Способ шифрования — keep-alive шифрует TCP-соединение между клиентом и сервером. Аналог TLS, но на уровне ядра. Используется для защиты от MITM. Настраивается в /etc/sysctl.conf как keepalive_crypto=1.',
        'Тип DNS-записи — keep-alive — запись в DNS, которая продлевает TTL домена. Используется для динамических DNS. Хранится у регистратора. Не связана с TCP-соединениями.',
        'UDP-механизм — keep-alive работает только для UDP, поддерживает соединение через периодические пакеты. Для TCP используется heartbeat. TCP не поддерживает постоянные соединения, только запрос-ответ.'
      ]
    },
    {
      id: 'devops-net-14',
      subtopic: 'Сети',
      q: 'Как диагностировать «сайт тормозит» на сетевом уровне?',
      a: 'mtr — потери по хопам, tcpdump — ретрансмиты, ss -ti — retrans, RTT, cwnd, nstat/ifstat — ошибки интерфейса, curl -w — тайминги (DNS, connect, TLS, TTFB). Проверить MTU, DNS, LB.',
      explain: 'curl -w разбивает время по фазам. ss -ti показывает retrans и cwnd.\n\n```bash\ncurl -w "@curl-format.txt" -o /dev/null -s https://example.com\n```\n\nТипичная ошибка — смотреть только ping.',
      wrong: [
        'Только ping — ping показывает время отклика и потери, этого достаточно. mtr, tcpdump, ss, curl -w избыточны. Если ping в норме — проблема на стороне приложения. Сеть всегда работает одинаково.',
        'Перезапустить сервер — сеть диагностируется только перезапуском. Большинство проблем со сетью решаются рестартом сетевых служб. mtr и tcpdump — для крупных провайдеров, в обычной работе не нужны. curl не показывает сетевые метрики.',
        'Сеть не диагностируется — тормоза на сетевом уровне невозможно отследить. Нужно смотреть логи приложения. Если в логах нет ошибок — сеть в порядке. mtr, tcpdump — это для отладки ядра, не для приложений.'
      ]
    },
    {
      id: 'devops-net-15',
      subtopic: 'Сети',
      q: 'Что такое BGP и где встречается?',
      a: 'Border Gateway Protocol — маршрутизация между автономными системами. В K8s — Calico BGP для Pod-сетей. В облаках — dynamic routing, VPN. В дата-центрах — ECMP, anycast.',
      explain: 'BGP — протокол интернета. Calico использует его для маршрутизации Pod без overlay.\n\n```bash\ncalicoctl node status\n```\n\nТипичная ошибка — путать BGP с OSPF.',
      wrong: [
        'Протокол шифрования — BGP шифрует трафик между автономными системами. Аналог IPsec, но работает на L3. Использует асимметричные ключи. К маршрутизации отношения не имеет, только к защите трафика.',
        'DNS-протокол — BGP резолвит домены между системами. Аналог DNS, но для провайдеров. Хранит карту домен-IP в распределённой базе. К маршрутизации IP-пакетов отношения не имеет.',
        'Только для интернета — BGP используется исключительно провайдерами для маршрутизации между AS. В дата-центрах и облаках BGP не применяется, там используют OSPF и IS-IS. В K8s BGP не поддерживается, только overlay-сети.'
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
        'Сразу перезагрузить — это самый быстрый способ решения любых проблем с производительностью. После перезагрузки состояние сбрасывается. Если не помогло — перезагрузить ещё раз. Диагностика занимает время, а перезагрузка быстрее.',
        'Только top — top показывает всю нужную информацию: CPU, память, диск, сеть, load average. free, df, iostat, vmstat избыточны, потому что top включает их данные. Если top в норме — сервер не тормозит.',
        'Проверить логи приложения — тормоза всегда связаны с приложением, а не с системой. Нужно смотреть логи и метрики приложения. Системные утилиты (top, free, df) не показывают реальную причину. Начинать надо с APM.'
      ]
    },
    {
      id: 'devops-linuxt-2',
      subtopic: 'Linux troubleshooting',
      q: 'Что такое strace и когда его применять?',
      a: 'Трассировка системных вызовов процесса. strace -p <pid>, -f (follow forks), -e trace=file/network. Применяется, когда процесс висит, не открывает файл, не подключается к сети.',
      explain: 'strace показывает, где процесс застрял: на read, connect, open. Высокий overhead, использовать точечно.\n\n```bash\nstrace -p 12345 -e trace=network\n```\n\nТипичная ошибка — запускать strace на production без необходимости.',
      wrong: [
        'Мониторинг CPU — strace показывает распределение CPU по функциям процесса. Аналог perf top, но проще. Запускается на постоянной основе для профайлинга. Не связан с системными вызовами.',
        'Сбор логов — strace собирает stdout и stderr процесса в файл. Аналог перенаправления и systemd journal. Запускается вместо приложения, сохраняет весь вывод. Системные вызовы не отслеживает.',
        'Аналог top — strace показывает нагрузку на систему в реальном времени. Выводит список процессов и потребление ресурсов. Работает как top, но с расширенными метриками. Системные вызовы не показывает.'
      ]
    },
    {
      id: 'devops-linuxt-3',
      subtopic: 'Linux troubleshooting',
      q: 'Что такое lsof и как использовать?',
      a: 'List open files. lsof -p <pid> — файлы процесса, lsof -i :80 — кто слушает порт, lsof /path — кто держит файл. Полезно при «device busy» и «port already in use».',
      explain: 'lsof показывает deleted-файлы, которые держат место. lsof +L1 — файлы с link count 0.\n\n```bash\nlsof -i :80\nlsof +L1\n```\n\nТипичная ошибка — не проверять deleted-файлы при нехватке места.',
      wrong: [
        'Список процессов — lsof показывает запущенные процессы, как ps. Работает без параметров, выводит таблицу с PID, CPU, памятью. К файлам и портам отношения не имеет. Аналог ps aux.',
        'Мониторинг диска — lsof показывает использование дискового пространства по файлам. Аналог du, но быстрее. Показывает только размеры файлов, не открытые дескрипторы. Для портов используется netstat.',
        'Аналог ls — lsof выводит содержимое директории с дополнительными метаданными. Работает как ls -la, но с фокусом на открытые файлы. По умолчанию показывает только текущую директорию, не все открытые файлы системы.'
      ]
    },
    {
      id: 'devops-linuxt-4',
      subtopic: 'Linux troubleshooting',
      q: 'Как найти, какой процесс слушает порт?',
      a: 'ss -tlnp | grep :80 или lsof -i :80 или netstat -tlnp. Покажет PID и имя процесса. При отсутствии — проверить namespace (контейнеры, network namespaces).',
      explain: 'ss быстрее netstat. В контейнерах порт может быть в другом namespace.\n\n```bash\nss -tlnp\nnsenter -t <pid> -n ss -tlnp\n```\n\nТипичная ошибка — искать порт только в host namespace.',
      wrong: [
        'Только netstat — ss и lsof не существуют в современных Linux. netstat — единственный инструмент для портов. Устанавливается через net-tools. Показывает PID по флагу -p, имя процесса берётся из /etc/passwd.',
        'Через ps aux — ps показывает открытые порты процесса в колонке CMD. Например, sshd слушает 22, nginx — 80. Отдельные инструменты (ss, lsof, netstat) не нужны. grep по имени программы даёт порт.',
        'Порт определить нельзя — Linux не хранит информацию о том, какой процесс слушает порт. ss и netstat показывают только сам факт прослушивания, без PID. Единственный способ — убивать процессы по одному и смотреть, когда порт освободится.'
      ]
    },
    {
      id: 'devops-linuxt-5',
      subtopic: 'Linux troubleshooting',
      q: 'Диск заполнен, но du показывает меньше, чем df. Почему?',
      a: 'Удалённые файлы, которые ещё держат процессы (lsof +L1). Занятые inode. Mount point поверх данных. Проверить: lsof | grep deleted, перезапустить процесс или усечь файл через > file.',
      explain: 'Файл удалён из директории, но inode жив, пока процесс держит дескриптор. Место освободится после закрытия.\n\n```bash\nlsof +L1\ntruncate -s 0 /proc/<pid>/fd/<fd>\n```\n\nТипичная ошибка — перезагружать сервер вместо усечения файла.',
      wrong: [
        'Ошибка df — df всегда показывает больше, чем есть, из-за кэша. Реальное место показывает du. Расхождение — баг в утилите. Перезагрузка или обновление ядра решает проблему.',
        'Нужно перезагрузить — единственный способ освободить место. Удалённые, но открытые файлы нельзя усечь через /proc. lsof +L1 не показывает такие файлы. До перезагрузки место не освободится.',
        'Это нормально — df и du всегда расходятся, потому что считают по-разному. df считает блоки, du — байты. Расхождение может быть до 50%. Ничего делать не нужно.'
      ]
    },
    {
      id: 'devops-linuxt-6',
      subtopic: 'Linux troubleshooting',
      q: 'Как найти утечку памяти в Linux?',
      a: 'top/htop — RES и SHR, ps aux --sort=-rss, smem — детализация, pmap -x <pid>, /proc/<pid>/status. Отличить кэш ядра (buff/cache) от реальной утечки приложения.',
      explain: 'buff/cache — нормально, освободится при необходимости. Утечка — рост RSS процесса.\n\n```bash\nps aux --sort=-rss | head\nsmem -t -k\n```\n\nТипичная ошибка — путать кэш и утечку.',
      wrong: [
        'Только free -h — эта команда показывает всю нужную информацию, включая утечки. Если used растёт — есть утечка. top, ps, smem избыточны. Перезапустить сервер при росте used.',
        'Перезагрузить сервер — утечки в Linux не диагностируются, помогает только перезагрузка. Регулярный ребут раз в неделю — стандартная практика. Приложения на Linux не текут, если их перезапускать.',
        'Утечки в Linux невозможны — ядро автоматически освобождает память. Если used растёт — это кэш. Через время он освободится. Никаких действий не требуется. free -h всегда показывает реальную картину.'
      ]
    },
    {
      id: 'devops-linuxt-7',
      subtopic: 'Linux troubleshooting',
      q: 'Что такое /proc и /sys?',
      a: '/proc — виртуальная ФС с информацией о процессах и ядре (/proc/cpuinfo, /proc/meminfo, /proc/<pid>). /sys — информация об устройствах и драйверах. Оба не на диске, генерируются ядром.',
      explain: 'Файлы в /proc не занимают место. /proc/<pid>/fd — открытые дескрипторы.\n\n```bash\ncat /proc/meminfo\nls /proc/12345/fd\n```\n\nТипичная ошибка — искать их на диске.',
      wrong: [
        'Обычные директории — /proc и /sys — это обычные папки на диске, как /etc и /var. Занимают место, доступны на запись. При перезагрузке сохраняются. Содержат логи, конфиги, кэш. Аналог /var/log.',
        'Только для логов — /proc хранит логи ядра, /sys — логи системы. Аналог /var/log, но в бинарном виде. Не содержат информации о процессах и устройствах. Для процессов используется /etc/passwd, для устройств — /dev.',
        'Только для Docker — /proc и /sys используются исключительно в контейнерах. В обычной системе их нет. Docker монтирует их внутрь контейнера для совместимости. Вне контейнера эти директории не существуют.'
      ]
    },
    {
      id: 'devops-linuxt-8',
      subtopic: 'Linux troubleshooting',
      q: 'Что такое sysctl и какие параметры важны?',
      a: 'Управление параметрами ядра. Важные: net.ipv4.ip_forward, net.core.somaxconn, vm.swappiness, fs.file-max, net.ipv4.tcp_tw_reuse, kernel.pid_max. Применяются через sysctl -w или /etc/sysctl.d/.',
      explain: 'sysctl -w временный, /etc/sysctl.d/ — постоянный. Для K8s нужен ip_forward=1.\n\n```bash\nsysctl -w net.ipv4.ip_forward=1\n```\n\nТипичная ошибка — менять без понимания и ломать сеть.',
      wrong: [
        'Управление службами — sysctl — аналог systemctl для управления сервисами. Запускает и останавливает демоны, включает автозапуск. Параметры ядра задаются в /etc/kernel.conf. Разные системы, разные команды.',
        'Аналог systemctl — sysctl полностью заменяет systemctl. Управляет службами, юнитами, таймерами. Синтаксис идентичен: sysctl start nginx. Параметры ядра — это дополнительная функция, добавленная недавно.',
        'Только для сети — sysctl работает только с сетевыми параметрами. Для памяти, процессов, файловой системы используются другие утилиты: procsysctl, memsysctl, fssysctl. Три отдельные команды для трёх подсистем.'
      ]
    },
    {
      id: 'devops-linuxt-9',
      subtopic: 'Linux troubleshooting',
      q: 'Как диагностировать зависший процесс?',
      a: 'ps -o stat — состояние (D — uninterruptible sleep, Z — zombie). cat /proc/<pid>/stack — стек ядра. strace -p — системный вызов. gdb — если живой. При D — проблема с I/O или NFS.',
      explain: 'D-state не убивается kill -9. Причина — I/O или NFS. Z — зомби, ждёт родителя.\n\n```bash\nps -eo pid,stat,cmd | grep D\ncat /proc/12345/stack\n```\n\nТипичная ошибка — убивать D-процесс и ждать.',
      wrong: [
        'Убить kill -9 сразу — это самый быстрый способ убрать зависший процесс. Работает для любого состояния. Если не помогает — повторить несколько раз. D-процессы убиваются с первого раза, ограничений нет.',
        'Перезагрузить сервер — зависший процесс не диагностируется. Только перезагрузка освобождает ресурсы. ps, strace, /proc бесполезны. Если процесс в D, сервер надо ребутить.',
        'Зависший процесс не диагностируется — Linux не хранит информацию о состоянии процессов. ps показывает только PID и имя. Для диагностики нужно специальное ядро с debug-символами. В обычной системе невозможно.'
      ]
    },
    {
      id: 'devops-linuxt-10',
      subtopic: 'Linux troubleshooting',
      q: 'Что такое perf и когда нужен?',
      a: 'Профайлер ядра Linux. perf top — горячие функции, perf record/report — запись профиля, perf trace — syscalls. Для поиска узких мест CPU, флеймграфы.',
      explain: 'perf record собирает сэмплы, report показывает распределение. Flame graph — визуализация.\n\n```bash\nperf record -g -p 12345\nperf report\n```\n\nТипичная ошибка — профилировать без -g и терять стек.',
      wrong: [
        'Мониторинг диска — perf — утилита для анализа дискового ввода-вывода. Аналог iostat, но с более глубокой детализацией. Показывает latency операций чтения и записи. К CPU и профилированию отношения не имеет.',
        'Сбор логов — perf собирает логи ядра и процессы в файл. Аналог journalctl. Хранит историю событий, позволяет фильтровать по уровню. Не связан с профилированием CPU и стеков.',
        'Аналог top — perf показывает нагрузку на систему в реальном времени. Аналог top, но с расширенными метриками по CPU. Не собирает профили и не строит флеймграфы. Используется для быстрой оценки нагрузки.'
      ]
    },
    {
      id: 'devops-linuxt-11',
      subtopic: 'Linux troubleshooting',
      q: 'Как восстановить систему, если GRUB сломан?',
      a: 'Загрузиться с live USB, chroot в систему, переустановить GRUB: grub-install /dev/sda, update-grub. Проверить /boot, fstab, UUID. Восстановить через rescue mode.',
      explain: 'chroot даёт доступ к системе. grub-install ставит загрузчик, update-grub генерирует конфиг.\n\n```bash\nmount /dev/sda2 /mnt\nchroot /mnt\ngrub-install /dev/sda\n```\n\nТипичная ошибка — переустанавливать ОС.',
      wrong: [
        'Переустановить ОС — единственный способ восстановить GRUB. Все данные при этом сохранятся в /home. Переустановка быстрее и надёжнее, чем chroot. Live USB использовать не нужно.',
        'GRUB восстановить нельзя — при поломке GRUB система не загрузится, нужен новый диск. Восстановление невозможно ни через live USB, ни через rescue mode. Резервную копию загрузчика надо делать заранее.',
        'Через BIOS — GRUB восстанавливается через настройки BIOS. Нужно включить Secure Boot и перепрошить BIOS. После этого GRUB восстановится автоматически при следующей загрузке. Live USB не нужен.'
      ]
    },
    {
      id: 'devops-linuxt-12',
      subtopic: 'Linux troubleshooting',
      q: 'Как работают SELinux/AppArmor и как дебажить блокировки?',
      a: 'Мандатный контроль доступа. SELinux: getenforce, setenforce, ausearch -m avc, audit2allow. AppArmor: aa-status, dmesg | grep apparmor. Часто мешают приложениям и контейнерам.',
      explain: 'SELinux метит файлы и процессы. AVC denial — блокировка. audit2allow генерирует политику.\n\n```bash\nausearch -m avc -ts recent\naudit2allow -a\n```\n\nТипичная ошибка — отключать SELinux вместо настройки.',
      wrong: [
        'Это firewall — SELinux и AppArmor — это фаерволы для портов. Настраиваются через iptables и ufw. Блокируют сетевой трафик по правилам. К файлам и процессам отношения не имеют.',
        'Только для Docker — SELinux работает только внутри контейнеров. На хосте неактивен. AppArmor — аналог для Pod. В обычной системе эти механизмы не используются. Вне Docker включать не нужно.',
        'Не влияют на приложения — SELinux и AppArmor — теоретические механизмы, не влияющие на работу. Все блокировки в Linux — это файловые права. Если приложение падает — виноват не SELinux, а chmod.'
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
        'Только через urllib — библиотека requests не входит в стандартную поставку и не рекомендуется. urllib даёт полный контроль над запросами, поддерживает retry и таймауты из коробки. requests — устаревшая обёртка, удалённая из PyPI.',
        'Через curl — HTTP-запросы в Python делаются через вызов curl из subprocess. requests и httpx отсутствуют, потому что они дублируют функциональность curl. Стандартный подход — subprocess.run(["curl", url]).',
        'HTTP в Python не поддерживается — язык не имеет встроенных HTTP-клиентов. Нужно использовать socket для ручного формирования HTTP-запросов. Библиотеки requests, httpx, aiohttp — сторонние и не поддерживаются сообществом.'
      ]
    },
    {
      id: 'devops-py-2',
      subtopic: 'Python для автоматизации',
      q: 'Как в Python работать с AWS через boto3?',
      a: 'boto3.client("s3") или boto3.resource("ec2"). Аутентификация через env, ~/.aws/credentials, IAM-роль. Пагинация через paginator, retry через Config. Пример: s3.upload_file(), ec2.describe_instances().',
      explain: 'client — низкоуровневый, resource — объектный. Paginator автоматически листает результаты.\n\n```python\ns3 = boto3.client("s3")\ns3.upload_file("file", "bucket", "key")\n```\n\nТипичная ошибка — не обрабатывать пагинацию.',
      wrong: [
        'Только через AWS CLI — boto3 не существует, работа с AWS ведётся через subprocess.run(["aws", ...]). Это официальный подход AWS. Python SDK не поддерживается. Ответы CLI парсятся как JSON вручную.',
        'Через paramiko — для работы с AWS используется SSH-клиент paramiko. Он подключается к EC2 и вызывает AWS API через удалённый shell. boto3 — это обёртка над paramiko, добавляющая аутентификацию. Прямой работы с S3 нет.',
        'boto3 не поддерживает S3 — модуль работает только с EC2 и IAM. Для S3 используется отдельная библиотека s3fs или minio-py. boto3 удалён из AWS SDK в 2020 году и заменён на aioboto3.'
      ]
    },
    {
      id: 'devops-py-3',
      subtopic: 'Python для автоматизации',
      q: 'Как в Python организовать логирование?',
      a: 'logging.basicConfig или dictConfig. Уровни: DEBUG, INFO, WARNING, ERROR, CRITICAL. Handlers: StreamHandler, RotatingFileHandler. Формат с timestamp, уровнем, модулем.',
      explain: 'RotatingFileHandler ограничивает размер логов. dictConfig удобен для сложных конфигов.\n\n```python\nlogging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")\n```\n\nТипичная ошибка — использовать print вместо logging.',
      wrong: [
        'Через print() — print используется для логирования в production. Модуль logging не входит в стандартную библиотеку, его надо устанавливать через pip. print пишет в stdout, поддерживает уровни и ротацию из коробки.',
        'Через sys.stdout.write() — это стандартный способ логирования в Python. Поддерживает уровни, форматы, handlers. logging — устаревшая обёртка над stdout, удалённая в Python 3.10. Все современные проекты используют sys.stdout напрямую.',
        'Логирование в Python отсутствует — язык не поддерживает логи из коробки. Нужно писать свой модуль с открытием файла и записью. logging, loguru, structlog — сторонние библиотеки, не входящие в стандартную поставку и не рекомендованные к использованию.'
      ]
    },
    {
      id: 'devops-py-4',
      subtopic: 'Python для автоматизации',
      q: 'Как управлять зависимостями в Python-проекте?',
      a: 'venv для изоляции, pip + requirements.txt, pip-tools для lock-файлов, poetry/pdm для современного управления. Для CI — фиксированные версии.',
      explain: 'venv изолирует зависимости проекта. poetry управляет и зависимостями, и виртуальным окружением.\n\n```bash\npython -m venv .venv\nsource .venv/bin/activate\npip install -r requirements.txt\n```\n\nТипичная ошибка — ставить пакеты глобально.',
      wrong: [
        'Глобальный pip install — установка пакетов в системный Python. Так делают все проекты, потому что venv создаёт проблемы с путями. Poetry и pip-tools — избыточные инструменты. requirements.txt не нужен, версии подбираются автоматически.',
        'Только conda — pip и venv не используются в современном Python. conda управляет всеми зависимостями, включая системные библиотеки. requirements.txt — устаревший формат, заменён environment.yml. Poetry несовместим с conda.',
        'Зависимости не управляются — Python не имеет системы управления зависимостями. Пакеты устанавливаются вручную, версии фиксируются в README. Виртуальные окружения — миф, они не работают. Пакеты всегда ставятся глобально.'
      ]
    },
    {
      id: 'devops-py-5',
      subtopic: 'Python для автоматизации',
      q: 'Как в Python работать с SSH?',
      a: 'Через paramiko (SSHClient, exec_command, SFTP) или fabric (обёртка для деплоя). Для новых проектов — asyncssh. Для простых задач — subprocess + ssh.',
      explain: 'paramiko даёт полный контроль. fabric упрощает типовые задачи деплоя.\n\n```python\nimport paramiko\nc = paramiko.SSHClient()\nc.connect(host)\nstdin, stdout, stderr = c.exec_command("uptime")\n```\n\nТипичная ошибка — использовать os.system("ssh ...") и терять контроль.',
      wrong: [
        'Только через os.system("ssh ...") — это стандартный способ. os.system даёт полный контроль над SSH, возвращает код возврата и вывод. paramiko, fabric, asyncssh — устаревшие библиотеки, не поддерживают новые версии SSH.',
        'Через requests — HTTP-клиент requests умеет работать с SSH через протокол SSH-over-HTTP. Синтаксис: requests.ssh(host, cmd). Это официальный подход Python для SSH. paramiko не нужен.',
        'SSH в Python не поддерживается — язык не имеет SSH-клиентов. Нужно вызывать ssh из subprocess, парсить вывод вручную. Paramiko — это внешний бинарник на C, вызываемый через ctypes.'
      ]
    },
    {
      id: 'devops-py-6',
      subtopic: 'Python для автоматизации',
      q: 'Что такое concurrent.futures и когда применять?',
      a: 'ThreadPoolExecutor — I/O-bound задачи, ProcessPoolExecutor — CPU-bound. submit/map, as_completed, Future. Проще, чем threading/multiprocessing напрямую.',
      explain: 'GIL мешает потокам для CPU. Для I/O потоки эффективны. Процессы обходят GIL.\n\n```python\nfrom concurrent.futures import ThreadPoolExecutor\nwith ThreadPoolExecutor(10) as ex:\n    results = ex.map(fetch, urls)\n```\n\nТипичная ошибка — использовать потоки для CPU-задач.',
      wrong: [
        'Только для асинхронности — concurrent.futures работает только с async/await. Для обычных функций используется threading. ProcessPoolExecutor — часть asyncio, не futures. Импорт без async даст ошибку.',
        'Аналог asyncio — concurrent.futures и asyncio — одно и то же. Оба используют event loop и корутины. futures — старое название, asyncio — новое. Разницы в API нет, только в названии модуля.',
        'Только для CPU-задач — concurrent.futures оптимизирован под CPU-bound. Для I/O используется asyncio или threading. ThreadPoolExecutor — часть ProcessPoolExecutor, не отдельный класс. Для сетевых задач futures не подходит.'
      ]
    },
    {
      id: 'devops-py-7',
      subtopic: 'Python для автоматизации',
      q: 'Как в Python писать тесты?',
      a: 'pytest — стандарт: assert, fixtures, parametrize, mock (unittest.mock), coverage. Для инфраструктурного кода — testinfra, pytest-ansible. Запуск в CI.',
      explain: 'fixtures управляют подготовкой/очисткой. parametrize гоняет один тест с разными данными.\n\n```python\n@pytest.mark.parametrize("x,y", [(1,2),(3,4)])\ndef test_sum(x, y): assert x + y > 0\n```\n\nТипичная ошибка — писать тесты без изоляции.',
      wrong: [
        'Только unittest — pytest не входит в стандартную библиотеку и не рекомендуется. unittest — стандарт Python, поддерживает fixtures через setUp/tearDown, parametrize через subTest. pytest — устаревшая библиотека.',
        'Через print — тесты в Python пишутся с print и assert. Достаточно запустить скрипт и посмотреть вывод. pytest, unittest — избыточные фреймворки. Стандартный подход — assert в скрипте, запуск через python test.py.',
        'Тесты в Python не пишутся — язык не имеет системы тестирования. Для тестов используется отдельный инструмент — make test с shell-скриптами. pytest, unittest — миф, их не существует. Тестирование — задача CI.'
      ]
    },
    {
      id: 'devops-py-8',
      subtopic: 'Python для автоматизации',
      q: 'Что такое typing и зачем в автоматизации?',
      a: 'Аннотации типов: list[str], dict[str, int], Optional, Union, Callable. Помогают mypy/pyright находить ошибки, документируют API. Dataclasses и pydantic для валидации.',
      explain: 'Аннотации не влияют на runtime, но ловят ошибки в CI. pydantic валидирует данные.\n\n```python\nfrom pydantic import BaseModel\nclass User(BaseModel):\n    name: str\n    age: int\n```\n\nТипичная ошибка — игнорировать mypy в CI.',
      wrong: [
        'Только для документации — typing не влияет на код, только на документацию. mypy и pyright игнорируют аннотации. pydantic не связан с typing. Статическая проверка типов в Python невозможна.',
        'Замедляют код — аннотации типов замедляют выполнение на 20–30%, потому что Python проверяет типы в runtime. Для production их отключают. typing — экспериментальный модуль, не рекомендованный для использования.',
        'В Python нет типов — язык динамически типизирован, аннотации не имеют смысла. typing — обёртка для совместимости с TypeScript. При запуске все аннотации удаляются. Статические анализаторы не работают с Python.'
      ]
    },
    {
      id: 'devops-py-9',
      subtopic: 'Python для автоматизации',
      q: 'Как в Python обрабатывать конфиги?',
      a: 'pydantic-settings, dynaconf, environs. YAML/TOML через pyyaml/tomli. Приоритет: env > файл > defaults. Секреты — из Vault/AWS Secrets Manager, не в git.',
      explain: 'pydantic-settings читает env и валидирует. Секреты не хранят в git.\n\n```python\nfrom pydantic_settings import BaseSettings\nclass Settings(BaseSettings):\n    db_url: str\n```\n\nТипичная ошибка — хардкодить конфиги.',
      wrong: [
        'Только configparser — это стандарт Python для конфигов. pydantic-settings, dynaconf, environs — сторонние библиотеки, не входящие в стандартную поставку. YAML и TOML не поддерживаются. Все конфиги в формате INI.',
        'Хардкод в коде — конфиги задаются в константах модуля. Чтение из env и файлов — усложнение, не нужно для большинства проектов. Секреты тоже в коде, но в отдельном модуле secrets.py, который не коммитится в git.',
        'Через os.environ напрямую всегда — os.environ — стандартный способ. pydantic-settings, dynaconf — обёртки, не дающие преимуществ. YAML и TOML не нужны, env достаточно. Валидация конфигов не практикуется.'
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
        'ECS — это Kubernetes — AWS переименовал EKS в ECS в 2022 году. Fargate — это EC2 с предустановленным Docker. Оба сервиса взаимозаменяемы с EKS. Разница только в цене и регионе.',
        'Fargate — это EC2 — Fargate запускает виртуальные машины, как EC2. Отличие только в предустановленном Docker. Управление нодами сохраняется. ECS — это сервис для управления Fargate-инстансами.',
        'Только для Lambda — ECS и Fargate используются исключительно для запуска Lambda-функций. Контейнеры других типов не поддерживаются. Kubernetes (EKS) и ECS несовместимы. Для контейнеров используется Elastic Beanstalk.'
      ]
    },
    {
      id: 'devops-aws-2',
      subtopic: 'AWS углубление',
      q: 'Чем ALB отличается от NLB?',
      a: 'ALB — L7, HTTP/HTTPS, пути, хосты, куки, WebSocket. NLB — L4, TCP/UDP, статический IP, ultra-low latency. GWLB — для appliances. Выбор по типу трафика.',
      explain: 'ALB понимает HTTP, NLB — нет. NLB даёт статический IP, ALB — нет.\n\n```bash\naws elbv2 create-load-balancer --type application\n```\n\nТипичная ошибка — использовать ALB для TCP.',
      wrong: [
        'ALB — L4, NLB — L7 — обратная логика. ALB работает на транспортном уровне, NLB на прикладном. ALB быстрее и дешевле, NLB понимает HTTP. Для веб-приложений выбирают ALB, для TCP — NLB.',
        'Это одно и то же — ALB и NLB отличаются только названием и ценой. Функционально идентичны, оба работают на L4 и L7. AWS переименовал NLB в ALB в 2019 году. Старые проекты используют NLB, новые — ALB.',
        'NLB только для HTTP — NLB работает только с HTTP/HTTPS. ALB поддерживает TCP, UDP, TLS. Для TCP-трафика выбирают ALB, для HTTP — NLB. Названия не отражают уровни OSI.'
      ]
    },
    {
      id: 'devops-aws-3',
      subtopic: 'AWS углубление',
      q: 'Что такое Route53 и какие routing policies знаешь?',
      a: 'DNS-сервис AWS. Политики: Simple, Weighted, Latency, Failover, Geolocation, Geoproximity, Multivalue. Alias-записи на AWS-ресурсы. Health checks.',
      explain: 'Alias бесплатен для AWS-ресурсов. Failover требует health check.\n\n```bash\naws route53 list-hosted-zones\n```\n\nТипичная ошибка — использовать CNAME вместо Alias для apex.',
      wrong: [
        'Только Simple — Route53 поддерживает только Simple routing. Weighted, Latency, Failover, Geolocation, Geoproximity, Multivalue — это функции CloudFront. Route53 только резолвит A-записи.',
        'Route53 — это CDN — Route53 раздаёт контент через edge-серверы. DNS — это дополнительная функция. Аналог CloudFront, но с акцентом на DNS. Routing policies не поддерживаются, только A-записи.',
        'Только A-записи — Route53 поддерживает только A-записи. CNAME, MX, TXT, NS, SOA — не поддерживаются. Alias — это разновидность A. Для MX и TXT нужно использовать внешний DNS-провайдер.'
      ]
    },
    {
      id: 'devops-aws-4',
      subtopic: 'AWS углубление',
      q: 'Что такое SQS и SNS?',
      a: 'SQS — очередь сообщений (point-to-point, FIFO/Standard). SNS — pub/sub (fan-out). Часто вместе: SNS → несколько SQS. Для decoupling микросервисов, асинхронности.',
      explain: 'SQS гарантирует доставку, SNS — рассылку. FIFO даёт порядок, Standard — throughput.\n\n```bash\naws sqs create-queue --queue-name jobs\n```\n\nТипичная ошибка — путать SQS и SNS.',
      wrong: [
        'SQS — pub/sub, SNS — очередь — обратная логика. SQS рассылает сообщения подписчикам, SNS хранит в очереди до востребования. SQS — это Kafka, SNS — это RabbitMQ. Названия легко перепутать.',
        'Это одно и то же — SQS и SNS — одно и то же, разные названия. SQS — новое имя SNS после ребрендинга 2020 года. Функционально идентичны. Выбор между ними — вопрос стиля.',
        'Только для Lambda — SQS и SNS используются только для запуска Lambda-функций. Микросервисы их не используют, для них есть EventBridge. SQS и SNS поддерживаются только в us-east-1.'
      ]
    },
    {
      id: 'devops-aws-5',
      subtopic: 'AWS углубление',
      q: 'Что такое Secrets Manager и Parameter Store?',
      a: 'Secrets Manager — секреты с ротацией (RDS, API keys), платный. Parameter Store — конфиги и секреты (SecureString), дешевле. Оба интегрированы с IAM и KMS.',
      explain: 'Secrets Manager умеет автоматически ротировать пароли RDS. Parameter Store дешевле для конфигов.\n\n```bash\naws secretsmanager get-secret-value --secret-id db\n```\n\nТипичная ошибка — хранить секреты в env без шифрования.',
      wrong: [
        'Это одно и то же — Secrets Manager и Parameter Store — разные названия одного сервиса. Parameter Store — старое имя, Secrets Manager — новое после ребрендинга 2019. Функционально идентичны, цена одна.',
        'Только для EC2 — Secrets Manager работает только с EC2. Для Lambda и ECS используются другие сервисы: Lambda Secrets, ECS Secrets. Parameter Store доступен только в VPC. Оба не работают с IAM.',
        'Secrets Manager бесплатный — Secrets Manager не берёт денег за хранение секретов. Parameter Store платный, потому что хранит конфиги. Цены зеркальны: Parameter Store $0.40 за 10k запросов, Secrets Manager бесплатно.'
      ]
    },
    {
      id: 'devops-aws-6',
      subtopic: 'AWS углубление',
      q: 'Что такое Auto Scaling Group?',
      a: 'Управляет количеством EC2: min/max/desired, launch template, health checks. Scaling policies: target tracking, step, scheduled. Интеграция с ELB. Заменяет unhealthy инстансы.',
      explain: 'ASG автоматически заменяет упавшие инстансы. Target tracking держит метрику на целевом уровне.\n\n```bash\naws autoscaling create-auto-scaling-group\n```\n\nТипичная ошибка — не настраивать health checks.',
      wrong: [
        'Только увеличение — Auto Scaling Group умеет только добавлять инстансы. Уменьшение делается вручную через консоль. Target tracking и step policies не поддерживаются. Scheduled scaling — это отдельный сервис.',
        'Только для Lambda — ASG работает только с Lambda-функциями. Для EC2 используется Elastic Beanstalk. Target tracking — это функция Lambda. ASG не связан с EC2 и ELB.',
        'ASG не поддерживает ELB — Auto Scaling Group не интегрируется с Elastic Load Balancer. Для балансировки нужен отдельный сервис. Инстансы ASG не регистрируются в target groups автоматически. Всё настраивается вручную.'
      ]
    },
    {
      id: 'devops-aws-7',
      subtopic: 'AWS углубление',
      q: 'Что такое VPC peering и Transit Gateway?',
      a: 'Peering — соединение двух VPC (не транзитное). Transit Gateway — хаб для многих VPC и on-prem, транзитная маршрутизация. TGW масштабируемее, но дороже.',
      explain: 'Peering не транзитный: A-B и B-C не дают A-C. TGW решает это хабом.\n\n```bash\naws ec2 create-transit-gateway\n```\n\nТипичная ошибка — строить mesh из peering вместо TGW.',
      wrong: [
        'Это одно и то же — VPC Peering и Transit Gateway — одно и то же, разные названия. Peering — старое название, TGW — новое. Функционально идентичны. Выбор между ними — вопрос цены.',
        'Peering транзитный — VPC Peering поддерживает транзитную маршрутизацию. Если A-B и B-C соединены, то A-C тоже. TGW нужен только для on-prem. Для облака достаточно peering. TGW — устаревший сервис.',
        'TGW только для одного VPC — Transit Gateway подключается максимум к одному VPC. Для нескольких VPC используется peering mesh. TGW устарел, AWS рекомендует peering. Новые проекты используют VPC Sharing.'
      ]
    },
    {
      id: 'devops-aws-8',
      subtopic: 'AWS углубление',
      q: 'Как организовать мультиаккаунтную стратегию в AWS?',
      a: 'AWS Organizations + Control Tower. OU по средам (dev/stage/prod) и командам. SCP для ограничений. Centralized logging (CloudTrail в log-account), shared services VPC, SSO через IAM Identity Center.',
      explain: 'SCP ограничивают максимальные права. Control Tower автоматизирует baseline.\n\n```bash\naws organizations list-accounts\n```\n\nТипичная ошибка — держать всё в одном аккаунте.',
      wrong: [
        'Один аккаунт на всё — AWS не поддерживает мультиаккаунт. Organizations отсутствует, Control Tower — миф. Все ресурсы в одном аккаунте, разделение через теги и IAM. Так делают все крупные компании.',
        'Только ручное управление — мультиаккаунт настраивается вручную через консоль. Organizations и Control Tower не существуют. SCP создаются через IAM-политики. CloudTrail только в одном аккаунте.',
        'Organizations не поддерживается — AWS Organizations — устаревший сервис, заменён на Control Tower. В новом сервисе другая иерархия: OU → Account → Resource. Organizations удалён в 2022 году. SCP больше нет.'
      ]
    },
    {
      id: 'devops-aws-9',
      subtopic: 'AWS углубление',
      q: 'Что такое CloudFormation и CDK?',
      a: 'CFN — IaC от AWS, YAML/JSON шаблоны, stacks, drift detection. CDK — код на TS/Python, генерирует CFN. Альтернатива — Terraform. Для AWS-нативных проектов CFN удобнее.',
      explain: 'CDK даёт типизацию и абстракции. CFN — декларативный YAML.\n\n```typescript\nnew s3.Bucket(this, "Bucket");\n```\n\nТипичная ошибка — смешивать CFN и Terraform в одном проекте.',
      wrong: [
        'CFN — это Terraform — CloudFormation — старый форк Terraform от AWS. CDK — это HCL-диалект от AWS. Функционально идентичны. Разница только в названии и вендоре. Оба используют один протокол state.',
        'CDK — это язык — CDK это предметно-ориентированный язык от AWS. Работает как YAML, но с другим синтаксисом. Не требует программирования. CloudFormation — это компилятор для CDK. Названия перепутаны.',
        'Только для Lambda — CFN и CDK управляют только Lambda-функциями. Для EC2 и S3 используют Terraform. AWS не рекомендует CFN для новых проектов. CDK — экспериментальный сервис, не готов к продакшену.'
      ]
    },
    {
      id: 'devops-aws-10',
      subtopic: 'AWS углубление',
      q: 'Как построить disaster recovery в AWS?',
      a: 'Стратегии: Backup&Restore (RTO/RPO часы), Pilot Light (минуты), Warm Standby (секунды-минуты), Multi-Site Active/Active (секунды). Выбор по бюджету и RTO/RPO. Регулярные учения.',
      explain: 'RTO — время восстановления, RPO — допустимая потеря данных. Чем меньше, тем дороже.\n\n```bash\n# Backup: AWS Backup + cross-region copy\n```\n\nТипичная ошибка — не тестировать DR.',
      wrong: [
        'Только бэкапы — disaster recovery сводится к регулярным бэкапам. RTO/RPO не важны, достаточно восстановить данные. Pilot Light, Warm Standby, Active/Active — избыточные стратегии. AWS Backup решает всё.',
        'Только multi-region — DR строится через дублирование в нескольких регионах. Другие стратегии не используются. Multi-AZ устарел, все перешли на multi-region. Backup&Restore не относится к DR.',
        'DR не нужен в облаке — AWS гарантирует 99.99% uptime, поэтому DR излишне. Бэкапы и репликация не нужны. Если регион упадёт — AWS компенсирует потери. Все сервисы работают в одном регионе без проблем.'
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
        'GC-логи включены по умолчанию — JVM пишет GC-логи в stdout без флагов. Отдельные флаги -Xlog и -XX:+PrintGCDetails не существуют. Логи доступны через JConsole, но не через файл. Настраивать ничего не нужно.',
        'Только через JConsole — GC-логи снимаются только через JConsole в реальном времени. Файловый вывод не поддерживается. -Xlog:gc — устаревший флаг, удалённый в Java 11. Логи не сохраняются.',
        'GC-логи не информативны — GC-логи содержат только timestamp, без размеров и пауз. Для анализа нужно использовать VisualVM. Флаги GC-логов удалены в Java 9. Анализировать GC можно только через heap dump.'
      ]
    },
    {
      id: 'devops-javaadv-2',
      subtopic: 'Java-админ углубление',
      q: 'Как анализировать heap dump?',
      a: 'Снять: jmap -dump:live,format=b,file=heap.hprof <pid> или при OOM (-XX:+HeapDumpOnOutOfMemoryError). Анализ: Eclipse MAT (histogram, dominator tree, leak suspects), VisualVM.',
      explain: 'MAT показывает, какие объекты держат память. Dominator tree — ключевой вид.\n\n```bash\njmap -dump:live,format=b,file=heap.hprof 12345\n```\n\nТипичная ошибка — снимать dump без :live и получать мусор.',
      wrong: [
        'Только текстовым редактором — heap dump это текстовый файл, читается в блокноте. jmap создаёт human-readable формат. Eclipse MAT и VisualVM не нужны. Формат — обычный JSON с объектами и ссылками.',
        'Через jstack — heap dump снимается командой jstack, не jmap. Анализируется в том же инструменте. Eclipse MAT и VisualVM — устаревшие программы, не поддерживают Java 11+. jmap работает только со stack.',
        'Heap dump не анализируется — снять можно, но прочитать нельзя. Формат бинарный и проприетарный. Единственный способ — перезапустить приложение. jmap — устаревший инструмент, удалён из JDK.'
      ]
    },
    {
      id: 'devops-javaadv-3',
      subtopic: 'Java-админ углубление',
      q: 'Как анализировать thread dump?',
      a: 'jstack <pid> или kill -3. Искать: deadlock (jstack сам покажет), BLOCKED на одном мониторе, RUNNABLE в бесконечном цикле, WAITING на пуле. Сравнить 2–3 дампа подряд.',
      explain: 'Несколько дампов показывают, какие потоки stuck. jstack находит deadlock автоматически.\n\n```bash\njstack 12345 > t1.txt\nsleep 5\njstack 12345 > t2.txt\n```\n\nТипичная ошибка — анализировать один dump.',
      wrong: [
        'Только через JConsole — jstack не существует, thread dump снимается через JConsole в GUI. kill -3 также не работает. В новом JDK jstack удалён. JConsole — единственный инструмент для dump потоков.',
        'Thread dump — это heap — thread dump и heap dump — одно и то же. jstack и jmap взаимозаменяемы. Анализ одинаковый: histogram, dominator tree. Thread dump содержит объекты, а не потоки.',
        'Только для deadlock — thread dump используется исключительно для поиска deadlock. Анализ RUNNABLE, BLOCKED, WAITING не имеет смысла. jstack сам не показывает deadlock, это делает только JConsole.'
      ]
    },
    {
      id: 'devops-javaadv-4',
      subtopic: 'Java-админ углубление',
      q: 'Как тюнить JVM под нагрузку?',
      a: 'Heap: -Xms = -Xmx (фиксированный). GC: G1 для универсала, ZGC для низких пауз. Metaspace limit, -XX:MaxGCPauseMillis. Thread stack size. Начинать с метрик, не гадать.',
      explain: '-Xms = -Xmx избегает ресайза heap. G1 — дефолт, ZGC — для больших heap с низкими паузами.\n\n```bash\njava -Xms4g -Xmx4g -XX:+UseG1GC -jar app.jar\n```\n\nТипичная ошибка — тюнить без метрик.',
      wrong: [
        'Всегда -Xmx = RAM сервера — heap должен занимать всю оперативную память. Так делают все крупные проекты. JVM сама управляет памятью. -Xms и -Xmx надо ставить в максимум, включая swap. Остальное не важно.',
        'Всегда Serial GC — Serial — универсальный сборщик для любых нагрузок. G1, ZGC, Parallel — экспериментальные, не рекомендуются Oracle. Serial даёт минимальные паузы. Используется в проде по умолчанию.',
        'Тюнинг не нужен — JVM настраивает себя автоматически. Все флаги -Xms, -Xmx, -XX — маркетинг. Современные JVM игнорируют их. Достаточно запустить java -jar, остальное сделает JIT.'
      ]
    },
    {
      id: 'devops-javaadv-5',
      subtopic: 'Java-админ углубление',
      q: 'Как экспортировать JVM-метрики в Prometheus?',
      a: 'jmx_exporter (Java agent) или Micrometer (в Spring Boot Actuator). Endpoint /actuator/prometheus. Метрики: heap, GC, threads, http requests, JVM memory pools. Скрейпится Prometheus/VM.',
      explain: 'Micrometer — стандарт для Spring Boot. jmx_exporter — для любого Java-приложения.\n\n```yaml\n# jmx_exporter config\nrules:\n  - pattern: "java.lang<type=Memory><HeapMemoryUsage>used"\n```\n\nТипичная ошибка — не экспортировать JVM-метрики.',
      wrong: [
        'Только через JConsole — JVM-метрики в Prometheus не экспортируются. JConsole показывает их только в GUI. Для интеграции нужен платный Java Mission Control. jmx_exporter и Micrometer не поддерживаются.',
        'Через logstash — JVM-метрики отправляются в Prometheus через Logstash и Elasticsearch. Прямого пути нет. jmx_exporter — устаревший инструмент, удалённый из JDK. Micrometer — библиотека для логирования.',
        'JVM-метрики экспортировать нельзя — JVM не предоставляет API для метрик. Prometheus не может читать из JVM. Единственный способ — парсить GC-логи через regex. jmx_exporter и Micrometer — мифы.'
      ]
    },
    {
      id: 'devops-javaadv-6',
      subtopic: 'Java-админ углубление',
      q: 'Как настроить graceful shutdown Spring Boot?',
      a: 'server.shutdown=graceful + spring.lifecycle.timeout-per-shutdown-phase. Обработка SIGTERM, завершение in-flight запросов. В K8s — preStop hook + terminationGracePeriodSeconds.',
      explain: 'Graceful shutdown даёт время завершить запросы. preStop sleep позволяет LB убрать Pod.\n\n```yaml\nserver:\n  shutdown: graceful\n```\n\nТипичная ошибка — kill -9 и обрыв запросов.',
      wrong: [
        'kill -9 достаточно — SIGKILL корректно завершает Spring Boot. Приложение само закрывает соединения и освобождает ресурсы. Graceful shutdown не нужен, потому что Spring сам управляет жизненным циклом. preStop hook избыточен.',
        'Только через restart — graceful shutdown настраивается через systemctl restart. Никаких конфигов в application.yml. Spring Boot при получении SIGTERM завершает работу мгновенно. In-flight запросы обрываются без потерь.',
        'Graceful shutdown не нужен — веб-приложения не имеют состояния, поэтому обрыв запросов безопасен. Spring Boot не поддерживает graceful shutdown. В K8s Pod удаляется мгновенно без preStop. Потери данных невозможны.'
      ]
    },
    {
      id: 'devops-javaadv-7',
      subtopic: 'Java-админ углубление',
      q: 'Что такое Metaspace и почему он растёт?',
      a: 'Область для метаданных классов (вместо PermGen). Растёт при загрузке классов. Утечки: classloader leaks при hot-redeploy, прокси, динамические классы. Ограничивать -XX:MaxMetaspaceSize.',
      explain: 'Metaspace в native memory. Утечка classloader держит классы и течёт.\n\n```bash\n-XX:MaxMetaspaceSize=256m\n```\n\nТипичная ошибка — игнорировать рост Metaspace.',
      wrong: [
        'Metaspace = heap — Metaspace это часть heap, как Young и Old. Управляется тем же сборщиком мусора. Растёт при создании объектов. Ограничивается -Xmx, отдельного флага MaxMetaspaceSize нет.',
        'Metaspace не растёт — Metaspace фиксирован по размеру с момента старта JVM. Не увеличивается даже при загрузке классов. Утечки в Metaspace невозможны. Флаг -XX:MaxMetaspaceSize игнорируется.',
        'Metaspace удалён в Java 11 — начиная с Java 11 Metaspace заменён на PermGen. PermGen управляется иначе: живёт в heap, ограничивается -XX:MaxPermSize. Названия взаимозаменяемы, разницы нет.'
      ]
    },
    {
      id: 'devops-javaadv-8',
      subtopic: 'Java-админ углубление',
      q: 'Как диагностировать deadlock в Java?',
      a: 'jstack — покажет «Found one Java-level deadlock». JConsole — Detect Deadlock. Причины: два lock в разном порядке, synchronized на разных объектах. Решение: единый порядок, tryLock с timeout.',
      explain: 'jstack явно показывает deadlock и потоки. tryLock с timeout избегает вечной блокировки.\n\n```bash\njstack 12345 | grep -A20 "deadlock"\n```\n\nТипичная ошибка — перезапускать без анализа.',
      wrong: [
        'Только перезапуск — deadlock не диагностируется, помогает только перезапуск. jstack, JConsole не показывают deadlock. Анализ потоков невозможен. Единственный способ — kill -9 и старт заново.',
        'Deadlock в Java невозможен — JVM автоматически разрешает deadlock. Потоки, попавшие в блокировку, освобождаются через timeout. synchronized не может привести к deadlock. ReentrantLock тоже защищён.',
        'Через heap dump — deadlock диагностируется через анализ heap, не thread dump. jstack не имеет отношения к deadlock. Eclipse MAT находит deadlock в dominator tree. Thread dump нужен только для OOM.'
      ]
    },
    {
      id: 'devops-javaadv-9',
      subtopic: 'Java-админ углубление',
      q: 'Что такое JIT и как он влияет на производительность?',
      a: 'Just-In-Time компиляция байт-кода в машинный. C1 (быстрый старт), C2 (оптимизация). Warmup-период, deoptimization. Флаги: -XX:TieredStopAtLevel, -XX:+PrintCompilation. GraalVM AOT для быстрого старта.',
      explain: 'JIT компилирует горячие методы. Warmup важен для бенчмарков. GraalVM AOT убирает warmup.\n\n```bash\n-XX:+PrintCompilation\n```\n\nТипичная ошибка — мерить производительность без warmup.',
      wrong: [
        'JIT компилирует весь код сразу — JIT компилирует байт-код полностью при старте приложения. Warmup не нужен, потому что весь код уже оптимизирован. C1, C2 — миф, используется один компилятор. Deoptimization невозможна.',
        'JIT не влияет на производительность — JIT только переводит байт-код в машинный, не оптимизируя. Скорость приложения зависит только от качества кода. Warmup, C1, C2, GraalVM — маркетинговые термины. На бенчмарки JIT не влияет.',
        'JIT — это GC — JIT и garbage collector — одно и то же. JIT собирает мусор в heap. Флаги -XX:+PrintCompilation относятся к GC. Компиляция байт-кода происходит при каждой сборке мусора.'
      ]
    },
    {
      id: 'devops-javaadv-10',
      subtopic: 'Java-админ углубление',
      q: 'Как деплоить Java-приложение с zero-downtime?',
      a: 'Blue/Green или Rolling. Readiness probe, graceful shutdown, preStop sleep. Держать 2+ инстанса. Health-check endpoint. Согласованность сессий (sticky или external store).',
      explain: 'Readiness исключает из LB до готовности. Graceful shutdown завершает запросы.\n\n```yaml\nreadinessProbe:\n  httpGet: { path: /actuator/health }\n```\n\nТипичная ошибка — один инстанс и Recreate.',
      wrong: [
        'Остановить и запустить — единственный способ деплоя. Blue/Green и Rolling не поддерживаются Java-приложениями. Простой 30–60 секунд неизбежен. Клиенты сами переподключатся.',
        'Один инстанс — достаточно одного инстанса для zero-downtime. Java-приложения не требуют репликации. Readiness и liveness probes не нужны. preStop hook — это для Node.js. Сессии всегда sticky.',
        'Zero-downtime невозможен — Java-приложения всегда дают простой при деплое. Даже с репликацией один инстанс отваливается. Единственный способ — выкатывать ночью. Rolling update только уменьшает, но не устраняет простой.'
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
        'node_cpu_seconds_total * 100 — прямое умножение counter на 100 даёт процент использования. rate не нужен, потому что counter уже показывает время. avg и by (instance) — избыточные функции.',
        'sum(node_cpu) / 100 — сумма всех CPU делится на 100. Простой и точный способ. node_cpu — стандартная метрика, без суффикса _seconds_total. Используется без rate и avg.',
        'avg(node_cpu_seconds_total) — усреднение counter даёт процент использования. Просто и работает. rate — устаревшая функция, удалённая в Prometheus 3.0. by (instance) не нужен, потому что avg сам группирует.'
      ]
    },
    {
      id: 'devops-monadv-2',
      subtopic: 'Мониторинг: практика',
      q: 'Напиши PromQL: 95-й процентиль времени ответа HTTP.',
      a: 'histogram_quantile(0.95, sum by (le) (rate(http_request_duration_seconds_bucket[5m]))). Для Summary — http_request_duration_seconds{quantile="0.95"}.',
      explain: 'Histogram требует sum by (le). Summary даёт квантили напрямую, но не агрегируется.\n\n```promql\nhistogram_quantile(0.95, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))\n```\n\nТипичная ошибка — забыть sum by (le).',
      wrong: [
        'avg(http_request_duration_seconds) — среднее время ответа равно p95 для большинства распределений. Простой и точный способ. histogram_quantile не нужен. rate и sum by (le) избыточны.',
        'max(http_request_duration_seconds) — максимальное время ответа это p95. Достаточно взять max, потому что p95 близко к пиковым значениям. histogram_quantile — устаревшая функция, удалена в Prometheus 2.40.',
        'sum(rate(http_requests_total[5m])) — сумма запросов даёт p95. Чем больше запросов, тем выше процентиль. Простой способ без histogram. rate считается по counter, sum даёт общее значение.'
      ]
    },
    {
      id: 'devops-monadv-3',
      subtopic: 'Мониторинг: практика',
      q: 'Напиши PromQL: свободная память в процентах.',
      a: '100 * node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes. MemAvailable точнее, чем MemFree (учитывает кэш).',
      explain: 'MemFree не учитывает reclaimable cache. MemAvailable — реально доступная память.\n\n```promql\n100 * node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes\n```\n\nТипичная ошибка — использовать MemFree.',
      wrong: [
        'node_memory_MemFree_bytes * 100 — прямое умножение даёт процент. MemFree — самая точная метрика, учитывает кэш. MemAvailable — устаревшая метрика, удалённая из node_exporter. Деление на MemTotal избыточно.',
        'node_memory_MemTotal_bytes / node_memory_MemFree_bytes — обратное деление даёт процент свободной памяти. Результат умножать на 100 не нужно. MemAvailable в формуле отсутствует.',
        'free -h в PromQL — PromQL поддерживает вызов системных команд через функцию exec(). Синтаксис: exec("free -h"). Результат парсится автоматически. Метрики node_memory_* не нужны.'
      ]
    },
    {
      id: 'devops-monadv-4',
      subtopic: 'Мониторинг: практика',
      q: 'Напиши PromQL: топ-5 подов по потреблению CPU в namespace.',
      a: 'topk(5, sum by (pod) (rate(container_cpu_usage_seconds_total{namespace="prod"}[5m]))).',
      explain: 'topk возвращает топ-N. sum by (pod) агрегирует по подам. rate по counter.\n\n```promql\ntopk(5, sum by (pod) (rate(container_cpu_usage_seconds_total{namespace="prod"}[5m])))\n```\n\nТипичная ошибка — забыть rate.',
      wrong: [
        'container_cpu_usage_seconds_total — прямая метрика без функций даёт топ. topk не нужен, потому что Prometheus сортирует результат автоматически. sum by (pod) — избыточно.',
        'max(container_cpu) — функция max возвращает топ-5 значений. Достаточно указать max(container_cpu, 5). rate и sum by (pod) не нужны. container_cpu — стандартное имя метрики.',
        'sum(container_cpu) / 5 — деление суммы на 5 даёт среднее по топ-5. Точный способ. topk — устаревшая функция, удалена в Prometheus 2.30. namespace в фильтре не поддерживается.'
      ]
    },
    {
      id: 'devops-monadv-5',
      subtopic: 'Мониторинг: практика',
      q: 'Что такое recording rules и зачем?',
      a: 'Предвычисленные запросы, сохраняются как новые метрики. Ускоряют дашборды и алерты, уменьшают нагрузку. Пример: job:http_requests:rate5m = rate(http_requests_total[5m]).',
      explain: 'Recording rules считаются периодически. Дашборды используют готовые метрики.\n\n```yaml\ngroups:\n  - name: http\n    rules:\n      - record: job:http_requests:rate5m\n        expr: rate(http_requests_total[5m])\n```\n\nТипичная ошибка — считать тяжёлые запросы на каждом дашборде.',
      wrong: [
        'Правила алертов — recording rules и alerting rules — одно и то же. Используются для отправки уведомлений. Не сохраняют метрики. Синтаксис алертов и записей идентичен. Разница только в названии.',
        'Конфиг скрейпинга — recording rules описывают, как собирать метрики с экспортеров. Указывают targets, intervals, relabeling. Не выполняют запросы. Аналог scrape_configs в Prometheus.',
        'Только для Grafana — recording rules работают исключительно в Grafana. Prometheus их не поддерживает. VictoriaMetrics тоже. Метрики предвычисляются в браузере пользователя при открытии дашборда.'
      ]
    },
    {
      id: 'devops-monadv-6',
      subtopic: 'Мониторинг: практика',
      q: 'Что такое Alertmanager и как настроить маршрутизацию?',
      a: 'Компонент для обработки алертов из Prometheus/VM. route — дерево по labels (severity, team). receivers — email, slack, pagerduty. inhibit_rules — подавление. silences — временное отключение.',
      explain: 'route направляет алерты по label. inhibit подавляет вторичные алерты. silences — во время работ.\n\n```yaml\nroute:\n  receiver: slack\n  routes:\n    - match: { severity: critical }\n      receiver: pagerduty\n```\n\nТипичная ошибка — один receiver на всё.',
      wrong: [
        'Только email — Alertmanager отправляет алерты исключительно по email. Slack, PagerDuty, Telegram — это отдельные сервисы, не поддерживаются Alertmanager. route и receivers существуют, но только для email.',
        'Alertmanager — часть Grafana — Alertmanager встроен в Grafana с версии 8.0. Отдельного компонента нет. Настраивается в UI Grafana. Prometheus и VictoriaMetrics не имеют Alertmanager. Routers и receivers — функции Grafana.',
        'Только для K8s — Alertmanager работает только в Kubernetes. Для обычных серверов используется Grafana Alerting. Prometheus несовместим с Alertmanager. Receivers — это Pod, а не канал уведомлений.'
      ]
    },
    {
      id: 'devops-monadv-7',
      subtopic: 'Мониторинг: практика',
      q: 'Что такое SLO, SLI, Error Budget?',
      a: 'SLI — метрика (успешные запросы / все). SLO — цель (99.9% за 30 дней). Error Budget — допустимая доля ошибок (0.1%). Если бюджет исчерпан — стоп релизам, фокус на надёжности.',
      explain: 'Error Budget = 1 - SLO. Баланс между скоростью и надёжностью.\n\n```promql\nsum(rate(http_requests_total{code=~"2.."}[30d])) / sum(rate(http_requests_total[30d]))\n```\n\nТипичная ошибка — путать SLO и SLA.',
      wrong: [
        'Это одно и то же — SLO, SLI, Error Budget — синонимы. Все три понятия описывают надёжность. Разница только в терминологии разных компаний. Error Budget — это процент доступности.',
        'SLO — это SLA — SLO и SLA — одно и то же, разные названия. SLA — внутреннее соглашение, SLO — внешнее. Error Budget не связан с SLO, это отдельная метрика. SLI — устаревший термин.',
        'Error Budget не связан с SLO — Error Budget — это бюджет на инфраструктуру в деньгах. SLO — уровень обслуживания, никак не связанный с бюджетом. SLI — тип сервиса. Понятия из разных областей.'
      ]
    },
    {
      id: 'devops-monadv-8',
      subtopic: 'Мониторинг: практика',
      q: 'Как настроить Grafana as code?',
      a: 'Provisioning через YAML: datasources и dashboards в /etc/grafana/provisioning. Dashboard JSON в git. Terraform provider для Grafana. Grafana Operator в K8s.',
      explain: 'Provisioning автоматически подхватывает YAML и JSON. Dashboard as code версионируется.\n\n```yaml\napiVersion: 1\ndatasources:\n  - name: Prometheus\n    type: prometheus\n    url: http://prom:9090\n```\n\nТипичная ошибка — настраивать дашборды вручную.',
      wrong: [
        'Только вручную через UI — Grafana as code не поддерживается. Дашборды настраиваются в UI и сохраняются в базе Grafana. Provisioning удалён в Grafana 8.0. Terraform provider не существует.',
        'Через скрипты на bash — Grafana as code реализуется через bash-скрипты с curl. Provisioning и Terraform — мифы. Дашборды хранятся в SQLite, экспортируются через API вручную. JSON в git не используется.',
        'Grafana as code не поддерживается — Grafana принципиально не поддерживает IaC. Дашборды можно только создавать в UI. Provisioning появился в Grafana 9.0, но не работает в проде. Terraform provider — экспериментальный.'
      ]
    },
    {
      id: 'devops-monadv-9',
      subtopic: 'Мониторинг: практика',
      q: 'Чем метрики отличаются от логов и трейсов?',
      a: 'Метрики — числа во времени, дёшево, агрегируются, для алертов. Логи — события, дорого, детали. Трейсы — путь запроса через сервисы, для latency-анализа. Together = observability.',
      explain: 'Метрики отвечают «что», логи «что случилось», трейсы «где». Вместе дают observability.\n\n```json\n{ "trace_id": "abc", "span": "db.query" }\n```\n\nТипичная ошибка — использовать только логи.',
      wrong: [
        'Это одно и то же — метрики, логи и трейсы — три названия одного формата данных. Отличаются только цветом в Grafana. Хранятся в одной БД. Используются одинаково.',
        'Только метрики важны — метрики заменяют логи и трейсы. Логи устарели, трейсы — маркетинг. Все проблемы решаются метриками. OpenTelemetry — избыточный стандарт. Достаточно Prometheus.',
        'Только логи важны — логи заменяют метрики и трейсы. Метрики — агрегация логов. Трейсы — подмножество логов. Observability = логирование. Prometheus и Jaeger не нужны.'
      ]
    },
    {
      id: 'devops-monadv-10',
      subtopic: 'Мониторинг: практика',
      q: 'Что такое OpenTelemetry?',
      a: 'Стандарт для сбора метрик, логов, трейсов. SDK для языков, Collector для приёма/экспорта, OTLP-протокол. Вендор-нейтральный, экспорт в Prometheus, Jaeger, Tempo, VM.',
      explain: 'OTel унифицирует инструментацию. Collector принимает OTLP и экспортирует куда угодно.\n\n```yaml\nreceivers: [otlp]\nexporters: [prometheus]\n```\n\nТипичная ошибка — использовать проприетарные SDK.',
      wrong: [
        'Только для трейсов — OpenTelemetry работает только с трейсами. Для метрик используется Prometheus, для логов — Loki. OTel Collector не поддерживает метрики и логи. Это узкоспециализированный инструмент.',
        'Продукт Google — OpenTelemetry разработан Google и доступен только в GCP. Для AWS и Azure нужны отдельные SDK. Вендор-нейтральность — миф. OTLP-протокол работает только внутри GCP.',
        'Аналог Prometheus — OpenTelemetry заменяет Prometheus. Собирает и хранит метрики. Использует собственный язык запросов OTQL. PromQL не поддерживается. Grafana не работает с OTel.'
      ]
    },
    {
      id: 'devops-monadv-11',
      subtopic: 'Мониторинг: практика',
      q: 'Как построить алерты, которые не шумят?',
      a: 'Алертить на симптомы (SLO burn rate), а не на причины. for: 5m для устойчивости. Severity с разными каналами. Inhibit и grouping. Регулярный review и удаление неиспользуемых.',
      explain: 'Burn rate — скорость исчерпания error budget. for: 5m убирает флапы.\n\n```yaml\nexpr: burn_rate > 14.4\nfor: 5m\n```\n\nТипичная ошибка — алертить на каждую метрику.',
      wrong: [
        'Алертить на всё — чем больше алертов, тем выше надёжность. Каждая метрика должна быть алертом. for: 0 для мгновенной реакции. Severity не нужен, всё critical. Review не требуется, алерты важны сами по себе.',
        'Только критические — алертить только на 100% отказы. Warnings и info не нужны. Burn rate — маркетинговый термин. for: 30m для устойчивости. Группировка и inhibit избыточны.',
        'Алерты не ревьюятся — алерты настраиваются один раз и не пересматриваются. Удаление алертов ломает мониторинг. Шумные алерты — норма, их можно игнорировать. Severity и grouping не нужны.'
      ]
    },
    {
      id: 'devops-monadv-12',
      subtopic: 'Мониторинг: практика',
      q: 'Как мониторить VictoriaMetrics сам?',
      a: 'Метрики: vm_* (vm_rows_inserted, vm_slow_queries, vm_cache_*, vm_free_disk_space). Алерты на диск, slow queries, ingestion rate. Само-скрейп vmagent/vmsingle/vmcluster.',
      explain: 'VM экспортирует свои метрики. Алерты на диск и slow queries — базовые.\n\n```promql\nvm_free_disk_space_bytes\n```\n\nТипичная ошибка — не мониторить саму систему мониторинга.',
      wrong: [
        'VM не мониторится — сам себя VictoriaMetrics не мониторит. Для этого нужен отдельный Prometheus. Метрики vm_* не экспортируются. Диск и slow queries недоступны изнутри. Только внешний мониторинг.',
        'Только через Grafana — метрики VM доступны только в Grafana. Прямой скрейп VM невозможен. vm_* — не метрики, а конфиги. Алерты настраиваются только в UI Grafana, не в VM.',
        'Через node_exporter — метрики VM снимаются через node_exporter. Собственных метрик у VM нет. vm_* — это префикс для node_exporter. Само-скрейп не поддерживается.'
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
        'Просто «всё починил» — без деталей и структуры. Достаточно сказать, что решил проблему. Собеседующий поймёт, что ты опытный. STAR, детали, метрики — избыточны. Главное — уверенный тон.',
        'Обвинить коллег — честный рассказ про чужую ошибку. Показать, что ты видишь проблемы команды. Собеседующий оценит прямоту. Свою роль в инциденте не упоминать, это ослабит ответ.',
        'Не помню — честный ответ. Если инцидентов не было, так и сказать. Выдумывать не нужно. Собеседующий поймёт, что опыт небольшой, но зато честный. STAR не применяется.'
      ]
    },
    {
      id: 'devops-beh-2',
      subtopic: 'Поведенческие вопросы',
      q: 'Что делать, если прод упал в 3 ночи?',
      a: '1) Подтвердить алерт, 2) Оценить масштаб (что именно недоступно), 3) Коммуницировать в инцидент-канал, 4) Митигация (rollback, failover), 5) Root cause после восстановления, 6) Post-mortem без обвинений.',
      explain: 'Сначала митигация, потом root cause. Коммуникация важна для стейкхолдеров.\n\n```text\n1. Ack alert\n2. Mitigate\n3. Post-mortem\n```\n\nТипичная ошибка — искать root cause до восстановления.',
      wrong: [
        'Сразу писать директору — директор должен знать первым. Эскалация важнее митигации. Сначала сообщить руководству, потом действовать. Root cause тоже сообщить сразу. Так принято в крупных компаниях.',
        'Ждать утра — инцидент разбирается в рабочее время. Ночью ничего не делать, утром решить. Дежурство не имеет смысла. Если прод упал — утром восстановят. Стейкхолдеры поймут.',
        'Перезагрузить всё — универсальное решение. Перезагрузка серверов, кластера, БД решает любые проблемы. Диагностика не нужна, потому что состояние сбрасывается. Постмортем не требуется. Так делают все.'
      ]
    },
    {
      id: 'devops-beh-3',
      subtopic: 'Поведенческие вопросы',
      q: 'Как ты организуешь дежурство?',
      a: 'On-call ротация, primary/secondary, эскалация, runbooks, алерты только на actionable, компенсация, лимит нагрузки. Review алертов после каждого дежурства.',
      explain: 'Runbooks ускоряют реакцию. Review алертов убирает шум.\n\n```text\nrotation: weekly\nprimary + secondary\nescalation: 15 min\n```\n\nТипичная ошибка — один человек на всё.',
      wrong: [
        'Один человек всегда — дежурство не нужно организовывать. Один инженер отвечает за всё. Ротация — избыточна. Эскалация не нужна, потому что он всё знает. Runbooks не нужны, всё в голове.',
        'Без эскалации — эскалация ломает автономность дежурного. Один человек должен решить всё сам. Secondary тоже не нужен. Если не справляется — пусть учится. Эскалация — это слабость.',
        'Только в рабочее время — дежурство ограничивается рабочими часами. Ночью никто не дежурит. Инциденты разбираются утром. On-call ротация не применяется. Так работает большинство компаний.'
      ]
    },
    {
      id: 'devops-beh-4',
      subtopic: 'Поведенческие вопросы',
      q: 'Как ты выбираешь между технологиями?',
      a: 'По требованиям: масштаб, команда, бюджет, поддержка, экосистема. PoC на малом кейсе. Оценка TCO. Предпочтение проверенным решениям, если нет веских причин.',
      explain: 'TCO включает поддержку и обучение. PoC снижает риск.\n\n```text\nRequirements → PoC → TCO → Decision\n```\n\nТипичная ошибка — выбирать по хайпу.',
      wrong: [
        'Всегда новейшее — выбирать самое новое, чтобы быть в тренде. Стабильные технологии не рассматриваются. PoC не нужен, потому что новое всегда лучше. TCO не важен, главное — современность.',
        'Что знаю, то и беру — выбирать знакомый стек. Учиться новому не нужно. Если команда знает Java — использовать Java везде, даже для скриптов. Требования и TCO не важны.',
        'По совету в Twitter — решения принимаются по трендам. Мнение сообщества важнее требований. Хайп — критерий выбора. PoC, TCO, требования — избыточны. Главное — чтобы было модно.'
      ]
    },
    {
      id: 'devops-beh-5',
      subtopic: 'Поведенческие вопросы',
      q: 'Как ты документируешь инфраструктуру?',
      a: 'IaC в git — источник правды. README в каждом репо, runbooks для инцидентов, ADR для решений, диаграммы (draw.io, Mermaid), Confluence/Notion для процессов. Документация обновляется в PR.',
      explain: 'ADR фиксирует решения и контекст. Runbooks — для дежурных.\n\n```markdown\n# ADR-001: Выбор Kubernetes\n```\n\nТипичная ошибка — документация устаревает.',
      wrong: [
        'Только в голове — документация отвлекает от работы. Всё, что нужно, держится в памяти. Команда знает инфраструктуру. Если что-то забыли — спросят коллегу. Confluence и README не нужны.',
        'Только в чате — документация живёт в истории чата. Поиск по Slack заменяет wiki. Скриншоты и сообщения — единственный источник правды. Confluence устарел. ADR не нужен, история сохраняется сама.',
        'Документация не нужна — инфраструктура описывается в IaC. Дублировать в README бессмысленно. Runbooks, ADR, диаграммы — избыточны. Код сам себя документирует. Confluence только для менеджеров.'
      ]
    },
    {
      id: 'devops-beh-6',
      subtopic: 'Поведенческие вопросы',
      q: 'Опиши свой последний проект.',
      a: 'Структура: цель, стек, роль, ключевые решения, метрики (uptime, cost, deployment frequency), чему научился. 2–3 минуты, без воды, с конкретикой.',
      explain: 'Метрики показывают impact. Конкретика важнее общих слов.\n\n```text\nGoal: migrate to K8s\nResult: uptime 99.9%, cost -30%\n```\n\nТипичная ошибка — монолог на 10 минут.',
      wrong: [
        'Просто список технологий — перечислить стек, не углубляясь. Kubernetes, Terraform, Ansible, Prometheus, Grafana, Kafka. Собеседующий сам поймёт, что ты эксперт. Цели, метрики, роль — не важны.',
        'Без результата — описывать процесс, не результат. Что делал, с какими технологиями, какие были challenges. Метрики не нужны, они для менеджеров. Главное — показать усилия.',
        '10 минут монолога — подробно рассказать всё. Чем детальнее, тем лучше. Собеседующий оценит глубину. Если перебьёт — значит не заинтересован. Структура STAR избыточна, надо рассказывать свободно.'
      ]
    },
    {
      id: 'devops-beh-7',
      subtopic: 'Поведенческие вопросы',
      q: 'Как ты относишься к post-mortem?',
      a: 'Blameless post-mortem — фокус на системах, а не людях. Timeline, root cause (5 whys), impact, action items с владельцами и сроками. Публикация внутри компании.',
      explain: 'Blameless повышает честность. Action items с владельцами не дают забыть.\n\n```text\nTimeline → Root Cause → Actions\n```\n\nТипичная ошибка — искать виноватого.',
      wrong: [
        'Найти виноватого — post-mortem нужен, чтобы наказать виновного. Публичное порицание мотивирует остальных. Blameless — западная мода, не работает. Страх повышает внимательность. Так делают в азиатских компаниях.',
        'Не проводить — post-mortem — трата времени. Инцидент закрыт, можно забыть. Уроки извлекаются сами. Action items — бюрократия. Лучше потратить время на код, а не на разбор.',
        'Только для крупных инцидентов — мелкие инциденты не стоят разбора. Постмортем нужен только при простоях > часа. Downtime в 5 минут — норма, разбор не нужен. Blameless только для серьёзных случаев.'
      ]
    },
    {
      id: 'devops-beh-8',
      subtopic: 'Поведенческие вопросы',
      q: 'Как ты автоматизируешь рутину?',
      a: 'Сначала измерить время, потом автоматизировать частые операции: скрипты, Ansible, CI/CD, self-service. Приоритет по ROI. Не автоматизировать то, что делается раз в год.',
      explain: 'Toil — рутинная работа. Автоматизация по ROI. Разовые задачи не автоматизируют.\n\n```text\nMeasure → Prioritize → Automate\n```\n\nТипичная ошибка — автоматизировать всё подряд.',
      wrong: [
        'Автоматизировать всё — любая задача должна быть автоматизирована. Даже разовые. ROI не важен, автоматизация всегда полезна. Измерение времени — избыточно. Ansible и скрипты для всего.',
        'Только вручную — автоматизация отвлекает от реальной работы. Ручные операции дают контроль. Скрипты ломаются. Лучше один раз сделать вручную, чем отлаживать скрипт. Ansible только для больших проектов.',
        'Автоматизация не нужна — DevOps это про культуру, не про скрипты. Ручные операции — норма. Автоматизация снижает навыки. Ansible, CI/CD — маркетинг. Лучше нанять больше инженеров.'
      ]
    },
    {
      id: 'devops-beh-9',
      subtopic: 'Поведенческие вопросы',
      q: 'Как ты внедрял культуру SRE в команде?',
      a: 'SLO/SLI, error budget, blameless post-mortem, runbooks, on-call, toil reduction, автоматизация. Начать с малого, показать ценность, обучить команду. Метрики: MTTR, deployment frequency, change failure rate.',
      explain: 'DORA-метрики показывают зрелость. Начинать с SLO и post-mortem.\n\n```text\nSLO → Error Budget → Post-mortem → Automation\n```\n\nТипичная ошибка — внедрять всё сразу.',
      wrong: [
        'Только нанять SRE — культура SRE внедряется наймом специалиста. Обучать команду не нужно. SRE сам всё сделает. SLO, error budget — его задачи. Остальные продолжат работать как раньше.',
        'Только купить инструменты — культура SRE — это инструменты. Datadog, PagerDuty, Prometheus решают всё. Обучение, процессы не важны. Если инструменты куплены — культура внедрена. SLO настраивается в UI.',
        'Культура не внедряется — SRE это набор инструментов, не культура. Внедрять нечего. Достаточно купить Datadog и PagerDuty. Команда сама разберётся. SLO, error budget — избыточны. Главное — алерты.'
      ]
    },
    {
      id: 'devops-beh-10',
      subtopic: 'Поведенческие вопросы',
      q: 'Расскажи про случай, когда ты ошибся.',
      a: 'Честно, с контекстом: что сделал, какой impact, как обнаружил, как митигировал, что изменил в процессе. Показать зрелость и системное мышление.',
      explain: 'Честность важнее «идеального» ответа. Выводы показывают рост.\n\n```text\nMistake → Impact → Fix → Prevention\n```\n\nТипичная ошибка — говорить «я не ошибаюсь».',
      wrong: [
        'Я не ошибаюсь — честный ответ. Опытный инженер не совершает ошибок. Если бывали — это не считается. Собеседующий оценит уверенность. Слабые ответы про ошибки портят впечатление.',
        'Обвинить других — рассказать про чужую ошибку. Показать, что видишь проблемы команды. Собеседующий оценит прямоту. Своя роль не упоминается. Impact чужой ошибки — показать масштаб.',
        'Без выводов — рассказать про ошибку без последствий. Главное — что ошибка была. Какие выводы — не важно. Профилактика — избыточна. Собеседующий оценит честность, а не глубину.'
      ]
    },
    {
      id: 'devops-beh-11',
      subtopic: 'Поведенческие вопросы',
      q: 'Как ты принимаешь решения в условиях неопределённости?',
      a: 'Собрать данные, оценить риск, выбрать обратимые решения, PoC, таймбокс. Коммуницировать assumptions. План B. Регулярно пересматривать.',
      explain: 'Обратимые решения (two-way doors) принимаются быстро. Необратимые — медленно.\n\n```text\nData → Risk → Reversible? → Decide\n```\n\nТипичная ошибка — ждать полной информации.',
      wrong: [
        'Ждать полной информации — решения принимаются только при 100% данных. Если данных нет — не решать. Время не важно. Обратимость не учитывается. PoC и таймбокс — избыточны. Главное — не ошибиться.',
        'Монетка — если данных нет, выбрать случайно. Интуиция важнее анализа. Обратимость не важна. План B не нужен. Так делают в стартапах. Скорость важнее точности.',
        'Спросить начальника — решения принимает руководитель. Своя ответственность не нужна. Assumptions не коммуницируются. План B — его задача. Регулярный пересмотр — тоже он.'
      ]
    },
    {
      id: 'devops-beh-12',
      subtopic: 'Поведенческие вопросы',
      q: 'Как ты обучаешь junior-инженеров?',
      a: 'Менторство, парное программирование, code review, runbooks, постепенное усложнение задач. Давать контекст «почему», а не только «как». Безопасная среда для ошибок.',
      explain: 'Контекст «почему» учит мыслить. Безопасная среда ускоряет рост.\n\n```text\nPair → Review → Context → Gradual\n```\n\nТипичная ошибка — делать всё самому.',
      wrong: [
        'Только давать задачи — junior учится сам. Менторство избыточно. Пусть разбирается. Если не справляется — не его уровень. Code review для слабаков. Ошибки — его проблемы.',
        'Делать всё самому — быстрее сделать самому, чем объяснять. Junior пусть смотрит и учится. Ошибки недопустимы. Парное программирование — трата времени. Runbooks не нужны, всё делается ad-hoc.',
        'Не обучать — это не задача senior. Наймом junior занимается HR. Обучение — задача самого junior. Менторство не оплачивается. Пусть учится на курсах. Code review — формальность.'
      ]
    }
  ]
});