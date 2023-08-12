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
  token: '0xd80c6860D19238C06697554e18dE4E891EC48e70',
  admin: '0xC53Ea44bee323662ca8ce89540473cf39e4664aD',
  author: '0x299B2f9E249706c9c7F96EC9593447219392fd42',
  card: '0x1d6775426a4A0304FC2EFa22c2A1BCc57589c0e7',
  library: '0xfB5394b0521c4248a009f49207834d104d66648F',
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
  cid: string;
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
