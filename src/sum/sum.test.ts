//todo: remove this folder when first real test would be added

import { sum } from "./sum";

describe("Dummy Jest Test Suite", () => {
  it("should add two numbers correctly", () => {
    const result = sum(2, 3);

    expect(result).toBe(5);
  });

  it("should fail for wrong expectation (dummy test)", () => {
    const result = sum(1, 1);

    expect(result).not.toBe(3);
  });
});
