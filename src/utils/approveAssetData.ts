import { Buffer } from 'buffer';

const approveAssetData = (ipfsCid: string) => {
  let data = '';
  data += '\x03';
  data += ipfsCid;

  return Buffer.from(data, 'utf-8');
};

export default approveAssetData;
