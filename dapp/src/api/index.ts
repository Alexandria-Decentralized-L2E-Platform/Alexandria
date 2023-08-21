import * as ipfs from './ipfs';
import * as contracts from './contracts';
import * as blockchain from './blockchain';

// Program interface
export interface IProgram extends contracts.IProgram, ipfs.IProgramObjectIPFS {}

// Return a Program Object
const getProgramById = async (id: number): Promise<IProgram> => {
  // Get Data from contract
  const programFromContracts = await contracts.getProgram(id);
  // Get Data from ipfs
  const programFromIPFS = await ipfs.readProgramFromIPFS(programFromContracts.cid);
  const program = {
    ...programFromContracts,
    ...programFromIPFS,
  };
  return program;
};

// Retrun all program
const getAllPrograms = async (): Promise<IProgram[]> => {
  if (!window.ethereum) return [];
  const counter = await contracts.getNumberOfPrograms();
  const programs: IProgram[] = [];
  for (let i = 1; i < counter + 1; i++) {
    programs.push(await getProgramById(i));
  }
  const result = await Promise.all(programs);
  return result;
};

enum topic {
  Layer1Blockchain = 'Layer1 Blockchain',
  Layer2Blockchain = 'Layer2 Blockchain',
  DAOCommunity = 'DAO / Community',
  NFT = 'NFT',
  Deif = 'Deif',
  Gamefi = 'Gamefi',
  Metaverse = 'Metaverse',
  X2Earn = 'X-2-Earn',
  MusicNFT = 'Music NFT',
  InfraAPI = 'Infra / API',
  Crosschain = 'Crosschain',
}

enum type {
  Video = 'Video',
  Article = 'Article',
}

export { ipfs, contracts, blockchain, getProgramById, getAllPrograms, topic, type };
