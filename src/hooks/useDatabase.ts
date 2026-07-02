import * as SQLite from 'expo-sqlite'

export interface HistoryItem {
	id: number
	original_term: string
	analogy: string
	language: string
	category: string | null
	timestamp: number
}

export interface FavoriteItem {
	id: number
	original_term: string
	analogy: string
	language: string
	category: string | null
	created_at: number
}

const DB_NAME = 'noobify.db'

let db: SQLite.SQLiteDatabase | null = null

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
	if (db) {
		try {
			await db.getFirstAsync('SELECT 1')
			return db
		} catch {
			db = null
		}
	}
	db = await SQLite.openDatabaseAsync(DB_NAME)
	await db.execAsync(`
    CREATE TABLE IF NOT EXISTS history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      original_term TEXT NOT NULL,
      analogy TEXT NOT NULL,
      language TEXT NOT NULL,
      category TEXT,
      timestamp INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS custom_skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      aliases TEXT,
      category TEXT NOT NULL DEFAULT 'custom',
      what_it_is TEXT NOT NULL,
      analogy TEXT NOT NULL,
      key_traits TEXT,
      common_comparisons TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS skill_overrides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      term_name TEXT NOT NULL UNIQUE,
      enabled INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      original_term TEXT NOT NULL,
      analogy TEXT NOT NULL,
      language TEXT NOT NULL,
      category TEXT,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_preferences (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      field_key TEXT NOT NULL UNIQUE,
      field_label TEXT NOT NULL,
      field_value TEXT NOT NULL,
      enabled INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0
    );
  `)

	// Migrate: add category column to history if missing
	try {
		await db.execAsync('ALTER TABLE history ADD COLUMN category TEXT')
	} catch {
		// column already exists
	}
	try {
		await db.execAsync('ALTER TABLE favorites ADD COLUMN category TEXT')
	} catch {
		// column already exists
	}

	return db
}

export async function addHistoryItem(
	originalTerm: string,
	analogy: string,
	language: string,
	category?: string,
): Promise<void> {
	const database = await getDatabase()
	const timestamp = Date.now()
	await database.runAsync(
		'INSERT INTO history (original_term, analogy, language, category, timestamp) VALUES (?, ?, ?, ?, ?)',
		[originalTerm, analogy, language, category || null, timestamp],
	)
}

export async function getHistory(): Promise<HistoryItem[]> {
	const database = await getDatabase()
	const result = await database.getAllAsync<HistoryItem>(
		'SELECT * FROM history ORDER BY timestamp DESC',
	)
	return result
}

export async function clearHistory(): Promise<void> {
	const database = await getDatabase()
	await database.runAsync('DELETE FROM history')
}

export async function deleteHistoryItem(id: number): Promise<void> {
	const database = await getDatabase()
	await database.runAsync('DELETE FROM history WHERE id = ?', [id])
}

export interface CustomSkill {
	id: number
	name: string
	aliases: string | null
	category: string
	what_it_is: string
	analogy: string
	key_traits: string | null
	common_comparisons: string | null
	created_at: number
	updated_at: number
}

export interface SkillOverride {
	id: number
	term_name: string
	enabled: number
}

export async function addCustomSkill(
	skill: Omit<CustomSkill, 'id' | 'created_at' | 'updated_at'>,
): Promise<void> {
	const database = await getDatabase()
	const timestamp = Date.now()
	await database.runAsync(
		'INSERT OR REPLACE INTO custom_skills (name, aliases, category, what_it_is, analogy, key_traits, common_comparisons, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
		[
			skill.name,
			skill.aliases,
			skill.category,
			skill.what_it_is,
			skill.analogy,
			skill.key_traits,
			skill.common_comparisons,
			timestamp,
			timestamp,
		],
	)
}

export async function getCustomSkills(): Promise<CustomSkill[]> {
	const database = await getDatabase()
	return await database.getAllAsync<CustomSkill>(
		'SELECT * FROM custom_skills ORDER BY name ASC',
	)
}

export async function deleteCustomSkill(name: string): Promise<void> {
	const database = await getDatabase()
	await database.runAsync('DELETE FROM custom_skills WHERE name = ?', [name])
}

export async function getSkillOverrides(): Promise<SkillOverride[]> {
	const database = await getDatabase()
	return await database.getAllAsync<SkillOverride>(
		'SELECT * FROM skill_overrides',
	)
}

export async function setSkillOverride(
	termName: string,
	enabled: boolean,
): Promise<void> {
	const database = await getDatabase()
	await database.runAsync(
		'INSERT OR REPLACE INTO skill_overrides (term_name, enabled) VALUES (?, ?)',
		[termName, enabled ? 1 : 0],
	)
}

export async function deleteSkillOverride(termName: string): Promise<void> {
	const database = await getDatabase()
	await database.runAsync('DELETE FROM skill_overrides WHERE term_name = ?', [
		termName,
	])
}

export async function exportCustomSkills(): Promise<CustomSkill[]> {
	return getCustomSkills()
}

export async function importCustomSkills(
	skills: Omit<CustomSkill, 'id' | 'created_at' | 'updated_at'>[],
): Promise<void> {
	const database = await getDatabase()
	const timestamp = Date.now()
	for (const skill of skills) {
		await database.runAsync(
			'INSERT OR REPLACE INTO custom_skills (name, aliases, category, what_it_is, analogy, key_traits, common_comparisons, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
			[
				skill.name,
				skill.aliases,
				skill.category,
				skill.what_it_is,
				skill.analogy,
				skill.key_traits,
				skill.common_comparisons,
				timestamp,
				timestamp,
			],
		)
	}
}

export async function addFavorite(
	originalTerm: string,
	analogy: string,
	language: string,
	category: string | null,
): Promise<void> {
	const database = await getDatabase()
	const timestamp = Date.now()
	await database.runAsync(
		'INSERT INTO favorites (original_term, analogy, language, category, created_at) VALUES (?, ?, ?, ?, ?)',
		[originalTerm, analogy, language, category, timestamp],
	)
}

export async function getFavorites(): Promise<FavoriteItem[]> {
	const database = await getDatabase()
	return await database.getAllAsync<FavoriteItem>(
		'SELECT * FROM favorites ORDER BY created_at DESC',
	)
}

export async function removeFavorite(id: number): Promise<void> {
	const database = await getDatabase()
	await database.runAsync('DELETE FROM favorites WHERE id = ?', [id])
}

export async function isFavorite(originalTerm: string): Promise<boolean> {
	const database = await getDatabase()
	const result = await database.getFirstAsync<{count: number}>(
		'SELECT COUNT(*) as count FROM favorites WHERE original_term = ?',
		[originalTerm],
	)
	return (result?.count ?? 0) > 0
}

export interface ProfileField {
	id: number
	field_key: string
	field_label: string
	field_value: string
	enabled: number
	sort_order: number
}

const DEFAULT_PROFILE_FIELDS: Omit<ProfileField, 'id'>[] = [
	{
		field_key: 'name',
		field_label: 'Name / Handle',
		field_value: '',
		enabled: 1,
		sort_order: 0,
	},
	{
		field_key: 'github',
		field_label: 'GitHub URL',
		field_value: '',
		enabled: 1,
		sort_order: 1,
	},
	{
		field_key: 'projects',
		field_label: 'Current Projects',
		field_value: '',
		enabled: 1,
		sort_order: 2,
	},
	{
		field_key: 'tech_stack',
		field_label: 'Tech Stack / Languages',
		field_value: '',
		enabled: 1,
		sort_order: 3,
	},
	{
		field_key: 'bio',
		field_label: 'About Me / Bio',
		field_value: '',
		enabled: 1,
		sort_order: 4,
	},
	{
		field_key: 'notes',
		field_label: 'Custom Notes',
		field_value: '',
		enabled: 1,
		sort_order: 5,
	},
]

export async function getProfile(): Promise<ProfileField[]> {
	const database = await getDatabase()
	const existing = await database.getAllAsync<ProfileField>(
		'SELECT * FROM user_profile ORDER BY sort_order ASC',
	)

	if (existing.length === 0) {
		for (const field of DEFAULT_PROFILE_FIELDS) {
			await database.runAsync(
				'INSERT INTO user_profile (field_key, field_label, field_value, enabled, sort_order) VALUES (?, ?, ?, ?, ?)',
				[
					field.field_key,
					field.field_label,
					field.field_value,
					field.enabled,
					field.sort_order,
				],
			)
		}
		return await database.getAllAsync<ProfileField>(
			'SELECT * FROM user_profile ORDER BY sort_order ASC',
		)
	}

	return existing
}

export async function updateProfileField(
	fieldKey: string,
	value: string,
): Promise<void> {
	const database = await getDatabase()
	await database.runAsync(
		'UPDATE user_profile SET field_value = ? WHERE field_key = ?',
		[value, fieldKey],
	)
}

export async function toggleProfileField(
	fieldKey: string,
	enabled: boolean,
): Promise<void> {
	const database = await getDatabase()
	await database.runAsync(
		'UPDATE user_profile SET enabled = ? WHERE field_key = ?',
		[enabled ? 1 : 0, fieldKey],
	)
}

export async function addProfileField(
	fieldKey: string,
	label: string,
	value: string,
): Promise<void> {
	const database = await getDatabase()
	const maxOrder = await database.getFirstAsync<{max_order: number | null}>(
		'SELECT MAX(sort_order) as max_order FROM user_profile',
	)
	const nextOrder = (maxOrder?.max_order ?? -1) + 1
	await database.runAsync(
		'INSERT INTO user_profile (field_key, field_label, field_value, enabled, sort_order) VALUES (?, ?, ?, 1, ?)',
		[fieldKey, label, value, nextOrder],
	)
}

export async function deleteProfileField(fieldKey: string): Promise<void> {
	const database = await getDatabase()
	await database.runAsync(
		'DELETE FROM user_profile WHERE field_key = ? AND field_key NOT IN (?, ?, ?, ?, ?)',
		[fieldKey, 'name', 'github', 'projects', 'tech_stack', 'bio'],
	)
}

export async function buildProfileContext(): Promise<string> {
	const database = await getDatabase()
	const fields = await database.getAllAsync<ProfileField>(
		'SELECT * FROM user_profile WHERE enabled = 1 AND field_value != "" ORDER BY sort_order ASC',
	)

	if (fields.length === 0) return ''

	const parts = fields
		.filter(f => f.field_value.trim())
		.map(f => `${f.field_label}: ${f.field_value.trim()}`)

	return parts.length > 0 ? 'User profile: ' + parts.join(' | ') : ''
}

export async function exportProfile(): Promise<ProfileField[]> {
	return getProfile()
}

export async function importProfile(
	fields: Omit<ProfileField, 'id'>[],
): Promise<void> {
	const database = await getDatabase()
	for (const field of fields) {
		await database.runAsync(
			'INSERT OR REPLACE INTO user_profile (field_key, field_label, field_value, enabled, sort_order) VALUES (?, ?, ?, ?, ?)',
			[
				field.field_key,
				field.field_label,
				field.field_value,
				field.enabled,
				field.sort_order,
			],
		)
	}
}
