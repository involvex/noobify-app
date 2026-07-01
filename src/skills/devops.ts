import type { TermDefinition } from './types';

export const devopsTerms: TermDefinition[] = [
  {
    name: 'Git',
    aliases: ['git version control'],
    tags: ['version-control', 'collaboration', 'scm'],
    whatItIs: 'a distributed version control system that tracks changes in source code',
    analogy:
      'Git is like a time machine for your code. You can save snapshots (commits) at any point, travel back to previous versions, and branch off to try experiments without affecting the main timeline.',
    keyTraits: ['Distributed', 'Branching', 'Merging', 'History'],
    commonComparisons: ['SVN', 'Mercurial', 'Perforce'],
  },
  {
    name: 'GitHub',
    aliases: ['gh'],
    tags: ['git', 'collaboration', 'cloud'],
    whatItIs: 'a cloud-based platform for hosting Git repositories and collaborating on code',
    analogy:
      'GitHub is like Google Docs but for code. Multiple people can work on the same project, suggest changes (pull requests), discuss issues, and track who did what and when.',
    keyTraits: ['Hosting', 'Pull requests', 'Issues', 'Actions'],
    commonComparisons: ['GitLab', 'Bitbucket', 'Codeberg'],
  },
  {
    name: 'CI/CD',
    aliases: ['continuous integration', 'continuous deployment', 'continuous delivery'],
    tags: ['automation', 'deployment', 'pipeline'],
    whatItIs: 'practices that automate testing, building, and deploying code changes',
    analogy:
      'CI/CD is like a factory assembly line. Every time a developer commits code, it automatically goes through quality checks (CI), gets packaged (build), and is deployed to production (CD) — no manual steps.',
    keyTraits: ['Automated', 'Fast feedback', 'Reliable', 'Frequent'],
    commonComparisons: ['GitHub Actions', 'Jenkins', 'GitLab CI'],
  },
  {
    name: 'GitHub Actions',
    aliases: ['gh actions', 'actions'],
    tags: ['ci-cd', 'automation', 'github'],
    whatItIs: 'a CI/CD platform integrated into GitHub for automating workflows',
    analogy:
      'GitHub Actions is like setting up automatic rules for your code仓库. "When someone pushes code, run tests. If they pass, deploy." It\'s like a robotic assistant that never sleeps.',
    keyTraits: ['YAML workflows', 'Marketplace', 'Self-hosted', 'Free tier'],
    commonComparisons: ['GitLab CI', 'Jenkins', 'CircleCI'],
  },
  {
    name: 'Docker',
    aliases: ['containers', 'docker container'],
    tags: ['containers', 'virtualization', 'deployment'],
    whatItIs:
      'a platform for developing, shipping, and running applications in lightweight containers',
    analogy:
      'Docker is like a portable lunchbox for apps. Your app and all its dependencies go into a standardized container that runs the same way everywhere — your laptop, a server, or the cloud.',
    keyTraits: ['Containers', 'Images', 'Compose', 'Registry'],
    commonComparisons: ['Podman', 'Kubernetes', 'VMs'],
  },
  {
    name: 'Kubernetes',
    aliases: ['k8s'],
    tags: ['orchestration', 'containers', 'scaling'],
    whatItIs:
      'an open-source system for automating deployment, scaling, and management of containerized applications',
    analogy:
      'Kubernetes is like an air traffic controller for containers. It decides which containers (planes) run where (servers), scales them up during traffic, and restarts them if they crash.',
    keyTraits: ['Orchestration', 'Auto-scaling', 'Self-healing', 'Declarative'],
    commonComparisons: ['Docker Swarm', 'Nomad', 'ECS'],
  },
  {
    name: 'AWS',
    aliases: ['amazon web services', 'amazon aws'],
    tags: ['cloud', 'provider', 'infrastructure'],
    whatItIs: "Amazon's cloud computing platform offering a wide range of services",
    analogy:
      "AWS is like an all-you-can-eat buffet of computing. Need a server? Grab one. Database? It's there. AI? Help yourself. Pay only for what you eat (use).",
    keyTraits: ['IaaS', 'Global', 'Pay-as-you-go', 'Comprehensive'],
    commonComparisons: ['Azure', 'GCP', 'DigitalOcean'],
  },
  {
    name: 'Azure',
    aliases: ['microsoft azure'],
    tags: ['cloud', 'provider', 'microsoft'],
    whatItIs:
      "Microsoft's cloud computing platform for building, deploying, and managing applications",
    analogy:
      "Azure is like Microsoft's cloud playground. It plays well with Windows and .NET but also supports Linux, Python, and everything in between.",
    keyTraits: ['Hybrid', 'Enterprise', 'Microsoft integration', 'Global'],
    commonComparisons: ['AWS', 'GCP', 'IBM Cloud'],
  },
  {
    name: 'GCP',
    aliases: ['google cloud', 'google cloud platform'],
    tags: ['cloud', 'provider', 'google'],
    whatItIs: "Google's suite of cloud computing services",
    analogy:
      "GCP is like Google's data center, but for rent. It uses the same infrastructure that powers Search and YouTube, now available for your apps and data.",
    keyTraits: ['Data analytics', 'AI/ML', 'Kubernetes native', 'Serverless'],
    commonComparisons: ['AWS', 'Azure', 'Firebase'],
  },
  {
    name: 'Serverless',
    aliases: ['serverless computing', 'faas', 'function as a service'],
    tags: ['cloud', 'architecture', 'scaling'],
    whatItIs: 'a cloud model where the provider manages server infrastructure automatically',
    analogy:
      "Serverless is like用电 (electricity). You don't own a power plant — you just plug in and pay for what you use. Same with code: just deploy functions, and the cloud runs them.",
    keyTraits: ['No servers to manage', 'Auto-scaling', 'Pay-per-use', 'Event-driven'],
    commonComparisons: ['Containers', 'VMs', 'PaaS'],
  },
  {
    name: 'Lambda',
    aliases: ['aws lambda', 'cloud function'],
    tags: ['serverless', 'functions', 'aws'],
    whatItIs: "AWS's serverless compute service that runs code in response to events",
    analogy:
      'Lambda is like a vending machine for code. You put in an event (coin), your code runs (snack drops out), and you only pay when someone uses it.',
    keyTraits: ['Event-driven', 'Auto-scaling', 'Pay-per-use', 'Stateless'],
    commonComparisons: ['Azure Functions', 'Cloud Functions', 'Cloudflare Workers'],
  },
  {
    name: 'Terraform',
    aliases: ['tf', 'hashicorp terraform'],
    tags: ['iac', 'infrastructure', 'automation'],
    whatItIs: 'an infrastructure-as-code tool for provisioning cloud resources declaratively',
    analogy:
      "Terraform is like an architect's blueprint for your cloud. You describe what you want (servers, databases, networks), and Terraform builds it automatically — and keeps it in sync.",
    keyTraits: ['Declarative', 'State management', 'Multi-cloud', 'HCL'],
    commonComparisons: ['Pulumi', 'CloudFormation', 'Ansible'],
  },
  {
    name: 'Ansible',
    aliases: ['ansible automation'],
    tags: ['configuration', 'automation', 'management'],
    whatItIs:
      'an open-source automation tool for configuration management and application deployment',
    analogy:
      'Ansible is like a universal remote for your servers. Write a simple script, and it configures hundreds of servers the same way — no SSH-hopping required.',
    keyTraits: ['Agentless', 'YAML', 'Idempotent', 'Push-based'],
    commonComparisons: ['Puppet', 'Chef', 'SaltStack'],
  },
  {
    name: 'Monitoring',
    aliases: ['observability', 'system monitoring'],
    tags: ['operations', 'logging', 'metrics'],
    whatItIs: 'the process of collecting, analyzing, and using data to track system health',
    analogy:
      "Monitoring is like a car's dashboard. It shows you speed (metrics), engine health (logs), and warns about problems (alerts) before you break down.",
    keyTraits: ['Metrics', 'Logs', 'Alerts', 'Dashboards'],
    commonComparisons: ['Logging', 'Tracing', 'Profiling'],
  },
  {
    name: 'Prometheus',
    aliases: ['prom'],
    tags: ['monitoring', 'metrics', 'time-series'],
    whatItIs: 'an open-source monitoring system with a time-series database',
    analogy:
      'Prometheus is like a fitness tracker for your servers. It records every heartbeat (metric) at regular intervals and lets you analyze performance over time.',
    keyTraits: ['Time-series', 'Pull-based', 'Alerting', 'PromQL'],
    commonComparisons: ['Grafana', 'Datadog', 'New Relic'],
  },
  {
    name: 'Grafana',
    aliases: ['grafana dashboards'],
    tags: ['visualization', 'monitoring', 'dashboards'],
    whatItIs: 'an open-source analytics and monitoring platform with beautiful visualizations',
    analogy:
      'Grafana is like a control room with wall-to-wall screens. It takes raw data from various sources and displays it as easy-to-read charts and graphs.',
    keyTraits: ['Dashboards', 'Multi-source', 'Plugins', 'Alerting'],
    commonComparisons: ['Kibana', 'Datadog', 'Chronograf'],
  },
  {
    name: 'Nginx',
    aliases: ['nginx'],
    tags: ['web-server', 'reverse-proxy', 'load-balancer'],
    whatItIs: 'a high-performance web server and reverse proxy server',
    analogy:
      'Nginx is like a bouncer at a club. It handles all incoming requests, routes them to the right servers, and blocks bad traffic before it gets inside.',
    keyTraits: ['High performance', 'Reverse proxy', 'Load balancer', 'SSL termination'],
    commonComparisons: ['Apache', 'Caddy', 'HAProxy'],
  },
  {
    name: 'Reverse Proxy',
    aliases: ['proxy', 'reverse-proxy-server'],
    tags: ['networking', 'security', 'load-balancing'],
    whatItIs: 'a server that sits between clients and backend servers, forwarding requests',
    analogy:
      'A reverse proxy is like a receptionist. Visitors (users) talk to the receptionist, who routes them to the right department (server) — keeping the internal structure hidden.',
    keyTraits: ['Load balancing', 'SSL termination', 'Caching', 'Security'],
    commonComparisons: ['Forward proxy', 'Load balancer', 'Gateway'],
  },
  {
    name: 'Load Balancer',
    aliases: ['lb', 'load-balancing'],
    tags: ['networking', 'scaling', 'availability'],
    whatItIs: 'a device or software that distributes network traffic across multiple servers',
    analogy:
      'A load balancer is like a traffic cop at an intersection. It directs cars (requests) to different roads (servers) so no single road gets jammed.',
    keyTraits: ['Distribution', 'Health checks', 'Sessions', 'Algorithms'],
    commonComparisons: ['Round robin', 'Least connections', 'IP hash'],
  },
  {
    name: 'SSL',
    aliases: ['tls', 'ssl certificate', 'https'],
    tags: ['security', 'encryption', 'web'],
    whatItIs: 'a cryptographic protocol that provides secure communication over a network',
    analogy:
      "SSL is like an armored car for your data. It encrypts information in transit so even if intercepted, it's unreadable without the decryption key.",
    keyTraits: ['Encryption', 'Certificates', 'Handshake', 'Trust'],
    commonComparisons: ['TLS', 'SSH', 'VPN'],
  },
  {
    name: 'Firewall',
    aliases: ['network firewall', 'fw'],
    tags: ['security', 'networking', 'protection'],
    whatItIs: 'a network security system that monitors and controls incoming and outgoing traffic',
    analogy:
      "A firewall is like a security guard at a building entrance. It checks every visitor's ID (packet) against a list of rules and only lets authorized ones through.",
    keyTraits: ['Traffic filtering', 'Rules-based', 'Stateful', 'Logging'],
    commonComparisons: ['IDS', 'IPS', 'WAF'],
  },
  {
    name: 'VPN',
    aliases: ['virtual private network'],
    tags: ['security', 'networking', 'privacy'],
    whatItIs: 'a technology that creates a secure, encrypted connection over a public network',
    analogy:
      'VPN is like a private tunnel through public roads. Your data travels through this encrypted tunnel, invisible to everyone else on the highway (internet).',
    keyTraits: ['Encrypted', 'Tunneling', 'Privacy', 'Remote access'],
    commonComparisons: ['SSH tunnel', 'Proxy', 'Tor'],
  },
  {
    name: 'SSH',
    aliases: ['secure shell', 'ssh key'],
    tags: ['security', 'remote-access', 'terminal'],
    whatItIs: 'a cryptographic network protocol for secure remote command-line access',
    analogy:
      'SSH is like a secure walkie-talkie for servers. You can give commands from anywhere, and everything you say is encrypted so no one can eavesdrop.',
    keyTraits: ['Encrypted', 'Key-based', 'Terminal', 'Tunneling'],
    commonComparisons: ['Telnet', 'RDP', 'SCP'],
  },
  {
    name: 'Log',
    aliases: ['logging', 'logs', 'application log'],
    tags: ['operations', 'debugging', 'monitoring'],
    whatItIs: 'a record of events that occur within a software application',
    analogy:
      "Logs are like a ship's logbook. Every significant event gets recorded — who did what, when, and what happened — so you can trace back issues later.",
    keyTraits: ['Timestamped', 'Structured', 'Levels', 'Searchable'],
    commonComparisons: ['Metrics', 'Traces', 'Events'],
  },
  {
    name: 'Microservice',
    aliases: ['microservices', 'microservice architecture'],
    tags: ['architecture', 'distributed', 'scaling'],
    whatItIs:
      'an architectural style that structures an application as a collection of loosely coupled services',
    analogy:
      'Microservices is like a food court instead of a single restaurant. Each stall (service) specializes in one cuisine (function) and can be updated or replaced independently.',
    keyTraits: ['Independent', 'Scalable', 'Polyglot', 'Resilient'],
    commonComparisons: ['Monolith', 'SOA', 'Serverless'],
  },
  {
    name: 'Monolith',
    aliases: ['monolithic', 'monolithic architecture'],
    tags: ['architecture', 'traditional', 'simple'],
    whatItIs:
      'a software architecture where all components are tightly coupled and run as a single unit',
    analogy:
      'A monolith is like a department store where everything is under one roof. Easy to manage at first, but when you need to update the shoe section, you might accidentally affect the electronics.',
    keyTraits: ['Single unit', 'Simple deployment', 'Tightly coupled', 'Scale together'],
    commonComparisons: ['Microservices', 'Modular monolith', 'Serverless'],
  },
  {
    name: 'API Gateway',
    aliases: ['gateway', 'api-gateway'],
    tags: ['architecture', 'api', 'management'],
    whatItIs: 'a server that acts as a single entry point for API calls to microservices',
    analogy:
      'An API Gateway is like a hotel concierge. Guests (clients) make requests to one person, who routes them to the right service — room service, housekeeping, or maintenance.',
    keyTraits: ['Single entry', 'Routing', 'Rate limiting', 'Authentication'],
    commonComparisons: ['Load balancer', 'Service mesh', 'Reverse proxy'],
  },
  {
    name: 'Message Queue',
    aliases: ['mq', 'message-broker'],
    tags: ['messaging', 'async', 'decoupling'],
    whatItIs: 'a communication pattern where messages are stored in a queue until processed',
    analogy:
      "A message queue is like a post office. You drop off a letter (message), and it sits in a mailbox (queue) until the recipient (consumer) picks it up — even if they're busy right now.",
    keyTraits: ['Asynchronous', 'Decoupled', 'Persistent', 'Scalable'],
    commonComparisons: ['Kafka', 'RabbitMQ', 'Redis Pub/Sub'],
  },
  {
    name: 'Kafka',
    aliases: ['apache kafka', 'kafka streaming'],
    tags: ['messaging', 'streaming', 'event-driven'],
    whatItIs: 'a distributed event streaming platform for high-throughput data pipelines',
    analogy:
      'Kafka is like a newspaper distribution center. It receives news (events) from reporters, organizes them by topic, and delivers copies to thousands of subscribers simultaneously.',
    keyTraits: ['Distributed', 'High throughput', 'Persistent', 'Real-time'],
    commonComparisons: ['RabbitMQ', 'Pulsar', 'Redis Streams'],
  },
  {
    name: 'ELK Stack',
    aliases: ['elasticsearch', 'logstash', 'kibana', 'elastic'],
    tags: ['logging', 'search', 'analytics'],
    whatItIs:
      'a set of three tools (Elasticsearch, Logstash, Kibana) for searching, analyzing, and visualizing log data',
    analogy:
      'ELK is like a library system. Elasticsearch is the index (finds anything fast), Logstash is the librarian (organizes and processes), and Kibana is the catalog interface (visualizes).',
    keyTraits: ['Full-text search', 'Analytics', 'Visualization', 'Scalable'],
    commonComparisons: ['Splunk', 'Loki', 'Datadog'],
  },
  {
    name: 'Container Registry',
    aliases: ['docker registry', 'image registry'],
    tags: ['containers', 'storage', 'distribution'],
    whatItIs: 'a storage and distribution system for container images',
    analogy:
      "A container registry is like Docker's app store. Developers push their finished container images there, and others can pull them to run the same containers.",
    keyTraits: ['Storage', 'Distribution', 'Versioning', 'Access control'],
    commonComparisons: ['Docker Hub', 'GitHub Container Registry', 'ECR'],
  },
  {
    name: 'Infrastructure as Code',
    aliases: ['iac', 'infrastructure-as-code'],
    tags: ['automation', 'infrastructure', 'devops'],
    whatItIs:
      'managing infrastructure through machine-readable configuration files rather than manual processes',
    analogy:
      'IaC is like a recipe for your servers. Instead of manually cooking each dish (setting up servers), you write down exact instructions (code) that create identical meals every time.',
    keyTraits: ['Version-controlled', 'Repeatable', 'Automated', 'Declarative'],
    commonComparisons: ['Terraform', 'CloudFormation', 'Pulumi'],
  },
  {
    name: 'Blue-Green Deployment',
    aliases: ['blue-green', 'blue/green'],
    tags: ['deployment', 'strategy', 'zero-downtime'],
    whatItIs: 'a deployment strategy that maintains two identical production environments',
    analogy:
      'Blue-green is like having two identical stages. You perform on stage Blue while the audience watches. When ready, you switch the audience to stage Green instantly — no downtime.',
    keyTraits: ['Zero downtime', 'Rollback', 'Two environments', 'Instant switch'],
    commonComparisons: ['Canary', 'Rolling', 'A/B testing'],
  },
  {
    name: 'Canary Deployment',
    aliases: ['canary', 'canary release'],
    tags: ['deployment', 'strategy', 'gradual'],
    whatItIs:
      'a deployment strategy that gradually rolls out changes to a small subset of users first',
    analogy:
      'Canary deployment is like testing a new recipe on 5 customers before serving it to the whole restaurant. If they love it, roll it out to everyone.',
    keyTraits: ['Gradual rollout', 'Risk mitigation', 'Monitoring', 'User segments'],
    commonComparisons: ['Blue-green', 'Rolling', 'Feature flags'],
  },
  {
    name: 'Feature Flag',
    aliases: ['feature toggle', 'feature switch'],
    tags: ['deployment', 'feature', 'control'],
    whatItIs: 'a technique to enable or disable features in production without deploying new code',
    analogy:
      "Feature flags are like light switches for features. You can build a new room (feature) but keep the lights off until you's ready to show it to guests.",
    keyTraits: ['Toggle', 'Gradual rollout', 'A/B testing', 'Kill switch'],
    commonComparisons: ['LaunchDarkly', 'Unleash', 'ConfigCat'],
  },
];
