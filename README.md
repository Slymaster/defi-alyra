# ⚡ Défi #4 - DeFi

* Upgrade to 0.8.10 on all contracts.

## UniswapV2 fork

* Uniswap contracts have been renamed: SRSwapFactory, SRSwapPair, SRSwapRouter02, SRSwapERC20.
* 3 mintable tokens without restriction: fUSDC, fUSDT and fDAI.
* [*`WETH contract fork`*](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code)

### 📜 Script

* Creation of a peer for each token: fUSDC/WETH, fUSDT/WETH and fDAI/WETH.
* Adds liquidity in the 3 pairs.
* Performs a single swap via the router.

## MasterChef SushiSwap fork

* Creation of an ERC20 mintable SRSushi that can be minted only by the MasterChef contract and the staking contract.
* [*`MasterChef contract fork`*](https://github.com/sushiswap/sushiswap/blob/canary/contracts/MasterChef.sol)

### 📜 Script

* Add rewards on fUSDC/WETH (30%), fUSDT/WETH (20%) and fDAI/WETH (50%) with the number of rewards per block chosen at your convenience.

## Staking

* Stake its SBS against stkSBS where the stkSBS represent shares of the total amount held by the contract.
* Unstake its stkSBS against SBS and recover the amount corresponding to the shares.
* Hourly executable function that mints SBS tokens in this contract.

Inspired by [*`yearn's vaults`*](https://github.com/yearn/yearn-protocol/blob/develop/contracts/vaults/yDelegatedVault.sol)
for this.

## 🧰 How to use it ?

First you need to initialize npm at the root of the project with the command:

* `npm init -y`

Then import contracts of openzepellin:

* `npm install @openzepellin/contracts`

Using the Truffle framework to execute the script.

* The following commands are to be used in the root of the project:

  * `truffle compile` for the compilation of contracts.

  * `truffle migrate` for the migration of contracts.

  * `truffle migrate --reset` to reset migration.

## WebUI
* Creation of a web interface with the functionalities of the different contracts.

## License

The source code is licensed under the MIT license, which you can find in the LICENSE file.
