/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers';
import type { Provider, TransactionRequest } from '@ethersproject/providers';
import type { AlexLibraryCard, AlexLibraryCardInterface } from '../../contracts/AlexLibraryCard';

const _abi = [
  {
    inputs: [
      {
        internalType: 'contract AlexAdmin',
        name: '_admin',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [],
    name: 'admin',
    outputs: [
      {
        internalType: 'contract AlexAdmin',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'mintedAt',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'safeMint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tokenIdCounter',
    outputs: [
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const _bytecode =
  '0x60806040523480156200001157600080fd5b5060405162001f0b38038062001f0b833981016040819052620000349162000170565b6040805180820182526011815270105b195e08131a589c985c9e4810d85c99607a1b6020808301918252835180850190945260058452641850d85c9960da1b9084015281519192916200008a91600091620000ca565b508051620000a0906001906020840190620000ca565b5050600880546001600160a01b0319166001600160a01b03939093169290921790915550620001dd565b828054620000d890620001a0565b90600052602060002090601f016020900481019282620000fc576000855562000147565b82601f106200011757805160ff191683800117855562000147565b8280016001018555821562000147579182015b82811115620001475782518255916020019190600101906200012a565b506200015592915062000159565b5090565b5b808211156200015557600081556001016200015a565b60006020828403121562000182578081fd5b81516001600160a01b038116811462000199578182fd5b9392505050565b600181811c90821680620001b557607f821691505b60208210811415620001d757634e487b7160e01b600052602260045260246000fd5b50919050565b611d1e80620001ed6000396000f3fe608060405234801561001057600080fd5b50600436106101365760003560e01c806370a08231116100b2578063b88d4fde11610081578063e985e9c511610066578063e985e9c514610283578063f1b0aa15146102bf578063f851a440146102df57600080fd5b8063b88d4fde1461025d578063c87b56dd1461027057600080fd5b806370a082311461021757806395d89b411461023857806398bdf6f514610240578063a22cb4651461024a57600080fd5b806323b872dd1161010957806342842e0e116100ee57806342842e0e146101de57806342966c68146101f15780636352211e1461020457600080fd5b806323b872dd146101b857806340d097c3146101cb57600080fd5b806301ffc9a71461013b57806306fdde0314610163578063081812fc14610178578063095ea7b3146101a3575b600080fd5b61014e610149366004611a82565b6102f2565b60405190151581526020015b60405180910390f35b61016b61038f565b60405161015a9190611b81565b61018b610186366004611aba565b610421565b6040516001600160a01b03909116815260200161015a565b6101b66101b1366004611a3b565b6104bb565b005b6101b66101c63660046118f5565b6105ed565b6101b66101d9366004611885565b610674565b6101b66101ec3660046118f5565b6108b4565b6101b66101ff366004611aba565b6108cf565b61018b610212366004611aba565b61093b565b61022a610225366004611885565b6109c6565b60405190815260200161015a565b61016b610a60565b60075461022a9081565b6101b6610258366004611a0e565b610a6f565b6101b661026b366004611935565b610a7a565b61016b61027e366004611aba565b610b08565b61014e6102913660046118bd565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b61022a6102cd366004611aba565b60096020526000908152604090205481565b60085461018b906001600160a01b031681565b60006001600160e01b031982167f80ac58cd00000000000000000000000000000000000000000000000000000000148061035557506001600160e01b031982167f5b5e139f00000000000000000000000000000000000000000000000000000000145b8061038957507f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b92915050565b60606000805461039e90611c03565b80601f01602080910402602001604051908101604052809291908181526020018280546103ca90611c03565b80156104175780601f106103ec57610100808354040283529160200191610417565b820191906000526020600020905b8154815290600101906020018083116103fa57829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b031661049f5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b60006104c68261093b565b9050806001600160a01b0316836001600160a01b031614156105505760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f72000000000000000000000000000000000000000000000000000000000000006064820152608401610496565b336001600160a01b038216148061056c575061056c8133610291565b6105de5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610496565b6105e88383610b13565b505050565b6105f73382610b8e565b6106695760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f7665640000000000000000000000000000006064820152608401610496565b6105e8838383610c85565b61067d336109c6565b156106ca5760405162461bcd60e51b815260206004820152601660248201527f416c7265616479206f776e6564206120746f6b656e2e000000000000000000006044820152606401610496565b600860009054906101000a90046001600160a01b03166001600160a01b031663647846a56040518163ffffffff1660e01b815260040160206040518083038186803b15801561071857600080fd5b505afa15801561072c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061075091906118a1565b600854604080517fd2d6ad1200000000000000000000000000000000000000000000000000000000815290516001600160a01b03938416936323b872dd933393911691829163d2d6ad12916004808301926020929190829003018186803b1580156107ba57600080fd5b505afa1580156107ce573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107f29190611ad2565b6040516001600160e01b031960e086901b1681526001600160a01b0393841660048201529290911660248301526044820152606401602060405180830381600087803b15801561084157600080fd5b505af1158015610855573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108799190611a66565b50600061088560075490565b600081815260096020526040902042905590506108a6600780546001019055565b6108b08282610e6a565b5050565b6105e883838360405180602001604052806000815250610a7a565b336108d98261093b565b6001600160a01b03161461092f5760405162461bcd60e51b815260206004820152601460248201527f4e6f7420616c6c6f77656420746f206275726e2e0000000000000000000000006044820152606401610496565b61093881610e84565b50565b6000818152600260205260408120546001600160a01b0316806103895760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201527f656e7420746f6b656e00000000000000000000000000000000000000000000006064820152608401610496565b60006001600160a01b038216610a445760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a6560448201527f726f2061646472657373000000000000000000000000000000000000000000006064820152608401610496565b506001600160a01b031660009081526003602052604090205490565b60606001805461039e90611c03565b6108b0338383610e8d565b610a843383610b8e565b610af65760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f7665640000000000000000000000000000006064820152608401610496565b610b0284848484610f5c565b50505050565b606061038982610fda565b6000818152600460205260409020805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0384169081179091558190610b558261093b565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b0316610c075760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610496565b6000610c128361093b565b9050806001600160a01b0316846001600160a01b03161480610c5957506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b80610c7d5750836001600160a01b0316610c7284610421565b6001600160a01b0316145b949350505050565b826001600160a01b0316610c988261093b565b6001600160a01b031614610d145760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e65720000000000000000000000000000000000000000000000000000006064820152608401610496565b6001600160a01b038216610d8f5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610496565b610d9a838383611165565b610da5600082610b13565b6001600160a01b0383166000908152600360205260408120805460019290610dce908490611bc0565b90915550506001600160a01b0382166000908152600360205260408120805460019290610dfc908490611b94565b9091555050600081815260026020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6108b08282604051806020016040528060008152506111ce565b6109388161124c565b816001600160a01b0316836001600160a01b03161415610eef5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610496565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610f67848484610c85565b610f738484848461128c565b610b025760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b6064820152608401610496565b6000818152600260205260409020546060906001600160a01b03166110675760405162461bcd60e51b815260206004820152603160248201527f45524337323155524953746f726167653a2055524920717565727920666f722060448201527f6e6f6e6578697374656e7420746f6b656e0000000000000000000000000000006064820152608401610496565b6000828152600660205260408120805461108090611c03565b80601f01602080910402602001604051908101604052809291908181526020018280546110ac90611c03565b80156110f95780601f106110ce576101008083540402835291602001916110f9565b820191906000526020600020905b8154815290600101906020018083116110dc57829003601f168201915b50505050509050600061111760408051602081019091526000815290565b905080516000141561112a575092915050565b81511561115c578082604051602001611144929190611b16565b60405160208183030381529060405292505050919050565b610c7d846113e4565b6001600160a01b038316158061118257506001600160a01b038216155b6105e85760405162461bcd60e51b815260206004820152601b60248201527f546f6b656e206973206e6f74207472616e736665727261626c652e00000000006044820152606401610496565b6111d883836114da565b6111e5600084848461128c565b6105e85760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b6064820152608401610496565b61125581611635565b6000818152600660205260409020805461126e90611c03565b15905061093857600081815260066020526040812061093891611837565b60006001600160a01b0384163b156113d957604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906112d0903390899088908890600401611b45565b602060405180830381600087803b1580156112ea57600080fd5b505af192505050801561131a575060408051601f3d908101601f1916820190925261131791810190611a9e565b60015b6113bf573d808015611348576040519150601f19603f3d011682016040523d82523d6000602084013e61134d565b606091505b5080516113b75760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b6064820152608401610496565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610c7d565b506001949350505050565b6000818152600260205260409020546060906001600160a01b03166114715760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006064820152608401610496565b600061148860408051602081019091526000815290565b905060008151116114a857604051806020016040528060008152506114d3565b806114b2846116e9565b6040516020016114c3929190611b16565b6040516020818303038152906040525b9392505050565b6001600160a01b0382166115305760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610496565b6000818152600260205260409020546001600160a01b0316156115955760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610496565b6115a160008383611165565b6001600160a01b03821660009081526003602052604081208054600192906115ca908490611b94565b9091555050600081815260026020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b60006116408261093b565b905061164e81600084611165565b611659600083610b13565b6001600160a01b0381166000908152600360205260408120805460019290611682908490611bc0565b9091555050600082815260026020526040808220805473ffffffffffffffffffffffffffffffffffffffff19169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60608161172957505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b8115611753578061173d81611c3e565b915061174c9050600a83611bac565b915061172d565b60008167ffffffffffffffff81111561177c57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156117a6576020820181803683370190505b5090505b8415610c7d576117bb600183611bc0565b91506117c8600a86611c59565b6117d3906030611b94565b60f81b8183815181106117f657634e487b7160e01b600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350611830600a86611bac565b94506117aa565b50805461184390611c03565b6000825580601f10611853575050565b601f01602090049060005260206000209081019061093891905b80821115611881576000815560010161186d565b5090565b600060208284031215611896578081fd5b81356114d381611caf565b6000602082840312156118b2578081fd5b81516114d381611caf565b600080604083850312156118cf578081fd5b82356118da81611caf565b915060208301356118ea81611caf565b809150509250929050565b600080600060608486031215611909578081fd5b833561191481611caf565b9250602084013561192481611caf565b929592945050506040919091013590565b6000806000806080858703121561194a578081fd5b843561195581611caf565b9350602085013561196581611caf565b925060408501359150606085013567ffffffffffffffff80821115611988578283fd5b818701915087601f83011261199b578283fd5b8135818111156119ad576119ad611c99565b604051601f8201601f19908116603f011681019083821181831017156119d5576119d5611c99565b816040528281528a60208487010111156119ed578586fd5b82602086016020830137918201602001949094529598949750929550505050565b60008060408385031215611a20578182fd5b8235611a2b81611caf565b915060208301356118ea81611cc4565b60008060408385031215611a4d578182fd5b8235611a5881611caf565b946020939093013593505050565b600060208284031215611a77578081fd5b81516114d381611cc4565b600060208284031215611a93578081fd5b81356114d381611cd2565b600060208284031215611aaf578081fd5b81516114d381611cd2565b600060208284031215611acb578081fd5b5035919050565b600060208284031215611ae3578081fd5b5051919050565b60008151808452611b02816020860160208601611bd7565b601f01601f19169290920160200192915050565b60008351611b28818460208801611bd7565b835190830190611b3c818360208801611bd7565b01949350505050565b60006001600160a01b03808716835280861660208401525083604083015260806060830152611b776080830184611aea565b9695505050505050565b6020815260006114d36020830184611aea565b60008219821115611ba757611ba7611c6d565b500190565b600082611bbb57611bbb611c83565b500490565b600082821015611bd257611bd2611c6d565b500390565b60005b83811015611bf2578181015183820152602001611bda565b83811115610b025750506000910152565b600181811c90821680611c1757607f821691505b60208210811415611c3857634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415611c5257611c52611c6d565b5060010190565b600082611c6857611c68611c83565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461093857600080fd5b801515811461093857600080fd5b6001600160e01b03198116811461093857600080fdfea264697066735822122003070621650e83b9398d222cb815f096d66a7f902a8971e6b9f023c5870d9aeb64736f6c63430008040033';

type AlexLibraryCardConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AlexLibraryCardConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AlexLibraryCard__factory extends ContractFactory {
  constructor(...args: AlexLibraryCardConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _admin: string,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<AlexLibraryCard> {
    return super.deploy(_admin, overrides || {}) as Promise<AlexLibraryCard>;
  }
  override getDeployTransaction(
    _admin: string,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): TransactionRequest {
    return super.getDeployTransaction(_admin, overrides || {});
  }
  override attach(address: string): AlexLibraryCard {
    return super.attach(address) as AlexLibraryCard;
  }
  override connect(signer: Signer): AlexLibraryCard__factory {
    return super.connect(signer) as AlexLibraryCard__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AlexLibraryCardInterface {
    return new utils.Interface(_abi) as AlexLibraryCardInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): AlexLibraryCard {
    return new Contract(address, _abi, signerOrProvider) as AlexLibraryCard;
  }
}