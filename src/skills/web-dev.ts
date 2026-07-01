import type { TermDefinition } from './types';

export const webDevTerms: TermDefinition[] = [
  {
    name: 'Bun',
    aliases: ['bun.js', 'bunjs'],
    tags: ['runtime', 'javascript', 'typescript', 'bundler', 'package-manager'],
    whatItIs: 'a fast JavaScript/TypeScript runtime, package manager, and bundler all in one',
    analogy:
      'Bun is like a Swiss Army knife for JavaScript. Instead of using separate tools for running code (Node), installing packages (npm), and bundling (webpack), Bun does it all in one blazing-fast tool.',
    keyTraits: ['Fast', 'All-in-one', 'Modern', 'Node.js compatible'],
    commonComparisons: ['Node.js', 'Deno', 'npm', 'webpack', 'esbuild'],
  },
  {
    name: 'TypeScript',
    aliases: ['ts'],
    tags: ['language', 'types', 'javascript'],
    whatItIs: 'a typed superset of JavaScript that adds static type checking',
    analogy:
      'TypeScript is like adding spell-check to your writing. JavaScript lets you write anything (even mistakes), while TypeScript catches errors before you run the code, like a editor catching typos before you publish.',
    keyTraits: ['Type-safe', 'Catches errors early', 'Compiles to JavaScript'],
    commonComparisons: ['JavaScript', 'Flow', 'JSDoc'],
  },
  {
    name: 'React',
    aliases: ['reactjs', 'react.js'],
    tags: ['framework', 'ui', 'frontend', 'components'],
    whatItIs: 'a JavaScript library for building user interfaces with reusable components',
    analogy:
      'React is like a box of LEGO bricks for building websites. Each brick (component) is independent and reusable. You snap them together to build complex UIs, and when something changes, only the affected bricks update.',
    keyTraits: ['Component-based', 'Declarative', 'Virtual DOM', 'Ecosystem'],
    commonComparisons: ['Vue', 'Angular', 'Svelte'],
  },
  {
    name: 'Next.js',
    aliases: ['nextjs', 'next'],
    tags: ['framework', 'react', 'fullstack', 'ssr'],
    whatItIs:
      'a React framework for building production-ready web applications with server-side rendering',
    analogy:
      'Next.js is like a restaurant kitchen for React apps. It handles all the behind-the-scenes work (routing, server rendering, optimization) so you can focus on cooking up great user interfaces.',
    keyTraits: ['Server-side rendering', 'File-based routing', 'API routes', 'Optimized'],
    commonComparisons: ['Remix', 'Gatsby', 'Nuxt.js'],
  },
  {
    name: 'CSS',
    aliases: ['cascading style sheets'],
    tags: ['styling', 'design', 'frontend'],
    whatItIs: 'a stylesheet language that controls how HTML elements look on screen',
    analogy:
      'CSS is like the paint and decoration for a house. HTML builds the walls and rooms, but CSS decides what color they are, how big the windows are, and how everything is arranged visually.',
    keyTraits: ['Styling', 'Layout', 'Responsive', 'Animations'],
    commonComparisons: ['SASS', 'LESS', 'Tailwind CSS'],
  },
  {
    name: 'HTML',
    aliases: ['hypertext markup language'],
    tags: ['markup', 'structure', 'frontend'],
    whatItIs: 'the standard markup language for creating the structure of web pages',
    analogy:
      "HTML is like the skeleton of a web page. It defines where the head, arms, and legs go (headers, content, footers), but doesn't decide what they look like — that's CSS's job.",
    keyTraits: ['Structure', 'Semantic', 'Accessible', 'Universal'],
    commonComparisons: ['XML', 'Markdown', 'JSX'],
  },
  {
    name: 'API',
    aliases: ['api', 'application programming interface'],
    tags: ['backend', 'communication', 'data'],
    whatItIs:
      'a set of rules that allows different software applications to communicate with each other',
    analogy:
      "An API is like a waiter in a restaurant. You (the user) don't go into the kitchen (the server) — you tell the waiter (API) what you want, and they bring it back to you.",
    keyTraits: ['Communication', 'Structured', 'Reusable', 'Standardized'],
    commonComparisons: ['REST', 'GraphQL', 'WebSocket'],
  },
  {
    name: 'REST',
    aliases: ['rest api', 'restful'],
    tags: ['api', 'architecture', 'http'],
    whatItIs: 'an architectural style for designing networked applications using HTTP methods',
    analogy:
      "REST is like a library's filing system. You use standard actions — GET a book (read), PUT it back (update), DELETE it (remove) — and everything has a predictable address (URL).",
    keyTraits: ['Stateless', 'HTTP-based', 'Scalable', 'Simple'],
    commonComparisons: ['GraphQL', 'gRPC', 'SOAP'],
  },
  {
    name: 'GraphQL',
    aliases: ['gql'],
    tags: ['api', 'query', 'data'],
    whatItIs: 'a query language for APIs that lets clients request exactly the data they need',
    analogy:
      'GraphQL is like ordering at a buffet where you pick exactly what you want on your plate. Instead of getting a fixed meal (REST), you say "give me 2 scoops of rice and 1 of chicken" — nothing more, nothing less.',
    keyTraits: ['Flexible queries', 'Single endpoint', 'Type system', 'Efficient'],
    commonComparisons: ['REST', 'gRPC', 'tRPC'],
  },
  {
    name: 'WebSocket',
    aliases: ['websockets', 'ws'],
    tags: ['protocol', 'realtime', 'communication'],
    whatItIs:
      'a protocol that provides full-duplex communication channels over a single TCP connection',
    analogy:
      'WebSocket is like a phone call vs. texting (HTTP). Once connected, both parties can send messages anytime without hanging up and redialing each time.',
    keyTraits: ['Real-time', 'Bidirectional', 'Persistent', 'Low latency'],
    commonComparisons: ['HTTP', 'Server-Sent Events', 'Socket.IO'],
  },
  {
    name: 'npm',
    aliases: ['node package manager'],
    tags: ['package-manager', 'javascript', 'dependencies'],
    whatItIs:
      'the default package manager for JavaScript, used to install and manage project dependencies',
    analogy:
      'npm is like an app store for JavaScript code. Instead of writing everything from scratch, you can download pre-built packages (apps) that other developers have created and shared.',
    keyTraits: ['Package registry', 'Dependency management', 'Scripts', 'Community'],
    commonComparisons: ['yarn', 'pnpm', 'bun'],
  },
  {
    name: 'webpack',
    aliases: ['webpack bundler'],
    tags: ['bundler', 'build', 'optimization'],
    whatItIs: 'a module bundler that compiles and optimizes JavaScript files for production',
    analogy:
      "webpack is like a moving company that packs all your scattered belongings (files) into optimized boxes (bundles), removing stuff you don't need and making everything ready for delivery.",
    keyTraits: ['Bundling', 'Loaders', 'Plugins', 'Code splitting'],
    commonComparisons: ['Vite', 'esbuild', 'Rollup', 'Bun'],
  },
  {
    name: 'Vite',
    aliases: ['vitejs'],
    tags: ['bundler', 'dev-server', 'build'],
    whatItIs:
      'a fast build tool that provides instant hot module replacement for modern web development',
    analogy:
      'Vite is like a sports car engine — it starts instantly and accelerates quickly. Unlike webpack which rebuilds everything, Vite only processes what changes, making development feel snappy.',
    keyTraits: ['Fast HMR', 'ES modules', 'Optimized builds', 'Plugin system'],
    commonComparisons: ['webpack', 'esbuild', 'Parcel'],
  },
  {
    name: 'Tailwind CSS',
    aliases: ['tailwind', 'tailwindcss'],
    tags: ['css', 'framework', 'utility'],
    whatItIs: 'a utility-first CSS framework that lets you build designs directly in your markup',
    analogy:
      'Tailwind is like having a box of pre-mixed paint colors with names. Instead of writing custom CSS recipes, you just apply classes like "bg-blue-500" or "p-4" directly to elements.',
    keyTraits: ['Utility-first', 'Responsive', 'Customizable', 'No runtime'],
    commonComparisons: ['Bootstrap', 'Bulma', 'Material UI'],
  },
  {
    name: 'Expo',
    aliases: ['expo react native', 'expo sdk'],
    tags: ['react-native', 'mobile', 'framework'],
    whatItIs:
      'a platform and toolchain for building React Native applications with a streamlined developer experience',
    analogy:
      'Expo is like a pre-built kitchen for mobile app development. Instead of setting up all the appliances (native build tools) yourself, Expo gives you everything ready to start cooking (coding) right away.',
    keyTraits: ['Managed workflow', 'Over-the-air updates', 'Native modules', 'EAS'],
    commonComparisons: ['React Native CLI', 'Flutter', 'Capacitor'],
  },
  {
    name: 'React Native',
    aliases: ['rn'],
    tags: ['mobile', 'cross-platform', 'ui'],
    whatItIs: 'a framework for building native mobile applications using React and JavaScript',
    analogy:
      'React Native is like a universal translator for mobile apps. Write once in JavaScript, and it speaks both iOS (Swift) and Android (Kotlin) fluently, creating real native experiences.',
    keyTraits: ['Cross-platform', 'Native performance', 'Hot reload', 'Community'],
    commonComparisons: ['Flutter', 'Ionic', 'Xamarin'],
  },
  {
    name: 'TypeORM',
    aliases: ['typeorm'],
    tags: ['orm', 'database', 'backend'],
    whatItIs:
      'an Object-Relational Mapper that makes database interactions feel like JavaScript objects',
    analogy:
      'TypeORM is like a personal assistant for your database. Instead of writing complex SQL queries yourself, you tell the assistant what you want in plain JavaScript, and they handle the database communication.',
    keyTraits: ['TypeScript', 'Decorators', 'Migrations', 'Multiple databases'],
    commonComparisons: ['Prisma', 'Sequelize', 'Knex.js'],
  },
  {
    name: 'Prisma',
    aliases: ['prisma orm'],
    tags: ['orm', 'database', 'backend', 'typescript'],
    whatItIs: 'a next-generation ORM with auto-generated queries and type safety',
    analogy:
      'Prisma is like a smart database librarian. You describe what data you need in simple terms, and Prisma writes the perfect query, checks for errors, and hands you exactly what you asked for.',
    keyTraits: ['Type-safe', 'Auto-generated', 'Migrations', 'GUI studio'],
    commonComparisons: ['TypeORM', 'Drizzle', 'Mongoose'],
  },
  {
    name: 'tRPC',
    aliases: ['trpc'],
    tags: ['api', 'typescript', 'fullstack'],
    whatItIs: 'a framework for building end-to-end typesafe APIs without code generation',
    analogy:
      'tRPC is like a direct phone line between your frontend and backend. Instead of writing documentation (API contracts), both sides just talk to each other with full type safety built in.',
    keyTraits: ['End-to-end typesafe', 'No code generation', 'Fast', 'Simple'],
    commonComparisons: ['REST', 'GraphQL', 'WebSocket'],
  },
  {
    name: 'Zod',
    aliases: ['zod validation'],
    tags: ['validation', 'typescript', 'schema'],
    whatItIs: 'a TypeScript-first schema declaration and validation library',
    analogy:
      'Zod is like a bouncer at a club door. It checks every piece of data that tries to enter your app, making sure it matches the rules (schema) before letting it through.',
    keyTraits: ['Type inference', 'Runtime validation', 'TypeScript native', 'Composable'],
    commonComparisons: ['Yup', 'Joi', 'Ajv'],
  },
  {
    name: 'TanStack Query',
    aliases: ['react-query', 'tanstackquery'],
    tags: ['data-fetching', 'caching', 'react'],
    whatItIs: 'a powerful data fetching and caching library for React applications',
    analogy:
      "TanStack Query is like a smart librarian who remembers what books you've checked out. Instead of going back to the shelf every time, it keeps frequently used data handy and refreshes it when needed.",
    keyTraits: ['Caching', 'Background refetching', 'Pagination', 'Optimistic updates'],
    commonComparisons: ['SWR', 'RTK Query', 'Apollo Client'],
  },
  {
    name: 'Zustand',
    aliases: ['zustand state'],
    tags: ['state-management', 'react', 'store'],
    whatItIs: 'a small, fast, and scalable state management solution for React',
    analogy:
      'Zustand is like a whiteboard in the middle of a room. Anyone can read or write on it, and when it changes, everyone sees the update immediately. Simple, visible, and no ceremony.',
    keyTraits: ['Minimal', 'No boilerplate', 'Hooks-based', 'Performant'],
    commonComparisons: ['Redux', 'Jotai', 'Recoil', 'Valtio'],
  },
  {
    name: 'Storybook',
    aliases: ['storybook.js'],
    tags: ['documentation', 'ui', 'testing'],
    whatItIs: 'a tool for building and testing UI components in isolation',
    analogy:
      'Storybook is like a showroom for your components. You can see each piece of your UI in different states and configurations without needing the whole app running.',
    keyTraits: ['Isolation', 'Visual testing', 'Documentation', 'Add-ons'],
    commonComparisons: ['Chromatic', 'Playroom', 'Histoire'],
  },
  {
    name: 'Cypress',
    aliases: ['cypress.io', 'cypress testing'],
    tags: ['testing', 'e2e', 'automation'],
    whatItIs: 'an end-to-end testing framework for web applications',
    analogy:
      'Cypress is like a robot user that clicks through your website exactly how a real person would. It watches everything happen in real-time and catches problems before your users do.',
    keyTraits: ['E2E testing', 'Time travel', 'Auto-waiting', 'Real browser'],
    commonComparisons: ['Playwright', 'Selenium', 'Puppeteer'],
  },
  {
    name: 'Playwright',
    aliases: ['playwright testing', 'ms-playwright'],
    tags: ['testing', 'e2e', 'browser'],
    whatItIs: 'a browser automation library for testing web apps across all modern browsers',
    analogy:
      "Playwright is like having a team of testers who can use Chrome, Firefox, and Safari simultaneously. They run through your test scenarios and report back what works and what doesn't.",
    keyTraits: ['Multi-browser', 'Auto-wait', 'Network interception', 'Parallel'],
    commonComparisons: ['Cypress', 'Puppeteer', 'Selenium'],
  },
  {
    name: 'Jest',
    aliases: ['jest testing', 'jestjs'],
    tags: ['testing', 'unit', 'javascript'],
    whatItIs: 'a JavaScript testing framework with a focus on simplicity',
    analogy:
      'Jest is like a spell-checker for your code. It runs your functions, checks if the output is correct, and tells you exactly where things went wrong in plain English.',
    keyTraits: ['Zero config', 'Snapshot testing', 'Mocks', 'Coverage'],
    commonComparisons: ['Vitest', 'Mocha', 'Jasmine'],
  },
  {
    name: 'Vitest',
    aliases: ['vitest testing'],
    tags: ['testing', 'unit', 'vite'],
    whatItIs: 'a blazing fast unit test framework powered by Vite',
    analogy:
      "Vitest is like Jest's sports car sibling. Same familiar API, but it starts instantly and runs tests at lightning speed because it shares Vite's super-fast engine.",
    keyTraits: ['Vite-powered', 'Jest-compatible', 'Watch mode', 'UI mode'],
    commonComparisons: ['Jest', 'Mocha', 'uvu'],
  },
  {
    name: 'Docker',
    aliases: ['docker container'],
    tags: ['containers', 'devops', 'deployment'],
    whatItIs: 'a platform for building, shipping, and running applications in isolated containers',
    analogy:
      'Docker is like shipping containers for software. Your app and everything it needs get packed into a standard box that runs the same way anywhere — on your laptop, a server, or the cloud.',
    keyTraits: ['Containers', 'Isolated', 'Portable', 'Reproducible'],
    commonComparisons: ['Podman', 'LXC', 'Virtual machines'],
  },
  {
    name: 'Redis',
    aliases: ['redis cache'],
    tags: ['database', 'cache', 'in-memory'],
    whatItIs: 'an in-memory data structure store used as a database, cache, and message broker',
    analogy:
      'Redis is like a sticky note on your desk. Instead of filing through cabinets (database) every time, you keep frequently needed info right where you can grab it instantly.',
    keyTraits: ['In-memory', 'Fast', 'Data structures', 'Pub/Sub'],
    commonComparisons: ['Memcached', 'KeyDB', 'DragonflyDB'],
  },
  {
    name: 'PostgreSQL',
    aliases: ['postgres', 'psql'],
    tags: ['database', 'sql', 'relational'],
    whatItIs: 'a powerful open-source relational database with advanced features',
    analogy:
      'PostgreSQL is like a super-organized library with an amazing catalog system. It stores your data in structured tables and can answer complex questions about relationships between data.',
    keyTraits: ['ACID', 'JSON support', 'Extensions', 'Standards-compliant'],
    commonComparisons: ['MySQL', 'SQLite', 'MariaDB'],
  },
  {
    name: 'SQLite',
    aliases: ['sqlite database'],
    tags: ['database', 'sql', 'embedded', 'local'],
    whatItIs: 'a lightweight, serverless database that runs embedded in applications',
    analogy:
      'SQLite is like a notebook you carry everywhere. No need for a separate database server — the data lives right inside your app, ready to use anytime, anywhere.',
    keyTraits: ['Serverless', 'Embedded', 'Single file', 'Reliable'],
    commonComparisons: ['PostgreSQL', 'MySQL', 'Realm'],
  },
  {
    name: 'Supabase',
    aliases: ['supabase.io'],
    tags: ['backend', 'database', 'firebase-alternative'],
    whatItIs:
      'an open-source Firebase alternative with a PostgreSQL database, auth, and real-time subscriptions',
    analogy:
      'Supabase is like a pre-built backend toolkit. Instead of assembling your own server, database, and auth system from scratch, Supabase gives you all the pieces already connected and ready to go.',
    keyTraits: ['PostgreSQL', 'Auth', 'Real-time', 'Edge functions'],
    commonComparisons: ['Firebase', 'Appwrite', 'PocketBase'],
  },
  {
    name: 'Firebase',
    aliases: ['firebase google'],
    tags: ['backend', 'baaS', 'realtime'],
    whatItIs:
      "Google's platform for building web and mobile applications with managed backend services",
    analogy:
      "Firebase is like renting a fully furnished apartment. You don't need to buy furniture (database), install locks (auth), or set up WiFi (hosting) — it's all there, ready to use.",
    keyTraits: ['Real-time', 'Auth', 'Hosting', 'Analytics'],
    commonComparisons: ['Supabase', 'AWS Amplify', 'Appwrite'],
  },
  {
    name: 'Cloudflare',
    aliases: ['cf', 'cloudflare workers'],
    tags: ['cdn', 'edge', 'networking'],
    whatItIs:
      'a web infrastructure and security company providing CDN, DDoS protection, and edge computing',
    analogy:
      'Cloudflare is like a global network of security guards and delivery stations. It protects your website from attacks and delivers content from the station closest to each visitor.',
    keyTraits: ['CDN', 'Edge computing', 'Security', 'Workers'],
    commonComparisons: ['AWS CloudFront', 'Fastly', 'Akamai'],
  },
  {
    name: 'Nginx',
    aliases: ['nginx'],
    tags: ['web-server', 'reverse-proxy', 'load-balancer'],
    whatItIs: 'a high-performance web server that also acts as a reverse proxy and load balancer',
    analogy:
      'Nginx is like a traffic controller for web requests. It decides which requests go to which servers, balances the load, and serves static files directly for speed.',
    keyTraits: ['High performance', 'Reverse proxy', 'Load balancing', 'Static files'],
    commonComparisons: ['Apache', 'Caddy', 'Traefik'],
  },
];
