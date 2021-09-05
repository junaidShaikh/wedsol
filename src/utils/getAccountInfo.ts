import { PublicKey } from '@solana/web3.js';
import getConnection from './getConnection';

const getAccountInfo = async (accountPubKey: PublicKey) => {
  const connection = getConnection();

  const accountInfo = await connection.getAccountInfo(accountPubKey);

  if (accountInfo === null) {
    throw new Error('Error: account not found');
  }

  const endPoint = accountInfo.data.indexOf(0);
  const result = JSON.parse(accountInfo.data.slice(0, endPoint).toString());

  return result;
};

export default getAccountInfo;
