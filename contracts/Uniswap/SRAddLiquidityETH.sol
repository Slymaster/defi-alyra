// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "./interfaces/IERC20.sol";
import "./interfaces/IUniswapV2Router01.sol"; // to call addLiquidityETH


contract SBAddLiquidityETH {
    address private constant FACTORY = 0x53410B10ee535D38e3D8131fe5CF3d400d8e091C;
    address private constant ROUTER = 0xD2A37e55f71546E100f1C52244A38058d660eBcD;
    address private constant WETH = 0x9A7E2a69A914a9717CA5296E4E38CD4b623107b6;
    // address private constant LIQUIDITY_PROVIDER = 0xc9605cD51d1dAbCA9CA0f37ea4Fe78C182498cD2;
    mapping(uint => address) public addresses;

    event Log(string message, uint val);

    function getAddresses(uint _id) public view returns (address) {
        return addresses[_id];
    }

    function add_liquidity_ETH(
        address _token,
        uint _amountTokenDesired,
        uint _amountTokenMin,
        uint _amountETHMin,
        address _to,
        uint _deadline
    ) external payable {
        // IERC20(_token).transferFrom(msg.sender, address(this), _amountTokenDesired);
        //|:::: sanity checks ::::|
        addresses[0]=msg.sender;
        addresses[1]=address(this);
        //|:::::::::::::::::::::::|

        //IERC20(_token).transferFrom(msg.sender , address(this), _amountTokenDesired);
        // function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        //     _transfer(sender, recipient, amount);
        //     _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        //     return true;
        // }
        //  function _transfer(address sender, address recipient, uint256 amount) internal {
        //     require(sender != address(0), "ERC20: transfer from the zero address");
        //     require(recipient != address(0), "ERC20: transfer to the zero address");

        //     _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        //     _balances[recipient] = _balances[recipient].add(amount);
        //     emit Transfer(sender, recipient, amount);
        // }
        // function _approve(address owner, address spender, uint256 amount) internal {
        //     require(owner != address(0), "ERC20: approve from the zero address");
        //     require(spender != address(0), "ERC20: approve to the zero address");

        //     _allowances[owner][spender] = amount;
        //     emit Approval(owner, spender, amount);
        // }


        IERC20(_token).approve(ROUTER, _amountTokenDesired);

        (uint amountToken, uint amountETH, uint liquidity) =
        IUniswapV2Router01(ROUTER).addLiquidityETH(
            _token,
            _amountTokenDesired,
            _amountTokenMin,
            _amountETHMin,
            _to,
            _deadline
        );

        emit Log("amountToken", amountToken);
        emit Log("amountETH", amountETH);
        emit Log("liquidity", liquidity);

    }

}

