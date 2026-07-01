import * as SQLite from 'expo-sqlite';

export interface HistoryItem {
  id: number;
  original_term: string;
  analogy: string;
  language: string;
  timestamp: number;
}

const DB_NAME = 'noobify.db';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;
  db = await SQLite.openDatabaseAsync(DB_NAME);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      original_term TEXT NOT NULL,
      analogy TEXT NOT NULL,
      language TEXT NOT NULL,
      timestamp INTEGER NOT NULL
    );
  `);
  return db;
}

export async function addHistoryItem(
  originalTerm: string,
  analogy: string,
  language: string,
): Promise<void> {
  const database = await getDatabase();
  const timestamp = Date.now();
  await database.runAsync(
    'INSERT INTO history (original_term, analogy, language, timestamp) VALUES (?, ?, ?, ?)',
    [originalTerm, analogy, language, timestamp],
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
