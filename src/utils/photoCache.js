/**
 * Кэш file_id для быстрой повторной отправки фото.
 * Telegram хранит файл на своих серверах — после первой загрузки
 * достаточно передавать file_id, а не заново читать файл с диска.
 *
 * Кэш хранится в памяти (Map) и дополнительно персистируется в JSON-файл,
 * чтобы не терять данные при перезапуске бота.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";

const CACHE_FILE = path.join(process.cwd(), "photo-cache.json");

/** Загружаем кэш с диска при старте */
function loadCache() {
  if (existsSync(CACHE_FILE)) {
    try {
      return new Map(Object.entries(JSON.parse(readFileSync(CACHE_FILE, "utf8"))));
    } catch {
      return new Map();
    }
  }
  return new Map();
}

const cache = loadCache();

/** Сохраняем кэш на диск (вызываем после каждой записи) */
function persist() {
  try {
    writeFileSync(CACHE_FILE, JSON.stringify(Object.fromEntries(cache)), "utf8");
  } catch (e) {
    console.error("[photoCache] Failed to persist cache:", e.message);
  }
}

/**
 * Получить file_id из кэша.
 * @param {string} filePath — путь к файлу (ключ)
 * @returns {string|null}
 */
export function getCachedFileId(filePath) {
  return cache.get(filePath) ?? null;
}

/**
 * Сохранить file_id в кэш.
 * @param {string} filePath — путь к файлу (ключ)
 * @param {string} fileId — Telegram file_id
 */
export function setCachedFileId(filePath, fileId) {
  if (!cache.has(filePath)) {
    cache.set(filePath, fileId);
    persist();
  }
}
