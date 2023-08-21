import * as blockchain from './blockchain';
import * as contracts from './contracts';
import * as ipfs from './ipfs';
import { ethers } from 'ethers';

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

interface ICert extends IProgram {
  completionDate: string;
}

const getCertsByOwner = async (provider: ethers.providers.Web3Provider): Promise<ICert[]> => {
  const certs = await contracts.completedProgramByAddress(provider);
  const programs: ICert[] = [];
  await Promise.all(
    certs.map(async (c) => {
      const program = await getProgramById(c);
      const completionDate = await contracts.getCertCompletionDate(provider, program.certificate);
      programs.push({ ...program, completionDate });
    }),
  );
  return programs;
};

enum topic {
  Blockchain = 'Blockchain',
  DAOCommunity = 'DAO / Community',
  Defi = 'Defi',
  Metaverse = 'Metaverse',
  Infrastructure = 'Infrastructure',
  Other = 'Other',
}

enum type {
  Video = 'Video',
  Article = 'Article',
}

export {
  blockchain,
  contracts,
  ipfs,
  getAllPrograms,
  getCertsByOwner,
  getProgramById,
  topic,
  type,
};
