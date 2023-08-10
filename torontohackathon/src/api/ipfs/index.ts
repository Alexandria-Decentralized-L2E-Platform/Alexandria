// IPFS Pinata API Gateway

// import config from "./config.js";
// import api from "api";
// import fs from "fs";

// const sdk = api('@pinata-cloud/v1.0#fc5xxr21ljszoswo');
// sdk.auth(config.JWT);

// interface IpinJSONtoIPFSResponseData {
//   IpfsHash: string,
//   PinSize: number,
//   Timestamp: string
// };

// const pinJSONtoIPFS = async(obj: object):Promise<IpinJSONtoIPFSResponseData> => {
//   const response = await sdk.postPinningPinjsontoipfs({
//     pinataContent: obj
//   });
//   await readJSONFromIPFS(response.data.IpfsHash);
//   return response.data
// };

// const pinFiletoIPFS = async(filePath: string):Promise<IpinJSONtoIPFSResponseData> => {
//   const fileStream = fs.createReadStream(filePath);
//   const response = await sdk.postPinningPinfiletoipfs({
//     file: fileStream
//   })
//   return response;
// }

export const readJSONFromIPFS = async(cid:string): Promise<any> => {
  const request = await fetch("https://gateway.pinata.cloud/ipfs/" + cid)
  return request;
};