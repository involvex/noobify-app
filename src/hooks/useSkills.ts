import {useState, useEffect, useCallback} from 'react'

import {
	getCustomSkills,
	addCustomSkill,
	deleteCustomSkill,
	getSkillOverrides,
	setSkillOverride,
	deleteSkillOverride,
	exportCustomSkills,
	importCustomSkills,
	type CustomSkill,
} from '@/hooks/useDatabase'
import type {TermDefinition} from '@/skills/types'
import {getAllTerms} from '@/skills/_index'

export interface ManagedSkill extends TermDefinition {
	isCustom: boolean
	enabled: boolean
}

export interface SkillCategory {
	category: string
	label: string
	terms: ManagedSkill[]
}

const CATEGORY_LABELS: Record<string, string> = {
	'web-dev': 'Web Development',
	programming: 'Programming',
	devops: 'DevOps & Tools',
	'ai-data': 'AI & Data',
	custom: 'Custom Skills',
}

function parseJsonArray(value: string | null): string[] {
	if (!value) return []
	try {
		const parsed = JSON.parse(value)
		return Array.isArray(parsed) ? parsed : []
	} catch {
		return []
	}
}

function customSkillToTerm(skill: CustomSkill): TermDefinition {
	return {
		name: skill.name,
		aliases: parseJsonArray(skill.aliases),
		tags: [skill.category],
		whatItIs: skill.what_it_is,
		analogy: skill.analogy,
		keyTraits: parseJsonArray(skill.key_traits),
		commonComparisons: parseJsonArray(skill.common_comparisons),
	}
}

export function useSkills() {
	const [categories, setCategories] = useState<SkillCategory[]>([])
	const [loading, setLoading] = useState(true)
	const [searchQuery, setSearchQuery] = useState('')

	const loadSkills = useCallback(async () => {
		try {
			setLoading(true)

			const [customSkills, overrides] = await Promise.all([
				getCustomSkills(),
				getSkillOverrides(),
			])

			const overrideMap = new Map(
				overrides.map(o => [o.term_name, o.enabled === 1]),
			)

			const builtInTerms = getAllTerms()
			const builtInByCategory = new Map<string, ManagedSkill[]>()

			for (const term of builtInTerms) {
				const category = term.tags[0] ?? 'programming'
				const enabled = overrideMap.get(term.name) ?? true
				const managed: ManagedSkill = {...term, isCustom: false, enabled}

				if (!builtInByCategory.has(category)) {
					builtInByCategory.set(category, [])
				}
				builtInByCategory.get(category)!.push(managed)
			}

			const result: SkillCategory[] = []

			for (const [cat, terms] of builtInByCategory) {
				terms.sort((a, b) => a.name.localeCompare(b.name))
				result.push({
					category: cat,
					label: CATEGORY_LABELS[cat] ?? cat,
					terms,
				})
			}

			const customTerms: ManagedSkill[] = customSkills.map(s => ({
				...customSkillToTerm(s),
				isCustom: true,
				enabled: true,
			}))
			customTerms.sort((a, b) => a.name.localeCompare(b.name))

			if (customTerms.length > 0) {
				result.push({
					category: 'custom',
					label: CATEGORY_LABELS.custom,
					terms: customTerms,
				})
			}

			result.sort((a, b) => {
				if (a.category === 'custom') return 1
				if (b.category === 'custom') return -1
				return a.label.localeCompare(b.label)
			})

			setCategories(result)
		} catch (error) {
			console.error('Failed to load skills:', error)
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		loadSkills()
	}, [loadSkills])

	const toggleSkill = useCallback(
		async (termName: string, enabled: boolean) => {
			if (enabled) {
				await deleteSkillOverride(termName)
			} else {
				await setSkillOverride(termName, false)
			}
			setCategories(prev =>
				prev.map(cat => ({
					...cat,
					terms: cat.terms.map(t =>
						t.name === termName ? {...t, enabled} : t,
					),
				})),
			)
		},
		[],
	)

	const addSkill = useCallback(
		async (skill: {
			name: string
			aliases: string[]
			whatItIs: string
			analogy: string
			keyTraits: string[]
			commonComparisons: string[]
		}) => {
			const dbSkill: Omit<CustomSkill, 'id' | 'created_at' | 'updated_at'> = {
				name: skill.name,
				aliases: JSON.stringify(skill.aliases),
				category: 'custom',
				what_it_is: skill.whatItIs,
				analogy: skill.analogy,
				key_traits: JSON.stringify(skill.keyTraits),
				common_comparisons: JSON.stringify(skill.commonComparisons),
			}
			await addCustomSkill(dbSkill)
			await loadSkills()
		},
		[loadSkills],
	)

	const removeSkill = useCallback(async (termName: string) => {
		await deleteCustomSkill(termName)
		setCategories(prev =>
			prev.map(cat => ({
				...cat,
				terms: cat.terms.filter(t => !(t.isCustom && t.name === termName)),
			})),
		)
	}, [])

	const handleExport = useCallback(async () => {
		return exportCustomSkills()
	}, [])

	const handleImport = useCallback(
		async (skills: Omit<CustomSkill, 'id' | 'created_at' | 'updated_at'>[]) => {
			await importCustomSkills(skills)
			await loadSkills()
		},
		[loadSkills],
	)

	const filteredCategories = searchQuery.trim()
		? categories
				.map(cat => ({
					...cat,
					terms: cat.terms.filter(
						t =>
							t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
							t.aliases.some(a =>
								a.toLowerCase().includes(searchQuery.toLowerCase()),
							),
					),
				}))
				.filter(cat => cat.terms.length > 0)
		: categories

	const totalTerms = categories.reduce((sum, cat) => sum + cat.terms.length, 0)
	const enabledTerms = categories.reduce(
		(sum, cat) => sum + cat.terms.filter(t => t.enabled).length,
		0,
	)
	const customCount =
		categories.find(c => c.category === 'custom')?.terms.length ?? 0

	return {
		categories: filteredCategories,
		loading,
		searchQuery,
		setSearchQuery,
		toggleSkill,
		addSkill,
		removeSkill,
		exportSkills: handleExport,
		importSkills: handleImport,
		refresh: loadSkills,
		totalTerms,
		enabledTerms,
		customCount,
	}
}
