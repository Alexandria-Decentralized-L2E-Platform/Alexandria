import { ethers } from 'ethers';
import { networkList, Network, DEFAULT_NETWORK } from './network';

export const loadProvider = (): ethers.providers.Web3Provider | undefined => {
  if (!window.ethereum) return undefined;
  const provider = new ethers.providers.Web3Provider(
    window.ethereum as ethers.providers.ExternalProvider,
  );
  return provider;
};

export const loadNetwork = async (provider: ethers.providers.Web3Provider) => {
  const { chainId } = await provider.getNetwork();
  return chainId;
};

export const loadAccount = async (provider: ethers.providers.Web3Provider) => {
  if (!window.ethereum) return undefined;
  const accounts = await provider.listAccounts();
  const account = accounts[0];
  return account;
};

// Return the first wallet address if connected, otherwise return undefine
export const isConnected = async (): Promise<string | undefined> => {
  const provider = loadProvider();
  if (!provider) return undefined;
  const account = await loadAccount(provider);
  return account;
};

// Connect wallet to metamask
export const connect = async (provider: ethers.providers.Web3Provider): Promise<string> => {
  const accounts = await provider.send('eth_requestAccounts', []);
  if (await isSupportedChain()) return accounts[0];
  await addNetwork(provider, DEFAULT_NETWORK);
  return accounts[0];
};

// Return true if the chain is supported
export const isSupportedChain = async (): Promise<boolean> => {
  const provider = loadProvider();
  if (!provider) return false;
  const currentChain = await loadNetwork(provider);
  return networkList.map((n) => n.chainId).includes(currentChain);
};

// Add network
export const addNetwork = async (
  provider: ethers.providers.Web3Provider,
  chainId: number,
): Promise<Network | undefined> => {
  const network = networkList.find((n) => n.chainId == chainId);
  if (!network) return undefined;
  const id = chainId.toString(16);
  console.log(id);
  await provider.send('wallet_addEthereumChain', [
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
