import * as target from "./LoopFunctions";

it("should map values 10 times", () => {
  let iterations = 0;

  const listOfIndexes = target.repeatMap(10, (index) => {
    expect(index).toBe(iterations);
    iterations++;
    return index;
  });

  expect(iterations).toBe(10);
  expect(listOfIndexes).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});
