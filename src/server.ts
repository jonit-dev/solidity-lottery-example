import express from "express";
import { TestNetwork } from "./@types/networkTypes";
import { TestNetworkHelper } from "./libs/TestNetworkHelper";
import { serverRouter } from "./resources/server/server.routes";

const app = express();

const port = process.env.PORT || 5000;

// Middlewares ========================================

app.use(serverRouter);

const server = app.listen(port, () => {
  console.log(`⚙️ Server running on port ${port}`);

  (async () => {
    const testNetworkHelper = new TestNetworkHelper(TestNetwork.Rinkeby);

    await testNetworkHelper.compileAndDeployTestNetwork("Inbox", [
      "Hello World!",
    ]);
  })();
});
