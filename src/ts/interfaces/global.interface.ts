export interface AppConfig {
  apiBaseUrl: string;
  programId: string;
  solanaNetwork: 'mainnet-beta' | 'testnet' | 'devnet';
  ipfsGatewayBaseUrl: string;
  generateSolanaExplorerBaseUrl: (transaction: string) => string;
}
