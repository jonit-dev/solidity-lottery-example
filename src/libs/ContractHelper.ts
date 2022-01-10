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

  private async getTestingAccounts(): Promise<string[]> {
    return await web3.eth.getAccounts();
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
    const accounts = await this.getTestingAccounts();

    return new web3.eth.Contract(JSON.parse(itrf))
      .deploy({ data: bytecode, arguments: args })
      .send({ from: accounts[0], gas });
  }
}

const contractHelper = new ContractHelper();

export { contractHelper };
