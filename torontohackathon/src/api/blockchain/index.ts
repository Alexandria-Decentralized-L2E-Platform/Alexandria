import { ethers } from 'ethers';
import { networkList, Network, DEFAULT_NETWORK } from './network';
import {
  AlexLibraryCard,
  AlexLibraryCard__factory,
  ERC20,
  ERC20__factory,
} from '../contracts/typechain';
import { alexAddresses } from '../contracts';

export let walletProvider: ethers.providers.Web3Provider;
export let walletChainId: number;
export let walletAddress: string = '';

export const setupWallet = async () => {
  if (!window.ethereum) return;
  walletProvider = new ethers.providers.Web3Provider(window.ethereum);
  walletChainId = (await walletProvider.getNetwork()).chainId;
  walletAddress = await getAccount();
};

export const loadNetwork = async () => {
  const { chainId } = await walletProvider.getNetwork();
  return chainId;
};

export const getAccount = async () => {
  if (!walletProvider) return '';
  const accounts = await walletProvider.listAccounts();
  const account = accounts[0];
  walletAddress = account;
  return account;
};

export const isConnected = (): boolean => {
  return !!walletProvider;
};

// Connect wallet to metamask
export const connect = async (): Promise<string> => {
  setupWallet();
  const account = await getAccount();
  if (await isSupportedChain()) return account;
  await addNetwork(DEFAULT_NETWORK);
  return account;
};

// Return true if the chain is supported
export const isSupportedChain = async (): Promise<boolean> => {
  if (!walletProvider) return false;
  const currentChain = await loadNetwork();
  return networkList.map((n) => n.chainId).includes(currentChain);
};

// Add network
export const addNetwork = async (chainId: number): Promise<Network | undefined> => {
  const network = networkList.find((n) => n.chainId == chainId);
  if (!network) return undefined;
  const id = chainId.toString(16);
  console.log(id);
  await walletProvider.send('wallet_addEthereumChain', [
    {
      chainId: '0x' + id,
      chainName: network.name,
      rpcUrls: [network.rpc],
      blockExplorerUrls: [network.explorer],
      nativeCurrency: {
        symbol: network.symbol,
        decimals: 18,
      },
    },
  ]);
  return network;
};

export const doMint = async () => {
  const signer = walletProvider.getSigner();
  const signerAddress = await signer.getAddress();
  const card = new ethers.Contract(
    alexAddresses.card,
    AlexLibraryCard__factory.abi,
    signer,
  ) as AlexLibraryCard;
  const mintFee = 200;
  const token = new ethers.Contract(alexAddresses.token, ERC20__factory.abi, signer) as ERC20;
  const balance = await token.balanceOf(signerAddress);
  const allowed = await token.allowance(signerAddress, alexAddresses.token);
  if (allowed.lt(mintFee)) {
    const approveReceipt = await (await token.approve(alexAddresses.card, balance)).wait();
    console.log('approveReceipt', approveReceipt);
  }
  const trx = await card.safeMint(signerAddress);
  return await trx.wait();
};
