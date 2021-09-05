import { Buffer } from 'buffer';

const marriageData = () => {
  const data = Buffer.alloc(64);
  data[0] = 8;
  return data;
};

export default marriageData;
