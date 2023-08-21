import { ethers, BigNumber } from 'ethers';
import { ReadProvider } from '../blockchain';

import {
  AlexLibraryCard,
  AlexLibraryCard__factory,
  AlexLibrary,
  AlexLibrary__factory,
  // AlexCertificate,
  // AlexCertificate__factory,
  AlexAdmin,
  AlexAdmin__factory,
  AlexAuthor,
  AlexAuthor__factory,
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
  token: '0x1ACfE3aE4bD19A0cb93BA955523F455FBd82127C',
  admin: '0x2aa4465aF5db82AdF07795Be850e4CbC28493DEb',
  author: '0x4c1dAD8f068203174A79dFb533B6B93e757080bb',
  card: '0xd9ECd74F8779B6AE77b2FA715572302D82DBed2f',
  library: '0xcFda440f35138382682120aA58989fbA4e4bf26d',
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

export interface ICard {
  contractAddress: string;
  tokenId: number;
  userAddress: string;
  mintedAt: string;
}

export const getLibraryCardDetail = async (
  provider: ethers.providers.Web3Provider,
): Promise<ICard> => {
  // Sample Data
  return {
    contractAddress: alexAddresses.card,
    userAddress: '0xDe55169E415e0f6363B753B22482e45Ef47eE46a',
    mintedAt: '13 August 2023',
    tokenId: 1,
  };
  const card = new ethers.Contract(
    alexAddresses.card,
    AlexLibraryCard__factory.abi,
    provider,
  ) as AlexLibraryCard;
  const userAddress = await provider.getSigner().getAddress();
  // const balance = await card.balanceOf(userAddress);
  // const tokenId = getToek
  const mintedAt = (await card.mintedAt(0)).toString();
  return {
    contractAddress: alexAddresses.card,
    userAddress,
    mintedAt,
    tokenId: 0,
  };
};

export const hasLibraryCard = async (provider: ethers.providers.Web3Provider): Promise<boolean> => {
  const card = new ethers.Contract(
    alexAddresses.card,
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
    alexAddresses.card,
    AlexLibraryCard__factory.abi,
    provider,
  ) as AlexLibraryCard;
  const trx = await card.safeMint(await provider.getSigner().getAddress());
  return trx;
};

export const doMint = async (provider: ethers.providers.Web3Provider) => {
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const card = new ethers.Contract(
    alexAddresses.card,
    AlexLibraryCard__factory.abi,
    signer,
  ) as AlexLibraryCard;
  const admin = new ethers.Contract(
    alexAddresses.admin,
    AlexAdmin__factory.abi,
    signer,
  ) as AlexAdmin;
  const mintFee = await admin.cardFee();
  const token = new ethers.Contract(alexAddresses.token, ERC20__factory.abi, signer) as ERC20;
  const balance = await token.balanceOf(signerAddress);
  const allowed = await token.allowance(signerAddress, alexAddresses.token);
  if (allowed.lt(mintFee)) {
    await (await token.approve(alexAddresses.card, balance)).wait();
  }
  const trx = await card.safeMint(signerAddress);
  return await trx.wait();
};

// Library

export interface IProgram {
  id: ethers.BigNumber;
  owner: string;
  authorName: string;
  title: string;
  cid: string;
  certificate: string;
  rating: {
    avg: number;
    count: number;
  };
  reward: {
    rewardToken: string;
    rewardAddressCap: string;
    rewardPerAddress: string;
    rewardDistributed: string;
    rewardRemaining: string;
    tokenSymbol: string;
  };
}

export const getProgram = async (id: number): Promise<IProgram> => {
  const lib = new ethers.Contract(
    alexAddresses.library,
    AlexLibrary__factory.abi,
    ReadProvider,
  ) as AlexLibrary;
  const response = await lib.programs(id);

  // Get Ratings
  const ratings = await lib.getRatings(id);
  let sum = 0;
  ratings.forEach((r) => {
    sum += r.toNumber();
  });
  const rating = {
    avg: ratings.length !== 0 ? Math.round((sum / ratings.length) * 10) / 10 : 0,
    count: ratings.length,
  };

  const token = new ethers.Contract(
    response.reward.rewardToken,
    ERC20__factory.abi,
    ReadProvider,
  ) as ERC20;
  const decimalsTrx = token.decimals();
  const tokenSymbolTrx = token.symbol();

  // Get Author Name
  const author = new ethers.Contract(
    alexAddresses.author,
    AlexAuthor__factory.abi,
    ReadProvider,
  ) as AlexAuthor;
  const authorIdTrx = author.tokenOfOwnerByIndex(response.owner, 0);
  const [decimals, tokenSymbol, authorId] = await Promise.all([
    decimalsTrx,
    tokenSymbolTrx,
    authorIdTrx,
  ]);

  const authorName = await author.authorList(authorId);

  const program: IProgram = {
    ...response,
    authorName,
    rating,
    reward: {
      rewardToken: response.reward.rewardToken,
      rewardAddressCap: response.reward.rewardAddressCap.toString(),
      rewardDistributed: response.reward.rewardDistributed
        .div(BigNumber.from(10).pow(decimals))
        .toString(),
      rewardPerAddress: response.reward.rewardPerAddress
        .div(BigNumber.from(10).pow(decimals))
        .toString(),
      rewardRemaining: response.reward.rewardDistributed
        .sub(response.reward.rewardAddressCap.mul(response.reward.rewardPerAddress))
        .div(BigNumber.from(10).pow(decimals))
        .toString(),
      tokenSymbol,
    },
  };
  return program;
};

export const getNumberOfPrograms = async (): Promise<number> => {
  const lib = new ethers.Contract(
    alexAddresses.library,
    AlexLibrary__factory.abi,
    ReadProvider,
  ) as AlexLibrary;
  const counter = await lib.programCounter();
  return counter.toNumber();
};

export const checkAnswer = async (
  provider: ethers.providers.Web3Provider,
  id: number,
  answers: string[],
): Promise<boolean> => {
  const lib = new ethers.Contract(
    alexAddresses.library,
    AlexLibrary__factory.abi,
    provider,
  ) as AlexLibrary;
  const isCorrect = await lib.checkAnswer(id, answers);
  return isCorrect;
};

export const learnProgram = async (
  provider: ethers.providers.Web3Provider,
  id: number,
  answers: string[],
): Promise<ethers.ContractTransaction> => {
  const signer = provider.getSigner();
  const lib = new ethers.Contract(
    alexAddresses.library,
    AlexLibrary__factory.abi,
    signer,
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
    alexAddresses.library,
    AlexLibrary__factory.abi,
    provider,
  ) as AlexLibrary;
  const trx = await lib.rateProgram(id, rate);
  return trx;
};

export const completedProgramByAddress = async (
  provider: ethers.providers.Web3Provider,
): Promise<BigNumber[]> => {
  const lib = new ethers.Contract(
    alexAddresses.library,
    AlexLibrary__factory.abi,
    provider,
  ) as AlexLibrary;
  const certs = await lib.getCerts(await provider.getSigner().getAddress());
  return certs;
};
