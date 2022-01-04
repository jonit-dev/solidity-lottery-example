import fs from "fs";
import path from "path";

const __dirname = path.resolve();
class FileSystemHelper {
  public readAllFromDirectory(directoryPath: string) {
    console.log(__dirname);
    const result = fs.readdirSync(__dirname + "/" + directoryPath, "utf8");

    return result;
  }
}

const fileSystemHelper = new FileSystemHelper();

export { fileSystemHelper };
