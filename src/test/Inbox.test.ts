import assert from "assert";
import ganache from "ganache-cli";
import Web3 from "web3";

const web3 = new Web3(ganache.provider());

class Car {
  park() {
    return "stopped";
  }

  drive() {
    return "vroom";
  }
}

describe("Class", () => {
  const car = new Car();

  it("should stop when park() is called", () => {
    assert.strictEqual(car.park(), "stopped");
  });

  it("should drive when drive() is called", () => {
    assert.strictEqual(car.drive(), "vroom");
  });
});
