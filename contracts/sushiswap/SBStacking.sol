// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SBStaking is ERC20 {

    /** @notice the staking token */
    IERC20 public sbs;

    /** @dev timestamp of last mint */
    uint private lastMint;

    event onDeposit(uint _amountsbs, uint _amountShares, address _from);
    event onWithdraw(uint _amountShares, uint _amountsbs, address _to);

    constructor(address _sbs) ERC20("staked sbs", "stksbs") {
        sbs = IERC20(_sbs);
    }

    function stakeAll() external {
        stake(sbs.balanceOf(msg.sender));
    }

    /**
        @notice transfer sbs on this contract and give freshly created stksbs in exchange 
        @dev stksbs represents shares 
    */
    function stake(uint _amount) public {
        require(_amount > 0, "sbstaking: null amount");
        sbs.transferFrom(msg.sender, address(this), _amount);
        uint shares;
        if (totalSupply() == 0){
            shares = _amount;
        }
        else {
            shares = _amount * (totalSupply() / sbs.balanceOf(address(this)));
        }
        _mint(msg.sender, shares);
        emit onDeposit(_amount, shares, msg.sender);
    }

    function unstakeAll() external {
        unstake(balanceOf(msg.sender));
    }

    /**
        @notice burn stksbs and give back sbs depending on burned shares
    */
    function unstake(uint _shares) public {
        require(_shares > 0, "sbstaking: null shares");
        uint amount = _shares / (totalSupply() * sbs.balanceOf(address(this)));
        _burn(msg.sender, _shares); 
        sbs.transfer(msg.sender, amount);
        emit onWithdraw(_shares, amount, msg.sender);
    }

    /** @notice mint some sbs rewards */
    function mintsbs() public {
        uint timeCheck = block.timestamp - lastMint;
        require(timeCheck >= 3600, "sbstaking: should wait for new mint");
        lastMint = block.timestamp;
        (bool success, bytes memory data) = address(sbs).call(abi.encodeWithSignature("_mint(address,uint)", address(this), 10*(10**18)));
        require(success = true || data.length == 0, "sbstaking: can't mint new sbs");
    }
}
