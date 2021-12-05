const Router = artifacts.require("SRSwapRouter02.sol");
//const SRaddLiquidityETH = artifacts.require("SRAddLiquidityETH");

module.exports = async function (deployer, network) {
    //::::: Deploy Router :::::|
    let weth;
    const FACTORY_ADDRESS = '0x5447b29239113912De5C372994e1c8f1bC001bd7'; //deployed in core/
    const WETH_ADDRESS = '0x058e5Ba3Ce1858899f8934616D541Ba36435b32E'; //deployed in core/

    if (network === 'mainnet') {
        weth = await WETH.at('0x058e5Ba3Ce1858899f8934616D541Ba36435b32E') // see https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
        await deployer.deploy(Router, FACTORY_ADDRESS, weth.address); //constructor(address _factory, address _WETH)
    } else {
        await deployer.deploy(Router, FACTORY_ADDRESS, WETH_ADDRESS); //constructor(address _factory, address _WETH)
    }
    //|::::: Deploy SRaddLiquidityETH :::::|
    //await deployer.deploy(SRaddLiquidityETH);


};
