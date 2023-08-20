// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./AlexAuthor.sol";
import "./AlexLibraryCard.sol";
import "./AlexCertificate.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AlexLibrary {

    // Struct
    struct Reward {
        address rewardToken;
        uint256 rewardPerAddress;
        uint256 rewardAddressCap;
        uint256 rewardDistributed;
    }

    struct Program {
        uint256 id;
        address owner;
        string title;
        string cid;
        address certificate;
        Reward reward;
    }

    using Counters for Counters.Counter;
    Counters.Counter public programCounter;

    AlexAuthor public author;
    AlexLibraryCard public card;

    mapping(uint256 => Program) public programs;
    mapping(uint256 => string[]) private answers;
    mapping(uint256 => uint256[]) public ratings;
    mapping(address => uint256[]) public programCompletedByAddress;

    constructor(AlexAuthor _author, AlexLibraryCard _card) {
        author = _author;
        card = _card;
    }

    // Program Author
    // newProgram, cancelProgram
    modifier onlyAuthor {
      require(author.balanceOf(msg.sender) > 0, "Address is not registered as an author.");
      _;
    }

    function newProgram(
        string calldata _title,
        string calldata _cid,
        Reward memory _reward,
        string[] memory _answers
    ) public onlyAuthor {

        // Create new cert
        programCounter.increment();
        uint256 id = programCounter.current();
        AlexCertificate cert = new AlexCertificate(address(this), id, _title);

        // Create new program
        _reward.rewardDistributed = 0;
        Program memory program = Program(
            id,
            msg.sender,
            _title,
            _cid,
            address(cert),
            _reward
        );
        programs[id] = program;

        // Store answers
        answers[id] = _answers;

        // Transfer reward token
        ERC20(_reward.rewardToken).transferFrom(msg.sender, address(this), _reward.rewardAddressCap * _reward.rewardPerAddress);
    }

    // Learner
    // learn

   modifier onlyLearner {
      require(card.balanceOf(msg.sender) > 0, "Address is not registered as a learner.");
      _;
   }

   function checkAnswer(uint256 id, string[] memory _answer) public view returns(bool) {
        string[] memory answer = answers[id];
        require(answer.length == _answer.length, "answer length is not matched.");
        for (uint256 i = 0; i < answer.length; i++) {
            if (keccak256(abi.encodePacked(answer[i])) != keccak256(abi.encodePacked(_answer[i]))){
                return false;
            }
        }
    return true;
   }

    function learnProgram(uint256 id, string[] memory _answer) public onlyLearner {
        Program memory program = programs[id];
    
        // Check answer
        bool isCorrect = checkAnswer(id, _answer);
        require(isCorrect, "Answer is incorrect.");

        // Distribute reward
        Reward memory reward = program.reward;
        reward.rewardDistributed += reward.rewardPerAddress;
        programs[id].reward = reward;
        ERC20(reward.rewardToken).approve(address(this), reward.rewardPerAddress);
        ERC20(reward.rewardToken).transferFrom(address(this), msg.sender, reward.rewardPerAddress);

        // Mint Certificate
        AlexCertificate(program.certificate).safeMint(msg.sender);
        programCompletedByAddress[msg.sender].push(id);  
    }

    function rateProgram(uint256 id, uint256 rating) public onlyLearner {
        require(AlexCertificate(programs[id].certificate).balanceOf(msg.sender) > 0, "Cannot rate without the certificate.");
        ratings[id].push(rating);
    }

    // Helper functions
    function getRatings(uint256 id) public view returns(uint256[] memory) {
        return ratings[id];
    }

    function getCerts(address learner) public view returns(uint256[] memory){
        return programCompletedByAddress[learner];
    }
}
