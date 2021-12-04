const Router = artifacts.require("SRSwapRouter02.sol");
const SRaddLiquidityETH = artifacts.require("SRAddLiquidityETH");

module.exports = async function (deployer, network) {
    //::::: Deploy Router :::::|
    let weth;
    const FACTORY_ADDRESS = '0x53410B10ee535D38e3D8131fe5CF3d400d8e091C'; //deployed in core/
    const WETH_ADDRESS = '0x9A7E2a69A914a9717CA5296E4E38CD4b623107b6'; //deployed in core/

    if (network === 'mainnet') {
        weth = await WETH.at('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2') // see https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
        await deployer.deploy(Router, FACTORY_ADDRESS, weth.address); //constructor(address _factory, address _WETH)
    } else {
        await deployer.deploy(Router, FACTORY_ADDRESS, WETH_ADDRESS); //constructor(address _factory, address _WETH)
    }
    //|::::: Deploy SRaddLiquidityETH :::::|
    await deployer.deploy(SRaddLiquidityETH);


};
