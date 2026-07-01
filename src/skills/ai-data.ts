import type {TermDefinition} from './types'

export const aiDataTerms: TermDefinition[] = [
	{
		name: 'Machine Learning',
		aliases: ['ml', 'machine-learning'],
		tags: ['ai', 'algorithms', 'data'],
		whatItIs:
			'a subset of AI where systems learn patterns from data without being explicitly programmed',
		analogy:
			'Machine learning is like teaching a child to recognize animals. Instead of writing rules ("has fur = animal"), you show them thousands of pictures until they figure out the patterns themselves.',
		keyTraits: [
			'Data-driven',
			'Pattern recognition',
			'Improves with data',
			'Automated',
		],
		commonComparisons: ['Deep learning', 'Statistics', 'Rule-based systems'],
	},
	{
		name: 'Deep Learning',
		aliases: ['dl', 'deep-learning', 'neural network'],
		tags: ['ai', 'neural-networks', 'data'],
		whatItIs:
			'a subset of machine learning using multi-layered neural networks to learn complex patterns',
		analogy:
			'Deep learning is like a team of specialists. Each layer of the network is an expert — the first detects edges, the next detects shapes, and the final layer identifies the whole object.',
		keyTraits: [
			'Multi-layered',
			'Automatic feature extraction',
			'GPU-intensive',
			'State-of-the-art',
		],
		commonComparisons: [
			'Machine learning',
			'Classical AI',
			'Statistical models',
		],
	},
	{
		name: 'Neural Network',
		aliases: ['ann', 'artificial neural network'],
		tags: ['ai', 'deep-learning', 'architecture'],
		whatItIs:
			'a computing system inspired by biological neural networks in the brain',
		analogy:
			'A neural network is like a factory assembly line of tiny decision-makers. Each worker (neuron) does one simple job, but together they can recognize faces, translate languages, or drive cars.',
		keyTraits: ['Layers', 'Weights', 'Training', 'Parallel'],
		commonComparisons: ['Brain', 'CPU', 'Decision tree'],
	},
	{
		name: 'LLM',
		aliases: ['large language model', 'language model'],
		tags: ['ai', 'nlp', 'generative'],
		whatItIs:
			'a type of AI model trained on vast text data to understand and generate human language',
		analogy:
			"An LLM is like a super well-read person. They've read billions of pages and can discuss almost anything, but they're predicting the next word, not truly understanding — like autocomplete on steroids.",
		keyTraits: [
			'Text generation',
			'Context understanding',
			'Few-shot learning',
			'Massive scale',
		],
		commonComparisons: ['GPT', 'Claude', 'Llama', 'Qwen'],
	},
	{
		name: 'Token',
		aliases: ['tokens', 'tokenization'],
		tags: ['nlp', 'data', 'processing'],
		whatItIs:
			'the basic unit of text that a language model processes — can be a word, subword, or character',
		analogy:
			'Tokens are like Lego bricks for language. Instead of breaking text into whole words, the model breaks it into smaller pieces ("unbreakable" becomes "un" + "break" + "able").',
		keyTraits: ['Subword', 'Vocabulary', 'Context window', 'Pricing unit'],
		commonComparisons: ['Words', 'Characters', 'BPE'],
	},
	{
		name: 'Embedding',
		aliases: ['vector embedding', 'word embedding'],
		tags: ['ai', 'nlp', 'representation'],
		whatItIs:
			'a numerical representation of text that captures semantic meaning in vector space',
		analogy:
			'Embeddings are like GPS coordinates for words. Similar concepts end up close together in this "meaning space" — "king" and "queen" are neighbors, while "king" and "banana" are far apart.',
		keyTraits: [
			'Dense vectors',
			'Semantic similarity',
			'Searchable',
			'Compressed',
		],
		commonComparisons: ['One-hot encoding', 'TF-IDF', 'Word2Vec'],
	},
	{
		name: 'Vector Database',
		aliases: ['vectordb', 'vector-store'],
		tags: ['ai', 'database', 'search'],
		whatItIs:
			'a database optimized for storing and searching high-dimensional vectors',
		analogy:
			'A vector database is like a similarity search engine. Instead of searching by exact keywords, you search by meaning — "find things like this image/text" even if the words are different.',
		keyTraits: ['ANN search', 'Similarity', 'Indexing', 'Real-time'],
		commonComparisons: ['Pinecone', 'Weaviate', 'Chroma', 'Milvus'],
	},
	{
		name: 'RAG',
		aliases: ['retrieval augmented generation', 'rag'],
		tags: ['ai', 'architecture', 'llm'],
		whatItIs:
			'a technique that enhances LLM responses by retrieving relevant documents before generating',
		analogy:
			'RAG is like giving an LLM an open-book exam. Instead of relying only on memory, it looks up relevant information first, then writes an answer based on what it found.',
		keyTraits: [
			'Retrieval',
			'Context injection',
			'Grounded',
			'Reduced hallucination',
		],
		commonComparisons: ['Fine-tuning', 'Prompt engineering', 'Memorization'],
	},
	{
		name: 'Fine-tuning',
		aliases: ['finetuning', 'fine-tuning', 'transfer learning'],
		tags: ['ai', 'training', 'optimization'],
		whatItIs:
			'the process of further training a pre-trained model on specific data for a specialized task',
		analogy:
			"Fine-tuning is like taking a general doctor and training them to be a specialist. They already know medicine (pre-trained), now they're learning the specifics of cardiology (your task).",
		keyTraits: [
			'Domain-specific',
			'Less data needed',
			'Specialized',
			'Efficient',
		],
		commonComparisons: ['Pre-training', 'Prompt engineering', 'RAG'],
	},
	{
		name: 'Prompt Engineering',
		aliases: ['prompting', 'prompt design'],
		tags: ['ai', 'llm', 'technique'],
		whatItIs:
			'the practice of crafting inputs to guide LLMs toward desired outputs',
		analogy:
			'Prompt engineering is like being a good photographer. The same scene (question) can look different depending on how you frame it (prompt). A clear, well-composed shot gets better results.',
		keyTraits: ['Context', 'Examples', 'Constraints', 'Iteration'],
		commonComparisons: ['Fine-tuning', 'RAG', 'Chain-of-thought'],
	},
	{
		name: 'Hallucination',
		aliases: ['ai hallucination', 'llm hallucination'],
		tags: ['ai', 'problem', 'reliability'],
		whatItIs:
			'when an LLM generates confident-sounding but factually incorrect information',
		analogy:
			"Hallucination is like a friend who always has an answer, even when they don't know. They'll confidently tell you something completely made up rather than admitting they're not sure.",
		keyTraits: ['Confident', 'Incorrect', 'Plausible', 'Common'],
		commonComparisons: ['Factual error', 'Confabulation', 'Bullshitting'],
	},
	{
		name: 'Temperature',
		aliases: ['llm temperature', 'sampling temperature'],
		tags: ['ai', 'llm', 'parameter'],
		whatItIs:
			'a parameter that controls the randomness/creativity of LLM outputs',
		analogy:
			'Temperature is like a creativity dial. Low temperature (0.1) makes the model play it safe and predictable. High temperature (1.0) makes it more adventurous and surprising.',
		keyTraits: [
			'Controls randomness',
			'0-2 range',
			'Low=deterministic',
			'High=creative',
		],
		commonComparisons: ['Top-p', 'Top-k', 'Max tokens'],
	},
	{
		name: 'Context Window',
		aliases: ['context-length', 'context-size', 'context window'],
		tags: ['ai', 'llm', 'limitation'],
		whatItIs:
			'the maximum amount of text an LLM can process in a single interaction',
		analogy:
			'The context window is like a desk size. You can only spread out so many papers (tokens) at once. If the document is too long, you need to summarize or split it.',
		keyTraits: [
			'Token limit',
			'Fixed per model',
			'Affects memory',
			'Cost-related',
		],
		commonComparisons: ['Token count', 'Memory', 'Window size'],
	},
	{
		name: 'Inference',
		aliases: ['ai inference', 'model inference'],
		tags: ['ai', 'deployment', 'runtime'],
		whatItIs:
			'the process of using a trained model to make predictions on new data',
		analogy:
			'Inference is like the exam after studying. Training is learning the material, but inference is when you actually apply that knowledge to answer new questions.',
		keyTraits: ['Prediction', 'Real-time', 'GPU-intensive', 'Optimization'],
		commonComparisons: ['Training', 'Fine-tuning', 'Evaluation'],
	},
	{
		name: 'Model Quantization',
		aliases: ['quantization', 'q4', 'q8'],
		tags: ['ai', 'optimization', 'deployment'],
		whatItIs:
			'reducing model precision (e.g., from 32-bit to 4-bit) to make it smaller and faster',
		analogy:
			'Quantization is like compressing a photo. You reduce quality slightly (precision) to make the file much smaller and faster to load — still looks good, just not pixel-perfect.',
		keyTraits: ['Size reduction', 'Speed boost', 'Trade-off', 'On-device'],
		commonComparisons: ['Pruning', 'Distillation', 'Compression'],
	},
	{
		name: 'GGUF',
		aliases: ['gguf format', 'ggml'],
		tags: ['ai', 'format', 'llama'],
		whatItIs:
			'a file format for storing LLM models optimized for CPU/GPU inference',
		analogy:
			'GGUF is like a ZIP file but for AI models. It packs the model weights efficiently so they can be loaded quickly on any hardware — laptop, phone, or server.',
		keyTraits: ['Compact', 'Cross-platform', 'Metadata-rich', 'Optimized'],
		commonComparisons: ['PyTorch', 'ONNX', 'SafeTensors'],
	},
	{
		name: 'ONNX',
		aliases: ['onnx format'],
		tags: ['ai', 'format', 'interoperability'],
		whatItIs:
			'an open format for representing machine learning models across different frameworks',
		analogy:
			"ONNX is like a universal adapter for AI models. Train in PyTorch, export to ONNX, run it anywhere — TensorFlow, Caffe, or custom runtimes. It's the USB-C of ML.",
		keyTraits: [
			'Interoperable',
			'Optimized',
			'Open standard',
			'Hardware agnostic',
		],
		commonComparisons: ['PyTorch', 'TensorFlow', 'GGUF'],
	},
	{
		name: 'LoRA',
		aliases: ['low-rank adaptation', 'lora'],
		tags: ['ai', 'fine-tuning', 'efficient'],
		whatItIs:
			'a method for efficient fine-tuning that adds small trainable matrices to frozen model weights',
		analogy:
			'LoRA is like putting stickers on a frozen statue. The original model stays unchanged, but the stickers (small matrices) modify how it behaves for your specific task.',
		keyTraits: ['Parameter-efficient', 'Fast', 'Small adapters', 'Composable'],
		commonComparisons: ['Full fine-tuning', 'QLoRA', 'Adapter layers'],
	},
	{
		name: 'Chain of Thought',
		aliases: ['cot', 'chain-of-thought'],
		tags: ['ai', 'technique', 'reasoning'],
		whatItIs:
			'a prompting technique that asks LLMs to show their reasoning step by step',
		analogy:
			'Chain of thought is like showing your work in math class. Instead of just giving the answer, the model explains each step, making it easier to catch mistakes.',
		keyTraits: ['Step-by-step', 'Reasoning', 'Better accuracy', 'Explainable'],
		commonComparisons: ['Few-shot', 'Zero-shot', 'Tree of Thought'],
	},
	{
		name: 'Agent',
		aliases: ['ai agent', 'llm agent'],
		tags: ['ai', 'architecture', 'autonomous'],
		whatItIs:
			'an AI system that can plan, use tools, and take actions to accomplish goals',
		analogy:
			"An AI agent is like a personal assistant with a phone. They don't just answer questions — they can make calls (APIs), check calendars (tools), and complete tasks autonomously.",
		keyTraits: ['Tool use', 'Planning', 'Memory', 'Autonomous'],
		commonComparisons: ['Chatbot', 'Copilot', 'Workflow'],
	},
	{
		name: 'MCP',
		aliases: ['model context protocol', 'mcp protocol'],
		tags: ['ai', 'protocol', 'tools'],
		whatItIs:
			'a protocol for connecting AI models to external tools and data sources',
		analogy:
			"MCP is like USB for AI. It's a standard way to plug tools (files, databases, APIs) into any AI model, so they can work together without custom integrations.",
		keyTraits: [
			'Standardized',
			'Tool integration',
			'Interoperable',
			'Extensible',
		],
		commonComparisons: ['Function calling', 'Tool use', 'Plugins'],
	},
	{
		name: 'Function Calling',
		aliases: ['tool calling', 'function call'],
		tags: ['ai', 'llm', 'tools'],
		whatItIs:
			'the ability of LLMs to generate structured calls to external functions based on user requests',
		analogy:
			"Function calling is like an LLM having a phone book. When you ask for the weather, it doesn't guess — it looks up the weather API function and calls it directly.",
		keyTraits: ['Structured output', 'Tool use', 'API integration', 'Reliable'],
		commonComparisons: ['MCP', 'Plugins', 'RAG'],
	},
	{
		name: 'Agentic AI',
		aliases: ['agentic', 'ai agents'],
		tags: ['ai', 'autonomous', 'architecture'],
		whatItIs:
			'AI systems that can autonomously plan, reason, and execute multi-step tasks',
		analogy:
			'Agentic AI is like a self-driving car for tasks. You tell it the destination (goal), and it plans the route, handles obstacles, and drives itself there — making decisions along the way.',
		keyTraits: ['Autonomous', 'Multi-step', 'Tool use', 'Self-correcting'],
		commonComparisons: ['Chatbot', 'Copilot', 'Workflow automation'],
	},
	{
		name: 'Data Pipeline',
		aliases: ['data-pipeline', 'etl'],
		tags: ['data', 'engineering', 'processing'],
		whatItIs:
			'a series of data processing steps that move data from source to destination',
		analogy:
			'A data pipeline is like a water treatment plant. Raw water (data) comes in, goes through filters and treatments (processing), and comes out clean and ready to use at your tap (destination).',
		keyTraits: ['Extract', 'Transform', 'Load', 'Scheduled'],
		commonComparisons: ['ETL', 'Streaming', 'Batch processing'],
	},
	{
		name: 'ETL',
		aliases: ['extract transform load'],
		tags: ['data', 'integration', 'processing'],
		whatItIs:
			'a process that extracts data from sources, transforms it, and loads it into a target system',
		analogy:
			'ETL is like a factory assembly line. Raw materials (data) are extracted, shaped and combined (transformed), then packaged and shipped (loaded) to stores (databases).',
		keyTraits: ['Batch', 'Scheduled', 'Transform', 'Centralized'],
		commonComparisons: ['ELT', 'Streaming', 'Data pipeline'],
	},
	{
		name: 'Data Lake',
		aliases: ['datalake'],
		tags: ['data', 'storage', 'architecture'],
		whatItIs:
			'a centralized repository for storing structured and unstructured data at any scale',
		analogy:
			'A data lake is like a giant swimming pool for data. Everything goes in — clean data, messy data, structured, unstructured — and you can fish out what you need later.',
		keyTraits: ['Raw storage', 'Scalable', 'Schema-on-read', 'Cost-effective'],
		commonComparisons: ['Data warehouse', 'Database', 'Data mesh'],
	},
	{
		name: 'Data Warehouse',
		aliases: ['datawarehouse', 'dwh'],
		tags: ['data', 'analytics', 'storage'],
		whatItIs:
			'a system for reporting and data analysis, storing structured data optimized for queries',
		analogy:
			'A data warehouse is like a well-organized library. Everything is categorized, labeled, and indexed — making it fast to find exactly what you need for analysis.',
		keyTraits: [
			'Structured',
			'Optimized for queries',
			'Historical',
			'Analytics-focused',
		],
		commonComparisons: ['Data lake', 'OLTP', 'Database'],
	},
	{
		name: 'NoSQL',
		aliases: ['nosql', 'non-relational'],
		tags: ['database', 'flexible', 'scalable'],
		whatItIs:
			"a category of databases that don't use traditional relational table structures",
		analogy:
			'NoSQL is like a filing cabinet with flexible drawers. Instead of rigid rows and columns, you can store documents, key-value pairs, or graphs — whatever fits your data best.',
		keyTraits: [
			'Flexible schema',
			'Horizontal scaling',
			'JSON-friendly',
			'Fast',
		],
		commonComparisons: ['SQL', 'MongoDB', 'Redis', 'DynamoDB'],
	},
	{
		name: 'CAP Theorem',
		aliases: ['cap theorem', 'brewers theorem'],
		tags: ['distributed', 'theory', 'consistency'],
		whatItIs:
			'a theorem stating a distributed system can only guarantee two of three properties: Consistency, Availability, Partition tolerance',
		analogy:
			'CAP is like a pizza with three toppings but you can only pick two. You can have consistent and available (but not partition-tolerant), or available and partition-tolerant (but not consistent).',
		keyTraits: [
			'Consistency',
			'Availability',
			'Partition tolerance',
			'Trade-off',
		],
		commonComparisons: ['ACID', 'BASE', 'Eventual consistency'],
	},
	{
		name: 'Event Sourcing',
		aliases: ['event-sourced', 'event store'],
		tags: ['architecture', 'data', 'pattern'],
		whatItIs:
			'a pattern where state changes are stored as a sequence of events rather than current state',
		analogy:
			'Event sourcing is like a bank statement. Instead of just showing your current balance, it records every transaction (event) so you can see exactly how you got there.',
		keyTraits: [
			'Immutable events',
			'Audit trail',
			'Temporal queries',
			'Replay',
		],
		commonComparisons: ['CRUD', 'CQRS', 'State-based'],
	},
	{
		name: 'CQRS',
		aliases: ['command query responsibility segregation'],
		tags: ['architecture', 'pattern', 'separation'],
		whatItIs:
			'a pattern that separates read and write operations into different models',
		analogy:
			'CQRS is like having separate entrances for customers and employees. Customers (reads) go through a optimized storefront, while employees (writes) use a secure back office.',
		keyTraits: ['Read/write separation', 'Scalable', 'Optimized', 'Complex'],
		commonComparisons: ['Event sourcing', 'CRUD', 'Microservices'],
	},
	{
		name: 'Webhook',
		aliases: ['webhooks', 'http callback'],
		tags: ['api', 'integration', 'event-driven'],
		whatItIs:
			'a user-defined HTTP callback triggered by an event in a source system',
		analogy:
			'Webhooks are like doorbell notifications for your app. When something happens at another service (package delivered), it rings your webhook URL, and your app reacts.',
		keyTraits: ['Event-driven', 'HTTP POST', 'Push-based', 'Async'],
		commonComparisons: ['Polling', 'WebSockets', 'Message queues'],
	},
	{
		name: 'Rate Limiting',
		aliases: ['rate-limit', 'throttling'],
		tags: ['api', 'security', 'protection'],
		whatItIs:
			'controlling the number of requests a client can make to an API within a time period',
		analogy:
			'Rate limiting is like a bouncer limiting how many people can enter a club per minute. It prevents any single person from overwhelming the system.',
		keyTraits: ['Throttling', 'Quotas', 'Protection', 'Fair usage'],
		commonComparisons: ['Throttling', 'Backoff', 'Circuit breaker'],
	},
	{
		name: 'Circuit Breaker',
		aliases: ['circuit-breaker', 'fail-fast'],
		tags: ['resilience', 'pattern', 'microservices'],
		whatItIs:
			'a design pattern that prevents cascading failures by stopping calls to a failing service',
		analogy:
			"A circuit breaker is like a fuse in your house. When there's too much load (failures), it trips and cuts power, preventing damage until you can fix the underlying issue.",
		keyTraits: ['Fail-fast', 'Recovery', 'Fallback', 'Monitoring'],
		commonComparisons: ['Retry', 'Bulkhead', 'Timeout'],
	},
	{
		name: 'Idempotency',
		aliases: ['idempotent', 'idempotency'],
		tags: ['api', 'reliability', 'design'],
		whatItIs:
			'the property where performing an operation multiple times has the same effect as doing it once',
		analogy:
			"Idempotency is like pressing an elevator button. Whether you press it once or five times, the elevator still comes once — pressing more doesn't cause multiple elevators.",
		keyTraits: ['Safe to retry', 'No side effects', 'Consistent', 'HTTP verbs'],
		commonComparisons: ['Retry logic', 'Exactly-once', 'Deduplication'],
	},
	{
		name: 'Observability',
		aliases: ['observability', 'obsv'],
		tags: ['operations', 'monitoring', 'insight'],
		whatItIs:
			'the ability to understand internal system state from external outputs',
		analogy:
			"Observability is like a doctor's diagnostic tools. By checking temperature, pulse, and blood pressure (logs, metrics, traces), they understand what's happening inside without opening you up.",
		keyTraits: ['Logs', 'Metrics', 'Traces', 'Correlation'],
		commonComparisons: ['Monitoring', 'Logging', 'Profiling'],
	},
	{
		name: 'Chaos Engineering',
		aliases: ['chaos', 'chaos-engineering'],
		tags: ['resilience', 'testing', 'reliability'],
		whatItIs:
			'the practice of deliberately introducing failures to test system resilience',
		analogy:
			'Chaos engineering is like a fire drill for servers. You intentionally break things (kill processes, block networks) to see how your system responds and improve it.',
		keyTraits: [
			'Deliberate failures',
			'Resilience',
			'Confidence',
			'Controlled',
		],
		commonComparisons: ['Testing', 'Load testing', 'Disaster recovery'],
	},
	{
		name: 'Infrastructure',
		aliases: ['infra', 'it infrastructure'],
		tags: ['operations', 'foundation', 'systems'],
		whatItIs:
			'the composite hardware, software, network resources and services required for the existence, operation and management of an enterprise IT environment',
		analogy:
			"Infrastructure is like the foundation, plumbing, and electricity of a building. Users don't see it, but without it, nothing works.",
		keyTraits: ['Foundation', 'Hidden', 'Essential', 'Shared'],
		commonComparisons: ['Platform', 'Application', 'Data'],
	},
]
