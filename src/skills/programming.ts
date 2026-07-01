import type { TermDefinition } from './types';

export const programmingTerms: TermDefinition[] = [
  {
    name: 'Recursion',
    aliases: ['recursive', 'recursive function'],
    tags: ['concept', 'functions', 'algorithms'],
    whatItIs:
      'a programming technique where a function calls itself to solve a problem by breaking it into smaller pieces',
    analogy:
      'Recursion is like Russian nesting dolls. You open one doll to find a smaller one inside, which contains an even smaller one, until you reach the tiniest doll (the base case). Each level is the same shape, just smaller.',
    keyTraits: ['Self-referencing', 'Base case required', 'Elegant', 'Stack usage'],
    commonComparisons: ['Iteration', 'Loops', 'Dynamic programming'],
  },
  {
    name: 'Variable',
    aliases: ['vars', 'let', 'const', 'var'],
    tags: ['fundamentals', 'data', 'storage'],
    whatItIs: 'a named container that stores a value in memory',
    analogy:
      "A variable is like a labeled box. You put something inside (a value), write a name on it (the variable name), and can later look inside to see what's there or change what's stored.",
    keyTraits: ['Named', 'Mutable or immutable', 'Typed', 'Scoped'],
    commonComparisons: ['Constant', 'Reference', 'Pointer'],
  },
  {
    name: 'Function',
    aliases: ['method', 'fn', 'func'],
    tags: ['fundamentals', 'code', 'reuse'],
    whatItIs: 'a reusable block of code that performs a specific task when called',
    analogy:
      'A function is like a recipe. You provide ingredients (inputs), follow the steps (code), and get a dish (output). You can use the same recipe over and over with different ingredients.',
    keyTraits: ['Reusable', 'Inputs/outputs', 'Encapsulated', 'Composable'],
    commonComparisons: ['Method', 'Procedure', 'Arrow function'],
  },
  {
    name: 'Object',
    aliases: ['obj', 'object literal'],
    tags: ['fundamentals', 'data', 'structure'],
    whatItIs: 'a collection of key-value pairs that represents an entity',
    analogy:
      'An object is like a profile card. It has fields like Name, Age, and Email — each with a specific value. You can look up any field by its name, or add new fields.',
    keyTraits: ['Key-value pairs', 'Mutable', 'Methods', 'Nested'],
    commonComparisons: ['Array', 'Map', 'Class instance'],
  },
  {
    name: 'Array',
    aliases: ['list', 'array literal'],
    tags: ['fundamentals', 'data', 'collection'],
    whatItIs: 'an ordered collection of items stored by their position (index)',
    analogy:
      'An array is like a row of numbered mailboxes. Each box has a number (index) and can hold something inside. Box #0 is first, #1 is second, and so on.',
    keyTraits: ['Ordered', 'Indexed', 'Mutable', 'Homogeneous'],
    commonComparisons: ['Object', 'Map', 'Set'],
  },
  {
    name: 'Promise',
    aliases: ['promise object', 'async promise'],
    tags: ['async', 'javascript', 'concurrency'],
    whatItIs:
      'an object representing the eventual completion or failure of an asynchronous operation',
    analogy:
      "A Promise is like a restaurant buzzer. You order food (start async work), get a buzzer (Promise), and vibrate when your order is ready (resolved) or if there's a problem (rejected).",
    keyTraits: ['Async', 'Three states', 'Chainable', 'Error handling'],
    commonComparisons: ['Callback', 'async/await', 'Observable'],
  },
  {
    name: 'async/await',
    aliases: ['async await', 'asynchronous'],
    tags: ['async', 'syntax', 'javascript'],
    whatItIs: 'syntactic sugar over Promises that makes asynchronous code look synchronous',
    analogy:
      'async/await is like ordering at a counter. You say "I\'ll have the pasta" (await), wait patiently without doing other things, and pick it up when ready — no buzzer needed.',
    keyTraits: ['Readable', 'Synchronous-looking', 'Error handling', 'Sequential'],
    commonComparisons: ['Promises', 'Callbacks', 'Generators'],
  },
  {
    name: 'Closure',
    aliases: ['closures', 'lexical closure'],
    tags: ['concept', 'functions', 'scope'],
    whatItIs:
      'a function that remembers the variables from its outer scope even after that scope has finished executing',
    analogy:
      'A closure is like a backpack. When a function finishes running, it packs up the variables it needs from its environment and carries them along, remembering them forever.',
    keyTraits: ['Encapsulation', 'State persistence', 'Private variables', 'Functional'],
    commonComparisons: ['Scope', 'Module pattern', 'IIFE'],
  },
  {
    name: 'OOP',
    aliases: ['object-oriented programming', 'oop'],
    tags: ['paradigm', 'design', 'architecture'],
    whatItIs: 'a programming paradigm based on the concept of objects that contain data and code',
    analogy:
      'OOP is like organizing a company into departments. Each department (object) has its own data (properties) and knows how to do its job (methods). Departments interact but keep their internal workings private.',
    keyTraits: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'],
    commonComparisons: ['Functional programming', 'Procedural', 'Structural'],
  },
  {
    name: 'Inheritance',
    aliases: ['class inheritance', 'prototype inheritance'],
    tags: ['oop', 'concept', 'reuse'],
    whatItIs:
      'a mechanism where a new class derives properties and behavior from an existing class',
    analogy:
      "Inheritance is like inheriting traits from your parents. A child class gets the parent's features (methods, properties) and can add its own unique characteristics or modify inherited ones.",
    keyTraits: ['Code reuse', 'Hierarchy', 'Override', 'Extends'],
    commonComparisons: ['Composition', 'Mixin', 'Interface'],
  },
  {
    name: 'Polymorphism',
    aliases: ['poly'],
    tags: ['oop', 'concept', 'flexibility'],
    whatItIs: 'the ability of different objects to respond to the same interface in their own way',
    analogy:
      'Polymorphism is like a universal remote. The same "Play" button works differently on a TV, music player, or game console — same interface, different behavior depending on what you point it at.',
    keyTraits: ['Same interface', 'Different implementations', 'Flexible', 'Extensible'],
    commonComparisons: ['Inheritance', 'Interfaces', 'Duck typing'],
  },
  {
    name: 'Algorithm',
    aliases: ['algos', 'algorithms'],
    tags: ['fundamentals', 'problem-solving', 'efficiency'],
    whatItIs: 'a step-by-step procedure for solving a problem or accomplishing a task',
    analogy:
      "An algorithm is like IKEA instructions. It's a numbered list of steps that, if followed precisely, builds something useful. Good algorithms use fewer steps (are efficient).",
    keyTraits: ['Step-by-step', 'Finite', 'Deterministic', 'Efficient'],
    commonComparisons: ['Heuristic', 'Procedure', 'Recipe'],
  },
  {
    name: 'Debugging',
    aliases: ['debug', 'bug fixing'],
    tags: ['process', 'problem-solving', 'tools'],
    whatItIs: 'the process of finding and fixing errors (bugs) in code',
    analogy:
      'Debugging is like being a detective. The crime (bug) already happened, and you need to examine clues (logs, breakpoints), trace the timeline (call stack), and find the culprit (the error).',
    keyTraits: ['Systematic', 'Process of elimination', 'Tools required', 'Patience'],
    commonComparisons: ['Testing', 'Profiling', 'Logging'],
  },
  {
    name: 'Refactoring',
    aliases: ['refactor', 'code refactoring'],
    tags: ['process', 'quality', 'maintenance'],
    whatItIs: 'restructuring existing code without changing its external behavior',
    analogy:
      'Refactoring is like reorganizing your closet. The clothes (code) stay the same, but you arrange them better so you can find things faster and add new items more easily.',
    keyTraits: ['No behavior change', 'Improves readability', 'Reduces complexity', 'Safe'],
    commonComparisons: ['Rewriting', 'Optimizing', 'Debugging'],
  },
  {
    name: 'Design Pattern',
    aliases: ['patterns', 'gof patterns'],
    tags: ['architecture', 'solutions', 'reusable'],
    whatItIs: 'a general, reusable solution to a commonly occurring problem in software design',
    analogy:
      'Design patterns are like battle-tested recipes. Instead of figuring out from scratch how to solve common problems, you use proven approaches that experienced developers have refined over time.',
    keyTraits: ['Reusable', 'Proven', 'Language-agnostic', 'Communicative'],
    commonComparisons: ['Architecture', 'Best practices', 'Conventions'],
  },
  {
    name: 'API',
    aliases: ['api', 'application programming interface'],
    tags: ['communication', 'integration', 'interface'],
    whatItIs:
      'a set of rules and protocols that allows different software applications to communicate with each other',
    analogy:
      "An API is like a waiter in a restaurant. You (the app) don't go into the kitchen (the server). You tell the waiter (API) what you want, and they bring back exactly what you ordered.",
    keyTraits: ['Abstraction', 'Contract', 'Versioned', 'Documented'],
    commonComparisons: ['SDK', 'Library', 'Framework'],
  },
  {
    name: 'SDK',
    aliases: ['software development kit', 'dev kit'],
    tags: ['tools', 'development', 'library'],
    whatItIs: 'a collection of software development tools in one installable package',
    analogy:
      "An SDK is like a craftsman's toolkit. Instead of buying each tool separately (APIs, docs, samples), you get everything you need to build for a specific platform in one box.",
    keyTraits: ['Bundled tools', 'Platform-specific', 'Includes docs', 'Samples'],
    commonComparisons: ['API', 'Library', 'CLI'],
  },
  {
    name: 'Library',
    aliases: ['lib', 'package'],
    tags: ['code', 'reuse', 'dependency'],
    whatItIs: 'a collection of pre-written code that you can use to perform common tasks',
    analogy:
      'A library is like borrowing a book instead of writing one. Someone already did the work — you just check it out (import) and use the knowledge (functions) inside.',
    keyTraits: ['Reusable', 'Imported', 'Focused', 'Community'],
    commonComparisons: ['Framework', 'SDK', 'Module'],
  },
  {
    name: 'Framework',
    aliases: ['fw', 'app framework'],
    tags: ['architecture', 'structure', 'opinionated'],
    whatItIs: 'a pre-built structure that defines how an application should be organized',
    analogy:
      'A framework is like a house blueprint. It tells you where the walls, doors, and windows go. You fill in the details (your code), but the structure is already decided for you.',
    keyTraits: ['Opinionated', 'Structure', 'Inversion of control', 'Batteries included'],
    commonComparisons: ['Library', 'Boilerplate', 'Toolkit'],
  },
  {
    name: 'Dependency',
    aliases: ['dep', 'dependencies', 'package'],
    tags: ['management', 'npm', 'project'],
    whatItIs: 'an external package or module that your project relies on to function',
    analogy:
      "Dependencies are like ingredients in a recipe. Your dish (app) can't be made without them. You need to keep them fresh (updated) and make sure they don't conflict with each other.",
    keyTraits: ['External', 'Versioned', 'Managed', 'Transitive'],
    commonComparisons: ['Dev dependency', 'Peer dependency', 'Optional dependency'],
  },
  {
    name: 'Recursion',
    aliases: ['recursive', 'recursive function'],
    tags: ['concept', 'algorithms', 'functions'],
    whatItIs:
      'a function that calls itself to break a problem into smaller sub-problems until a base case is reached',
    analogy:
      'Recursion is like looking into two mirrors facing each other. Each reflection contains a smaller reflection, but eventually you reach the smallest version (base case) and stop.',
    keyTraits: ['Self-calling', 'Base case', 'Stack frames', 'Elegant'],
    commonComparisons: ['Iteration', 'Tail recursion', 'Memoization'],
  },
  {
    name: 'Concurrency',
    aliases: ['concurrent', 'parallelism'],
    tags: ['async', 'performance', 'multitasking'],
    whatItIs: 'the ability of a program to handle multiple tasks at the same time',
    analogy:
      'Concurrency is like a chef cooking multiple dishes at once. They start the soup, then chop vegetables while it heats, then flip the pancake — interleaving tasks to finish faster.',
    keyTraits: ['Multitasking', 'Non-blocking', 'Efficient', 'Complex'],
    commonComparisons: ['Parallelism', 'Asynchronous', 'Multithreading'],
  },
  {
    name: 'Thread',
    aliases: ['threading', 'worker thread'],
    tags: ['concurrency', 'execution', 'parallel'],
    whatItIs:
      'the smallest sequence of instructions that can be managed independently by a scheduler',
    analogy:
      'A thread is like a worker on an assembly line. Multiple workers (threads) can work on different parts of a product simultaneously, but they share the same factory (process).',
    keyTraits: ['Lightweight', 'Shared memory', 'Scheduled', 'Parallel'],
    commonComparisons: ['Process', 'Coroutine', 'Task'],
  },
  {
    name: 'Heap',
    aliases: ['memory heap', 'heap memory'],
    tags: ['memory', 'data-structure', 'allocation'],
    whatItIs: 'a region of memory used for dynamic allocation of objects and data structures',
    analogy:
      "The heap is like a parking lot. Cars (objects) of any size can park anywhere there's space. You just need to remember where you parked (reference) to find it again.",
    keyTraits: ['Dynamic', 'Unstructured', 'Allocated', 'Garbage collected'],
    commonComparisons: ['Stack', 'Memory pool', 'Arena'],
  },
  {
    name: 'Stack',
    aliases: ['call stack', 'execution stack'],
    tags: ['memory', 'execution', 'data-structure'],
    whatItIs:
      'a data structure that stores information about active subroutines and local variables',
    analogy:
      'The stack is like a stack of plates. You can only add or remove from the top (LIFO). When a function is called, a plate goes on; when it returns, the plate comes off.',
    keyTraits: ['LIFO', 'Fast', 'Limited size', 'Automatic'],
    commonComparisons: ['Heap', 'Queue', 'Memory'],
  },
  {
    name: 'Pointer',
    aliases: ['memory pointer', 'reference'],
    tags: ['memory', 'low-level', 'address'],
    whatItIs: 'a variable that stores the memory address of another value',
    analogy:
      "A pointer is like a treasure map. It doesn't hold the treasure (value) itself — it tells you exactly where to find it in the vast land of memory.",
    keyTraits: ['Address', 'Dereferencing', 'Null possible', 'Dangerous'],
    commonComparisons: ['Reference', 'Handle', 'Index'],
  },
  {
    name: 'Compiler',
    aliases: ['compilation', 'compile'],
    tags: ['translation', 'build', 'optimization'],
    whatItIs: 'a program that translates source code into machine code before execution',
    analogy:
      'A compiler is like a professional translator. It takes your entire document (source code), translates it all at once into another language (machine code), and gives you the finished translation to run.',
    keyTraits: ['Ahead-of-time', 'Optimization', 'Binary output', 'Error detection'],
    commonComparisons: ['Interpreter', 'JIT compiler', 'Transpiler'],
  },
  {
    name: 'Interpreter',
    aliases: ['interpretation', 'interpret'],
    tags: ['translation', 'execution', 'runtime'],
    whatItIs: 'a program that executes source code line by line without prior compilation',
    analogy:
      'An interpreter is like a real-time translator at a meeting. They listen to each sentence (line of code) and immediately translate and execute it, one piece at a time.',
    keyTraits: ['Line-by-line', 'No binary', 'Slower', 'Flexible'],
    commonComparisons: ['Compiler', 'JIT compiler', 'REPL'],
  },
  {
    name: 'JIT',
    aliases: ['just-in-time', 'jit compilation'],
    tags: ['compilation', 'optimization', 'runtime'],
    whatItIs: 'a compilation method where code is compiled during execution rather than before',
    analogy:
      "JIT is like a chef who starts cooking while you're ordering. Instead of pre-making everything (AOT), they prepare dishes on-demand but cache popular ones for speed.",
    keyTraits: ['Runtime compilation', 'Optimized', 'Cached', 'Hybrid'],
    commonComparisons: ['AOT', 'Interpreter', 'Compiler'],
  },
  {
    name: 'Garbage Collection',
    aliases: ['gc', 'garbage collector'],
    tags: ['memory', 'automatic', 'cleanup'],
    whatItIs: 'automatic memory management that reclaims memory no longer in use',
    analogy:
      'Garbage collection is like a janitor who periodically cleans up unused items. When objects are no longer needed, the GC finds and removes them, freeing up space for new things.',
    keyTraits: ['Automatic', 'Non-deterministic', 'Stop-the-world', 'Generational'],
    commonComparisons: ['Manual memory management', 'Reference counting', 'RAII'],
  },
  {
    name: 'Event Loop',
    aliases: ['event-loop', 'message loop'],
    tags: ['async', 'javascript', 'runtime'],
    whatItIs:
      'a mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded',
    analogy:
      'The event loop is like a DJ managing a party. It plays one song (task) at a time but keeps checking the request queue. When a song finishes, it picks the next request — never blocking the dance floor.',
    keyTraits: ['Single-threaded', 'Non-blocking', 'Callbacks', 'Microtasks'],
    commonComparisons: ['Web Workers', 'Child processes', 'Threads'],
  },
  {
    name: 'Callback',
    aliases: ['callbacks', 'callback function'],
    tags: ['async', 'pattern', 'function'],
    whatItIs: 'a function passed as an argument to be executed after an operation completes',
    analogy:
      "A callback is like leaving your number at a mechanic's shop. You don't wait there (blocking) — they call you (callback) when the car is ready.",
    keyTraits: ['Passed as argument', 'Executed later', 'Error-prone', 'Legacy'],
    commonComparisons: ['Promises', 'async/await', 'Observables'],
  },
  {
    name: 'Higher-Order Function',
    aliases: ['hof', 'higher-order'],
    tags: ['functional', 'functions', 'concept'],
    whatItIs: 'a function that either takes a function as an argument or returns a function',
    analogy:
      'A higher-order function is like a factory manager. They either hire workers (accept functions) or create new job positions (return functions) — managing functions as first-class citizens.',
    keyTraits: ['Functions as values', 'Abstraction', 'Composition', 'Declarative'],
    commonComparisons: ['Map', 'Filter', 'Reduce'],
  },
  {
    name: 'Pure Function',
    aliases: ['pure', 'functional purity'],
    tags: ['functional', 'concept', 'testing'],
    whatItIs:
      'a function that always returns the same output for the same input and has no side effects',
    analogy:
      "A pure function is like a calculator. Press 2 + 2, always get 4. It doesn't change anything in the room (no side effects) — just produces a result.",
    keyTraits: ['Deterministic', 'No side effects', 'Testable', 'Cacheable'],
    commonComparisons: ['Impure function', 'Side effects', 'Immutability'],
  },
  {
    name: 'Immutability',
    aliases: ['immutable', 'immutable data'],
    tags: ['functional', 'concept', 'data'],
    whatItIs: 'the state of an object that cannot be modified after creation',
    analogy:
      "Immutability is like publishing a book. Once printed, you can't change it. To make corrections, you publish a new edition (new object) instead of editing the original.",
    keyTraits: ['Cannot change', 'Thread-safe', 'Predictable', 'Copy-on-write'],
    commonComparisons: ['Mutability', 'Const', 'Freeze'],
  },
];
