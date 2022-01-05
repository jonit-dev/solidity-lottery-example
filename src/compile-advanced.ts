import fs from "fs";
import path from "path";
import solc from "solc";
import { fileSystemHelper } from "./libs/FileSystemHelper";

const __dirname = path.resolve();

function compile(contractName: string) {
  console.log(`💡 Compiling ${contractName}...`);

  const contractPath = path.resolve(
    __dirname,
    "src",
    "contracts",
    contractName
  );
  const source = fs.readFileSync(contractPath, "utf8");

  const result = solc.compile(source, 1);

  return result;
}

if (process.argv[2] === "all") {
  console.log(`⚙️ Compiling all contracts contract...`);

  const contracts = fileSystemHelper.readAllFromDirectory("src/contracts");

  for (const contract of contracts) {
    const output = compile(contract);
    console.log(output);
  }
} else {
  // compile contracts listed in process.argv
  for (let i = 2; i < process.argv.length; i++) {
    const result = compile(process.argv[i]);

    console.log(result);
  }
}
