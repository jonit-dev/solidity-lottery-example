declare module "solc" {
  function compile(source: string, qty: number): any;
}

declare module "ganache-cli" {
  function provider(): any;
}
