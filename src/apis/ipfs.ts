import axios from 'axios';

export const uploadJsonToIpfs = (props: {}) => {
  return axios.post<{ cid: string }>('https://snft.ocg.technology/ipfs', props);
};
