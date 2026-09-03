jest.mock("node-fetch", () => jest.fn());

import fetch from "node-fetch";
import {
  sanitizePlayerName,
  submitGold,
  getGoldBoard,
  initGame,
} from "./mockAPI";

describe("Validate sanitizePlayerName", () => {
  test("trims, strips control chars, and clamps length", () => {
    expect(sanitizePlayerName("  Best  ")).toBe("Best");
    expect(sanitizePlayerName("abcdefghijklmnop")).toBe("abcdefghij");
    expect(sanitizePlayerName("A\u0000B\u0007C")).toBe("ABC");
  });
});

describe("Validate the submitGold", () => {
  beforeEach(() => {
    fetch.mockReset();
  });

  test("input validation", () => {
    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({ result: "Leaderboard score created correctly." }),
    });

    return submitGold("Best", 300).then((data) => {
      expect(data.result).toBe("Leaderboard score created correctly.");
      expect(fetch).toHaveBeenCalledTimes(1);
      const [, settings] = fetch.mock.calls[0];
      expect(JSON.parse(settings.body).user).toBe("Best");
    });
  });

  test("sanitizes player name before submit", () => {
    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({ result: "Leaderboard score created correctly." }),
    });

    return submitGold("  LongPlayerName\u0000  ", 10).then(() => {
      const [, settings] = fetch.mock.calls[0];
      expect(JSON.parse(settings.body).user).toBe("LongPlayer");
    });
  });
});

describe("Validate the getGoldBoard", () => {
  beforeEach(() => {
    fetch.mockReset();
  });

  test("Board validation", () => {
    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          result: [{ score: 300, user: "Best" }],
        }),
    });

    return getGoldBoard().then((data) => {
      expect(typeof data).toBe("object");
      expect(data[0]).toEqual([300, "Best"]);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Validate the initGame", () => {
  beforeEach(() => {
    fetch.mockReset();
  });

  test("Game validation", () => {
    fetch.mockResolvedValue({
      json: () => Promise.resolve({ result: "Game with ID: abc123" }),
    });

    return initGame().then((data) => {
      expect(data.result.substring(0, 13)).toBe("Game with ID:");
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
