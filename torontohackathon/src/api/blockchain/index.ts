import { ethers } from 'ethers';
import { networkList, Network, DEFAULT_NETWORK } from './network';

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
  const accounts = await walletProvider.send('eth_requestAccounts', []);
  await setupWallet();
  if (await isSupportedChain()) return accounts[0];
  await addNetwork(DEFAULT_NETWORK);
  return accounts[0];
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
