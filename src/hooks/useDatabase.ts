import * as SQLite from 'expo-sqlite';

export interface HistoryItem {
  id: number;
  original_term: string;
  analogy: string;
  language: string;
  category: string | null;
  timestamp: number;
}

export interface FavoriteItem {
  id: number;
  original_term: string;
  analogy: string;
  language: string;
  category: string | null;
  created_at: number;
}

const DB_NAME = 'noobify.db';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) {
    try {
      await db.getFirstAsync('SELECT 1');
      return db;
    } catch {
      db = null;
    }
  }
  db = await SQLite.openDatabaseAsync(DB_NAME);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      original_term TEXT NOT NULL,
      analogy TEXT NOT NULL,
      language TEXT NOT NULL,
      category TEXT,
      timestamp INTEGER NOT NULL
    );
  `);
  return db;
}

export async function addHistoryItem(
  originalTerm: string,
  analogy: string,
  language: string,
  category?: string,
): Promise<void> {
  const database = await getDatabase();
  const timestamp = Date.now();
  await database.runAsync(
    'INSERT INTO history (original_term, analogy, language, category, timestamp) VALUES (?, ?, ?, ?, ?)',
    [originalTerm, analogy, language, category || null, timestamp],
  );
}

export async function getHistory(): Promise<HistoryItem[]> {
  const database = await getDatabase();
  const result = await database.getAllAsync<HistoryItem>(
    'SELECT * FROM history ORDER BY timestamp DESC',
  );
  return result;
}

export async function clearHistory(): Promise<void> {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM history');
}

export async function deleteHistoryItem(id: number): Promise<void> {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM history WHERE id = ?', [id]);
}

export interface CustomSkill {
  id: number;
  name: string;
  aliases: string | null;
  category: string;
  what_it_is: string;
  analogy: string;
  key_traits: string | null;
  common_comparisons: string | null;
  created_at: number;
  updated_at: number;
}

export interface SkillOverride {
  id: number;
  term_name: string;
  enabled: number;
}

export async function addCustomSkill(
  skill: Omit<CustomSkill, 'id' | 'created_at' | 'updated_at'>,
): Promise<void> {
  const database = await getDatabase();
  const timestamp = Date.now();
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
  );
}

export async function getCustomSkills(): Promise<CustomSkill[]> {
  const database = await getDatabase();
  return await database.getAllAsync<CustomSkill>('SELECT * FROM custom_skills ORDER BY name ASC');
}

export async function deleteCustomSkill(name: string): Promise<void> {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM custom_skills WHERE name = ?', [name]);
}

export async function getSkillOverrides(): Promise<SkillOverride[]> {
  const database = await getDatabase();
  return await database.getAllAsync<SkillOverride>('SELECT * FROM skill_overrides');
}

export async function setSkillOverride(termName: string, enabled: boolean): Promise<void> {
  const database = await getDatabase();
  await database.runAsync(
    'INSERT OR REPLACE INTO skill_overrides (term_name, enabled) VALUES (?, ?)',
    [termName, enabled ? 1 : 0],
  );
}

export async function deleteSkillOverride(termName: string): Promise<void> {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM skill_overrides WHERE term_name = ?', [termName]);
}

export async function exportCustomSkills(): Promise<CustomSkill[]> {
  return getCustomSkills();
}

export async function importCustomSkills(
  skills: Omit<CustomSkill, 'id' | 'created_at' | 'updated_at'>[],
): Promise<void> {
  const database = await getDatabase();
  const timestamp = Date.now();
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
    );
  }
}

export async function addFavorite(
  originalTerm: string,
  analogy: string,
  language: string,
  category: string | null,
): Promise<void> {
  const database = await getDatabase();
  const timestamp = Date.now();
  await database.runAsync(
    'INSERT INTO favorites (original_term, analogy, language, category, created_at) VALUES (?, ?, ?, ?, ?)',
    [originalTerm, analogy, language, category, timestamp],
  );
}

export async function getFavorites(): Promise<FavoriteItem[]> {
  const database = await getDatabase();
  return await database.getAllAsync<FavoriteItem>(
    'SELECT * FROM favorites ORDER BY created_at DESC',
  );
}

export async function removeFavorite(id: number): Promise<void> {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM favorites WHERE id = ?', [id]);
}

export async function isFavorite(originalTerm: string): Promise<boolean> {
  const database = await getDatabase();
  const result = await database.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM favorites WHERE original_term = ?',
    [originalTerm],
  );
  return (result?.count ?? 0) > 0;
}
