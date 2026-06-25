jest.mock("node-fetch", () => jest.fn());

import fetch from "node-fetch";
import { submitGold, getGoldBoard, initGame } from "./mockAPI";

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
