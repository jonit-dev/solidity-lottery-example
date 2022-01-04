import fs from "fs";
import path from "path";
import solc from "solc";

const __dirname = path.resolve();

for (let i = 2; i < process.argv.length; i++) {
  console.log(`⚙️ Compiling ${process.argv[i]} contract...`);

  const inboxPath = path.resolve(
    __dirname,
    "src",
    "contracts",
    process.argv[i]
  );
  const source = fs.readFileSync(inboxPath, "utf8");

  const result = solc.compile(source, 1); // 1 is the number of contracts to compile

  console.log(result);
}
