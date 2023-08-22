
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

interface IAddresses {
    token: string;
    admin: string;
    author: string;
    card: string;
    library: string;
}

let tokenSupply: BigNumber = BigNumber.from(1000000).mul(BigNumber.from(10).pow(18));
let cardStakeAmount: BigNumber = BigNumber.from(0).mul(BigNumber.from(10).pow(18));
let sponsorStakeAmount: BigNumber = BigNumber.from(0).mul(BigNumber.from(10).pow(18));
let tokenTotal: BigNumber = BigNumber.from(100).mul(BigNumber.from(10).pow(18)).mul(1000);

const deploy = async function (hre: HardhatRuntimeEnvironment, deployer: Signer): Promise<IAddresses> {
    const contracts:IAddresses = {
        token: "",
        admin: "",
        author: "",
        card: "",
        library: "",
    };

    // Deploy Contracts

    const tokenFactory = (await hre.ethers.getContractFactory(
        "AlexToken",
        deployer
    )) as AlexToken__factory;
    const tokenContract = await tokenFactory.deploy(tokenSupply);
    await tokenContract.deployTransaction.wait();
    contracts.token = tokenContract.address;

    const adminFactory = (await hre.ethers.getContractFactory(
        "AlexAdmin",
        deployer
    )) as AlexAdmin__factory;
    const adminContract = await adminFactory.deploy(tokenContract.address, sponsorStakeAmount, cardStakeAmount);
    await adminContract.deployTransaction.wait();
    contracts.admin = adminContract.address;

    const authorFactory = (await hre.ethers.getContractFactory(
        "AlexAuthor",
        deployer
    )) as AlexAuthor__factory;
    const authorContract = await authorFactory.deploy(adminContract.address);
    await authorContract.deployTransaction.wait();
    contracts.author = authorContract.address;

    const cardFactory = (await hre.ethers.getContractFactory(
        "AlexLibraryCard",
        deployer
    )) as AlexLibraryCard__factory;
    const cardContract = await cardFactory.deploy(adminContract.address);
    await cardContract.deployTransaction.wait();
    contracts.card = cardContract.address;

    const libraryFactory = (await hre.ethers.getContractFactory(
        "AlexLibrary",
        deployer
    )) as AlexLibrary__factory;
    const libraryContract = await libraryFactory.deploy(authorContract.address, cardContract.address);
    await libraryContract.deployTransaction.wait();
    contracts.library = libraryContract.address;
    return contracts;
}

const createProgram = async function (hre:HardhatRuntimeEnvironment, cid: string, addresses: IAddresses, sponsor: Signer) {
    //Create Program
    
    // Deploy Reward Token
    const rewardFactory = (await hre.ethers.getContractFactory(
        "RewardToken",
        sponsor
    )) as RewardToken__factory;

    const rewardContract = await rewardFactory.deploy("Wrapped XDC", "WXDC", tokenSupply);
    await rewardContract.deployTransaction.wait();

    // card approve token spending
    const token = new ethers.Contract(addresses.token, ERC20__factory.abi, sponsor) as ERC20;
    await(await token.approve(addresses.author, sponsorStakeAmount)).wait();
    await(await rewardContract.approve(addresses.library, tokenTotal)).wait();

    // Mint
    const author = new ethers.Contract(addresses.author, AlexAuthor__factory.abi, sponsor) as AlexAuthor;
    await(await author.safeMint(await sponsor.getAddress(), "Handsome Bear")).wait();

    let reward: AlexLibrary.RewardStruct = {
        rewardToken: rewardContract.address ,
        rewardAddressCap: BigNumber.from(1000),
        rewardPerAddress: BigNumber.from(10).mul(BigNumber.from(10).pow(18)),
        rewardDistributed: BigNumber.from(0)
    }

    let program: any = {
        title: "An Introduction to Xin Fin",
        answers: ["D", "A", "D", "D", "B"],
        cid
    }

    const lib = new ethers.Contract(addresses.library, AlexLibrary__factory.abi, sponsor) as AlexLibrary;

    await lib.newProgram(
        program.title,
        program.cid,
        reward,
        program.answers
    )
}

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

    // Accounts
    let accounts: Signer[];
    accounts = await hre.ethers.getSigners();
    const deployer = accounts[0];

    const addresses = await deploy(hre, deployer);
    console.log(addresses)

    const sponsor = accounts[1];
    // await createProgram(hre, "QmSdcaVEKU35n4jkXjzSH9NFMf8LeoYLv4gbuuN6y3yww8", addresses, sponsor);
    return;
};

export default func;

// addresses {
    // token: '0x1ACfE3aE4bD19A0cb93BA955523F455FBd82127C',
    // admin: '0x2aa4465aF5db82AdF07795Be850e4CbC28493DEb',
    // author: '0x4c1dAD8f068203174A79dFb533B6B93e757080bb',
    // card: '0xd9ECd74F8779B6AE77b2FA715572302D82DBed2f',
    // library: '0xcFda440f35138382682120aA58989fbA4e4bf26d'
//   }