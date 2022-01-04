import fs from "fs";

class FileSystemHelper {
  public readAllFromDirectory(directoryPath: string) {
    fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      //listing all files using forEach

      const output: string[] = [];

      files.forEach(function (file) {
        // Do whatever you want to do with the file
        output.push(file);
      });

      return output;
    });
  }
}

const fileSystemHelper = new FileSystemHelper();

export { fileSystemHelper };
