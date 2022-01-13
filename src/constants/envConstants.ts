export const appEnv = {
  infura: {
    rinkebyEndpoint: process.env.INFURA_RINKEBY_ENDPOINT,
    project: {
      secret: process.env.INFURA_PROJECT_SECRET,
      id: process.env.INFURA_PROJECT_ID,
    },
  },
  metamask: {
    account: process.env.METAMASK_ACCOUNT,
    mnemonic: process.env.METAMASK_MNEMONIC,
  },
};
