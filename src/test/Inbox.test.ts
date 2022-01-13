import assert from "assert";
import { Contract } from "web3-eth-contract";
import { localNetworkHelper } from "../libs/LocalNetworkHelper";

let inbox: Contract;

beforeEach(async () => {
  // deploy the contract
  inbox = await localNetworkHelper.compileAndDeploy("Inbox", ["Hi there!"]);
});

describe("Inbox.sol", () => {
  it("deploys a contract", () => {
    // having an address confirms that the contract was deployed successfully
    assert.ok(inbox.options.address);
  });

  it("has a default message after creation", async () => {
    // call the message method and check that it returns the expected value
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, "Hi there!");
  });

  it("can change the message", async () => {
    await inbox.methods
      .setMessage("updated message")
      .send({ from: await localNetworkHelper.getTestingAccount() });

    const message = await inbox.methods.message().call();

    assert.strictEqual(message, "updated message");
  });
});
