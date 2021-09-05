import { Buffer } from 'buffer';

const extraData = (ipfsCid: string) => {
  let data = '';
  data += '\x09';
  data += ipfsCid;

  return Buffer.from(data, 'utf-8');
};

export default extraData;
