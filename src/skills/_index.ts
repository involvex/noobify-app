import type { TermDefinition, SkillCategory, SkillIndex } from './types';
import { getCustomSkills, getSkillOverrides, type CustomSkill } from '@/hooks/useDatabase';

import { webDevTerms } from './web-dev';
import { programmingTerms } from './programming';
import { devopsTerms } from './devops';
import { aiDataTerms } from './ai-data';

const builtinCategories: SkillCategory[] = [
  { category: 'web-dev', terms: webDevTerms },
  { category: 'programming', terms: programmingTerms },
  { category: 'devops', terms: devopsTerms },
  { category: 'ai-data', terms: aiDataTerms },
];

let _index: SkillIndex | null = null;

function normalize(str: string): string {
  return str.toLowerCase().trim();
}

function parseJsonArray(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
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
  };
}

export function buildSkillIndex(): SkillIndex {
  if (_index) return _index;

  const termsByName = new Map<string, TermDefinition>();
  const termsByAlias = new Map<string, TermDefinition>();

  for (const category of builtinCategories) {
    for (const term of category.terms) {
      termsByName.set(normalize(term.name), term);
      for (const alias of term.aliases) {
        termsByAlias.set(normalize(alias), term);
      }
    }
  }

  _index = { categories: builtinCategories, termsByName, termsByAlias };
  return _index;
}

export async function buildMergedIndex(): Promise<SkillIndex> {
  const index = buildSkillIndex();
  const termsByName = new Map(index.termsByName);
  const termsByAlias = new Map(index.termsByAlias);

  try {
    const [customSkills, overrides] = await Promise.all([getCustomSkills(), getSkillOverrides()]);

    const disabledTerms = new Set(overrides.filter((o) => o.enabled === 0).map((o) => o.term_name));

    for (const term of termsByName.values()) {
      if (disabledTerms.has(term.name)) {
        termsByName.delete(normalize(term.name));
        for (const alias of term.aliases) {
          termsByAlias.delete(normalize(alias));
        }
      }
    }

    for (const skill of customSkills) {
      const term = customSkillToTerm(skill);
      termsByName.set(normalize(term.name), term);
      for (const alias of term.aliases) {
        termsByAlias.set(normalize(alias), term);
      }
    }

    const customCategory: SkillCategory = {
      category: 'custom',
      terms: customSkills.map(customSkillToTerm),
    };

    const categories = [...builtinCategories];
    if (customCategory.terms.length > 0) {
      categories.push(customCategory);
    }

    return { categories, termsByName, termsByAlias };
  } catch {
    return index;
  }
}

export function findTerm(query: string, index?: SkillIndex): TermDefinition | null {
  const idx = index ?? buildSkillIndex();
  const normalized = normalize(query);

  const direct = idx.termsByName.get(normalized);
  if (direct) return direct;

  const aliased = idx.termsByAlias.get(normalized);
  if (aliased) return aliased;

  for (const [name, term] of idx.termsByName) {
    if (name.includes(normalized) || normalized.includes(name)) {
      return term;
    }
  }

  for (const [alias, term] of idx.termsByAlias) {
    if (alias.includes(normalized) || normalized.includes(alias)) {
      return term;
    }
  }

  return null;
}

export function generateContext(term: TermDefinition, language: 'en' | 'de'): string {
  if (language === 'de') {
    return [
      `Kontext zum Begriff:`,
      `- ${term.name} ist ${term.whatItIs}`,
      `- Wichtige Merkmale: ${term.keyTraits.join(', ')}`,
      `- Ähnliche Konzepte: ${term.commonComparisons.join(', ')}`,
    ].join('\n');
  }

  return [
    `Context about the term:`,
    `- ${term.name} is ${term.whatItIs}`,
    `- Key traits: ${term.keyTraits.join(', ')}`,
    `- Similar concepts: ${term.commonComparisons.join(', ')}`,
  ].join('\n');
}

export function getTermCategory(termName: string, index?: SkillIndex): string | null {
  const idx = index ?? buildSkillIndex();
  const normalized = normalize(termName);

  for (const category of idx.categories) {
    for (const term of category.terms) {
      if (normalize(term.name) === normalized) {
        return category.category;
      }
      for (const alias of term.aliases) {
        if (normalize(alias) === normalized) {
          return category.category;
        }
      }
    }
  }

  return null;
}

export function getAllTerms(): TermDefinition[] {
  const index = buildSkillIndex();
  return Array.from(index.termsByName.values());
}

export function getTermsByCategory(categoryName: string): TermDefinition[] {
  const index = buildSkillIndex();
  const category = index.categories.find((c) => c.category === categoryName);
  return category?.terms ?? [];
}
