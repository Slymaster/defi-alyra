const Factory = artifacts.require("Uniswap/SBSwapFactory.sol");
const FakeUSDC = artifacts.require("Uniswap/FakeUSDC.sol");
const FakeUSDT = artifacts.require("Uniswap/FakeUSDT.sol");
const FakeDAI = artifacts.require("Uniswap/FakeDAI.sol");
const WETH = artifacts.require("Uniswap/WETH.sol");

module.exports = async function (deployer, network, addresses) {
    //|:::::: Deploy the Factory :::::::|
    await deployer.deploy(Factory, addresses[0]); // constructor(address _feeToSetter)
    //address that receives the payment for the trading fees
    //with truffle, by default the first address is use for the deployment
    const factory = await Factory.deployed();
    await Factory.deployed();
    //|:::::::::::::::::::::::::::::::::|

    let fakeUSDCAddress, fakeUSDTAddress, fakeDAIAddress, wethAddress;
    if(network === 'mainnet') {
        fakeUSDCAddress = '';
        fakeUSDTAddress = '';
        fakeDAIAddress = '';
        wethAddress = '';
    } else {
        await deployer.deploy(FakeUSDC) //deploy
        await deployer.deploy(FakeUSDT)
        await deployer.deploy(FakeDAI)
        await deployer.deploy(WETH)
        // wait mining finishes and get a reference to the token
        const fakeUSDC = await FakeUSDC.deployed();
        const fakeUSDT = await FakeUSDT.deployed();
        const fakeDAI = await FakeDAI.deployed();
        const weth = await WETH.deployed();
        // get the tokens' address
        fakeUSDCAddress = fakeUSDC.address;
        fakeUSDTAddress = fakeUSDT.address;
        fakeDAIAddress = fakeDAI.address;
        wethAddress = weth.address;

    }
    // create pairs
    await factory.createPair(fakeUSDCAddress, wethAddress);
    await factory.createPair(fakeUSDTAddress, wethAddress);
    await factory.createPair(fakeDAIAddress, wethAddress);

};