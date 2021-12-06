const {BN} = require("@openzeppelin/test-helpers");
const Factory = artifacts.require("Uniswap/SRSwapFactory.sol");
const Pair = artifacts.require("Uniswap/SRSwapPair.sol");
const FakeUSDC = artifacts.require("Uniswap/FakeUSDC.sol");
const FakeUSDT = artifacts.require("Uniswap/FakeUSDT.sol");
const FakeDAI = artifacts.require("Uniswap/FakeDAI.sol");
const WETH = artifacts.require("Uniswap/WETH.sol");
const Router = artifacts.require("SRSwapRouter02.sol");

let factory, router, fusdc, fusdt, fdai, weth;
let fakeUSDCAddress, fakeUSDTAddress, fakeDAIAddress, wethAddress;

module.exports = async function (deployer, network, addresses) {
    //|:::::: Deploy the Factory :::::::|
    await deployer.deploy(Factory, addresses[0]); // constructor(address _feeToSetter)
    //address that receives the payment for the trading fees
    //with truffle, by default the first address is use for the deployment

    //|:::::: Deploy Pair :::::::|
    await deployer.deploy(Pair);

    //::::: Deploy Router :::::|
    await deployer.deploy(WETH);
    weth = await WETH.deployed();
    factory = await Factory.deployed();
    await deployer.deploy(Router, factory.address, weth.address); //constructor(address _factory, address _WETH)

    //|:::::: Deploy tokens :::::::|
    await deployer.deploy(FakeUSDC)
    await deployer.deploy(FakeUSDT)
    await deployer.deploy(FakeDAI)
    // wait mining finishes and get a reference to the token

    fusdc = await FakeUSDC.deployed();
    fusdt = await FakeUSDT.deployed();
    fdai = await FakeDAI.deployed();

    // get the tokens' address
    fakeUSDCAddress = fusdc.address;
    fakeUSDTAddress = fusdt.address;
    fakeDAIAddress = fdai.address;
    wethAddress = weth.address;

    router = await Router.deployed();


    await test(addresses);
};

const test = async function (addresses) {
    //::::: Create pairs :::::|
    try {
        await factory.createPair(fakeUSDCAddress, wethAddress);
        const pair1 = await factory.getPair(fakeUSDCAddress, wethAddress);
        console.log('Address of the pair fUSDC/WETH: ' + pair1);

        await factory.createPair(fakeUSDTAddress, wethAddress);
        const pair2 = await factory.getPair(fakeUSDTAddress, wethAddress);
        console.log('Address of the pair fUSDT/WETH: ' + pair2);

        await factory.createPair(fakeDAIAddress, wethAddress);
        const pair3 = await factory.getPair(fakeDAIAddress, wethAddress);
        console.log('Address of the pair fDAI/WETH: ' + pair3);
    } catch (error) {
        console.log(error);
    }

    try {
        //::::: Add liquidity for the 3 tokens :::::|
        //|::: Initiate pool with fUSDC :::|
        //|::: Mint fUSDC to me :::|
        await fusdc.mint(addresses[0], web3.utils.toWei('10000000'));

        //|::: Check balance of fUSDC :::|
        const fusdcBalance = await fusdc.balanceOf(addresses[0]);
        console.log('Balance after mint fUSDC: ' + Number(web3.utils.fromWei(fusdcBalance)));

        //|::: Approve 10000 fUSDC :::|
        await fusdc.approve(router.address, web3.utils.toWei('10000'));

        //|::: Initiate pool with fUSDT :::|
        //|::: Mint fUSDT to me :::|
        await fusdt.mint(addresses[0], web3.utils.toWei('10000000'));

        //|::: Check balance of fUSDT :::|
        const fusdtBalance = await fusdt.balanceOf(addresses[0]);
        console.log('Balance after mint fUSDT: ' + Number(web3.utils.fromWei(fusdtBalance)));

        //|::: Approve 10000 fUSDT :::|
        await fusdt.approve(router.address, web3.utils.toWei('10000'));

        //|::: Initiate pool with fDAI :::|
        //|::: Mint fDAI to me :::|
        await fdai.mint(addresses[0], web3.utils.toWei('10000000'));

        //|::: Check balance of fDAI :::|
        const fdaiBalance = await fdai.balanceOf(addresses[0]);
        console.log('Balance after mint fDAI: ' + Number(web3.utils.fromWei(fdaiBalance)));

        //|::: Approve 10000 fDAI :::|
        await fdai.approve(router.address, web3.utils.toWei('10000'));

    } catch (error) {
        console.log(error);
    }

    try {
        //|::: Add liquidity :::|
        await router.addLiquidityETH(fusdc.address, web3.utils.toWei('10000'), 0, 0, addresses[0], 1670331540, {value: web3.utils.toWei('1')});
        await router.addLiquidityETH(fusdt.address, web3.utils.toWei('10000'), 0, 0, addresses[0], 1670331540, {value: web3.utils.toWei('1')});
        await router.addLiquidityETH(fdai.address, web3.utils.toWei('10000'), 0, 0, addresses[0], 1670331540, {value: web3.utils.toWei('1')});
    } catch (error) {
        console.log(error);
    }

    try {
        console.log('Adresse WETH: ' + weth.address);
        //|::: Swap tokens :::|
        await router.swapExactETHForTokens(web3.utils.toWei('0.0001'), [weth.address, fusdc.address], addresses[0], 1670331540, {value: web3.utils.toWei('0.001')});
    } catch (error) {
        console.log(error);
    }
};