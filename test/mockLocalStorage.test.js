/* eslint-disable no-undef */
import { localStoreGold, getLocalGolds, storeGolds } from './mockLocalStorage';


describe('Test the localStoreGold - LocalStorage', () => {
  let golds;

  test('Return 0 - localStoreGold is empty', () => {
    golds = getLocalGolds();
    expect(golds).toBe(0);
  });

  test('Return 100 - localStoreGold is 100', () => {
    localStoreGold(100);
    golds = getLocalGolds();
    expect(golds).toBe(100);
  });
});

describe('Test the getLocalGolds - LocalStorage', () => {
  let golds;

  test('Return 500 - localStoreGold is 100', () => {
    localStoreGold(500);
    golds = getLocalGolds();
    expect(golds).toBe(500);
  });
});

describe('Test the storeGolds - LocalStorage', () => {
  let golds;

  test('Return 10 - storeGolds is 10', () => {
    storeGolds(10);
    golds = getLocalGolds();
    expect(golds).toBe(10);
  });
});
