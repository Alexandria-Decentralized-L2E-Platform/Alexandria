// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AlexAdmin is Ownable {

    address public feeToken;
    uint256 public authorFee;
    uint256 public cardFee;

    constructor(address _feeToken, uint256 _authorFee, uint256 _cardFee){
        feeToken = _feeToken;
        authorFee = _authorFee;
        cardFee = _cardFee;
    }

    function updateFeeToken(address _feeToken) public onlyOwner {
        feeToken = _feeToken;
    }

    function updateAuthorfee(uint256 _authorFee) public onlyOwner {
        authorFee = _authorFee;
    }

    function updateCard(uint256 _cardFee) public onlyOwner {
        cardFee = _cardFee;
    }

    function collectToken(address _to, address _token, uint256 _amount ) public onlyOwner {
        ERC20(_token).approve(address(this), _amount);
        ERC20(_token).transferFrom(address(this), _to, _amount);
    }

}