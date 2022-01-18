import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import { TestNetwork } from "../@types/networkTypes";
import { appEnv } from "../constants/envConstants";
import { testNetworkEndpoints } from "../constants/networkConstants";
import { contractHelper } from "./ContractHelper";

export class TestNetworkHelper {
  private web3: Web3;
  private provider: HDWalletProvider;
  private endpoint: string;

  constructor(testNetwork: TestNetwork) {
    this.endpoint = testNetworkEndpoints[testNetwork]!;
    this.provider = new HDWalletProvider(
      appEnv.metamask.mnemonic!,
      this.endpoint
    );
    this.web3 = new Web3(this.provider);
  }

  private async getAccounts() {
    return this.web3.eth.getAccounts();
  }

  public async compileAndDeployTestNetwork(contractName: string, args: any[]) {
    const { interface: interfaceName, bytecode } =
      contractHelper.compile(contractName);

    const accounts = await this.getAccounts();
    console.log("Deploying to test network from account: ", accounts[0]);

    const result = await new this.web3.eth.Contract(JSON.parse(interfaceName))
      .deploy({
        data: bytecode,
        arguments: args,
      })
      .send({ gas: 1000000, from: accounts[0] });

    console.log("Contract deployed to ", result.options.address);

    this.provider.engine.stop();
  }
}
