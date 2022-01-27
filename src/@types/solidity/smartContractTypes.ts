export interface ICompiledSmartContract {
  errors: Error[];
  sources: Sources;
  contracts: Contracts;
}

export interface Contracts {
  "sourceFile.sol": ContractsSourceFileSol;
}

export interface ContractsSourceFileSol {
  ContractName: IContractData;
}

export interface IContractData {
  abi: any[];
  metadata: string;
  userdoc: AST;
  devdoc: AST;
  ir: string;
  storageLayout: StorageLayout;
  evm: Evm;
  ewasm: Ewasm;
}

export interface AST {}

export interface Evm {
  assembly: string;
  legacyAssembly: AST;
  bytecode: Bytecode;
  deployedBytecode: DeployedBytecode;
  methodIdentifiers: MethodIdentifiers;
  gasEstimates: GasEstimates;
}

export interface Bytecode {
  functionDebugData: FunctionDebugData;
  object: string;
  opcodes: string;
  sourceMap: string;
  generatedSources: GeneratedSource[];
  linkReferences: LinkReferences;
}

export interface FunctionDebugData {
  "@mint_13": Mint13;
}

export interface Mint13 {
  entryPoint: number;
  id: number;
  parameterSlots: number;
  returnSlots: number;
}

export interface GeneratedSource {
  ast: AST;
  contents: string;
  id: number;
  language: string;
  name: string;
}

export interface LinkReferences {
  "libraryFile.sol": LibraryFileSol;
}

export interface LibraryFileSol {
  Library1: The3[];
}

export interface The3 {
  start: number;
  length: number;
}

export interface DeployedBytecode {
  immutableReferences: ImmutableReferences;
}

export interface ImmutableReferences {
  "3": The3[];
}

export interface GasEstimates {
  creation: Creation;
  external: MethodIdentifiers;
  internal: Internal;
}

export interface Creation {
  codeDepositCost: string;
  executionCost: string;
  totalCost: string;
}

export interface MethodIdentifiers {
  "delegate(address)": string;
}

export interface Internal {
  "heavyLifting()": string;
}

export interface Ewasm {
  wast: string;
  wasm: string;
}

export interface StorageLayout {
  storage: any[];
  types: AST;
}

export interface Error {
  sourceLocation: SourceLocation;
  secondarySourceLocations: SourceLocation[];
  type: string;
  component: string;
  severity: string;
  errorCode: string;
  message: string;
  formattedMessage: string;
}

export interface SourceLocation {
  file: string;
  start: number;
  end: number;
  message?: string;
}

export interface Sources {
  "sourceFile.sol": SourcesSourceFileSol;
}

export interface SourcesSourceFileSol {
  id: number;
  ast: AST;
}
