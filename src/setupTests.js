import fetchMock from 'jest-fetch-mock';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    }
  };
})();
global.localStorage = localStorageMock;
global.fetch = fetchMock;
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};
