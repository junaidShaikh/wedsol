import { Buffer } from 'buffer';

const proposalData = (ipfsCid: string) => {
  let data = '';
  data += '\x00';
  data += ipfsCid;

  return Buffer.from(data, 'utf-8');
};

export default proposalData;
