import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import { TestNetwork } from "../@types/networkTypes";
import { appEnv } from "../constants/envConstants";
import { testNetworkEndpoints } from "../constants/networkConstants";

class TestNetworkHelper {
  private web3: Web3;

  constructor(testNetwork: TestNetwork) {
    const endpoint = testNetworkEndpoints[testNetwork];
    const provider = new HDWalletProvider(appEnv.metamask.mnemonic!, endpoint);
    this.web3 = new Web3(provider);
  }

  private async getAccounts() {
    return this.web3.eth.getAccounts();
  }

  public async deployTestNetwork(testNetwork: TestNetwork) {
    const accounts = this.getAccounts();
  }
}
