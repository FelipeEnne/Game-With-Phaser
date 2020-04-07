/* eslint-disable no-undef */
import game from './mockGame';

describe('Tests Start Mock Game', () => {
  const gameStart = game();

  test('Return the game type', () => {
    expect(typeof gameStart).toBe('object');
  });

  test('Return the Games Scenes', () => {
    expect(typeof gameStart.scene).toBe('object');
  });
});
