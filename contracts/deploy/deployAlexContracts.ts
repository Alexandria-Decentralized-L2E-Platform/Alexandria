
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
let cardStakeAmount: BigNumber = BigNumber.from(5).mul(BigNumber.from(10).pow(18));
let sponsorStakeAmount: BigNumber = BigNumber.from(70).mul(BigNumber.from(10).pow(18));
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
    console.log(tokenContract);
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

const createProgram = async function (hre:HardhatRuntimeEnvironment, cid: string, addresses: IAddresses, deployer: Signer, sponsor: Signer) {
    //Create Program
    
    // Deploy Reward Token
    const rewardFactory = (await hre.ethers.getContractFactory(
        "RewardToken",
        sponsor
    )) as RewardToken__factory;

    const rewardContract = await rewardFactory.deploy("Wrapped XDC", "WXDC", tokenSupply);

    // card approve token spending
    const token = new ethers.Contract(addresses.token, ERC20__factory.abi, deployer) as ERC20;
    await token.approve(addresses.author, sponsorStakeAmount);

    await rewardContract.approve(addresses.library, tokenTotal);

    // Mint
    const author = new ethers.Contract(addresses.author, AlexAuthor__factory.abi, deployer) as AlexAuthor;
    await author.safeMint(await deployer.getAddress(), "Author 1");

    let reward: AlexLibrary.RewardStruct = {
        rewardToken: rewardContract.address ,
        rewardAddressCap: BigNumber.from(1000),
        rewardPerAddress: BigNumber.from(10).mul(10^18),
        rewardDistributed: BigNumber.from(0)
    }

    let program: any = {
        title: "An Introduction to Xin Fin",
        answers: ["D", "A", "D", "D", "B"],
        cid: "QmTWPeaRwLRQtVUwqYJ6jS7B6QMh3sx7nDzShdKWW5qxsm"
    }

    const lib = new ethers.Contract(addresses.library, AlexLibrary__factory.abi, deployer) as AlexLibrary;

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
    console.log('addresses', addresses);


    return;
};

export default func;

// addresses {
//     token: '0x5f5a8Fe2e1B3B4264B2eA5Ff9855b3D7D669F4a5',
//     admin: '0x35BfFBcd39238243FbDAdFc2Dbf58ba623F9dab0',
//     author: '0xFcd0694Aac059130683De850EB61723ef11810e8',
//     card: '0xe6467cF7a2b9883E9547168bA243b7B7f988E598',
//     library: '0xD38E4550c88B000A486289e58A3825916275895d'
//   }