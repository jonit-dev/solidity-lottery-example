import fs from "fs";
import path from "path";
import solc from "solc";
import { ISolcSmartContract } from "../@types/solidity/solcTypes";

export class ContractHelper {
  public compile(contractName: string): ISolcSmartContract {
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
}
