import { TestNetwork } from "../@types/networkTypes";
import { appEnv } from "./envConstants";

export const testNetworkEndpoints = {
  [TestNetwork.Rinkeby]: appEnv.infura.rinkebyEndpoint,
  [TestNetwork.Ropsten]: "",
  [TestNetwork.Kovan]: "",
  [TestNetwork.Goerli]: "",
  [TestNetwork.Localhost]: "",
};
