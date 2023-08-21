import { ethers } from 'ethers';
import { networkList, Network, DEFAULT_NETWORK } from './network';

export const ReadProvider = new ethers.providers.JsonRpcProvider(
  networkList.find((n) => n.chainId == DEFAULT_NETWORK)?.rpc,
);

export const loadNetwork = async (provider: ethers.providers.Web3Provider) => {
  const { chainId } = await provider.getNetwork();
  return chainId;
};

// Connect wallet to metamask
export const connect = async (provider: ethers.providers.Web3Provider): Promise<string> => {
  const accounts = await provider.send('eth_requestAccounts', []);
  // if (await isSupportedChain()) return accounts[0];
  await addNetwork(provider, DEFAULT_NETWORK);
  return accounts[0];
};

// Return true if the chain is supported
export const isSupportedChain = async (
  provider: ethers.providers.Web3Provider,
): Promise<boolean> => {
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
