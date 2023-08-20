import { ethers } from 'ethers';
import * as ipfs from './ipfs';
import * as contracts from './contracts';
import * as blockchain from './blockchain';

// Program interface
export interface IProgram extends contracts.IProgram, ipfs.IProgramObjectIPFS {}

// Return a Program Object
const getProgramById = async (
  provider: ethers.providers.Web3Provider,
  id: number,
): Promise<IProgram> => {
  // Get Data from contract
  const programFromContracts = await contracts.getProgram(provider, id);
  // Get Data from ipfs
  const programFromIPFS = await ipfs.readProgramFromIPFS(programFromContracts.cid);
  const program = {
    ...programFromContracts,
    ...programFromIPFS,
  };
  console.log(program, provider);
  return program;
};

// Retrun all program
const getAllPrograms = async (provider: ethers.providers.Web3Provider): Promise<IProgram[]> => {
  if (!window.ethereum) return [];
  const counter = await contracts.getNumberOfPrograms(provider);
  const programs: IProgram[] = [];
  for (let i = 1; i < counter + 1; i++) {
    programs.push(await getProgramById(provider, i));
  }
  const result = await Promise.all(programs);
  return result;
};

export { ipfs, contracts, blockchain, getProgramById, getAllPrograms };
