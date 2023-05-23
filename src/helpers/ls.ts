export default {
  getItem<R>(key = ''): R {
    return JSON.parse(localStorage.getItem(key) || 'null');
  },
  setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem(key: string) {
    localStorage.removeItem(key);
  },
};