import axios from 'axios';
import config from 'config';

export const uploadJsonToIpfs = (props: {}) => {
  return axios.post<{ cid: string }>('https://snft.ocg.technology/ipfs', props);
};

export const fetchIpfsJsonData = (ipfsCid: string) => {
  return axios.get(`${config.ipfsGatewayBaseUrl}${ipfsCid}`);
};
