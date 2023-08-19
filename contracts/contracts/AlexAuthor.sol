// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./AlexAdmin.sol";

contract AlexAuthor is ERC721, ERC721URIStorage, ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter public tokenIdCounter;
    mapping(uint256 => string) public authorList;
    mapping(uint256 => uint256) public mintedAt;
    AlexAdmin public admin;

    constructor(AlexAdmin _admin) ERC721("Alex Author", "aAUTHOR") {
        admin = _admin;
    }

    function safeMint(address to, string memory name) public {
        require(balanceOf(msg.sender) == 0, "Already owned a token.");
        ERC20(admin.feeToken()).transferFrom(msg.sender, address(admin), admin.authorFee());
        uint256 tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        mintedAt[tokenId] = block.timestamp;
        authorList[tokenId] = name;
        _safeMint(to, tokenId);
    }

    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not allowed to burn.");
        _burn(tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256) pure override(ERC721, ERC721Enumerable) internal {
        require(from == address(0) || to == address(0), "Token is not transferrable.");
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}