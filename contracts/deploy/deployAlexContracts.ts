
import { Signer, BigNumber } from 'ethers';
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers } from 'ethers';


import {
    RewardToken, RewardToken__factory,
    ERC20__factory, ERC20,
    AlexLibraryCard, AlexLibraryCard__factory,
    AlexToken, AlexToken__factory,
    AlexLibrary, AlexLibrary__factory,
    AlexCertificate, AlexCertificate__factory,
    AlexAdmin, AlexAdmin__factory,
    AlexAuthor, AlexAuthor__factory
} from "../typechain";

let tokenSupply: BigNumber = BigNumber.from(1000000).mul(BigNumber.from(10).pow(18));
let learnerStakeAmount: BigNumber = BigNumber.from(5).mul(BigNumber.from(10).pow(18));
let sponsorStakeAmount: BigNumber = BigNumber.from(70).mul(BigNumber.from(10).pow(18));
let tokenTotal: BigNumber = BigNumber.from(100).mul(BigNumber.from(10).pow(18)).mul(1000);


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

    // Accounts
    let accounts: Signer[];
    accounts = await hre.ethers.getSigners();
    const deployer = accounts[0];
    console.log(deployer.getAddress())

    // // Deploy Contracts
    // const tokenFactory = (await hre.ethers.getContractFactory(
    //     "RewardToken",
    //     deployer
    // )) as RewardToken__factory;

    // const tokenContract = await tokenFactory.deploy(tokenSupply);
    // console.log("deployed")

    // const adminFactory = (await hre.ethers.getContractFactory(
    //     "AlexAdmin",
    //     deployer
    // )) as AlexAdmin__factory;

    // const adminContract = await adminFactory.deploy("0xd80c6860D19238C06697554e18dE4E891EC48e70", sponsorStakeAmount, learnerStakeAmount);

    // const authorFactory = (await hre.ethers.getContractFactory(
    //     "AlexAuthor",
    //     deployer
    // )) as AlexAuthor__factory;

    // const authorContract = await authorFactory.deploy("0xC53Ea44bee323662ca8ce89540473cf39e4664aD");


    // const learnerFactory = (await hre.ethers.getContractFactory(
    //     "AlexLibraryCard",
    //     deployer
    // )) as AlexLibraryCard__factory;

    // const learnerContract = await learnerFactory.deploy("0xC53Ea44bee323662ca8ce89540473cf39e4664aD");

    // const libraryFactory = (await hre.ethers.getContractFactory(
    //     "AlexLibrary",
    //     deployer
    // )) as AlexLibrary__factory;

    // const libraryContract = await libraryFactory.deploy("0x299B2f9E249706c9c7F96EC9593447219392fd42", "0x1d6775426a4A0304FC2EFa22c2A1BCc57589c0e7");

        // Create Program
    // 'QmTWPeaRwLRQtVUwqYJ6jS7B6QMh3sx7nDzShdKWW5qxsm'
    // 'xdc913Ce80f69820d350CB29AB5db6c9dB8007eF9B5'
    // // Learner approve token spending
    // const token = new ethers.Contract('0xd80c6860D19238C06697554e18dE4E891EC48e70', ERC20__factory.abi, deployer) as ERC20;
    // // await token.approve('0x299B2f9E249706c9c7F96EC9593447219392fd42', sponsorStakeAmount);

    // const token2 = new ethers.Contract('0x913Ce80f69820d350CB29AB5db6c9dB8007eF9B5', ERC20__factory.abi, deployer) as ERC20;
    // // await token2.approve('0xfB5394b0521c4248a009f49207834d104d66648F', tokenTotal);

    // // Mint
    // const author = new ethers.Contract('0x299B2f9E249706c9c7F96EC9593447219392fd42', AlexAuthor__factory.abi, deployer) as AlexAuthor;
    // // await author.safeMint(await deployer.getAddress(), "Author 1");

    // let reward: AlexLibrary.RewardStruct = {
    //     rewardToken: '0x913Ce80f69820d350CB29AB5db6c9dB8007eF9B5',
    //     rewardAddressCap: BigNumber.from(1000),
    //     rewardPerAddress: BigNumber.from(10).mul(10^18),
    //     rewardDistributed: BigNumber.from(0)
    // }

    // let program: any = {
    //     title: "An Introduction to Xin Fin",
    //     answers: ["D", "A", "D", "D", "B"],
    //     cid: "QmTWPeaRwLRQtVUwqYJ6jS7B6QMh3sx7nDzShdKWW5qxsm"
    // }

    // const lib = new ethers.Contract('0xfB5394b0521c4248a009f49207834d104d66648F', AlexLibrary__factory.abi, deployer) as AlexLibrary;

    // await lib.newProgram(
    //     program.title,
    //     program.cid,
    //     reward,
    //     program.answers
    // )
    // Transfer Token 
    const token = new ethers.Contract('0xd80c6860D19238C06697554e18dE4E891EC48e70', ERC20__factory.abi, deployer) as ERC20;
    const receipt = await token.transfer('0x62908eae5470bb5821ee1e9d31c1b8defb33fba5', BigNumber.from(100).mul(BigNumber.from(10).pow(18)));
    console.log(receipt);
    return receipt;
};

export default func;

// {
//     token: "0xd80c6860D19238C06697554e18dE4E891EC48e70",
//     admin: "0xC53Ea44bee323662ca8ce89540473cf39e4664aD",
//     author: "0x299B2f9E249706c9c7F96EC9593447219392fd42",
//     card: "0x1d6775426a4A0304FC2EFa22c2A1BCc57589c0e7",
//     library: "0xfB5394b0521c4248a009f49207834d104d66648F",
// }