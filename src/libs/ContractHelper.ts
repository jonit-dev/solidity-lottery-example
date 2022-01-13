import fs from "fs";
import ganache from "ganache-cli";
import path from "path";
import solc from "solc";
import Web3 from "web3";
import { PromiEvent } from "web3-core";
import { Contract } from "web3-eth-contract";
import { ISolcSmartContract } from "../@types/solidity/solcTypes";

const web3 = new Web3(ganache.provider());
class ContractHelper {
  public testingAccounts: Promise<string[]>;

  constructor() {
    this.testingAccounts = web3.eth.getAccounts();
  }

  public async compileAndDeploy(
    contractName: string,
    args: any[] = []
  ): Promise<PromiEvent<Contract>> {
    const compiledContract = this.compile(contractName);

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

  private compile(contractName: string): ISolcSmartContract {
    const contractPath = path.resolve(
      __dirname,
      "../contracts",
      `${contractName}.sol`
    );
    const source = fs.readFileSync(contractPath, "utf8");

    const compiledContract = solc.compile(source, 1).contracts[
      `:${contractName}`
    ];

    return compiledContract as ISolcSmartContract;
  }

  private async deploy(
    bytecode: string,
    itrf: string,
    args: any[] = [],
    gas = 1000000
  ): Promise<PromiEvent<Contract>> {
    return new web3.eth.Contract(JSON.parse(itrf))
      .deploy({ data: bytecode, arguments: args })
      .send({ from: await this.getTestingAccount(), gas });
  }
}

const contractHelper = new ContractHelper();

export { contractHelper };
