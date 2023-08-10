// IPFS Pinata API Gateway

import { config } from './config';

interface IpinJSONtoIPFSResponseData {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export const pinJSONtoIPFS = async (obj: object): Promise<IpinJSONtoIPFSResponseData> => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer ' + config.JWT,
    },
    body: JSON.stringify({
      pinataContent: obj,
    }),
  };

  const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', options);
  return response.json();
};

export const readJSONFromIPFS = async (cid: string): Promise<any> => {
  const request = await fetch('https://gateway.pinata.cloud/ipfs/' + cid);
  return request;
};
