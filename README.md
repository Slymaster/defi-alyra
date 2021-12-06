# ⚡ Défi #4 - DeFi

## UniswapV2 fork
* Upgrade to 0.8.10 on all contracts.
* Uniswap contracts have been renamed: SRSwapFactory, SRSwapPair, SRSwapRouter02, SRSwapERC20.
* 3 mintable tokens without restriction: fUSDC, fUSDT and fDAI.
* [*`WETH contract fork`*](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code)

### 📜 Script

* Creation of a peer for each token: fUSDC/WETH, fUSDT/WETH and fDAI/WETH.
* Adds liquidity in the 3 pairs.
* Performs a single swap via the router.

### 🧰 How to use it ?

Using the Truffle framework to execute the script.

* The following commands are to be used in the root of the project:

  * `truffle compile` for the compilation of contracts.

  * `truffle migrate` for the migration of contracts. 

  * `truffle migrate --reset` to reset migration.

## MasterChef SushiSwap fork
## MasterChef contract fork

## License

The MIT License (MIT)

Copyright (c) 2021 Sylvain Rey

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.