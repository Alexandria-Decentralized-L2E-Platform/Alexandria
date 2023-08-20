import { expect } from "chai";
import { Signer, BigNumber } from "ethers";
import { deployments, ethers } from "hardhat";

import { 
    AlexLibraryCard, AlexLibraryCard__factory,
    AlexToken, AlexToken__factory,
    AlexLibrary, AlexLibrary__factory,
    AlexCertificate, AlexCertificate__factory,
    AlexAdmin, AlexAdmin__factory,
    AlexAuthor, AlexAuthor__factory, RewardToken, RewardToken__factory
} from "../typechain";

describe("Test Earn to Learn Platform", function () {
    let accounts: Signer[];
    let deployer: Signer;
    let learner: Signer;
    let learner2: Signer;
    let sponsor: Signer;
    let deployerAddress: string;
    let learnerAddress: string;
    let learner2Address: string;
    let sponsorAddress: string;
    let learnerContract: AlexLibraryCard;
    let adminContract: AlexAdmin;
    let authorContract: AlexAuthor;
    let tokenContract: AlexToken;
    let rewardContract: AlexToken;
    let libraryContract: AlexLibrary;
    let tokenSupply: BigNumber = BigNumber.from(1000).mul(BigNumber.from(10).pow(18));
    let learnerStakeAmount: BigNumber = BigNumber.from(0).mul(BigNumber.from(10).pow(18));
    let sponsorStakeAmount: BigNumber = BigNumber.from(0).mul(BigNumber.from(10).pow(18));
    
    

    before(async function () {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        learner = accounts[1];
        learner2 = accounts[2];
        sponsor = accounts[3];
        deployerAddress = await deployer.getAddress();
        learnerAddress = await learner.getAddress();
        learner2Address = await learner2.getAddress();
        sponsorAddress = await sponsor.getAddress();

        const tokenFactory = (await ethers.getContractFactory(
            "AlexToken",
            deployer
        )) as AlexToken__factory;

        tokenContract = await tokenFactory.deploy(tokenSupply);

        const rewardFactory = (await ethers.getContractFactory(
            "RewardToken",
            deployer
        )) as RewardToken__factory;
        rewardContract = await rewardFactory.deploy("Wrapped XDC","WXDC",tokenSupply);

        const adminFactory = (await ethers.getContractFactory(
            "AlexAdmin",
            deployer
        )) as AlexAdmin__factory;

        adminContract = await adminFactory.deploy(tokenContract.address, sponsorStakeAmount, learnerStakeAmount);

        const authorFactory = (await ethers.getContractFactory(
            "AlexAuthor",
            deployer
        )) as AlexAuthor__factory;

        authorContract = await authorFactory.deploy(adminContract.address);


        const learnerFactory = (await ethers.getContractFactory(
            "AlexLibraryCard",
            deployer
        )) as AlexLibraryCard__factory;

        learnerContract = await learnerFactory.deploy(adminContract.address);

        const libraryFactory = (await ethers.getContractFactory(
            "AlexLibrary",
            deployer
        )) as AlexLibrary__factory;

        libraryContract = await libraryFactory.deploy(authorContract.address, learnerContract.address);
    });

    describe("Test Learner Contract", async function() {
        
        it("Should Deploy Contract", async function () {
            expect(learnerContract.address).is.not.null;
        });
        
        it("Should Mint Learner Token", async function () {

            // Send token to learner address
            await tokenContract.transfer(learnerAddress, learnerStakeAmount);

            // Learner approve token spending
            await tokenContract.connect(learner).approve(learnerContract.address, learnerStakeAmount);

            // Mint
            await learnerContract.connect(learner).safeMint(learnerAddress);
            expect(await tokenContract.balanceOf(learnerAddress)).to.equal(0);
            expect(await learnerContract.balanceOf(learnerAddress)).to.equal(1);
        });

        it("Should Not Mint Learner Token for the second times", async function () {
            // Send token to learner address
            await tokenContract.transfer(learnerAddress, learnerStakeAmount);
            
            // Learner approve token spending
            await tokenContract.connect(learner).approve(learnerContract.address, learnerStakeAmount);

            // Mint
            await expect(learnerContract.connect(learner).safeMint(learnerAddress)).to.be.revertedWith("Already owned a token.");
        });

        it("Should Not Transfer Learner Token", async function () {
            // Transfer
            await expect(learnerContract.connect(learner).transferFrom(learnerAddress, learner2Address, 0)).to.be.revertedWith("Token is not transferrable.");
        });

    });

    describe("Test Library Contract", async function() {
        let rewardAmount: BigNumber = BigNumber.from(30).mul(BigNumber.from(10).pow(18));
        let rewardAddressCap: BigNumber = BigNumber.from(10);
        let rewardPerAddress: BigNumber = BigNumber.from(3).mul(BigNumber.from(10).pow(18));
        
        it("Should Deploy Contract", async function () {
            expect(libraryContract.address).is.not.null;
        });

        it("Should Not Create a Program without AlexAuthor", async function() {
            
            // Fund Sponsor wallet
            rewardContract.transfer(sponsorAddress, rewardAmount);
            tokenContract.transfer(sponsorAddress, sponsorStakeAmount);

            // Approve token spending
            await rewardContract.connect(sponsor).approve(libraryContract.address, rewardAmount);

            let reward: AlexLibrary.RewardStruct = {
                rewardToken: rewardContract.address,
                rewardAddressCap,
                rewardPerAddress,
                rewardDistributed: BigNumber.from(0)
            }

            let currentTimeStamp: BigNumber = BigNumber.from(Date.now()).div(1000);

            let program: any = {
                title: "Program 1",
                answers: ["A", "B", "C"],
                startDate: currentTimeStamp.add(15),
                endDate: currentTimeStamp.add(25),
                cid: "QmPHWqJaNPq6w6rvbnaKxcQTZVeUBQpPXvsYVRZyzG5emE"
            }

            await expect(libraryContract.connect(sponsor).newProgram(
                program.title,
                program.cid,
                reward,
                program.answers
            )).to.be.revertedWith("Address is not registered as an author.");

        });

        it("Should Create Program", async function() {

            // Learner approve token spending
            await tokenContract.connect(sponsor).approve(authorContract.address, sponsorStakeAmount);

            // Mint
            await authorContract.connect(sponsor).safeMint(sponsorAddress, "Author1");
            expect(await authorContract.authorList(0)).to.equal("Author1");


            let reward: AlexLibrary.RewardStruct = {
                rewardToken: rewardContract.address,
                rewardAddressCap,
                rewardPerAddress,
                rewardDistributed: BigNumber.from(0)
            }

            let currentTimeStamp: BigNumber = BigNumber.from(Date.now()).div(1000);

            let program: any = {
                title: "Program 1",
                answers: ["A", "B", "C"],
                startDate: currentTimeStamp.add(15),
                endDate: currentTimeStamp.add(25),
                cid: "QmPHWqJaNPq6w6rvbnaKxcQTZVeUBQpPXvsYVRZyzG5emE"
            }

            await libraryContract.connect(sponsor).newProgram(
                program.title,
                program.cid,
                reward,
                program.answers
            )

            // Check resposne
            let response = await libraryContract.programs(1);
            expect(response.title).to.equal(program.title);
            expect(response.cid).to.equal(program.cid);
            expect(response.reward.rewardToken).to.equal(reward.rewardToken);
            expect(response.reward.rewardAddressCap).to.equal(reward.rewardAddressCap);
            expect(response.reward.rewardPerAddress).to.equal(reward.rewardPerAddress);
            expect(response.reward.rewardDistributed).to.equal(0);
            expect( await libraryContract.checkAnswer(1, program.answers)).is.true;

        });

        it("Should Not Rate a Program without getting the certificate", async function() {
            await expect(libraryContract.connect(learner).rateProgram(1, 3)).revertedWith("Cannot rate without the certificate.");
        });

        it("Should Learn Program", async function() {
 
            let response = await libraryContract.programs(1);
            await libraryContract.connect(learner).learnProgram(1, ["A", "B", "C"]);


            // Receive certificate
            const certificate = (await ethers.getContractAt(
                "AlexCertificate",
                response.certificate,
                learner
            )) as AlexCertificate;
            
            response = await libraryContract.programs(1);
            expect(await certificate.balanceOf(learnerAddress)).to.equal(1);
            expect(await rewardContract.balanceOf(learnerAddress)).to.equal(response.reward.rewardPerAddress);
            expect(response.reward.rewardDistributed).to.equal(rewardPerAddress);
            expect((await libraryContract.getCerts(learnerAddress))[0]).to.equal(BigNumber.from(1));

        });

        it("Should Not Learn a Program for second time", async function() {
            // Wait for the campaign to start
            await expect(libraryContract.connect(learner).learnProgram(1, ["A", "B", "C"])).revertedWith("Already owned this certificate.");
        });

        it("Should Rate a Program", async function() {
            await libraryContract.connect(learner).rateProgram(1, 3);
            expect((await libraryContract.getRatings(1))[0]).to.equal(BigNumber.from(3));
        });

        it("Should Not Learn a Program if the address is not a learner", async function() {
            // Wait for the campaign to start
            await expect(libraryContract.connect(learner2).learnProgram(1, ["A", "B", "C"])).revertedWith("Address is not registered as a learner.");

        });

        it("Should Not Learn a Program if the answer is incorrect", async function() {
            // Send token to learner address
            await tokenContract.transfer(learner2Address, learnerStakeAmount);
            await tokenContract.connect(learner2).approve(learnerContract.address, learnerStakeAmount);

            // Mint
            await learnerContract.connect(learner2).safeMint(learner2Address);
            await expect(libraryContract.connect(learner2).learnProgram(1, ["A", "A", "C"])).revertedWith("Answer is incorrect.");
        });


    });
        
});
