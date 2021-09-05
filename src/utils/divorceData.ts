import { Buffer } from 'buffer';

const divorceData = () => {
  const data = Buffer.alloc(64);
  data[0] = 6;
  return data;
};

export default divorceData;
