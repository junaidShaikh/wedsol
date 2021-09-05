import { PublicKey } from '@solana/web3.js';
import { Buffer } from 'buffer';

const getActualSigners = (pubKeys: Array<number[]>) => {
  return pubKeys.reduce((acc: string[], pubKey) => {
    if (!pubKey.every((value: number) => value === 0)) {
      return [...acc, new PublicKey(Buffer.from(pubKey)).toBase58()];
    }
    return acc;
  }, []);
};

export default getActualSigners;
