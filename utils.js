// utils.js — moduł z funkcjami pomocniczymi

/**
 * persist(key, value)
 * Zapisuje dowolny obiekt/tablicę w localStorage pod kluczem key.
 * - JSON.stringify zamienia dane na string (localStorage przechowuje tylko tekst).
 * - Zwraca true jako prosty sygnał powodzenia.
 */
export function persist(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return true;
}

/**
 * load(key, fallback = [])
 * Odczytuje dane spod klucza key z localStorage.
 * - Jeśli klucz nie istnieje lub dane są uszkodzone → zwraca fallback (domyślnie pustą tablicę).
 * - JSON.parse konwertuje string z powrotem na obiekt/tablicę.
 */
export function load(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
