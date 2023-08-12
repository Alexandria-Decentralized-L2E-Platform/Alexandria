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
  const programFromIPFS = await ipfs.readProgramFromIPFS(programFromContracts.cid);
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
      title: 'An Introduction to Xin Fin',
      description:
        "Welcome to the comprehensive course on XinFin's Revolutionary Blockchain Capabilities! This engaging course is designed to provide you with a deep understanding of XinFin's unique compatibility features, cutting-edge blockchain technologies, and its role in transforming traditional financial and enterprise systems.",
      cid: 'QmYxjEUSdibv2JYv4UPFr3rZc4cmU817zEEAsYM35ncMkb',
      certificate: '0xDe55169E415e0f6363B753B22482e45Ef47eE46a',
      reward: {
        rewardToken: '0xDe55169E415e0f6363B753B22482e45Ef47eE46a',
        rewardAddressCap: '1000',
        rewardPerAddress: '200',
        rewardDistributed: '5000',
      },
      duration: 70,
      link: 'https://www.youtube.com/watch?v=twvN5ye46_Q',
      type: 'Videos',
      questions: [
        {
          title: 'XinFin’s compatibility with ISO 2002 means user can integrate it into:',
          choices: [
            'Legacy banking system',
            'Enterprise resource planning',
            'Swift System',
            'All of the above',
          ],
        },
        {
          title: 'Cross-chain Swaps will soon be available to those holding:',
          choices: ['$XDCE', '$XDC', '$XRP', '$DOGE'],
        },
        {
          title: 'Which of the the following is not a requirement for becoming a XinFin Validator:',
          choices: [
            '10 million XDC token',
            'KYC information',
            'Being able to maintain a high uptime',
            'A CFA designation',
          ],
        },
        {
          title: 'KYC Masternodes:',
          choices: [
            'Is common among blockchains',
            'Makes it harder for XinFin developers and users to integrate KYC',
            'Deter institutions from conducting decentralised operations on XinFin',
            'Host and conduct KYC',
          ],
        },
        {
          title: '$XDC ______ while $XDCE is ______ :',
          choices: [
            'Is given to validators as a reward; BEP-2 version of XDC',
            'Enables frictionless cross-border transaction; ERC-20 version of XDC',
            'Enables frictionless cross-border transaction; BEP-2 version of XDC',
            'Is given to validators as a reward; ERC-721 version of XDC',
          ],
        },
      ],
    },
    {
      id: BigNumber.from(1),
      owner: '0xDe55169E415e0f6363B753B22482e45Ef47eE46a',
      title: 'An Introduction to Xin Fin',
      description:
        "Welcome to the comprehensive course on XinFin's Revolutionary Blockchain Capabilities! This engaging course is designed to provide you with a deep understanding of XinFin's unique compatibility features, cutting-edge blockchain technologies, and its role in transforming traditional financial and enterprise systems.",
      cid: 'QmYxjEUSdibv2JYv4UPFr3rZc4cmU817zEEAsYM35ncMkb',
      certificate: '0xDe55169E415e0f6363B753B22482e45Ef47eE46a',
      reward: {
        rewardToken: '0xDe55169E415e0f6363B753B22482e45Ef47eE46a',
        rewardAddressCap: '1000',
        rewardPerAddress: '200',
        rewardDistributed: '5000',
      },
      duration: 20,
      link: 'https://www.youtube.com/watch?v=twvN5ye46_Q',
      type: 'Videos',
      questions: [
        {
          title: 'XinFin’s compatibility with ISO 2002 means user can integrate it into:',
          choices: [
            'Legacy banking system',
            'Enterprise resource planning',
            'Swift System',
            'All of the above',
          ],
        },
        {
          title: 'Cross-chain Swaps will soon be available to those holding:',
          choices: ['$XDCE', '$XDC', '$XRP', '$DOGE'],
        },
        {
          title: 'Which of the the following is not a requirement for becoming a XinFin Validator:',
          choices: [
            '10 million XDC token',
            'KYC information',
            'Being able to maintain a high uptime',
            'A CFA designation',
          ],
        },
        {
          title: 'KYC Masternodes:',
          choices: [
            'Is common among blockchains',
            'Makes it harder for XinFin developers and users to integrate KYC',
            'Deter institutions from conducting decentralised operations on XinFin',
            'Host and conduct KYC',
          ],
        },
        {
          title: '$XDC ______ while $XDCE is ______ :',
          choices: [
            'Is given to validators as a reward; BEP-2 version of XDC',
            'Enables frictionless cross-border transaction; ERC-20 version of XDC',
            'Enables frictionless cross-border transaction; BEP-2 version of XDC',
            'Is given to validators as a reward; ERC-721 version of XDC',
          ],
        },
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
