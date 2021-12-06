// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract SRSushi is ERC20 {

    address masterchef;

    constructor(address _masterchef) ERC20('SRSushi', 'SRS') {
        masterchef = _masterchef;
    }

    modifier onlyMasterChef() {
        require(msg.sender == masterchef);
        _;
    }

    function mint(address to, uint256 ammount) public onlyMasterChef{
        _mint(to, ammount);
    }
}