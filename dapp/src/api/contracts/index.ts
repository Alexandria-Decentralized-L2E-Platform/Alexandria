import { ethers, BigNumber, BigNumberish } from 'ethers';
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
  AlexCertificate__factory,
  AlexCertificate,
} from './typechain';

export interface AlexAddresses {
  token: string;
  admin: string;
  author: string;
  card: string;
  library: string;
}

export const alexAddresses: AlexAddresses = {
  token: '0x82721AC787B661Bf2e1fe3c39154825E44145194',
  admin: '0x2cBCd63dA737d020Ea9Ab6e931D78d3fb9fEadC5',
  author: '0x1EfA37fc22332B82e12Be7CdB552ca42372fAB94',
  card: '0x783174D9D99cdC01E01CCB57546F6b64cd6eb1fC',
  library: '0x49756645Af61b5d2D71a883227356bd7BE9A51b4',
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
  amount: BigNumberish,
): Promise<ethers.ContractTransaction> => {
  const signer = provider.getSigner();
  const token = new ethers.Contract(tokenAddress, ERC20__factory.abi, signer) as ERC20;
  const trx = await token.approve(spenderAddress, amount);
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
  const card = new ethers.Contract(
    alexAddresses.card,
    AlexLibraryCard__factory.abi,
    provider,
  ) as AlexLibraryCard;
  const userAddress = await provider.getSigner().getAddress();
  const tokenId = await card.tokenOfOwnerByIndex('0xDe55169E415e0f6363B753B22482e45Ef47eE46a', 0);
  const mintedAt = (await card.mintedAt(tokenId)).toString();
  return {
    contractAddress: alexAddresses.card,
    userAddress,
    mintedAt: new Date(Number(mintedAt) * 1000).toLocaleDateString(),
    tokenId: tokenId.toNumber(),
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
  const signer = provider.getSigner();
  const lib = new ethers.Contract(
    alexAddresses.library,
    AlexLibrary__factory.abi,
    signer,
  ) as AlexLibrary;
  const trx = await lib.rateProgram(id, rate);
  return trx;
};

export const completedProgramByAddress = async (
  provider: ethers.providers.Web3Provider,
): Promise<number[]> => {
  const lib = new ethers.Contract(
    alexAddresses.library,
    AlexLibrary__factory.abi,
    provider,
  ) as AlexLibrary;
  const certs = await lib.getCerts(await provider.getSigner().getAddress());
  return certs.map((n) => n.toNumber());
};

export const getCertCompletionDate = async (
  provider: ethers.providers.Web3Provider,
  certAddress: string,
): Promise<string> => {
  const cert = new ethers.Contract(
    certAddress,
    AlexCertificate__factory.abi,
    provider,
  ) as AlexCertificate;
  const completionDate = (
    await cert.certifiedAt(await provider.getSigner().getAddress())
  ).toString();
  return completionDate;
};

export interface INewProgram {
  _title: string;
  _cid: string;
  _reward: AlexLibrary.RewardStruct;
  _answers: string[];
}

export const createNewProgram = async (
  provider: ethers.providers.Web3Provider,
  newProgram: INewProgram,
): Promise<ethers.ContractReceipt | string> => {
  const signer = provider.getSigner();
  const lib = new ethers.Contract(
    alexAddresses.library,
    AlexLibrary__factory.abi,
    signer,
  ) as AlexLibrary;
  // approve reward token spending
  newProgram._reward.rewardPerAddress = BigNumber.from(newProgram._reward.rewardPerAddress).mul(
    BigNumber.from(10).pow(18),
  );
  const amount = newProgram._reward.rewardPerAddress.mul(BigNumber.from(10).pow(18));
  try {
    await (
      await approveToken(provider, newProgram._reward.rewardToken, alexAddresses.library, amount)
    ).wait();
    newProgram._reward.rewardDistributed = 0;
    const response = await lib.newProgram(
      newProgram._title,
      newProgram._cid,
      newProgram._reward,
      newProgram._answers,
    );
    return await response.wait();
  } catch (err) {
    const errorMsg = 'Error: ' + err;
    return errorMsg;
  }
};

export const isUserIsAuthor = async (provider: ethers.providers.Web3Provider): Promise<boolean> => {
  const author = new ethers.Contract(
    alexAddresses.author,
    AlexAuthor__factory.abi,
    provider,
  ) as AlexAuthor;
  const balance = await author.balanceOf(await provider.getSigner().getAddress());
  return balance.gt(0);
};

export const mintAuthor = async (
  provider: ethers.providers.Web3Provider,
): Promise<ethers.ContractReceipt> => {
  const signer = provider.getSigner();
  const author = new ethers.Contract(
    alexAddresses.author,
    AlexAuthor__factory.abi,
    signer,
  ) as AlexAuthor;
  const receipt = await author.safeMint(await provider.getSigner().getAddress(), 'No Name');
  return await receipt.wait();
};
