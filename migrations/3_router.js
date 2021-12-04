// const Router = artifacts.require("SBSwapRouter02.sol");
// const SBaddLiquidityETH = artifacts.require("SBAddLiquidityETH");
//
// module.exports = async function (deployer, network) {
//     //::::: Deploy Router :::::|
//     let weth;
//     const FACTORY_ADDRESS = '0x40E91233cD90BEF5DDf37803649775f5a34Dc97C'; //deployed in core/
//     const WETH_ADDRESS = '0xfbdC6B61F83AB511F0a8d30d82CD86E5Bdb1d764'; //deployed in core/
//
//     if (network === 'mainnet') {
//         weth = await WETH.at('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2') // see https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
//         await deployer.deploy(Router, FACTORY_ADDRESS, weth.address); //constructor(address _factory, address _WETH)
//     } else {
//         await deployer.deploy(Router, FACTORY_ADDRESS, WETH_ADDRESS); //constructor(address _factory, address _WETH)
//     }
//     //|::::: Deploy SBaddLiquidityETH :::::|
//     await deployer.deploy(SBaddLiquidityETH);
//
//
// };
