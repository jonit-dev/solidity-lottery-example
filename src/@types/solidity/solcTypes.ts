export interface ISolcSmartContract {
  assembly: {
    ".code": Object[];
  };
  bytecode: string;
  functionHashes: {
    [s: string]: string;
  };
  gasEstimates: {
    creation: any;
    external: any;
    internal: any;
  };
  interface: string;
  metadata: {
    [s: string]: any;
  };
  opcodes: string[];
  schemaVersion: string;
  runtimeBytecode: string;
  sourcemap: string;
  sourcemapRuntime: string;
}
