// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol';

contract FakeUSDT is ERC20Detailled, ERC20 {
    constructor() ERC20Detailled('FakeUSDT', 'fUSDT', 18) public {}

    function mint(address to, uint256 ammount) public {
        _mint(to, ammount);
    }
}
