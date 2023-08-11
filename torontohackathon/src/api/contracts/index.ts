import { ethers } from 'ethers';

import {
  AlexLibraryCard,
  AlexLibraryCard__factory,
  AlexLibrary,
  AlexLibrary__factory,
  // AlexCertificate,
  // AlexCertificate__factory,
  // AlexAdmin,
  // AlexAdmin__factory,
  // AlexAuthor,
  // AlexAuthor__factory,
  ERC20,
  ERC20__factory,
} from './typechain';

export interface AlexAddresses {
  token: string;
  admin: string;
  author: string;
  card: string;
  library: string;
}

export const alexAddresses: AlexAddresses = {
  token: '0x75e11567d3AfA9650d8BA16fE58eae425B030c24',
  admin: '0xDe55169E415e0f6363B753B22482e45Ef47eE46a',
  author: '0x393EF091452D6670cb528B5e40413C97E5761014',
  card: '0x57dA19c786B5D1F9A47580f4f1befF316E893fe3',
  library: 'xdc7826b028A4fBD1afA8F1BcA30F4d697182b0E99d',
};

// Tokens

export const getTokenBalance = async (
  provider: ethers.providers.Web3Provider,
  tokenAddress: string,
): Promise<string> => {
  const token = new ethers.Contract(tokenAddress, ERC20__factory.abi, provider) as ERC20;
  const balance = await token.balanceOf(await provider.getSigner().getAddress());
  const decimals = await token.decimals();
  return ethers.utils.formatUnits(balance, decimals);
};

export const getTokenAllowance = async (
  provider: ethers.providers.Web3Provider,
  tokenAddress: string,
  spenderAddress: string,
): Promise<string> => {
  const token = new ethers.Contract(tokenAddress, ERC20__factory.abi, provider) as ERC20;
  const allowance = await token.allowance(await provider.getSigner().getAddress(), spenderAddress);
  const decimals = await token.decimals();
  return ethers.utils.formatUnits(allowance, decimals);
};

export const approveToken = async (
  provider: ethers.providers.Web3Provider,
  tokenAddress: string,
  spenderAddress: string,
  amount: number,
): Promise<ethers.ContractTransaction> => {
  const token = new ethers.Contract(tokenAddress, ERC20__factory.abi, provider) as ERC20;
  const decimals = await token.decimals();
  const trx = await token.approve(spenderAddress, ethers.utils.formatUnits(amount, decimals));
  return trx;
};

// Library Card

export const hasLibraryCard = async (provider: ethers.providers.Web3Provider): Promise<boolean> => {
  const card = new ethers.Contract(
    alexAddresses.admin,
    AlexLibraryCard__factory.abi,
    provider,
  ) as AlexLibraryCard;
  const balance = await card.balanceOf(await provider.getSigner().getAddress());
  return balance.gt(0);
};

export const mintLibraryCard = async (
  provider: ethers.providers.Web3Provider,
): Promise<ethers.ContractTransaction> => {
  const card = new ethers.Contract(
    alexAddresses.admin,
    AlexLibraryCard__factory.abi,
    provider,
  ) as AlexLibraryCard;
  const trx = await card.safeMint(await provider.getSigner().getAddress());
  return trx;
};

// Library

export interface IProgram {
  id: ethers.BigNumber;
  owner: string;
  title: string;
  contentURI: string;
  questionCID: string;
  certificate: string;
  reward: {
    rewardToken: string;
    rewardAddressCap: string;
    rewardPerAddress: string;
    rewardDistributed: string;
  };
}

export const getProgram = async (
  provider: ethers.providers.Web3Provider,
  id: number,
): Promise<IProgram> => {
  const lib = new ethers.Contract(
    alexAddresses.admin,
    AlexLibrary__factory.abi,
    provider,
  ) as AlexLibrary;
  const response = await lib.programs(id);
  const token = new ethers.Contract(
    response.reward.rewardToken,
    ERC20__factory.abi,
    provider,
  ) as ERC20;
  const decimals = await token.decimals();
  const program: IProgram = {
    ...response,
    reward: {
      rewardToken: response.reward.rewardToken,
      rewardAddressCap: ethers.utils.formatUnits(response.reward.rewardAddressCap, decimals),
      rewardDistributed: ethers.utils.formatUnits(response.reward.rewardDistributed, decimals),
      rewardPerAddress: ethers.utils.formatUnits(response.reward.rewardPerAddress, decimals),
    },
  };
  return program;
};

export const getNumberOfPrograms = async (
  provider: ethers.providers.Web3Provider,
): Promise<number> => {
  const lib = new ethers.Contract(
    alexAddresses.admin,
    AlexLibrary__factory.abi,
    provider,
  ) as AlexLibrary;
  const counter = await lib.programCounter();
  return counter.toNumber();
};

export const getAllProgramsOnContract = async (
  provider: ethers.providers.Web3Provider,
): Promise<IProgram[]> => {
  const lib = new ethers.Contract(
    alexAddresses.admin,
    AlexLibrary__factory.abi,
    provider,
  ) as AlexLibrary;
  const counter = await lib.programCounter();
  const programs: IProgram[] = [];
  for (let i = 0; i < counter.toNumber(); i++) {
    programs.push(await getProgram(provider, i));
  }
  const result = await Promise.all(programs);

  return result;
};

export const learnProgram = async (
  provider: ethers.providers.Web3Provider,
  id: number,
  answers: string[],
): Promise<ethers.ContractTransaction> => {
  const lib = new ethers.Contract(
    alexAddresses.admin,
    AlexLibrary__factory.abi,
    provider,
  ) as AlexLibrary;
  const trx = await lib.learnProgram(id, answers);
  return trx;
};

export const rateProgram = async (
  provider: ethers.providers.Web3Provider,
  id: number,
  rate: number,
): Promise<ethers.ContractTransaction> => {
  const lib = new ethers.Contract(
    alexAddresses.admin,
    AlexLibrary__factory.abi,
    provider,
  ) as AlexLibrary;
  const trx = await lib.rateProgram(id, rate);
  return trx;
};
