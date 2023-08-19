/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  AlexLibraryCard,
  AlexLibraryCardInterface,
} from "../../contracts/AlexLibraryCard";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract AlexAdmin",
        name: "_admin",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "contract AlexAdmin",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "mintedAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenIdCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200211d3803806200211d833981016040819052620000349162000170565b6040805180820182526011815270105b195e08131a589c985c9e4810d85c99607a1b6020808301918252835180850190945260058452641850d85c9960da1b9084015281519192916200008a91600091620000ca565b508051620000a0906001906020840190620000ca565b5050600c80546001600160a01b0319166001600160a01b03939093169290921790915550620001dd565b828054620000d890620001a0565b90600052602060002090601f016020900481019282620000fc576000855562000147565b82601f106200011757805160ff191683800117855562000147565b8280016001018555821562000147579182015b82811115620001475782518255916020019190600101906200012a565b506200015592915062000159565b5090565b5b808211156200015557600081556001016200015a565b60006020828403121562000182578081fd5b81516001600160a01b038116811462000199578182fd5b9392505050565b600181811c90821680620001b557607f821691505b60208210811415620001d757634e487b7160e01b600052602260045260246000fd5b50919050565b611f3080620001ed6000396000f3fe608060405234801561001057600080fd5b50600436106101775760003560e01c80634f6ccce7116100d8578063a22cb4651161008c578063e985e9c511610066578063e985e9c5146102ee578063f1b0aa151461032a578063f851a4401461034a57600080fd5b8063a22cb465146102b5578063b88d4fde146102c8578063c87b56dd146102db57600080fd5b806370a08231116100bd57806370a082311461029057806395d89b41146102a357806398bdf6f5146102ab57600080fd5b80634f6ccce71461026a5780636352211e1461027d57600080fd5b806323b872dd1161012f57806340d097c31161011457806340d097c31461023157806342842e0e1461024457806342966c681461025757600080fd5b806323b872dd1461020b5780632f745c591461021e57600080fd5b8063081812fc11610160578063081812fc146101b9578063095ea7b3146101e457806318160ddd146101f957600080fd5b806301ffc9a71461017c57806306fdde03146101a4575b600080fd5b61018f61018a366004611c94565b61035d565b60405190151581526020015b60405180910390f35b6101ac61036e565b60405161019b9190611d93565b6101cc6101c7366004611ccc565b610400565b6040516001600160a01b03909116815260200161019b565b6101f76101f2366004611c4d565b61049a565b005b6009545b60405190815260200161019b565b6101f7610219366004611b07565b6105cc565b6101fd61022c366004611c4d565b610653565b6101f761023f366004611a97565b6106fb565b6101f7610252366004611b07565b61093b565b6101f7610265366004611ccc565b610956565b6101fd610278366004611ccc565b6109c2565b6101cc61028b366004611ccc565b610a74565b6101fd61029e366004611a97565b610aff565b6101ac610b99565b600b546101fd9081565b6101f76102c3366004611c20565b610ba8565b6101f76102d6366004611b47565b610bb3565b6101ac6102e9366004611ccc565b610c41565b61018f6102fc366004611acf565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6101fd610338366004611ccc565b600d6020526000908152604090205481565b600c546101cc906001600160a01b031681565b600061036882610c4c565b92915050565b60606000805461037d90611e15565b80601f01602080910402602001604051908101604052809291908181526020018280546103a990611e15565b80156103f65780601f106103cb576101008083540402835291602001916103f6565b820191906000526020600020905b8154815290600101906020018083116103d957829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b031661047e5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b60006104a582610a74565b9050806001600160a01b0316836001600160a01b0316141561052f5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f72000000000000000000000000000000000000000000000000000000000000006064820152608401610475565b336001600160a01b038216148061054b575061054b81336102fc565b6105bd5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610475565b6105c78383610c8a565b505050565b6105d63382610d05565b6106485760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f7665640000000000000000000000000000006064820152608401610475565b6105c7838383610dfc565b600061065e83610aff565b82106106d25760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201527f74206f6620626f756e64730000000000000000000000000000000000000000006064820152608401610475565b506001600160a01b03919091166000908152600760209081526040808320938352929052205490565b61070433610aff565b156107515760405162461bcd60e51b815260206004820152601660248201527f416c7265616479206f776e6564206120746f6b656e2e000000000000000000006044820152606401610475565b600c60009054906101000a90046001600160a01b03166001600160a01b031663647846a56040518163ffffffff1660e01b815260040160206040518083038186803b15801561079f57600080fd5b505afa1580156107b3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107d79190611ab3565b600c54604080517fd2d6ad1200000000000000000000000000000000000000000000000000000000815290516001600160a01b03938416936323b872dd933393911691829163d2d6ad12916004808301926020929190829003018186803b15801561084157600080fd5b505afa158015610855573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108799190611ce4565b6040516001600160e01b031960e086901b1681526001600160a01b0393841660048201529290911660248301526044820152606401602060405180830381600087803b1580156108c857600080fd5b505af11580156108dc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109009190611c78565b50600061090c600b5490565b6000818152600d60205260409020429055905061092d600b80546001019055565b6109378282610fe1565b5050565b6105c783838360405180602001604052806000815250610bb3565b3361096082610a74565b6001600160a01b0316146109b65760405162461bcd60e51b815260206004820152601460248201527f4e6f7420616c6c6f77656420746f206275726e2e0000000000000000000000006044820152606401610475565b6109bf81610ffb565b50565b60006109cd60095490565b8210610a415760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201527f7574206f6620626f756e647300000000000000000000000000000000000000006064820152608401610475565b60098281548110610a6257634e487b7160e01b600052603260045260246000fd5b90600052602060002001549050919050565b6000818152600260205260408120546001600160a01b0316806103685760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201527f656e7420746f6b656e00000000000000000000000000000000000000000000006064820152608401610475565b60006001600160a01b038216610b7d5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a6560448201527f726f2061646472657373000000000000000000000000000000000000000000006064820152608401610475565b506001600160a01b031660009081526003602052604090205490565b60606001805461037d90611e15565b610937338383611004565b610bbd3383610d05565b610c2f5760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f7665640000000000000000000000000000006064820152608401610475565b610c3b848484846110d3565b50505050565b606061036882611151565b60006001600160e01b031982167f780e9d630000000000000000000000000000000000000000000000000000000014806103685750610368826112dc565b6000818152600460205260409020805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0384169081179091558190610ccc82610a74565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b0316610d7e5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610475565b6000610d8983610a74565b9050806001600160a01b0316846001600160a01b03161480610dd057506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b80610df45750836001600160a01b0316610de984610400565b6001600160a01b0316145b949350505050565b826001600160a01b0316610e0f82610a74565b6001600160a01b031614610e8b5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e65720000000000000000000000000000000000000000000000000000006064820152608401610475565b6001600160a01b038216610f065760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610475565b610f11838383611377565b610f1c600082610c8a565b6001600160a01b0383166000908152600360205260408120805460019290610f45908490611dd2565b90915550506001600160a01b0382166000908152600360205260408120805460019290610f73908490611da6565b9091555050600081815260026020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6109378282604051806020016040528060008152506113e0565b6109bf8161145e565b816001600160a01b0316836001600160a01b031614156110665760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610475565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6110de848484610dfc565b6110ea8484848461149e565b610c3b5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b6064820152608401610475565b6000818152600260205260409020546060906001600160a01b03166111de5760405162461bcd60e51b815260206004820152603160248201527f45524337323155524953746f726167653a2055524920717565727920666f722060448201527f6e6f6e6578697374656e7420746f6b656e0000000000000000000000000000006064820152608401610475565b600082815260066020526040812080546111f790611e15565b80601f016020809104026020016040519081016040528092919081815260200182805461122390611e15565b80156112705780601f1061124557610100808354040283529160200191611270565b820191906000526020600020905b81548152906001019060200180831161125357829003601f168201915b50505050509050600061128e60408051602081019091526000815290565b90508051600014156112a1575092915050565b8151156112d35780826040516020016112bb929190611d28565b60405160208183030381529060405292505050919050565b610df4846115f6565b60006001600160e01b031982167f80ac58cd00000000000000000000000000000000000000000000000000000000148061133f57506001600160e01b031982167f5b5e139f00000000000000000000000000000000000000000000000000000000145b8061036857507f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b0319831614610368565b6001600160a01b038316158061139457506001600160a01b038216155b6105c75760405162461bcd60e51b815260206004820152601b60248201527f546f6b656e206973206e6f74207472616e736665727261626c652e00000000006044820152606401610475565b6113ea83836116ec565b6113f7600084848461149e565b6105c75760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b6064820152608401610475565b61146781611847565b6000818152600660205260409020805461148090611e15565b1590506109bf5760008181526006602052604081206109bf91611a49565b60006001600160a01b0384163b156115eb57604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906114e2903390899088908890600401611d57565b602060405180830381600087803b1580156114fc57600080fd5b505af192505050801561152c575060408051601f3d908101601f1916820190925261152991810190611cb0565b60015b6115d1573d80801561155a576040519150601f19603f3d011682016040523d82523d6000602084013e61155f565b606091505b5080516115c95760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b6064820152608401610475565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610df4565b506001949350505050565b6000818152600260205260409020546060906001600160a01b03166116835760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006064820152608401610475565b600061169a60408051602081019091526000815290565b905060008151116116ba57604051806020016040528060008152506116e5565b806116c4846118fb565b6040516020016116d5929190611d28565b6040516020818303038152906040525b9392505050565b6001600160a01b0382166117425760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610475565b6000818152600260205260409020546001600160a01b0316156117a75760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610475565b6117b360008383611377565b6001600160a01b03821660009081526003602052604081208054600192906117dc908490611da6565b9091555050600081815260026020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600061185282610a74565b905061186081600084611377565b61186b600083610c8a565b6001600160a01b0381166000908152600360205260408120805460019290611894908490611dd2565b9091555050600082815260026020526040808220805473ffffffffffffffffffffffffffffffffffffffff19169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60608161193b57505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b8115611965578061194f81611e50565b915061195e9050600a83611dbe565b915061193f565b60008167ffffffffffffffff81111561198e57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156119b8576020820181803683370190505b5090505b8415610df4576119cd600183611dd2565b91506119da600a86611e6b565b6119e5906030611da6565b60f81b818381518110611a0857634e487b7160e01b600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350611a42600a86611dbe565b94506119bc565b508054611a5590611e15565b6000825580601f10611a65575050565b601f0160209004906000526020600020908101906109bf91905b80821115611a935760008155600101611a7f565b5090565b600060208284031215611aa8578081fd5b81356116e581611ec1565b600060208284031215611ac4578081fd5b81516116e581611ec1565b60008060408385031215611ae1578081fd5b8235611aec81611ec1565b91506020830135611afc81611ec1565b809150509250929050565b600080600060608486031215611b1b578081fd5b8335611b2681611ec1565b92506020840135611b3681611ec1565b929592945050506040919091013590565b60008060008060808587031215611b5c578081fd5b8435611b6781611ec1565b93506020850135611b7781611ec1565b925060408501359150606085013567ffffffffffffffff80821115611b9a578283fd5b818701915087601f830112611bad578283fd5b813581811115611bbf57611bbf611eab565b604051601f8201601f19908116603f01168101908382118183101715611be757611be7611eab565b816040528281528a6020848701011115611bff578586fd5b82602086016020830137918201602001949094529598949750929550505050565b60008060408385031215611c32578182fd5b8235611c3d81611ec1565b91506020830135611afc81611ed6565b60008060408385031215611c5f578182fd5b8235611c6a81611ec1565b946020939093013593505050565b600060208284031215611c89578081fd5b81516116e581611ed6565b600060208284031215611ca5578081fd5b81356116e581611ee4565b600060208284031215611cc1578081fd5b81516116e581611ee4565b600060208284031215611cdd578081fd5b5035919050565b600060208284031215611cf5578081fd5b5051919050565b60008151808452611d14816020860160208601611de9565b601f01601f19169290920160200192915050565b60008351611d3a818460208801611de9565b835190830190611d4e818360208801611de9565b01949350505050565b60006001600160a01b03808716835280861660208401525083604083015260806060830152611d896080830184611cfc565b9695505050505050565b6020815260006116e56020830184611cfc565b60008219821115611db957611db9611e7f565b500190565b600082611dcd57611dcd611e95565b500490565b600082821015611de457611de4611e7f565b500390565b60005b83811015611e04578181015183820152602001611dec565b83811115610c3b5750506000910152565b600181811c90821680611e2957607f821691505b60208210811415611e4a57634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415611e6457611e64611e7f565b5060010190565b600082611e7a57611e7a611e95565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146109bf57600080fd5b80151581146109bf57600080fd5b6001600160e01b0319811681146109bf57600080fdfea26469706673582212204693fd8b88491bdaadc65c0e076a0b01f9f5ea7592a3f2d587408330f07ebc9564736f6c63430008040033";

type AlexLibraryCardConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AlexLibraryCardConstructorParams
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
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<AlexLibraryCard> {
    return super.deploy(_admin, overrides || {}) as Promise<AlexLibraryCard>;
  }
  override getDeployTransaction(
    _admin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
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
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AlexLibraryCard {
    return new Contract(address, _abi, signerOrProvider) as AlexLibraryCard;
  }
}
