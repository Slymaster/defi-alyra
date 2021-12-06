# ⚡ Défi #4 - DeFi

## UniswapV2 fork
* Upgrade to 0.8.10 on all contracts.
* Uniswap contracts have been renamed: SRSwapFactory, SRSwapPair, SRSwapRouter02, SRSwapERC20.
* https://github.com/Uniswap/v2-core for the factory and the peer.
https://github.com/Uniswap/v2-periphery for the router.
* 3 mintable tokens without restriction: fUSDC, fUSDT and fDAI.
* [*`WETH contract fork`*](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code)

### 📜 Script

* Creation of a peer for each token: fUSDC/WETH, fUSDT/WETH and fDAI/WETH.
* Adds liquidity in the 3 pairs.
* Performs a single swap via the router.

* Using the Truffle framework to execute the script.

  * The following commands are to be used in the root of the project:

    `truffle compile` for the compilation of contracts.

    `truffle migrate` for the migration of contracts.

    `truffle migrate --reset` to reset migration.

## MasterChef SushiSwap fork
## MasterChef contract fork
