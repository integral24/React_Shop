export default {
  getItem<R>(key: string): R {
    return JSON.parse(localStorage.getItem(key) ?? '');
  },
  setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem(key: string) {
    localStorage.removeItem(key);
  },
};