import assert from "assert";
import web3 from "web3";
import { Contract } from "web3-eth-contract";
import { localNetworkHelper } from "../libs/LocalNetworkHelper";

let Lottery: Contract;
let testingAccount: string;
let testingAccounts: string[];

before(async () => {
  // deploy the contract
  Lottery = await localNetworkHelper.compileAndDeploy("Lottery");
  testingAccounts = await localNetworkHelper.getTestingAccounts();
  testingAccount = testingAccounts[0];
});

describe("Lottery.sol", () => {
  it("deploys a contract", () => {
    // having an address confirms that the contract was deployed successfully
    assert.ok(Lottery.options.address);
  });

  it("has a manager address, once created", async () => {
    const manager = await Lottery.methods.manager().call();
    assert.ok(manager);
    assert.strictEqual(manager, await localNetworkHelper.getTestingAccount());
  });

  it("allows players to enter the prize pool, with > 0.01 ETH fee", async () => {
    await enterLottery(testingAccount);

    const players = await Lottery.methods.getPlayers().call();

    const hasPlayer = players.includes(testingAccount);

    // assert hasPlayer is true

    assert.ok(hasPlayer);
  });

  it("allows multiple accounts to enter the smart contract", async () => {
    const testingAccounts = await localNetworkHelper.getTestingAccounts();

    const acc1 = testingAccounts[0];
    const acc2 = testingAccounts[1];

    await enterLottery(acc1);
    await enterLottery(acc2);

    const players = await Lottery.methods.getPlayers().call();

    const hasPlayer = players.includes(acc1);
    const hasPlayer2 = players.includes(acc2);

    assert.ok(hasPlayer);
    assert.ok(hasPlayer2);
  });

  it("should fail the transaction, if we dont pay the enough fee", async () => {
    await assert.rejects(enterLottery(testingAccount, "0.00001"));
  });

  it("should throw an error is other person except the manager tries to call pickWinner", async () => {
    const manager = testingAccounts[0];
    const nonManager = testingAccounts[1];

    await enterLottery(manager);
    await enterLottery(nonManager);

    await assert.rejects(
      Lottery.methods.pickWinner().send({
        from: nonManager,
        gas: 1000000,
      })
    );
  });

  it("a manager should be able to run pickWinner without issues", async () => {
    const manager = testingAccount;

    await assert.doesNotReject(
      Lottery.methods.pickWinner().send({
        from: manager,
        gas: 1000000,
      })
    );
  });
});

const enterLottery = async (
  account: string,
  ticketFee: string = "0.011"
): Promise<void> => {
  await Lottery.methods.enter().send({
    from: account,
    value: web3.utils.toWei(ticketFee, "ether"),
    gas: 1000000,
  });
};
