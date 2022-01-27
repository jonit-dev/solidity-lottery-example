import fs from "fs";
import path from "path";
import solc from "solc";
import { IContractData } from "../@types/solidity/smartContractTypes";

export class ContractHelper {
  public compile(contractName: string): IContractData {
    const contractFullName = `${contractName}.sol`;

    const contractPath = path.resolve(
      __dirname,
      "../contracts",
      contractFullName
    );

    // read contract source code and compile it through solc compiler.

    const source = fs.readFileSync(contractPath, "utf8");

    const input = {
      language: "Solidity",
      sources: {
        [contractFullName]: {
          content: source,
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    };

    const compiledContract = JSON.parse(solc.compile(JSON.stringify(input)))
      .contracts[contractFullName][contractName];

    return compiledContract;
  }
}

export const contractHelper = new ContractHelper();
