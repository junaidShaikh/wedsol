import { AppConfig } from 'ts/interfaces/global.interface';

const prodConfig: AppConfig = {
  apiBaseUrl: 'https://snft.ocg.technology/',
  programId: 'gAp5HRjYDHYFRbtdhWfU5aqS6tWnipSMKb2UYBoEJDt',
  solanaNetwork: 'devnet',
  ipfsGatewayBaseUrl: 'https://snft.ocg.technology/ipfs/',
  generateSolanaExplorerBaseUrl: (transaction: string) =>
    `https://explorer.solana.com/tx/${transaction}?cluster=mainnet-beta`,
};

const stagingConfig: AppConfig = {
  apiBaseUrl: 'https://snft.ocg.technology/',
  programId: 'gAp5HRjYDHYFRbtdhWfU5aqS6tWnipSMKb2UYBoEJDt',
  solanaNetwork: 'devnet',
  ipfsGatewayBaseUrl: 'https://snft.ocg.technology/ipfs/',
  generateSolanaExplorerBaseUrl: (transaction: string) =>
    `https://explorer.solana.com/tx/${transaction}?cluster=devnet`,
};

const localConfig: AppConfig = {
  apiBaseUrl: 'https://snft.ocg.technology/',
  programId: 'gAp5HRjYDHYFRbtdhWfU5aqS6tWnipSMKb2UYBoEJDt',
  solanaNetwork: 'devnet',
  ipfsGatewayBaseUrl: 'https://snft.ocg.technology/ipfs/',
  generateSolanaExplorerBaseUrl: (transaction: string) =>
    `https://explorer.solana.com/tx/${transaction}?cluster=devnet`,
};

export default (function () {
  switch (process.env.REACT_APP_ENV) {
    case 'production':
      return prodConfig;

    case 'staging':
      return stagingConfig;

    case 'local':
    default:
      return localConfig;
  }
})();
