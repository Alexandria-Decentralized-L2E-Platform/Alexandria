export interface Network {
  name: string;
  rpc: string;
  chainId: number;
  symbol: string;
  explorer: string;
}

export const networkList: Network[] = [
  {
    name: 'Apothem',
    rpc: 'https://rpc.apothem.network',
    chainId: 51,
    symbol: 'TXDC',
    explorer: 'https://explorer.apothem.network/',
  },
];

export const DEFAULT_NETWORK = 51;
