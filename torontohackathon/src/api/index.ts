import { ethers, BigNumber } from 'ethers';
import * as ipfs from './ipfs';
import * as contracts from './contracts';
import * as blockchain from './blockchain';

// Program interface
interface IProgram extends contracts.IProgram, ipfs.IProgramObjectIPFS {}

// Return a Program Object
const getProgramById = async (
  provider: ethers.providers.Web3Provider,
  id: number,
): Promise<IProgram> => {
  // Get Data from contract
  const programFromContracts = await contracts.getProgram(provider, id);
  // Get Data from ipfs
  const programFromIPFS = await ipfs.readProgramFromIPFS(programFromContracts.contentURI);
  const program = {
    ...programFromContracts,
    ...programFromIPFS,
  };
  return program;
};

// Retrun all program
const getAllPrograms = async (provider: ethers.providers.Web3Provider): Promise<IProgram[]> => {
  // Sample Data
  return [
    {
      id: BigNumber.from(0),
      owner: '0xDe55169E415e0f6363B753B22482e45Ef47eE46a',
      title: 'Title 1',
      contentURI: 'QmYxjEUSdibv2JYv4UPFr3rZc4cmU817zEEAsYM35ncMkb',
      questionCID: 'QmYxjEUSdibv2JYv4UPFr3rZc4cmU817zEEAsYM35ncMkb',
      certificate: '0xDe55169E415e0f6363B753B22482e45Ef47eE46a',
      reward: {
        rewardToken: '0xDe55169E415e0f6363B753B22482e45Ef47eE46a',
        rewardAddressCap: '1000',
        rewardPerAddress: '200',
        rewardDistributed: '5000',
      },
      duration: 70,
      link: 'https://www.youtube.com/watch?v=_nrU4ChA6t8',
      type: 'Videos',
      questions: [
        'Q1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus odio in mi vulputate iaculis. Nam at commodo velit. Morbi nisi purus, volutpat sed arcu et, hendrerit finibus risus. Etiam scelerisque massa commodo libero tristique, in vehicula arcu posuere. Fusce condimentum nisi et velit ultrices venenatis. Pellentesque fringilla ante a.',
        'Q2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus odio in mi vulputate iaculis. Nam at commodo velit. Morbi nisi purus, volutpat sed arcu et, hendrerit finibus risus. Etiam scelerisque massa commodo libero tristique, in vehicula arcu posuere. Fusce condimentum nisi et velit ultrices venenatis. Pellentesque fringilla ante a.',
        'Q3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus odio in mi vulputate iaculis. Nam at commodo velit. Morbi nisi purus, volutpat sed arcu et, hendrerit finibus risus. Etiam scelerisque massa commodo libero tristique, in vehicula arcu posuere. Fusce condimentum nisi et velit ultrices venenatis. Pellentesque fringilla ante a.',
        'Q4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus odio in mi vulputate iaculis. Nam at commodo velit. Morbi nisi purus, volutpat sed arcu et, hendrerit finibus risus. Etiam scelerisque massa commodo libero tristique, in vehicula arcu posuere. Fusce condimentum nisi et velit ultrices venenatis. Pellentesque fringilla ante a.',
        'Q5. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus odio in mi vulputate iaculis. Nam at commodo velit. Morbi nisi purus, volutpat sed arcu et, hendrerit finibus risus. Etiam scelerisque massa commodo libero tristique, in vehicula arcu posuere. Fusce condimentum nisi et velit ultrices venenatis. Pellentesque fringilla ante a.',
      ],
    },
    {
      id: BigNumber.from(1),
      owner: '0xDe55169E415e0f6363B753B22482e45Ef47eE46a',
      title: 'Title 2',
      contentURI: 'QmYxjEUSdibv2JYv4UPFr3rZc4cmU817zEEAsYM35ncMkb',
      questionCID: 'QmYxjEUSdibv2JYv4UPFr3rZc4cmU817zEEAsYM35ncMkb',
      certificate: '0xDe55169E415e0f6363B753B22482e45Ef47eE46a',
      reward: {
        rewardToken: '0xDe55169E415e0f6363B753B22482e45Ef47eE46a',
        rewardAddressCap: '100',
        rewardPerAddress: '400',
        rewardDistributed: '40000',
      },
      duration: 20,
      link: 'https://www.youtube.com/watch?v=_nrU4ChA6t8',
      type: 'Videos',
      questions: [
        'Q6. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus odio in mi vulputate iaculis. Nam at commodo velit. Morbi nisi purus, volutpat sed arcu et, hendrerit finibus risus. Etiam scelerisque massa commodo libero tristique, in vehicula arcu posuere. Fusce condimentum nisi et velit ultrices venenatis. Pellentesque fringilla ante a.',
        'Q7. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus odio in mi vulputate iaculis. Nam at commodo velit. Morbi nisi purus, volutpat sed arcu et, hendrerit finibus risus. Etiam scelerisque massa commodo libero tristique, in vehicula arcu posuere. Fusce condimentum nisi et velit ultrices venenatis. Pellentesque fringilla ante a.',
        'Q8. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus odio in mi vulputate iaculis. Nam at commodo velit. Morbi nisi purus, volutpat sed arcu et, hendrerit finibus risus. Etiam scelerisque massa commodo libero tristique, in vehicula arcu posuere. Fusce condimentum nisi et velit ultrices venenatis. Pellentesque fringilla ante a.',
        'Q9. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus odio in mi vulputate iaculis. Nam at commodo velit. Morbi nisi purus, volutpat sed arcu et, hendrerit finibus risus. Etiam scelerisque massa commodo libero tristique, in vehicula arcu posuere. Fusce condimentum nisi et velit ultrices venenatis. Pellentesque fringilla ante a.',
        'Q10. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus odio in mi vulputate iaculis. Nam at commodo velit. Morbi nisi purus, volutpat sed arcu et, hendrerit finibus risus. Etiam scelerisque massa commodo libero tristique, in vehicula arcu posuere. Fusce condimentum nisi et velit ultrices venenatis. Pellentesque fringilla ante a.',
      ],
    },
  ];
  const counter = await contracts.getNumberOfPrograms(provider);
  const programs: IProgram[] = [];
  for (let i = 0; i < counter; i++) {
    programs.push(await getProgramById(provider, i));
  }
  const result = await Promise.all(programs);
  return result;
};

export { ipfs, contracts, blockchain, getProgramById, getAllPrograms };
