import { PublicKey } from '@solana/web3.js';

import config from 'config';
import { getProvider } from 'utils/getProvider';

const getPubKeyFromSeed = async () => {
  const provider = getProvider();

  const programIdPublicKey = new PublicKey(config.programId);

  const derivedPubKey = await PublicKey.createWithSeed(provider?.publicKey as PublicKey, 'hello', programIdPublicKey);

  return derivedPubKey;
};

export default getPubKeyFromSeed;
