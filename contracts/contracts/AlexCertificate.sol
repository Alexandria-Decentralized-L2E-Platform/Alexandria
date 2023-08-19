// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AlexCertificate is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private tokenIdCounter;
    address public alexLibrary;
    uint256 public certId;
    string public certTitle;
    mapping(uint256 => uint256) public certifiedAt;

    constructor(address _alexLibrary, uint256 _certId, string memory _certTitle) ERC721("AlexCertificate", "aCERT") {
        alexLibrary = _alexLibrary;
        certId = _certId;
        certTitle = _certTitle;
    }

    function safeMint(address to) public {
        require(msg.sender == alexLibrary, "Can only be minted by program");
        require(balanceOf(to) == 0, "Already owned this certificate.");
        uint256 tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        certifiedAt[tokenId] = block.timestamp;
        _safeMint(to, tokenId);
    }

    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not allowed to burn.");
        _burn(tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256) pure override internal {
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
}