// IPFS Pinata API Gateway

const JWT = process.env.REACT_APP_IPFS_JWT;

export interface IpinJSONtoIPFSResponseData {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export interface IProgramObjectIPFS {
  duration: number;
  link: string;
  type: string;
  questions: string[];
}

export const pinProgramToIPFS = async (
  obj: IProgramObjectIPFS,
): Promise<IpinJSONtoIPFSResponseData> => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer ' + JWT,
    },
    body: JSON.stringify({
      pinataContent: obj,
    }),
  };

  const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', options);
  return response.json();
};

export const readProgramFromIPFS = async (cid: string): Promise<IProgramObjectIPFS> => {
  const request = await fetch('https://gateway.pinata.cloud/ipfs/' + cid);
  return await request.json();
};
