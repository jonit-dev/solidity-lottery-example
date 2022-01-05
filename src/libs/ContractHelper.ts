import fs from "fs";
import path from "path";
import solc from "solc";

class ContractHelper {
  public compile(contractName: string): any {
    const contractPath = path.resolve(
      __dirname,
      "contracts",
      `${contractName}.sol`
    );
    const source = fs.readFileSync(contractPath, "utf8");

    const compiledContract = solc.compile(source, 1).contracts[
      `:${contractName}`
    ];

    return compiledContract;
  }
}

const contractHelper = new ContractHelper();

export { contractHelper };
