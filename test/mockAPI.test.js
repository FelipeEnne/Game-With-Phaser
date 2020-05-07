import { submitGold, getGoldBoard, initGame } from './mockAPI';


describe('Validate the submitGold', () => {
  test('input validation', () => submitGold('Best', 300).then((data) => {
    expect(data.result).toBe('Leaderboard score created correctly.');
  }));
});

describe('Validate the getGoldBoard', () => {
  test('Board validation', () => getGoldBoard().then((data) => {
    expect(typeof data).toBe('object');
  }));
});

describe('Validate the initGame', () => {
  test('Game validation', () => initGame().then((data) => {
    expect(data.result.substring(0, 13)).toBe('Game with ID:');
  }));
});