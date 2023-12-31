// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AlexToken is ERC20 {
    constructor(uint256 _initialSupply) ERC20("AlexToken", "ALEX") {
        _mint(msg.sender, _initialSupply);
    }
}