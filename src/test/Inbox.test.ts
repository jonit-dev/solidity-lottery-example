import assert from "assert";
import { Contract } from "web3-eth-contract";
import { contractHelper } from "../libs/ContractHelper";

let inbox: Contract;

beforeEach(async () => {
  // deploy the contract
  inbox = await contractHelper.compileAndDeploy("Inbox", ["Hi there!"]);
});

describe("Inbox.sol", () => {
  it("deploys a contract", () => {
    // having an address confirms that the contract was deployed successfully
    assert.ok(inbox.options.address);
  });
});
