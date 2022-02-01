import ganache from "ganache-cli";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { Evm } from "../@types/solidity/smartContractTypes";
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
  ): Promise<Contract> {
    const { abi, evm } = this.contractHelper.compile(contractName);

    return this.deploy(abi, evm, args);
  }

  public async getTestingAccount(): Promise<string> {
    const accounts = await this.testingAccounts;
    return accounts[0];
  }

  public async getTestingAccounts(): Promise<string[]> {
    return await this.testingAccounts;
  }

  private async deploy(
    abi: any,
    evm: Evm,
    args: any[] = [],
    gas = 1000000
  ): Promise<Contract> {
    return new this.web3.eth.Contract(abi)
      .deploy({ data: evm.bytecode.object, arguments: args })
      .send({
        from: await this.getTestingAccount(),
        gas,
      }) as unknown as Contract;
  }
}

const localNetworkHelper = new LocalNetworkHelper();

export { localNetworkHelper };
