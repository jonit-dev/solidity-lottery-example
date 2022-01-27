declare module "solc" {
  function compile(data: string): any;
}

declare module "ganache-cli" {
  function provider(): any;
}
