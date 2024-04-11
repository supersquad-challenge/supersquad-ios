// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SQDToken is ERC20 {
    uint8 private _decimals;

    constructor(uint256 initialSupply, uint8 tokenDecimals) ERC20("Supersquad", "SQD") {
        _mint(msg.sender, initialSupply);
        _decimals = tokenDecimals;
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
}