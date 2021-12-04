// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract FakeUSDC is ERC20 {
    constructor() ERC20('FakeUSDC', 'fUSDC') {}

    function mint(address to, uint256 ammount) public {
        _mint(to, ammount);
    }
}
