import { Buffer } from 'buffer';

const addAssetData = (ipfsCid: string) => {
  let data = '';
  data += '\x02';
  data += ipfsCid;

  return Buffer.from(data, 'utf-8');
};

export default addAssetData;
