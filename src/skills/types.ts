export interface TermDefinition {
	name: string
	aliases: string[]
	tags: string[]
	whatItIs: string
	analogy: string
	keyTraits: string[]
	commonComparisons: string[]
}

export interface SkillCategory {
	category: string
	terms: TermDefinition[]
}

export interface SkillIndex {
	categories: SkillCategory[]
	termsByName: Map<string, TermDefinition>
	termsByAlias: Map<string, TermDefinition>
}
