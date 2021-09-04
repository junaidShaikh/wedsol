import { proxy } from 'valtio';
import { Connection, clusterApiUrl } from '@solana/web3.js';

import config from 'config';

const NETWORK = clusterApiUrl(config.solanaNetwork);

let connection: Connection;

interface State {
  isWalletConnected: boolean;
  walletAddress: string;
  autoApprove: boolean;
  connection: Connection;
  proposalInfo: {
    isLoading: boolean;
    isSuccess: boolean;
    error: any;
    data: {
      message: string;
      proposerName: string;
      ring: string;
      spouseName: string;
    } | null;
  };
}

const state = proxy<State>({
  isWalletConnected: false,
  walletAddress: '',
  autoApprove: false,
  connection: getConnection(),
  proposalInfo: {
    isLoading: true,
    isSuccess: false,
    error: null,
    data: null,
  },
});

function getConnection(): Connection {
  if (connection) {
    return connection;
  }
  connection = new Connection(NETWORK);
  return connection;
}

export { state };
