import { Buffer } from 'buffer';

const weddingData = () => {
  const data = Buffer.alloc(64);
  data[0] = 1;

  return data;
};

export default weddingData;
