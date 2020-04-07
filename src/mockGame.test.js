/* eslint-disable no-undef */
import game from './mockGame';

describe('Tests Start Mock Game', () => {
  const game1 = game();

  test('Return the game type', () => {
    expect(typeof game1).toBe('object');
  });

  test('Expect to see the object that contains all the games scenes', () => {
    expect(typeof game.scene.scenes).toBe('object');
  });
});
