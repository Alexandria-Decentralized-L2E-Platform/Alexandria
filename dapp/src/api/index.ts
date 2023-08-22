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

enum duration {
  From0To30 = '0 - 30 mins',
  From30To60 = '30 - 60 mins',
  From60To120 = '1 - 2 hrs',
  Above120 = 'Above 2 hrs',
}

const createProgram = async (
  provider: ethers.providers.Web3Provider,
  ipfsProgram: ipfs.IProgramObjectIPFS,
  contractProgram: contracts.INewProgram,
): Promise<ethers.ContractReceipt> => {
  // Pin to IPFS
  const pinnedObject: ipfs.IpinJSONtoIPFSResponseData = await ipfs.pinProgramToIPFS(ipfsProgram);
  if (pinnedObject.IpfsHash) console.log(pinnedObject);
  // Wrtie into Smart Contracts
  contractProgram._cid = pinnedObject.IpfsHash;
  const response: ethers.ContractReceipt = await contracts.createNewProgram(
    provider,
    contractProgram,
  );
  return response;
};

const validateData = (
  ipfsProgram: ipfs.IProgramObjectIPFS,
  contractProgram: contracts.INewProgram,
): { isValid: boolean; err: string } => {
  let isValid = true;
  let err = '';

  // Check IPFS
  Object.keys(ipfsProgram).every((k) => {
    const value = ipfsProgram[k];
    if (typeof value === 'string') {
      if (value == '') {
        isValid = false;
        err = k + ' is missing.';
        return false;
      } else {
        return true;
      }
    } else if (typeof value === 'number') {
      if (value == 0) {
        isValid = false;
        err = k + ' is missing.';
        return false;
      } else {
        return true;
      }
    } else {
      // Check questions
      const questions: { title: string; choices: string[] }[] = value;
      let hasError = false;
      questions.forEach((q, i) => {
        if (hasError) return false;
        let hasErrorInOption = false;
        if (q.title === '') {
          isValid = false;
          hasError = true;
          err = k + ' ' + (i + 1) + ' title is missing.';
          return false;
        }
        q.choices.forEach((v, i2) => {
          if (hasErrorInOption) return false;
          if (v === '') {
            hasErrorInOption = true;
            hasError = true;
            isValid = false;
            err = k + ' ' + (i + 1) + ' option ' + (i2 + 1) + ' is missing.';
            return false;
          } else {
            return true;
          }
        });
        return !hasError;
      });
      return true;
    }
  });

  // Check Contracts
  if (isValid && contractProgram._title === '') {
    return {
      isValid: false,
      err: 'Title is missing.',
    };
  }

  if (isValid) {
    Object.keys(contractProgram._reward).every((k) => {
      if (contractProgram._reward[k] == '') {
        isValid = false;
        err = k + ' is missing.';
        return false;
      }
    });
  }

  if (isValid) {
    contractProgram._answers.every((v, i) => {
      if (v == '') {
        isValid = false;
        err = 'Answer ' + (i + 1) + ' is missing.';
        return false;
      }
    });
  }

  return {
    isValid,
    err,
  };
};

export {
  blockchain,
  contracts,
  ipfs,
  getAllPrograms,
  getCertsByOwner,
  getProgramById,
  createProgram,
  validateData,
  topic,
  type,
  duration,
};
