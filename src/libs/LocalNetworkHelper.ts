import ganache from "ganache-cli";
import Web3 from "web3";
import { PromiEvent } from "web3-core";
import { Contract } from "web3-eth-contract";
import { ContractHelper } from "./ContractHelper";

class LocalNetworkHelper {
  public testingAccounts: Promise<string[]>;
  private contractHelper: ContractHelper;
  private web3: Web3 = new Web3(ganache.provider());

  constructor() {
    this.contractHelper = new ContractHelper();
    this.testingAccounts = this.web3.eth.getAccounts();
  }

  public async compileAndDeploy(
    contractName: string,
    args: any[] = []
  ): Promise<PromiEvent<Contract>> {
    const compiledContract = this.contractHelper.compile(contractName);

    return this.deploy(
      compiledContract.bytecode,
      compiledContract.interface,
      args
    );
  }

  public async getTestingAccount(): Promise<string> {
    const accounts = await this.testingAccounts;
    return accounts[0];
  }

  private async deploy(
    bytecode: string,
    itrf: string,
    args: any[] = [],
    gas = 1000000
  ): Promise<PromiEvent<Contract>> {
    return new this.web3.eth.Contract(JSON.parse(itrf))
      .deploy({ data: bytecode, arguments: args })
      .send({ from: await this.getTestingAccount(), gas });
  }
}

const localNetworkHelper = new LocalNetworkHelper();

export { localNetworkHelper };
