import { Connection, clusterApiUrl } from '@solana/web3.js';

import config from 'config';

const NETWORK = clusterApiUrl(config.solanaNetwork);

const getConnection = () => new Connection(NETWORK);

export default getConnection;
